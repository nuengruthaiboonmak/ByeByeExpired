import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";

const RegisterScreen = ({ navigation }) => {
  return (
    <ImageBackground source={require("../assets/images/background.jpg")} style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>Create account</Text>
        <Text style={styles.label}>Full name</Text>
        <TextInput style={styles.input} />
        <Text style={styles.label}>Email address</Text>
        <TextInput style={styles.input} keyboardType="email-address" />
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} secureTextEntry />
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput style={styles.input} secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Overview")}> 
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
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
  backButton: {
    position: "absolute",
    top: 10,  
    left: 10, 
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 8,
    borderRadius: 15,
  },
  backButtonText: {
    fontSize: 14,
    color: "#6a367a", 
   
  },
  formContainer: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    borderRadius: 80,
    marginTop: 200,
    paddingBottom: 30,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: "#aa64aa",
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    color: "#a64ca6",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e8b4e8",
  },
  button: {
    backgroundColor: "#ffe9f2",//"#f5f5f5",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",//"#d9a9d9",
    shadowOffset: { width: 0, height: 4 },//{ width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginTop: 30,
  },
  buttonText: {
    color: "#6a367a",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RegisterScreen;