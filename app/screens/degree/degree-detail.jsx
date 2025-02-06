import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

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

const DegreeDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { degreeId } = route.params;

  // Find the selected degree
  const degree = degreesData.find((d) => d.id === degreeId);

  if (!degree) {
    return <Text>Degree not found!</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 20 }}>
        <Text style={{ color: "blue" }}>← Go Back</Text>
      </TouchableOpacity>

      <Image source={{ uri: degree.image }} style={{ width: "100%", height: 200, borderRadius: 10 }} />
      <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 10 }}>{degree.title}</Text>
      <Text style={{ color: "gray", marginBottom: 10 }}>{degree.subtitle}</Text>
      <Text>{degree.description}</Text>
    </View>
  );
};

export default DegreeDetail;
