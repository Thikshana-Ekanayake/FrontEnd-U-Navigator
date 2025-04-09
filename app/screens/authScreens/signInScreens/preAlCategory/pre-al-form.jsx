import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import CustomDropdown from '../../../../../components/CustomDropdown';
import CustomInput from '../../../../../components/CustomInput';

import { streamOptions } from '../../../../../constants/subjectsAndStreams/alSubjectsAndSteams';
import { getSubjectsForStream } from '../../../../../utils/streamSubjectFilter';

const PreALStepALResults = ({ onDataChange, defaultData = {} }) => {
    const [form, setForm] = useState({
        stream: defaultData.stream || '',
        year: defaultData.year || '',
        district: defaultData.district || '',
        subjects: defaultData.subjects || [
            { subject: '' },
            { subject: '' },
            { subject: '' }
        ]
    });

    useEffect(() => {
        onDataChange(form);
    }, [form]);

    const handleStreamChange = (value) => {
        const updatedSubjects = [
            { subject: '' },
            { subject: '' },
            { subject: '' }
        ];
        setForm({ ...form, stream: value, subjects: updatedSubjects });
    };

    const handleSubjectChange = (index, value) => {
        const updatedSubjects = [...form.subjects];
        updatedSubjects[index].subject = value;
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
                title="AL Year (Expected)"
                items={[]} // You can populate this later
                selectedValue={form.year}
                setSelectedValue={(value) => setForm({ ...form, year: value })}
            />
            <CustomDropdown
                title="District"
                items={[]} // You can populate this later
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
                            setSelectedValue={(value) => handleSubjectChange(index, value)}
                        />
                    </View>
                </View>
            ))}
        </View>
    );
};

export default PreALStepALResults;
