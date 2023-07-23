import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ROUTES } from "../constants";
import {LoginScreen, SignupScreen, SignupUserInfoScreen} from '../screens';
const Stack = createStackNavigator();

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
    </Stack.Navigator>
  );
};

export default AuthNavigator;
