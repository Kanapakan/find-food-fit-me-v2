import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
// import { TailwindProvider } from "tailwindcss-react-native"
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import SignupUserInfoScreen from "./src/screens/SignupUserInfoScreen";

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
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen name="Signup" options={{ headerShown: false }} component={SignupScreen} /> */}
        <Stack.Screen name="SignupUserInfo" options={{ headerShown: false }} component={SignupUserInfoScreen} />
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
