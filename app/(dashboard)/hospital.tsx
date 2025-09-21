import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Linking,
  Platform,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window");

interface Hospital {
  id: number;
  name: string;
  location: string;
  contact: string;
  distance: string;
  rating: number;
  reviews: number;
  services: string[];
  openingHours: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

const hospitals: Hospital[] = [
  {
    id: 1,
    name: "Happy Paws Animal Hospital",
    location: "Colombo 07",
    contact: "+94112345678",
    distance: "2.3 km",
    rating: 4.8,
    reviews: 124,
    services: ["Emergency", "Surgery", "Dental", "Grooming"],
    openingHours: "Open 24/7",
    coordinates: {
      latitude: 6.9271,
      longitude: 79.8612,
    },
  },
  {
    id: 2,
    name: "PetCare Veterinary Clinic",
    location: "Kandy",
    contact: "+94812456789",
    distance: "5.1 km",
    rating: 4.6,
    reviews: 89,
    services: ["Consultation", "Vaccination", "Pet Boarding"],
    openingHours: "8:00 AM - 8:00 PM",
    coordinates: {
      latitude: 7.2906,
      longitude: 80.6337,
    },
  },
  {
    id: 3,
    name: "Animal Wellness Center",
    location: "Galle",
    contact: "+94912567890",
    distance: "8.7 km",
    rating: 4.9,
    reviews: 156,
    services: ["Physical Therapy", "Alternative Medicine", "Nutrition"],
    openingHours: "9:00 AM - 6:00 PM",
    coordinates: {
      latitude: 6.0535,
      longitude: 80.2210,
    },
  },
  {
    id: 4,
    name: "Paw & Claw Veterinary",
    location: "Negombo",
    contact: "+94772987654",
    distance: "12.5 km",
    rating: 4.7,
    reviews: 67,
    services: ["Surgery", "Dermatology", "Ophthalmology"],
    openingHours: "8:30 AM - 7:30 PM",
    coordinates: {
      latitude: 7.2094,
      longitude: 79.8357,
    },
  },
];

const Hospital = () => {
  const router = useRouter();
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>(hospitals);
  const scrollY = useRef(new Animated.Value(0)).current;

  // Fixed header opacity - now it stays visible when scrolling
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9], // Changed to maintain visibility
    extrapolate: "clamp",
  });

  // Added header translate animation for a better effect
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -20],
    extrapolate: "clamp",
  });

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredHospitals(hospitals);
    } else {
      const filtered = hospitals.filter(
        (hospital) =>
          hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hospital.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredHospitals(filtered);
    }
  }, [searchQuery]);

  const openHospitalDetails = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setModalVisible(true);
  };

  const makePhoneCall = (phoneNumber: string) => {
    const url = Platform.select({
      ios: `telprompt:${phoneNumber}`,
      android: `tel:${phoneNumber}`,
    });

    if (url) {
      Linking.canOpenURL(url)
        .then(supported => {
          if (supported) {
            return Linking.openURL(url);
          } else {
            console.log("Don't know how to open URI: " + url);
          }
        })
        .catch(err => console.error('An error occurred', err));
    }
  };

  const openDirections = (hospital: Hospital) => {
    const { latitude, longitude } = hospital.coordinates;
    const url = Platform.select({
      ios: `maps:0,0?q=${hospital.name}@${latitude},${longitude}`,
      android: `geo:0,0?q=${latitude},${longitude}(${hospital.name})`,
    });

    if (url) {
      Linking.openURL(url).catch(err =>
        console.error('An error occurred while opening maps', err)
      );
    }
  };

  const renderHospitalItem = (hospital: Hospital, index: number) => {
    // Removed the individual item animations to prevent overlap with header
    return (
      <View key={hospital.id}>
        <TouchableOpacity
          onPress={() => openHospitalDetails(hospital)}
          activeOpacity={0.8}
          className="bg-white rounded-2xl p-4 mb-4 shadow-lg shadow-orange-200"
        >
          <View className="flex-row">
            <View className="w-24 h-24 rounded-xl bg-orange-100 items-center justify-center">
              <FontAwesome5 name="hospital" size={40} color="#FFA500" />
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-lg font-bold text-orange-800">
                {hospital.name}
              </Text>
              <View className="flex-row items-center mt-1">
                <MaterialIcons
                  name="location-on"
                  size={16}
                  color="#FFA500"
                />
                <Text className="text-gray-600 text-sm ml-1">
                  {hospital.location} • {hospital.distance}
                </Text>
              </View>
              <View className="flex-row items-center mt-2">
                <View className="flex-row items-center">
                  <MaterialIcons name="star" size={16} color="#FFA500" />
                  <Text className="text-orange-600 font-semibold ml-1">
                    {hospital.rating}
                  </Text>
                </View>
                <Text className="text-gray-500 text-sm ml-2">
                  ({hospital.reviews} reviews)
                </Text>
              </View>
              <View className="flex-row flex-wrap mt-2">
                {hospital.services.slice(0, 3).map((service: string, index: number) => (
                  <View
                    key={index}
                    className="bg-orange-100 px-2 py-1 rounded-full mr-1 mb-1"
                  >
                    <Text className="text-orange-600 text-xs">{service}</Text>
                  </View>
                ))}
                {hospital.services.length > 3 && (
                  <View className="bg-orange-100 px-2 py-1 rounded-full">
                    <Text className="text-orange-600 text-xs">
                      +{hospital.services.length - 3}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-orange-100">
            <View className="bg-green-100 px-3 py-1 rounded-full">
              <Text className="text-green-800 font-medium text-sm">
                {hospital.openingHours}
              </Text>
            </View>
            <TouchableOpacity
              className="bg-orange-500 px-4 py-2 rounded-full"
              onPress={(e) => {
                e.stopPropagation(); // Prevent triggering the parent TouchableOpacity
                makePhoneCall(hospital.contact);
              }}
            >
              <Text className="text-white font-semibold">Call Now</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-orange-50">
      <StatusBar backgroundColor="#FFEDD5" />

      {/* Animated Header - Fixed to stay visible */}
      <Animated.View
        style={{
          opacity: headerOpacity,
          transform: [{ translateY: headerTranslateY }]
        }}
        className="absolute top-0 left-0 right-0 z-10 bg-orange-500 pt-12 pb-4 px-6 rounded-b-3xl"
      >
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="p-2 rounded-full bg-orange-400"
          >
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-white">
            Nearby Hospitals
          </Text>
          <TouchableOpacity
            className="p-2 rounded-full bg-orange-400"
            onPress={() => setSearchQuery("")}
          >
            <Ionicons name="filter" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-white px-4 py-3 rounded-xl mt-4 shadow">
          <MaterialIcons name="search" size={24} color="#FFA500" />
          <TextInput
            placeholder="Search hospitals or locations..."
            className="ml-2 flex-1"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <MaterialIcons name="close" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>

      {/* Hospital List */}
      <Animated.ScrollView
        className="flex-1 pt-44 px-6"
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <Text className="text-xl font-bold text-orange-800 mb-4">
          {filteredHospitals.length} Hospitals Found
        </Text>

        {filteredHospitals.length > 0 ? (
          filteredHospitals.map((hospital: Hospital, index: number) =>
            renderHospitalItem(hospital, index)
          )
        ) : (
          <View className="items-center justify-center py-20">
            <FontAwesome5 name="hospital" size={60} color="#FFD8B1" />
            <Text className="text-orange-800 text-xl font-bold mt-4">
              No hospitals found
            </Text>
            <Text className="text-orange-600 text-center mt-2">
              Try searching with different keywords or check your filters
            </Text>
          </View>
        )}

        <View className="h-20" />
      </Animated.ScrollView>

      {/* Map View Button */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 w-16 h-16 rounded-full bg-orange-500 items-center justify-center shadow-lg shadow-orange-400"
        onPress={() => {
          // Open default map app showing all hospitals
          const url = Platform.select({
            ios: `maps:0,0?q=animal+hospital`,
            android: `geo:0,0?q=animal+hospital`,
          });
          if (url) {
            Linking.openURL(url);
          }
        }}
      >
        <MaterialIcons name="map" size={28} color="white" />
      </TouchableOpacity>

      {/* Hospital Detail Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View className="flex-1" />
          </TouchableWithoutFeedback>

          <View className="bg-white rounded-t-3xl p-6 h-3/4">
            {selectedHospital && (
              <>
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-2xl font-bold text-orange-800">
                    {selectedHospital.name}
                  </Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <MaterialIcons name="close" size={28} color="#999" />
                  </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                  <View className="w-full h-48 rounded-xl bg-orange-100 items-center justify-center">
                    <FontAwesome5 name="hospital" size={80} color="#FFA500" />
                  </View>

                  <View className="flex-row justify-between items-center mt-4">
                    <View className="flex-row items-center">
                      <MaterialIcons name="location-on" size={20} color="#FFA500" />
                      <Text className="text-gray-600 ml-1">
                        {selectedHospital.location}
                      </Text>
                    </View>

                    <View className="flex-row items-center">
                      <MaterialIcons name="star" size={20} color="#FFA500" />
                      <Text className="text-orange-600 font-semibold ml-1">
                        {selectedHospital.rating} ({selectedHospital.reviews} reviews)
                      </Text>
                    </View>
                  </View>

                  <View className="mt-6">
                    <Text className="text-lg font-bold text-orange-800 mb-2">
                      Services Offered
                    </Text>
                    <View className="flex-row flex-wrap">
                      {selectedHospital.services.map((service: string, index: number) => (
                        <View
                          key={index}
                          className="bg-orange-100 px-3 py-2 rounded-full mr-2 mb-2"
                        >
                          <Text className="text-orange-600">{service}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  <View className="mt-6">
                    <Text className="text-lg font-bold text-orange-800 mb-2">
                      Opening Hours
                    </Text>
                    <View className="bg-green-100 px-4 py-2 rounded-lg">
                      <Text className="text-green-800 font-medium">
                        {selectedHospital.openingHours}
                      </Text>
                    </View>
                  </View>

                  <View className="mt-6">
                    <Text className="text-lg font-bold text-orange-800 mb-2">
                      Contact Information
                    </Text>
                    <Text className="text-gray-700">{selectedHospital.contact}</Text>
                  </View>

                  <View className="flex-row mt-8">
                    <TouchableOpacity
                      className="flex-1 bg-orange-500 py-4 rounded-xl mr-3 items-center"
                      onPress={() => makePhoneCall(selectedHospital.contact)}
                    >
                      <Text className="text-white font-bold">Call Now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="flex-1 border border-orange-500 py-4 rounded-xl ml-3 items-center"
                      onPress={() => openDirections(selectedHospital)}
                    >
                      <Text className="text-orange-500 font-bold">Get Directions</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Hospital;