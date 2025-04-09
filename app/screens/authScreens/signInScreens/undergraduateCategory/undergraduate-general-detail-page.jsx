import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import CustomInput from '../../../../../components/CustomInput';
import CustomDropdown from '../../../../../components/CustomDropdown';

const degreeOptions = [
    { label: 'BSc in Engineering', value: 'bsc_eng' },
    { label: 'BSc in Information Technology', value: 'bsc_it' },
    { label: 'BA in Arts', value: 'ba_arts' },
    { label: 'BBA in Business Administration', value: 'bba' },
    // Add more degrees as needed
];

const universityOptions = [
    { label: 'University of Moratuwa', value: 'uom' },
    { label: 'University of Colombo', value: 'uoc' },
    { label: 'University of Peradeniya', value: 'uop' },
    { label: 'University of Ruhuna', value: 'uor' },
    { label: 'University of Kelaniya', value: 'uok' },
    // Add more if needed
];

const yearOptions = Array.from({ length: 10 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { label: year.toString(), value: year.toString() };
});

const UndergraduateGeneralDetailPage = ({ onDataChange, defaultData = {} }) => {
    const [form, setForm] = useState({
        fullName: defaultData.fullName || '',
        university: defaultData.university || '',
        universityEmail: defaultData.universityEmail || '',
        indexNo: defaultData.indexNo || '',
        department: defaultData.department || '',
        degree: defaultData.degree || '',
        enrolledYear: defaultData.enrolledYear || '',
        mobileNumber: defaultData.mobileNumber || ''
    });

    useEffect(() => {
        onDataChange(form);
    }, [form]);

    return (
        <View>
            <CustomInput
                placeholder="Full Name"
                value={form.fullName}
                onChangeText={(text) => setForm({ ...form, fullName: text })}
            />

            <CustomDropdown
                title="University"
                items={universityOptions}
                selectedValue={form.university}
                setSelectedValue={(value) => setForm({ ...form, university: value })}
            />

            <CustomInput
                placeholder="University Email"
                keyboardType="email-address"
                value={form.universityEmail}
                onChangeText={(text) => setForm({ ...form, universityEmail: text })}
            />

            <CustomInput
                placeholder="Index Number"
                value={form.indexNo}
                onChangeText={(text) => setForm({ ...form, indexNo: text })}
            />

            <CustomInput
                placeholder="Department"
                value={form.department}
                onChangeText={(text) => setForm({ ...form, department: text })}
            />

            <CustomDropdown
                title="Degree Program"
                items={degreeOptions}
                selectedValue={form.degree}
                setSelectedValue={(value) => setForm({ ...form, degree: value })}
            />

            <CustomDropdown
                title="Enrolled Year"
                items={yearOptions}
                selectedValue={form.enrolledYear}
                setSelectedValue={(value) => setForm({ ...form, enrolledYear: value })}
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

export default UndergraduateGeneralDetailPage;
