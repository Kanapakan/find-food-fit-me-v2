import GlobalStyles from "../../../GlobalStyles";
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
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from "../../components/Inputs";
import Buttons from "../../components/Buttons";
import {ROUTES} from "../../constants";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import Loader from "../../components/Loader";

const LoginScreen = ({navigation, route}) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setisLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const userRef = firestore().collection('Users')

  const checkUserExist = async () => {
    const doc = await userRef.doc(auth().currentUser?.uid).get()
    if (!doc.exists) {
      navigation.navigate(ROUTES.SIGNUP_USER_INFO);
    } else {
      navigation.navigate(ROUTES.BOTTOM_TAB);
    }
  }

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async user => {
      if (user) {
        checkUserExist();
      } 
    })
    return unsubscribe
  }, [])

  const login = async () => {
    setisLoading(true);
    if (inputs.email && inputs.password) {
      try {
        const userCredential = await auth().signInWithEmailAndPassword(
          inputs.email,
          inputs.password
        );
        if (userCredential.user) {
          checkUserExist();
          setisLoading(false);
        }
      } catch (e) {
        if (e.code === 'auth/user-not-found') {
          setisLoading(false);
          handleError("The email does not exist. Please sign up.", "email");
        } else {
          setisLoading(false);
          console.error('Error signing in:', e);
        }
      }
    }
  }

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

  if(isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Image
          className="left-0 h-36 w-36"
          source={require("../../../assets/fade_leaf_left-removebg.png")}
        />
        <View style={styles.boxText}>
          <Text style={styles.baseText}>
            <Text className="text-4xl font-semibold">Find Food Fit Me</Text>
          </Text>
        </View>
        <View className="items-center mt-10 mb-5">
          <Image
            style={styles.line}
            source={require("../../../assets/line-removebg.png")}
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
        <Buttons text="Log In" action={validate}/>
        </View>
        <View className="self-center pt-10">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ROUTES.SIGNUP);
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
    </TouchableWithoutFeedback>
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
