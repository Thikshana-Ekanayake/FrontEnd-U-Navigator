import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Quote, BadgeCheck, ThumbsUp } from "lucide-react-native";
import { formatTime } from "../../utils/formatTimeUtils.js";

const ConsultationCard = ({ item, likes, toggleLike, userId }) => {
    const isLiked = likes.some(
        (like) => like.postId === item.id && like.userId === userId
    );

    const countLikes = (postId) => likes.filter((like) => like.postId === postId).length;

    return (
        // <View className="bg-white rounded-2xl p-5 shadow-sm mx-2 mb-4">
        <View style={{ shadowColor: 'rgba(0, 0, 0, 0.25)', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10 }} className="bg-white rounded-2xl p-5 mx-2 mb-4">

        {/* Quote & Message */}
            <Quote size={24} color="#333" />
            <Text className="text-gray-700 mt-3 text-sm leading-relaxed">
                {item.message}
            </Text>

            {/* User Info & Image */}
            <View className="flex-row justify-between items-center mt-5">
                <View className="flex-1">
                    <View className="flex-row items-center">
                        <Text className="font-bold text-black text-md">{item.name}</Text>
                        <BadgeCheck size={18} color="orange" className="ml-1" />
                    </View>
                    <Text className="text-sm text-gray-500 mt-1">
                        {item.role}
                    </Text>
                </View>

                <View className="w-18 h-18 rounded-full  flex justify-center items-center">
                    <Image
                        source={{ uri: item.image }}
                        className="w-14 h-14 rounded-full"
                    />
                </View>
            </View>

            {/* Like & Timestamp */}
            <View className="flex-row justify-between items-center mt-4">
                <TouchableOpacity
                    className="flex-row items-center"
                    onPress={() => toggleLike(item.id)}
                >
                    <ThumbsUp
                        size={18}
                        color={isLiked ? "black" : "gray"}
                        fill={isLiked ? "black" : "none"}
                    />
                    <Text className="text-gray-600 ml-1">{countLikes(item.id)}</Text>
                </TouchableOpacity>

                <Text className="text-gray-400 text-sm">{formatTime(item.time)}</Text>
            </View>
        </View>
    );
};

export default ConsultationCard;
