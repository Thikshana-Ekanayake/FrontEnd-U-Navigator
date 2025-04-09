import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import CustomDropdown from '../../../../components/CustomDropdown';

const AfterALStepOLResults = ({ onDataChange, defaultData = {} }) => {
    const coreSubjects = ['Mathematics', 'Science', 'English', 'Sinhala', 'History'];

    const categorySubjects = {
        Religion: ['Buddhism', 'Christianity', 'Islam', 'Hinduism'],
        Category1: ['Commerce', 'Art', 'ICT'],
        Category2: ['Geography', 'Civic', 'Health'],
        Category3: ['Music', 'Dancing', 'Drama']
    };

    const results = ['A', 'B', 'C', 'S', 'F'].map(r => ({ label: r, value: r }));

    const [subjects, setSubjects] = useState(() => {
        const initial = {};
        coreSubjects.forEach(sub => {
            initial[sub] = defaultData[sub] || '';
        });
        Object.keys(categorySubjects).forEach(cat => {
            initial[cat] = {
                subject: defaultData[cat]?.subject || '',
                result: defaultData[cat]?.result || ''
            };
        });
        return initial;
    });

    useEffect(() => {
        onDataChange(subjects);
    }, [subjects]);

    const handleCategoryChange = (cat, key, value) => {
        setSubjects(prev => ({
            ...prev,
            [cat]: {
                ...prev[cat],
                [key]: value
            }
        }));
    };

    return (
        <View>
            {/* Core Subjects */}
            {coreSubjects.map((subject, index) => (
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

            {/* Category-based Dropdowns */}
            {Object.entries(categorySubjects).map(([cat, subjectList], idx) => (
                <View key={cat} className="">
                    <View className="flex-row justify-between space-x-2">
                        <View className="flex-1">
                            <CustomDropdown
                                title={cat}
                                items={subjectList.map(s => ({ label: s, value: s }))}
                                selectedValue={subjects[cat]?.subject || ''}
                                setSelectedValue={(val) => handleCategoryChange(cat, 'subject', val)}
                            />
                        </View>
                        <View className="w-1/3 ml-2">
                            <CustomDropdown
                                title="Result"
                                items={results}
                                selectedValue={subjects[cat]?.result || ''}
                                setSelectedValue={(val) => handleCategoryChange(cat, 'result', val)}
                            />
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
};

export default AfterALStepOLResults;