import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Camera, MessageSquare, HelpCircle } from "lucide-react-native";

const PostCreationHead = ({profileImage}) => {
    return (
        <>
            <View className="bg-white p-4 rounded-lg mb-2 flex-row items-center">
                <Image
                    source={{ uri: profileImage }}
                    className="w-10 h-10 rounded-full mr-3"
                />
                <TouchableOpacity className="flex-1 bg-gray-100 p-3 rounded-full">
                    <Text className="text-gray-500">What's on your mind?</Text>
                </TouchableOpacity>
            </View>

            <View className="flex-row justify-around bg-white p-2 pb-3 rounded-lg border-b-[0.5px] border-smoke">
                <TouchableOpacity className="flex-row items-center">
                    <Camera size={20} color="gray" />
                    <Text className="ml-2 text-gray-700">Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center">
                    <MessageSquare size={20} color="gray" />
                    <Text className="ml-2 text-gray-700">Post</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center">
                    <HelpCircle size={20} color="gray" />
                    <Text className="ml-2 text-gray-700">Ask</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default PostCreationHead;
