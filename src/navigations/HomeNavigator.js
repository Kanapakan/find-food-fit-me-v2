import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { BookmarkScreen, HomeScreen } from "../screens";
import { ROUTES } from "../constants";

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#E4EFE3" },
        headerTintColor: "#547F53",
      }}
    >
      {/* <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} /> */}
      <Stack.Screen
        name={ROUTES.HOME}
        options={{ headerShown: false }}
        component={HomeScreen}
      />
      {/* <Stack.Screen
        name="ThreeTimeMeals"
        component={ThreeTimeMeals}
        options={({ route }) => ({
          title: route.params.mealTimeThai,
        })}
      />
      <Stack.Screen
        name="MenuDetail"
        options={{
          headerShown: false,
        }}
        component={MenuDetail}
      /> */}
    </Stack.Navigator>
  );
};

export default HomeNavigator;
