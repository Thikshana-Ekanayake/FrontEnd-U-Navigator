import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InterestedDegrees from "./interestTab/InterestedDegrees";
import ActivityTab from "./activityTab/ActivityTab";
import AboutTab from "./aboutTab/AboutTab";

const StudentProfile = ({profile}) => {
    const [activeTab, setActiveTab] = useState("Interested");

    const aboutData = {
        stream: "Physical Science",
        subjects: [
            { subject: "Combined Mathematics", grade: "A" },
            { subject: "Chemistry", grade: "A" },
            { subject: "Physics", grade: "A" },
            { subject: "General Test", grade: "180" }, // Numeric result
            { subject: "English", grade: "A" },
        ],
        zScore: "2.465",
        olResults: [
            { subject: "English", grade: "A" },
            { subject: "Science", grade: "A" },
            { subject: "Mathematics", grade: "A" },
            { subject: "Sinhala", grade: "A" },
            { subject: "Buddhism", grade: "A" },
            { subject: "History", grade: "A" },
            { subject: "English Literature", grade: "B" },
            { subject: "Commerce", grade: "A" },
            { subject: "ICT", grade: "A" },
        ],
    };


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


    return (
        <SafeAreaView className="flex-1 bg-white">
            <FlatList
                data={activeTab === "Interested" ? interestedDegreesData : []}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                    <>
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
                        </View>

                        {/* Tab Navigation */}
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

                        {/* Tab Content */}
                        <View className="mt-5 px-4 mb-4">
                            {activeTab === "About" && <AboutTab aboutData={aboutData} />}
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