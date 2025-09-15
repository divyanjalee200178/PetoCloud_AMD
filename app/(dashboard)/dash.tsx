import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  Animated
} from 'react-native';
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get('window');

const Dash = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [currentTime, setCurrentTime] = useState(new Date());

  const router = useRouter();
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const quickActions = [
    {
          id: 1,
          title: 'Animal category',
          icon: '🐭🦊🐕🐕‍🦺',
          color: '#FFA000',
          bgColor: '#FFECB3'
    },
    {
      id: 2,
      title: 'Add Food',
      icon: '🍖',
      color: '#FF6B6B',
      bgColor: '#FFE5E5'
    },
    {
      id: 3,
      title: 'Add Health Records',
      icon: '🏥',
      color: '#4ECDC4',
      bgColor: '#E5F9F7'
    },
    {
      id: 4,
      title: 'View Records',
      icon: '🚶‍♂️',
      color: '#45B7D1',
      bgColor: '#E5F3FF'
    },
    {
      id: 5,
      title: 'Profile Manage',
      icon: '🐕‍🦺',
      color: '#96CEB4',
      bgColor: '#E5F5ED'
    }
  ];

  const healthStats = [
    {
      title: 'Weight',
      value: '24.5',
      unit: 'kg',
      trend: '+0.3',
      color: '#FF6B6B',
      icon: '⚖️'
    },
    {
      title: 'Activity',
      value: '8.2',
      unit: 'hrs',
      trend: '+1.1',
      color: '#4ECDC4',
      icon: '🏃‍♂️'
    },
    {
      title: 'Sleep',
      value: '12.5',
      unit: 'hrs',
      trend: '-0.5',
      color: '#45B7D1',
      icon: '😴'
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      task: 'Vet Appointment',
      time: '2:30 PM',
      priority: 'high',
      icon: '🏥'
    },
    {
      id: 2,
      task: 'Medication',
      time: '6:00 PM',
      priority: 'medium',
      icon: '💊'
    },
    {
      id: 3,
      task: 'Grooming',
      time: 'Tomorrow',
      priority: 'low',
      icon: '✂️'
    }
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF8A65" />

      {/* Header */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <Text style={styles.dateText}>{formatDate(currentTime)}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <View style={styles.profileImage}>
              <Image
                source={{ uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" }}
                style={styles.avatar}
              />
            </View>
          </View>
        </View>
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Pet Profile Card */}
        <Animated.View
          style={[
            styles.petCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.petImageContainer}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400" }}
              style={styles.petImage}
            />
            <View style={styles.statusDot} />
          </View>
          <View style={styles.petInfo}>
            <Text style={styles.petName}>Buddy</Text>
            <Text style={styles.petBreed}>Golden Retriever • 3 years</Text>
            <Text style={styles.petStatus}>Healthy & Happy</Text>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <Text style={styles.moreButtonText}>•••</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
            }
          ]}
        >
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <Animated.View
                key={action.id}
                style={[
                  {
                    transform: [{
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 50],
                        outputRange: [0, 50 + (index * 10)],
                      })
                    }]
                  }
                ]}
              >
                <TouchableOpacity
                  style={[styles.actionCard, { backgroundColor: action.bgColor }]}
                  activeOpacity={0.7}
                  onPress={() => {
                    if (action.title === "Animal category") router.push("/animalCate");
                    if (action.title === "Add Food") router.push("/foodCate");
                    if (action.title === "Add Health Records") router.push("/new")
                    if (action.title === "View Records") router.push("/");
                    if (action.title === "Profile Manage") router.push("/petData");
                  }}
                >
                  <Text style={styles.actionIcon}>{action.icon}</Text>
                  <Text style={[styles.actionTitle, { color: action.color }]}>{action.title}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Health Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Overview</Text>
          <View style={styles.statsContainer}>
            {healthStats.map((stat, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.statCard,
                  {
                    opacity: fadeAnim,
                    transform: [{
                      translateX: slideAnim.interpolate({
                        inputRange: [0, 50],
                        outputRange: [0, (index % 2 === 0) ? -50 : 50],
                      })
                    }]
                  }
                ]}
              >
                <Text style={styles.statIcon}>{stat.icon}</Text>
                <Text style={styles.statTitle}>{stat.title}</Text>
                <View style={styles.statValueContainer}>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statUnit}>{stat.unit}</Text>
                </View>
                <Text style={[styles.statTrend, { color: stat.color }]}>
                  {stat.trend > 0 ? '↑' : '↓'} {Math.abs(stat.trend)}
                </Text>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* Upcoming Tasks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Tasks</Text>
          {upcomingTasks.map((task, index) => (
            <Animated.View
              key={task.id}
              style={[
                styles.taskCard,
                {
                  opacity: fadeAnim,
                  transform: [{
                    translateX: slideAnim.interpolate({
                      inputRange: [0, 50],
                      outputRange: [0, index % 2 === 0 ? -30 : 30],
                    })
                  }]
                }
              ]}
            >
              <View style={styles.taskIcon}>
                <Text style={styles.taskEmoji}>{task.icon}</Text>
              </View>
              <View style={styles.taskInfo}>
                <Text style={styles.taskTitle}>{task.task}</Text>
                <Text style={styles.taskTime}>{task.time}</Text>
              </View>
              <View style={[
                styles.priorityDot,
                {
                  backgroundColor:
                    task.priority === 'high' ? '#FF6B6B' :
                    task.priority === 'medium' ? '#FFD93D' : '#4ECDC4'
                }
              ]} />
            </Animated.View>
          ))}
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
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

export default Dash;