import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useRouter } from 'expo-router';

const SignIn = ({ navigation }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  // Placeholder login handler (Replace this with real authentication later)
  const handleLogin = () => {
    // if (formData.email === 'admin' && formData.password === 'admin') {
    //   router.replace('/home'); // Navigate to Home
    // } else {
    //   Alert.alert('Login Failed', 'Invalid email or password.');
    // }
    router.replace('/home');
  };

  return (
    <SafeAreaView className="bg-white h-full px-6 flex justify-center">
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} className="absolute top-20 left-6">
        <ChevronLeft size={24} color="#000" />
      </TouchableOpacity>

      {/* Logo / Title */}
      <Text className="text-4xl font-bold text-primary-g2 mb-6">
        U - <Text className="text-accent">N</Text>avigator
      </Text>

      {/* Input Fields */}
      <CustomInput 
        placeholder="Enter your email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        keyboardType="email-address"
      />

      <CustomInput 
        placeholder="Enter your password"
        secureTextEntry={!showPassword}
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        rightIcon={showPassword ? <EyeOff size={20} color="gray" /> : <Eye size={20} color="gray" />}
        onRightIconPress={() => setShowPassword(!showPassword)}
      />

      {/* Forgot Password */}
      <TouchableOpacity className="self-end mt-4">
        <Text className="text-gray-500">Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <CustomButton title="Login" onPress={handleLogin} className="mt-4" />

      {/* Register Link */}
      <View className="flex-row justify-center mt-6">
        <Text className="text-gray-500">Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.replace('/sign-up')}>
          <Text className="text-blue-500 font-semibold"> Register Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
