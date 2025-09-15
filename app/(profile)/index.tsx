import { View, Text, FlatList, TouchableOpacity } from "react-native"
import React, { useEffect, useState } from "react"
import { useRouter } from "expo-router"
import { getPetsByUserId, deletePet } from "@/services/petService"
import { PetProfile } from "@/types/pet"
import { MaterialIcons } from "@expo/vector-icons"
import { useAuth } from "@/context/AuthContext"

const ProfileList = () => {
  const router = useRouter()
  const { user } = useAuth()
  const [pets, setPets] = useState<PetProfile[]>([])

  useEffect(() => {
    if (!user?.uid) return
    loadPets()
  }, [user])

  const loadPets = async () => {
    const data = await getPetsByUserId(user.uid)
    setPets(data)
  }

  const handleDelete = async (id?: string) => {
    if (!id) return
    await deletePet(id)
    loadPets()
  }

  return (
    <View className="flex-1 bg-orange-50 p-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold text-orange-800">My Pets</Text>
        <TouchableOpacity
          onPress={() => router.push("/profile/new")}
          className="bg-orange-500 px-4 py-2 rounded-xl"
        >
          <Text className="text-white font-medium">+ Add Pet</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={pets}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <View className="bg-white p-4 rounded-xl mb-3 flex-row items-center justify-between shadow-sm">
            <View>
              <Text className="text-lg font-semibold text-orange-900">{item.petName}</Text>
              <Text className="text-sm text-gray-600">
                {item.breed} • {item.species}
              </Text>
              <Text className="text-sm text-gray-500">
                Age: {item.age} • Weight: {item.weight}kg
              </Text>
            </View>
            <View className="flex-row">
              <TouchableOpacity
                onPress={() => router.push(`/profile/edit?id=${item.id}`)}
                className="mr-3"
              >
                <MaterialIcons name="edit" size={22} color="#f97316" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <MaterialIcons name="delete" size={22} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  )
}

export default ProfileList
