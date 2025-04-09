import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import CustomInput from '../../../../../components/CustomInput';
import CustomDropdown from '../../../../../components/CustomDropdown';

const universityOptions = [
    { label: 'University of Moratuwa', value: 'uom' },
    { label: 'University of Colombo', value: 'uoc' },
    { label: 'University of Peradeniya', value: 'uop' },
    { label: 'University of Ruhuna', value: 'uor' },
    { label: 'University of Kelaniya', value: 'uok' },
    // Add more if needed
];

const ConsultationDetailsForm = ({ onDataChange, defaultData = {} }) => {
    const [form, setForm] = useState({
        name: defaultData.name || '',
        university: defaultData.university || '',
        department: defaultData.department || '',
        universityEmail: defaultData.universityEmail || '',
        mobileNumber: defaultData.mobileNumber || ''
    });

    useEffect(() => {
        onDataChange(form);
    }, [form]);

    return (
        <View>
            <CustomInput
                placeholder="Full Name"
                value={form.name}
                onChangeText={(text) => setForm({ ...form, name: text })}
            />

            <CustomDropdown
                title="University"
                items={universityOptions}
                selectedValue={form.university}
                setSelectedValue={(value) => setForm({ ...form, university: value })}
            />

            <CustomInput
                placeholder="Department"
                value={form.department}
                onChangeText={(text) => setForm({ ...form, department: text })}
            />

            <CustomInput
                placeholder="University Email"
                keyboardType="email-address"
                value={form.universityEmail}
                onChangeText={(text) => setForm({ ...form, universityEmail: text })}
            />

            <CustomInput
                placeholder="Mobile Number"
                keyboardType="phone-pad"
                value={form.mobileNumber}
                onChangeText={(text) => setForm({ ...form, mobileNumber: text })}
            />
        </View>
    );
};

export default ConsultationDetailsForm;
