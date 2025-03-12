import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";

const LoginScreen = ({ navigation }) => {
  return (
    <ImageBackground source={require("../assets/images/background.jpg")} style={styles.container}>
      <Text style={styles.firstSubtitle}>
        <Text style={{ fontWeight: "bold",color: "#6c9de8"}}>Never waste food again! </Text>
        Our app reminds you of expiration dates and helps you manage your food,
        ensuring you use your ingredients before they go bad!
      </Text>
      <Text style={styles.subtitle}>________________________________________</Text>
      <Text style={styles.title}>Log In</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Email address</Text>
        <TextInput style={styles.input} keyboardType="email-address" />
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Overview")}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Don’t have an account yet? 
          <Text 
            style={styles.signUpText} 
            onPress={() => navigation.navigate("Register")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </ImageBackground>
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
    fontSize: 20,
    textAlign: "center",
    color: "#aa64aa",
    fontWeight: "600",
    marginBottom: 20,
  },
  firstSubtitle: {
    marginTop: 250, 
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
    color: "#d59ac5",
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
  },
  buttonText: {
    color: "#6a367a",
    fontSize: 16,
    fontWeight: "600",
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

