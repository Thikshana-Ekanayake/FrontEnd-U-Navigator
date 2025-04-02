import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MentionsTab from "./mentionsTab/MentionsTab";

const ConsultantProfile = ({ profile }) => {
    const [activeTab, setActiveTab] = useState("Mentions");

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
            timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
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

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Cover Image */}
            <View className="items-center bg-gray-200 h-40">
                <Image source={{ uri: profile.coverImage }} className="w-full h-full" resizeMode="cover" />
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

            {/* Render Mentions or Activity */}
            {activeTab === "Mentions" && <MentionsTab mentions={mentionsData} />}
        </SafeAreaView>
    );
};

export default ConsultantProfile;
