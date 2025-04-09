import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import * as Progress from 'react-native-progress';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';
import CustomButton from '../../components/CustomButton';

import UserInfoStep from '../screens/authScreens/signInScreens/sign-up-user-info.jsx';
import AfterALStepALResults from '../screens/authScreens/signInScreens/afterAlCategory/after-al-form';
import OLResults from '../screens/authScreens/signInScreens/ol-results-form';
import PreALStepALResults from '../screens/authScreens/signInScreens/preAlCategory/pre-al-form';
import ConsultantForm from "../screens/authScreens/signInScreens/consultantCategory/consultant-form";

const SignUp = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [category, setCategory] = useState('');

  //data holders
  const [userInfoData, setUserInfoData] = useState({});
  const [alData, setAlData] = useState({});
  const [olData, setOlData] = useState({});
  const [preAlData, setPreAlData] = useState({});
  const [adminData, setAdminData] = useState({});

  const getTotalSteps = () => {
    switch (category) {
      case 'After-AL':
      case 'Pre-AL':
        return 3;
      case 'Admin':
        return 2;
      default:
        return 1;
    }
  };

  const getStepTitle = () => {
    if (step === 1) {
      return 'Hello! Welcome to U - Navigator';
    }

    switch (category) {
      case 'After-AL':
        if (step === 2) return 'Enter your A/L Results';
        if (step === 3) return 'Enter your O/L Results';
        break;

      case 'Pre-AL':
        if (step === 2) return 'Enter Your A/L Stream Preference';
        if (step === 3) return 'Enter Your O/L Results';
        break;

      case 'Admin':
      case 'Consultant':
        return 'Admin/Consultant Information';

      case 'Undergraduate':
        if (step === 2) return 'Degree Information';
        if (step === 3) return 'Personal Achievements';
        break;

      default:
        return 'General Information';
    }
  };


  const totalSteps = getTotalSteps();


  const handleNext = () => {
    if (step < getTotalSteps()) setStep(step + 1);
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
                  {getStepTitle()}
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
                      <OLResults
                          onDataChange={(data) => setOlData(data)}
                          defaultData={olData}
                      />
                  )}

                  {category === 'Pre-AL' && step === 2 && (
                      <PreALStepALResults
                          onDataChange={(data) => setPreAlData(data)}
                          defaultData={preAlData}
                      />
                  )}

                  {category === 'Pre-AL' && step === 3 && (
                      <OLResults
                          onDataChange={(data) => setOlData(data)}
                          defaultData={olData}
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
