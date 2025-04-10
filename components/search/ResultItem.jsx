import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

const MAX_DESCRIPTION_LENGTH = 80;

const ResultItem = ({ item, onPress }) => {
    const truncatedDescription =
        item.description.length > MAX_DESCRIPTION_LENGTH
            ? item.description.substring(0, MAX_DESCRIPTION_LENGTH).trim() + "..."
            : item.description;

    return (
        <TouchableOpacity onPress={onPress}>
            <View className="flex-row items-center mt-4 px-2 mb-2">
                <Image source={{ uri: item.image }} className="w-28 h-28 rounded-lg ml-2 mr-2" />
                <View className="flex-1 ml-4">
                    <Text className="text-base font-semibold">
                        {item.title}
                        {item.isNew && <Text className="text-xs text-accent">  New</Text>}
                    </Text>

                    <View className="flex-row items-center mt-1">
                        <Text className="text-gray-500 text-sm">{item.subtitle}</Text>
                        <Image source={{ uri: item.icon }} className="w-5 h-5 ml-2" />
                    </View>
                    <Text className="text-gray-700 text-xs mt-1">{truncatedDescription}</Text>
                </View>
            </View>
            {/* Separator Line */}
            <View className="border-b border-gray-300 mt-4" />
        </TouchableOpacity>
    );
};

export default ResultItem;
