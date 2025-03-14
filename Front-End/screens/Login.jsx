import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from "react-native";

const LoginScreen = ({ navigation }) => {
  // ใช้ useState เพื่อจัดการค่าของอีเมลและรหัสผ่าน
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ฟังก์ชันเพื่อจัดการการเข้าสู่ระบบ
  const handleLogin = async () => {
    // ตรวจสอบว่าอีเมลและรหัสผ่านถูกกรอกหรือยัง
    if (!email || !password) {
      Alert.alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    // สร้างข้อมูลสำหรับส่งไปที่ API
    const loginData = {
      email: email,
      password: password,
    };

    try {
      // ส่งข้อมูลเข้าสู่ระบบไปยัง API
      const response = await fetch("https://bug-free-telegram-x5597wr5w69gc9qr9-5001.app.github.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.status === 200) {
        // หากเข้าสู่ระบบสำเร็จ นำทางไปที่หน้า Overview
        navigation.navigate("Overview", { items: data.items });
      } else {
        // หากเกิดข้อผิดพลาดแสดงข้อความ
        const errorMessage = data.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ";
        Alert.alert(errorMessage);
      }
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
    }
  };

  return (
    <ImageBackground source={require("../assets/images/background.jpg")} style={styles.container}>
      <Text style={styles.firstSubtitle}>
        <Text style={{ fontWeight: "bold", color: "#6c9de8" }}>Never waste food again! </Text>
        Our app reminds you of expiration dates and helps you manage your food,
        ensuring you use your ingredients before they go bad!
      </Text>
      <Text style={styles.subtitle}>________________________________________</Text>
      <Text style={styles.title}>Log In</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Email address</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail} // อัปเดตค่าของอีเมลเมื่อผู้ใช้พิมพ์
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword} // อัปเดตค่าของรหัสผ่านเมื่อผู้ใช้พิมพ์
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Don’t have an account yet?{" "}
          <Text
            style={styles.signUpText}
            onPress={() => navigation.navigate("Register")}
          >
            Create an account
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    color: "#aa64aa",
    fontWeight: "600",
    marginBottom: 10,
  },
  firstSubtitle: {
    fontSize: 16,
    textAlign: "left",
    color: "#d59ac5",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "left",
    color: "#d59ac5",
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    borderRadius: 15,
  },
  label: {
    fontSize: 14,
    color: "#a64ca6",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#f1d4e4",
  },
  button: {
    backgroundColor: "#ffe9f2",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginTop: 30,
  },
  buttonText: {
    color: "#6a367a",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 15,
    textAlign: "center",
    color: "#6a367a",
  },
  signUpText: {
    color: "#e81b7e",
    fontWeight: "bold",
  },
});

export default LoginScreen;