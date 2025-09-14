import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Platform, StatusBar } from "react-native";
import React, { useState, useCallback } from "react";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { createHealth } from "@/services/healthService";
import { useLoader } from "@/context/LoaderContext";
import { useAuth } from "@/context/AuthContext";
import { HealthRecord } from "@/types/health";

const HealthNewScreen = () => {
  const [record, setRecord] = useState<HealthRecord>({
    date: "",
    day: "",
    time: "",
    location: "",
    petName: "",
    petAge: 0,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const router = useRouter();
  const { showLoader, hideLoader } = useLoader();
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!record.petName.trim()) {
      Alert.alert("Validation", "Pet Name is required");
      return;
    }

    try {
      showLoader();
      await createHealth({ ...record, userId: user?.uid });
      router.back();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to add record");
    } finally {
      hideLoader();
    }
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" });

  const formatTime = (time: Date) =>
    time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

  const getDayName = (date: Date) => date.toLocaleDateString("en-US", { weekday: "long" });

  const onDateChange = (_, date) => {
    if (date) {
      setSelectedDate(date);
      setRecord((prev) => ({
        ...prev,
        date: formatDate(date),
        day: getDayName(date),
      }));
    }
    setShowDatePicker(Platform.OS === "ios");
  };

  const onTimeChange = (_, time) => {
    if (time) {
      setSelectedTime(time);
      setRecord((prev) => ({
        ...prev,
        time: formatTime(time),
      }));
    }
    setShowTimePicker(Platform.OS === "ios");
  };

  const InputField = useCallback(
    ({ label, placeholder, value, onChangeText, keyboardType = "default", isClickable = false, onPress }) => (
      <View className="mb-6">
        <Text className="text-gray-600 text-sm font-normal mb-2">
          {label}
        </Text>
        {isClickable ? (
          <TouchableOpacity onPress={onPress} className="border-b border-gray-200 pb-3">
            <Text className={`text-base ${value ? "text-gray-900" : "text-gray-400"}`}>
              {value || placeholder}
            </Text>
          </TouchableOpacity>
        ) : (
          <View className="border-b border-gray-200 pb-1">
            <TextInput
              placeholder={placeholder}
              placeholderTextColor="#9CA3AF"
              keyboardType={keyboardType}
              value={value}
              onChangeText={onChangeText}
              className="text-gray-900 text-base py-2"
            />
          </View>
        )}
      </View>
    ),
    []
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View className="flex-1 bg-white">

        {/* Top Navigation Bar */}
        <View className="bg-white pt-12 pb-4 px-6 border-b border-gray-100">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} className="mr-4">
              <Text className="text-gray-900 text-xl">←</Text>
            </TouchableOpacity>
            <Text className="text-gray-900 text-base">(health)</Text>
          </View>
        </View>

        {/* Secondary Header */}
        <View className="bg-white px-6 py-4 border-b border-gray-100">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} className="mr-4">
              <Text className="text-gray-900 text-xl">←</Text>
            </TouchableOpacity>
            <Text className="text-gray-900 text-lg font-semibold">Add Health Record</Text>
          </View>
        </View>

        {/* Main Content with Orange Header */}
        <View className="flex-1 bg-orange-400">
          {/* Orange header section */}
          <View className="bg-orange-400 px-6 py-6">
            <Text className="text-white text-lg font-semibold text-center">Pet Doctor</Text>
          </View>

          {/* White content area */}
          <View className="flex-1 bg-white rounded-t-3xl px-6 pt-8">
            <ScrollView showsVerticalScrollIndicator={false}>

              <InputField
                label="Date"
                placeholder="Select date"
                value={record.date}
                isClickable={true}
                onPress={() => setShowDatePicker(true)}
              />

              <InputField
                label="Day"
                placeholder="Day will auto-fill"
                value={record.day}
                onChangeText={(text) => setRecord((prev) => ({ ...prev, day: text }))}
              />

              <InputField
                label="Time"
                placeholder="Select time"
                value={record.time}
                isClickable={true}
                onPress={() => setShowTimePicker(true)}
              />

              <InputField
                label="Location"
                placeholder="Enter location"
                value={record.location}
                onChangeText={(text) => setRecord((prev) => ({ ...prev, location: text }))}
              />

              <InputField
                label="Pet Name"
                placeholder="Enter your pet's name"
                value={record.petName}
                onChangeText={(text) => setRecord((prev) => ({ ...prev, petName: text }))}
              />

              <InputField
                label="Pet Age"
                placeholder="Enter age"
                keyboardType="numeric"
                value={record.petAge ? record.petAge.toString() : ""}
                onChangeText={(text) =>
                  setRecord((prev) => ({ ...prev, petAge: Number(text.replace(/[^0-9]/g, "")) || 0 }))
                }
              />

              {/* Submit Button */}
              <TouchableOpacity
                className="bg-orange-400 rounded-full py-4 px-8 mt-8 mb-12 mx-8 shadow-lg active:bg-orange-500"
                onPress={handleSubmit}
              >
                <Text className="text-white text-center text-lg font-medium">Submit</Text>
              </TouchableOpacity>

            </ScrollView>

            {/* Bottom indicator */}
            <View className="absolute bottom-4 left-0 right-0 items-center">
              <View className="w-16 h-1 bg-gray-300 rounded-full" />
            </View>
          </View>
        </View>

        {/* Date Picker */}
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onDateChange}
            maximumDate={new Date()}
          />
        )}

        {/* Time Picker */}
        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onTimeChange}
          />
        )}
      </View>
    </>
  );
};

export default HealthNewScreen;