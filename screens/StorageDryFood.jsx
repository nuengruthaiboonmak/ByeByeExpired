import React from "react";
import { View, Text, Button } from "react-native";

const StorageFridgeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hello World - Storage Dry Food</Text>
      <Button title="Go to Overview" onPress={() => navigation.navigate("Overview")} />
    </View>
  );
};

export default StorageFridgeScreen;
