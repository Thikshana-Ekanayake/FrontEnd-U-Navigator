// screens/StepOneUserInfo.js
import React from 'react';
import { View } from 'react-native';
import CustomInput from '../../../../components/CustomInput';
import CustomDropdown from '../../../../components/CustomDropdown';

const StepOneUserInfo = ({ formData, setFormData }) => {
    const categories = [
        { label: 'Pre-AL', value: 'Pre-AL' },
        { label: 'After-AL', value: 'After-AL' },
        { label: 'Admin', value: 'Admin' },
    ];

    return (
        <View>
            <CustomInput
                placeholder="Username"
                value={formData.username}
                onChangeText={(text) => setFormData({ ...formData, username: text })}
            />
            <CustomInput
                placeholder="Email"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
            <CustomInput
                placeholder="Password"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
            />
            <CustomDropdown
                title="Select Category"
                items={categories}
                selectedValue={formData.category}
                setSelectedValue={(value) => setFormData({ ...formData, category: value })}
            />
        </View>
    );
};

export default StepOneUserInfo;
