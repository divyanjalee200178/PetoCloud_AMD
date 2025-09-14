import { View, Text, ScrollView, TouchableOpacity, Pressable, Alert } from "react-native"
import React, { useEffect, useState } from "react"
import { useRouter } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"
import { onSnapshot } from "firebase/firestore"
import { healthRef, deleteHealth } from "@/services/healthService"
import { useLoader } from "@/context/LoaderContext"
import { HealthRecord } from "@/types/health"

const HealthScreen = () => {
  const [records, setRecords] = useState<HealthRecord[]>([])
  const router = useRouter()
  const { showLoader, hideLoader } = useLoader()

  useEffect(() => {
    const unsubscribe = onSnapshot(
      healthRef,
      snapshot => {
        const list: HealthRecord[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as HealthRecord))
        setRecords(list)
      },
      error => console.error(error)
    )
    return () => unsubscribe()
  }, [])

  const handleDelete = (id: string) => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel" },
      { text: "Delete", onPress: async () => {
          try { showLoader(); await deleteHealth(id) } finally { hideLoader() }
        }
      }
    ])
  }

  return (
    <View className="flex-1 p-4">
      <Text className="text-4xl mb-4">Health Records</Text>
      <ScrollView>
        {records.map(record => (
          <View key={record.id} className="bg-gray-200 p-4 mb-3 rounded border">
            <Text className="font-semibold text-lg">{record.petName}</Text>
            <Text>Date: {record.date} | Day: {record.day} | Time: {record.time}</Text>
            <Text>Location: {record.location} | Age: {record.petAge}</Text>

            <View className="flex-row space-x-2 mt-2">
            <TouchableOpacity
              className="bg-yellow-200 px-3 py-1 rounded"
              onPress={() => record.id && router.push(`/edit?id=${record.id}`)}
            >
              <Text>Edit</Text>
            </TouchableOpacity>

              <TouchableOpacity className="bg-red-500 px-3 py-1 rounded" onPress={() => record.id && handleDelete(record.id)}>
                <Text className="text-white">Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View className="absolute bottom-5 right-5">
        <Pressable className="bg-blue-800 p-5 rounded-full shadow-lg" onPress={() => router.push("/(dashboard)/health/new")}>
          <MaterialIcons name="add" size={28} color="#fff" />
        </Pressable>
      </View>
    </View>
  )
}

export default HealthScreen
