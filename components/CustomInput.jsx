import { TextInput } from 'react-native';
import React from 'react';

const CustomInput = ({ placeholder, secureTextEntry = false, value, onChangeText }) => {
  return (
    <TextInput
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
      className="bg-gray-100 text-base rounded-lg px-4 py-5 mt-4 border border-gray-300"
    />
  );
};

export default CustomInput;
