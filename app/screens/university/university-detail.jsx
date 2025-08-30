// app/screens/university/university-detail.jsx
import React, { useMemo, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, ActivityIndicator, Linking } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Bookmark, Users } from "lucide-react-native";
import CustomButton from "../../../components/CustomButton";
import CustomSlidableCard from "../../../components/CustomSlidableCard";
import { useRouter } from "expo-router";

// LIVE hooks
import { useUniversityById} from "../../../src/quaryHooks/universities/useUniversityById";
import { useUniversityDegreesWithCount} from "../../../src/quaryHooks/universities/useUniversityDegreesWithCount";

const formatNumber = (num) => (num >= 1000 ? (num / 1000).toFixed(1).replace(".0", "") + "K" : String(num));

const UniversityDetail = () => {
    const route = useRoute();
    const router = useRouter();
    const navigation = useNavigation();
    const { id } = route.params;

    const [isBookmarked, setIsBookmarked] = useState(false);
    const [expanded, setExpanded] = useState(false);

    // Fetch university + degree interest list
    const { data: uni, isLoading: uniLoading, error: uniError, refetch: refetchUni } = useUniversityById(String(id));
    const {
        data: degCounts = [],
        isLoading: listLoading,
        error: listError,
        refetch: refetchList,
    } = useUniversityDegreesWithCount(String(id));

    const loading = uniLoading || listLoading;
    const hasError = uniError || listError;

    // Sort by interestCount desc for "Most Interested"
    const mostInterested = useMemo(() => {
        return [...degCounts].sort((a, b) => (b.interestCount ?? 0) - (a.interestCount ?? 0));
    }, [degCounts]);

    // Map into what CustomSlidableCard typically needs (id, title, image, subtitle)
    const mostInterestedCards = useMemo(
        () =>
            mostInterested.map((d) => ({
                id: d.id,
                title: d.name,
                image: d.imageUrl || "",              // alias for card
                subtitle: `${d.interestCount} interested • ${d.engagementCount} engaged`,
                interested: d.interestCount,
                engagement: d.engagementCount,
            })),
        [mostInterested]
    );

    const onOpenMap = () => {
        if (uni?.locationUrl) Linking.openURL(uni.locationUrl).catch(() => {});
    };

    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-white items-center justify-center">
                <ActivityIndicator />
                <Text style={{ marginTop: 8 }}>Loading university…</Text>
            </SafeAreaView>
        );
    }

    if (hasError || !uni) {
        return (
            <SafeAreaView className="flex-1 bg-white items-center justify-center" style={{ paddingHorizontal: 16 }}>
                <Text style={{ color: "red", textAlign: "center" }}>
                    {hasError ? "Failed to fetch university details." : "University not found!"}
                </Text>
                <TouchableOpacity onPress={() => { refetchUni(); refetchList(); }} style={{ marginTop: 12 }}>
                    <Text style={{ color: "#2563eb", fontWeight: "700" }}>Try Again</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 relative">
                <ScrollView contentContainerStyle={{ padding: 16 }}>
                    {/* Header Image */}
                    <View className="relative mb-4">
                        <Image source={{ uri: uni.imageUrl || uni.logoUrl || "https://via.placeholder.com/800x600" }} className="w-full h-96 rounded-xl" />
                        <TouchableOpacity onPress={() => navigation.goBack()} className="absolute top-5 left-4 p-2">
                            <ChevronLeft size={28} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setIsBookmarked((b) => !b)}
                            className="absolute -bottom-3 right-4 bg-white p-2 rounded-full shadow-lg"
                        >
                            <Bookmark size={26} color={isBookmarked ? "gold" : "gray"} fill={isBookmarked ? "gold" : "white"} />
                        </TouchableOpacity>
                    </View>

                    {/* University Name & Map */}
                    <View className="mt-2 flex-row justify-between items-center">
                        <Text className="text-2xl font-bold w-4/5">{uni.name}</Text>
                        {!!uni.locationUrl && (
                            <TouchableOpacity onPress={onOpenMap}>
                                <Text className="text-blue-600">Show map</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Contact / Website (replaces enrollments placeholder) */}
                    {uni.website || uni.contactEmail || uni.contactPhone ? (
                        <View className="mt-2">
                            {!!uni.website && <Text className="text-blue-600">{uni.website}</Text>}
                            {!!uni.contactEmail && <Text className="text-gray-500">{uni.contactEmail}</Text>}
                            {!!uni.contactPhone && <Text className="text-gray-500">{uni.contactPhone}</Text>}
                        </View>
                    ) : null}

                    {/* Description */}
                    {!!uni.description && (
                        <>
                            <Text className="mt-4 text-sm leading-6">
                                {expanded ? uni.description : `${uni.description.slice(0, 160)}${uni.description.length > 160 ? "..." : ""}`}
                            </Text>
                            {uni.description.length > 160 && (
                                <TouchableOpacity className="mt-2" onPress={() => setExpanded((e) => !e)}>
                                    <Text className="text-blue-600">{expanded ? "Read less" : "Read more"}</Text>
                                </TouchableOpacity>
                            )}
                        </>
                    )}

                    {/* Most Interested Section */}
                    <Text className="text-lg font-semibold mt-6">Most Interested</Text>
                    <FlatList
                        data={mostInterestedCards}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <CustomSlidableCard
                                item={item}
                                onPress={() => navigation.navigate("screens/degree/degree-detail", { id: item.id })}
                            />
                        )}
                        ListEmptyComponent={
                            <View className="py-8 pr-4">
                                <Text className="text-gray-500">No degree interest yet.</Text>
                            </View>
                        }
                    />
                </ScrollView>

                {/* View All Button */}
                <View className="mt-6 absolute bottom-0 left-0 right-0 p-4">
                    <CustomButton
                        title="View all"
                        onPress={() =>
                            router.push({
                                pathname: "/search",
                                params: {
                                    initialFilter: "Degrees",
                                    initialAdvancedFilters: JSON.stringify([uni.name]), // use university name for search pill
                                },
                            })
                        }
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default UniversityDetail;
