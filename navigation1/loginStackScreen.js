import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LogInScreen from "../screens1/loginScreen.js";
import OtpScreen from "../screens1/OtpScreen.js";

const LoginStack = createStackNavigator();

function LogInStackScreen() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        options={{ headerShown: false }}
        name="logIn"
        component={LogInScreen}
      />
      <LoginStack.Screen name="OTP" component={OtpScreen} />
    </LoginStack.Navigator>
  );
}
export default LogInStackScreen;
