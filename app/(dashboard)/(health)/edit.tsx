import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getHealthById, updateHealth } from "@/services/healthService";
import { useLoader } from "@/context/LoaderContext";
import { HealthRecord } from "@/types/health";

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
    petAge: "",
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

  return (
    <ScrollView className="flex-1 p-4">
      <Text className="text-2xl mb-4">Edit Health Record</Text>

      {["date","day","time","location","petName","petAge"].map(field => (
        <View key={field} className="mb-3">
          <Text className="mb-1 capitalize">{field.replace("pet","Pet ")}</Text>
          <TextInput
            placeholder={field}
            className="border p-2 rounded"
            keyboardType={field === "petAge" ? "numeric" : "default"}
            value={record[field as keyof typeof record].toString()}
            onChangeText={text => setRecord({ ...record, [field]: field==="petAge"? Number(text) : text })}
          />
        </View>
      ))}

      <TouchableOpacity className="bg-blue-800 p-3 rounded" onPress={handleUpdate}>
        <Text className="text-white text-center text-lg">Update</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HealthEditScreen;
