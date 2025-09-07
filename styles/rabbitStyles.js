import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const rabbitStyles = StyleSheet.create({
  // Main Container - Clean white base
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // Header - Orange gradient on white
  header: {
    backgroundColor: '#FF8C00',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#FF8C00',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  backButton: {
    marginRight: 16,
    padding: 12,
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFD700',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 24,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  // Content area
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    backgroundColor: '#FFFFFF',
  },

  // Hero Section - Compact modern glass morphism
  heroSection: {
    backgroundColor: 'rgba(255, 224, 178, 0.3)',
    borderRadius: 24,
    padding: 24,
    marginHorizontal: 4,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 140, 0, 0.2)',
    shadowColor: '#FF8C00',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 10,
    position: 'relative',
    overflow: 'hidden',
    backdropFilter: 'blur(20px)',
  },

  heroGradient: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 80,
    height: 80,
    backgroundColor: '#FFD700',
    opacity: 0.06,
    borderRadius: 40,
    transform: [{ rotate: '45deg' }],
  },

  heroAccent: {
    position: 'absolute',
    bottom: -15,
    left: -15,
    width: 60,
    height: 60,
    backgroundColor: '#FF8C00',
    opacity: 0.04,
    borderRadius: 30,
  },

  heroContent: {
    marginBottom: 20,
    zIndex: 3,
    alignItems: 'center',
  },

  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FF8C00',
    marginBottom: 12,
    lineHeight: 32,
    letterSpacing: -0.5,
    fontFamily: 'System',
    textAlign: 'center',
  },

  heroSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFD700',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    opacity: 0.8,
    textAlign: 'center',
  },

  heroDescription: {
    fontSize: 15,
    color: '#8B4513',
    lineHeight: 22,
    marginBottom: 24,
    fontWeight: '400',
    letterSpacing: 0.1,
    opacity: 0.9,
    textAlign: 'center',
    paddingHorizontal: 8,
  },

  exploreButton: {
    backgroundColor: '#FF8C00',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 16,
    alignSelf: 'center',
    shadowColor: '#FF8C00',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 0,
    position: 'relative',
    overflow: 'hidden',
    minWidth: 140,
  },

  buttonShimmer: {
    position: 'absolute',
    top: 0,
    left: -100,
    width: 100,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    transform: [{ skewX: '-20deg' }],
  },

  exploreButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
    letterSpacing: 0.5,
    zIndex: 2,
    textAlign: 'center',
  },

  heroImage: {
    width: 160,
    height: 160,
    borderRadius: 24,
    alignSelf: 'center',
    borderWidth: 0,
    shadowColor: '#FF8C00',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
    backgroundColor: '#FFFFFF',
    padding: 8,
  },

  // Section Titles - Modern minimal
  sectionTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FF8C00',
    marginBottom: 28,
    marginLeft: 8,
    letterSpacing: -0.5,
    lineHeight: 38,
  },

  sectionSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8B4513',
    marginBottom: 20,
    marginLeft: 8,
    opacity: 0.7,
    letterSpacing: 0.3,
  },

  // Breed Cards - Clean white cards with orange accents
  breedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFE4B5',
    shadowColor: '#FF8C00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    borderLeftWidth: 6,
    borderLeftColor: '#FF8C00',
  },

  breedImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginRight: 20,
    borderWidth: 2,
    borderColor: '#FFD700',
  },

  breedContent: {
    flex: 1,
  },

  breedName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF8C00',
    marginBottom: 8,
    letterSpacing: 0.5,
  },

  breedDescription: {
    fontSize: 14,
    color: '#8B4513',
    lineHeight: 20,
    fontWeight: '400',
  },

  chevronIcon: {
    marginLeft: 16,
    padding: 12,
    backgroundColor: '#FFE4B5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFD700',
  },

  // Details Screen
  detailsContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  detailsContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  detailsImage: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 3,
    borderColor: '#FF8C00',
    shadowColor: '#FF8C00',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },

  detailsTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FF8C00',
    marginBottom: 16,
    lineHeight: 40,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },

  detailsDescription: {
    fontSize: 17,
    color: '#8B4513',
    lineHeight: 28,
    marginBottom: 36,
    fontWeight: '400',
    letterSpacing: 0.2,
  },

  // Services Section - White card with orange highlights
  servicesSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 28,
    marginBottom: 28,
    borderWidth: 2,
    borderColor: '#FFE4B5',
    shadowColor: '#FF8C00',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    borderTopWidth: 6,
    borderTopColor: '#FFD700',
  },

  servicesTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FF8C00',
    marginBottom: 24,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },

  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginBottom: 8,
    backgroundColor: '#FFFAF0',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },

  serviceIcon: {
    width: 56,
    height: 56,
    backgroundColor: '#FFD700',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    borderWidth: 2,
    borderColor: '#FF8C00',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  serviceText: {
    fontSize: 16,
    color: '#8B4513',
    fontWeight: '600',
    flex: 1,
    letterSpacing: 0.3,
  },

  // List Container
  listContainer: {
    flex: 1,
    paddingBottom: 24,
  },

  // Footer - Clean with orange accents
  footer: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 3,
    borderTopColor: '#FFD700',
    alignItems: 'center',
    shadowColor: '#FF8C00',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },

  footerText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF8C00',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },

  footerSubText: {
    fontSize: 12,
    color: '#8B4513',
    marginTop: 6,
    fontWeight: '400',
    letterSpacing: 0.3,
  },

  // Special accent elements
  orangeAccent: {
    backgroundColor: '#FF8C00',
  },

  yellowAccent: {
    backgroundColor: '#FFD700',
  },

  lightAccent: {
    backgroundColor: '#FFE4B5',
  },

  creamAccent: {
    backgroundColor: '#FFFAF0',
  },

  // Text colors
  textPrimary: '#FF8C00',
  textSecondary: '#8B4513',
  textMuted: '#D2691E',
  textWhite: '#FFFFFF',

  // Border styles
  orangeBorder: {
    borderColor: '#FF8C00',
    borderWidth: 2,
  },

  yellowBorder: {
    borderColor: '#FFD700',
    borderWidth: 2,
  },

  lightBorder: {
    borderColor: '#FFE4B5',
    borderWidth: 1,
  },

  // Shadow presets
  orangeShadow: {
    shadowColor: '#FF8C00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },

  yellowShadow: {
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
});