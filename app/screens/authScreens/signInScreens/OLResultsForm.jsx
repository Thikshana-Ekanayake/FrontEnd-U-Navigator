import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import CustomDropdown from '../../../../components/CustomDropdown';

const AfterALStepOLResults = ({ onDataChange, defaultData = {} }) => {
    const subjectsList = [
        'Mathematics', 'Science', 'English', 'Sinhala',
        'Buddhism', 'Religion', 'History'
    ];

    const [subjects, setSubjects] = useState(() => {
        const initial = {};
        subjectsList.forEach(sub => {
            initial[sub] = defaultData[sub] || '';
        });
        return initial;
    });

    useEffect(() => {
        onDataChange(subjects);
    }, [subjects]);

    const results = ['A', 'B', 'C', 'S', 'F'].map(r => ({ label: r, value: r }));

    return (
        <View>
            {subjectsList.map((subject, index) => (
                <View key={index} className="flex-row justify-between space-x-2 mt-4">
                    <View className="flex-1">
                        <Text className="bg-gray-100 text-base rounded-lg px-4 py-5 border border-gray-300">
                            {subject}
                        </Text>
                    </View>
                    <View className="w-1/3 ml-2 -mt-4">
                        <CustomDropdown
                            title="Result"
                            items={results}
                            selectedValue={subjects[subject]}
                            setSelectedValue={(value) =>
                                setSubjects(prev => ({ ...prev, [subject]: value }))
                            }
                        />
                    </View>
                </View>
            ))}
        </View>
    );
};

export default AfterALStepOLResults;
