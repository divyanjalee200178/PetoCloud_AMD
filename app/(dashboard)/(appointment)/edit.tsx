import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from "react-native"
import React, { useEffect, useState } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"
import { getAppointmentById, updateAppointment } from "@/services/appointmentService"
import { useLoader } from "@/context/LoaderContext"
import { Appointment } from "@/types/appointment"
import { MaterialIcons } from "@expo/vector-icons"
import "../../../global.css"

const AppointmentEditScreen = () => {
  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>()
  const { showLoader, hideLoader } = useLoader()

  const [appointment, setAppointment] = useState<Appointment>({
    petName: "",
    petAge: 0,
    date: "",
    day: "",
    time: "",
    location: "",
    reason: "",
    vetName: "",
    status: "Scheduled",
  })

  useEffect(() => {
    if (!id) return
    const fetchAppointment = async () => {
      try {
        showLoader()
        const data = await getAppointmentById(id)
        if (data) setAppointment(data)
        else Alert.alert("Error", "Appointment not found")
      } catch (err) {
        console.error(err)
        Alert.alert("Error", "Failed to load appointment")
      } finally {
        hideLoader()
      }
    }
    fetchAppointment()
  }, [id])

  const handleUpdate = async () => {
    if (!appointment.petName.trim() || !appointment.date.trim()) {
      return Alert.alert("Validation", "Pet Name and Date are required")
    }
    try {
      showLoader()
      await updateAppointment(id!, appointment)
      router.back()
    } catch (err) {
      console.error(err)
      Alert.alert("Error", "Failed to update appointment")
    } finally {
      hideLoader()
    }
  }

  const fieldIcons = {
    petName: "pets",
    petAge: "cake",
    date: "event",
    day: "calendar-today",
    time: "access-time",
    location: "location-on",
    reason: "assignment",
    vetName: "medical-services",
    status: "check-circle",
  }

  return (
    <View className="flex-1 bg-blue-50">
      {/* Header */}
      <View className="bg-blue-500 p-6 pt-12 rounded-b-3xl shadow-lg">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center p-2 rounded-full bg-blue-400"
          >
            <MaterialIcons name="arrow-back" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/dash")}
            className="flex-row items-center p-2 rounded-full bg-blue-400"
          >
            <MaterialIcons name="home" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/new")}
            className="flex-row items-center p-2 rounded-full bg-blue-400"
          >
            <MaterialIcons name="add" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-3xl font-bold text-white">Appointment</Text>
          <View className="bg-blue-400 px-3 py-1 rounded-full">
            <Text className="text-white text-xs font-medium">
              ID: {id?.substring(0, 6)}...
            </Text>
          </View>
        </View>

        {/* Navigation buttons */}
        <View className="flex-row items-center justify-between mt-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-1 bg-blue-400 mx-1 py-2 rounded-xl items-center"
          >
            <Text className="text-white font-medium">Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 bg-blue-300 mx-1 py-2 rounded-xl items-center"
            disabled
          >
            <Text className="text-white font-medium">Appointment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/new")}
            className="flex-1 bg-blue-400 mx-1 py-2 rounded-xl items-center"
          >
            <Text className="text-white font-medium">New</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Form */}
      <ScrollView
        className="flex-1 p-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100">
          {Object.keys(fieldIcons).map((field) => (
            <View key={field} className="mb-5">
              <Text className="text-blue-800 font-medium mb-2 capitalize">
                {field.replace("pet", "Pet ")}
              </Text>
              <View className="flex-row items-center border border-blue-200 rounded-xl px-4 py-3 bg-blue-50">
                <MaterialIcons
                  name={fieldIcons[field as keyof typeof fieldIcons] as React.ComponentProps<typeof MaterialIcons>["name"]}
                  size={20}
                  color="#3b82f6"
                />
                <TextInput
                  placeholder={`Enter ${field}`}
                  className="flex-1 text-blue-900 ml-2"
                  keyboardType={field === "petAge" ? "numeric" : "default"}
                  value={appointment[field as keyof Appointment]?.toString() ?? ""}
                  onChangeText={(text) =>
                    setAppointment({
                      ...appointment,
                      [field]:
                        field === "petAge"
                          ? Number(text)
                          : field === "status"
                          ? (text as Appointment["status"])
                          : text,
                    })
                  }
                />
              </View>
            </View>
          ))}

          <View className="flex-row space-x-4 mt-2">
            <TouchableOpacity
              className="flex-1 bg-gray-200 p-4 rounded-xl shadow-sm flex-row items-center justify-center"
              onPress={() => router.back()}
            >
              <MaterialIcons name="cancel" size={20} color="#4b5563" />
              <Text className="text-gray-700 text-lg font-medium ml-2">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 bg-blue-500 p-4 rounded-xl shadow-md flex-row items-center justify-center"
              onPress={handleUpdate}
            >
              <MaterialIcons name="save" size={20} color="white" />
              <Text className="text-white text-lg font-semibold ml-2">Update</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Info Box */}
        <View className="bg-blue-100 p-4 rounded-xl mt-6 border border-blue-200">
          <View className="flex-row items-center mb-2">
            <MaterialIcons name="info" size={20} color="#3b82f6" />
            <Text className="text-blue-800 font-semibold ml-2">Editing Tips</Text>
          </View>
          <Text className="text-blue-700 text-sm">
            • Make sure all information is accurate before saving{"\n"}
            • Required fields: Pet Name and Date{"\n"}
            • Changes will be reflected immediately
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default AppointmentEditScreen
