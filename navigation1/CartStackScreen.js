import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CartScreen from "../screens1/CartScreen.js";
import CheckOutScreen from "../screens1/checkoutScreen.js";

const CartStack = createStackNavigator();

function CartStackScreen() {
  return (
    <CartStack.Navigator>
      <CartStack.Screen name="Cart" component={CartScreen} />
      <CartStack.Screen name="CheckOut" component={CheckOutScreen} />
    </CartStack.Navigator>
  );
}
export default CartStackScreen;
