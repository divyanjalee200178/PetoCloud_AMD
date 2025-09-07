import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { rabbitStyles as styles } from '@/styles/rabbitStyles';

const rabbitDetails = {
  holland_lop: {
    title: 'Holland Lop',
    description: 'Small, friendly rabbits with lop ears and gentle temperament.',
    image: 'https://cdn.fotofits.com/petzlover/gallery/img/l/holland-lop-620239.jpg',
    info: {
      Colors: 'White, Brown, Grey',
      'Average Age': '7–10 years',
      Medicines: 'Nail trimming, Deworming',
    },
  },
  netherland_dwarf: {
    title: 'Netherland Dwarf',
    description: 'Tiny, energetic rabbits with short ears and round faces.',
    image: 'https://lionheadrabbitcare.com/wp-content/uploads/2019/08/bunny-2495549_1280-768x1024.jpg',
    info: {
      Colors: 'Black, Grey, White, Brown',
      'Average Age': '8–12 years',
      Medicines: 'Ear cleaning, Vaccinations',
    },
  },
  lionhead: {
    title: 'Lionhead',
    description: 'Rabbits with distinctive mane of long fur around the head.',
    image: 'https://therabbithop.com/wp-content/uploads/2022/10/Shutterstock_1374779660.jpg',
    info: {
      Colors: 'White, Black, Grey, Brown',
      'Average Age': '7–10 years',
      Medicines: 'Grooming, Vitamin supplements',
    },
  },
};

const RabbitPage = () => {
  const [selectedRabbit, setSelectedRabbit] = useState<string | null>(null);

  const renderHeader = (title = "Rabbit Categories") => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {selectedRabbit && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedRabbit(null)}
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

  const renderRabbitList = () => (
    <View style={styles.listContainer}>
      {renderHeader()}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Rabbit Care Services</Text>
            <Text style={styles.heroDescription}>
              Professional care for your adorable rabbits
            </Text>
            <TouchableOpacity style={styles.exploreButton}>
              <Text style={styles.exploreButtonText}>Explore Now</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: 'https://www.baltana.com/files/wallpapers-6/Cute-White-Baby-Rabbit-Wallpaper-19291.jpg' }}
            style={styles.heroImage}
          />
        </View>

        <Text style={styles.sectionTitle}>Popular Rabbit Breeds</Text>
        {Object.keys(rabbitDetails).map((key) => (
          <TouchableOpacity
            key={key}
            style={styles.breedCard}
            onPress={() => setSelectedRabbit(key)}
          >
            <Image
              source={{ uri: rabbitDetails[key].image }}
              style={styles.breedImage}
            />
            <View style={styles.breedContent}>
              <Text style={styles.breedName}>{rabbitDetails[key].title}</Text>
              <Text style={styles.breedDescription}>
                {rabbitDetails[key].description.substring(0, 50)}...
              </Text>
            </View>
            <Icon name="chevron-forward-outline" size={20} color="#CCCCCC" style={styles.chevronIcon} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      {renderFooter()}
    </View>
  );

  const renderRabbitDetails = (rabbitKey: string) => {
    const details = rabbitDetails[rabbitKey];

    return (
      <View style={styles.detailsContainer}>
        {renderHeader(`${details.title} Details`)}
        <ScrollView style={styles.detailsContent} showsVerticalScrollIndicator={false}>
          <Image source={{ uri: details.image }} style={styles.detailsImage} />

          <Text style={styles.detailsTitle}>{details.title}</Text>
          <Text style={styles.detailsDescription}>{details.description}</Text>

          <View style={styles.servicesSection}>
            <Text style={styles.servicesTitle}>Breed Information</Text>
            {Object.entries(details.info).map(([label, value], idx) => (
              <View key={idx} style={styles.serviceItem}>
                <View style={styles.serviceIcon}>
                  <Icon
                    name={getRabbitInfoIcon(label)}
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

  const getRabbitInfoIcon = (info: string) => {
    const icons: Record<string, string> = {
      Colors: 'color-palette-outline',
      'Average Age': 'time-outline',
      Medicines: 'medical-outline',
    };
    return icons[info] || 'paw-outline';
  };

  const renderFooter = () => (
    <View style={styles.footer}>
      <Text style={styles.footerText}>🐰 Rabbit Care App © 2025</Text>
      <Text style={styles.footerSubText}>All rights reserved</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {selectedRabbit ? renderRabbitDetails(selectedRabbit) : renderRabbitList()}
    </SafeAreaView>
  );
};

export default RabbitPage;
