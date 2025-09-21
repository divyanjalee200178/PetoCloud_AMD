import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getHealthById, updateHealth } from "@/services/healthService";
import { useLoader } from "@/context/LoaderContext";
import { HealthRecord } from "@/types/health";
import { MaterialIcons } from "@expo/vector-icons";
import "../../../global.css";

const HealthEditScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { showLoader, hideLoader } = useLoader();

  const [record, setRecord] = useState<HealthRecord>({
    petName: "",
    date: "",
    day: "",
    time: "",
    location: "",
    petAge: 0,
  });

  useEffect(() => {
    if (!id) return;
    const fetchRecord = async () => {
      try {
        showLoader();
        const data = await getHealthById(id);
        if (data) setRecord(data);
        else Alert.alert("Error", "Record not found");
      } catch (err) {
        console.error(err);
        Alert.alert("Error", "Failed to load record");
      } finally {
        hideLoader();
      }
    };
    fetchRecord();
  }, [id]);

  const handleUpdate = async () => {
    if (!record.petName.trim() || !record.date.trim()) {
      return Alert.alert("Validation", "Pet Name and Date are required");
    }
    try {
      showLoader();
      await updateHealth(id, record);
      router.back();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to update record");
    } finally {
      hideLoader();
    }
  };

  const fieldIcons = {
    date: "event",
    day: "calendar-today",
    time: "access-time",
    location: "location-on",
    petName: "pets",
    petAge: "cake",
  };

  return (
    <View className="flex-1 bg-orange-50">
      {/* Header */}
      <View className="bg-orange-500 p-6 pt-12 rounded-b-3xl shadow-lg">
        <View className="flex-row items-center justify-between mb-4">
          {/* Back button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center p-2 rounded-full bg-orange-400"
          >
            <MaterialIcons name="arrow-back" size={20} color="white" />
          </TouchableOpacity>

          {/* Home button */}
          <TouchableOpacity
            onPress={() => router.push("/dash")}
            className="flex-row items-center p-2 rounded-full bg-orange-400"
          >
            <MaterialIcons name="home" size={20} color="white" />
          </TouchableOpacity>

          {/* New record button */}
          <TouchableOpacity
            onPress={() => router.push("/new")}
            className="flex-row items-center p-2 rounded-full bg-orange-400"
          >
            <MaterialIcons name="add" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-3xl font-bold text-white">Health</Text>
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
            <Text className="text-white font-medium">Health</Text>
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
      <ScrollView
        className="flex-1 p-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
          {["petName", "petAge", "date", "day", "time", "location"].map((field) => (
            <View key={field} className="mb-5">
              <Text className="text-orange-800 font-medium mb-2 capitalize">
                {field.replace("pet", "Pet ")}
              </Text>
              <View className="flex-row items-center border border-orange-200 rounded-xl px-4 py-3 bg-orange-50">
                <MaterialIcons
                  name={fieldIcons[field as keyof typeof fieldIcons] as React.ComponentProps<typeof MaterialIcons>["name"]}
                  size={20}
                  color="#f97316"
                  className="mr-3"
                />
                <TextInput
                  placeholder={`Enter ${field.replace("pet", "pet ")}`}
                  className="flex-1 text-orange-900"
                  keyboardType={field === "petAge" ? "numeric" : "default"}
                  value={(record[field as keyof typeof record] ?? "").toString()}
                  onChangeText={(text) =>
                    setRecord({
                      ...record,
                      [field]: field === "petAge" ? Number(text) : text,
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
              <MaterialIcons name="cancel" size={20} color="#4b5563" className="mr-2" />
              <Text className="text-gray-700 text-lg font-medium">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 bg-orange-500 p-4 rounded-xl shadow-md flex-row items-center justify-center"
              onPress={handleUpdate}
            >
              <MaterialIcons name="save" size={20} color="white" className="mr-2" />
              <Text className="text-white text-lg font-semibold">Update</Text>
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

export default HealthEditScreen;