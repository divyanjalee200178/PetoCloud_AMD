import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { homeStyles } from "@/styles/homeStyles";

export default function Index() {
  const router = useRouter();

  return (
    <View style={homeStyles.container}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={homeStyles.header}>
          <View style={homeStyles.headerContent}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400" }}
              style={homeStyles.logoImage}
            />
            <Text style={homeStyles.appTitle}>PetoCloud</Text>
            <Text style={homeStyles.appSubtitle}>Your pet's health companion</Text>
          </View>
        </View>

        {/* Hero Section */}
        <View style={homeStyles.heroSection}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400" }}
            style={homeStyles.heroImage}
          />
          <View style={homeStyles.heroContent}>
            <Text style={homeStyles.heroTitle}>Complete Care for Your Furry Friends</Text>
            <Text style={homeStyles.heroDescription}>
              Track health records, schedule vet appointments, manage nutrition, and more - all in one place.
            </Text>
          </View>
        </View>

        {/* Features Grid */}
        <View style={homeStyles.featuresSection}>
          <Text style={homeStyles.sectionTitle}>Everything Your Pet Needs</Text>

          <View style={homeStyles.featuresGrid}>
            <View style={homeStyles.featureCard}>
              <View style={[homeStyles.featureIcon, { backgroundColor: '#FFEDD5' }]}>
                <Image
                  source={{ uri: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=150" }}
                  style={homeStyles.featureImage}
                />
              </View>
              <Text style={homeStyles.featureTitle}>Health Records</Text>
              <Text style={homeStyles.featureDescription}>Track vaccinations, medications, and health history</Text>
            </View>

            <View style={homeStyles.featureCard}>
              <View style={[homeStyles.featureIcon, { backgroundColor: '#DCFCE7' }]}>
                <Image
                  source={{ uri: "https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?w=150" }}
                  style={homeStyles.featureImage}
                />
              </View>
              <Text style={homeStyles.featureTitle}>Vet Appointments</Text>
              <Text style={homeStyles.featureDescription}>Schedule and manage vet visits with reminders</Text>
            </View>

            <View style={homeStyles.featureCard}>
              <View style={[homeStyles.featureIcon, { backgroundColor: '#FEF3C7' }]}>
                <Image
                  source={{ uri: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=150" }}
                  style={homeStyles.featureImage}
                />
              </View>
              <Text style={homeStyles.featureTitle}>Nutrition Tracking</Text>
              <Text style={homeStyles.featureDescription}>Monitor diet, feeding schedules, and allergies</Text>
            </View>

            <View style={homeStyles.featureCard}>
              <View style={[homeStyles.featureIcon, { backgroundColor: '#DBEAFE' }]}>
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

        {/* Testimonials */}
        <View style={homeStyles.testimonialSection}>
          <Text style={homeStyles.sectionTitle}>Loved by Pet Owners</Text>
          <View style={homeStyles.testimonialCard}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" }}
              style={homeStyles.testimonialAvatar}
            />
            <Text style={homeStyles.testimonialText}>
              "PetoCloud has made managing my two dogs' health so much easier. The vaccination reminders alone are worth it!"
            </Text>
            <Text style={homeStyles.testimonialAuthor}>- Sarah J.</Text>
          </View>
        </View>

        {/* CTA Section */}
        <View style={homeStyles.ctaSection}>
          <Text style={homeStyles.ctaTitle}>Ready to give your pet the best care?</Text>
          <TouchableOpacity
            style={homeStyles.ctaButton}
            onPress={() => router.push("/(auth)/login")}
          >
            <Text style={homeStyles.ctaButtonText}>Get Started Today</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(auth)/register")}
          >
            <Text style={homeStyles.registerLink}>Create an account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}