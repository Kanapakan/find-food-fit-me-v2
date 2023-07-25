import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, SignupScreen, SignupUserInfoScreen } from "./src/screens";
// import { TailwindProvider } from "tailwindcss-react-native"
import LoginScreen from "./src/screens/auth/LoginScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomTabNavigator from "./src/navigations/BottomTabNavigator";
import { ROUTES } from "./src/constants";
import { Provider } from "react-redux";
import { store } from "./src/store";
import AuthNavigator from "./src/navigations/AuthNavigator";

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
      <NavigationContainer>
        {/* {isAuthenticated ? AuthNavigator : DrawerNavigator } */}
        <AuthNavigator />
      </NavigationContainer>
    </Provider>
  );
}
