import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { Heart, MessageCircle } from "lucide-react-native";

const PostCard = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes || 0);

    const handleLike = () => {
        setLiked(!liked);
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    };

    return (
        <View className="bg-white p-4 rounded-lg border-b-[0.5px] border-smoke">
            {/* User Info */}
            <View className="flex-row items-center mb-2">
                <Image source={{ uri: post.userImage }} className="w-10 h-10 rounded-full mr-3" />
                <View>
                    <Text className="font-bold text-base">{post.userName}</Text>
                    <Text className="text-gray-500 text-xs">{post.userRole}</Text>
                </View>
            </View>

            {/* Post Text */}
            <Text className="text-sm text-gray-700 mb-2">{post.text}</Text>

            {/* Post Images */}
            {post.images && post.images.length > 0 && (
                <FlatList
                    data={post.images}
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item }} className="w-36 h-24 rounded-lg mr-2" />
                    )}
                />
            )}

            {/* Actions (Like & Comment) */}
            <View className="flex-row items-center mt-3">
                <TouchableOpacity onPress={handleLike} className="flex-row items-center mr-4">
                    <Heart size={20} color={liked ? "red" : "gray"} fill={liked ? "red" : "white"} />
                    <Text className="ml-1 text-sm">{likeCount}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log("Comment Pressed")} className="flex-row items-center">
                    <MessageCircle size={20} color="gray" />
                    <Text className="ml-1 text-sm">{post.comments || 0}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PostCard;
