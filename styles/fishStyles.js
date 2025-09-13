import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const fishStyles = StyleSheet.create({
  // Main Container - Clean white background
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // Header - Orange gradient
  header: {
    backgroundColor: '#FF8C00',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: '#FF8C00',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
    position: 'relative',
    overflow: 'hidden',
  },

  // Header wave effect - Yellow accent
  headerWave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: '#FFD700',
    opacity: 0.3,
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
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFD700',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 24,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },

  // Content area - White background
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    backgroundColor: '#FFFFFF',
  },

  // Hero Section
  heroSection: {
    backgroundColor: 'rgba(255, 224, 178, 0.4)',
    borderRadius: 26,
    padding: 28,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 140, 0, 0.3)',
    shadowColor: '#FF8C00',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
    elevation: 12,
    position: 'relative',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },

  heroBubble1: {
    position: 'absolute',
    top: -15,
    right: -15,
    width: 60,
    height: 60,
    backgroundColor: '#FFD700',
    opacity: 0.1,
    borderRadius: 30,
  },

  heroBubble2: {
    position: 'absolute',
    bottom: -20,
    left: -10,
    width: 40,
    height: 40,
    backgroundColor: '#FF8C00',
    opacity: 0.08,
    borderRadius: 20,
  },

  heroContent: {
    flex: 1,
    marginRight: 20,
    zIndex: 2,
  },

  heroTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FF8C00',
    marginBottom: 12,
    lineHeight: 36,
    letterSpacing: -0.3,
  },

  heroSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFD700',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    opacity: 0.8,
  },

  heroDescription: {
    fontSize: 16,
    color: '#8B4513',
    lineHeight: 24,
    marginBottom: 24,
    fontWeight: '400',
    letterSpacing: 0.2,
  },

  exploreButton: {
    backgroundColor: '#F57F17',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 18,
    alignSelf: 'flex-start',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FF8C00',
  },

  buttonWave: {
    position: 'absolute',
    top: 0,
    left: -50,
    width: 50,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    transform: [{ skewX: '-15deg' }],
  },

  exploreButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.5,
    zIndex: 2,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  heroImage: {
    width: 120,
    height: 120,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#FFD700',
    shadowColor: '#FF8C00',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
  },

  // Section Titles
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FF8C00',
    marginBottom: 24,
    marginLeft: 4,
    letterSpacing: -0.3,
    lineHeight: 34,
  },

  sectionSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8B4513',
    marginBottom: 20,
    marginLeft: 4,
    opacity: 0.8,
    letterSpacing: 0.3,
  },

  // Fish Cards
  breedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE4B5',
    shadowColor: '#FF8C00',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#FF8C00',
    position: 'relative',
    overflow: 'hidden',
  },

  cardRipple: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 80,
    height: '100%',
    backgroundColor: '#FFD700',
    opacity: 0.05,
  },

  breedImage: {
    width: 85,
    height: 85,
    borderRadius: 18,
    marginRight: 20,
    borderWidth: 2,
    borderColor: '#FFD700',
    shadowColor: '#FF8C00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  breedContent: {
    flex: 1,
    zIndex: 2,
  },

  breedName: {
    fontSize: 19,
    fontWeight: '700',
    color: '#FF8C00',
    marginBottom: 8,
    letterSpacing: 0.3,
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
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FFD700',
  },

  // Details
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
    height: 280,
    borderRadius: 24,
    marginBottom: 28,
    borderWidth: 3,
    borderColor: '#FFD700',
    shadowColor: '#FF8C00',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 15,
  },

  detailsTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FF8C00',
    marginBottom: 16,
    lineHeight: 40,
    letterSpacing: -0.5,
    textAlign: 'center',
  },

  detailsDescription: {
    fontSize: 17,
    color: '#8B4513',
    lineHeight: 26,
    marginBottom: 32,
    fontWeight: '400',
    letterSpacing: 0.2,
    textAlign: 'center',
    paddingHorizontal: 8,
  },

  // Services Section
  servicesSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 28,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#FFE4B5',
    shadowColor: '#FF8C00',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    borderTopWidth: 4,
    borderTopColor: '#FFD700',
    position: 'relative',
    overflow: 'hidden',
  },

  servicesWave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#FFD700',
    opacity: 0.03,
  },

  servicesTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FF8C00',
    marginBottom: 24,
    letterSpacing: 0.3,
    zIndex: 2,
  },

  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 10,
    backgroundColor: '#FFFAF0',
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
    zIndex: 2,
  },

  serviceIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#FFD700',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
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
    fontWeight: '500',
    flex: 1,
    letterSpacing: 0.2,
    lineHeight: 22,
  },

  // List Container
  listContainer: {
    flex: 1,
  },

  // Footer
  footer: {
    paddingVertical: 28,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 3,
    borderTopColor: '#FFD700',
    alignItems: 'center',
    shadowColor: '#FF8C00',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12,
    position: 'relative',
  },

  footerWave: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: '#FFD700',
    opacity: 0.1,
  },

  footerText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF8C00',
    letterSpacing: 0.5,
    zIndex: 2,
  },

  footerSubText: {
    fontSize: 12,
    color: '#8B4513',
    marginTop: 6,
    fontWeight: '400',
    letterSpacing: 0.3,
    zIndex: 2,
  },

  // Utilities
  orangeGradient: { backgroundColor: '#FF8C00' },
  yellowGradient: { backgroundColor: '#FFD700' },
  lightOrange: { backgroundColor: '#FFE4B5' },
  creamBackground: { backgroundColor: '#FFFAF0' },

  bubbleSmall: {
    width: 20,
    height: 20,
    backgroundColor: '#FFD700',
    opacity: 0.2,
    borderRadius: 10,
  },

  bubbleMedium: {
    width: 35,
    height: 35,
    backgroundColor: '#FF8C00',
    opacity: 0.15,
    borderRadius: 17.5,
  },

  bubbleLarge: {
    width: 50,
    height: 50,
    backgroundColor: '#D2691E',
    opacity: 0.1,
    borderRadius: 25,
  },

  // ✅ Corrected text color helpers
  textPrimary: { color: '#FF8C00' },
  textSecondary: { color: '#8B4513' },
  textMuted: { color: '#D2691E' },
  textYellow: { color: '#FFD700' },
  textWhite: { color: '#FFFFFF' },

  // Shadows
  orangeShadow: {
    shadowColor: '#FF8C00',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },

  yellowShadow: {
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },

  waveEffect: {
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },

  // Borders
  orangeBorder: { borderColor: '#FF8C00', borderWidth: 2 },
  yellowBorder: { borderColor: '#FFD700', borderWidth: 2 },
  lightBorder: { borderColor: '#FFE4B5', borderWidth: 1 },

  // Background utilities
  orangeAccent: { backgroundColor: '#FF8C00' },
  yellowAccent: { backgroundColor: '#FFD700' },
  lightAccent: { backgroundColor: '#FFE4B5' },
  creamAccent: { backgroundColor: '#FFFAF0' },
});
