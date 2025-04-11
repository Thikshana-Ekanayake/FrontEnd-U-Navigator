import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal } from "react-native";
import { X } from "lucide-react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const universities = ["UoM", "UCSC", "NSBM", "SLIIT", "CINEC", "IIT", "KDU"];
const streams = ["Physical Science", "Bioscience", "Commerce", "Arts", "Technology"];
const degreeTypes = ["BSc", "BA", "BEng", "BIT", "BBA"];
const durations = ["3 Years", "4 Years"];
const intakes = ["January", "April", "September"];

const AdvancedFilterModal = ({ visible, onClose }) => {
    const renderPillList = (data) => (
        <View className="flex-row flex-wrap gap-2 mt-2">
            {data.map((item) => (
                <TouchableOpacity key={item} className="px-4 py-2 rounded-full border border-gray-300 bg-white">
                    <Text className="text-sm text-gray-700">{item}</Text>
                </TouchableOpacity>
            ))}
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
                            {renderPillList(universities)}
                        </View>

                        <View className="mb-4">
                            <Text className="font-semibold text-base text-gray-800">Stream</Text>
                            {renderPillList(streams)}
                        </View>

                        <View className="mb-4">
                            <Text className="font-semibold text-base text-gray-800">Degree Type</Text>
                            {renderPillList(degreeTypes)}
                        </View>

                        <View className="mb-4">
                            <Text className="font-semibold text-base text-gray-800">Duration</Text>
                            {renderPillList(durations)}
                        </View>

                        <View className="mb-4">
                            <Text className="font-semibold text-base text-gray-800">Intake</Text>
                            {renderPillList(intakes)}
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
