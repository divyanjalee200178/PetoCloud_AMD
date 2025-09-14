import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getHealthById, updateHealth } from "@/services/healthService";
import { useLoader } from "@/context/LoaderContext";
import { HealthRecord } from "@/types/health";

const HealthEditScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [record, setRecord] = useState<HealthRecord>({
    date: "",
    day: "",
    time: "",
    location: "",
    petName: "",
    petAge: 0,
  });

  const router = useRouter();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        showLoader();
        const health = await getHealthById(id);
        if (health) setRecord(health);
        else Alert.alert("Error", "Record not found");
      } finally {
        hideLoader();
      }
    };
    load();
  }, [id]);

  const handleSubmit = async () => {
    if (!record.petName.trim()) {
      Alert.alert("Validation", "Pet Name is required");
      return;
    }
    try {
      showLoader();
      if (id) await updateHealth(id, record);
      router.back();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to update record");
    } finally {
      hideLoader();
    }
  };

  return (
    <View className="flex-1 p-5">
      <Text className="text-2xl font-bold mb-4">Edit Health Record</Text>

      <TextInput placeholder="Date" className="border p-2 mb-2 rounded" value={record.date} onChangeText={text => setRecord({ ...record, date: text })} />
      <TextInput placeholder="Day" className="border p-2 mb-2 rounded" value={record.day} onChangeText={text => setRecord({ ...record, day: text })} />
      <TextInput placeholder="Time" className="border p-2 mb-2 rounded" value={record.time} onChangeText={text => setRecord({ ...record, time: text })} />
      <TextInput placeholder="Location" className="border p-2 mb-2 rounded" value={record.location} onChangeText={text => setRecord({ ...record, location: text })} />
      <TextInput placeholder="Pet Name" className="border p-2 mb-2 rounded" value={record.petName} onChangeText={text => setRecord({ ...record, petName: text })} />
      <TextInput placeholder="Pet Age" keyboardType="numeric" className="border p-2 mb-2 rounded" value={record.petAge.toString()} onChangeText={text => setRecord({ ...record, petAge: Number(text) })} />

      <TouchableOpacity className="bg-blue-500 p-3 rounded mt-3" onPress={handleSubmit}>
        <Text className="text-white text-center text-lg">Update Record</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HealthEditScreen;
