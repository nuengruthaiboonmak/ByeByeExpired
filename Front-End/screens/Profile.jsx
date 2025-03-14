import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, 
  StyleSheet, ImageBackground, Dimensions, TextInput, 
  TouchableWithoutFeedback, Keyboard 
} from "react-native";

// รับขนาดความกว้างของหน้าจอเพื่อการออกแบบที่ตอบสนองต่อขนาดหน้าจอ
const { width } = Dimensions.get("window");

const ProfileScreen = ({ navigation }) => {
  // สถานะการเก็บข้อมูลชื่อและสถานะการแก้ไข
  const [name, setName] = useState("Ebola Coronana");
  const [isEditing, setIsEditing] = useState(false);

  // ฟังก์ชันที่ใช้เพื่อเปิดโหมดการแก้ไขชื่อ
  const handleEditName = () => {
    setIsEditing(true);
  };

  // ฟังก์ชันที่ใช้เมื่อคลิกนอก TextInput จะปิดโหมดการแก้ไขและซ่อนคีย์บอร์ด
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
        {/* แสดงภาพพื้นหลังโปรไฟล์ */}
        <Image 
          source={require("../assets/images/ground profile.png")} 
          style={styles.profileBackground} 
        />

        {/* แสดงข้อความ "My Profile" */}
        <View style={styles.myProfileContainer}>
          <Text style={styles.myProfileText}>My Profile</Text>
        </View>

        {/* ปุ่มไปที่หน้าสรุปข้อมูล (Overview) */}
        <TouchableOpacity 
          style={styles.topRightButton} 
          onPress={() => navigation.navigate("Overview")}
        >
          <Image 
            source={require("../assets/images/home.png")} 
            style={styles.topRightIcon} 
          />
        </TouchableOpacity>

        {/* ข้อมูลโปรไฟล์ของผู้ใช้ */}
        <View style={styles.profileContainer}>
          {/* แสดงรูปโปรไฟล์ของผู้ใช้ */}
          <Image 
            source={require("../assets/images/profile11.png")} 
            style={styles.profileImage} 
          />

          <View style={styles.nameContainer}>
            {/* หากอยู่ในโหมดการแก้ไขจะแสดงเป็น TextInput, ถ้าไม่จะแสดงเป็น Text ธรรมดา */}
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

            {/* ปุ่มสำหรับเปิดโหมดการแก้ไขชื่อ */}
            <TouchableOpacity onPress={handleEditName} style={styles.editButton}>
              <Image 
                source={require("../assets/images/Pen3.png")}
                style={styles.editIcon} 
              />
            </TouchableOpacity>
          </View>

          {/* แสดงอีเมลของผู้ใช้ */}
          <Text style={styles.profileEmail}>ebolacoronana@gmail.com</Text>
        </View>

        {/* ปุ่มสำหรับออกจากระบบ (Log Out) */}
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
  // กำหนดสไตล์สำหรับพื้นหลังของหน้าจอ
  background: {
    flex: 1, // ใช้ให้พื้นหลังขยายเต็มหน้าจอ
    alignItems: "center", // จัดตำแหน่งแนวนอนที่กลาง
    justifyContent: "center", // จัดตำแหน่งแนวตั้งที่กลาง
  },
  // กำหนดสไตล์สำหรับภาพพื้นหลังโปรไฟล์
  profileBackground: {
    position: "absolute", // ตั้งตำแหน่งแบบสัมพัทธ์
    top: 120, // ระยะห่างจากด้านบนของหน้าจอ
    right: -5, // ระยะห่างจากด้านขวาของหน้าจอ
    width: width, // กำหนดความกว้างของภาพตามขนาดหน้าจอ
    height: width * 0.5, // ความสูงเป็นครึ่งหนึ่งของความกว้างของหน้าจอ
    resizeMode: "contain", // ปรับขนาดภาพให้พอดีกับพื้นที่
  },
  // กำหนดสไตล์สำหรับกล่องแสดงข้อความ "My Profile"
  myProfileContainer: {
    position: "absolute",
    top: 40, 
    left: 20, // ระยะห่างจากด้านซ้ายของหน้าจอ
    backgroundColor: "#ffe9f2", // สีพื้นหลัง
    paddingVertical: 8, // เว้นช่องว่างด้านบนและล่าง
    paddingHorizontal: 15, // เว้นช่องว่างด้านซ้ายและขวา
    borderRadius: 10, // มุมโค้ง
  },
  // กำหนดสไตล์สำหรับข้อความ "My Profile"
  myProfileText: {
    fontSize: 16, // ขนาดตัวอักษร
    fontWeight: "bold", // ตัวอักษรหนา
    color: "#6a367a", // สีของข้อความ
  },
  // กำหนดสไตล์สำหรับปุ่มที่มุมขวาบน
  topRightButton: {
    position: "absolute", 
    top: 40, 
    right: 25,
    width: 46, // กำหนดความกว้างของปุ่ม
    height: 40, // กำหนดความสูงของปุ่ม
    justifyContent: "center", // จัดตำแหน่งปุ่มในแนวตั้ง
    alignItems: "center", // จัดตำแหน่งปุ่มในแนวนอน
  },
  // กำหนดสไตล์สำหรับไอคอนในปุ่มขวาบน
  topRightIcon: {
    width: 30, // กำหนดความกว้างของไอคอน
    height: 30, // กำหนดความสูงของไอคอน
    resizeMode: "contain", // ปรับขนาดไอคอนให้พอดีกับพื้นที่
  },
  // กำหนดสไตล์สำหรับกล่องโปรไฟล์
  profileContainer: {
    position: "absolute", 
    top: width * 0.2, 
    width: "85%", // กำหนดความกว้างเป็น 85% ของหน้าจอ
    alignItems: "center", // จัดตำแหน่งแนวนอนที่กลาง
    padding: 20, // เว้นช่องว่างรอบๆ กล่องโปรไฟล์
  },
  // กำหนดสไตล์สำหรับรูปโปรไฟล์
  profileImage: {
    width: 135, // กำหนดความกว้างของรูปภาพ
    height: 120, // กำหนดความสูงของรูปภาพ
    borderRadius: 60, // ทำให้รูปภาพมีมุมโค้งกลม
  },
  // กำหนดสไตล์สำหรับชื่อโปรไฟล์
  nameContainer: {
    flexDirection: "row", // จัดตำแหน่งภายในเป็นแนวนอน
    alignItems: "center",
    marginTop: 16, // เว้นช่องว่างด้านบนจากชื่อ
  },
  // กำหนดสไตล์สำหรับชื่อโปรไฟล์
  profileName: {
    fontSize: 22,
    left: 20, // ระยะห่างจากด้านซ้าย
    fontWeight: "bold",
    color: "#6D3B76",
  },
  // กำหนดสไตล์สำหรับปุ่มแก้ไขชื่อ
  editButton: {
    padding: -4, // ลดขนาดช่องว่างภายในปุ่ม
  },
  // กำหนดสไตล์สำหรับไอคอนปากกาในปุ่มแก้ไข
  editIcon: {
    left: 25, // ระยะห่างจากด้านซ้าย
    width: 22, // กำหนดความกว้างของไอคอน
    height: 20, // กำหนดความสูงของไอคอน
    resizeMode: "contain",
  },
  // กำหนดสไตล์สำหรับอีเมลในโปรไฟล์
  profileEmail: {
    fontSize: 14,
    left: 9, // ระยะห่างจากด้านซ้าย
    color: "#666",
    marginTop: 6, // เว้นช่องว่างด้านบนจากอีเมล
  },
  // กำหนดสไตล์สำหรับปุ่ม Log Out
  LogOutButton: {
    position: "absolute",
    bottom: 30, // ระยะห่างจากด้านล่างของหน้าจอ
    right: 25,
    backgroundColor: "#ffe9f2", // สีพื้นหลังของปุ่ม
    paddingVertical: 10, // เว้นช่องว่างด้านบนและล่างภายในปุ่ม
    paddingHorizontal: 20, // เว้นช่องว่างด้านซ้ายและขวาภายในปุ่ม
    borderRadius: 15, // มุมโค้งของปุ่ม
    shadowColor: "#000", // สีเงาของปุ่ม
    shadowOffset: { width: 0, height: 4 }, // ระยะห่างของเงา
    shadowOpacity: 0.3, // ความทึบของเงา
    shadowRadius: 4, // ความเบลอของเงา
  },
  // กำหนดสไตล์สำหรับข้อความในปุ่ม Log Out
  buttonText: {
    color: "#6a367a",
    fontSize: 16, // ขนาดตัวอักษร
    fontWeight: "bold",
  },
});

export default ProfileScreen;

