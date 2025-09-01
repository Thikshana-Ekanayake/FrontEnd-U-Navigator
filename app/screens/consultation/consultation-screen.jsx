import React, { useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import ConsultationCard from "../../../components/consultationScreen/ConsultationCard";

const userId = "user123";

const consultationData = [
    // Within the last few hours
    {
        id: "1",
        name: "Dr. Nadeesha Fernando",
        role: "Senior Lecturer | Faculty of Information Technology | University of Moratuwa",
        message:
            "The ITM degree at Moratuwa is well-balanced with both management and core computing courses. Students gain strong exposure to software engineering as well as business analysis, which is highly valued by Sri Lankan IT companies.",
        time: "2025-09-01T13:30:00Z",
        image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    // Within the last 24 hours
    {
        id: "2",
        name: "Prof. Ruwan Weerasinghe",
        role: "Professor | University of Colombo School of Computing (UCSC)",
        message:
            "One of the key advantages of the ITM programme is the focus on practical training. Internships arranged through the faculty give students real-world experience in Colombo’s IT industry and beyond.",
        time: "2025-08-31T23:10:00Z",
        image: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    // Within the last 7 days
    {
        id: "3",
        name: "Dr. Tharushi Jayasuriya",
        role: "Senior Lecturer | Dept. of Statistics & Computer Science | University of Peradeniya",
        message:
            "The curriculum is frequently updated to match industry demand. Recently, modules on cloud computing and data analytics were added, giving graduates a competitive edge in Sri Lanka’s tech job market.",
        time: "2025-08-28T10:00:00Z",
        image: "https://randomuser.me/api/portraits/women/33.jpg",
    },
    // Within the last year
    {
        id: "4",
        name: "Dr. Chamika Perera",
        role: "Senior Lecturer | Faculty of Information Technology | University of Moratuwa",
        message:
            "Students sometimes feel the workload is heavy, especially in the second year. However, this helps them build strong time management and project skills, which are essential for their final-year projects and future careers.",
        time: "2025-05-12T14:15:00Z",
        image: "https://randomuser.me/api/portraits/men/24.jpg",
    },
    // More than a year ago
    {
        id: "5",
        name: "Dr. S. Tharmakulasingam",
        role: "Senior Lecturer | Dept. of Computer Science | University of Jaffna",
        message:
            "Graduates from ITM are highly employable. Many join top local firms such as WSO2, Virtusa, or move abroad for postgraduate studies. The blend of technical and management knowledge makes them versatile professionals.",
        time: "2023-07-05T08:00:00Z",
        image: "https://randomuser.me/api/portraits/men/52.jpg",
    },
];



const consultationLikes = [
    { userId: "user123", postId: "1", liked: true, dateTime: "2025-03-31T12:00:00Z" },
    { userId: "user456", postId: "1", liked: true, dateTime: "2025-03-31T12:10:00Z" },
    { userId: "user789", postId: "2", liked: true, dateTime: "2025-03-31T12:20:00Z" },
    { userId: "user123", postId: "3", liked: true, dateTime: "2025-03-31T12:30:00Z" },
    { userId: "user456", postId: "2", liked: true, dateTime: "2025-03-31T12:40:00Z" },
    { userId: "user789", postId: "3", liked: true, dateTime: "2025-03-31T12:50:00Z" },
    { userId: "user123", postId: "1", liked: true, dateTime: "2025-03-31T13:00:00Z" },
];

// Like state
const ConsultationScreen = () => {
    const [likes, setLikes] = useState(consultationLikes);

    // Function to toggle like status
    const toggleLike = (postId) => {
        setLikes((prevLikes) => {
            const existingLikeIndex = prevLikes.findIndex(
                (like) => like.postId === postId && like.userId === UserID
            );

            if (existingLikeIndex !== -1) {
                // If already liked, remove it
                return prevLikes.filter(
                    (like) => !(like.postId === postId && like.userId === UserID)
                );
            } else {
                // If not liked, add a new like
                return [
                    ...prevLikes,
                    {
                        userId: UserID,
                        postId: postId,
                        liked: true,
                        dateTime: new Date().toISOString(),
                    },
                ];
            }
        });
    };

    // Function to count likes per post
    const countLikes = (postId) => likes.filter((like) => like.postId === postId).length;

    return (
        <View className="flex-1">
            <FlatList
                data={consultationData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ConsultationCard item={item} likes={likes} toggleLike={toggleLike} userId={userId} />
                )}
                // showsHorizontalScrollIndicator={false}
                // scrollEnabled={false}
            />

            <TouchableOpacity className="bg-gray-200 rounded-xl p-3 items-center mt-3">
                <Text className="text-gray-600">Add Consultation</Text>
            </TouchableOpacity>

        </View>
    );
};

export default ConsultationScreen;
