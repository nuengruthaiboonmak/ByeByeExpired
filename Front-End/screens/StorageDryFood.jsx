import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient

const productData = [
  { id: "1", name: "เอโร่ ไข่ไก่ เบอร์ 3", quantity: "1 piece", expDate: "4 Mar 2025", image: require("../assets/images/egg.png") },
  { id: "2", name: "ลูกชิ้นปลากลม", quantity: "1 piece", expDate: "2 Jan 2025", image: require("../assets/images/egg.png") },
  { id: "3", name: "น้ำมะนาวคั้นสด", quantity: "1 piece", expDate: "9 Jan 2025", image: require("../assets/images/egg.png") },
  { id: "4", name: "ไก่หมักกล้วยแช่แข็ง", quantity: "2 piece", expDate: "14 Jan 2025", image: require("../assets/images/egg.png") },
  { id: "5", name: "เลือดไก่", quantity: "1 piece", expDate: "2 Feb 2025", image: require("../assets/images/egg.png") },
  { id: "6", name: "เครื่องในไก่", quantity: "1 piece", expDate: "10 Feb 2025", image: require("../assets/images/egg.png") },
];

const StorageDryFoodScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  const handleAddProduct = () => {
    navigation.navigate("AddProduct");
  };

  const handleGoBack = () => {
    navigation.navigate("Overview");
  };

  // เปลี่ยนฟังก์ชัน handleGoToNext ให้ไปที่หน้า "Overview"
  const handleGoToNext = () => {
    navigation.navigate("Login"); // เปลี่ยนการนำทางไปหน้า Overview
  };

  const handleProductPress = (product) => {
    navigation.navigate("ShowDetailProduct", { product });
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

      <TextInput
        style={styles.searchBox}
        placeholder="Search Product"
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

<FlatList
        data={productData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productCard} onPress={() => handleProductPress(item)}>
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.textBox}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productQuantity}>{item.quantity}</Text>
              <Text style={styles.productExpDate}>EXP: {item.expDate}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No products available</Text>}
      />

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

      {/* Right Arrow Button with Image */}
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
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    marginBottom: 15,
    marginHorizontal: 10,
    width: 180,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 145,
    height: 120,
    resizeMode: "contain",
    borderRadius: 8,
  },
  textBox: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    marginTop: 5,
    width: "100%",
    alignItems: "flex-start",
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  productQuantity: {
    fontSize: 12,
    color: "#555",
  },
  productExpDate: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#D9534F",
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
    backgroundColor: "#BE9090",
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
    color: "#BE9090",
    fontSize: 17,
    fontWeight: "bold",
  },

  // Right arrow button styles with shadow
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
    // Shadow effect
    shadowColor: "#000", // Color of shadow
    shadowOffset: { width: 0, height: 4 }, // Position of shadow
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 5, // Blur radius of shadow
    elevation: 5, // For Android shadow
  },
  rightArrowImage: {
    width: 20, // Image width
    height: 20, // Image height
    resizeMode: "contain", // Preserve aspect ratio
  },
});

export default StorageDryFoodScreen;
