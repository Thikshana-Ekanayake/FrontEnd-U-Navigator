import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

const TagActionButton = ({ icon: Icon, label, onPress = () => {} }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="bg-gray-200 px-4 py-2 rounded-lg ml-2 flex-row items-center space-x-1"
        >
            <Icon size={16} color="black" />
            <Text className="text-black ml-2">{label}</Text>
        </TouchableOpacity>
    );
};

export default TagActionButton;
