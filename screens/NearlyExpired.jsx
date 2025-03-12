import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient

const StorageDryFoodScreen = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.navigate("Overview");
  };

  const handleGoToNext = () => {
    navigation.navigate("Login");
  };

  return (
    <LinearGradient
      colors={["#FFFFFF", "#BE9090"]} // Gradient from white to #BE9090 (light pinkish color)
      style={styles.container} // Apply gradient to container
    >
      {/* Back Button */}
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Overview</Text>
      </TouchableOpacity>

      <Text style={styles.header}>DRY FOOD</Text>

      <FlatList
        data={Array(20).fill({})} // Example data to display
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={() => (
          <View style={styles.productCard}>
            <Text style={styles.placeholderText}>Empty</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No products available</Text>}
      />

      {/* Right Arrow Button with Image */}
      <TouchableOpacity style={styles.rightArrowButton} onPress={handleGoToNext}>
        <View style={styles.rightArrowButtonCircle}>
          <Image
            source={require("../assets/images/exit.png")}
            style={{ width: 35, height: 35 }}
          />
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    marginBottom: 10,
    padding: 10,
    marginTop: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: "#BE9090",
  },
  header: {
    fontSize: 37,
    fontWeight: "bold",
    color: "#BE9090",
    textAlign: "left",
    marginBottom: 10,
    paddingLeft: 10,
    marginTop: 10,
  },
  row: {
    justifyContent: "space-between",
  },
  productCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    marginBottom: 15,
    marginHorizontal: 10,
    height: 180, // Adjust height as needed
    justifyContent: "center",
    width: 200, // Adjust width as needed
  },
  placeholderText: {
    fontSize: 16,
    color: "gray",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
  rightArrowButton: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  rightArrowButtonCircle: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  rightArrowImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});

export default StorageDryFoodScreen;
