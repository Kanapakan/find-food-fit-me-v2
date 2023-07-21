import GlobalStyles from "../../GlobalStyles";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Keyboard,
  TextInput,
  Button,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from "../components/input";


const LoginScreen = ({navigation, route}) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [errors, setErrors] = useState({});
  // const navigation = useNavigation();

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      isValid = false;
    }

    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    } else if (inputs.password.length < 6) {
      handleError("Min password length of 6", "password");
      isValid = false;
    }

    if (isValid) {
      login();
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <Pressable className="flex-1" onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Image
          className="left-0 h-36 w-36"
          source={require("../../assets/fade_leaf_left-removebg.png")}
        />
        <View style={styles.boxText}>
          <Text style={styles.baseText}>
            <Text className="text-4xl font-semibold">Find Food Fit Me</Text>
            {/* <Text style={styles.normaltext}>หาอาหารที่ใช่ จากอะไรที่ชอบ</Text> */}
          </Text>
        </View>
        <View className="items-center mt-10 mb-5">
          <Image
            style={styles.line}
            source={require("../../assets/line-removebg.png")}
          />
        </View>

        {/* input */}
        <KeyboardAvoidingView className="items-center">
          <Input
              onChangeText={(text) => handleOnchange(text, "email")}
              onFocus={() => handleError(null, "email")}
              iconName="email-outline"
              label="Email"
              placeholder="Enter your email address"
              error={errors.email}
            />
          <Input
              onChangeText={(text) => handleOnchange(text, "password")}
              onFocus={() => handleError(null, "password")}
              iconName="lock-outline"
              label="Password"
              placeholder="Enter your password"
              error={errors.password}
              password
            />
        </KeyboardAvoidingView>
        <TouchableOpacity>
          <Text className="text-md mt-6 self-center text-gray-500">Forgot your password?</Text>
        </TouchableOpacity>

        {/* Buttons */}
        <View className="items-center mt-10">
          <Pressable
            // onPress={handleLogin}
            style={GlobalStyles.btnContainer}
          >
            <Text className="text-lg text-white font-bold">Log in</Text>
          </Pressable>
        </View>
        <View className="self-center pt-10">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Signup");
            }}
            className="flex-row gap-2"
          >
            <Text className="text-md">Don't have an account ?</Text>
            <Text className="text-md font-bold text-black justify-items-center">
              Create new
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  preloader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  boxText: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  baseText: {
    // fontFamily: "Roboto",
    textAlign: "center",
  },
  line: {
    height: 50,
    width: "70%",
  },
});

export default LoginScreen;
