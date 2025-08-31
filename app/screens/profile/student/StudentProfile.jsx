import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';
import { LogOut } from "lucide-react-native";

import InterestedDegrees from "./interestTab/InterestedDegrees";
import ActivityTab from "./activityTab/ActivityTab";
import AboutTab from "./aboutTab/AboutTab";

import { useProfileAboutData} from "../../../../src/quaryHooks/user/useProfileAboutData";

const StudentProfile = ({ profile }) => {
    const [activeTab, setActiveTab] = useState("Interested");
    const router = useRouter();

    // NEW: live About data
    const { aboutData, isLoading: aboutLoading, isError: aboutErr, refetch } = useProfileAboutData();

    // keep your mock lists (unchanged)
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

    const activitiesData = [
        {
            id: "A1",
            type: "question",
            userImage: "https://randomuser.me/api/portraits/men/1.jpg",
            userName: "Thikshana Ekanayake",
            userRole: "School Student",
            text: "How does machine learning improve healthcare?",
            timestamp: new Date("2025-03-31T10:00:00Z").toISOString(),
            answers: [
                {
                    user: "Thikshana Ekanayake",
                    text: "Machine learning helps in early diagnosis and personalized treatment.",
                    timestamp: new Date("2025-03-31T10:15:00Z").toISOString(),
                },
            ],
            replierName: "Nimali Silva",
        },
        {
            id: "A2",
            type: "post",
            userImage: "https://randomuser.me/api/portraits/men/2.jpg",
            userName: "Thikshana Ekanayake",
            userRole: "School Student",
            text: "Just completed my project on AI! It was a challenging but rewarding journey. 🚀",
            likes: 12,
            comments: 3,
            images: ["https://uom.lk/sites/default/files/civil/images/civil1_0.jpg"],
            posterName: "Thikshana Ekanayake",
            timestamp: new Date("2025-03-30T15:30:00Z").toISOString(),
        },
        {
            id: "A3",
            type: "question",
            userImage: "https://randomuser.me/api/portraits/women/3.jpg",
            userName: "Thikshana Ekanayake",
            userRole: "University Student",
            text: "What are the best resources to learn React Native?",
            timestamp: new Date("2025-04-01T09:00:00Z").toISOString(),
            answers: [
                {
                    user: "Nimali Silva",
                    text: "Start with the official React Native docs and YouTube tutorials like Academind.",
                    timestamp: new Date("2025-04-01T09:20:00Z").toISOString(),
                },
            ],
            replierName: "Nimali Silva",
        },
        {
            id: "A4",
            type: "post",
            userImage: "https://randomuser.me/api/portraits/women/4.jpg",
            userName: "Nimali Silva",
            userRole: "University Student",
            text: "Excited to share my new blog on UX/UI design trends in 2025!",
            likes: 25,
            comments: 5,
            images: ["https://cdn.pixabay.com/photo/2015/01/09/11/09/startup-594090_1280.jpg"],
            posterName: "Nimali Silva",
            timestamp: new Date("2025-03-29T08:45:00Z").toISOString(),
        },
    ];

    const renderAbout = () => {
        if (aboutLoading) {
            return (
                <View className="py-8 items-center">
                    <ActivityIndicator />
                    <Text className="mt-2 text-gray-600">Loading profile details…</Text>
                </View>
            );
        }
        if (aboutErr) {
            return (
                <View className="py-6">
                    <Text className="text-red-600">Couldn’t load your About data.</Text>
                    <Text className="text-blue-600 mt-2" onPress={refetch}>Tap to retry</Text>
                </View>
            );
        }
        return <AboutTab aboutData={aboutData} />;
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <FlatList
                data={activeTab === "Interested" ? interestedDegreesData : []}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                    <>
                        {/* Cover */}
                        <View className="bg-gray-200 h-40">
                            <Image source={{ uri: profile.coverImage }} className="w-full h-full" resizeMode="cover" />
                            <TouchableOpacity
                                onPress={() => router.replace('/sign-in')}
                                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow"
                            >
                                <LogOut size={20} color="#000" />
                            </TouchableOpacity>
                        </View>

                        {/* Profile header */}
                        <View className="items-center mt-4">
                            <Image
                                source={{ uri: profile.profileImage }}
                                className="w-32 h-32 rounded-full border-4 border-white -mt-16"
                            />
                            <Text className="text-lg font-semibold mt-2">{profile.name}</Text>
                            <Text className="text-gray-500 text-sm">{profile.role}</Text>
                        </View>

                        {/* Tabs */}
                        <View className="flex-row justify-between mt-5 px-4">
                            {["About", "Activity", "Interested"].map((item) => (
                                <TouchableOpacity
                                    key={item}
                                    className={`flex-1 mx-1 border py-3 rounded-3xl items-center ${
                                        activeTab === item ? "border-text" : "border-gray-300"
                                    }`}
                                    onPress={() => setActiveTab(item)}
                                >
                                    <Text className={activeTab === item ? "text-text font-bold" : "text-gray-500"}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Tab content */}
                        <View className="mt-5 px-4 mb-4">
                            {activeTab === "About" && renderAbout()}
                            {activeTab === "Activity" && <ActivityTab activities={activitiesData} />}
                        </View>
                    </>
                }
                renderItem={({ item }) => <InterestedDegrees data={[item]} />}
            />
        </SafeAreaView>
    );
};

export default StudentProfile;
