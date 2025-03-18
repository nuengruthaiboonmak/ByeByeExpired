import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert,KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserID } from '../utils/storage';  // ตรวจสอบเส้นทางให้ถูกต้อง

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both fields");
      return;
    }
  
    const loginData = { email, password };
  
    try {
      const response = await fetch('https://cuddly-space-lamp-jj4jqr7jvg5q2qvpg-5000.app.github.dev/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        console.log("Error Response:", errorMessage);
        Alert.alert("Error", `Login failed: ${errorMessage}`);
        return;
      }
  
      const data = await response.json();
  
      console.log("Response data:", data);
      console.log("User Object:", data.user);
  
      if (data.message === "Login successful" && data.user) {
        const userId = data.user.user_id;
  
        if (userId) {
          await AsyncStorage.setItem('user_id', userId.toString());
          console.log("Logged in user_id:", userId);
          Alert.alert("Success", `Login successful! Your User ID: ${userId}`);
          navigation.navigate("Overview");
        } else {
          console.log("No user_id received from the server.");
          Alert.alert("Error", "No user ID received. Please try again.");
        }
      } else {
        Alert.alert("Error", "Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("Error", "An error occurred. Please try again later.");
    }
  };

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  // ฟังก์ชันเมื่อคีย์บอร์ดแสดง
  const handleKeyboardShow = (event) => {
    setIsKeyboardVisible(true);
  };

  // ฟังก์ชันเมื่อคีย์บอร์ดซ่อน
  const handleKeyboardHide = (event) => {
    setIsKeyboardVisible(false);
  };

  // ใช้ useEffect เพื่อเพิ่มและลบ event listeners
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", handleKeyboardShow);
    const hideSubscription = Keyboard.addListener("keyboardDidHide", handleKeyboardHide);

    // ลบ listeners เมื่อ component unmount
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined} 
      keyboardVerticalOffset={100}
>

    <ImageBackground source={require("../assets/images/background.jpg")} style={styles.container}>
      <Text style={styles.firstSubtitle}>
        <Text style={{ fontWeight: "bold", color: "#6c9de8" }}>Never waste food again! </Text>
        Our app reminds you of expiration dates and helps you manage your food,
        ensuring you use your ingredients before they go bad!
      </Text>
      <Text style={styles.subtitle}>_____________________________________</Text>
      <Text style={styles.title}>Log In</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Email address</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
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
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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