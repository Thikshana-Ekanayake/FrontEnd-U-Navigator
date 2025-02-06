import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from "react-native";
import { Search, Filter } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

// Sample Degree Data
const degreesData = [
  {
    id: "1",
    title: "Bachelor of Science Honours in Artificial Intelligence",
    subtitle: "University of Moratuwa",
    icon: "https://upload.wikimedia.org/wikipedia/en/6/60/University_of_Moratuwa_logo.png",
    image: "https://uom.lk/sites/default/files/civil/images/civil1_0.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    tag: "degree",
    isNew: true,
  },
  {
    id: "2",
    title: "Bachelor of Law",
    subtitle: "University of Colombo",
    icon: "https://upload.wikimedia.org/wikipedia/en/6/60/University_of_Moratuwa_logo.png",
    image: "https://uom.lk/sites/default/files/civil/images/civil1_0.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    tag: "degree",
  },
  {
    id: "3",
    title: "Bachelor of Agriculture and Food Technology",
    subtitle: "Sabaragamuwa University",
    icon: "https://upload.wikimedia.org/wikipedia/en/6/60/University_of_Moratuwa_logo.png",
    image: "https://uom.lk/sites/default/files/civil/images/civil1_0.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    tag: "degree",
  },
  {
    id: "4",
    title: "Bachelor of Agriculture and Food Technology 2",
    subtitle: "Sabaragamuwa University",
    icon: "https://upload.wikimedia.org/wikipedia/en/6/60/University_of_Moratuwa_logo.png",
    image: "https://uom.lk/sites/default/files/civil/images/civil1_0.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    tag: "degree",
  },
  {
    id: "5",
    title: "Bachelor of Design",
    subtitle: "University of Moratuwa",
    icon: "https://upload.wikimedia.org/wikipedia/en/6/60/University_of_Moratuwa_logo.png",
    image: "https://uom.lk/sites/default/files/civil/images/civil1_0.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    tag: "degree",
  }
];

const DegreeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filters = ["All", "Degrees", "Universities"];

  const filteredDegrees = degreesData.filter((degree) => {
    return (
      (selectedFilter === "All" || degree.tag === selectedFilter.toLowerCase()) &&
      degree.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-6">
      {/* Search Bar */}
      <View className="flex-row items-center bg-gray-100 rounded-3xl px-4 py-3">
        <Search size={20} color="gray" />
        <TextInput
          placeholder="Search Degree by Name"
          className="flex-1 ml-3 text-base"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filters */}
      <View className="flex-row mt-4 space-x-3">
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => setSelectedFilter(filter)}
            className={`px-4 mr-3 py-2 rounded-3xl border ${
              selectedFilter === filter ? "border-text" : "border-smoke"
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                selectedFilter === filter ? "text-text" : "text-smoke"
              }`}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Placeholder for advanced filtering */}
        <TouchableOpacity className="px-4 py-2 rounded-3xl border border-gray-400 absolute right-0">
          <Filter size={16} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Degree List */}
      <FlatList
        data={filteredDegrees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("screens/degree/degree-detail", { degreeId: item.id })}>
            <View className="flex-row items-center mt-4 px-2 mb-2">
              <Image source={{ uri: item.image }} className="w-28 h-28 rounded-lg ml-2 mr-2" />
              <View className="flex-1 ml-4">
                <Text className="text-base font-semibold">
                  {item.title} 
                  {item.isNew && <Text className="text-xs text-accent">  New</Text>}
                </Text>

                <View className="flex-row items-center mt-1">
                  <Text className="text-gray-500 text-sm">{item.subtitle}</Text>
                  <Image source={{ uri: item.icon }} className="w-5 h-5 ml-2" />
                </View>
                <Text className="text-gray-700 text-xs mt-1">{item.description}</Text>
              </View>
            </View>
            {/* Separator Line */}
            <View className="border-b border-gray-300 mt-4" />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default DegreeScreen;
