import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { foodStyles as styles } from "@/styles/foodCate";

// ✅ Define type for services
type Animal = {
  id: string;
  title: string;
  price: string;
  rating: number;
  image: string;
  details: {
    nutrition: string;
    vitamins: string;
    foodOneDay: string;
  };
};

const services: Animal[] = [
  {
    id: "1",
    title: "Dog",
    price: "Category",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=200&fit=crop&crop=center",
    details: {
      nutrition: "High protein, healthy fats, and carbohydrates",
      vitamins: "Vitamin A, B-complex, D, and E",
      foodOneDay: "2 meals with kibble + fresh meat & vegetables",
    },
  },
  {
    id: "2",
    title: "Cat",
    price: "Category",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300&h=200&fit=crop&crop=center",
    details: {
      nutrition: "High protein diet from animal sources",
      vitamins: "Vitamin A, Taurine, Niacin",
      foodOneDay: "2–3 small meals of wet/dry food",
    },
  },
  {
    id: "3",
    title: "Bird",
    price: "Category",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=300&h=200&fit=crop&crop=center",
    details: {
      nutrition: "Seeds, pellets, fruits, and vegetables",
      vitamins: "Vitamin A, D3, and Calcium",
      foodOneDay: "Seed mix + fresh fruits & veggies",
    },
  },
  {
    id: "4",
    title: "Rabbit",
    price: "Category",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=300&h=200&fit=crop&crop=center",
    details: {
      nutrition: "High fiber diet with hay and greens",
      vitamins: "Vitamin A, D, E, and Calcium",
      foodOneDay: "Unlimited hay + fresh leafy greens + pellets",
    },
  },
  {
    id: "5",
    title: "Fish",
    price: "Category",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop&crop=center",
    details: {
      nutrition: "Balanced fish flakes, pellets, and live/frozen food",
      vitamins: "Vitamin C, D, and Calcium",
      foodOneDay: "Small amounts twice daily",
    },
  },
  {
    id: "6",
    title: "Hamster",
    price: "Category",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=300&h=200&fit=crop&crop=center",
    details: {
      nutrition: "Seeds, grains, and small amounts of fruits",
      vitamins: "Vitamin C, B-complex",
      foodOneDay: "Small portions of pellets + fresh vegetables",
    },
  },
];

export default function FoodCate() {
  // ✅ Type the state properly
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  // ✅ Type for render functions
  const renderSmallCard = ({ item }: { item: Animal }) => (
    <TouchableOpacity
      style={styles.smallCard}
      onPress={() => setSelectedAnimal(item)}
    >
      <Image source={{ uri: item.image }} style={styles.smallImage} />
      <Text style={styles.smallTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderLargeCard = ({ item }: { item: Animal }) => (
    <TouchableOpacity
      style={styles.largeCard}
      onPress={() => setSelectedAnimal(item)}
    >
      <Image source={{ uri: item.image }} style={styles.largeImage} />
      <View style={styles.largeCardContent}>
        <Text style={styles.largeTitle}>{item.title}</Text>
        <Text style={styles.largeSubtitle}>⭐ {item.rating} Rating</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={[styles.header, { marginBottom: 16 }]}>
        <TouchableOpacity onPress={() => console.log("Go Back")} style={{ marginRight: 12 }}>
          <Text style={{ fontSize: 20 }}>⬅️</Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Text style={styles.greeting}>Welcome Owner</Text>
          <Text style={styles.subGreeting}>
            Find the best food for your pets
          </Text>
        </View>

        <View style={styles.notificationIcon}>
          <Text style={styles.bellIcon}>🔔</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <View style={styles.bannerTextSection}>
            <Text style={styles.bannerTitle}>Premium Pet Care</Text>
            <Text style={styles.bannerSubtitle}>
              Best quality food for your beloved pets
            </Text>
            <TouchableOpacity style={styles.shopButton}>
              <Text style={styles.shopButtonText}>Explore Now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bannerImageSection}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=200&h=200&fit=crop&crop=center",
              }}
              style={styles.heroPetImage}
            />
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>

          <FlatList
            data={services.slice(0, 5)}
            renderItem={renderSmallCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.smallCardsContainer}
          />
        </View>

        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Popular Pets</Text>

          <FlatList
            data={services.slice(0, 5)}
            renderItem={renderLargeCard}
            keyExtractor={(item) => `large_${item.id}`}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.largeCardsContainer}
            columnWrapperStyle={{ justifyContent: "flex-start", marginBottom: 24 }}
          />
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal
        visible={!!selectedAnimal}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedAnimal(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedAnimal && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    {selectedAnimal.title} Nutrition
                  </Text>
                  <TouchableOpacity
                    style={styles.modalCloseIcon}
                    onPress={() => setSelectedAnimal(null)}
                  >
                    <Text style={styles.closeIcon}>✕</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.nutritionCard}>
                  <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionIcon}>🥩</Text>
                    <View style={styles.nutritionText}>
                      <Text style={styles.nutritionLabel}>Daily Nutrition</Text>
                      <Text style={styles.nutritionValue}>
                        {selectedAnimal.details.nutrition}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionIcon}>💊</Text>
                    <View style={styles.nutritionText}>
                      <Text style={styles.nutritionLabel}>Essential Vitamins</Text>
                      <Text style={styles.nutritionValue}>
                        {selectedAnimal.details.vitamins}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionIcon}>🍽️</Text>
                    <View style={styles.nutritionText}>
                      <Text style={styles.nutritionLabel}>Daily Feeding</Text>
                      <Text style={styles.nutritionValue}>
                        {selectedAnimal.details.foodOneDay}
                      </Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setSelectedAnimal(null)}
                >
                  <Text style={styles.closeButtonText}>Got It!</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
