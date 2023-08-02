import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { COLORS, ROUTES } from "../constants";
import HomeNavigator from "./HomeNavigator";
import SearchNavigator from "./SearchNavigator";
import BookmarkNavigator from "./BookmarkNavigator";
import ProfileNavigator from "./ProfileNavigator";
import Icon from "react-native-vector-icons/Ionicons";
import CreateNewRecipeNavigator from "./CreateNewRecipeNavigator";

const Tab = createBottomTabNavigator();


const BottomTabNavigator = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      shifting="false"
      screenOptions={({ route }) => ({
				headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: COLORS.lightGreen,
        tabBarInactiveTintColor: COLORS.green,
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: COLORS.darkGreen,
        tabBarIcon: ({ color, focused }) => {
          let iconName;

          if (route.name === ROUTES.HOME_TAB) {
            iconName = focused ? "home-sharp" : "home-outline";
          } else if (route.name === ROUTES.SEARCH_RECIPES_TAB) {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === ROUTES.CREATE_NEW_RECIPE_TAB) {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === ROUTES.BOOKMARK_TAB) {
            iconName = focused ? "bookmarks" : "bookmarks-outline";
          } else if (route.name === ROUTES.PROFILE_TAB) {
            iconName = focused ? "person-sharp" : "person-outline";
          }

          return <Icon name={iconName} size={route.name === ROUTES.CREATE_NEW_RECIPE_TAB ? 34 : 28} color={color} />;
        },
      })}
    >
      <Tab.Screen name={ROUTES.HOME_TAB} component={HomeNavigator} />
      <Tab.Screen
        name={ROUTES.SEARCH_RECIPES_TAB}
        component={SearchNavigator}
      />
      <Tab.Screen
        name={ROUTES.CREATE_NEW_RECIPE_TAB}
        component={CreateNewRecipeNavigator}
      />
      <Tab.Screen name={ROUTES.BOOKMARK_TAB} component={BookmarkNavigator} />
      <Tab.Screen name={ROUTES.PROFILE_TAB} component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    height: Platform.OS === 'ios' ? 90: 60,
  },
});
