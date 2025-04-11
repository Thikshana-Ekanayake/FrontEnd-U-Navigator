import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal } from "react-native";
import { X } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const universities = ["UoM", "UCSC", "NSBM", "SLIIT", "CINEC", "IIT", "KDU"];
const streams = ["Physical Science", "Bioscience", "Commerce", "Arts", "Technology"];
const degreeTypes = ["BSc", "BA", "BEng", "BIT", "BBA"];
const durations = ["3 Years", "4 Years"];
const intakes = ["January", "April", "September"];

const AdvancedFilterModal = ({ visible, onClose }) => {
    const [selectedFilters, setSelectedFilters] = useState({
        universities: [],
        streams: [],
        degreeTypes: [],
        durations: [],
        intakes: [],
    });

    const toggleFilter = (category, value) => {
        setSelectedFilters((prev) => {
            const isSelected = prev[category].includes(value);
            const updated = isSelected
                ? prev[category].filter((item) => item !== value)
                : [...prev[category], value];
            return { ...prev, [category]: updated };
        });
    };

    const renderPillList = (data, category) => (
        <View className="flex-row flex-wrap gap-2 mt-2">
            {data.map((item) => {
                const selected = selectedFilters[category].includes(item);
                return (
                    <TouchableOpacity
                        key={item}
                        onPress={() => toggleFilter(category, item)}
                        className={`px-4 py-2 rounded-full border flex-row items-center ${
                            selected ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
                        }`}
                    >
                        <Text className={`text-sm ${selected ? "text-blue-600 font-semibold" : "text-gray-700"}`}>
                            {item}
                        </Text>
                        {selected && <Text className="ml-1 text-blue-600">✓</Text>}
                    </TouchableOpacity>
                );
            })}
        </View>
    );

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <SafeAreaView className="flex-1 bg-white px-4 pt-6 mt-3 pb-3">
                <View className="flex-1 bg-white rounded-t-3xl mt-auto p-4">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-lg font-bold text-gray-900">Advanced Filters</Text>
                        <TouchableOpacity onPress={onClose}>
                            <X size={22} color="gray" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View className="mb-4">
                            <Text className="font-semibold text-base text-gray-800">University</Text>
                            {renderPillList(universities, "universities")}
                        </View>

                        <View className="mb-4">
                            <Text className="font-semibold text-base text-gray-800">Stream</Text>
                            {renderPillList(streams, "streams")}
                        </View>

                        <View className="mb-4">
                            <Text className="font-semibold text-base text-gray-800">Degree Type</Text>
                            {renderPillList(degreeTypes, "degreeTypes")}
                        </View>

                        <View className="mb-4">
                            <Text className="font-semibold text-base text-gray-800">Duration</Text>
                            {renderPillList(durations, "durations")}
                        </View>

                        <View className="mb-4">
                            <Text className="font-semibold text-base text-gray-800">Intake</Text>
                            {renderPillList(intakes, "intakes")}
                        </View>
                    </ScrollView>

                    <TouchableOpacity className="mt-4 bg-blue-600 py-3 rounded-full">
                        <Text className="text-white text-center font-semibold">Show Results</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

export default AdvancedFilterModal;
