import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import CustomInput from '../../../../components/CustomInput';
import CustomDropdown from '../../../../components/CustomDropdown';

const StepOneUserInfo = ({ onDataChange, defaultData = {} }) => {
    const [username, setUsername] = useState(defaultData.username || '');
    const [email, setEmail] = useState(defaultData.email || '');
    const [password, setPassword] = useState(defaultData.password || '');
    const [category, setCategory] = useState(defaultData.category || '');

    const categories = [
        { label: 'Pre-AL', value: 'Pre-AL' },
        { label: 'After-AL', value: 'After-AL' },
        { label: 'Consultant', value: 'Consultant' },
        { label: 'Undergraduate', value: 'Undergraduate' },
    ];

    // Pass form data to parent whenever any field updates
    useEffect(() => {
        onDataChange({ username, email, password, category });
    }, [username, email, password, category]);

    return (
        <View>
            <CustomInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <CustomInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <CustomInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <CustomDropdown
                title="Select Category"
                items={categories}
                selectedValue={category}
                setSelectedValue={setCategory}
            />
        </View>
    );
};

export default StepOneUserInfo;
