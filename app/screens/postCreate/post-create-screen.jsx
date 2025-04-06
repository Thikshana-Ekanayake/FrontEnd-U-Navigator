import React, { useState } from "react";
import { View, Text, TextInput, Switch, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

const PostCreateScreen = () => {
    const navigation = useNavigation();
    const [caption, setCaption] = useState("");
    const [aiLabel, setAiLabel] = useState(false);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="px-4">
                {/* Header */}
                <View className="flex-row items-center mb-4">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
                        <ChevronLeft size={28} color="black" />
                    </TouchableOpacity>
                    <Text className="text-lg font-bold ml-2">New post</Text>
                </View>

                {/* Caption Input */}
                <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
                    placeholder="Add a caption..."
                    multiline
                    value={caption}
                    onChangeText={setCaption}
                />

                {/* Buttons */}
                <View className="flex-row space-x-3 mb-4">
                    <TouchableOpacity className="bg-gray-200 px-4 py-2 rounded-full">
                        <Text className="text-black">Poll</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-gray-200 px-4 py-2 rounded-full">
                        <Text className="text-black">Prompt</Text>
                    </TouchableOpacity>
                </View>

                {/* Options */}
                <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-200">
                    <Text className="text-base">Tag people</Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-200">
                    <Text className="text-base">Add location</Text>
                </TouchableOpacity>

                <View className="flex-row flex-wrap gap-2 mt-2 mb-4">
                    <Text className="bg-gray-100 px-3 py-1 rounded-full text-sm">Colombo, Sri Lanka</Text>
                    <Text className="bg-gray-100 px-3 py-1 rounded-full text-sm">Sri Lanka</Text>
                    <Text className="bg-gray-100 px-3 py-1 rounded-full text-sm">Paradise Road</Text>
                </View>

                {/* AI Label Toggle */}
                <View className="flex-row justify-between items-center py-4 border-b border-gray-200">
                    <View>
                        <Text className="text-base">Add AI label</Text>
                        <Text className="text-gray-500 text-xs mt-1 w-60">
                            We require you to label certain realistic content that's made with AI.
                        </Text>
                    </View>
                    <Switch value={aiLabel} onValueChange={setAiLabel} />
                </View>

                {/* Audience */}
                <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-200">
                    <Text className="text-base">Audience</Text>
                    <Text className="text-gray-400">Everyone</Text>
                </TouchableOpacity>

                {/* Share toggle */}
                <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-200">
                    <Text className="text-base">Also share on...</Text>
                    <Text className="text-gray-400">Off</Text>
                </TouchableOpacity>

                {/* More options */}
                <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-200">
                    <Text className="text-base">More options</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Share Button */}
            <TouchableOpacity className="bg-blue-600 py-4 rounded-xl mx-4 mt-4 mb-6 items-center">
                <Text className="text-white font-bold text-base">Share</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default PostCreateScreen;
