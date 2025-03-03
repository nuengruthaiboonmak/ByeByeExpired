import React, { useEffect } from "react";
import { View, Text } from "react-native";

const LoadScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Login");
    }, 2000);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hello World - Load</Text>
    </View>
  );
};

export default LoadScreen;
