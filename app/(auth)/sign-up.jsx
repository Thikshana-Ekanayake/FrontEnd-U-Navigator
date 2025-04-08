// screens/SignUp.js
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import * as Progress from 'react-native-progress';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import CustomButton from '../../components/CustomButton';

// Modularized form components
import UserInfoStep from '../screens/authScreens/signInScreens/sign-up-category-view.jsx';
import AfterALStepALResults from '../screens/authScreens/signInScreens/afterAlCategory/AfterALForm';
import AfterALStepOLResults from '../screens/authScreens/signInScreens/OLResultsForm';
import PreALForm from '../screens/authScreens/signInScreens/preAlCategory/PreALForm';
import ConsultantForm from "../screens/authScreens/signInScreens/consultantCategory/consultant-form";

const SignUp = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    category: '',
    AL: {
      stream: '',
      year: '',
      zScore: '',
      district: '',
      subjects: [{ subject: '', result: '' }, { subject: '', result: '' }, { subject: '', result: '' }],
      generalEnglish: '',
      commonGeneralTest: '',

    },
    OL: {
      subjects: {}
    },
    PreAL: {
      grade: '',
      school: ''
    },
    Admin: {
      employeeID: '',
      role: ''
    }
  });

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log('User Data:', formData);
  };

  return (
      <SafeAreaView className="bg-white h-full">
        <ScrollView>
          <View className="px-6 my-6">
            {/* Back Button */}
            {step > 1 && (
                <TouchableOpacity className="mt-4 mb-5" onPress={handleBack}>
                  <ChevronLeft size={24} color="#000" />
                </TouchableOpacity>
            )}

            {/* Title */}
            <Text className={`text-3xl font-bold text-gray-900 mb-6 ${step === 1 ? 'mt-8' : ''}`}>
              {step === 1
                  ? 'Hello! Welcome to U - Navigator'
                  : formData.category === 'After-AL'
                      ? step === 2 ? 'AL Results' : 'OL Results'
                      : 'General Information'}
            </Text>

            {/* Progress Bar */}
            <Progress.Bar
                progress={step / totalSteps}
                width={null}
                height={8}
                borderRadius={10}
                color="#3498db"
                borderWidth={0}
                unfilledColor="#e0e0e0"
            />

            {/* Animated Content */}
            <MotiView
                key={step}
                from={{ opacity: 0, translateX: 100 }}
                animate={{ opacity: 1, translateX: 0 }}
                exit={{ opacity: 0, translateX: -100 }}
                transition={{ type: 'spring', duration: 400 }}
            >
              {/* Step 1: Basic Info */}
              {step === 1 && (
                  <UserInfoStep formData={formData} setFormData={setFormData} />
              )}

              {/* After-AL Steps */}
              {formData.category === 'After-AL' && step === 2 && (
                  <AfterALStepALResults formData={formData} setFormData={setFormData} />
              )}
              {formData.category === 'After-AL' && step === 3 && (
                  <AfterALStepOLResults formData={formData} setFormData={setFormData} />
              )}

              {/* Pre-AL */}
              {formData.category === 'Pre-AL' && step > 1 && (
                  <PreALForm formData={formData} setFormData={setFormData} />
              )}

              {/* Admin */}
              {formData.category === 'Admin' && step > 1 && (
                  <ConsultantForm formData={formData} setFormData={setFormData} />
              )}
            </MotiView>

            {/* Button */}
            <CustomButton
                title={step === totalSteps ? 'Submit' : 'Next'}
                onPress={step === totalSteps ? handleSubmit : handleNext}
            />

            {/* Already have an account */}
            <View className="flex-row justify-center mt-4">
              <Text className="text-gray-600">Already have an account? </Text>
              <TouchableOpacity onPress={() => router.replace('/sign-in')}>
                <Text className="text-blue-500 font-medium">Login Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
  );
};

export default SignUp;
