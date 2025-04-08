import React from 'react';
import { View, Text } from 'react-native';
import CustomDropdown from '../../../../../components/CustomDropdown';
import CustomInput from '../../../../../components/CustomInput';

const AfterALStepALResults = ({ formData, setFormData }) => {
    const ALsubjects = [
        { label: 'Mathematics', value: 'Mathematics' },
        { label: 'Physics', value: 'Physics' },
        { label: 'Chemistry', value: 'Chemistry' },
    ];

    const results = [
        { label: 'A', value: 'A' },
        { label: 'B', value: 'B' },
        { label: 'C', value: 'C' },
        { label: 'S', value: 'S' },
        { label: 'F', value: 'F' },
    ];

    return (
        <View>
            {/* Existing Dropdowns */}
            <CustomDropdown
                title="AL Stream"
                items={[]}
                selectedValue={formData.AL.stream}
                setSelectedValue={(value) =>
                    setFormData({ ...formData, AL: { ...formData.AL, stream: value } })
                }
            />
            <CustomDropdown
                title="AL Year"
                items={[]}
                selectedValue={formData.AL.year}
                setSelectedValue={(value) =>
                    setFormData({ ...formData, AL: { ...formData.AL, year: value } })
                }
            />
            <CustomInput
                placeholder="Z Score"
                value={formData.AL.zScore}
                onChangeText={(text) =>
                    setFormData({ ...formData, AL: { ...formData.AL, zScore: text } })
                }
            />
            <CustomDropdown
                title="District"
                items={[]}
                selectedValue={formData.AL.district}
                setSelectedValue={(value) =>
                    setFormData({ ...formData, AL: { ...formData.AL, district: value } })
                }
            />

            {/* Subjects */}
            {[1, 2, 3].map((num, index) => (
                <View key={num} className="flex-row justify-between space-x-2">
                    <View className="flex-1">
                        <CustomDropdown
                            title={`Subject ${num}`}
                            items={ALsubjects}
                            selectedValue={formData.AL.subjects[index].subject}
                            setSelectedValue={(value) => {
                                let newSubjects = [...formData.AL.subjects];
                                newSubjects[index].subject = value;
                                setFormData({ ...formData, AL: { ...formData.AL, subjects: newSubjects } });
                            }}
                        />
                    </View>
                    <View className="w-1/3 ml-2">
                        <CustomDropdown
                            title="Result"
                            items={results}
                            selectedValue={formData.AL.subjects[index].result}
                            setSelectedValue={(value) => {
                                let newSubjects = [...formData.AL.subjects];
                                newSubjects[index].result = value;
                                setFormData({ ...formData, AL: { ...formData.AL, subjects: newSubjects } });
                            }}
                        />
                    </View>
                </View>
            ))}

            {/* General English */}
            <View className="flex-row justify-between space-x-2 mt-4">
                <View className="flex-1">
                    <Text className="bg-gray-100 text-base rounded-lg px-4 py-5 border border-gray-300">
                        General English
                    </Text>
                </View>
                <View className="w-1/3 ml-2 -mt-4">
                    <CustomDropdown
                        title="Result"
                        items={results}
                        selectedValue={formData.AL.generalEnglish}
                        setSelectedValue={(value) =>
                            setFormData({
                                ...formData,
                                AL: {
                                    ...formData.AL,
                                    generalEnglish: value
                                }
                            })
                        }
                    />
                </View>
            </View>

            {/* Common General Test */}
            <View className="flex-row justify-between space-x-2 mt-4">
                <View className="flex-1">
                    <Text className="bg-gray-100 text-base rounded-lg px-4 py-5 border border-gray-300">
                        Common General Test
                    </Text>
                </View>
                <View className="w-1/3 ml-2 -mt-4">
                    <CustomInput
                        placeholder="Marks"
                        keyboardType="numeric"
                        value={formData.AL.commonGeneralTest}
                        onChangeText={(text) =>
                            setFormData({
                                ...formData,
                                AL: {
                                    ...formData.AL,
                                    commonGeneralTest: text
                                }
                            })
                        }
                    />
                </View>
            </View>

        </View>
    );
};

export default AfterALStepALResults;
