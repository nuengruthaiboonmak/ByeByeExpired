import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient

const StorageFridgeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  const handleAddProduct = () => {
    navigation.navigate("AddProduct");
  };

  const handleGoBack = () => {
    navigation.navigate("Overview");
  };

  const handleGoToNext = () => {
    navigation.navigate("Login"); // เปลี่ยนการนำทางไปหน้า Overview
  };

  return (
    <LinearGradient
      colors={["#FFFFFF", "#FFB6C1"]} // Gradient from white to #FFB6C1 (light pink color)
      style={styles.container} // Apply gradient to container
    >
      {/* Back Button */}
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Overview</Text>
      </TouchableOpacity>

      <Text style={styles.header}>FRIDGE</Text>

      <TextInput
        style={styles.searchBox}
        placeholder="Search Product"
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

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

      {/* Add Product Button */}
      <View style={styles.addButtonContainer}>
        <View style={styles.addButtonBackground}>
          <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
            <View style={styles.addButtonCircle}>
              <Text style={styles.addButtonText}>+</Text>
            </View>
            <Text style={styles.addButtonLabel}>Add Product</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Right Arrow Button */}
      <TouchableOpacity style={styles.rightArrowButton} onPress={handleGoToNext}>
        <View style={styles.rightArrowButtonCircle}>
          {/* Keep the image inside the circle */}
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
    color: "#FE7EA9",
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FE7EA9",
    textAlign: "left",
    marginBottom: 10,
    paddingLeft: 10,
    marginTop: 10,
  },
  searchBox: {
    backgroundColor: "#e6e5e5",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
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
  addButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "flex-start",
  },
  addButtonBackground: {
    backgroundColor: "white",
    width: "100%",
    paddingVertical: 20,
    paddingLeft: 20,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  addButtonCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FE7EA9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  addButtonLabel: {
    color: "#FE7EA9",
    fontSize: 17,
    fontWeight: "bold",
  },

  // Right arrow button styles
  rightArrowButton: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  rightArrowButtonCircle: {
    width: 35, // Size of the circle
    height: 35, // Size of the circle
    borderRadius: 18, // Circle shape
    backgroundColor: "white", // Circle color
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StorageFridgeScreen;