import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";

const tabs = ["All", "Degree", "Posts", "QnA"];

const notifications = [
    {
        id: "1",
        user: "Thikshana Ekanayake",
        message: 'replied to your comment: "Are there any job opportunities in this degree program"',
        icon: "https://randomuser.me/api/portraits/men/1.jpg",
        category: "QnA",
    },
    {
        id: "2",
        user: "New Degree",
        message: "Artificial Intelligence in University of Moratuwa",
        icon: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png",
        category: "Degree",
    },
    {
        id: "3",
        user: "Thikshana Ekanayake",
        message: "New Post in BSc Hons in IT & Management - University of Moratuwa",
        icon: "https://randomuser.me/api/portraits/men/2.jpg",
        category: "Posts",
    },
    {
        id: "4",
        user: "University of Colombo",
        message: "Checkout the new Criteria Change in Bachelor of Law",
        icon: "https://cdn-icons-png.flaticon.com/512/3135/3135810.png",
        category: "Degree",
    },
    {
        id: "5",
        user: "Chithmini Jayangi",
        message: 'replied to your comment: "Are there any job opportunities in this degree program"',
        icon: "https://randomuser.me/api/portraits/women/3.jpg",
        category: "QnA",
    },
];

const suggestedFollows = [
    {
        id: "SF1",
        name: "Bachelor of Science Honours in Artificial Intelligence",
        university: "University of Moratuwa",
        icon: "https://upload.wikimedia.org/wikipedia/en/6/60/University_of_Moratuwa_logo.png",
    },
    {
        id: "SF2",
        name: "Bachelor of Science Honours in Artificial Intelligence",
        university: "University of Moratuwa",
        icon: "https://upload.wikimedia.org/wikipedia/en/6/60/University_of_Moratuwa_logo.png",
    },
    {
        id: "SF3",
        name: "Bachelor of Science Honours in Artificial Intelligence",
        university: "University of Moratuwa",
        icon: "https://upload.wikimedia.org/wikipedia/en/6/60/University_of_Moratuwa_logo.png",
    },
];

const Notification = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState("All");

    const filteredNotifications =
        activeTab === "All" ? notifications : notifications.filter((notif) => notif.category === activeTab);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="flex-row items-center px-4 pt-4">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
                        <ChevronLeft size={24} color="black" />
                    </TouchableOpacity>
                    <Text className="text-xl font-semibold ml-2">Notifications</Text>
                </View>

                {/* Tabs */}
                <View className="flex-row justify-start space-x-3 px-4 mt-4 mr-2">
                    {tabs.map((tab, index) => (
                        <TouchableOpacity
                            key={index}
                            className={`px-4 py-2 mr-3 rounded-full border ${
                                activeTab === tab ? "border-text" : "border-smoke"
                            }`}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text className={`font-medium ${activeTab === tab ? "text-text" : "text-smoke"}`}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Notifications List */}
                <View className="mt-6 px-4">
                    {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((notif) => (
                            <View key={notif.id} className="flex-row items-start space-x-3 mb-5">
                                <Image source={{ uri: notif.icon }} className="w-12 h-12 mr-2 rounded-full" />
                                <View className="flex-1">
                                    <Text className="font-semibold text-sm">{notif.user}</Text>
                                    <Text className="text-gray-600 text-sm">{notif.message}</Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text className="text-center text-gray-500 mt-4">No notifications available</Text>
                    )}
                </View>

                {/* Suggested Follow Section */}
                <Text className="text-lg font-semibold px-4 mt-8">People like you also follow</Text>
                <View className="mt-3 px-4">
                    {suggestedFollows.map((degree) => (
                        <View key={degree.id} className="flex-row items-center space-x-3 mb-4">
                            <Image source={{ uri: degree.icon }} className="w-10 h-10 mr-2" />
                            <View>
                                <Text className="font-medium text-sm">{degree.name}</Text>
                                <Text className="text-gray-500 text-xs">{degree.university}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/*<View className="h-16" /> /!* Bottom padding for better scroll *!/*/}
                <View style={{ height: 16 }}>
                    <Text> </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Notification;
