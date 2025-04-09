// AfterALStepALResults.jsx
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import CustomDropdown from '../../../../../components/CustomDropdown';
import CustomInput from '../../../../../components/CustomInput';

import {streamOptions} from "../../../../../constants/subjectsAndStreams/alSubjectsAndSteams";
import {getSubjectsForStream} from "../../../../../utils/streamSubjectFilter";


const AfterALStepALResults = ({ onDataChange, defaultData = {} }) => {
    const [form, setForm] = useState({
        stream: defaultData.stream || '',
        year: defaultData.year || '',
        zScore: defaultData.zScore || '',
        district: defaultData.district || '',
        subjects: defaultData.subjects || [
            { subject: '', result: '' },
            { subject: '', result: '' },
            { subject: '', result: '' }
        ],
        generalEnglish: defaultData.generalEnglish || '',
        commonGeneralTest: defaultData.commonGeneralTest || ''
    });

    useEffect(() => {
        onDataChange(form);
    }, [form]);

    const results = ['A', 'B', 'C', 'S', 'F'].map(r => ({ label: r, value: r }));


    const handleStreamChange = (value) => {
        const updatedSubjects = [
            { subject: '', result: '' },
            { subject: '', result: '' },
            { subject: '', result: '' }
        ];
        setForm({ ...form, stream: value, subjects: updatedSubjects });
    };

    const handleSubjectChange = (index, key, value) => {
        const updatedSubjects = [...form.subjects];
        updatedSubjects[index][key] = value;
        setForm({ ...form, subjects: updatedSubjects });
    };

    return (
        <View>
            <CustomDropdown
                title="AL Stream"
                items={streamOptions}
                selectedValue={form.stream}
                setSelectedValue={handleStreamChange}
            />
            <CustomDropdown
                title="AL Year"
                items={[]} // Populate if needed
                selectedValue={form.year}
                setSelectedValue={(value) => setForm({ ...form, year: value })}
            />
            <CustomInput
                placeholder="Z Score"
                value={form.zScore}
                onChangeText={(text) => setForm({ ...form, zScore: text })}
            />
            <CustomDropdown
                title="District"
                items={[]} // Populate if needed
                selectedValue={form.district}
                setSelectedValue={(value) => setForm({ ...form, district: value })}
            />

            {[0, 1, 2].map((index) => (
                <View key={index} className="flex-row justify-between space-x-2">
                    <View className="flex-1">
                        <CustomDropdown
                            title={`Subject ${index + 1}`}
                            items={getSubjectsForStream(form.stream, index, form.subjects)}
                            selectedValue={form.subjects[index]?.subject}
                            setSelectedValue={(value) => handleSubjectChange(index, 'subject', value)}
                        />


                    </View>
                    <View className="w-1/3 ml-2">
                        <CustomDropdown
                            title="Result"
                            items={results}
                            selectedValue={form.subjects[index]?.result}
                            setSelectedValue={(value) => handleSubjectChange(index, 'result', value)}
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
                        selectedValue={form.generalEnglish}
                        setSelectedValue={(value) => setForm({ ...form, generalEnglish: value })}
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
                        value={form.commonGeneralTest}
                        onChangeText={(text) => setForm({ ...form, commonGeneralTest: text })}
                    />
                </View>
            </View>
        </View>
    );
};

export default AfterALStepALResults;
