import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InterestedDegrees from "./interestTab/InterestedDegrees";

const StudentProfile = () => {
    const [activeTab, setActiveTab] = useState("Interested");

    // Define the data here and pass it down
    const interestedDegreesData = [
        {
            id: "D1",
            title: "Bachelor of Science Honours in Artificial Intelligence",
            subtitle: "University of Moratuwa",
            icon: "https://upload.wikimedia.org/wikipedia/en/6/60/University_of_Moratuwa_logo.png",
            image: "https://uom.lk/sites/default/files/civil/images/civil1_0.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            tag: "degree",
            isNew: true,
        },
        {
            id: "D2",
            title: "Bachelor of Law",
            subtitle: "University of Colombo",
            icon: "https://upload.wikimedia.org/wikipedia/en/6/60/University_of_Moratuwa_logo.png",
            image: "https://uom.lk/sites/default/files/civil/images/civil1_0.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            tag: "degree",
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header Section */}
            <View className="items-center bg-gray-200 pb-10">
                <Image
                    source={{ uri: "https://img.freepik.com/free-photo/top-view-eyeglasses-with-case_23-2148290434.jpg" }}
                    className="w-full h-40"
                    resizeMode="cover"
                />
                <View className="absolute -bottom-8">
                    <Image
                        source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
                        className="w-32 h-32 rounded-full border-4 border-white"
                    />
                </View>
            </View>

            {/* User Info */}
            <View className="items-center mt-10">
                <Text className="text-lg font-semibold">Iruka Pathirana</Text>
                <Text className="text-gray-500 text-sm">
                    School Student | Physical Science Stream
                </Text>
            </View>

            {/* Tabs Section */}
            <View className="flex-row justify-between mt-5 px-4">
                {["About", "Activity", "Interested"].map((item, index) => (
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

            {/* Content Section Based on Active Tab */}
            <View className="mt-5 px-4">
                {activeTab === "About" && <Text>About content goes here...</Text>}
                {activeTab === "Activity" && <Text>Activity content goes here...</Text>}
                {activeTab === "Interested" && <InterestedDegrees data={interestedDegreesData} />}
            </View>
        </SafeAreaView>
    );
};

export default StudentProfile;
