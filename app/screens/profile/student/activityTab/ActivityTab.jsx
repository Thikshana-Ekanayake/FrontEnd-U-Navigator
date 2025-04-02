import React from "react";
import { View, FlatList, Text } from "react-native";
import QACard from "../../../../../components/community/QACard";
import PostCard from "../../../../../components/community/PostCard";

const ActivityTab = ({ activities }) => {
    const renderActivityItem = ({ item }) => {
        if (item.type === "question") {
            return (
                <View className="mb-4">
                    <Text className="text-gray-500 text-xs mb-1">
                        {item.replierName} replied to your Question {item.timeAgo}
                    </Text>
                    <QACard question={item} />
                </View>
            );
        } else if (item.type === "post") {
            return (
                <View className="mb-4">
                    <Text className="text-gray-500 text-xs mb-1">
                        {item.posterName} posted an update {item.timeAgo}
                    </Text>
                    <PostCard post={item} />
                </View>
            );
        }
    };

    return (
        <FlatList
            data={activities}
            keyExtractor={(item) => item.id}
            renderItem={renderActivityItem}
            contentContainerStyle={{ paddingBottom: 20 }}
        />
    );
};

export default ActivityTab;
