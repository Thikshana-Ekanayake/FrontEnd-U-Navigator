import React, { useMemo } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal } from "react-native";
import { X, Check } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { degreesData } from "../../sampleData/degreeData";

const AdvancedFilterModal = ({ visible, onClose, selectedFilters, setSelectedFilters }) => {
    const {
        universityOptions,
        streamOptions,
        degreeTypeOptions,
        durationOptions,
    } = useMemo(() => {
        const uniSet = new Set();
        const streamSet = new Set();
        const typeSet = new Set();
        const durationSet = new Set();

        degreesData.forEach((degree) => {
            if (degree.stream) streamSet.add(degree.stream);
            if (degree.degreeType) typeSet.add(degree.degreeType);
            if (degree.duration) durationSet.add(degree.duration);
            if (degree.subtitle) uniSet.add(degree.subtitle); // directly using full name
        });

        return {
            universityOptions: Array.from(uniSet),
            streamOptions: Array.from(streamSet),
            degreeTypeOptions: Array.from(typeSet),
            durationOptions: Array.from(durationSet),
        };
    }, []);

    const renderPillList = (data) => (
        <View className="flex-row flex-wrap gap-2 mt-2">
            {data.map((item) => {
                const isSelected = selectedFilters.includes(item);
                return (
                    <TouchableOpacity
                        key={item}
                        onPress={() => {
                            setSelectedFilters((prev) =>
                                isSelected ? prev.filter((f) => f !== item) : [...prev, item]
                            );
                        }}
                        className={`px-4 py-2 rounded-full flex-row items-center border ${
                            isSelected ? "border-blue-600 bg-blue-100" : "border-gray-300 bg-white"
                        }`}
                    >
                        <Text className={`text-sm ${isSelected ? "text-blue-600" : "text-gray-700"}`}>
                            {item}
                        </Text>
                        {isSelected && <Check size={16} color="#2563eb" className="ml-1" />}
                    </TouchableOpacity>
                );
            })}
        </View>
    );

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <SafeAreaView className="flex-1 bg-white px-4 pt-6 mt-4 pb-3">
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
                            {renderPillList(universityOptions)}
                        </View>

                        <View className="mb-4">
                            <Text className="font-semibold text-base text-gray-800">Stream</Text>
                            {renderPillList(streamOptions)}
                        </View>

                        <View className="mb-4">
                            <Text className="font-semibold text-base text-gray-800">Degree Type</Text>
                            {renderPillList(degreeTypeOptions)}
                        </View>

                        <View className="mb-4">
                            <Text className="font-semibold text-base text-gray-800">Duration</Text>
                            {renderPillList(durationOptions)}
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
