import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Eye, EyeOff } from "lucide-react-native";
import { useRouter } from "expo-router";

// Your existing components
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

// Re-usable infrastructure (from the setup I shared)
import { api } from "../../src/api/client";
import { endpoints } from "../../src/api/endpoints";
import { saveToken } from "../../src/storage/secureStore";

const SignIn = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const validate = () => {
        const email = formData.email.trim();
        const pwd = formData.password;
        if (!email || !pwd) {
            Alert.alert("Missing details", "Please enter both email and password.");
            return false;
        }
        // light email check (optional)
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            Alert.alert("Invalid email", "Please enter a valid email address.");
            return false;
        }
        return true;
    };

    const handleLogin = async () => {
        if (!validate()) return;
        setSubmitting(true);
        try {
            // Adjust the request body to match your backend contract if different.
            // Expected: POST /api/auth/login -> { token: string, ...optional fields }
            const { data } = await api.post(endpoints.auth.login, {
                email: formData.email.trim(),
                password: formData.password,
            });

            const token = data?.token;
            if (!token) {
                throw new Error("Login response did not include a token.");
            }

            await saveToken(token);
            // Optionally fetch profile here with api.get(endpoints.auth.me) and store in context
            router.replace("/home");
        } catch (err) {
            const status = err?.response?.status;
            const message =
                err?.response?.data?.message ||
                (status === 401
                    ? "Invalid email or password."
                    : "Unable to sign in. Please try again.");
            Alert.alert("Login failed", message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <SafeAreaView className="bg-white h-full px-6 flex justify-center">
            <Text className="text-4xl font-bold text-primary-g2 mb-6">
                U - <Text className="text-accent">N</Text>avigator
            </Text>

            <CustomInput
                placeholder="Enter your email"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <CustomInput
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
                rightIcon={showPassword ? <EyeOff size={20} color="gray" /> : <Eye size={20} color="gray" />}
                onRightIconPress={() => setShowPassword((s) => !s)}
            />

            <TouchableOpacity className="self-end mt-4">
                <Text className="text-gray-500">Forgot Password?</Text>
            </TouchableOpacity>

            <CustomButton
                title={submitting ? "" : "Login"}
                onPress={handleLogin}
                className="mt-4"
                disabled={submitting}
            >
                {submitting ? <ActivityIndicator /> : null}
            </CustomButton>

            <View className="flex-row justify-center mt-6">
                <Text className="text-gray-500">Don't have an account?</Text>
                <TouchableOpacity onPress={() => router.replace("/sign-up")}>
                    <Text className="text-blue-500 font-semibold"> Register Now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default SignIn;