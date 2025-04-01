import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";

const consultationData = [
    {
        id: "1",
        name: "Adam Steven",
        role: "Senior Lecturer | Faculty of Information Technology | University of Moratuwa",
        message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
        time: "12h",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        likes: 12,
    },
    {
        id: "2",
        name: "Esther Howard",
        role: "Senior Lecturer | Faculty of Information Technology | University of Moratuwa",
        message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
        time: "25 May",
        image: "https://randomuser.me/api/portraits/women/2.jpg",
        likes: 12,
    },
    {
        id: "3",
        name: "Amanda Perkins",
        role: "Senior Lecturer | Faculty of Information Technology | University of Moratuwa",
        message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
        time: "25 May",
        image: "https://randomuser.me/api/portraits/women/3.jpg",
        likes: 12,
    },
];

const ConsultationScreen = () => {
    return (
        <View className="flex-1 bg-white p-4">
            <FlatList
                data={consultationData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View className="bg-gray-100 rounded-xl p-4 mb-4 shadow-md">
                        <Text className="text-xl">“</Text>
                        <Text className="text-gray-700">{item.message}</Text>

                        <View className="flex-row items-center mt-3">
                            <Image source={{ uri: item.image }} className="w-12 h-12 rounded-full mr-3" />
                            <View>
                                <Text className="font-semibold text-black">{item.name} 🌟</Text>
                                <Text className="text-xs text-gray-500">{item.role}</Text>
                            </View>
                        </View>

                        <View className="flex-row justify-between items-center mt-3">
                            <Text className="text-gray-400">{item.time}</Text>
                            <Text className="text-gray-500">👍 {item.likes}</Text>
                        </View>
                    </View>
                )}
            />

            <TouchableOpacity className="bg-gray-200 rounded-xl p-3 items-center mt-3">
                <Text className="text-gray-600">Add Consultation</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ConsultationScreen;
