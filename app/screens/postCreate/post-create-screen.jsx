import React, { useState } from "react";
import { View, Text, TextInput, Switch, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {ChevronLeft, MoreVertical} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { CircleHelp, MessageSquare, Image as ImageIcon,UserPlus, MapPin, ChevronRight } from "lucide-react-native";
import TagActionButton from "../../../components/TagActionButton";
import CustomButton from "../../../components/CustomButton";

const PostCreateScreen = () => {
    const navigation = useNavigation();
    const [caption, setCaption] = useState("");
    const [aiLabel, setAiLabel] = useState(false);

    const locationTags = ["Colombo, Sri Lanka", "Sri Lanka", "Paradise Road"];


    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="px-4">
                {/* Header */}
                <View className="flex-row items-center mb-4">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
                        <ChevronLeft size={28} color="black" />
                    </TouchableOpacity>
                    <Text className="text-lg font-bold ml-2">New post</Text>
                </View>

                {/* Caption Input */}
                <TextInput
                    className=" py-2 mb-4"
                    placeholder="Add a caption..."
                    multiline
                    value={caption}
                    onChangeText={setCaption}
                />

                {/* Tag Action Buttons */}
                <View className="flex-row space-x-3 mb-4">
                    <TagActionButton icon={ImageIcon} label="Image" />
                    <TagActionButton icon={MessageSquare} label="Discuss" />
                    <TagActionButton icon={CircleHelp} label="Ask" />
                </View>

                {/* Options */}
                <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-200">
                    <View className="flex-row items-center">
                        <UserPlus size={18} color="black" className="mr-3" />
                        <Text className="text-base ml-2">Tag people</Text>
                    </View>
                    <ChevronRight size={18} color="gray" />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-200">
                    <View className="flex-row items-center">
                        <MapPin size={18} color="black" className="mr-3" />
                        <Text className="text-base ml-2">Add location</Text>
                    </View>
                    <ChevronRight size={18} color="gray" />
                </TouchableOpacity>


                <View className="flex-row flex-wrap gap-2 mt-2 mb-4 pt-2">
                    {locationTags.map((tag, index) => (
                        <Text
                            key={index}
                            className="bg-gray-100 px-3 py-1 rounded-lg text-sm"
                        >
                            {tag}
                        </Text>
                    ))}
                </View>


                {/* Notify Toggle */}
                <View className="flex-row justify-between items-center py-4 border-b border-gray-200">
                    <View>
                        <Text className="text-base">Notify Network</Text>
                        <Text className="text-gray-500 text-xs mt-1 w-72">
                            Inform the current community engaged with your degree program regarding this post.
                        </Text>
                    </View>
                    <Switch value={aiLabel} onValueChange={setAiLabel} />
                </View>

                {/* Share toggle */}
                <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-200">
                    <Text className="text-base">Also share on...</Text>
                    <Text className="text-gray-400">Off</Text>
                </TouchableOpacity>

                {/* University */}
                <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-200">
                    <Text className="text-base">University</Text>
                    <Text className="text-gray-400">University of Moratuwa</Text>
                </TouchableOpacity>

                {/* Degree */}
                <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-200">
                    <Text className="text-base">Degree</Text>
                    <Text className="text-gray-400">Bsc.(Hons) in IT and Management</Text>
                </TouchableOpacity>




            </ScrollView>

            {/* Share Button */}
            <View className="mb-5 items-center">
                <CustomButton title="Share" onPress={() => alert("Share a post!")} containerStyles={{ width: "90%" }} />
            </View>

        </SafeAreaView>
    );
};

export default PostCreateScreen;
