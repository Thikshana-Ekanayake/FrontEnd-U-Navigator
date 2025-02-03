import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import CustomInput from '../../components/CustomInput';
import CustomDropdown from '../../components/CustomDropdown';
import CustomButton from '../../components/CustomButton';
import * as Progress from 'react-native-progress';
import { MotiView } from 'moti';

const SignIn = () => {
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
      subjects: [{ subject: '', result: '' }, { subject: '', result: '' }, { subject: '', result: '' }]
    },
    OL: {
      subjects: {}
    }
  });

  const categories = [
    { label: 'Pre-AL', value: 'Pre-AL' },
    { label: 'After-AL', value: 'After-AL' },
    { label: 'Admin', value: 'Admin' },
  ];

  const ALsubjects = [
    { label: 'Mathematics', value: 'Mathematics' },
    { label: 'Physics', value: 'Physics' },
    { label: 'Chemistry', value: 'Chemistry' },
  ];

  const OLsubjects = [
    'Mathematics', 'Science', 'English', 'Sinhala', 
    'Buddhism', 'Religion', 'History'
  ].map(sub => ({ label: sub, value: sub }));

  const results = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
    { label: 'S', value: 'S' },
    { label: 'F', value: 'F' },
  ];

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

          {/* Dynamic Title */}
          <Text className="text-3xl font-bold text-gray-900 mb-6">
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

          {/* Animated Form Fields */}
          <MotiView 
            key={step}
            from={{ opacity: 0, translateX: 100 }} 
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: -100 }}
            transition={{ type: "spring", duration: 400 }}
          >
            {/* Step 1: User Info */}
            {step === 1 && (
              <>
                <CustomInput 
                  placeholder="Username" 
                  value={formData.username} 
                  onChangeText={(text) => setFormData({ ...formData, username: text })}
                />
                <CustomInput 
                  placeholder="Email" 
                  value={formData.email} 
                  onChangeText={(text) => setFormData({ ...formData, email: text })}
                />
                <CustomInput 
                  placeholder="Password" 
                  secureTextEntry 
                  value={formData.password} 
                  onChangeText={(text) => setFormData({ ...formData, password: text })}
                />
                <CustomDropdown 
                  title="Select Category"
                  items={categories} 
                  selectedValue={formData.category} 
                  setSelectedValue={(value) => setFormData({ ...formData, category: value })}
                />
              </>
            )}

            {/* Step 2 & 3: Category-Based Forms */}
            {formData.category === 'After-AL' ? (
              <>
                {/* Step 2: AL Results */}
                {step === 2 && (
                  <>
                    <CustomDropdown 
                      title="AL Stream" 
                      items={[]} 
                      selectedValue={formData.AL.stream}
                      setSelectedValue={(value) => setFormData({ ...formData, AL: { ...formData.AL, stream: value } })}
                    />
                    <CustomDropdown 
                      title="AL Year" 
                      items={[]} 
                      selectedValue={formData.AL.year}
                      setSelectedValue={(value) => setFormData({ ...formData, AL: { ...formData.AL, year: value } })}
                    />
                    <CustomInput 
                      placeholder="Z Score" 
                      value={formData.AL.zScore} 
                      onChangeText={(text) => setFormData({ ...formData, AL: { ...formData.AL, zScore: text } })}
                    />
                    <CustomDropdown 
                      title="District" 
                      items={[]} 
                      selectedValue={formData.AL.district}
                      setSelectedValue={(value) => setFormData({ ...formData, AL: { ...formData.AL, district: value } })}
                    />

                    {[1, 2, 3].map((num, index) => (
                      <View key={num} className="flex-row justify-between space-x-2">
                        <View className="flex-1">
                          <CustomDropdown 
                            title={`Subject ${num}`} 
                            items={ALsubjects} 
                            selectedValue={formData.AL.subjects[index].subject}
                            setSelectedValue={(value) => {
                              let newSubjects = [...formData.AL.subjects];
                              newSubjects[index].subject = value;
                              setFormData({ ...formData, AL: { ...formData.AL, subjects: newSubjects } });
                            }}
                          />
                        </View>
                        <View className="w-1/3 ml-2">
                          <CustomDropdown 
                            title="Result" 
                            items={results} 
                            selectedValue={formData.AL.subjects[index].result}
                            setSelectedValue={(value) => {
                              let newSubjects = [...formData.AL.subjects];
                              newSubjects[index].result = value;
                              setFormData({ ...formData, AL: { ...formData.AL, subjects: newSubjects } });
                            }}
                          />
                        </View>
                      </View>
                    ))}
                  </>
                )}

                {/* Step 3: OL Results */}
                {step === 3 && (
                  <>
                    {OLsubjects.map((subject, index) => (
                      <View key={index} className="flex-row justify-between space-x-2">
                        <View className="flex-1">
                          <Text className="bg-gray-100 text-base rounded-lg px-4 py-5 mt-4 border border-gray-300">{subject.label}</Text>
                        </View>
                        <View className="w-1/3 ml-2">
                          <CustomDropdown 
                            title="Result" 
                            items={results} 
                            selectedValue={formData.OL.subjects[subject.value]}
                            setSelectedValue={(value) => {
                              setFormData({ ...formData, OL: { ...formData.OL, subjects: { ...formData.OL.subjects, [subject.value]: value } } });
                            }}
                          />
                        </View>
                      </View>
                    ))}
                  </>
                )}
              </>
            ) : null}
          </MotiView>

          <CustomButton 
            title={step === totalSteps ? "Submit" : "Next"} 
            onPress={step === totalSteps ? handleSubmit : handleNext} 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
