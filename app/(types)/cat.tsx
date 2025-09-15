import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { catStyles as styles } from '@/styles/catStyles'; // 🟢 separate styles file for cats
import { useRouter } from 'expo-router';

const catDetails = {
  persian: {
    title: 'Persian Cat',
    description: 'Long-haired, calm, and affectionate cats with a royal look.',
    image: 'https://cdn.pixabay.com/photo/2017/11/09/21/41/persian-cat-2934720_1280.jpg',
    info: {
      Colors: 'White, Cream, Blue, Black',
      'Average Age': '12–17 years',
      Medicines: 'Eye care, Hairball prevention',
    },
  },
  siamese: {
    title: 'Siamese Cat',
    description: 'Elegant, talkative, and affectionate cats with striking blue eyes.',
    image: 'https://assets.elanco.com/8e0bf1c2-1ae4-001f-9257-f2be3c683fb1/fca42f04-2474-4302-a238-990c8aebfe8c/Siamese_cat_1110x740.jpg',
    info: {
      Colors: 'Seal Point, Blue Point, Chocolate Point',
      'Average Age': '10–15 years',
      Medicines: 'Respiratory care, Deworming',
    },
  },
  mainecoon: {
    title: 'Maine Coon',
    description: 'Gentle giants, friendly and social, one of the largest domestic cats.',
    image: 'https://cdn.pixabay.com/photo/2015/03/27/13/10/cat-694718_1280.jpg',
    info: {
      Colors: 'Brown Tabby, Black, White',
      'Average Age': '12–15 years',
      Medicines: 'Joint supplements, Grooming essentials',
    },
  },
  bengal: {
    title: 'Bengal Cat',
    description: 'Energetic, playful, and wild-looking cats with leopard-like spots.',
    image: 'https://img.freepik.com/premium-photo/ravishing-studio-portrait-bengal-cat-isolated-background_31965-141485.jpg',
    info: {
      Colors: 'Spotted, Rosetted, Marbled',
      'Average Age': '12–16 years',
      Medicines: 'Flea & Tick prevention, Dental care',
    },
  },
};

const CatPage = () => {
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const router = useRouter();

  // Header Component
  const renderHeader = (title = 'Cat Categories') => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {(selectedCat || true) && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              if (selectedCat) {
                setSelectedCat(null);
              } else {
                router.push('/dash');
              }
            }}
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

  // Footer Component
  const renderFooter = () => (
    <View style={styles.footer}>
      <Text style={styles.footerText}>🐱 Cat Care App © 2025</Text>
      <Text style={styles.footerSubText}>All rights reserved</Text>
    </View>
  );

  // Cat List
  const renderCatList = () => (
    <View style={styles.listContainer}>
      {renderHeader()}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Cat Care Services</Text>
            <Text style={styles.heroDescription}>
              Professional care for your lovely feline companions
            </Text>
            <TouchableOpacity style={styles.exploreButton}>
              <Text style={styles.exploreButtonText}>Explore Now</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: 'https://www.zastavki.com/pictures/1920x1200/2012/Animals_Cats_Beautiful_kitten_033169_.jpg' }}
            style={styles.heroImage}
          />
        </View>

        {/* Cat Breeds List */}
        <Text style={styles.sectionTitle}>Popular Cat Breeds</Text>
        {Object.keys(catDetails).map((key) => (
          <TouchableOpacity
            key={key}
            style={styles.breedCard}
            onPress={() => setSelectedCat(key)}
          >
            <Image
              source={{ uri: catDetails[key].image }}
              style={styles.breedImage}
            />
            <View style={styles.breedContent}>
              <Text style={styles.breedName}>{catDetails[key].title}</Text>
              <Text style={styles.breedDescription}>
                {catDetails[key].description.substring(0, 50)}...
              </Text>
            </View>
            <Icon name="chevron-forward-outline" size={20} color="#CCCCCC" style={styles.chevronIcon} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      {renderFooter()}
    </View>
  );

  // Cat Details
  const renderCatDetails = (catKey: string) => {
    const details = catDetails[catKey];

    return (
      <View style={styles.detailsContainer}>
        {renderHeader(`${details.title} Details`)}
        <ScrollView style={styles.detailsContent} showsVerticalScrollIndicator={false}>
          <Image source={{ uri: details.image }} style={styles.detailsImage} />
          <Text style={styles.detailsTitle}>{details.title}</Text>
          <Text style={styles.detailsDescription}>{details.description}</Text>

          {/* Cat Info Section */}
          <View style={styles.servicesSection}>
            <Text style={styles.servicesTitle}>Breed Information</Text>
            {Object.entries(details.info).map(([label, value], idx) => (
              <View key={idx} style={styles.serviceItem}>
                <View style={styles.serviceIcon}>
                  <Icon
                    name={getCatInfoIcon(label)}
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

  // Icon Mapping
  const getCatInfoIcon = (info: string) => {
    const icons: Record<string, string> = {
      Colors: 'color-palette-outline',
      'Average Age': 'time-outline',
      Medicines: 'medical-outline',
    };
    return icons[info] || 'paw-outline';
  };

  return (
    <SafeAreaView style={styles.container}>
      {selectedCat ? renderCatDetails(selectedCat) : renderCatList()}
    </SafeAreaView>
  );
};

export default CatPage;
