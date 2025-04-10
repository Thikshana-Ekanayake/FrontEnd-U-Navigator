import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';
import { LogOut } from "lucide-react-native";

import MentionsTab from "./mentionsTab/MentionsTab";
import ActivityTab from "./activityTab/ActivityTab";

const ConsultantProfile = ({ profile }) => {
    const [activeTab, setActiveTab] = useState("Activity");
    const router = useRouter();

    const mentionsData = [
        {
            id: "M1",
            type: "post",
            userImage: "https://randomuser.me/api/portraits/men/2.jpg",
            userName: "Thikshana Ekanayake",
            userRole: "Undergraduate",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            images: [
                "https://source.unsplash.com/random/800x400/?classroom",
                "https://source.unsplash.com/random/800x400/?presentation",
            ],
            timestamp: new Date(Date.now() - 86400000).toISOString(),
        },
        {
            id: "A3",
            type: "question",
            userImage: "https://randomuser.me/api/portraits/women/3.jpg",
            userName: "Nimali Silva",
            userRole: "University Student",
            text: "What are the best resources to learn React Native?",
            timestamp: new Date("2025-04-01T09:00:00Z").toISOString(),
            answers: [
                {
                    user: "Thikshana Ekanayake",
                    text: "Start with the official React Native docs and YouTube tutorials like Academind.",
                    timestamp: new Date("2025-04-01T09:20:00Z").toISOString(),
                },
            ],
            replierName: "Thikshana Ekanayake",
        },
    ];

    const activityData = [
        {
            id: "A1",
            degree: "BSc (Hons.) in Information Technology & Management",
            university: "University of Moratuwa",
            icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzp-4qEf7sGOajr_livP8ZNU5t9ECOKYkaNw&s",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
            timestamp: new Date(Date.now() - 43200000).toISOString(),
            likes: 12,
        },
        {
            id: "A2",
            degree: "BSc (Hons.) in Computer Science",
            university: "University of Colombo",
            icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzp-4qEf7sGOajr_livP8ZNU5t9ECOKYkaNw&s",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            likes: 25,
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-white">
            <FlatList
                data={activeTab === "Activity" ? activityData : mentionsData}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                    <>
                        {/* Cover Image */}
                        <View className="bg-gray-200 h-40">
                            <Image source={{ uri: profile.coverImage }} className="w-full h-full" resizeMode="cover" />

                            {/* Logout Icon */}
                            <TouchableOpacity
                                onPress={() => router.replace('/sign-in')}
                                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow"
                            >
                                <LogOut size={20} color="#000" />
                            </TouchableOpacity>
                        </View>

                        {/* Profile Details */}
                        <View className="items-center mt-4">
                            <Image
                                source={{ uri: profile.profileImage }}
                                className="w-32 h-32 rounded-full border-4 border-white -mt-16"
                            />
                            <Text className="text-lg font-semibold mt-2">{profile.name}</Text>
                            <Text className="text-gray-500 text-sm">{profile.role}</Text>
                            <Text className="text-gray-400 text-xs">{profile.university}</Text>
                        </View>

                        {/* Tab Navigation */}
                        <View className="flex-row justify-between mt-5 px-4 mb-6">
                            {["Activity", "Mentions"].map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    className={`flex-1 mx-1 border py-3 rounded-3xl items-center ${
                                        activeTab === item ? "border-text" : "border-gray-300"
                                    }`}
                                    onPress={() => setActiveTab(item)}
                                >
                                    <Text className={activeTab === item ? "text-text font-bold" : "text-gray-500"}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </>
                }
                renderItem={({ item }) =>
                    activeTab === "Activity" ? <ActivityTab activities={[item]} /> : <MentionsTab mentions={[item]} />
                }
            />
        </SafeAreaView>
    );
};

export default ConsultantProfile;
