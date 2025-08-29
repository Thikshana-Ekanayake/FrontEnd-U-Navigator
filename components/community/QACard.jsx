import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {formatTime} from "../../utils/formatTimeUtils.jsx";

const QACard = ({ question }) => {
    const answersCount = question.answers?.length || 0;

    return (
        <View className="bg-white p-4 rounded-xl mt-2 border-b-[0.5px] border-smoke">
            {/* User Info */}
            <View className="flex-row items-center mb-3">
                <Image source={{ uri: question.userImage }} className="w-10 h-10 rounded-full mr-3" />
                <View>
                    <Text className=" text-md font-bold">{question.userName}</Text>
                    <Text className="text-gray-500 text-xs">{question.userRole}</Text>
                </View>
            </View>

            {/* Question Text */}
            <Text className="text-sm text-gray-700 mb-2">{question.text}</Text>
            <Text className="text-gray-400 text-xs">{formatTime(question.timestamp)}</Text>

            {/* Answer Section */}
            {answersCount > 0 && (
                <View className="mt-3 border-l-2 border-gray-300 pl-3">
                    {/* Show the first answer */}
                    <Text className="font-semibold text-sm">
                        {question.answers[0].user} <Text className="text-gray-500 text-xs">Undergraduate</Text>
                    </Text>
                    <Text className="text-sm text-gray-800">{question.answers[0].text}</Text>
                    <Text className="text-gray-400 text-xs mt-1">{formatTime(question.answers[0].timestamp)}</Text>

                    {/* More Replies Indicator */}
                    {answersCount > 1 && (
                        <TouchableOpacity className="mt-2">
                            <Text className="text-smoke text-sm font-semibold">- {answersCount - 1} more -</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}

            {/* Add an Answer Button */}
            <TouchableOpacity className="mt-3 border border-gray-300 rounded-lg p-2 items-center">
                <Text className="text-gray-600 text-sm font-medium">Add an Answer</Text>
            </TouchableOpacity>
        </View>
    );
};

export default QACard;
