import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Platform } from "react-native"
import React, { useState } from "react"
import { useRouter } from "expo-router"
import { createPet } from "@/services/petService"
import { PetProfile } from "@/types/pet"
import { useAuth } from "@/context/AuthContext"
import DateTimePicker from "@react-native-community/datetimepicker"
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
  })

  const [showDatePicker, setShowDatePicker] = useState(false)

  const handleSave = async () => {
    if (!pet.petName || !pet.species || !pet.breed) {
      return Alert.alert("Validation", "Pet name, species, and breed are required.")
    }
    await createPet(pet)
    router.back()
  }

  return (
    <ScrollView className="flex-1 bg-orange-50 p-6">
      {/* Pet Name */}
      <View className="mb-4">
        <Text className="text-orange-800 font-medium mb-1">Pet Name</Text>
        <TextInput
          placeholder="Enter pet name"
          className="bg-white border border-orange-200 rounded-xl px-4 py-3"
          value={pet.petName}
          onChangeText={(text) => setPet({ ...pet, petName: text })}
        />
      </View>

      {/* Species */}
      <View className="mb-4">
        <Text className="text-orange-800 font-medium mb-1">Species</Text>
        <TextInput
          placeholder="Enter species"
          className="bg-white border border-orange-200 rounded-xl px-4 py-3"
          value={pet.species}
          onChangeText={(text) => setPet({ ...pet, species: text })}
        />
      </View>

      {/* Breed */}
      <View className="mb-4">
        <Text className="text-orange-800 font-medium mb-1">Breed</Text>
        <TextInput
          placeholder="Enter breed"
          className="bg-white border border-orange-200 rounded-xl px-4 py-3"
          value={pet.breed}
          onChangeText={(text) => setPet({ ...pet, breed: text })}
        />
      </View>

      {/* Gender Selection */}
      <View className="mb-4">
        <Text className="text-orange-800 font-medium mb-2">Gender</Text>
        <View className="flex-row space-x-2">
          {["Male", "Female", "Other"].map((g) => (
            <TouchableOpacity
              key={g}
              onPress={() => setPet({ ...pet, gender: g as "Male" | "Female" | "Other" })}
              className={`px-4 py-2 rounded-xl border ${
                pet.gender === g ? "bg-orange-500 border-orange-500" : "bg-white border-orange-300"
              }`}
            >
              <Text
                className={`${
                  pet.gender === g ? "text-white font-semibold" : "text-orange-800"
                }`}
              >
                {g}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Age */}
      <View className="mb-4">
        <Text className="text-orange-800 font-medium mb-1">Age</Text>
        <TextInput
          placeholder="Enter age"
          className="bg-white border border-orange-200 rounded-xl px-4 py-3"
          keyboardType="numeric"
          value={pet.age.toString()}
          onChangeText={(text) => setPet({ ...pet, age: Number(text) || 0 })}
        />
      </View>

      {/* Weight */}
      <View className="mb-4">
        <Text className="text-orange-800 font-medium mb-1">Weight (kg)</Text>
        <TextInput
          placeholder="Enter weight"
          className="bg-white border border-orange-200 rounded-xl px-4 py-3"
          value={pet.weight}
          onChangeText={(text) => setPet({ ...pet, weight: text })}
        />
      </View>

      {/* Birthday with Date Picker */}
      <View className="mb-4">
        <Text className="text-orange-800 font-medium mb-1">Birthday</Text>
        <TouchableOpacity
          className="bg-white border border-orange-200 rounded-xl px-4 py-3"
          onPress={() => setShowDatePicker(true)}
        >
          <Text className={pet.birthday ? "text-orange-800" : "text-gray-400"}>
            {pet.birthday || "Select birthday"}
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
        className="bg-orange-500 p-4 rounded-xl mt-4 items-center"
      >
        <Text className="text-white font-semibold text-lg">Save</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default AddPet
