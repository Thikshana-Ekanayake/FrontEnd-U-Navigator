import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { View } from 'react-native';
import CustomInput from '../../../../components/CustomInput';
import CustomDropdown from '../../../../components/CustomDropdown';

const SignUpUserInfo = forwardRef(({ onDataChange, defaultData = {} }, ref) => {
    const [username, setUsername] = useState(defaultData.username || '');
    const [email, setEmail] = useState(defaultData.email || '');
    const [password, setPassword] = useState(defaultData.password || '');
    const [category, setCategory] = useState(defaultData.category || '');
    const [errors, setErrors] = useState({});

    const categories = [
        { label: 'Pre-AL', value: 'Pre-AL' },
        { label: 'After-AL', value: 'After-AL' },
        { label: 'Consultant', value: 'Consultant' },
        { label: 'Undergraduate', value: 'Undergraduate' },
    ];

    useEffect(() => {
        onDataChange({ username, email, password, category });
    }, [username, email, password, category]);

    const validate = () => {
        const newErrors = {};

        if (!username.trim()) newErrors.username = 'Username is required';
        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = 'Enter a valid email';
        }
        if (!password.trim()) newErrors.password = 'Password is required';
        if (!category) newErrors.category = 'Category is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useImperativeHandle(ref, () => ({
        validate,
    }));

    const handleUsernameChange = (value) => {
        setUsername(value);
        if (errors.username && value.trim()) {
            setErrors((prev) => ({ ...prev, username: undefined }));
        }
    };

    const handleEmailChange = (value) => {
        setEmail(value);
        if (
            errors.email &&
            value.trim() &&
            /^\S+@\S+\.\S+$/.test(value)
        ) {
            setErrors((prev) => ({ ...prev, email: undefined }));
        }
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
        if (errors.password && value.trim()) {
            setErrors((prev) => ({ ...prev, password: undefined }));
        }
    };

    const handleCategoryChange = (value) => {
        setCategory(value);
        if (errors.category && value) {
            setErrors((prev) => ({ ...prev, category: undefined }));
        }
    };

    return (
        <View>
            <CustomInput
                placeholder="Username"
                value={username}
                onChangeText={handleUsernameChange}
                error={errors.username}
            />
            <CustomInput
                placeholder="Email"
                value={email}
                onChangeText={handleEmailChange}
                error={errors.email}
            />
            <CustomInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={handlePasswordChange}
                error={errors.password}
            />
            <CustomDropdown
                title="Select Category"
                items={categories}
                selectedValue={category}
                setSelectedValue={handleCategoryChange}
                error={errors.category}
            />
        </View>
    );
});

export default SignUpUserInfo;
