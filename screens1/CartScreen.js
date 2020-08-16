import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Button, StyleSheet } from "react-native";
import { ScreenStack } from "react-native-screens";
import BasketComponent from "../components1/BasketComponent";
import ItemsContainer from "../components1/ItemsContainer";

const CartScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ItemsContainer />
      <BasketComponent />

      <Button
        style={styles.buttoncontainer}
        color="red"
        marginTop="300"
        title="CheckOut"
        onPress={() => navigation.navigate("CheckOut")}
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginLeft: 0,
  },
  buttoncontainer: {
    position: "absolute",
    top: 50,
    justifyContent: "flex-end",
  },
});
