// app/(dashboard)/health/new.tsx
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { createHealth } from "@/services/healthService";
import { useLoader } from "@/context/LoaderContext";
import { useAuth } from "@/context/AuthContext";
import { HealthRecord } from "@/types/health";
import "../../../global.css";

// ---------- InputField Component ----------
type InputFieldProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText?: (text: string) => void;
  keyboardType?: "default" | "numeric" | "email-address";
  isClickable?: boolean;
  onPress?: () => void;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  isClickable = false,
  onPress,
}) => (
  <View className="mb-6">
    <Text className="text-orange-800 text-sm mb-2 font-medium">{label}</Text>
    {isClickable ? (
      <TouchableOpacity
        onPress={onPress}
        className="border-b border-orange-200 pb-3 bg-orange-50 rounded-lg px-4 py-3"
      >
        <Text className={`text-base ${value ? "text-gray-800" : "text-gray-400"}`}>
          {value || placeholder}
        </Text>
      </TouchableOpacity>
    ) : (
      <View className="border-b border-orange-200 pb-1 bg-orange-50 rounded-lg px-4">
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          className="text-gray-800 text-base py-3"
        />
      </View>
    )}
  </View>
);

// ---------- Main Screen ----------
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

  const getDayName = (date: Date) =>
    date.toLocaleDateString("en-US", { weekday: "long" });

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

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FF7F00" />
      <View className="flex-1 bg-white">
        {/* Top Navigation */}
        <View className="bg-orange-500 pt-12 pb-4 px-6">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => router.back()}
                className="mr-4 p-2 rounded-full bg-orange-400"
              >
                <Text className="text-white text-xl">←</Text>
              </TouchableOpacity>
              <Text className="text-white text-base font-medium">Health Records</Text>
            </View>
          </View>
        </View>

        {/* Orange Header Section */}
        <View className="bg-orange-500 px-6 pb-6">
          <Text className="text-white text-2xl font-bold text-center">Pet Health Record</Text>
          <Text className="text-orange-100 text-center mt-2">Add your pet's health information</Text>
        </View>

        {/* Main Content Area */}
        <View className="flex-1 bg-gray-50 rounded-t-3xl -mt-4 px-6 pt-8">
          <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
            <View className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <Text className="text-orange-500 text-lg font-semibold mb-4">Appointment Details</Text>

              <InputField
                label="Date"
                placeholder="Select date"
                value={record.date}
                isClickable
                onPress={() => setShowDatePicker(true)}
              />

              <InputField
                label="Day"
                placeholder="Day will be auto-filled"
                value={record.day}
                onChangeText={(text) => setRecord((prev) => ({ ...prev, day: text }))}
              />

              <InputField
                label="Time"
                placeholder="Select time"
                value={record.time}
                isClickable
                onPress={() => setShowTimePicker(true)}
              />

              <InputField
                label="Location"
                placeholder="Clinic or hospital name"
                value={record.location}
                onChangeText={(text) => setRecord((prev) => ({ ...prev, location: text }))}
              />
            </View>

            <View className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <Text className="text-orange-500 text-lg font-semibold mb-4">Pet Information</Text>

              <InputField
                label="Pet Name"
                placeholder="Enter your pet's name"
                value={record.petName}
                onChangeText={(text) => setRecord((prev) => ({ ...prev, petName: text }))}
              />

              <InputField
                label="Pet Age"
                placeholder="Enter age in years"
                keyboardType="numeric"
                value={record.petAge ? record.petAge.toString() : ""}
                onChangeText={(text) =>
                  setRecord((prev) => ({
                    ...prev,
                    petAge: Number(text.replace(/[^0-9]/g, "")) || 0,
                  }))
                }
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              className="bg-orange-500 rounded-xl py-5 mx-4 mt-6 mb-10 shadow-md"
              onPress={handleSubmit}
            >
              <Text className="text-white text-center text-lg font-semibold">Save Health Record</Text>
            </TouchableOpacity>


          </ScrollView>

          {/* Bottom Indicator */}
          <View className="absolute bottom-4 left-0 right-0 items-center">
            <View className="w-12 h-1 bg-orange-200 rounded-full" />
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
            themeVariant="light"
          />
        )}

        {/* Time Picker */}
        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onTimeChange}
            themeVariant="light"
          />
        )}
      </View>
    </>
  );
};

export default HealthNewScreen;