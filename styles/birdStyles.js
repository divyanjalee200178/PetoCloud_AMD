// app/styles/birdStyles.js
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const birdStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDE7'
  },

  header: {
    backgroundColor: '#FFA726',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  backButton: {
    marginRight: 15,
    padding: 8
  },

  headerTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20
  },

  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#BBDEFB',
    justifyContent: 'center',
    alignItems: 'center'
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20
  },

  heroSection: {
    backgroundColor: '#FFECB3',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center'
  },

  heroContent: {
    flex: 1,
    marginRight: 15
  },

  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8
  },

  heroDescription: {
    fontSize: 16,
    color: '#555555',
    lineHeight: 22,
    marginBottom: 15
  },

  exploreButton: {
    backgroundColor: '#1E88E5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start'
  },

  exploreButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14
  },

  heroImage: {
    width: 80,
    height: 80,
    borderRadius: 15
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15
  },

  breedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2
  },

  breedImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 15
  },

  breedContent: {
    flex: 1
  },

  breedName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4
  },

  breedDescription: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 18
  },

  chevronIcon: {
    marginLeft: 10
  },

  detailsContainer: {
    flex: 1
  },

  detailsContent: {
    paddingHorizontal: 20,
    paddingTop: 20
  },

  detailsImage: {
    width: '100%',
    height: 250,
    borderRadius: 20,
    marginBottom: 20
  },

  detailsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10
  },

  detailsDescription: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    marginBottom: 25
  },

  servicesSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2
  },

  servicesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15
  },

  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8
  },

  serviceIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#BBDEFB',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },

  serviceText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500'
  },

  listContainer: {
    flex: 1
  },

  footer: {
    padding: 12,
    backgroundColor: '#E3F2FD',
    borderTopWidth: 1,
    borderTopColor: '#B0BEC5',
    alignItems: 'center'
  },

  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555'
  },

  footerSubText: {
    fontSize: 12,
    color: '#888',
    marginTop: 2
  },
});
