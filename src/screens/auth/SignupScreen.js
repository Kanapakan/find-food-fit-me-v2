import GlobalStyles from "../../../GlobalStyles";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/Inputs";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import Buttons from "../../components/Buttons";
import {ROUTES} from "../../constants";

const SignUpScreen = ({ navigation, route }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setisLoading] = useState(false);
  const [errors, setErrors] = useState({});
  // const [loading, setLoading] = React.useState(false);

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

    if (!inputs.confirmPassword) {
      handleError("Please input confirmation password", "confirmPassword");
      isValid = false;
    } else if (inputs.confirmPassword !== inputs.password) {
      handleError(
        "Password and confirmation password don't match",
        "confirmPassword"
      );
      isValid = false;
    }

    if (isValid) {
      // register();
      navigation.navigate(ROUTES.SIGNUP_USER_INFO, {email:  inputs.email, password:  inputs.password});
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <KeyboardAwareScrollView>
            <View className="items-center flex flex-col gap-5 mt-0.5">
              <Image
                style={styles.diet}
                source={require("../../../assets/Diet.gif")}
              />
            </View>
            <View className="items-center" behavior="padding">
              <Input
                onChangeText={(text) => handleOnchange(text, "email")}
                onFocus={() => handleError(null, "email")}
                iconName="email-outline"
                label="Email"
                placeholder="Enter your email address"
                keyboardType="email-address"
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
              <Input
                onChangeText={(text) => handleOnchange(text, "confirmPassword")}
                onFocus={() => handleError(null, "confirmPassword")}
                iconName="lock-outline"
                label="Confirm Password"
                placeholder="Enter your confirm password"
                error={errors.confirmPassword}
                confirmPassword
              />
            </View>

            <View className="items-center flex mt-5">
            <Buttons text="Next" validate={validate}/>
            </View>

            <View className="self-center pt-5">
              <TouchableOpacity
                className="flex-row gap-2"
                onPress={() => {
                  navigation.navigate(ROUTES.LOGIN);
                }}
              >
                <Text className="text-md">Already have an account ?</Text>
                <Text className="text-md font-bold text-black justify-items-center">
                  Log In
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  diet: {
    height: 260,
    width: 260,
    objectFit: "cover",
  },
  line: {
    height: 50,
    width: "70%",
  },
});

export default SignUpScreen;
