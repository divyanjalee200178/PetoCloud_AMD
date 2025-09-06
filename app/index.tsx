import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { homeStyles } from "@/styles/index.js"; // import the styles

export default function Index() {
  const router = useRouter();

  return (
    <View style={homeStyles.container}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={homeStyles.header}>
          {/* Decorative Solid Shapes */}
          <View style={[homeStyles.decorativeShape, homeStyles.shape1]} />
          <View style={[homeStyles.decorativeShape, homeStyles.shape2]} />
          <View style={[homeStyles.decorativeShape, homeStyles.shape3]} />
          <View style={[homeStyles.decorativeShape, homeStyles.shape4]} />
          <View style={[homeStyles.decorativeShape, homeStyles.shape5]} />
          <View style={[homeStyles.decorativeShape, homeStyles.shape6]} />

          <View style={homeStyles.headerContent}>
            <Text style={homeStyles.appTitle}>PetoCloud</Text>

            {/* Main Image */}
            <View style={homeStyles.imageContainer}>
              <View style={homeStyles.imageCircle}>
                <Image
                  source={require('../assets/images/girlAndDog.png')}
                  style={homeStyles.mainImage}
                  resizeMode="cover"
                />
              </View>
            </View>

            <Text style={homeStyles.appSubtitle}>Your Pets{'\n'}Are Safe Here</Text>
            <Text style={homeStyles.description}>
              Welcome to PetoCloud, your all-in-one app for keeping your pets healthy, happy, and safe. Track vaccinations, manage vet appointments, monitor nutrition, and stay on top of daily activities.
            </Text>

          </View>
        </View>

        {/* Main Content */}
        <View style={homeStyles.mainContent}>
          {/* Features Section */}
          <View style={homeStyles.featuresSection}>
            <View style={homeStyles.featuresGrid}>
              {/* Feature Card 1 */}
              <View style={homeStyles.featureCard}>
                <View style={[homeStyles.featureIcon, {backgroundColor: '#FFEDD5'}]}>
                  <Image
                    source={{ uri: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=150" }}
                    style={homeStyles.featureImage}
                  />
                </View>
                <Text style={homeStyles.featureTitle}>Health Records</Text>
                <Text style={homeStyles.featureDescription}>Track vaccinations, medications, and health history</Text>
              </View>

              {/* Feature Card 2 */}
              <View style={homeStyles.featureCard}>
                <View style={[homeStyles.featureIcon, {backgroundColor: '#DCFCE7'}]}>
                  <Image
                    source={{ uri: "https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?w=150" }}
                    style={homeStyles.featureImage}
                  />
                </View>
                <Text style={homeStyles.featureTitle}>Vet Appointments</Text>
                <Text style={homeStyles.featureDescription}>Schedule and manage vet visits with reminders</Text>
              </View>

              {/* Feature Card 3 */}
              <View style={homeStyles.featureCard}>
                <View style={[homeStyles.featureIcon, {backgroundColor: '#FEF3C7'}]}>
                  <Image
                    source={{ uri: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=150" }}
                    style={homeStyles.featureImage}
                  />
                </View>
                <Text style={homeStyles.featureTitle}>Nutrition Tracking</Text>
                <Text style={homeStyles.featureDescription}>Monitor diet, feeding schedules, and allergies</Text>
              </View>

              {/* Feature Card 4 */}
              <View style={homeStyles.featureCard}>
                <View style={[homeStyles.featureIcon, {backgroundColor: '#DBEAFE'}]}>
                  <Image
                    source={{ uri: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=150" }}
                    style={homeStyles.featureImage}
                  />
                </View>
                <Text style={homeStyles.featureTitle}>Activity Monitoring</Text>
                <Text style={homeStyles.featureDescription}>Track exercise, walks, and playtime activities</Text>
              </View>
            </View>
          </View>

          {/* CTA Section */}
          <View style={homeStyles.ctaSection}>
            <TouchableOpacity
              style={homeStyles.ctaButton}
              onPress={() => router.push("/(auth)/login")}
            >
              <Text style={homeStyles.ctaButtonText}>Get Started</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/(auth)/register")}
              style={homeStyles.registerButton}
            >
              <Text style={homeStyles.registerLink}>Create an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
