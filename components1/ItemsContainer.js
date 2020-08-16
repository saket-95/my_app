import React, { Component } from "react";
import { View, Text } from "react-native";
import Item from "./Items.js";

const ItemsContainer = () => {
  return (
    <View style={styles.containterStyle}>
      <Text>"hiiiiiiiii"</Text>
      <Item />
    </View>
  );
};

const styles = {
  containterStyle: {
    flex: 4,
    backgroundColor: "#DCDCDC",
  },
};

export default ItemsContainer;
