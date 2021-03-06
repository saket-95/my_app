import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, Button } from "react-native";
import { ScreenStack } from "react-native-screens";

import { AuthContext } from "../components1/context";

const ProfileScreen = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>"Profile Screen"</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
      <Button title="SignOut" onPress={() => signOut()} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
