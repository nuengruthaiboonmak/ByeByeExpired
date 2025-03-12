import React from "react";
import { View, Text, Button } from "react-native";

const NearlyExpiredScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hello World - Nearly Expired</Text>
      <Button title="Go to Overview" onPress={() => navigation.navigate("Overview")} />
    </View>
  );
};

export default NearlyExpiredScreen;
