import React, { useState } from "react";
import { 
  View, Text, Image, TouchableOpacity, 
  StyleSheet, ImageBackground, Dimensions, TextInput, 
  TouchableWithoutFeedback, Keyboard 
} from "react-native";

const { width } = Dimensions.get("window");

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState("Ebola Coronana");
  const [isEditing, setIsEditing] = useState(false);

  // สลับโหมดแก้ไขชื่อ
  const handleEditName = () => {
    setIsEditing(true);
  };

  // ยืนยันการเปลี่ยนชื่อและปิดโหมดแก้ไข
  const handleOutsidePress = () => {
    if (isEditing) {
      setIsEditing(false);
      Keyboard.dismiss(); // ซ่อนคีย์บอร์ด
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <ImageBackground 
        source={require("../assets/images/background profile.png")} 
        style={styles.background}
      >
        <Image 
          source={require("../assets/images/ground profile.png")} 
          style={styles.profileBackground} 
        />

        <View style={styles.myProfileContainer}>
          <Text style={styles.myProfileText}>My Profile</Text>
        </View>

        <TouchableOpacity 
          style={styles.topRightButton} 
          onPress={() => navigation.navigate("Overview")}
        >
          <Image 
            source={require("../assets/images/home.png")} 
            style={styles.topRightIcon} 
          />
        </TouchableOpacity>

        <View style={styles.profileContainer}>
          <Image 
            source={require("../assets/images/profile11.png")} 
            style={styles.profileImage} 
          />

          <View style={styles.nameContainer}>
            {isEditing ? (
              <TextInput
                style={styles.profileName}
                value={name}
                onChangeText={setName}
                autoFocus
              />
            ) : (
              <Text style={styles.profileName}>{name}</Text>
            )}

            <TouchableOpacity onPress={handleEditName} style={styles.editButton}>
              <Image 
                source={require("../assets/images/Pen3.png")}
                style={styles.editIcon} 
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.profileEmail}>ebolacoronana@gmail.com</Text>
        </View>

        <TouchableOpacity 
          style={styles.LogOutButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </ImageBackground>
    </TouchableWithoutFeedback>
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
    top: 120,
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
    top: width * 0.2,
    width: "85%",
    alignItems: "center",
    padding: 20,
  },
  profileImage: {
    width: 135,
    height: 120,
    borderRadius: 60,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  profileName: {
    fontSize: 22,
    left: 20,
    fontWeight: "bold",
    color: "#6D3B76",
  },
  editButton: {
    padding: -4,
  },
  editIcon: {
    left: 25,
    width: 22,
    height: 20,
    resizeMode: "contain",
  },
  profileEmail: {
    fontSize: 14,
    left: 9,
    color: "#666",
    marginTop: 6,
  },
  LogOutButton: {
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