// foodCate.js
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export const foodStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBE9E7",
  },

  // Header styles
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 28,
    paddingVertical: 28,
    backgroundColor: "#ECEFF1",
  },

  greeting: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },

  subGreeting: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "400",
  },

  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },

  bellIcon: {
    fontSize: 20,
  },

  heroBanner: {
    backgroundColor: "#FFA000",
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 30,
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },


  bannerTextSection: {
    flex: 1,
    paddingRight: 16,
  },

  bannerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 6,
  },

  bannerSubtitle: {
    fontSize: 14,
    color: "#FFE8DC",
    marginBottom: 16,
    lineHeight: 20,
  },

  shopButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
  },

  shopButtonText: {
    color: "#FF6B35",
    fontWeight: "600",
    fontSize: 14,
  },

  bannerImageSection: {
    width: 80,
    height: 80,
  },

  heroPetImage: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
  },

  // Categories styles
  categoriesSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 16,
  },

  smallCardsContainer: {
    paddingRight: 20,
  },

  smallCard: {
    width: 100,
    marginRight: 16,
    alignItems: "center",
  },

  smallImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },

  smallTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
    textAlign: "center",
  },

  // Featured section styles
  featuredSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  largeCardsContainer: {
    paddingHorizontal: 12,
  },

  largeCard: {
    width: (width - 60) / 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 24,
    marginHorizontal: 2,
    overflow: "hidden",
  },

  largeImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },

  largeCardContent: {
    padding: 12,
  },

  largeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },

  largeSubtitle: {
    fontSize: 12,
    color: "#FFAB00",
    fontWeight: "500",
  },

  // Modal styles (keeping the same as before)
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 0,
    width: width * 0.9,
    maxWidth: 400,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    overflow: "hidden",
  },

  modalHeader: {
    backgroundColor: "#FF6B35",
    paddingVertical: 20,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    flex: 1,
  },

  modalCloseIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },

  closeIcon: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  nutritionCard: {
    padding: 24,
  },

  nutritionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    backgroundColor: "#FFF8E1",
    padding: 16,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#FFAB00",
  },

  nutritionIcon: {
    fontSize: 24,
    marginRight: 12,
    marginTop: 2,
  },

  nutritionText: {
    flex: 1,
  },

  nutritionLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FF6B35",
    marginBottom: 4,
  },

  nutritionValue: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
    fontWeight: "500",
  },

  closeButton: {
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: "#FFAB00",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#FFAB00",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  closeButton: {
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: "#FFAB00",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#FFAB00",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  closeButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});