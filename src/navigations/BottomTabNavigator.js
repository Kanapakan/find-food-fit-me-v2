import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { COLORS, ROUTES } from "../constants";
import HomeNavigator from "./HomeNavigator";
import SearchNavigator from "./SearchNavigator";
import BookmarkNavigator from './BookmarkNavigator';
import ProfileNavigator from "./ProfileNavigator";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import CustomTabBar from "../components/CustomTabBar";

const Tab = createBottomTabNavigator();

const customTabBarStyle = {
	activeTintColor: '#ffffff', //เปลี่ยนเป็นสีเขียวตามงานเรา
	inactiveTintColor: '#bdbdbd',
	keyboardHidesTabBar: true,
	showLabel: false,
	
}

const BottomTabNavigator = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator 
      // tabBarOptions={customTabBarStyle}
			tabBar={props => <CustomTabBar {...props} />}
      shifting="false" 
			screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: COLORS.green,
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: COLORS.darkGreen,
        // tabBarIcon: ({color, size, focused}) => {
        //   let iconName;

        //   if (route.name === ROUTES.HOME_TAB) {
        //     iconName = focused ? 'ios-home-sharp' : 'ios-home-outline';
        //   } else if (route.name === ROUTES.SETTINGS_NAVIGATOR) {
        //     iconName = focused ? 'settings' : 'settings-outline';
        //   } else if (route.name === ROUTES.WALLET) {
        //     iconName = focused ? 'wallet' : 'wallet-outline';
        //   } else if (route.name === ROUTES.NOTIFICATIONS) {
        //     iconName = focused
        //       ? 'md-notifications-sharp'
        //       : 'md-notifications-outline';
        //   }

        //   return <Icon name={iconName} size={22} color={color} />;
        // },
      })}
			>
        <Tab.Screen name={ROUTES.HOME_TAB} component={HomeNavigator}
          options={{
            tabBarActiveBackgroundColor: "#8EC18D",
            
            tabBarIcon: ({ color}) => {
              return <Entypo name="home" size={28} color={color} />;
            },
          }} 
					/>
        <Tab.Screen name={ROUTES.SEARCH_RECIPES_TAB} component={SearchNavigator}
          options={{
            tabBarActiveBackgroundColor: "#8EC18D",
            tabBarLabel: '',
            tabBarIcon: ({ color}) => {
              return <AntDesign name="search1" size={28} color={color} />;
            },
          }} />
          {/* <Tab.Screen name="AddMenu" component={AddMenuNavigator}
          options={{
            tabBarActiveBackgroundColor: "#8EC18D",
            tabBarLabel: '',
            tabBarIcon: ({ color}) => {
              return <AntDesign name="pluscircle" size={35} color={color} />;
            },
          }} /> */}
        <Tab.Screen name={ROUTES.BOOKMARK_TAB} component={BookmarkNavigator}
          options={{
            tabBarActiveBackgroundColor: "#8EC18D",
            tabBarLabel: '',
            tabBarIcon: ({ color}) => {
              return <FontAwesome name="bookmark" size={28} color={color} />
            },
          }} />
        <Tab.Screen name={ROUTES.PROFILE_TAB} component={ProfileNavigator}
          options={{
            tabBarActiveBackgroundColor: "#8EC18D",
            tabBarLabel: '',
            tabBarIcon: ({ color}) => {
              return <FontAwesome name="user" size={28} color={color} />;
            },
          }} />
      </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: COLORS.transparent,
    borderTopWidth: 0,
    bottom: 15,
    right: 10,
    left: 10,
    height: 92,
  },
});

