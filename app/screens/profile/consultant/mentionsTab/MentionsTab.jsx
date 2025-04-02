import React from "react";
import { View, Text, FlatList } from "react-native";
import PostCard from "../../../../../components/community/PostCard";
import QACard from "../../../../../components/community/QACard";
import {formatTime} from "../../../../../utils/formatTimeUtils.js";

const MentionsTab = ({ mentions }) => {
    const renderMentionItem = ({ item }) => {
        const timeAgo = formatTime(item.timestamp);

        return (
            <View className="mb-3 ml-3">
                <Text className="text-gray-500 text-xs ml-3">
                    {item.userName || item.replierName} mentioned you {timeAgo}
                </Text>
                {item.type === "post" ? <PostCard post={item} /> : <QACard question={item} />}
            </View>
        );
    };

    return (
        <FlatList
            data={mentions}
            keyExtractor={(item) => item.id}
            renderItem={renderMentionItem}
        />
    );
};

export default MentionsTab;
