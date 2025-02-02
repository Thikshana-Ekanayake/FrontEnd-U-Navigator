import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const CustomButton = ({ 
  title, 
  onPress, 
  isLoading = false, 
  containerStyles = '', 
  textStyles = '' 
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`bg-blue-500 rounded-xl py-6 flex flex-row justify-center items-center ${containerStyles} ${
        isLoading ? 'opacity-50' : ''
      }`}
      disabled={isLoading}
    >
      <Text className={`text-white text-center font-medium text-base ${textStyles}`}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
