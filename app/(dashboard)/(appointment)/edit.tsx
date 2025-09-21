import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  Modal,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getAppointmentById, updateAppointment } from "@/services/appointmentService";
import { useLoader } from "@/context/LoaderContext";
import { Appointment } from "@/types/appointment";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import "../../../global.css";

const STATUS_OPTIONS: Appointment["status"][] = ["Scheduled", "Completed", "Cancelled"];

const AppointmentEditScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { showLoader, hideLoader } = useLoader();

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
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchAppointment = async () => {
      try {
        showLoader();
        const data = await getAppointmentById(id);
        if (data) setAppointment(data);
        else Alert.alert("Error", "Appointment not found");
      } catch (err) {
        console.error(err);
        Alert.alert("Error", "Failed to load appointment");
      } finally {
        hideLoader();
      }
    };
    fetchAppointment();
  }, [id]);

  const handleUpdate = async () => {
    if (!appointment.petName.trim() || !appointment.date.trim()) {
      return Alert.alert("Validation", "Pet Name and Date are required");
    }
    try {
      showLoader();
      await updateAppointment(id!, appointment);
      router.back();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to update appointment");
    } finally {
      hideLoader();
    }
  };

  const fieldIcons = {
    petName: "pets",
    petAge: "cake",
    location: "location-on",
    reason: "assignment",
    vetName: "medical-services",
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split("T")[0];
      const dayStr = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
      setAppointment((prev) => ({ ...prev, date: dateStr, day: dayStr }));
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === "ios");
    if (selectedTime) {
      const hours = selectedTime.getHours();
      const minutes = selectedTime.getMinutes();
      const timeStr = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      setAppointment((prev) => ({ ...prev, time: timeStr }));
    }
  };

  return (
    <View className="flex-1 bg-orange-50">
      {/* Header */}
      <View className="bg-orange-500 p-6 pt-12 rounded-b-3xl shadow-lg">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center p-2 rounded-full bg-orange-400"
          >
            <MaterialIcons name="arrow-back" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/dash")}
            className="flex-row items-center p-2 rounded-full bg-orange-400"
          >
            <MaterialIcons name="home" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/new")}
            className="flex-row items-center p-2 rounded-full bg-orange-400"
          >
            <MaterialIcons name="add" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-3xl font-bold text-white">Appointment</Text>
          <View className="bg-orange-400 px-3 py-1 rounded-full">
            <Text className="text-white text-xs font-medium">ID: {id?.substring(0, 6)}...</Text>
          </View>
        </View>

        {/* Navigation buttons */}
        <View className="flex-row items-center justify-between mt-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-1 bg-orange-400 mx-1 py-2 rounded-xl items-center"
          >
            <Text className="text-white font-medium">Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 bg-orange-300 mx-1 py-2 rounded-xl items-center"
            disabled
          >
            <Text className="text-white font-medium">Appointment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/new")}
            className="flex-1 bg-orange-400 mx-1 py-2 rounded-xl items-center"
          >
            <Text className="text-white font-medium">New</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Form */}
      <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
          {/* Regular Fields */}
          {Object.keys(fieldIcons).map((field) => (
            <View key={field} className="mb-5">
              <Text className="text-orange-800 font-medium mb-2 capitalize">
                {field.replace("pet", "Pet ")}
              </Text>
              <View className="flex-row items-center border border-orange-200 rounded-xl px-4 py-3 bg-orange-50">
                <MaterialIcons
                  name={fieldIcons[field as keyof typeof fieldIcons] as React.ComponentProps<typeof MaterialIcons>["name"]}
                  size={20}
                  color="#f97316"
                />
                <TextInput
                  placeholder={`Enter ${field}`}
                  className="flex-1 text-orange-900 ml-2"
                  keyboardType={field === "petAge" ? "numeric" : "default"}
                  value={appointment[field as keyof Appointment]?.toString() ?? ""}
                  onChangeText={(text) =>
                    setAppointment({ ...appointment, [field]: field === "petAge" ? Number(text) : text })
                  }
                />
              </View>
            </View>
          ))}

          {/* Date Picker */}
          <View className="mb-5">
            <Text className="text-orange-800 font-medium mb-2">Date</Text>
            <TouchableOpacity
              className="flex-row items-center border border-orange-200 rounded-xl px-4 py-3 bg-orange-50"
              onPress={() => setShowDatePicker(true)}
            >
              <MaterialIcons name="event" size={20} color="#f97316" />
              <Text className="ml-2 text-orange-900">{appointment.date || "Select date"}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={appointment.date ? new Date(appointment.date) : new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>

          {/* Time Picker */}
          <View className="mb-5">
            <Text className="text-orange-800 font-medium mb-2">Time</Text>
            <TouchableOpacity
              className="flex-row items-center border border-orange-200 rounded-xl px-4 py-3 bg-orange-50"
              onPress={() => setShowTimePicker(true)}
            >
              <MaterialIcons name="access-time" size={20} color="#f97316" />
              <Text className="ml-2 text-orange-900">{appointment.time || "Select time"}</Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={appointment.time ? new Date(`1970-01-01T${appointment.time}:00`) : new Date()}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            )}
          </View>

          {/* Status Dropdown */}
          <View className="mb-5">
            <Text className="text-orange-800 font-medium mb-2">Status</Text>
            <TouchableOpacity
              className="border border-orange-200 rounded-xl px-4 py-3 bg-orange-50 flex-row justify-between items-center"
              onPress={() => setStatusModalVisible(true)}
            >
              <Text className="text-orange-900">{appointment.status}</Text>
              <MaterialIcons name="arrow-drop-down" size={24} color="#f97316" />
            </TouchableOpacity>

            <Modal visible={statusModalVisible} transparent animationType="slide">
              <TouchableOpacity
                className="flex-1 justify-end bg-black bg-opacity-40"
                onPress={() => setStatusModalVisible(false)}
              >
                <View className="bg-white rounded-t-3xl p-4">
                  <FlatList
                    data={STATUS_OPTIONS}
                    keyExtractor={(item) => item!} // Fixed TypeScript error
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        className="py-3 border-b border-orange-100"
                        onPress={() => {
                          setAppointment((prev) => ({ ...prev, status: item }));
                          setStatusModalVisible(false);
                        }}
                      >
                        <Text className="text-orange-900 text-lg">{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </TouchableOpacity>
            </Modal>
          </View>

          {/* Buttons */}
          <View className="flex-row space-x-4 mt-2">
            <TouchableOpacity
              className="flex-1 bg-gray-200 p-4 rounded-xl shadow-sm flex-row items-center justify-center"
              onPress={() => router.back()}
            >
              <MaterialIcons name="cancel" size={20} color="#4b5563" />
              <Text className="text-gray-700 text-lg font-medium ml-2">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 bg-orange-500 p-4 rounded-xl shadow-md flex-row items-center justify-center"
              onPress={handleUpdate}
            >
              <MaterialIcons name="save" size={20} color="white" />
              <Text className="text-white text-lg font-semibold ml-2">Update</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Info Box */}
        <View className="bg-orange-100 p-4 rounded-xl mt-6 border border-orange-200">
          <View className="flex-row items-center mb-2">
            <MaterialIcons name="info" size={20} color="#f97316" />
            <Text className="text-orange-800 font-semibold ml-2">Editing Tips</Text>
          </View>
          <Text className="text-orange-700 text-sm">
            • Make sure all information is accurate before saving{"\n"}
            • Required fields: Pet Name and Date{"\n"}
            • Changes will be reflected immediately
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default AppointmentEditScreen;
