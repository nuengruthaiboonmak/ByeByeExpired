import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const productData = [
  { id: "1", name: "เอโร่ ไข่ไก่ เบอร์ 3", quantity: "1 piece", expDate: "4 Mar 2025", image: require("../assets/images/egg.png") },
  { id: "2", name: "ลูกชิ้นปลากลม", quantity: "1 piece", expDate: "2 Jan 2025", image: require("../assets/images/egg.png") },
  { id: "3", name: "น้ำมะนาวคั้นสด", quantity: "1 piece", expDate: "9 Jan 2025", image: require("../assets/images/egg.png") },
  { id: "4", name: "ไก่หมักกล้วยแช่แข็ง", quantity: "2 piece", expDate: "14 Jan 2025", image: require("../assets/images/egg.png") },
  { id: "5", name: "เลือดไก่", quantity: "1 piece", expDate: "2 Feb 2025", image: require("../assets/images/egg.png") },
  { id: "6", name: "เครื่องในไก่", quantity: "1 piece", expDate: "10 Feb 2025", image: require("../assets/images/egg.png") },
];

const ExpProductScreen = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.navigate("Overview");
  };

  const handleGoToNext = () => {
    navigation.navigate("Login");
  };
  
  const handleProductPress = (product) => {
    navigation.navigate("ShowDetailProduct", { product });
  };

  return (
    <LinearGradient colors={["#de4f4f","#FFFFFF"]} style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Overview</Text>
      </TouchableOpacity>
      <Text style={styles.header}>EXPIRED</Text>
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
    color: "#ffffff",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 10,
    paddingLeft: 10,
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

export default ExpProductScreen;