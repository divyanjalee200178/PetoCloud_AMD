// app/(types)/dog.tsx
import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { dogStyles as styles } from '@/styles/dogStyles';

const dogDetails = {
  beagle: {
    title: 'Beagle',
    description: 'Small, curious, friendly dogs with excellent hunting instincts.',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop&crop=center',
    info: {
      Colors: 'Tri-color, Lemon, Red & White',
      'Average Age': '12–15 years',
      'Medicines': 'Deworming, Flea & Tick Prevention',
    },
  },
  bulldog: {
    title: 'Bulldog',
    description: 'Gentle, affectionate dogs with distinctive wrinkled faces.',
    image: 'https://cdn.britannica.com/07/234207-050-0037B589/English-bulldog-dog.jpg',
    info: {
      Colors: 'White, Fawn, Brindle',
      'Average Age': '8–10 years',
      'Medicines': 'Respiratory care, Joint supplements',
    },
  },
  labrador: {
    title: 'Labrador',
    description: 'Friendly, outgoing, high-spirited companions who love to play.',
    image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=600&h=400&fit=crop&crop=center',
    info: {
      Colors: 'Black, Chocolate, Yellow',
      'Average Age': '10–12 years',
      'Medicines': 'Hip dysplasia care, Ear infection drops',
    },
  },
  golden_retriever: {
    title: 'Golden Retriever',
    description: 'Intelligent, friendly, and devoted dogs perfect for families.',
    image: 'https://cdn.pixabay.com/photo/2013/11/28/12/14/dog-220455_1280.jpg',
    info: {
      Colors: 'Golden shades',
      'Average Age': '10–12 years',
      'Medicines': 'Skin allergy treatment, Joint care',
    },
  },
   golden_retriever: {
      title: 'Lion Shepherd',
      description: 'Intelligent, friendly, and devoted dogs perfect for families.',
      image: 'https://www.german-shepherd-rescue-hampshire.org.uk/wp-content/uploads/2021/05/Rufus-1.jpg',
      info: {
        Colors: 'Golden shades',
        'Average Age': '10–12 years',
        'Medicines': 'Skin allergy treatment, Joint care',
      },
    },
};

const DogPage = () => {
  const [selectedDog, setSelectedDog] = useState<string | null>(null);

  const renderHeader = (title = "Dog Categories") => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {selectedDog && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedDog(null)}
          >
            <Icon name="chevron-back-outline" size={24} color="#333333" />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <TouchableOpacity style={styles.profileButton}>
        <Icon name="person-outline" size={20} color="#FF6B35" />
      </TouchableOpacity>
    </View>
  );

  const renderDogList = () => (
    <View style={styles.listContainer}>
      {renderHeader()}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Dog Care Services</Text>
            <Text style={styles.heroDescription}>
              Professional care for your beloved canine companions
            </Text>
            <TouchableOpacity style={styles.exploreButton}>
              <Text style={styles.exploreButtonText}>Explore Now</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&h=200&fit=crop&crop=center' }}
            style={styles.heroImage}
          />
        </View>

        {/* Dog Breeds List */}
        <Text style={styles.sectionTitle}>Popular Dog Breeds</Text>
        {Object.keys(dogDetails).map((key) => (
          <TouchableOpacity
            key={key}
            style={styles.breedCard}
            onPress={() => setSelectedDog(key)}
          >
            <Image
              source={{ uri: dogDetails[key].image }}
              style={styles.breedImage}
            />
            <View style={styles.breedContent}>
              <Text style={styles.breedName}>{dogDetails[key].title}</Text>
              <Text style={styles.breedDescription}>
                {dogDetails[key].description.substring(0, 50)}...
              </Text>
            </View>
            <Icon name="chevron-forward-outline" size={20} color="#CCCCCC" style={styles.chevronIcon} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      {renderFooter()}
    </View>
  );

  const renderDogDetails = (dogKey: string) => {
    const details = dogDetails[dogKey];

    return (
      <View style={styles.detailsContainer}>
        {renderHeader(`${details.title} Details`)}
        <ScrollView style={styles.detailsContent} showsVerticalScrollIndicator={false}>
          <Image source={{ uri: details.image }} style={styles.detailsImage} />

          <Text style={styles.detailsTitle}>{details.title}</Text>
          <Text style={styles.detailsDescription}>{details.description}</Text>

          {/* Dog Info Section */}
          <View style={styles.servicesSection}>
            <Text style={styles.servicesTitle}>Breed Information</Text>
            {Object.entries(details.info).map(([label, value], idx) => (
              <View key={idx} style={styles.serviceItem}>
                <View style={styles.serviceIcon}>
                  <Icon
                    name={getDogInfoIcon(label)}
                    size={16}
                    color="#FF6B35"
                  />
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

  const getDogInfoIcon = (info: string) => {
    const icons: Record<string, string> = {
      Colors: 'color-palette-outline',
      'Average Age': 'time-outline',
      'Common Medicines': 'medical-outline',
    };
    return icons[info] || 'paw-outline';
  };

  // Footer Component
  const renderFooter = () => (
    <View style={styles.footer}>
      <Text style={styles.footerText}>🐶 Dog Care App © 2025</Text>
      <Text style={styles.footerSubText}>All rights reserved</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {selectedDog ? renderDogDetails(selectedDog) : renderDogList()}
    </SafeAreaView>
  );
};

export default DogPage;
