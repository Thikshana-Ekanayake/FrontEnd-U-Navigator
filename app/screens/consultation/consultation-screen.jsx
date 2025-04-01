import React, { useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { Quote, BadgeCheck, ThumbsUp } from "lucide-react-native";
import ConsultationCard from "../../../components/consultationScreen/ConsultationCard";

const userId = "user123"; // Dummy user ID

const consultationData = [
    // Within the last few hours
    {
        id: "1",
        name: "Adam Steven",
        role: "Senior Lecturer | Faculty of Information Technology | University of Moratuwa",
        message: "Recently posted message...",
        time: "2025-04-01T15:30:00Z", // 2.5 hours ago
        image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    // Within the last 24 hours
    {
        id: "2",
        name: "Esther Howard",
        role: "Senior Lecturer | Faculty of Information Technology | University of Moratuwa",
        message: "Posted within the last day...",
        time: "2025-03-28T22:00:00Z", // 20 hours ago
        image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    // Within the last 7 days
    {
        id: "3",
        name: "Amanda Perkins",
        role: "Senior Lecturer | Faculty of Information Technology | University of Moratuwa",
        message: "This post is from a few days ago...",
        time: "2025-02-25T10:00:00Z", // 4 days ago
        image: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    // Within the last year
    {
        id: "4",
        name: "Michael Brown",
        role: "Professor | Department of Computer Science | University of Colombo",
        message: "This post is from a few months ago...",
        time: "2024-10-10T14:15:00Z", // About 5 months ago
        image: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    // More than a year ago
    {
        id: "5",
        name: "Sophia White",
        role: "Senior Researcher | AI and Data Science | University of Peradeniya",
        message: "An old but still relevant post...",
        time: "2023-02-20T08:00:00Z", // More than 2 years ago
        image: "https://randomuser.me/api/portraits/women/5.jpg",
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

    const formatTimeDifference = (timestamp) => {
        const now = new Date();
        const postDate = new Date(timestamp);

        // Ensure we are using the same time zone reference
        const diffInMs = now.getTime() - postDate.getTime();
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        const diffInYears = Math.floor(diffInDays / 365);


        if (diffInMinutes < 1) {
            return "Just now"; // If less than a minute
        } else if (diffInMinutes < 60) {
            return `${diffInMinutes}m ago`; // If less than an hour
        } else if (diffInHours < 24) {
            return `${diffInHours}h ago`; // If within the last day
        } else if (diffInDays < 7) {
            return `${diffInDays}d ago`; // If within the last week
        } else if (diffInYears < 1) {
            return postDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }); // Month and day
        } else {
            return `${diffInYears}y ago`; // If more than a year
        }
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
            />

            <TouchableOpacity className="bg-gray-200 rounded-xl p-3 items-center mt-3">
                <Text className="text-gray-600">Add Consultation</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ConsultationScreen;
