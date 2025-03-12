import React from "react";
import { 
  View, Text, Image, TouchableOpacity, 
  StyleSheet, ImageBackground, Dimensions 
} from "react-native";

const { width } = Dimensions.get("window"); // ดึงขนาดหน้าจอเพื่อปรับภาพให้เหมาะสม

const ProfileScreen = ({ navigation }) => {
  return (
    <ImageBackground source={require("../assets/images/background.jpg")} style={styles.background}>
      
      {/* ภาพพื้นหลังของโปรไฟล์ */}
      <Image source={require("../assets/images/background.jpg")} style={styles.profileBackground} />

      {/* คำว่า My Profile พร้อมพื้นหลัง */}
      <View style={styles.myProfileContainer}>
        <Text style={styles.myProfileText}>My Profile</Text>
      </View>

      {/* ปุ่ม Home (ไปยังหน้า Overview) */}
      <TouchableOpacity 
        style={styles.topRightButton} 
        onPress={() => navigation.navigate("Overview")}
      >
        <Image source={require("../assets/images/background.jpg")} style={styles.topRightIcon} />
      </TouchableOpacity>

      {/* กรอบโปรไฟล์ */}
      <View style={styles.profileContainer}>
        <Image source={require("../assets/images/background.jpg")} style={styles.profileImage} />
        <Text style={styles.profileName}>Ebola Coronana</Text>
        <Text style={styles.profileEmail}>ebolacoronana@gmail.com</Text>
      </View>

      {/* ปุ่ม Sign Out (ไปยังหน้า Login) */}
      <TouchableOpacity 
        style={styles.signOutButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileBackground: {
    position: "absolute",
    top: 121,
    right: -5,
    width: width,
    height: width * 0.5,
    resizeMode: "contain",
  },
  myProfileContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#ffe9f2",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    
  },
  myProfileText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6a367a",
  },
  topRightButton: {
    position: "absolute",
    top: 40,
    right: 25,
    width: 46,  
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  topRightIcon: {
    width: 30,  
    height: 30,
    resizeMode: "contain",
  },
  profileContainer: {
    position: "absolute",
    top: width * 0.20,
    width: "85%",
    alignItems: "center",
    padding: 20,
  },
  profileImage: {
    width: 135,
    height: 120,
    borderRadius: 60,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6D3B76",
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  signOutButton: {
    position: "absolute",
    bottom: 30,
    right: 25,
    backgroundColor: "#ffe9f2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#6a367a",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;