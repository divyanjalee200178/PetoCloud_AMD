// app/(types)/bird.tsx
import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { birdStyles as styles } from '@/styles/birdStyles';

const birdDetails = {
  parrot: {
    title: 'Parrot',
    description: 'Colorful, intelligent birds known for their ability to mimic sounds.',
    image: 'https://wallpaperaccess.com/full/3471524.jpg',
    info: {
      Colors: 'Green, Red, Blue, Yellow',
      'Average Age': '50–60 years',
      'Medicines': 'Beak & Feather care, Vitamins',
    },
  },
  canary: {
    title: 'Canary',
    description: 'Small, bright birds famous for their beautiful singing.',
    image: 'https://img.freepik.com/premium-photo/canary-perched-front-beautiful-background_682290-200.jpg',
    info: {
      Colors: 'Yellow, Orange, White',
      'Average Age': '10–15 years',
      'Medicines': 'Wing trimming, Vitamin supplements',
    },
  },
  cockatiel: {
    title: 'Cockatiel',
    description: 'Friendly, social birds with distinctive crest feathers.',
    image: 'https://i.pinimg.com/originals/7b/90/83/7b9083d3d9b586e311f550ed982aeafe.jpg',
    info: {
      Colors: 'Gray, White, Yellow, Orange',
      'Average Age': '15–20 years',
      'Medicines': 'Wing care, Nutrition supplements',
    },
  },
  lovebird: {
    title: 'Lovebird',
    description: 'Small, affectionate birds that thrive in pairs.',
    image: 'https://wallpaperaccess.com/full/4858207.jpg',
    info: {
      Colors: 'Green, Blue, Yellow, Red',
      'Average Age': '10–15 years',
      'Medicines': 'Feather & Nail care, Vitamins',
    },
  },

  budgerigar: {
    title: 'Budgerigar',
    description: 'Small, cheerful birds with vibrant colors and playful personalities.',
    image: 'https://picfiles.alphacoders.com/253/thumb-1920-253850.jpg',
    info: {
      Colors: 'Green, Blue, Yellow, White',
      'Average Age': '5–10 years',
      'Medicines': 'Beak & Feather care, Vitamins',
    },
  },

  cockatoo: {
    title: 'Cockatoo',
    description: 'Large, intelligent birds with expressive crests and playful nature.',
    image: 'https://images.coolwallpapers.me/picsup/5441942-sulphur-crested-cockatoo-wallpapers.jpg',
    info: {
      Colors: 'White, Pink, Grey, Yellow',
      'Average Age': '40–70 years',
      'Medicines': 'Feather care, Vitamin supplements',
    },
  },

};

const BirdPage = () => {
  const [selectedBird, setSelectedBird] = useState<string | null>(null);

  const renderHeader = (title = "Bird Categories") => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {selectedBird && (
          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedBird(null)}>
            <Icon name="chevron-back-outline" size={24} color="#333333" />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <TouchableOpacity style={styles.profileButton}>
        <Icon name="person-outline" size={20} color="#42A5F5" />
      </TouchableOpacity>
    </View>
  );

  const renderBirdList = () => (
    <View style={styles.listContainer}>
      {renderHeader()}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Bird Care Services</Text>
            <Text style={styles.heroDescription}>Professional care for your feathered friends</Text>
            <TouchableOpacity style={styles.exploreButton}>
              <Text style={styles.exploreButtonText}>Explore Now</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: 'https://mixingimages.in/wp-content/uploads/2023/09/Birds-Wallpaper.jpg' }}
            style={styles.heroImage}
          />
        </View>

        <Text style={styles.sectionTitle}>Popular Bird Species</Text>
        {Object.keys(birdDetails).map((key) => (
          <TouchableOpacity key={key} style={styles.breedCard} onPress={() => setSelectedBird(key)}>
            <Image source={{ uri: birdDetails[key].image }} style={styles.breedImage} />
            <View style={styles.breedContent}>
              <Text style={styles.breedName}>{birdDetails[key].title}</Text>
              <Text style={styles.breedDescription}>
                {birdDetails[key].description.substring(0, 50)}...
              </Text>
            </View>
            <Icon name="chevron-forward-outline" size={20} color="#CCCCCC" style={styles.chevronIcon} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      {renderFooter()}
    </View>
  );

  const renderBirdDetails = (birdKey: string) => {
    const details = birdDetails[birdKey];
    return (
      <View style={styles.detailsContainer}>
        {renderHeader(`${details.title} Details`)}
        <ScrollView style={styles.detailsContent} showsVerticalScrollIndicator={false}>
          <Image source={{ uri: details.image }} style={styles.detailsImage} />
          <Text style={styles.detailsTitle}>{details.title}</Text>
          <Text style={styles.detailsDescription}>{details.description}</Text>

          <View style={styles.servicesSection}>
            <Text style={styles.servicesTitle}>Species Information</Text>
            {Object.entries(details.info).map(([label, value], idx) => (
              <View key={idx} style={styles.serviceItem}>
                <View style={styles.serviceIcon}>
                  <Icon name={getBirdInfoIcon(label)} size={16} color="#42A5F5" />
                </View>
                <Text style={styles.serviceText}>
                  <Text style={{ fontWeight: 'bold' }}>{label}: </Text>
                  {value}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
        {renderFooter()}
      </View>
    );
  };

  const getBirdInfoIcon = (info: string) => {
    const icons: Record<string, string> = {
      Colors: 'color-palette-outline',
      'Average Age': 'time-outline',
      Medicines: 'medical-outline',
    };
    return icons[info] || 'paw-outline';
  };

  const renderFooter = () => (
    <View style={styles.footer}>
      <Text style={styles.footerText}>🐦 Bird Care App © 2025</Text>
      <Text style={styles.footerSubText}>All rights reserved</Text>
    </View>
  );

  return <SafeAreaView style={styles.container}>{selectedBird ? renderBirdDetails(selectedBird) : renderBirdList()}</SafeAreaView>;
};

export default BirdPage;
