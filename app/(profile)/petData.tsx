import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Platform, Image } from "react-native"
import React, { useState } from "react"
import { useRouter } from "expo-router"
import { createPet } from "@/services/petService"
import { PetProfile } from "@/types/pet"
import { useAuth } from "@/context/AuthContext"
import DateTimePicker from "@react-native-community/datetimepicker"
import { MaterialIcons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import "../../global.css";

const AddPet = () => {
  const router = useRouter()
  const { user } = useAuth()

  const [pet, setPet] = useState<PetProfile>({
    petName: "",
    age: 0,
    gender: "Male",
    weight: "",
    species: "",
    breed: "",
    birthday: "",
    userId: user?.uid,
    imageUri: "", // 🆕
  })

  const [showDatePicker, setShowDatePicker] = useState(false)

  // 🆕 Image Picker Function
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== "granted") {
      Alert.alert("Permission Required", "We need access to your gallery 📸")
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.8,
    })

    if (!result.canceled) {
      setPet({ ...pet, imageUri: result.assets[0].uri })
    }
  }

  const handleSave = async () => {
    if (!pet.petName || !pet.species || !pet.breed) {
      return Alert.alert("Validation ⚠️", "Pet name, species, and breed are required.")
    }
    await createPet(pet) // save with imageUri too
    router.back()
  }

  return (
    <View className="flex-1 bg-orange-50">
      {/* Fixed Header */}
      <View className="flex-row justify-between items-center p-4 bg-orange-500 shadow-md z-50">
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text className="text-white font-bold text-lg">Add New Pet 🐾</Text>
        <TouchableOpacity onPress={() => Alert.alert("Cart", "Your pet cart is empty 🛒")}>
          <MaterialIcons name="shopping-cart" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Form */}
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        <View className="bg-white rounded-2xl shadow-lg p-6">
          {/* 🆕 Pet Image Upload */}
          <View className="mb-4 items-center">
            {pet.imageUri ? (
              <Image
                source={{ uri: pet.imageUri }}
                className="w-32 h-32 rounded-full mb-2"
              />
            ) : (
              <View className="w-32 h-32 rounded-full bg-orange-100 items-center justify-center mb-2">
                <MaterialIcons name="pets" size={48} color="#FB923C" />
              </View>
            )}
            <TouchableOpacity
              onPress={pickImage}
              className="bg-orange-500 px-4 py-2 rounded-lg"
            >
              <Text className="text-white font-medium">📷 Pick Image</Text>
            </TouchableOpacity>
          </View>

          {/* Pet Name */}
          <View className="mb-4">
            <Text className="text-orange-800 font-medium mb-1">🐶 Pet Name</Text>
            <TextInput
              placeholder="Enter pet name 🐾"
              className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3"
              value={pet.petName}
              onChangeText={(text) => setPet({ ...pet, petName: text })}
            />
          </View>

          {/* Species */}
          <View className="mb-4">
            <Text className="text-orange-800 font-medium mb-1">🦴 Species</Text>
            <TextInput
              placeholder="Enter species 🐕🐈"
              className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3"
              value={pet.species}
              onChangeText={(text) => setPet({ ...pet, species: text })}
            />
          </View>

          {/* Breed */}
          <View className="mb-4">
            <Text className="text-orange-800 font-medium mb-1">🏷️ Breed</Text>
            <TextInput
              placeholder="Enter breed ✨"
              className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3"
              value={pet.breed}
              onChangeText={(text) => setPet({ ...pet, breed: text })}
            />
          </View>

          {/* Gender */}
          <View className="mb-4">
            <Text className="text-orange-800 font-medium mb-2">⚧ Gender</Text>
            <View className="flex-row space-x-2">
              {["Male", "Female", "Other"].map((g) => (
                <TouchableOpacity
                  key={g}
                  onPress={() => setPet({ ...pet, gender: g as "Male" | "Female" | "Other" })}
                  className={`px-4 py-2 rounded-xl border ${
                    pet.gender === g ? "bg-orange-500 border-orange-500" : "bg-white border-orange-300"
                  }`}
                >
                  <Text className={`${pet.gender === g ? "text-white font-semibold" : "text-orange-800"}`}>
                    {g === "Male" ? "♂️ Male" : g === "Female" ? "♀️ Female" : "🌈 Other"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Age */}
          <View className="mb-4">
            <Text className="text-orange-800 font-medium mb-1">🎂 Age</Text>
            <TextInput
              placeholder="Enter age 🐾"
              className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3"
              keyboardType="numeric"
              value={pet.age.toString()}
              onChangeText={(text) => setPet({ ...pet, age: Number(text) || 0 })}
            />
          </View>

          {/* Weight */}
          <View className="mb-4">
            <Text className="text-orange-800 font-medium mb-1">⚖️ Weight (kg)</Text>
            <TextInput
              placeholder="Enter weight 🏋️‍♂️"
              className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3"
              value={pet.weight}
              onChangeText={(text) => setPet({ ...pet, weight: text })}
            />
          </View>

          {/* Birthday */}
          <View className="mb-4">
            <Text className="text-orange-800 font-medium mb-1">🎉 Birthday</Text>
            <TouchableOpacity
              className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3"
              onPress={() => setShowDatePicker(true)}
            >
              <Text className={pet.birthday ? "text-orange-800" : "text-gray-400"}>
                {pet.birthday || "Select birthday 📅"}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={pet.birthday ? new Date(pet.birthday) : new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false)
                  if (selectedDate) {
                    setPet({ ...pet, birthday: selectedDate.toISOString().split("T")[0] })
                  }
                }}
              />
            )}
          </View>

          {/* Save Button */}
          <TouchableOpacity
            onPress={handleSave}
            className="bg-orange-500 p-4 rounded-xl mt-4 items-center shadow-lg"
          >
            <Text className="text-white font-semibold text-lg">💾 Save Pet</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default AddPet
