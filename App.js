import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SupplierHome from "./screens/SupplierHome";
import CustomerHome from "./screens/CustomerHome";
import SplashScreen from "./screens/SplashScreen";
import OrderPage from "./screens/OrederPage";
import OrderDetailsPage from "./screens/OrderDetailsPage";

import QR from "./screens/QR";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SplashScreen" component={SplashScreen}/>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="QR" component={QR} />
        <Stack.Screen name="SupplierHome" component={SupplierHome}/>
        <Stack.Screen name="CustomerHome" component={CustomerHome}/>
        <Stack.Screen name="Orders" component={OrderPage}/>
        <Stack.Screen name="OrderDetails" component={OrderDetailsPage}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}