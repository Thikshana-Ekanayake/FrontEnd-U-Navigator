import React, { useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { ThumbsUp, ThumbsUpIcon } from "lucide-react-native";
import { formatTime } from "../../../../../utils/formatTimeUtils.js";

const ActivityTab = ({ activities }) => {
    // Local state to manage likes and liked status
    const [activityLikes, setActivityLikes] = useState(
        activities.reduce((acc, activity) => {
            acc[activity.id] = activity.likes;
            return acc;
        }, {})
    );

    const [likedActivities, setLikedActivities] = useState({});

    // Handle thumbs-up click
    const handleLike = (id) => {
        setActivityLikes((prevLikes) => ({
            ...prevLikes,
            [id]: likedActivities[id] ? prevLikes[id] - 1 : prevLikes[id] + 1, // Toggle like count
        }));

        setLikedActivities((prevLiked) => ({
            ...prevLiked,
            [id]: !prevLiked[id], // Toggle liked state
        }));
    };

    const renderActivityItem = ({ item }) => {
        const timeAgo = formatTime(item.timestamp);
        const isLiked = likedActivities[item.id];

        return (
            <View className="mb-4 px-4">
                <Text className="text-gray-500 text-xs mb-1">Consulted on</Text>
                <View className="bg-white p-4 rounded-lg border-b-[0.5px] border-smoke">
                    <View className="flex-row items-center mb-3">
                        <Image source={{ uri: item.icon }} className="w-12 h-12 rounded-full mr-3" />
                        <View>
                            <Text className="font-bold text-base">{item.degree}</Text>
                            <Text className="text-gray-500 text-xs">{item.university}</Text>
                        </View>
                    </View>
                    <Text className="text-gray-600 text-sm">{item.text}</Text>
                    <View className="flex-row justify-between items-center mt-3">
                        <Text className="text-gray-400 text-xs">{timeAgo}</Text>
                        <TouchableOpacity onPress={() => handleLike(item.id)} className="flex-row items-center">
                            {isLiked ? (
                                <ThumbsUpIcon size={18} color="black" className="mr-1" fill="black" />
                            ) : (
                                <ThumbsUp size={18} color="gray" className="mr-1" fill="white" />
                            )}
                            <Text className="text-gray-600">{activityLikes[item.id]}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    return <FlatList data={activities} keyExtractor={(item) => item.id} renderItem={renderActivityItem} />;
};

export default ActivityTab;
