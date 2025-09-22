import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { register } from "@/services/authService";
import { Ionicons } from "@expo/vector-icons";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoadingReg, setIsLoadingReg] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const handleRegister = async () => {
    if (isLoadingReg) return;

    // Basic validation
    if (!email || !password || !confirmPassword) {
      Alert.alert("Missing Fields", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Weak Password", "Password must be at least 6 characters");
      return;
    }

    setIsLoadingReg(true);
    await register(email, password)
      .then((res) => {
        console.log(res);
        Alert.alert("Success", "Account created successfully!", [
          { text: "OK", onPress: () => router.back() }
        ]);
      })
      .catch((err) => {
        console.error(err);
        Alert.alert("Registration Failed", "Something went wrong. Please try again.");
      })
      .finally(() => {
        setIsLoadingReg(false);
      });
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="light-content" backgroundColor="#f97316" />

      {/* Orange Background */}
      <View className="absolute inset-0 bg-orange-500" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-6 py-8">

          {/* Header Section */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-white rounded-full items-center justify-center mb-4 shadow-lg">
              <Ionicons name="person-add" size={32} color="#ea580c" />
            </View>
            <Text className="text-4xl font-bold text-white mb-2">
              Create Account
            </Text>
            <Text className="text-orange-100 text-lg text-center leading-6">
              Join us today and start your journey
            </Text>
          </View>

          {/* Form Container */}
          <View className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 mx-2 shadow-2xl border border-white/20">

            {/* Email Input */}
            <View className="mb-5">
              <Text className="text-gray-700 font-semibold mb-2 ml-1">Email Address</Text>
              <View className="relative">
                <TextInput
                  placeholder="Enter your email"
                  className="bg-gray-50 border-2 border-orange-200 rounded-2xl px-5 py-4 text-gray-900 text-lg font-medium focus:border-orange-500"
                  placeholderTextColor="#9ca3af"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
                <View className="absolute right-4 top-1/2 -translate-y-1/2">
                  <Ionicons name="mail-outline" size={20} color="#f97316" />
                </View>
              </View>
            </View>

            {/* Password Input */}
            <View className="mb-5">
              <Text className="text-gray-700 font-semibold mb-2 ml-1">Password</Text>
              <View className="relative">
                <TextInput
                  placeholder="Create a password"
                  className="bg-gray-50 border-2 border-orange-200 rounded-2xl px-5 py-4 pr-12 text-gray-900 text-lg font-medium focus:border-orange-500"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  autoComplete="new-password"
                />
                <TouchableOpacity
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#f97316"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password Input */}
            <View className="mb-6">
              <Text className="text-gray-700 font-semibold mb-2 ml-1">Confirm Password</Text>
              <View className="relative">
                <TextInput
                  placeholder="Confirm your password"
                  className="bg-gray-50 border-2 border-orange-200 rounded-2xl px-5 py-4 pr-12 text-gray-900 text-lg font-medium focus:border-orange-500"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  autoComplete="new-password"
                />
                <TouchableOpacity
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons
                    name={showConfirmPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#f97316"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Register Button */}
            <TouchableOpacity
              className={`bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl py-4 mb-4 shadow-lg ${
                isLoadingReg ? 'opacity-75' : ''
              }`}
              onPress={handleRegister}
              disabled={isLoadingReg}
              activeOpacity={0.8}
            >
              {isLoadingReg ? (
                <View className="flex-row items-center justify-center">
                  <ActivityIndicator color="#fff" size="small" className="mr-2" />
                  <Text className="text-white text-lg font-bold">Creating Account...</Text>
                </View>
              ) : (
                <View className="flex-row items-center justify-center">
                  <Text className="text-black text-xl font-bold mr-2">Create Account</Text>
                  <Ionicons name="arrow-forward" size={20} color="#fff" />
                </View>
              )}
            </TouchableOpacity>

            {/* Terms and Conditions */}
            <Text className="text-gray-500 text-sm text-center mb-4 leading-5">
              By creating an account, you agree to our{' '}
              <Text className="text-orange-600 font-semibold">Terms of Service</Text>
              {' '}and{' '}
              <Text className="text-orange-600 font-semibold">Privacy Policy</Text>
            </Text>

          </View>

          {/* Login Link */}
          <View className="mt-8 items-center">
            <Pressable
              onPress={() => router.back()}
              className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/30"
            >
              <View className="flex-row items-center">
                <Ionicons name="log-in-outline" size={20} color="#fff" className="mr-2" />
                <Text className="text-white text-lg font-semibold">
                  Already have an account? Sign In
                </Text>
              </View>
            </Pressable>
          </View>

          {/* Social Login Section (Optional) */}
          <View className="mt-8 items-center">
            <Text className="text-white/80 text-base mb-4">Or continue with</Text>
            <View className="flex-row space-x-4">
              <TouchableOpacity className="bg-white rounded-2xl p-3 shadow-lg">
                <Ionicons name="logo-google" size={24} color="#ea4335" />
              </TouchableOpacity>
              <TouchableOpacity className="bg-white rounded-2xl p-3 shadow-lg">
                <Ionicons name="logo-apple" size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity className="bg-white rounded-2xl p-3 shadow-lg">
                <Ionicons name="logo-facebook" size={24} color="#1877f2" />
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;