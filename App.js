import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Amplify, { Auth, Hub, Logger } from "aws-amplify";

import HomeStackScreen from "./navigation1/homeStackScreen.js";
import ProfileStackScreen from "./navigation1/profileStackScreen.js";
import CartStackScreen from "./navigation1/CartStackScreen";
import LoginScreen from "./screens1/loginScreen.js";
import OtpScreen from "./screens1/OtpScreen.js";
import SignupScreen from "./screens1/signupScreen.js";

import { AuthContext } from "./components1/context";

const Tab = createBottomTabNavigator();
const AuthTab = createBottomTabNavigator();

Amplify.configure({
  Auth: {
    userPoolId: "us-east-2_X2PEdOx6k",
    userPoolWebClientId: "5f14fu1ec3in8md823gj1366fe",
    authenticationFlowType: "CUSTOM_AUTH",
  },
});

export default function App() {
  const [data, setData] = React.useState({
    username: null,
  });

  const authContext = React.useMemo(
    () => ({
      signIn: async (credential) => {
        await Auth.signIn(`+91${credential.phone_no}`)
          .then((signInUser) => {
            console.log("SignIn Response: ", signInUser);
            setData({ username: signInUser });
            // this.toppopup.instance.show();
          })
          .catch((error) => {
            console.log("SignIn Error: ", error);
          });
      },
      authenticate: async (credential) => {
        console.log("sending param 1", data.username);
        console.log("sending param 2", credential.signInCode);
        Auth.sendCustomChallengeAnswer(data.username, credential.signInCode)
          .then((response) => {
            console.log("Authenticate Response: ", response);
          })
          .catch((error) => {
            console.log("Challenge Error", error);
          });
      },
      signUp: async (credential) => {
        Auth.signUp({
          username: `+91${credential.phone_no}`,
          password: Date.now().toString(),
        })
          .then((signup) => {
            console.log("SignUp Response: ", signup);
            //this.showSnackbar(`Awesome! Signup was Success `, "success");
          })
          .catch((error) => {
            console.log("SignUp Error: ", error);
            //this.showSnackbar(`Something went wrong! `, "danger");
          });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {false ? (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Home") {
                  iconName = focused
                    ? "ios-information-circle"
                    : "ios-information-circle-outline";
                } else if (route.name === "Profile") {
                  iconName = focused ? "ios-list-box" : "ios-list";
                } else if (route.name === "Cart") {
                  iconName = focused ? "ios-list-box" : "ios-list";
                }
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: "tomato",
              inactiveTintColor: "gray",
            }}
          >
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Profile" component={ProfileStackScreen} />
          </Tab.Navigator>
        ) : (
          <AuthTab.Navigator>
            {data.username === null ? (
              <AuthTab.Screen name="Login" component={LoginScreen} />
            ) : (
              <AuthTab.Screen name="Login" component={OtpScreen} />
            )}

            <AuthTab.Screen name="Signup" component={SignupScreen} />
          </AuthTab.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
