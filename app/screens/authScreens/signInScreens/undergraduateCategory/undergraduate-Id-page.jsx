import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const UndergraduateIdPage = ({ onDataChange, defaultData = {} }) => {
    const [frontImageUri, setFrontImageUri] = useState(defaultData.studentIdFront || null);
    const [backImageUri, setBackImageUri] = useState(defaultData.studentIdBack || null);

    useEffect(() => {
        onDataChange({
            ...defaultData,
            studentIdFront: frontImageUri,
            studentIdBack: backImageUri,
        });
    }, [frontImageUri, backImageUri]);

    const requestMediaLibraryPermissions = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'We need access to your photo library to select images.');
            return false;
        }
        return true;
    };

    const requestCameraPermissions = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'We need access to your camera to take a photo.');
            return false;
        }
        return true;
    };

    const pickImage = async (setter) => {
        const hasPermission = await requestMediaLibraryPermissions();
        if (!hasPermission) return;

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setter(result.assets[0].uri);
        }
    };

    const takePhoto = async (setter) => {
        const hasPermission = await requestCameraPermissions();
        if (!hasPermission) return;

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setter(result.assets[0].uri);
        }
    };

    return (
        <View className="flex-1 bg-white px-1 pb-8 pt-8">
            <Text className="text-xl font-semibold mb-2">Upload a photo of your Student ID Card</Text>
            <Text className="text-sm text-gray-600 mb-5">
                Please upload clear photos of both the front and back sides of your student ID card.
                We’ll keep your data safe and private.
            </Text>

            {/* Front Side Upload */}
            <Text className="text-base font-medium mb-2">Front Side</Text>
            <TouchableOpacity
                className="border-2 border-blue-500 rounded-2xl py-12 justify-center items-center bg-gray-100 mb-5"
                onPress={() => pickImage(setFrontImageUri)}
            >
                {frontImageUri ? (
                    <Image source={{ uri: frontImageUri }} className="w-48 h-32 rounded-md" />
                ) : (
                    <Text className="text-gray-400 text-base">Select file</Text>
                )}
            </TouchableOpacity>

            {/* Back Side Upload */}
            <Text className="text-base font-medium mb-2">Back Side</Text>
            <TouchableOpacity
                className="border-2 border-blue-500 rounded-2xl py-12 justify-center items-center bg-gray-100 mb-5"
                onPress={() => pickImage(setBackImageUri)}
            >
                {backImageUri ? (
                    <Image source={{ uri: backImageUri }} className="w-48 h-32 rounded-md" />
                ) : (
                    <Text className="text-gray-400 text-base">Select file</Text>
                )}
            </TouchableOpacity>

            <Text className="text-center text-gray-500 mb-4">or</Text>

            {/* Camera Capture Buttons */}
            <TouchableOpacity
                className="bg-blue-100 py-3 rounded-full items-center"
                onPress={() => takePhoto(setFrontImageUri)}
            >
                <Text className="text-blue-600 font-semibold text-base">Open Camera & Take Front Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="bg-blue-100 py-3 rounded-full items-center mt-4"
                onPress={() => takePhoto(setBackImageUri)}
            >
                <Text className="text-blue-600 font-semibold text-base">Open Camera & Take Back Photo</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UndergraduateIdPage;
