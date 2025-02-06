import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Eye, Star, Heart, MoreVertical } from "lucide-react-native";
import CustomButton from "../../../components/CustomButton"; // Import CustomButton

const degreesData = [
  {
    id: "1",
    title: "Bsc (Hons.) in Information Technology & Management",
    subtitle: "University of Moratuwa",
    image: "https://uom.lk/sites/default/files/civil/images/civil1_0.jpg",
    description:
      "An undergraduate of B.Sc. (Hons) in Information Technology and Management program will have followed a dual core degree program combining core Information Technology (IT) and core Management...",
    views: 578000,
    interested: 78000,
    engaged: 18000,
  },
];

const formatNumber = (num) => (num >= 1000 ? (num / 1000).toFixed(1).replace(".0", "") + "K" : num);

const DegreeDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { degreeId } = route.params;

  const degree = degreesData.find((d) => d.id === degreeId);
  const [isStarred, setIsStarred] = useState(false);
  const [expanded, setExpanded] = useState(false);

  if (!degree) return <Text>Degree not found!</Text>;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Image Header with Back & Star Icons */}
        <View className="relative">
          <Image source={{ uri: degree.image }} className="w-full h-96 rounded-xl" />

          {/* Back Button (Top-Left Corner) */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-5 left-4 p-2"
          >
            <ChevronLeft size={28} color="white" />
          </TouchableOpacity>

          {/* Star Icon (Top-Right Corner) */}
          <TouchableOpacity
            onPress={() => setIsStarred(!isStarred)}
            className="absolute -bottom-3 right-4 bg-white p-2 rounded-full shadow-lg"
          >
            <Star size={30} color="gold" fill={isStarred ? "gold" : "none"} />
          </TouchableOpacity>
        </View>

        {/* Title and Subtitle */}
        <View className="mt-4 items-center">
          <Text className="text-2xl font-bold text-center">{degree.title}</Text>
          <Text className="text-gray-500 text-sm mt-1 text-center">{degree.subtitle}</Text>
        </View>

        {/* Stats Section */}
        <View className="flex-row justify-between items-center mt-4 ml-4 mr-4">
          <View className="flex-row items-center">
            <Eye size={16} color="gray" />
            <Text className="ml-2 text-gray-500 text-xs">{formatNumber(degree.views)} views</Text>
          </View>
          <View className="flex-row items-center">
            <Star size={16} color="gray" />
            <Text className="ml-2 text-gray-500 text-xs">{formatNumber(degree.interested)} interested</Text>
          </View>
          <View className="flex-row items-center">
            <Heart size={16} color="gray" />
            <Text className="ml-2 text-gray-500 text-xs">{formatNumber(degree.engaged)} engaged</Text>
          </View>
        </View>

        {/* Engage Button */}
        <View className="mt-1 flex-row justify-start items-center">
          <CustomButton title="Engage" onPress={() => alert("Engaged with the degree!")} containerStyles={{ width: "90%" }} />
          <TouchableOpacity className="ml-1 p-2 pt-5">
            <MoreVertical size={24} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Description Section */}
        <Text className="mt-4 text-sm leading-6">{expanded ? degree.description : degree.description.substring(0, 120) + "..."}</Text>
        <TouchableOpacity className="mt-2" onPress={() => setExpanded(!expanded)}>
          <Text className="text-blue-600">{expanded ? "Read less" : "Read more"}</Text>
        </TouchableOpacity>

        {/* Criteria, Community, Consultation Buttons */}
        <View className="flex-row justify-between mt-5">
          {["Criteria", "Community", "Consultation"].map((item, index) => (
            <TouchableOpacity key={index} className="flex-1 mx-1 border border-smoke py-3 rounded-3xl items-center">
              <Text className="text-smoke">{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DegreeDetail;
