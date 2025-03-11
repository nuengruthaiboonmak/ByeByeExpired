import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { BottomSheet } from "react-native-elements";
import NearlyExpired from "./NearlyExpired";
import Expired from "./Expired";
import AddProductScreen from "./AddProduct";

// ตัวอย่างข้อมูลที่เก็บรายการอาหาร
const fridgeItems = ["Cheese", "Butter", "Yogurt"];
const freezerItems = ["Ice cream", "Frozen peas", "Frozen pizza"];
const dryFoodItems = ["Pasta", "Rice", "Cereal"];

const storage = [
  { name: "Fridge", count: fridgeItems.length, image: require("../assets/images/fridge.png"), screen: "StorageFridge" },
  { name: "Freezer", count: freezerItems.length, image: require("../assets/images/freezer.png"), screen: "StorageFreezer" },
  { name: "Dry food", count: dryFoodItems.length, image: require("../assets/images/dryFood.png"), screen: "StorageDryFood" },
];

export default function App() {
  const [currentDate, setCurrentDate] = useState("");
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-GB").replace(/\//g, "-");
    setCurrentDate(formattedDate);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#F7F6FB", padding: 20 }}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.dateContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require("../assets/images/calendar icon.png")} style={styles.iconImage} />
          </TouchableOpacity>

          <View style={styles.dateBox}>
            <Text style={styles.dateText}>{currentDate}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.iconButton}>
          <Image source={require("../assets/images/exit.png")} style={styles.exitIcon} />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView>
        {/* Nearly Expired */}
        <View style={styles.section}>
          <LinearGradient colors={["#FEC2D6", "#FEE5E1"]} style={styles.gradientBox}>
            <View style={styles.sectionHeader}>
              <Image source={require("../assets/images/N.png")} style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>Nearly expired</Text>
            </View>
          </LinearGradient>
          <ScrollView horizontal>
            <NearlyExpired />
          </ScrollView>
        </View>

        {/* Expired */}
        <View style={styles.section}>
          <LinearGradient colors={["#EBDC9E", "#FFF2D6"]} style={styles.gradientBox}>
            <View style={styles.sectionHeader}>
              <Image source={require("../assets/images/E.png")} style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>Expired</Text>
            </View>
          </LinearGradient>
          <ScrollView horizontal>
            <Expired />
          </ScrollView>
        </View>

        {/* Storage */}
        <View style={styles.section}>
          <LinearGradient colors={["#BBE9FF", "#E1FCFE"]} style={styles.gradientBox}>
            <View style={styles.sectionHeader}>
              <Image source={require("../assets/images/S.png")} style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>Storage</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Storage List */}
        <View style={{ margin: 10 }}>
          <Card style={styles.cardContainer}>
            {storage.map((item, idx) => (
              <TouchableOpacity key={idx} onPress={() => navigation.navigate(item.screen)}>
                <View style={styles.storageItem}>
                  <Image source={item.image} style={styles.storageImage} />
                  <Text style={styles.storageText}>{item.name}</Text>
                  <View style={styles.itemCount}>
                    <Text style={styles.itemCountText}>{item.count}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </Card>
        </View>
      </ScrollView>

      {/* Add Product Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => setBottomSheetVisible(true)}>
        <MaterialIcons name="add" size={35} color="#FFF" />
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <BottomSheet isVisible={isBottomSheetVisible} onBackdropPress={() => setBottomSheetVisible(false)}>
        <View style={styles.sheetContainer}>
          <AddProductScreen onClose={() => setBottomSheetVisible(false)} />
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20, marginTop: 5 },
  dateContainer: { flexDirection: "row", alignItems: "center" },
  iconButton: { backgroundColor: "#4D5A9C", borderRadius: 50, padding: 8, width: 35, height: 35, justifyContent: "center", alignItems: "center", elevation: 4 },
  iconImage: { width: 30, height: 30 },
  exitIcon: { width: 35, height: 35 },
  dateBox: { backgroundColor: "white", borderRadius: 50, paddingHorizontal: 12, paddingVertical: 6, marginLeft: 10, elevation: 4 },
  dateText: { fontSize: 16, fontWeight: "bold", color: "#4D5A9C" },
  section: { marginVertical: 10, marginTop: 20 },
  gradientBox: { padding: 8, borderRadius: 30 },
  sectionHeader: { flexDirection: "row", alignItems: "center" },
  sectionIcon: { width: 25, height: 25, marginRight: 8 },
  sectionTitle: { fontWeight: "bold", fontSize: 16 },
  cardContainer: { padding: 1, borderRadius: 30, overflow: "hidden" },
  storageItem: { flexDirection: "row", alignItems: "center", padding: 10, borderBottomWidth: 1, borderBottomColor: "#E0E0E0" },
  storageImage: { width: 55, height: 55, marginRight: 10 },
  storageText: { fontSize: 16, fontWeight: "normal", flex: 1 },
  itemCount: { backgroundColor: "#6C74FF", borderRadius: 50, width: 20, height: 20, marginRight: 20, justifyContent: "center", alignItems: "center" },
  itemCountText: { color: "white", fontWeight: "normal", fontSize: 12 },
  addButton: { position: "absolute", bottom: 50, alignSelf: "center", backgroundColor: "#6C74FF", borderRadius: 50, padding: 8 },
  sheetContainer: { backgroundColor: "#fff", padding: 20, height: "90%" },
});
