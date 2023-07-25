import { View, Text } from "react-native";
import React from "react";
import { ROUTES } from "../constants";
import {LoginScreen, SignupScreen, SignupUserInfoScreen} from '../screens';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen
          name={ROUTES.LOGIN}
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen name={ROUTES.SIGNUP} options={{ headerShown: false }} component={SignupScreen} /> 
        <Stack.Screen name={ROUTES.SIGNUP_USER_INFO} options={{ headerShown: false }} component={SignupUserInfoScreen} />
        <Stack.Screen
            name={ROUTES.BOTTOM_TAB}
            options={{ headerShown: false }}
            component={BottomTabNavigator}
          />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
