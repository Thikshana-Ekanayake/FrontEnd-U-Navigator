import React, { useMemo, useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    Switch,
    TouchableOpacity,
    ScrollView,
    Modal,
    FlatList,
    ActivityIndicator,
    Image,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import {
    CircleHelp,
    MessageSquare,
    Image as ImageIcon,
    UserPlus,
    MapPin,
    MoreVertical,
} from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";

import TagActionButton from "../../../components/TagActionButton";
import CustomButton from "../../../components/CustomButton";

// hooks/services you've already added in previous steps
import { useUniversities} from "../../../src/quaryHooks/universities/useUniversities";
import { useDegrees} from "../../../src/quaryHooks/degrees/useDegrees";
import { useProfile } from "../../../src/quaryHooks/user/useProfile";
import { useCreatePost} from "../../../src/quaryHooks/community/useCreatePost";

// ---------- Small inline option picker modal ----------
const OptionPickerModal = ({ visible, title, options, onSelect, onClose }) => (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
        <View className="flex-1 justify-end bg-black/40">
            <View className="bg-white rounded-t-2xl p-4 max-h-[70%]">
                <View className="flex-row justify-between items-center mb-3">
                    <Text className="text-lg font-bold">{title}</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Text className="text-blue-600">Close</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={options}
                    keyExtractor={(item) => String(item.value)}
                    ItemSeparatorComponent={() => <View className="h-[1px] bg-gray-200" />}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            className="py-3"
                            onPress={() => {
                                onSelect(item);
                                onClose();
                            }}
                        >
                            <Text className="text-base">{item.label}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    </Modal>
);

const PostCreateScreen = () => {
    const navigation = useNavigation();

    // ---- state (keep your vars, add what we need) ----
    const [caption, setCaption] = useState("");
    const [aiLabel, setAiLabel] = useState(false); // keep as is (Notify Network)
    const [postType, setPostType] = useState("text"); // 'text' | 'image' | 'question'
    const [imageAsset, setImageAsset] = useState(null);

    const [universityId, setUniversityId] = useState(null);
    const [degreeId, setDegreeId] = useState(null);

    const [uniPickerOpen, setUniPickerOpen] = useState(false);
    const [degPickerOpen, setDegPickerOpen] = useState(false);

    const locationTags = ["Colombo, Sri Lanka", "Sri Lanka", "Paradise Road"];

    // ---- data sources ----
    const { data: me } = useProfile(); // userId from token
    const userId = me?.userId || null;

    const { data: universities = [], isLoading: uniLoading } = useUniversities();
    const { data: degrees = [], isLoading: degLoading } = useDegrees();

    const loadingData = uniLoading || degLoading;

    // build dropdown options
    const universityOptions = useMemo(
        () => universities.map((u) => ({ label: u.name, value: u.id })),
        [universities]
    );

    const degreeOptionsAll = useMemo(
        () =>
            degrees.map((d) => ({
                label: d.name,
                value: d.id,
                universityId: d.universityId,
                universityName: d.universityName,
            })),
        [degrees]
    );

    // filter degrees by selected university
    const degreeOptions = useMemo(() => {
        if (!universityId) return degreeOptionsAll;
        return degreeOptionsAll.filter((d) => d.universityId === universityId);
    }, [degreeOptionsAll, universityId]);

    const selectedUniversityName =
        universityOptions.find((o) => o.value === universityId)?.label || "Select university";
    const selectedDegree = degreeOptionsAll.find((o) => o.value === degreeId);
    const selectedDegreeName = selectedDegree?.label || "Select degree";

    // when a degree is chosen, auto-fill its university
    useEffect(() => {
        if (!degreeId) return;
        const deg = degreeOptionsAll.find((d) => d.value === degreeId);
        if (deg?.universityId && deg.universityId !== universityId) {
            setUniversityId(deg.universityId);
        }
    }, [degreeId]); // eslint-disable-line

    // when university changes, clear degree if it no longer belongs
    useEffect(() => {
        if (!degreeId || !universityId) return;
        const deg = degreeOptionsAll.find((d) => d.value === degreeId);
        if (deg && deg.universityId !== universityId) {
            setDegreeId(null);
        }
    }, [universityId]); // eslint-disable-line

    // ---- image picking ----
    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission needed", "Please allow photo access to upload an image.");
            return;
        }
        const res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.85,
            allowsMultipleSelection: false,
        });
        if (!res.canceled && res.assets?.length) {
            const a = res.assets[0];
            setImageAsset({
                uri: a.uri,
                fileName: a.fileName || undefined,
                mimeType: a.mimeType || "image/jpeg",
            });
        }
    };

    // set postType by tapping the tag buttons
    const onTapImage = async () => {
        setPostType("image");
        await pickImage();
    };
    const onTapDiscuss = () => setPostType("text");
    const onTapAsk = () => setPostType("question");

    // ---- submit ----
    const { mutateAsync: createPost, isLoading: submitting } = useCreatePost();

    const validate = () => {
        if (!userId) {
            Alert.alert("Not signed in", "Please sign in to create a post.");
            return false;
        }
        if (!degreeId) {
            Alert.alert("Missing degree", "Please select a degree for your post.");
            return false;
        }
        if (!caption?.trim()) {
            Alert.alert("Missing caption", postType === "question" ? "Please type your question." : "Please add a caption.");
            return false;
        }
        if (postType === "image" && !imageAsset?.uri) {
            Alert.alert("Image required", "Please choose an image for this post.");
            return false;
        }
        return true;
    };

    const onShare = async () => {
        if (!validate()) return;
        try {
            await createPost({
                userId,
                degreeId,
                caption: caption.trim(),
                postType,      // "text" | "image" | "question"
                imageAsset,    // only used if postType === "image"
            });
            Alert.alert("Posted!", "Your post has been published.", [
                { text: "OK", onPress: () => navigation.goBack() },
            ]);
        } catch (e) {
            Alert.alert("Failed", "Could not create the post. Please try again.");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="px-4">
                {/* Header */}
                <View className="flex-row items-center mb-4">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
                        <ChevronLeft size={28} color="black" />
                    </TouchableOpacity>
                    <Text className="text-lg font-bold ml-2">New post</Text>
                    <View className="ml-auto pr-1">
                        <MoreVertical size={18} color="gray" />
                    </View>
                </View>

                {/* Caption Input */}
                <TextInput
                    className="py-2 mb-4"
                    placeholder={postType === "question" ? "Ask your question..." : "Add a caption..."}
                    multiline
                    value={caption}
                    onChangeText={setCaption}
                />

                {/* Tag Action Buttons (keep UI; add handlers) */}
                <View className="flex-row space-x-3 mb-4">
                    <TagActionButton icon={ImageIcon} label="Image" onPress={onTapImage} />
                    <TagActionButton icon={MessageSquare} label="Discuss" onPress={onTapDiscuss} />
                    <TagActionButton icon={CircleHelp} label="Ask" onPress={onTapAsk} />
                </View>

                {/* Preview if image post */}
                {postType === "image" && imageAsset?.uri && (
                    <View className="mb-4">
                        <Image
                            source={{ uri: imageAsset.uri }}
                            className="w-full h-56 rounded-xl bg-gray-100"
                            resizeMode="cover"
                        />
                        <TouchableOpacity className="mt-2" onPress={pickImage}>
                            <Text className="text-blue-600">Change image</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Options (kept as-is; not wired yet) */}
                <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-200">
                    <View className="flex-row items-center">
                        <UserPlus size={18} color="black" />
                        <Text className="text-base ml-2">Tag people</Text>
                    </View>
                    <ChevronRight size={18} color="gray" />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-200">
                    <View className="flex-row items-center">
                        <MapPin size={18} color="black" />
                        <Text className="text-base ml-2">Add location</Text>
                    </View>
                    <ChevronRight size={18} color="gray" />
                </TouchableOpacity>

                <View className="flex-row flex-wrap gap-2 mt-2 mb-4 pt-2">
                    {locationTags.map((tag, index) => (
                        <Text key={index} className="bg-gray-100 px-3 py-1 rounded-lg text-sm">
                            {tag}
                        </Text>
                    ))}
                </View>

                {/* Notify toggle (kept; just state) */}
                <View className="flex-row justify-between items-center py-4 border-b border-gray-200">
                    <View>
                        <Text className="text-base">Notify Network</Text>
                        <Text className="text-gray-500 text-xs mt-1 w-72">
                            Inform the current community engaged with your degree program regarding this post.
                        </Text>
                    </View>
                    <Switch value={aiLabel} onValueChange={setAiLabel} />
                </View>

                {/* Share toggle (kept; inactive) */}
                <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-200">
                    <Text className="text-base">Also share on...</Text>
                    <Text className="text-gray-400">Off</Text>
                </TouchableOpacity>

                {/* University (opens picker) */}
                <TouchableOpacity
                    className="flex-row justify-between items-center py-4 border-b border-gray-200"
                    onPress={() => !loadingData && setUniPickerOpen(true)}
                    disabled={loadingData}
                >
                    <Text className="text-base">University</Text>
                    <View className="flex-row items-center">
                        {loadingData ? (
                            <ActivityIndicator />
                        ) : (
                            <Text className="text-gray-600">{selectedUniversityName}</Text>
                        )}
                        <ChevronRight size={18} color="gray" />
                    </View>
                </TouchableOpacity>

                {/* Degree (opens picker, filtered by university) */}
                <TouchableOpacity
                    className="flex-row justify-between items-center py-4 border-b border-gray-200"
                    onPress={() => !loadingData && setDegPickerOpen(true)}
                    disabled={loadingData}
                >
                    <Text className="text-base">Degree</Text>
                    <View className="flex-row items-center">
                        {loadingData ? (
                            <ActivityIndicator />
                        ) : (
                            <Text className="text-gray-600" numberOfLines={1}>
                                {selectedDegreeName}
                            </Text>
                        )}
                        <ChevronRight size={18} color="gray" />
                    </View>
                </TouchableOpacity>

                {/* spacing */}
                <View className="h-4" />
            </ScrollView>

            {/* Share Button */}
            <View className="mb-5 items-center">
                <CustomButton
                    title={submitting ? "Posting..." : "Share"}
                    onPress={onShare}
                    containerStyles={{ width: "90%" }}
                    disabled={submitting || loadingData}
                />
            </View>

            {/* University picker modal */}
            <OptionPickerModal
                visible={uniPickerOpen}
                title="Select University"
                options={universityOptions}
                onSelect={(opt) => setUniversityId(opt.value)}
                onClose={() => setUniPickerOpen(false)}
            />

            {/* Degree picker modal (filtered) */}
            <OptionPickerModal
                visible={degPickerOpen}
                title="Select Degree"
                options={degreeOptions}
                onSelect={(opt) => setDegreeId(opt.value)}
                onClose={() => setDegPickerOpen(false)}
            />
        </SafeAreaView>
    );
};

export default PostCreateScreen;
