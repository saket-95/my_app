import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const ShopTile = () => {
  return (
    <View style={styles.container}>
      <Text>"Tile"</Text>
    </View>
  );
};

export default ShopTile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
