import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400" }}
              style={styles.logoImage}
            />
            <Text style={styles.appTitle}>PetoCloud</Text>
            <Text style={styles.appSubtitle}>Your pet's health companion</Text>
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400" }}
            style={styles.heroImage}
          />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Complete Care for Your Furry Friends</Text>
            <Text style={styles.heroDescription}>
              Track health records, schedule vet appointments, manage nutrition, and more - all in one place.
            </Text>
          </View>
        </View>

        {/* Features Grid */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Everything Your Pet Needs</Text>
          
          <View style={styles.featuresGrid}>
            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: '#FFEDD5' }]}>
                <Image
                  source={{ uri: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=150" }}
                  style={styles.featureImage}
                />
              </View>
              <Text style={styles.featureTitle}>Health Records</Text>
              <Text style={styles.featureDescription}>Track vaccinations, medications, and health history</Text>
            </View>

            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: '#DCFCE7' }]}>
                <Image
                  source={{ uri: "https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?w=150" }}
                  style={styles.featureImage}
                />
              </View>
              <Text style={styles.featureTitle}>Vet Appointments</Text>
              <Text style={styles.featureDescription}>Schedule and manage vet visits with reminders</Text>
            </View>

            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: '#FEF3C7' }]}>
                <Image
                  source={{ uri: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=150" }}
                  style={styles.featureImage}
                />
              </View>
              <Text style={styles.featureTitle}>Nutrition Tracking</Text>
              <Text style={styles.featureDescription}>Monitor diet, feeding schedules, and allergies</Text>
            </View>

            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: '#DBEAFE' }]}>
                <Image
                  source={{ uri: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=150" }}
                  style={styles.featureImage}
                />
              </View>
              <Text style={styles.featureTitle}>Activity Monitoring</Text>
              <Text style={styles.featureDescription}>Track exercise, walks, and playtime activities</Text>
            </View>
          </View>
        </View>

        {/* Testimonials */}
        <View style={styles.testimonialSection}>
          <Text style={styles.sectionTitle}>Loved by Pet Owners</Text>
          <View style={styles.testimonialCard}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" }}
              style={styles.testimonialAvatar}
            />
            <Text style={styles.testimonialText}>
              "PetoCloud has made managing my two dogs' health so much easier. The vaccination reminders alone are worth it!"
            </Text>
            <Text style={styles.testimonialAuthor}>- Sarah J.</Text>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to give your pet the best care?</Text>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => router.push("/(auth)/login")}
          >
            <Text style={styles.ctaButtonText}>Get Started Today</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => router.push("/(auth)/register")}
          >
            <Text style={styles.registerLink}>Create an account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
  },
  headerContent: {
    alignItems: 'center',
  },
  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  appSubtitle: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
  },
  heroSection: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  heroImage: {
    width: 120,
    height: 120,
    borderRadius: 20,
    marginRight: 20,
  },
  heroContent: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  heroDescription: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  featuresSection: {
    padding: 24,
    backgroundColor: '#F9FAFB',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 24,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    overflow: 'hidden',
  },
  featureImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
  testimonialSection: {
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  testimonialCard: {
    backgroundColor: '#F0F9FF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  testimonialAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 16,
  },
  testimonialText: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 16,
    lineHeight: 24,
  },
  testimonialAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  ctaSection: {
    padding: 24,
    backgroundColor: '#FB923C',
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
  },
  ctaButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  ctaButtonText: {
    color: '#FB923C',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerLink: {
    color: '#FFFFFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

