import { View, Text, FlatList, TouchableOpacity, RefreshControl } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { getPetsByUserId, deletePet } from "@/services/petService";
import { PetProfile } from "@/types/pet";
import { MaterialIcons, FontAwesome5, Entypo } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import "../../global.css";

const ProfileList = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [pets, setPets] = useState<PetProfile[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadPets = async () => {
    if (!user?.uid) return;
    const data = await getPetsByUserId(user.uid);
    setPets(data);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPets();
    setRefreshing(false);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    await deletePet(id);
    loadPets();
  };

  useFocusEffect(
    useCallback(() => {
      loadPets();
    }, [user])
  );

  // Updated Header with Cart and Subtitle
  const renderHeader = () => (
    <View className="mb-6">
      <View className="flex-row justify-between items-center mb-2">
        <TouchableOpacity
          onPress={() => router.replace("/dash")}
          className="p-2 bg-white rounded-full shadow-sm"
        >
          <MaterialIcons name="arrow-back" size={24} color="#ea580c" />
        </TouchableOpacity>

        <Text className="text-xl font-bold text-orange-900 flex-1 text-center">
          My Pets
        </Text>


      </View>

      {/* Short Description */}
      <Text className="text-orange-700 text-sm text-center">
        Manage your pets, track their health, and stay up to date with vaccinations.
      </Text>

      {/* Add Pet Button */}
      <TouchableOpacity
        onPress={() => router.push("/petData")}
        className="flex-row items-center bg-orange-500 px-5 py-3 rounded-xl shadow-md mt-4 justify-center active:bg-orange-600"
      >
        <MaterialIcons name="add" size={20} color="white" />
        <Text className="text-white font-semibold ml-2">Add Pet</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center py-20">
      <View className="bg-orange-100 p-6 rounded-full mb-6">
        <FontAwesome5 name="paw" size={40} color="#ea580c" />
      </View>
      <Text className="text-2xl font-bold text-orange-900 mb-2">No pets yet</Text>
      <Text className="text-orange-700 text-center mb-8">
        Add your first pet to get started with tracking their health and activities
      </Text>
      <TouchableOpacity
        onPress={() => router.push("/petData")}
        className="flex-row items-center bg-orange-500 px-6 py-4 rounded-xl"
      >
        <MaterialIcons name="add" size={22} color="white" />
        <Text className="text-white font-semibold ml-2">Add Your First Pet</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPetCard = ({ item }: { item: PetProfile }) => (
    <View className="bg-white p-5 rounded-2xl mb-4 shadow-sm border border-orange-100">
      <View className="flex-row justify-between items-start">
        <View className="flex-row items-center flex-1">
          <View className="bg-orange-100 w-16 h-16 rounded-xl items-center justify-center mr-4">
            <FontAwesome5
              name={item.species === "Dog" ? "dog" : item.species === "Cat" ? "cat" : "paw"}
              size={28}
              color="#ea580c"
            />
          </View>
          <View className="flex-1">
            <Text className="text-xl font-bold text-orange-900">{item.petName}</Text>
            <Text className="text-sm text-orange-700 mt-1">
              {item.breed} • {item.species}
            </Text>
            <View className="flex-row mt-2">
              <View className="bg-orange-50 px-2 py-1 rounded-md mr-2">
                <Text className="text-orange-700 text-xs font-medium">Age: {Number(item.age) || 0}</Text>
              </View>
              <View className="bg-amber-50 px-2 py-1 rounded-md">
                <Text className="text-amber-700 text-xs font-medium">Weight: {Number(item.weight) || 0}kg</Text>
              </View>
            </View>
          </View>
        </View>
        <View className="flex-row">
          <TouchableOpacity
            onPress={() => router.push(`/edit?id=${item.id}`)}
            className="bg-orange-50 p-2 rounded-lg mr-2"
          >
            <MaterialIcons name="edit" size={20} color="#ea580c" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDelete(item.id)}
            className="bg-red-50 p-2 rounded-lg"
          >
            <MaterialIcons name="delete" size={20} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-orange-50 p-5">
      {renderHeader()}
      {pets.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={pets}
          keyExtractor={(item) => item.id!}
          renderItem={renderPetCard}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#ea580c"]}
              tintColor="#ea580c"
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default ProfileList;
