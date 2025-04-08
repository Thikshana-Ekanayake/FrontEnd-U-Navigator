import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import * as Progress from 'react-native-progress';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import CustomButton from '../../components/CustomButton';

import UserInfoStep from '../screens/authScreens/signInScreens/sign-up-user-info.jsx';
import AfterALStepALResults from '../screens/authScreens/signInScreens/afterAlCategory/AfterALForm';
import AfterALStepOLResults from '../screens/authScreens/signInScreens/OLResultsForm';
import PreALForm from '../screens/authScreens/signInScreens/preAlCategory/PreALForm';
import ConsultantForm from "../screens/authScreens/signInScreens/consultantCategory/consultant-form";

const SignUp = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const [category, setCategory] = useState('');
  const [userInfoData, setUserInfoData] = useState({});
  const [alData, setAlData] = useState({});
  const [olData, setOlData] = useState({});
  const [preAlData, setPreAlData] = useState({});
  const [adminData, setAdminData] = useState({});

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    const merged = {
      ...userInfoData,
      AL: alData,
      OL: olData,
      PreAL: preAlData,
      Admin: adminData
    };
    console.log('Merged Form Data:', merged);
  };

  return (
      <SafeAreaView className="bg-white h-full">
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
              <View className="px-6 my-6">
                {step > 1 && (
                    <TouchableOpacity className="mt-4 mb-5" onPress={handleBack}>
                      <ChevronLeft size={24} color="#000" />
                    </TouchableOpacity>
                )}

                <Text className={`text-3xl font-bold text-gray-900 mb-6 ${step === 1 ? 'mt-8' : ''}`}>
                  {step === 1
                      ? 'Hello! Welcome to U - Navigator'
                      : category === 'After-AL'
                          ? step === 2 ? 'AL Results' : 'OL Results'
                          : 'General Information'}
                </Text>

                <Progress.Bar
                    progress={step / totalSteps}
                    width={null}
                    height={8}
                    borderRadius={10}
                    color="#3498db"
                    borderWidth={0}
                    unfilledColor="#e0e0e0"
                />

                <MotiView
                    key={step}
                    from={{ opacity: 0, translateX: 100 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    exit={{ opacity: 0, translateX: -100 }}
                    transition={{ type: 'spring', duration: 400 }}
                >
                  {step === 1 && (
                      <UserInfoStep
                          onDataChange={(data) => {
                            setUserInfoData(data);
                            setCategory(data.category);
                          }}
                          defaultData={userInfoData}
                      />
                  )}

                  {category === 'After-AL' && step === 2 && (
                      <AfterALStepALResults
                          onDataChange={(data) => setAlData(data)}
                          defaultData={alData}
                      />
                  )}
                  {category === 'After-AL' && step === 3 && (
                      <AfterALStepOLResults
                          onDataChange={(data) => setOlData(data)}
                          defaultData={olData}
                      />
                  )}

                  {category === 'Pre-AL' && step > 1 && (
                      <PreALForm
                          onDataChange={(data) => setPreAlData(data)}
                          defaultData={preAlData}
                      />
                  )}

                  {category === 'Admin' && step > 1 && (
                      <ConsultantForm
                          onDataChange={(data) => setAdminData(data)}
                          defaultData={adminData}
                      />
                  )}
                </MotiView>

                <CustomButton
                    title={step === totalSteps ? 'Submit' : 'Next'}
                    onPress={step === totalSteps ? handleSubmit : handleNext}
                />

                <View className="flex-row justify-center mt-4">
                  <Text className="text-gray-600">Already have an account? </Text>
                  <TouchableOpacity onPress={() => router.replace('/sign-in')}>
                    <Text className="text-blue-500 font-medium">Login Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
  );
};

export default SignUp;
