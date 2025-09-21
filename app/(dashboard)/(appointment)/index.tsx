import { View, Text, ScrollView, TouchableOpacity, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { onSnapshot } from "firebase/firestore";
import { appointmentRef, deleteAppointment } from "@/services/appointmentService";
import { useLoader } from "@/context/LoaderContext";
import { Appointment } from "@/types/appointment";
import "../../../global.css";

const AppointmentScreen = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const router = useRouter();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      appointmentRef,
      snapshot => {
        const list: Appointment[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
        setAppointments(list);
      },
      error => console.error(error)
    );
    return () => unsubscribe();
  }, []);

  const handleDelete = (id: string) => {
    Alert.alert("Delete Appointment", "Are you sure you want to delete this appointment?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            showLoader();
            await deleteAppointment(id);
          } finally {
            hideLoader();
          }
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-green-50">
      {/* Header */}
      <View className="bg-green-500 p-6 pt-12 rounded-b-3xl shadow-lg">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-3xl font-bold text-white">Appointments</Text>
          <Pressable
            onPress={() => router.push("/new")}
            className="bg-white p-3 rounded-full shadow-md"
          >
            <MaterialIcons name="add" size={24} color="#22c55e" />
          </Pressable>
        </View>

        {appointments.length > 0 && (
          <View className="bg-white p-4 rounded-2xl shadow-md">
            <Text className="text-green-800 font-semibold text-center">
              {appointments.length} {appointments.length === 1 ? "Appointment" : "Appointments"} Found
            </Text>
          </View>
        )}
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-4 mt-4" showsVerticalScrollIndicator={false}>
        {appointments.length === 0 ? (
          <View className="items-center justify-center mt-20 p-6">
            <View className="bg-green-100 p-6 rounded-full mb-6">
              <FontAwesome5 name="calendar-check" size={48} color="#22c55e" />
            </View>
            <Text className="text-xl font-bold text-green-800 mb-2">No Appointments</Text>
            <Text className="text-green-600 text-center mb-6">
              You don't have any appointments yet. Schedule your first one to get started.
            </Text>
            <Pressable
              className="bg-green-500 px-6 py-3 rounded-full shadow-md"
              onPress={() => router.push("/new")}
            >
              <Text className="text-white font-semibold">Schedule Appointment</Text>
            </Pressable>
          </View>
        ) : (
          appointments.map(app => (
            <View
              key={app.id}
              className="bg-white p-5 mb-4 rounded-2xl shadow-sm border border-green-100"
            >
              <View className="flex-row justify-between items-start mb-3">
                <Text className="text-xl font-bold text-green-900">{app.petName}</Text>
                <View className="bg-green-100 px-3 py-1 rounded-full">
                  <Text className="text-green-800 text-xs font-medium">{app.status || "Scheduled"}</Text>
                </View>
              </View>

              <View className="flex-row items-center mb-2">
                <MaterialIcons name="event" size={16} color="#22c55e" />
                <Text className="text-green-800 ml-2">
                  {app.date} • {app.day} • {app.time}
                </Text>
              </View>

              <View className="flex-row items-center mb-2">
                <MaterialIcons name="location-on" size={16} color="#22c55e" />
                <Text className="text-green-800 ml-2">{app.location}</Text>
              </View>

              <View className="flex-row items-center mb-2">
                <MaterialIcons name="person" size={16} color="#22c55e" />
                <Text className="text-green-800 ml-2">{app.vetName || "Unassigned"}</Text>
              </View>

              <View className="flex-row items-center mb-4">
                <MaterialIcons name="pets" size={16} color="#22c55e" />
                <Text className="text-green-800 ml-2">Reason: {app.reason}</Text>
              </View>

              <View className="flex-row justify-end space-x-3">
                <TouchableOpacity
                  className="bg-green-100 px-4 py-2 rounded-full flex-row items-center"
                  onPress={() =>
                    app.id &&
                    router.push({
                      pathname: "/appointment",
                      params: { id: app.id, mode: "edit" },
                    })
                  }
                >
                  <MaterialIcons name="edit" size={16} color="#22c55e" />
                  <Text className="text-green-700 font-medium ml-1">Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="bg-red-100 px-4 py-2 rounded-full flex-row items-center"
                  onPress={() => app.id && handleDelete(app.id)}
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
      {appointments.length > 0 && (
        <View className="absolute bottom-5 right-5">
          <Pressable
            className="bg-green-500 p-5 rounded-full shadow-xl"
            onPress={() => router.push("/new")}
          >
            <MaterialIcons name="add" size={28} color="#fff" />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default AppointmentScreen;
