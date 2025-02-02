import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import CustomInput from '../../components/CustomInput';
import CustomDropdown from '../../components/CustomDropdown';
import CustomButton from '../../components/CustomButton';

const SignIn = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items] = useState([
    { label: 'Student', value: 'Student' },
    { label: 'Teacher', value: 'Teacher' },
    { label: 'Admin', value: 'Admin' },
  ]);

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="px-6 my-6">
          {/* Back Button */}
          <TouchableOpacity className="mb-5">
            <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>

          {/* Title */}
          <Text className="text-4xl font-bold text-gray-900 mb-6">
            Hello! Welcome to U - Navigator
          </Text>

          {/* Input Fields */}
          <CustomInput placeholder="Username" />
          <CustomInput placeholder="Email" />
          <CustomInput placeholder="Password" secureTextEntry />
          <CustomInput placeholder="Confirm Password" secureTextEntry />

          {/* Dropdown Picker */}
          <CustomDropdown 
            items={items} 
            selectedValue={selectedCategory} 
            setSelectedValue={setSelectedCategory} 
          />

          <CustomButton 
            title="Next" 
            onPress={() => console.log('Next pressed')} 
            isLoading={false} // Set true to see the spinner
          />

          {/* Login Navigation */}
          <View className="flex-row justify-center mt-4">
            <Text className="text-gray-600">Already have an account? </Text>
            <TouchableOpacity>
              <Text className="text-blue-500 font-medium">Login Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
