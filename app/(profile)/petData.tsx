import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native"
import React, { useState } from "react"
import { useRouter } from "expo-router"
import { createPet } from "@/services/petService"
import { PetProfile } from "@/types/pet"
import { useAuth } from "@/context/AuthContext"

const AddPet = () => {
  const router = useRouter()
  const { user } = useAuth()

  const [pet, setPet] = useState<PetProfile>({
    petName: "",
    age: 0,
    gender: "Male",
    weight: 0,
    species: "",
    breed: "",
    birthday: "",
    userId: user?.uid,
  })

  const handleSave = async () => {
    if (!pet.petName || !pet.species || !pet.breed) {
      return Alert.alert("Validation", "Pet name, species, and breed are required.")
    }
    await createPet(pet)
    router.back()
  }

  return (
    <ScrollView className="flex-1 bg-orange-50 p-6">
      {["petName", "species", "breed", "gender", "age", "weight", "birthday"].map((field) => (
        <View key={field} className="mb-4">
          <Text className="text-orange-800 font-medium mb-1 capitalize">{field}</Text>
          <TextInput
            placeholder={`Enter ${field}`}
            className="bg-white border border-orange-200 rounded-xl px-4 py-3"
            keyboardType={field === "age" || field === "weight" ? "numeric" : "default"}
            value={pet[field as keyof PetProfile]?.toString() || ""}
            onChangeText={(text) =>
              setPet({
                ...pet,
                [field]:
                  field === "age" || field === "weight" ? Number(text) : (text as string),
              })
            }
          />
        </View>
      ))}

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
