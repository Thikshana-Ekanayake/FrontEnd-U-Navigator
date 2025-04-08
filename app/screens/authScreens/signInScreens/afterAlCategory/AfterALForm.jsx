// screens/AfterALStepALResults.js
import React from 'react';
import { View } from 'react-native';
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
        </View>
    );
};

export default AfterALStepALResults;
