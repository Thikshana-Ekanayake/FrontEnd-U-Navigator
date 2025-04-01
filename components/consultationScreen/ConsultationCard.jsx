import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Quote, BadgeCheck, ThumbsUp } from "lucide-react-native";

const ConsultationCard = ({ item, likes, toggleLike, userId }) => {
    const isLiked = likes.some(
        (like) => like.postId === item.id && like.userId === userId
    );

    const formatTimeDifference = (timestamp) => {
        const now = new Date();
        const postDate = new Date(timestamp);
        const diffInMs = now.getTime() - postDate.getTime();
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        const diffInYears = Math.floor(diffInDays / 365);

        if (diffInMinutes < 1) return "Just now";
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInDays < 7) return `${diffInDays}d ago`;
        if (diffInYears < 1) return postDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        return `${diffInYears}y ago`;
    };

    const countLikes = (postId) => likes.filter((like) => like.postId === postId).length;

    return (
        <View className="bg-gray-100 rounded-xl p-4 mb-4">
            <Quote size={20} color="gray" />
            <Text className="text-gray-700 mt-2">{item.message}</Text>

            <View className="flex-row items-start mt-3">
                <Image
                    source={{ uri: item.image }}
                    className="w-12 h-12 rounded-full mr-3"
                />
                <View className="flex-1">
                    <View className="flex-row items-center">
                        <Text className="font-semibold text-black">{item.name} </Text>
                        <BadgeCheck size={16} color="blue" />
                    </View>
                    <Text className="text-xs text-gray-500 flex-wrap">{item.role}</Text>
                </View>
            </View>

            <View className="flex-row justify-between items-center mt-3">
                <Text className="text-gray-400">{formatTimeDifference(item.time)}</Text>
                <TouchableOpacity className="flex-row items-center" onPress={() => toggleLike(item.id)}>
                    <ThumbsUp size={16} color={isLiked ? "gray" : "lightgray"} className="mr-1" />
                    <Text className="text-gray-500">{countLikes(item.id)}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ConsultationCard;
