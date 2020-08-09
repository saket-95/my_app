import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import ProfileScreen from "../screens/profileScreen.js";
import DetailsScreen from "../screens/detailsScreen.js";

const SettingsStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Profile" component={ProfileScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}

export default ProfileStackScreen;
