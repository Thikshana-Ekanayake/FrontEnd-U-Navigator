// screens/AfterALStepOLResults.js
import React from 'react';
import { View, Text } from 'react-native';
import CustomDropdown from '../../../../components/CustomDropdown';

const AfterALStepOLResults = ({ formData, setFormData }) => {
    const OLsubjects = [
        'Mathematics', 'Science', 'English', 'Sinhala',
        'Buddhism', 'Religion', 'History'
    ].map(sub => ({ label: sub, value: sub }));

    const results = [
        { label: 'A', value: 'A' },
        { label: 'B', value: 'B' },
        { label: 'C', value: 'C' },
        { label: 'S', value: 'S' },
        { label: 'F', value: 'F' },
    ];

    return (
        <View>
            {OLsubjects.map((subject, index) => (
                <View key={index} className="flex-row justify-between space-x-2">
                    <View className="flex-1">
                        <Text className="bg-gray-100 text-base rounded-lg px-4 py-5 mt-4 border border-gray-300">
                            {subject.label}
                        </Text>
                    </View>
                    <View className="w-1/3 ml-2">
                        <CustomDropdown
                            title="Result"
                            items={results}
                            selectedValue={formData.OL.subjects[subject.value]}
                            setSelectedValue={(value) => {
                                setFormData({
                                    ...formData,
                                    OL: {
                                        ...formData.OL,
                                        subjects: {
                                            ...formData.OL.subjects,
                                            [subject.value]: value
                                        }
                                    }
                                });
                            }}
                        />
                    </View>
                </View>
            ))}
        </View>
    );
};

export default AfterALStepOLResults;
