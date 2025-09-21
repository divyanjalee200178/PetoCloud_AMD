// AnimalCate.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '@/styles/animal';

const AnimalCate: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('home');

  // Quick actions
  const quickActions = [
    { id: '1', title: 'Pet Boarding', icon: 'calendar-outline', bgColor: '#FFF4E6', iconBg: '#FF6B35' },
    { id: '2', title: 'Pet Health', icon: 'heart-outline', bgColor: '#FFF0F7', iconBg: '#FF1B8D' },
    { id: '3', title: 'Pet Walking', icon: 'location-outline', bgColor: '#F0F0FF', iconBg: '#8B5CF6' },

  ];

  // Animal categories
  const services = [
    { id: '1', title: 'Dog', price: 'Category', rating: 4.8, image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=200&fit=crop&crop=center' },
    { id: '2', title: 'Cat', price: 'Category', rating: 4.9, image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300&h=200&fit=crop&crop=center' },
    { id: '3', title: 'Bird', price: 'Category', rating: 4.7, image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=300&h=200&fit=crop&crop=center' },
    { id: '4', title: 'Rabbit', price: 'Category', rating: 4.6, image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=300&h=200&fit=crop&crop=center' },
    { id: '5', title: 'Fish', price: 'Category', rating: 4.5, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop&crop=center' },
  ];

  // Navigation mappings
  const quickActionPages: Record<string, string> = {
    'Pet Boarding': '/petBoarding',
    'Pet Health': '/petHealth',
    'Pet Walking': '/petWalking',
    'Add Food': '/addFood',
    'Health Check': '/healthCheck',
    'Walk Time': '/walkTime',
    'Play Session': '/playSession',
  };

  const animalPages: Record<string, string> = {
    Dog: '/dog',
    Cat: '/cat',
    Bird: '/bird',
    Rabbit: '/rabbit',
    Fish: '/fish',
  };

  // Handlers
  const handleQuickActionPress = (action: any) => {
    const page = quickActionPages[action.title];
    if (page) router.push(page as any);
    else console.log('Action not implemented:', action.title);
  };

  const handleAnimalPress = (animal: string) => {
    const page = animalPages[animal];
    if (page) router.push(page as "/dog" | "/cat" | "/bird" | "/rabbit" | "/fish");
    else console.log('Animal page not found:', animal);
  };

  const TabButton = ({ iconName, tabName }: { iconName: string; tabName: string }) => (
    <TouchableOpacity
      style={[styles.tabButton, activeTab === tabName && styles.activeTabButton]}
      onPress={() => setActiveTab(tabName)}
    >
      <Icon name={iconName} size={24} color={activeTab === tabName ? '#FFFFFF' : '#CCCCCC'} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.hamburgerMenu}>
            <Icon name="menu-outline" size={24} color="#333333" />
          </TouchableOpacity>
          <View style={styles.logo}>
            <Text style={{ fontSize: 24, color: '#FF6B35' }}>🐾</Text>
          </View>
          <Text style={styles.brandText}>Petcare</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Image
            source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/035/804/667/small_2x/ai-generated-korean-girl-in-a-black-blazer-and-a-white-shirt-standing-against-a-office-free-photo.jpg' }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.quickActionCard, { backgroundColor: action.bgColor }]}
              activeOpacity={0.7}
              onPress={() => handleQuickActionPress(action)}
            >
              <View style={[styles.iconContainer, { backgroundColor: action.iconBg }]}>
                <Icon name={action.icon} size={16} color="white" />
              </View>
              <Text style={styles.quickActionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Animal Categories */}
        <View style={styles.servicesContainer}>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              onPress={() => handleAnimalPress(service.title)}
            >
              <Image source={{ uri: service.image }} style={styles.serviceImage} />
              <View style={styles.serviceContent}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <View style={styles.ratingContainer}>
                  <View style={styles.starsContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon key={star} name="star" size={12} color="#FFD700" />
                    ))}
                  </View>
                  <Text style={styles.ratingText}>({service.rating})</Text>
                </View>
                <View style={styles.serviceFooter}>
                  <Text style={styles.servicePrice}>{service.price}</Text>
                  <TouchableOpacity style={styles.bookButton} onPress={() => handleAnimalPress(service.title)}>
                    <Text style={styles.bookButtonText}>Select</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>



    </SafeAreaView>
  );
};

// Remove tab bar for this page
export const unstable_settings = {
  tabBarStyle: { display: 'none' },
  headerShown: false,
};

export default AnimalCate;
