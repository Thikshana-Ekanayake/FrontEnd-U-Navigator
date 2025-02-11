import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Eye, Star } from "lucide-react-native";

const formatNumber = (num) => (num >= 1000 ? (num / 1000).toFixed(1).replace(".0", "") + "K" : num);

const MostViewedCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row items-center bg-gray-100 p-4 rounded-lg mr-4 mt-3 w-72">
      {/* Image on the Left */}
      <Image source={{ uri: item.image }} className="w-20 h-20 rounded-md" />

      {/* Text & Stats on the Right */}
      <View className="ml-3 flex-1">
        <Text className="text-sm font-semibold">{item.title}</Text>
        <View className="flex-row items-center mt-1">
          <Eye size={14} color="gray" />
          <Text className="text-gray-500 text-xs ml-1">{formatNumber(item.views)}</Text>

          {/* Add space between views and stars */}
          <Text className="mx-3 text-gray-400">|</Text>

          <Star size={12} color="gray" />
          <Text className="ml-1 text-xs text-gray-500">{formatNumber(item.interested)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MostViewedCard;
