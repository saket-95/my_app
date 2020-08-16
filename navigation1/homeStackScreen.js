import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens1/homeScreen.js";
import MenuScreen from "../screens1/menuScreen.js";

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
      <HomeStack.Screen
        name="Details"
        component={MenuScreen}
        options={({ route }) => ({
          title: route.params.name,
          subtitle: route.params.phone,
        })}
      />
    </HomeStack.Navigator>
  );
}
export default HomeStackScreen;
