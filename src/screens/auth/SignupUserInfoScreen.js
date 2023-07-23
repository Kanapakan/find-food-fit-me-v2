import GlobalStyles from "../../../GlobalStyles";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import COLORS from "../../constants/colors";
import Buttons from "../../components/Buttons";
import Dropdowns from "../../components/Dropdowns";
import Input from "../../components/Inputs";
import { Data } from "../../../dataJson/data";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import { ROUTES } from "../../constants";

const SignupUserInfoScreen = ({ navigation, route }, props) => {
  const usersCollection = firestore().collection('Users');
  const email = route.params.email;
  const password = route.params.password;
  // navigation.goBack(null)
  const [inputs, setInputs] = useState({
    name: "",
    age: 0,
    gender: "",
    height: 0,
    weight: 0,
    activity: "",
  });
  const [errors, setErrors] = useState({});
  const[isLoading, setisLoading] = useState(false);

  let bmr;
  let dailyCalVal;
  let dailyCal;

  switch (inputs.activity) {
    case "sedentary":
      dailyCalVal = 1.2;
      break;
    case "light excercise":
      dailyCalVal = 1.375;
      break;
    case "moderate exercise":
      dailyCalVal = 1.55;
      break;
    case "heavy exercise":
      dailyCalVal = 1.725;
      break;
    case "athlete":
      dailyCalVal = 1.9;
      break;
  }

  const createProfile = async (response) => {
    if (inputs.gender == "male") {
      bmr = parseInt(
        66 + 13.7 * inputs.weight + 5 * inputs.height - 6.8 * inputs.age
      );
      dailyCal = parseInt(bmr * dailyCalVal);
    } else if (inputs.gender == "female") {
      bmr = parseInt(
        665 + 9.6 * inputs.weight + 1.8 * inputs.height - 4.7 * inputs.age
      );
      dailyCal = parseInt(bmr * dailyCalVal);
    }

    firestore()
      .collection('Users')
      .add({
        userId: response.user.uid,
              email: email,
              gender: inputs.gender,
              age: inputs.age,
              height: inputs.height,
              weight: inputs.weight,
              activity: inputs.activity,
              BMR: bmr,
              TDEE: dailyCal,
      })
      .then(() => {
          setInputs({
            name: "",
            age: 0,
            gender: "",
            height: 0,
            weight: 0,
            activity: "",
          })
        console.log('User added!');
        setisLoading(false);
      });
  };

  const register = async () => {
    if (email && password) {
      try {
        const response = await auth().createUserWithEmailAndPassword(
          email,
          password
        );

        if (response.user) {
          await createProfile(response);
          // nav.replace("Main");
        }
      } catch (e) {
        console.log(e);
        // Alert.alert("Oops", "Please check your form and try again");
      }
    }
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.name) {
      handleError("Please input username", "name");
      isValid = false;
    }

    if (!inputs.gender) {
      handleError("Please select gender", "gender");
      isValid = false;
    }

    if (!inputs.age) {
      handleError("Please input age", "age");
      isValid = false;
    }

    if (!inputs.height) {
      handleError("Please input height", "height");
      isValid = false;
    }

    if (!inputs.weight) {
      handleError("Please input weight", "weight");
      isValid = false;
    }

    if (!inputs.activity) {
      handleError("Please select activity", "activity");
      isValid = false;
    }

    if (isValid) {
      register();
      navigation.navigate(ROUTES.HOME);
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
        <View style={styles.preloader}>
            <ActivityIndicator size="large" color="#547F53" />
            <Text>Loading...</Text>
        </View>
    )
}

  return (
    <TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <KeyboardAwareScrollView>
            <View className="items-center pt-6">
              <Text className="pb-7 text-center">
                <Text
                  className="text-3xl font-bold"
                  style={{ color: COLORS.darkGreen }}
                >
                  Create an Account
                </Text>
              </Text>

              <Input
                onChangeText={(text) => handleOnchange(text, "name")}
                onFocus={() => handleError(null, "name")}
                label="Username"
                placeholder="Enter your username"
                error={errors.name}
              />

              <Dropdowns
                headLabel="Gender"
                onFocus={() => handleError(null, "gender")}
                data={Data.gender}
                dataType="gender"
                handleOnchange={handleOnchange}
                error={errors.gender}
              />

              <Input
                onChangeText={(text) => handleOnchange(text, "age")}
                onFocus={() => handleError(null, "age")}
                label="Age (years)"
                placeholder="Enter your age"
                keyboardType="number-pad"
                error={errors.age}
              />

              <Input
                onChangeText={(text) => handleOnchange(text, "height")}
                onFocus={() => handleError(null, "height")}
                label="Height (cm)"
                placeholder="Enter your current height"
                keyboardType="decimal-pad"
                error={errors.height}
              />

              <Input
                onChangeText={(text) => handleOnchange(text, "weight")}
                onFocus={() => handleError(null, "weight")}
                label="Weight (kg)"
                placeholder="Enter your current weight"
                keyboardType="decimal-pad"
                error={errors.weight}
              />
              <Dropdowns
                headLabel="Activity"
                onFocus={() => handleError(null, "activity")}
                data={Data.activity}
                dataType="activity"
                handleOnchange={handleOnchange}
                error={errors.activity}
              />
            </View>
            <View className="items-center mt-5 mb-10">
              <Buttons text="Sign Up" validate={validate} />
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
});

export default SignupUserInfoScreen;
