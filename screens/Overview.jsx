import React from "react";
import { View, Text, Button } from "react-native";

const OverviewScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hello World - Overview</Text>
      <Button title="Go to Add Product" onPress={() => navigation.navigate("AddProduct")} />
    </View>
  );
};

export default OverviewScreen;
