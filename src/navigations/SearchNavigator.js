import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { BookmarkScreen, HomeScreen, ProfileScreen, SearchScreen } from "../screens";
import { ROUTES } from "../constants";

const Stack = createNativeStackNavigator();

const SearchNavigator = () => {
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
        name={ROUTES.SEARCH_RECIPES}
        options={{ title: "ค้นหาเมนูอาหาร" }}
        component={SearchScreen}
      />
      {/* <Stack.Screen
        name="MenuDetail"
        options={{ headerShown: false }}
        component={MenuDetail}
      />
      <Stack.Screen
        name="ChooseIngredient"
        options={{ title: "เลือกวัตถุดิบ" }}
        component={ChooseIngredient}
      />
      <Stack.Screen
        name="ConfirmIngredient"
        options={{ title: "รายการวัตถุดิบที่เลือก" }}
        component={ConfirmIngredient}
      />
      <Stack.Screen
        name="ResultFindRecipe"
        options={{ title: "เมนูอาหารของคุณ" }}
        component={ResultFindRecipe}
      /> */}
    </Stack.Navigator>
  );
};

export default SearchNavigator;
