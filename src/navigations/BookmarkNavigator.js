import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { BookmarkScreen } from "../screens";
import { ROUTES } from "../constants";

const Stack = createNativeStackNavigator();

const BookmarkNavigator = () => {
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
        name={ROUTES.BOOKMARK}
        options={{ title: "Bookmark" }}
        component={BookmarkScreen}
      />
      {/* <Stack.Screen
        name="MenuDetail"
        options={{
          headerShown: false,
        }}
        component={MenuDetail}
      /> */}
    </Stack.Navigator>
  );
};

export default BookmarkNavigator;
