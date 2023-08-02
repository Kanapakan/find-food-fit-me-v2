import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, SignupScreen, SignupUserInfoScreen } from "./src/screens";
// import { TailwindProvider } from "tailwindcss-react-native"
import LoginScreen from "./src/screens/auth/LoginScreen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import BottomTabNavigator from "./src/navigations/BottomTabNavigator";
import { ROUTES } from "./src/constants";
import { Provider } from "react-redux";
import { store } from "./src/store";

const Stack = createNativeStackNavigator();

{
  /* <Stack.Navigator initialRouteName={BottomTabScreen}>
      <Stack.Screen name="LogIn" options={{ headerShown: false }} component={LogIn} />
      <Stack.Screen name="Signup" options={{ headerShown: false }} component={Signup} />
      <Stack.Screen name="SignupUserDetail" options={{ headerShown: false }} component={SignupUserDetail} />
      <Stack.Screen name="BottomTabScreen" options={{ headerShown: false }} component={BottomTabScreen} />
  </Stack.Navigator> */
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
              component={LoginScreen}
            />
            <Stack.Screen name="Signup" options={{ headerShown: false }} component={SignupScreen} />
            <Stack.Screen name="Signup User Info" options={{ headerShown: false }} component={SignupUserInfoScreen} />
            <Stack.Screen
              name={ROUTES.BOTTOM_TAB}
              options={{ headerShown: false }}
              component={BottomTabNavigator}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
