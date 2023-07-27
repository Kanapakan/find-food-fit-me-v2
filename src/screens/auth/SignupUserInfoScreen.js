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
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import Loader from "../../components/Loader";

const SignupUserInfoScreen = ({ navigation, route }, props) => {
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
  const [isLoading, setisLoading] = useState(false);

  const hasUnsavedChanges = Boolean(inputs);

  let bmr;
  let dailyCalVal;
  let dailyCal;

  // useEffect(() => {
  //     navigation.addListener('beforeRemove', (e) => {
  //       const action = e.data.action;
  //       if (!hasUnsavedChanges) {
  //         return;
  //       }

  //       e.preventDefault();

  //       Alert.alert(
  //         'Discard changes?',
  //         'You have unsaved changes. Are you sure to discard them and leave the screen?',
  //         [
  //           { text: "Don't leave", style: 'cancel', onPress: () => {} },
  //           {
  //             text: 'Discard',
  //             style: 'destructive',
  //             onPress: () => navigation.dispatch(action),
  //           },
  //         ]
  //       );
  //     }),
  //   [hasUnsavedChanges, navigation]
  // }, []);

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

  const createProfile = async () => {
    setisLoading(true);
    if (inputs.gender === "male") {
      bmr = parseInt(
        66 + 13.7 * inputs.weight + 5 * inputs.height - 6.8 * inputs.age
      );
      dailyCal = parseInt(bmr * dailyCalVal);
    } else if (inputs.gender === "female") {
      bmr = parseInt(
        665 + 9.6 * inputs.weight + 1.8 * inputs.height - 4.7 * inputs.age
      );
      dailyCal = parseInt(bmr * dailyCalVal);
    }
    await firestore()
      .collection('Users')
      .doc(auth().currentUser?.uid)
      .set({
        userId: auth().currentUser?.uid,
        email: auth().currentUser?.email,
        gender: inputs.gender,
        age: inputs.age,
        height: inputs.height,
        weight: inputs.weight,
        activity: inputs.activity,
        BMR: bmr,
        TDEE: dailyCal,

      })
      .then(() => {
        console.log('User added!');
      }).then(() => {
        navigation.navigate(ROUTES.BOTTOM_TAB);
        setisLoading(false);
      });
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
    } else if (inputs.age < 18 || inputs.age > 80) {
      handleError("Please input age between 18-80 years", "age");
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
      createProfile();
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <KeyboardAwareScrollView>
            <View className="items-center pt-7">
              <Text className="pb-6 text-center">
                <Text
                  className="text-3xl font-bold"
                  style={{ color: COLORS.darkGreen }}
                >
                  Personal Information
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
                placeholder="Enter your age (ages 18-80 years)"
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
              <Buttons text="Save" action={validate} />
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
  }
});

export default SignupUserInfoScreen;
