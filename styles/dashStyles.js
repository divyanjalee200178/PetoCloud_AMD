import { StyleSheet, Dimensions } from 'react-native';

// Get the screen width for dynamic calculations
const { width } = Dimensions.get('window');

export const dashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA000',
  },
  header: {
    backgroundColor: '#FF8A65',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#FF8A65',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    fontWeight: '500',
  },
  timeContainer: {
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 10,
  },
  profileImage: {
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  petCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 20,
    marginTop: -15,
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 138, 101, 0.1)',
  },
  petImageContainer: {
    position: 'relative',
  },
  petImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#4ECDC4',
  },
  statusDot: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#4ECDC4',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  petInfo: {
    flex: 1,
    marginLeft: 15,
  },
  petName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2D3748',
    marginBottom: 3,
  },
  petBreed: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 3,
    fontWeight: '500',
  },
  petStatus: {
    fontSize: 12,
    color: '#4ECDC4',
    fontWeight: '600',
  },
  moreButton: {
    padding: 10,
  },
  moreButtonText: {
    fontSize: 20,
    color: '#718096',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2D3748',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 55) / 2,
    paddingVertical: 25,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
  actionIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 55) / 2,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 6,
  },
  statIcon: {
    fontSize: 25,
    marginBottom: 10,
  },
  statTitle: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '600',
    marginBottom: 8,
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2D3748',
  },
  statUnit: {
    fontSize: 14,
    color: '#718096',
    marginLeft: 3,
    fontWeight: '500',
  },
  statTrend: {
    fontSize: 14,
    fontWeight: '600',
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  taskIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  taskEmoji: {
    fontSize: 20,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 3,
  },
  taskTime: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '500',
  },
  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default styles;