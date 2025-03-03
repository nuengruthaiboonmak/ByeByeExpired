import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

import { LinearGradient } from "expo-linear-gradient";


const LoginScreen = ({ navigation }) => {

  return (
    <LinearGradient colors={["#E8A0F1", "#FAD0EC"]} style={styles.container}>
      <Text style={styles.title}>ByeByeExpired</Text>
      <Text style={styles.subtitle}>
        <Text style={{ fontWeight: "bold" }}>Never waste food again! </Text>
        Our app reminds you of expiration dates and helps you manage your food,
        ensuring you use your ingredients before they go bad!
      </Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Email address</Text>
        <TextInput style={styles.input} keyboardType="email-address" />
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Overview")}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Don’t have an account yet? <Text style={styles.signUpText}>Sign Up</Text>
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "serif",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#fff",
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
    color: "#444",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    backgroundColor: "#C084FC",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 15,
    textAlign: "center",
    color: "#666",
  },
  signUpText: {
    color: "#C084FC",
    fontWeight: "bold",
  },
})

export default LoginScreen;