import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fishStyles as styles } from '@/styles/fishStyles';

const fishDetails = {
  clownfish: {
    title: 'Clownfish',
    description: 'Brightly colored small fish known for their symbiotic relationship with sea anemones.',
    image: 'https://1.bp.blogspot.com/-c7vAqGTJptQ/UoXWDFco1gI/AAAAAAAADgI/IGzwvGplXZo/s1600/Clownfish_4.jpg',
    info: {
      Colors: 'Orange, White, Black',
      'Average Age': '6–10 years',
      Medicines: 'Regular water treatment, Disease prevention',
    },
  },
  betta: {
    title: 'Betta Fish',
    description: 'Vibrant, long-finned fish popular in home aquariums.',
    image: 'https://miro.medium.com/v2/resize:fit:1024/1*y6udVadaYQQpm5-fzmXfRw.jpeg',
    info: {
      Colors: 'Red, Blue, Green, Purple',
      'Average Age': '3–5 years',
      Medicines: 'Regular tank cleaning, Water quality monitoring',
    },
  },
  goldfish: {
    title: 'Goldfish',
    description: 'Classic freshwater fish, hardy and easy to care for.',
    image: 'https://images4.alphacoders.com/708/708756.jpg',
    info: {
      Colors: 'Orange, White, Black',
      'Average Age': '3–4 years',
      Medicines: 'Water quality maintenance, Disease prevention',
    },
  },
  guppy: {
    title: 'Guppy',
    description: 'Small, colorful freshwater fish that are very easy to breed and popular in aquariums.',
    image: 'https://a-z-animals.com/media/guppy-5.jpg',
    info: {
      Colors: 'Red, Blue, Yellow, Green, Multi-colored',
      'Average Age': '2–3 years',
      Medicines: 'Regular water changes, Disease prevention',
    },
  },
  angelfish: {
    title: 'Angelfish',
    description: 'Elegant freshwater fish with a unique triangular shape and graceful swimming.',
    image: 'https://i.pinimg.com/originals/df/2f/d8/df2fd837ea5d946b395ada99cde08534.jpg',
    info: {
      Colors: 'Silver, Black, Stripes, Multi-colored',
      'Average Age': '8–10 years',
      Medicines: 'Water quality maintenance, Disease prevention',
    },
  },
};

const FishPage = () => {
  const [selectedFish, setSelectedFish] = useState<string | null>(null);

  const renderHeader = (title = "Fish Categories") => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {selectedFish && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedFish(null)}
          >
            <Icon name="chevron-back-outline" size={24} color="#333333" />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <TouchableOpacity style={styles.profileButton}>
        <Icon name="person-outline" size={20} color="#00ACC1" />
      </TouchableOpacity>
    </View>
  );

  const renderFishList = () => (
    <View style={styles.listContainer}>
      {renderHeader()}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Fish Care Services</Text>
            <Text style={styles.heroDescription}>
              Professional care for your aquatic friends
            </Text>
            <TouchableOpacity style={styles.exploreButton}>
              <Text style={styles.exploreButtonText}>Explore Now</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: 'https://smartaquariumguide.com/wp-content/uploads/2019/10/best-aquarium-fish-coldwater.jpg' }}
            style={styles.heroImage}
          />
        </View>

        <Text style={styles.sectionTitle}>Popular Fish</Text>
        {Object.keys(fishDetails).map((key) => (
          <TouchableOpacity
            key={key}
            style={styles.breedCard}
            onPress={() => setSelectedFish(key)}
          >
            <Image
              source={{ uri: fishDetails[key].image }}
              style={styles.breedImage}
            />
            <View style={styles.breedContent}>
              <Text style={styles.breedName}>{fishDetails[key].title}</Text>
              <Text style={styles.breedDescription}>
                {fishDetails[key].description.substring(0, 50)}...
              </Text>
            </View>
            <Icon name="chevron-forward-outline" size={20} color="#00ACC1" style={styles.chevronIcon} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      {renderFooter()}
    </View>
  );

  const renderFishDetails = (fishKey: string) => {
    const details = fishDetails[fishKey];

    return (
      <View style={styles.detailsContainer}>
        {renderHeader(`${details.title} Details`)}
        <ScrollView style={styles.detailsContent} showsVerticalScrollIndicator={false}>
          <Image source={{ uri: details.image }} style={styles.detailsImage} />

          <Text style={styles.detailsTitle}>{details.title}</Text>
          <Text style={styles.detailsDescription}>{details.description}</Text>

          <View style={styles.servicesSection}>
            <Text style={styles.servicesTitle}>Fish Information</Text>
            {Object.entries(details.info).map(([label, value], idx) => (
              <View key={idx} style={styles.serviceItem}>
                <View style={styles.serviceIcon}>
                  <Icon
                    name={getFishInfoIcon(label)}
                    size={16}
                    color="#00ACC1"
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

  const getFishInfoIcon = (info: string) => {
    const icons: Record<string, string> = {
      Colors: 'color-palette-outline',
      'Average Age': 'time-outline',
      Medicines: 'medkit-outline',
    };
    return icons[info] || 'paw-outline';
  };

  const renderFooter = () => (
    <View style={styles.footer}>
      <Text style={styles.footerText}>🐠 Fish Care App © 2025</Text>
      <Text style={styles.footerSubText}>All rights reserved</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {selectedFish ? renderFishDetails(selectedFish) : renderFishList()}
    </SafeAreaView>
  );
};

export default FishPage;
