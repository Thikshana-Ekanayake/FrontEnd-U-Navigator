import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Bookmark, Users } from "lucide-react-native";
import CustomButton from "../../../components/CustomButton";
import CustomSlidableCard from "../../../components/CustomSlidableCard"; // Import the new component

// Sample university data
const universitiesData = [
    {
        id: "U1",
        name: "University of Moratuwa",
        enrollments: 125000,
        image: "https://uom.lk/sites/default/files/civil/images/civil1_0.jpg",
        description: "The University of Moratuwa is a leading technological university in Sri Lanka...",
        mostViewed: [
            { id: "D1", title: "Bachelor of Science in Engineering Honours", image: "https://uom.lk/sites/default/files/civil/images/civil1_0.jpg", views: 578000, interested: 78000 },
            { id: "D2", title: "BSc (Hons) in Artificial Intelligence", image: "https://uom.lk/sites/default/files/civil/images/civil1_0.jpg", views: 578000, interested: 78000 },
        ],
    },
    {
        id: "U2",
        name: "University of Colombo",
        enrollments: 100000,
        image: "https://uom.lk/sites/default/files/civil/images/civil1_0.jpg",
        description: "The University of Colombo is Sri Lanka’s oldest university, founded in 1921...",
        mostViewed: [
            { id: "D3", title: "BSc in Computer Science", image: "https://uom.lk/sites/default/files/civil/images/civil1_0.jpg", views: 578000, interested: 78000 },
        ],
    },
];

const formatNumber = (num) => (num >= 1000 ? (num / 1000).toFixed(1).replace(".0", "") + "K" : num);

const UniversityDetail = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { id } = route.params;
    const university = universitiesData.find((u) => u.id === id);

    const [isBookmarked, setIsBookmarked] = useState(false);
    const [expanded, setExpanded] = useState(false);

    if (!university) return <Text className="text-center text-gray-500 mt-10">University not found!</Text>;

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 relative">
                <ScrollView contentContainerStyle={{ padding: 16 }}>
                    {/* Header Image */}
                    <View className="relative">
                        <Image source={{ uri: university.image }} className="w-full h-96 rounded-xl" />
                        <TouchableOpacity onPress={() => navigation.goBack()} className="absolute top-5 left-4 p-2">
                            <ChevronLeft size={28} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setIsBookmarked(!isBookmarked)}
                            className="absolute -bottom-3 right-4 bg-white p-2 rounded-full shadow-lg"
                        >
                            <Bookmark size={26} color={isBookmarked ? "gold" : "gray"} fill={isBookmarked ? "gold" : "white"} />
                        </TouchableOpacity>
                    </View>

                    {/* University Name & Enrollment */}
                    <View className="mt-4 flex-row justify-between items-center">
                        <Text className="text-2xl font-bold">{university.name}</Text>
                        <TouchableOpacity>
                            <Text className="text-blue-600">Show map</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Enrollment Count */}
                    <View className="flex-row items-center mt-2">
                        <Users size={18} color="gray" />
                        <Text className="text-gray-500 text-sm ml-1">{formatNumber(university.enrollments)} enrollments</Text>
                    </View>

                    {/* Description */}
                    <Text className="mt-4 text-sm leading-6">
                        {expanded ? university.description : university.description.substring(0, 120) + "..."}
                    </Text>
                    <TouchableOpacity className="mt-2" onPress={() => setExpanded(!expanded)}>
                        <Text className="text-blue-600">{expanded ? "Read less" : "Read more"}</Text>
                    </TouchableOpacity>

                    {/* Most Viewed Section */}
                    <Text className="text-lg font-semibold mt-6">Most Viewed</Text>
                    <FlatList
                        data={university.mostViewed}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <CustomSlidableCard
                                item={item}
                                onPress={() => navigation.navigate("screens/degree/degree-detail", { id: item.id })}
                            />
                        )}
                    />
                </ScrollView>

                {/* View All Button */}
                <View className="mt-6 absolute bottom-0 left-0 right-0 p-4">
                    <CustomButton title="View all" onPress={() => alert("Viewing all most viewed!")} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default UniversityDetail;
