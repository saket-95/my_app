import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Amplify, { Auth, Hub, Logger } from "aws-amplify";

//main app screens
import HomeStackScreen from "./navigation1/homeStackScreen.js";
import ProfileStackScreen from "./navigation1/profileStackScreen.js";
import CartStackScreen from "./navigation1/CartStackScreen";

//authentication screens
import LoginScreen from "./screens1/loginScreen.js";
import OtpScreen from "./screens1/OtpScreen.js";
import SignupScreen from "./screens1/signupScreen.js";

import { AuthContext } from "./components1/context";
import awsconfig from "./aws-exports.js";

const HomeTab = createBottomTabNavigator();
const AuthTab = createBottomTabNavigator();

Amplify.configure(awsconfig);

export default function App() {
  const [data, setData] = React.useState({
    CognitoUser: null,
    isAuthenticated: false,
  });

  const authContext = React.useMemo(
    () => ({
      signIn: async (credential) => {
        await Auth.signIn(`+91${credential.phone_no}`)
          .then((signInUser) => {
            console.log("SignIn Response: ", signInUser);
            setData({ CognitoUser: signInUser, isAuthenticated: false });
          })
          .catch((error) => {
            console.log("SignIn Error: ", error);
          });
      },
      authenticate: async (credential) => {
        Auth.sendCustomChallengeAnswer(data.CognitoUser, credential.signInCode)
          .then((response) => {
            console.log("Authenticate Response: ", response);
          })
          .catch((error) => {
            console.log("Authenticate Error", error);
          });
      },
      signUp: async (credential) => {
        Auth.signUp({
          username: `+91${credential.phone_no}`,
          password: Date.now().toString(),
        })
          .then((signup) => {
            console.log("SignUp Response: ", signup);
          })
          .catch((error) => {
            console.log("SignUp Error: ", error);
          });
      },
      ComeBackFromOTP: async () => {
        setData({ CognitoUser: null, isAuthenticated: false });
      },
    }),
    [data]
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {data.isAuthenticated ? (
          <HomeTab.Navigator
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
            <HomeTab.Screen name="Home" component={HomeStackScreen} />
            <HomeTab.Screen name="Profile" component={ProfileStackScreen} />
          </HomeTab.Navigator>
        ) : (
          <AuthTab.Navigator>
            {data.CognitoUser === null ? (
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
