import React from "react";
import { View, Text, Button } from "react-native";

const AddProductScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hello World - Add Product</Text>
      <Button title="Go to Show Detail Product" onPress={() => navigation.navigate("ShowDetailProduct")} />
    </View>
  );
};

export default AddProductScreen;
