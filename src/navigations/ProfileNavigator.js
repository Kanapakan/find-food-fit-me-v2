import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { BookmarkScreen, HomeScreen, ProfileScreen } from "../screens";
import { ROUTES } from "../constants";
import ChangeUserProfile from "../screens/home/ChangeUserProfile";

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown: false,
        headerStyle: { backgroundColor: "#E4EFE3" },
        headerTintColor: "#547F53",
        headerTitleStyle: {
          fontWeight: "bold",
          // fontSize:  "25px",
        },
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name={ROUTES.PROFILE}
        component={ProfileScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={ROUTES.CHANGE_USER_PROFILE}
        component={ChangeUserProfile}
      />
      {/* <Stack.Screen name="ChangeUserDetail" component={ChangeUserDetail} 
        options={{
          title: 'แก้ไขโปร์ไฟล์'
      }} /> */}
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
