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
import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Appointment } from "@/types/appointment";
import { createAppointment } from "@/services/appointmentService";
import { useAuth } from "@/context/AuthContext";

// Disable automatic header
export const options = {
  headerShown: false,
};

type InputFieldProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText?: (text: string) => void;
  keyboardType?: "default" | "numeric" | "email-address";
  isClickable?: boolean;
  onPress?: () => void;
  icon?: string;
  multiline?: boolean;
  children?: React.ReactNode;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  isClickable = false,
  onPress,
  icon,
  multiline = false,
  children,
}) => (
  <View className="mb-4">
    <View className="flex-row items-center mb-2">
      {icon && <Text className="text-lg mr-2">{icon}</Text>}
      <Text className="text-orange-800 text-sm font-semibold">{label}</Text>
    </View>
    {children ? (
      children
    ) : isClickable ? (
      <TouchableOpacity
        onPress={onPress}
        className="bg-orange-50 rounded-xl px-4 py-4 border border-orange-200 shadow-sm"
      >
        <Text className={`text-base ${value ? "text-gray-800" : "text-gray-500"}`}>
          {value || placeholder}
        </Text>
      </TouchableOpacity>
    ) : (
      <View className="bg-orange-50 rounded-xl px-4 border border-orange-200 shadow-sm">
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          numberOfLines={multiline ? 3 : 1}
          className="text-gray-800 text-base py-4"
          textAlignVertical={multiline ? "top" : "center"}
        />
      </View>
    )}
  </View>
);

const InfoCard = ({
  title,
  children,
  icon,
}: {
  title: string;
  children: React.ReactNode;
  icon: string;
}) => (
  <View className="bg-white rounded-2xl p-6 shadow-lg mb-5 border border-orange-100">
    <View className="flex-row items-center mb-5 pb-3 border-b border-orange-100">
      <View className="w-10 h-10 bg-orange-500 rounded-xl items-center justify-center mr-3">
        <Text className="text-white text-lg">{icon}</Text>
      </View>
      <Text className="text-orange-600 text-lg font-bold">{title}</Text>
    </View>
    {children}
  </View>
);

const AppointmentNewScreen = () => {
  const { user } = useAuth();
  const [appointment, setAppointment] = useState<Appointment>({
    date: "",
    day: "",
    time: "",
    location: "",
    petName: "",
    petAge: 0,
    reason: "",
    vetName: "",
    status: "Scheduled",
    userId: user?.uid,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const now = new Date();
    now.setHours(9, 38, 0, 0); // Set to 09:38 AM IST (adjust for timezone if needed)
    setSelectedDate(now);
    setSelectedTime(now);
    setAppointment((prev) => ({
      ...prev,
      date: now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      day: now.toLocaleDateString("en-US", { weekday: "long" }),
      time: now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    }));
  }, []);

  const handleSubmit = async () => {
    if (!appointment.petName.trim()) {
      Alert.alert("⚠️ Validation Error", "Pet Name is required to schedule appointment");
      return;
    }
    if (!appointment.reason.trim()) {
      Alert.alert("⚠️ Validation Error", "Please specify the reason for this appointment");
      return;
    }
    if (!appointment.date) {
      Alert.alert("⚠️ Validation Error", "Please select an appointment date");
      return;
    }
    if (!appointment.time) {
      Alert.alert("⚠️ Validation Error", "Please select an appointment time");
      return;
    }

    try {
      setIsLoading(true);
      await createAppointment(appointment);
      Alert.alert(
        "✅ Success!",
        `Appointment scheduled successfully for ${appointment.petName} on ${appointment.date} at ${appointment.time}`,
        [{ text: "Great!" }]
      );
    } catch (err) {
      console.error("Error creating appointment:", err);
      Alert.alert("❌ Error", "Failed to schedule appointment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatTime = (time: Date) =>
    time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const getDayName = (date: Date) => date.toLocaleDateString("en-US", { weekday: "long" });

  const onDateChange = (_: any, date?: Date) => {
    if (date) {
      setSelectedDate(date);
      setAppointment((prev) => ({
        ...prev,
        date: formatDate(date),
        day: getDayName(date),
      }));
    }
    setShowDatePicker(Platform.OS === "ios");
  };

  const onTimeChange = (_: any, time?: Date) => {
    if (time) {
      setSelectedTime(time);
      setAppointment((prev) => ({
        ...prev,
        time: formatTime(time),
      }));
    }
    setShowTimePicker(Platform.OS === "ios");
  };

  const statusOptions: Appointment["status"][] = ["Scheduled", "Completed", "Cancelled"];

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#ea580c" />
      <View className="flex-1 bg-orange-500">
        <View className="pt-12 pb-6 px-6">
          <Text className="text-white text-2xl font-bold text-center mb-2">🏥 Schedule Appointment</Text>
          <Text className="text-orange-100 text-center">Book a visit for your beloved pet</Text>
        </View>

        <View className="flex-1 bg-gray-50 rounded-t-3xl px-6 pt-6">
          <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
            <InfoCard title="Appointment Details" icon="📅">
              <InputField
                label="Date"
                placeholder="Select appointment date"
                value={appointment.date}
                isClickable
                onPress={() => setShowDatePicker(true)}
                icon="📅"
              />
              <InputField label="Day" placeholder="Will be filled automatically" value={appointment.day} icon="📆" />
              <InputField
                label="Time"
                placeholder="Select appointment time"
                value={appointment.time}
                isClickable
                onPress={() => setShowTimePicker(true)}
                icon="⏰"
              />
              <InputField
                label="Clinic/Hospital"
                placeholder="Enter clinic or hospital name"
                value={appointment.location}
                onChangeText={(text) => setAppointment((prev) => ({ ...prev, location: text }))}
                icon="🏥"
              />
              <InputField
                label="Reason for Visit"
                placeholder="e.g., Vaccination, Check-up, Emergency"
                value={appointment.reason}
                onChangeText={(text) => setAppointment((prev) => ({ ...prev, reason: text }))}
                icon="💊"
                multiline
              />
              <InputField
                label="Veterinarian (Optional)"
                placeholder="Dr. Smith"
                value={appointment.vetName || ""}
                onChangeText={(text) => setAppointment((prev) => ({ ...prev, vetName: text }))}
                icon="👨‍⚕️"
              />
              {/* Status Selection */}
              <InputField label="Status" icon="📌">
                <View className="flex-row space-x-2">
                  {statusOptions.map((s) => (
                    <TouchableOpacity
                      key={s}
                      onPress={() => setAppointment((prev) => ({ ...prev, status: s }))}
                      className={`px-4 py-2 rounded-xl border ${
                        appointment.status === s ? "bg-orange-500 border-orange-500" : "bg-white border-orange-300"
                      }`}
                    >
                      <Text className={`${appointment.status === s ? "text-white font-semibold" : "text-orange-800"}`}>
                        {s}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </InputField>
            </InfoCard>

            <InfoCard title="Pet Information" icon="🐾">
              <InputField
                label="Pet Name"
                placeholder="Enter your pet's name"
                value={appointment.petName}
                onChangeText={(text) => setAppointment((prev) => ({ ...prev, petName: text }))}
                icon="🐕"
              />
              <InputField
                label="Pet Age (Years)"
                placeholder="Enter age"
                keyboardType="numeric"
                value={appointment.petAge ? appointment.petAge.toString() : ""}
                onChangeText={(text) =>
                  setAppointment((prev) => ({
                    ...prev,
                    petAge: Number(text.replace(/[^0-9]/g, "")) || 0,
                  }))
                }
                icon="🎂"
              />
            </InfoCard>

            <View className="flex-row space-x-4 mt-2 mb-6">
              <TouchableOpacity className="flex-1 bg-gray-300 rounded-xl py-4" onPress={() => {}}>
                <Text className="text-gray-700 text-center font-bold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 rounded-xl py-4 ${isLoading ? "bg-orange-300" : "bg-orange-500"}`}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                <Text className="text-white text-center font-bold">
                  {isLoading ? "Saving..." : "Save Appointment"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onDateChange}
            minimumDate={new Date()}
          />
        )}
        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onTimeChange}
          />
        )}
        <View className="py-3 bg-orange-500">
          <Text className="text-center text-orange-100 text-sm">© 2025 PetCare App. All rights reserved.</Text>
        </View>
      </View>
    </>
  );
};

export default AppointmentNewScreen;