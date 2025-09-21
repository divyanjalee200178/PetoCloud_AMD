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
    <View className="flex-1 bg-orange-50">
      {/* Header */}
      <View className="bg-orange-500 p-6 pt-12 rounded-b-3xl shadow-lg">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-3xl font-bold text-white">Appointments</Text>
          <Pressable
            onPress={() => router.push("/new")}
            className="bg-white p-3 rounded-full shadow-md"
          >
            <MaterialIcons name="add" size={24} color="#f97316" />
          </Pressable>
        </View>

        {appointments.length > 0 && (
          <View className="bg-white p-4 rounded-2xl shadow-md">
            <Text className="text-orange-800 font-semibold text-center">
              {appointments.length} {appointments.length === 1 ? "Appointment" : "Appointments"} Found
            </Text>
          </View>
        )}
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-4 mt-4" showsVerticalScrollIndicator={false}>
        {appointments.length === 0 ? (
          <View className="items-center justify-center mt-20 p-6">
            <View className="bg-orange-100 p-6 rounded-full mb-6">
              <FontAwesome5 name="calendar-check" size={48} color="#f97316" />
            </View>
            <Text className="text-xl font-bold text-orange-800 mb-2">No Appointments</Text>
            <Text className="text-orange-600 text-center mb-6">
              You don't have any appointments yet. Schedule your first one to get started.
            </Text>
            <Pressable
              className="bg-orange-500 px-6 py-3 rounded-full shadow-md"
              onPress={() => router.push("/new")}
            >
              <Text className="text-white font-semibold">Schedule Appointment</Text>
            </Pressable>
          </View>
        ) : (
          appointments.map(app => (
            <View
              key={app.id}
              className="bg-white p-5 mb-4 rounded-2xl shadow-sm border border-orange-100"
            >
              <View className="flex-row justify-between items-start mb-3">
                <Text className="text-xl font-bold text-orange-900">{app.petName}</Text>
                <View className="bg-orange-100 px-3 py-1 rounded-full">
                  <Text className="text-orange-800 text-xs font-medium">{app.status || "Scheduled"}</Text>
                </View>
              </View>

              <View className="flex-row items-center mb-2">
                <MaterialIcons name="event" size={16} color="#f97316" />
                <Text className="text-orange-800 ml-2">
                  {app.date} • {app.day} • {app.time}
                </Text>
              </View>

              <View className="flex-row items-center mb-2">
                <MaterialIcons name="location-on" size={16} color="#f97316" />
                <Text className="text-orange-800 ml-2">{app.location}</Text>
              </View>

              <View className="flex-row items-center mb-2">
                <MaterialIcons name="person" size={16} color="#f97316" />
                <Text className="text-orange-800 ml-2">{app.vetName || "Unassigned"}</Text>
              </View>

              <View className="flex-row items-center mb-4">
                <MaterialIcons name="pets" size={16} color="#f97316" />
                <Text className="text-orange-800 ml-2">Reason: {app.reason}</Text>
              </View>

              <View className="flex-row justify-end space-x-3">
                <TouchableOpacity
                  className="bg-orange-100 px-4 py-2 rounded-full flex-row items-center"
                  onPress={() =>
                    app.id &&
                    router.push({
                      pathname: "/edit",
                      params: { id: app.id, mode: "edit" },
                    })
                  }
                >
                  <MaterialIcons name="edit" size={16} color="#f97316" />
                  <Text className="text-orange-700 font-medium ml-1">Edit</Text>
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

      {/* Footer */}
      <View className="bg-orange-100 p-6 items-center justify-center">
        <Text className="text-orange-800 text-center text-sm">
          Manage all your pet appointments easily. Tap on an appointment to view details, edit, or delete.
        </Text>
      </View>
    </View>
  );
};

export default AppointmentScreen;
