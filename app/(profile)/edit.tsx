import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getPetById, updatePet } from "@/services/petService";
import { PetProfile } from "@/types/pet";
import { LinearGradient } from "expo-linear-gradient";

const EditPet = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [pet, setPet] = useState<PetProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const loadPet = async () => {
      setIsLoading(true);
      try {
        const data = await getPetById(id);
        if (data) {
          setPet({
            ...data,
            age: Number(data.age) || 0,
            weight: Number(data.weight) || 0,
          });
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load pet details");
      } finally {
        setIsLoading(false);
      }
    };
    loadPet();
  }, [id]);

  const handleUpdate = async () => {
    if (!pet?.petName || !pet.species || !pet.breed) {
      return Alert.alert("Validation", "Pet name, species, and breed are required.");
    }

    try {
      const updatedPet = {
        ...pet,
        age: Number(pet.age) || 0,
        weight: Number(pet.weight) || 0,
      };
      await updatePet(id!, updatedPet);
      Alert.alert("Success", "Pet details updated successfully!");
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to update pet details");
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-orange-50 justify-center items-center">
        <Text className="text-4xl mb-4">🐕</Text>
        <Text className="text-orange-700 text-lg font-medium">Loading pet details...</Text>
      </View>
    );
  }

  if (!pet) {
    return (
      <View className="flex-1 bg-orange-50 justify-center items-center p-6">
        <Text className="text-4xl mb-4">😿</Text>
        <Text className="text-orange-700 text-lg text-center font-medium mb-4">
          Unable to load pet details. Please try again.
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 bg-orange-500 px-6 py-3 rounded-xl shadow-md"
        >
          <Text className="text-white font-medium">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-orange-100">
      {/* Header with Orange Gradient */}
      <LinearGradient
        colors={["#ffedd5", "#fed7aa"]}
        className="p-5 rounded-b-3xl shadow-md"
      >
        <Text className="text-black text-2xl font-bold text-center">
          Edit Pet Profile 🐾
        </Text>
      </LinearGradient>

      <ScrollView className="p-5" showsVerticalScrollIndicator={false}>
        {/* Profile Image Section */}
        <View className="items-center my-6">
          <View className="bg-white p-2 rounded-2xl shadow-lg">
            <View className="w-24 h-24 bg-orange-100 rounded-2xl items-center justify-center">
              <Text className="text-4xl">
                {pet.species === "cat"
                  ? "🐱"
                  : pet.species === "bird"
                  ? "🐦"
                  : pet.species === "fish"
                  ? "🐠"
                  : pet.species === "rabbit"
                  ? "🐰"
                  : "🐕"}
              </Text>
            </View>
          </View>
          <TouchableOpacity className="mt-4 bg-orange-500 px-4 py-2 rounded-full">
            <Text className="text-white font-medium">Change Photo 📸</Text>
          </TouchableOpacity>
        </View>

        {/* Basic Information Card */}
        <View className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <View className="flex-row items-center mb-4">
            <Text className="text-orange-500 text-xl mr-2">📋</Text>
            <Text className="text-orange-800 text-xl font-bold">
              Basic Information
            </Text>
          </View>

          {["petName", "species", "breed", "gender"].map((field) => (
            <View key={field} className="mb-5">
              <Text className="text-orange-700 font-semibold mb-2 flex-row items-center">
                {field === "petName"
                  ? "🐶 Pet Name"
                  : field === "species"
                  ? "🔍 Species"
                  : field === "breed"
                  ? "🏷️ Breed"
                  : "⚧️ Gender"}
              </Text>
              <TextInput
                placeholder={`Enter ${field === "petName" ? "pet name" : field}`}
                className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 text-orange-900"
                value={pet[field as keyof PetProfile]?.toString() || ""}
                onChangeText={(text) =>
                  setPet({
                    ...pet,
                    [field]: text,
                  })
                }
              />
            </View>
          ))}
        </View>

        {/* Details Card */}
        <View className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <View className="flex-row items-center mb-4">
            <Text className="text-orange-500 text-xl mr-2">📊</Text>
            <Text className="text-orange-800 text-xl font-bold">Details</Text>
          </View>

          {["age", "weight", "birthday"].map((field) => (
            <View key={field} className="mb-5">
              <Text className="text-orange-700 font-semibold mb-2 flex-row items-center">
                {field === "age"
                  ? "🎂 Age"
                  : field === "weight"
                  ? "⚖️ Weight"
                  : "📅 Birthday"}
              </Text>
              <TextInput
                placeholder={`Enter ${field}`}
                className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 text-orange-900"
                keyboardType={
                  field === "age" || field === "weight" ? "numeric" : "default"
                }
                value={pet[field as keyof PetProfile]?.toString() || ""}
                onChangeText={(text) =>
                  setPet({
                    ...pet,
                    [field]:
                      field === "age" || field === "weight"
                        ? Number(text) || 0
                        : (text as string),
                  })
                }
              />
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-between mt-2 mb-8">
          <TouchableOpacity
            onPress={() => router.back()}
            className="border-2 border-orange-500 py-4 rounded-xl flex-1 mr-3 items-center shadow-sm"
          >
            <Text className="text-orange-600 font-semibold text-lg">
              Cancel ❌
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleUpdate}
            className="bg-orange-500 py-4 rounded-xl flex-1 ml-3 items-center shadow-md"
          >
            <Text className="text-white font-semibold text-lg">Update ✅</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Section */}
        <View className="items-center mt-6 mb-10">
          <Text className="text-orange-600 text-sm font-medium text-center">
            ❤️ Keep your pet’s profile updated to ensure the best care!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditPet;
