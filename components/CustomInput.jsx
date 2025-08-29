import { TextInput, View, TouchableOpacity, Text } from 'react-native';
import React from 'react';

const CustomInput = ({
                       placeholder,
                       secureTextEntry = false,
                       value,
                       onChangeText,
                       rightIcon = null,
                       onRightIconPress = null,
                       error = null
                     }) => {
  const inputStyles = `text-base rounded-lg px-4 py-5 mt-4 border pr-12 ${
      error
          ? 'bg-red-50 border-red-500 text-red-500'
          : 'bg-gray-100 border-gray-300 text-black'
  }`;

  return (
      <View className="relative w-full">
        <TextInput
            placeholder={placeholder}
            placeholderTextColor={error ? '#EF4444' : '#9CA3AF'}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
            className={inputStyles}
        />

        {rightIcon && (
            <TouchableOpacity onPress={onRightIconPress} className="absolute right-5 top-9">
              {rightIcon}
            </TouchableOpacity>
        )}

        {error && (
            <Text className="text-red-500 text-sm mt-1 ml-1">
              {typeof error === 'string' ? error : 'This field is required'}
            </Text>
        )}
      </View>
  );
};

export default CustomInput;
