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


type InputFieldProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText?: (text: string) => void;
  keyboardType?: "default" | "numeric" | "email-address";
  isClickable?: boolean;
  onPress?: () => void;
  theme?: 'original' | 'modern' | 'glass' | 'neon' | 'minimal';
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  isClickable = false,
  onPress,
  theme = 'original',
}) => {

  if (theme === 'original') {
    return (
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
  }


  if (theme === 'modern') {
    return (
      <View className="mb-6">
        <Text className="text-purple-300 text-sm mb-2 font-semibold">{label}</Text>
        {isClickable ? (
          <TouchableOpacity
            onPress={onPress}
            className="bg-gray-800 rounded-2xl px-4 py-4 border border-purple-500 shadow-lg"
          >
            <Text className={`text-base ${value ? "text-white" : "text-gray-400"}`}>
              {value || placeholder}
            </Text>
          </TouchableOpacity>
        ) : (
          <View className="bg-gray-800 rounded-2xl px-4 border border-purple-500 shadow-lg">
            <TextInput
              placeholder={placeholder}
              placeholderTextColor="#9CA3AF"
              keyboardType={keyboardType}
              value={value}
              onChangeText={onChangeText}
              className="text-white text-base py-4"
            />
          </View>
        )}
      </View>
    );
  }


  if (theme === 'glass') {
    return (
      <View className="mb-6">
        <Text className="text-blue-200 text-sm mb-2 font-semibold">{label}</Text>
        {isClickable ? (
          <TouchableOpacity
            onPress={onPress}
            className="bg-white bg-opacity-10 rounded-2xl px-4 py-4 border border-white border-opacity-20 shadow-2xl"
          >
            <Text className={`text-base ${value ? "text-white" : "text-blue-200"}`}>
              {value || placeholder}
            </Text>
          </TouchableOpacity>
        ) : (
          <View className="bg-white bg-opacity-10 rounded-2xl px-4 border border-white border-opacity-20 shadow-2xl">
            <TextInput
              placeholder={placeholder}
              placeholderTextColor="rgba(255,255,255,0.6)"
              keyboardType={keyboardType}
              value={value}
              onChangeText={onChangeText}
              className="text-white text-base py-4"
            />
          </View>
        )}
      </View>
    );
  }

  if (theme === 'neon') {
    return (
      <View className="mb-6">
        <Text className="text-cyan-400 text-sm mb-2 font-bold">{label}</Text>
        {isClickable ? (
          <TouchableOpacity
            onPress={onPress}
            className="bg-gray-900 rounded-2xl px-4 py-4 border-2 border-cyan-500 shadow-lg"
            style={{ shadowColor: '#06b6d4', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 10 }}
          >
            <Text className={`text-base ${value ? "text-cyan-400" : "text-gray-400"}`}>
              {value || placeholder}
            </Text>
          </TouchableOpacity>
        ) : (
          <View className="bg-gray-900 rounded-2xl px-4 border-2 border-cyan-500 shadow-lg" style={{ shadowColor: '#06b6d4', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 10 }}>
            <TextInput
              placeholder={placeholder}
              placeholderTextColor="#6B7280"
              keyboardType={keyboardType}
              value={value}
              onChangeText={onChangeText}
              className="text-cyan-400 text-base py-4"
            />
          </View>
        )}
      </View>
    );
  }


  if (theme === 'minimal') {
    return (
      <View className="mb-6">
        <Text className="text-gray-600 text-sm mb-2 font-medium">{label}</Text>
        {isClickable ? (
          <TouchableOpacity
            onPress={onPress}
            className="border-b-2 border-gray-300 pb-3 bg-transparent"
          >
            <Text className={`text-base ${value ? "text-gray-900" : "text-gray-400"}`}>
              {value || placeholder}
            </Text>
          </TouchableOpacity>
        ) : (
          <View className="border-b-2 border-gray-300 bg-transparent">
            <TextInput
              placeholder={placeholder}
              placeholderTextColor="#9CA3AF"
              keyboardType={keyboardType}
              value={value}
              onChangeText={onChangeText}
              className="text-gray-900 text-base py-3"
            />
          </View>
        )}
      </View>
    );
  }

  return null;
};


const ThemeSwitcher = ({ currentTheme, onThemeChange }: { currentTheme: 'original' | 'modern' | 'glass' | 'neon' | 'minimal', onThemeChange: (theme: 'original' | 'modern' | 'glass' | 'neon' | 'minimal') => void }) => (
  <View className="bg-white rounded-2xl p-6 shadow-lg mb-6 border border-gray-100">
    <Text className="text-gray-800 text-lg font-bold mb-4 text-center">🎨 Choose Design Theme</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
      <View className="flex-row space-x-3 px-2">
        <TouchableOpacity
          onPress={() => onThemeChange('original')}
          className={`px-6 py-3 rounded-full ${
            currentTheme === 'original' ? 'bg-orange-500' : 'bg-orange-200'
          }`}
        >
          <Text className={`text-sm font-semibold ${
            currentTheme === 'original' ? 'text-white' : 'text-orange-800'
          }`}>🧡 Original</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onThemeChange('modern')}
          className={`px-6 py-3 rounded-full ${
            currentTheme === 'modern' ? 'bg-purple-600' : 'bg-purple-200'
          }`}
        >
          <Text className={`text-sm font-semibold ${
            currentTheme === 'modern' ? 'text-white' : 'text-purple-800'
          }`}>🌙 Modern</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onThemeChange('glass')}
          className={`px-6 py-3 rounded-full ${
            currentTheme === 'glass' ? 'bg-blue-500' : 'bg-blue-200'
          }`}
        >
          <Text className={`text-sm font-semibold ${
            currentTheme === 'glass' ? 'text-white' : 'text-blue-800'
          }`}>✨ Glass</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onThemeChange('neon')}
          className={`px-6 py-3 rounded-full ${
            currentTheme === 'neon' ? 'bg-cyan-500' : 'bg-cyan-200'
          }`}
        >
          <Text className={`text-sm font-semibold ${
            currentTheme === 'neon' ? 'text-black' : 'text-cyan-800'
          }`}>⚡ Neon</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onThemeChange('minimal')}
          className={`px-6 py-3 rounded-full ${
            currentTheme === 'minimal' ? 'bg-gray-600' : 'bg-gray-200'
          }`}
        >
          <Text className={`text-sm font-semibold ${
            currentTheme === 'minimal' ? 'text-white' : 'text-gray-800'
          }`}>⚪ Minimal</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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

  const [currentTheme, setCurrentTheme] = useState<'original' | 'modern' | 'glass' | 'neon' | 'minimal'>('original');
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

  const onDateChange = (_: any, date?: Date) => {
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

  const onTimeChange = (_: any, time?: Date) => {
    if (time) {
      setSelectedTime(time);
      setRecord((prev) => ({
        ...prev,
        time: formatTime(time),
      }));
    }
    setShowTimePicker(Platform.OS === "ios");
  };


  const getContainerStyle = () => {
    switch(currentTheme) {
      case 'modern':
        return "flex-1 bg-gray-900";
      case 'glass':
        return "flex-1 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900";
      case 'neon':
        return "flex-1 bg-black";
      case 'minimal':
        return "flex-1 bg-white";
      default:
        return "flex-1 bg-white";
    }
  };

  const getHeaderStyle = () => {
    switch(currentTheme) {
      case 'modern':
        return "bg-purple-600 pt-12 pb-4 px-6";
      case 'glass':
        return "bg-gradient-to-r from-blue-600 to-indigo-600 pt-12 pb-4 px-6";
      case 'neon':
        return "bg-gray-900 border-b-2 border-cyan-500 pt-12 pb-4 px-6";
      case 'minimal':
        return "bg-white border-b border-gray-200 pt-12 pb-4 px-6";
      default:
        return "bg-orange-500 pt-12 pb-4 px-6";
    }
  };

  const getHeaderSecondaryStyle = () => {
    switch(currentTheme) {
      case 'modern':
        return "bg-purple-600 px-6 pb-6";
      case 'glass':
        return "bg-gradient-to-r from-blue-600 to-indigo-600 px-6 pb-6";
      case 'neon':
        return "bg-gray-900 px-6 pb-6";
      case 'minimal':
        return "bg-white px-6 pb-6";
      default:
        return "bg-orange-500 px-6 pb-6";
    }
  };

  const getContentStyle = () => {
    switch(currentTheme) {
      case 'modern':
        return "flex-1 bg-gray-800 rounded-t-3xl -mt-4 px-6 pt-8";
      case 'glass':
        return "flex-1 bg-black bg-opacity-20 rounded-t-3xl -mt-4 px-6 pt-8";
      case 'neon':
        return "flex-1 bg-gray-900 rounded-t-3xl -mt-4 px-6 pt-8 border-t-2 border-cyan-500";
      case 'minimal':
        return "flex-1 bg-gray-50 rounded-t-3xl -mt-4 px-6 pt-8";
      default:
        return "flex-1 bg-gray-50 rounded-t-3xl -mt-4 px-6 pt-8";
    }
  };

  const getCardStyle = () => {
    switch(currentTheme) {
      case 'modern':
        return "bg-gray-700 rounded-2xl p-6 shadow-lg mb-6 border border-purple-500";
      case 'glass':
        return "bg-white bg-opacity-5 rounded-2xl p-6 shadow-2xl mb-6 border border-white border-opacity-20";
      case 'neon':
        return "bg-gray-800 rounded-2xl p-6 shadow-2xl mb-6 border-2 border-cyan-500";
      case 'minimal':
        return "bg-white rounded-2xl p-6 shadow-sm mb-6 border border-gray-200";
      default:
        return "bg-white rounded-2xl p-6 shadow-sm mb-6";
    }
  };

  const getCardTitleStyle = () => {
    switch(currentTheme) {
      case 'modern':
        return "text-purple-400 text-lg font-semibold mb-4";
      case 'glass':
        return "text-blue-200 text-lg font-semibold mb-4";
      case 'neon':
        return "text-cyan-400 text-lg font-bold mb-4";
      case 'minimal':
        return "text-gray-900 text-lg font-semibold mb-4";
      default:
        return "text-orange-500 text-lg font-semibold mb-4";
    }
  };

  const getButtonStyle = () => {
    switch(currentTheme) {
      case 'modern':
        return "bg-purple-600 rounded-xl py-5 mx-4 mt-6 mb-10 shadow-lg";
      case 'glass':
        return "bg-white bg-opacity-20 rounded-xl py-5 mx-4 mt-6 mb-10 shadow-2xl border border-white border-opacity-30";
      case 'neon':
        return "bg-cyan-500 rounded-xl py-5 mx-4 mt-6 mb-10 shadow-2xl";
      case 'minimal':
        return "bg-gray-900 rounded-xl py-5 mx-4 mt-6 mb-10 shadow-lg";
      default:
        return "bg-orange-500 rounded-xl py-5 mx-4 mt-6 mb-10 shadow-md";
    }
  };

  const getButtonTextStyle = () => {
    switch(currentTheme) {
      case 'neon':
        return "text-black text-center text-lg font-bold";
      default:
        return "text-white text-center text-lg font-semibold";
    }
  };

  return (
    <>
      <StatusBar
        barStyle={currentTheme === 'minimal' ? "dark-content" : "light-content"}
        backgroundColor={
          currentTheme === 'modern' ? "#7C3AED" :
          currentTheme === 'glass' ? "#1E40AF" :
          currentTheme === 'neon' ? "#111827" :
          currentTheme === 'minimal' ? "#FFFFFF" : "#FF7F00"
        }
      />
      <View className={getContainerStyle()}>
        {/* Top Navigation */}
        <View className={getHeaderStyle()}>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => router.back()}
                className="mr-4 p-2 rounded-full bg-black bg-opacity-20"
              >
                <Text className="text-white text-xl">←</Text>
              </TouchableOpacity>
              <Text className={`text-base font-medium ${
                currentTheme === 'minimal' ? 'text-gray-900' : 'text-white'
              }`}>Health Records</Text>
            </View>
          </View>
        </View>


        <View className={getHeaderSecondaryStyle()}>
          <Text className={`text-2xl font-bold text-center ${
            currentTheme === 'minimal' ? 'text-gray-900' : 'text-white'
          }`}>Pet Health Record</Text>
          <Text className={`text-center mt-2 ${
            currentTheme === 'minimal' ? 'text-gray-600' :
            currentTheme === 'neon' ? 'text-gray-400' :
            currentTheme === 'modern' ? 'text-purple-200' :
            currentTheme === 'glass' ? 'text-blue-200' : 'text-orange-100'
          }`}>Add your pet's health information</Text>
        </View>


        <View className={getContentStyle()}>
          <ScrollView showsVerticalScrollIndicator={false} className="flex-1">

            {/* Theme Switcher */}
            <ThemeSwitcher currentTheme={currentTheme} onThemeChange={setCurrentTheme} />


            <View className={getCardStyle()}>
              <Text className={getCardTitleStyle()}>📅 Appointment Details</Text>

              <InputField
                label="Date"
                placeholder="Select date"
                value={record.date}
                isClickable
                onPress={() => setShowDatePicker(true)}
                theme={currentTheme}
              />

              <InputField
                label="Day"
                placeholder="Day will be auto-filled"
                value={record.day}
                onChangeText={(text) => setRecord((prev) => ({ ...prev, day: text }))}
                theme={currentTheme}
              />

              <InputField
                label="Time"
                placeholder="Select time"
                value={record.time}
                isClickable
                onPress={() => setShowTimePicker(true)}
                theme={currentTheme}
              />

              <InputField
                label="Location"
                placeholder="Clinic or hospital name"
                value={record.location}
                onChangeText={(text) => setRecord((prev) => ({ ...prev, location: text }))}
                theme={currentTheme}
              />
            </View>

            {/* Pet Information Card */}
            <View className={getCardStyle()}>
              <Text className={getCardTitleStyle()}>🐾 Pet Information</Text>

              <InputField
                label="Pet Name"
                placeholder="Enter your pet's name"
                value={record.petName}
                onChangeText={(text) => setRecord((prev) => ({ ...prev, petName: text }))}
                theme={currentTheme}
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
                theme={currentTheme}
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              className={getButtonStyle()}
              onPress={handleSubmit}
              style={currentTheme === 'neon' ? {
                shadowColor: '#06b6d4',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 20
              } : {}}
            >
              <Text className={getButtonTextStyle()}>💾 Save Health Record</Text>
            </TouchableOpacity>

          </ScrollView>


          <View className="absolute bottom-4 left-0 right-0 items-center">
            <View className={`w-12 h-1 rounded-full ${
              currentTheme === 'modern' ? 'bg-purple-300' :
              currentTheme === 'glass' ? 'bg-white bg-opacity-30' :
              currentTheme === 'neon' ? 'bg-cyan-500' :
              currentTheme === 'minimal' ? 'bg-gray-300' : 'bg-orange-200'
            }`} />
          </View>
        </View>


        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onDateChange}
            maximumDate={new Date()}
            themeVariant={currentTheme === 'minimal' ? "light" : "dark"}
          />
        )}


        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onTimeChange}
            themeVariant={currentTheme === 'minimal' ? "light" : "dark"}
          />
        )}
      </View>
    </>
  );
};

export default HealthNewScreen;