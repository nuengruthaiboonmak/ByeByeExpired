import React from "react";
import { View, Text, Button } from "react-native";

const ExpiredScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hello World - Expired</Text>
      <Button title="Go to Overview" onPress={() => navigation.navigate("Overview")} />
    </View>
  );
};

export default ExpiredScreen;
