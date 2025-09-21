import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { register } from "@/services/authService";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoadingReg, setIsLoadingReg] = useState<boolean>(false);

  const handleRegister = async () => {
    if (isLoadingReg) return;

    setIsLoadingReg(true);
    await register(email, password)
      .then((res) => {
        console.log(res);
        router.back();
      })
      .catch((err) => {
        console.error(err);
        Alert.alert("Registration Failed", "Something went wrong");
      })
      .finally(() => {
        setIsLoadingReg(false);
      });
  };

  return (
    <View className="flex-1 bg-orange-50 justify-center p-6">
      <Text className="text-3xl font-extrabold mb-8 text-orange-600 text-center">
        Register
      </Text>

      <TextInput
        placeholder="Email"
        className="bg-white border border-orange-300 rounded-xl px-5 py-4 mb-5 text-gray-900 shadow-sm"
        placeholderTextColor="#F97316"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        className="bg-white border border-orange-300 rounded-xl px-5 py-4 mb-5 text-gray-900 shadow-sm"
        placeholderTextColor="#F97316"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        className="bg-orange-500 p-4 rounded-xl mb-4 shadow-md"
        onPress={handleRegister}
      >
        {isLoadingReg ? (
          <ActivityIndicator color="#fff" size="large" />
        ) : (
          <Text className="text-center text-2xl text-white font-semibold">
            Register
          </Text>
        )}
      </TouchableOpacity>

      <Pressable onPress={() => router.back()}>
        <Text className="text-center text-orange-600 text-lg mt-3 underline">
          Already have an account? Login
        </Text>
      </Pressable>
    </View>
  );
};

export default Register;
