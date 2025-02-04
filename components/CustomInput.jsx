import { TextInput, View, TouchableOpacity } from 'react-native';
import React from 'react';

const CustomInput = ({ 
  placeholder, 
  secureTextEntry = false, 
  value, 
  onChangeText, 
  rightIcon = null, 
  onRightIconPress = null 
}) => {
  return (
    <View className="relative">
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        className="bg-gray-100 text-base rounded-lg px-4 py-5 mt-4 border border-gray-300 pr-12"
      />
      
      {/* Right Icon (if provided) */}
      {rightIcon && (
        <TouchableOpacity 
          onPress={onRightIconPress} 
          className="absolute right-5 top-9"
        >
          {rightIcon}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomInput;
