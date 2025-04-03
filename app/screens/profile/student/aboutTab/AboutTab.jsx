import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const AboutTab = ({ aboutData }) => {
    return (
        <View className="px-4 mt-4">
            {/* Advanced Level Stream (Only if exists) */}
            {aboutData.stream && (
                <>
                    <Text className="text-lg font-bold">Advanced Level Stream</Text>
                    <TouchableOpacity className="border border-blue-500 rounded-full px-4 py-2 mt-2">
                        <Text className="text-blue-500">{aboutData.stream}</Text>
                    </TouchableOpacity>
                </>
            )}

            {/* Advanced Level Subjects (Only if exists) */}
            {aboutData.subjects && aboutData.subjects.length > 0 && (
                <>
                    <Text className="text-lg font-bold mt-5">Advanced Level Subjects</Text>
                    {aboutData.subjects.map((item, index) => (
                        <View key={index} className="flex-row justify-between items-center mt-2">
                            <Text>{item.subject}</Text>
                            <View className={`px-4 py-1 rounded-md ${isNaN(item.grade) ? "bg-yellow-400" : "bg-blue-400"}`}>
                                <Text className="text-white">{item.grade}</Text>
                            </View>
                        </View>
                    ))}
                </>
            )}

            {/* Z Score (Only if exists) */}
            {aboutData.zScore && (
                <View className="flex-row justify-between items-center mt-3">
                    <Text className="text-lg">Z score</Text>
                    <View className="bg-green-500 px-4 py-1 rounded-md">
                        <Text className="text-white">{aboutData.zScore}</Text>
                    </View>
                </View>
            )}

            {/* Ordinary Level Results (Only if exists) */}
            {aboutData.olResults && aboutData.olResults.length > 0 && (
                <>
                    <Text className="text-lg font-bold mt-5">Ordinary Level Results</Text>
                    {aboutData.olResults.map((item, index) => (
                        <View key={index} className="flex-row justify-between items-center mt-2">
                            <Text>{item.subject}</Text>
                            <View className="bg-gray-500 px-4 py-1 rounded-md">
                                <Text className="text-white">{item.grade}</Text>
                            </View>
                        </View>
                    ))}
                </>
            )}
        </View>
    );
};

export default AboutTab;
