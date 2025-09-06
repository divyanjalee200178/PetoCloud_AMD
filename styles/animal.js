// styles/animal.ts
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFECB3',
  },

  // Header Styles
  header: {
    backgroundColor: '#F9A825',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hamburgerMenu: {
    marginRight: 15,
  },
  logo: {
    marginRight: 8,
  },
  logoImage: {
    width: 24,
    height: 24,
  },
  brandText: {
    color: '#FF6B35',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'System',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  // Main Content
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  // Quick Actions Grid (3 cards in row)
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  quickActionCard: {
    width: (width - 60) / 3,
    height: 90,
    borderRadius: 15,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Quick Action Colors
  petBoardingCard: {
    backgroundColor: '#FFF4E6',
  },
  petHealthCard: {
    backgroundColor: '#FFF0F7',
  },
  petWalkingCard: {
    backgroundColor: '#F0F0FF',
  },

  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },

  // Icon Colors
  boardingIconContainer: {
    backgroundColor: '#FF6B35',
  },
  healthIconContainer: {
    backgroundColor: '#FF1B8D',
  },
  walkingIconContainer: {
    backgroundColor: '#8B5CF6',
  },

  quickActionText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    lineHeight: 12,
  },

  // Services List
  servicesContainer: {
    flex: 1,
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  serviceImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 15,
    backgroundColor: '#F0F0F0',
  },
  serviceContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
    lineHeight: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 6,
  },
  ratingText: {
    fontSize: 13,
    color: '#888888',
    fontWeight: '500',
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  bookButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },

  // Bottom Navigation
  bottomNav: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    height: 70,
  },
  tabButton: {
    padding: 8,
    borderRadius: 12,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#FF6B35',
  },

  // Original animal category styles (if needed)
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 20,
    marginTop: 10,
  },
  card: {
    width: (width - 60) / 2,
    height: 100,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },

  // Scrollable content
  scrollContent: {
    paddingBottom: 20,
  },
});