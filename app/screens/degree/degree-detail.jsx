// app/screens/degree/degree-detail.jsx
import React, { useState, useMemo, useContext } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Eye, Star, Heart, MoreVertical } from "lucide-react-native";
import CustomButton from "../../../components/CustomButton";
import ConsultationScreen from "../consultation/consultation-screen";
import CommunitySection from "../community/community-screen";
import CriteriaScreen from "../criteria/criteria-screen";

// LIVE hook
import { useDegreeActivity} from "../../../src/quaryHooks/degrees/useDegreeActivity";
// Get user profile (if you wired the AuthProvider earlier)
import { AuthContext } from "../../../src/providers/AuthProvider";

const formatNumber = (num) => (num >= 1000 ? (num / 1000).toFixed(1).replace(".0", "") + "K" : String(num));

const DegreeDetail = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { id } = route.params;

    const { data, isLoading, error, refetch, isRefetching } = useDegreeActivity(String(id));
    const [isStarred, setIsStarred] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState("Criteria");

    const { profile } = useContext(AuthContext) || {};
    // Try common id fields; fallback to route param if passed from upstream
    const userId =
        profile?.id || profile?._id || profile?.userId || route.params?.userId || null;

    const degree = data?.degree;

    const headerSubtitle = useMemo(() => {
        if (!degree) return "";
        const parts = [];
        if (degree.universityName) parts.push(degree.universityName);
        if (degree.degreeType) parts.push(degree.degreeType);
        if (degree.duration) parts.push(degree.duration);
        return parts.join(" • ");
    }, [degree]);

    if (isLoading || isRefetching) {
        return (
            <SafeAreaView className="flex-1 bg-white items-center justify-center">
                <ActivityIndicator />
                <Text style={{ marginTop: 8 }}>Loading degree…</Text>
            </SafeAreaView>
        );
    }

    if (error || !degree) {
        return (
            <SafeAreaView className="flex-1 bg-white items-center justify-center">
                <Text style={{ color: "red", textAlign: "center", paddingHorizontal: 16 }}>
                    {error ? "Failed to load degree." : "Degree not found!"}
                </Text>
                <TouchableOpacity onPress={() => refetch()} style={{ marginTop: 12 }}>
                    <Text style={{ color: "#2563eb", fontWeight: "700" }}>Try Again</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    const interest = data?.interestCount ?? 0;
    const engagement = data?.engagementCount ?? 0;

    return (
        <SafeAreaView className="flex-1 bg-white">
            <FlatList
                data={[{ key: "content" }]}
                keyExtractor={(item) => item.key}
                refreshing={isRefetching}
                onRefresh={refetch}
                renderItem={() => (
                    <View className="px-4 pb-10">
                        {/* Image Header */}
                        <View className="relative">
                            <Image
                                source={{ uri: degree.imageUrl || degree.universityLogoUrl || "https://via.placeholder.com/800x600" }}
                                className="w-full h-96 rounded-xl"
                            />
                            <TouchableOpacity onPress={() => navigation.goBack()} className="absolute top-5 left-4 p-2">
                                <ChevronLeft size={28} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setIsStarred((s) => !s)}
                                className="absolute -bottom-3 right-4 bg-white p-2 rounded-full shadow-lg"
                            >
                                <Star size={30} color="gold" fill={isStarred ? "gold" : "white"} />
                            </TouchableOpacity>
                        </View>

                        {/* Title & Subtitle */}
                        <View className="mt-4 items-center">
                            <Text className="text-2xl font-bold text-center">{degree.name}</Text>
                            {!!headerSubtitle && <Text className="text-gray-500 text-sm mt-1 text-center">{headerSubtitle}</Text>}
                        </View>

                        {/* Stats Section */}
                        <View className="flex-row justify-between items-center mt-4 mx-4">
                            <View className="flex-row items-center">
                                <Eye size={16} color="gray" />
                                <Text className="ml-2 text-gray-500 text-xs">{degree.uniCode || "-"}</Text>
                            </View>
                            <View className="flex-row items-center">
                                <Star size={16} color="gray" />
                                <Text className="ml-2 text-gray-500 text-xs">{formatNumber(interest)} interested</Text>
                            </View>
                            <View className="flex-row items-center">
                                <Heart size={16} color="gray" />
                                <Text className="ml-2 text-gray-500 text-xs">{formatNumber(engagement)} engaged</Text>
                            </View>
                        </View>

                        {/* Engage Button */}
                        <View className="mt-1 flex-row justify-start items-center">
                            <CustomButton
                                title="Engage"
                                onPress={() => alert("Engaged with the degree!")}
                                containerStyles={{ width: "90%" }}
                            />
                            <TouchableOpacity className="ml-1 p-2 pt-5">
                                <MoreVertical size={24} color="gray" />
                            </TouchableOpacity>
                        </View>

                        {/* Description */}
                        {!!degree.description && (
                            <>
                                <Text className="mt-4 text-sm leading-6">
                                    {expanded ? degree.description : `${degree.description.slice(0, 160)}${degree.description.length > 160 ? "..." : ""}`}
                                </Text>
                                {degree.description.length > 160 && (
                                    <TouchableOpacity className="mt-2" onPress={() => setExpanded((e) => !e)}>
                                        <Text className="text-smoke text-sm font-bold">{expanded ? "Read less" : "Read more"}</Text>
                                    </TouchableOpacity>
                                )}
                            </>
                        )}

                        {/* Tabs */}
                        <View className="flex-row justify-between mt-5">
                            {["Criteria", "Community", "Consultation"].map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    className={`flex-1 mx-1 border py-3 rounded-3xl items-center ${
                                        activeTab === item ? "border-text" : "border-smoke"
                                    }`}
                                    onPress={() => setActiveTab(item)}
                                >
                                    <Text className={activeTab === item ? "text-text" : "text-smoke"}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Tab Content */}
                        <View className="mt-5">
                            {activeTab === "Criteria" && (
                                <CriteriaScreen
                                    degreeId={degree.id}
                                    userId={userId}
                                    olCriteria={degree.olCriteriaDescription}
                                    alCriteria={degree.alCriteriaDescription}
                                    streams={degree.streams}
                                    duration={degree.duration}
                                />
                            )}

                            {activeTab === "Community" && <CommunitySection degreeId={degree.id} />}

                            {activeTab === "Consultation" && <ConsultationScreen degreeId={degree.id} />}
                        </View>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

export default DegreeDetail;
