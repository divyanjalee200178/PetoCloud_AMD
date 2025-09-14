import { View, Text, ScrollView, TouchableOpacity, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { onSnapshot } from "firebase/firestore";
import { healthRef, deleteHealth } from "@/services/healthService";
import { useLoader } from "@/context/LoaderContext";
import { HealthRecord } from "@/types/health";
import "../../../global.css";

const HealthScreen = () => {
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const router = useRouter();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      healthRef,
      snapshot => {
        const list: HealthRecord[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as HealthRecord));
        setRecords(list);
      },
      error => console.error(error)
    );
    return () => unsubscribe();
  }, []);

  const handleDelete = (id: string) => {
    Alert.alert("Delete Record", "Are you sure you want to delete this health record?", [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            showLoader();
            await deleteHealth(id);
          } finally {
            hideLoader();
          }
        },
      },
    ]);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <View className="flex-1 bg-orange-50">
      {/* Header */}
      <View className="bg-orange-500 p-6 pt-12 rounded-b-3xl shadow-lg">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-3xl font-bold text-white">Health Records</Text>
          <Pressable
            onPress={() => router.push("/new")}
            className="bg-white p-3 rounded-full shadow-md"
          >
            <MaterialIcons name="add" size={24} color="#f97316" />
          </Pressable>
        </View>

        {records.length > 0 && (
          <View className="bg-white p-4 rounded-2xl shadow-md">
            <Text className="text-orange-800 font-semibold text-center">
              {records.length} {records.length === 1 ? 'Record' : 'Records'} Found
            </Text>
          </View>
        )}
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-4 mt-4" showsVerticalScrollIndicator={false}>
        {records.length === 0 ? (
          <View className="items-center justify-center mt-20 p-6">
            <View className="bg-orange-100 p-6 rounded-full mb-6">
              <FontAwesome5 name="notes-medical" size={48} color="#f97316" />
            </View>
            <Text className="text-xl font-bold text-orange-800 mb-2">No Health Records</Text>
            <Text className="text-orange-600 text-center mb-6">
              You don't have any health records yet. Add your first record to get started.
            </Text>
            <Pressable
              className="bg-orange-500 px-6 py-3 rounded-full shadow-md"
              onPress={() => router.push("/new")}
            >
              <Text className="text-white font-semibold">Create First Record</Text>
            </Pressable>
          </View>
        ) : (
          records.map(record => (
            <View key={record.id} className="bg-white p-5 mb-4 rounded-2xl shadow-sm border border-orange-100">
              <View className="flex-row justify-between items-start mb-3">
                <Text className="text-xl font-bold text-orange-900">{record.petName}</Text>
                <View className="bg-orange-100 px-3 py-1 rounded-full">
                  <Text className="text-orange-800 text-xs font-medium">{record.petAge} years old</Text>
                </View>
              </View>

              <View className="border-b border-orange-100 mb-3" />

              <View className="flex-row items-center mb-2">
                <MaterialIcons name="calendar-today" size={16} color="#f97316" />
                <Text className="text-orange-800 ml-2">
                  {formatDate(record.date)} • {record.day} • {record.time}
                </Text>
              </View>

              <View className="flex-row items-center mb-4">
                <MaterialIcons name="location-on" size={16} color="#f97316" />
                <Text className="text-orange-800 ml-2">{record.location}</Text>
              </View>

              <View className="flex-row justify-end space-x-3">
                <TouchableOpacity
                  className="bg-orange-100 px-4 py-2 rounded-full flex-row items-center"
                  onPress={() => record.id && router.push(`/edit?id=${record.id}`)}
                >
                  <MaterialIcons name="edit" size={16} color="#f97316" />
                  <Text className="text-orange-700 font-medium ml-1">Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="bg-red-100 px-4 py-2 rounded-full flex-row items-center"
                  onPress={() => record.id && handleDelete(record.id)}
                >
                  <MaterialIcons name="delete" size={16} color="#ef4444" />
                  <Text className="text-red-600 font-medium ml-1">Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Floating Action Button */}
      {records.length > 0 && (
        <View className="absolute bottom-5 right-5">
          <Pressable
            className="bg-orange-500 p-5 rounded-full shadow-xl"
            onPress={() => router.push("/new")}
          >
            <MaterialIcons name="add" size={28} color="#fff" />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default HealthScreen;