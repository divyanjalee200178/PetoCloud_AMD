import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native"
import React, { useEffect, useState } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"
import { getPetById, updatePet } from "@/services/petService"
import { PetProfile } from "@/types/pet"

const EditPet = () => {
  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>()
  const [pet, setPet] = useState<PetProfile | null>(null)

  useEffect(() => {
    if (!id) return
    const loadPet = async () => {
      const data = await getPetById(id)
      if (data) setPet(data)
    }
    loadPet()
  }, [id])

  const handleUpdate = async () => {
    if (!pet?.petName || !pet.species || !pet.breed) {
      return Alert.alert("Validation", "Pet name, species, and breed are required.")
    }
    await updatePet(id!, pet)
    router.back()
  }

  if (!pet) return <Text className="p-6">Loading...</Text>

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
        onPress={handleUpdate}
        className="bg-orange-500 p-4 rounded-xl mt-4 items-center"
      >
        <Text className="text-white font-semibold text-lg">Update</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default EditPet
