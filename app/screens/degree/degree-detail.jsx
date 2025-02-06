import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../../components/CustomButton"; // Import CustomButton

const degreesData = [
  {
    id: "1",
    title: "Bsc (Hons.) in Information Technology & Management",
    subtitle: "University of Moratuwa",
    image: "https://uom.lk/sites/default/files/civil/images/civil1_0.jpg",
    description:
      "An undergraduate of B.Sc. (Hons) in Information Technology and Management program will have followed a dual core degree program combining core Information Technology (IT) and core Management. This degree prepares students with a mix of knowledge from both disciplines to handle real-world business and technology challenges. The curriculum covers programming, database management, project management, business analysis, and entrepreneurship skills to produce IT professionals with a business mindset.",
    views: 578000,
    interested: 78000,
    engaged: 18000,
  },
];

// Function to format numbers to 'K' notation
const formatNumber = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(".0", "") + "K";
  }
  return num;
};

const DegreeDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { degreeId } = route.params;

  const degree = degreesData.find((d) => d.id === degreeId);
  const [isStarred, setIsStarred] = useState(false);
  const [expanded, setExpanded] = useState(false); // State for Read More toggle

  if (!degree) {
    return <Text>Degree not found!</Text>;
  }

  // Shorten description for preview
  const previewText = degree.description.substring(0, 120) + "...";

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Image Header with Star Icon */}
        <View className="relative">
          <Image
            source={{ uri: degree.image }}
            className="w-full h-96 rounded-xl"
          />
          {/* Clickable Star Icon */}
          <TouchableOpacity
            onPress={() => setIsStarred(!isStarred)}
            className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg"
          >
            <Ionicons
              name={isStarred ? "star" : "star-outline"}
              size={24}
              color={isStarred ? "gold" : "gray"}
            />
          </TouchableOpacity>
        </View>

        {/* Title and Subtitle - Centered */}
        <View className="mt-4 items-center">
          <Text className="text-2xl font-bold text-center">{degree.title}</Text>
          <Text className="text-gray-500 text-sm mt-1 text-center">
            {degree.subtitle}
          </Text>
        </View>

        {/* Stats Section */}
        <View className="flex-row justify-between items-center mt-4 ml-4 mr-4">
          <View className="flex-row items-center">
            <Ionicons name="eye" size={16} color="gray" />
            <Text className="ml-2 text-gray-500 text-xs">
              {formatNumber(degree.views)} views
            </Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="star-outline" size={16} color="gray" />
            <Text className="ml-2 text-gray-500 text-xs">
              {formatNumber(degree.interested)} interested
            </Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="heart-outline" size={16} color="gray" />
            <Text className="ml-2 text-gray-500 text-xs">
              {formatNumber(degree.engaged)} engaged
            </Text>
          </View>
        </View>

        {/* Engage Button with CustomButton */}
        <View className="mt-1 flex-row justify-start items-center">
          <CustomButton
            title="Engage"
            onPress={() => alert("Engaged with the degree!")}
            containerStyles={{ width: "90%" }} // Customize width
          />

          {/* More Options Button */}
          <TouchableOpacity className="ml-3 p-2 pt-5">
            <Ionicons name="ellipsis-vertical" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Description Section */}
        <Text className="mt-4 text-sm leading-6">
          {expanded ? degree.description : previewText}
        </Text>

        <TouchableOpacity className="mt-2" onPress={() => setExpanded(!expanded)}>
          <Text className="text-blue-600">{expanded ? "Read less" : "Read more"}</Text>
        </TouchableOpacity>

        {/* Criteria, Community, Consultation Buttons */}
        <View className="flex-row justify-between mt-5">
          {["Criteria", "Community", "Consultation"].map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-1 mx-1 border border-smoke py-3 rounded-3xl items-center"
            >
              <Text className="text-smoke">{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DegreeDetail;
