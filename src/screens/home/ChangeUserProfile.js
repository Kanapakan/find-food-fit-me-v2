import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Image, Alert, TouchableWithoutFeedback, Keyboard, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker';

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import Buttons from '../../components/Buttons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { COLORS, ROUTES } from '../../constants';
import Input from '../../components/Inputs';
import Dropdowns from '../../components/Dropdowns';
import { Data } from '../../../dataJson/data';
import { getUserProfile } from '../../store/userSlice';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';

const ChangeUserProfile = ({ navigation, route }) => {
  const userData = useSelector(getUserProfile);
  const [inputs, setInputs] = useState({
    name: "",
    age: userData.userProfile.age,
    gender: userData.userProfile.gender,
    height: userData.userProfile.height,
    weight: userData.userProfile.weight,
    activity: userData.userProfile.activity,

    email: userData.userProfile.email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [key, setKey] = useState("");
  const [newPassword, setNewPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  // const userKey = route.params.userKey;
  const [showTab1, setShowTab1] = useState(true);

  // -------------------- จัดแถบข้างบน -----------------------------]

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

  //update ข้อมูล
  const updateUser = async () => {

    setIsLoading(true);
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
        // userId: auth().currentUser?.uid,
        // email: auth().currentUser?.email,
        gender: inputs.gender,
        age: inputs.age,
        height: inputs.height,
        weight: inputs.weight,
        activity: inputs.activity,
        BMR: bmr,
        TDEE: dailyCal,
      }, { merge: true }).then(() => {
        Alert.alert("Personal information updated successfully.")
        navigation.navigate(ROUTES.PROFILE);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err)
        setIsLoading(false)
      })
  }


  // ----------- change password -----------
  const reauthenticateAndChangePassword = async (currentPassword, newPassword) => {
    setIsLoading(true);
    const user = auth().currentUser;
    const credentials = auth.EmailAuthProvider.credential(user.email, currentPassword);

    if (user) {
      user.reauthenticateWithCredential(credentials)
        .then(() => {
          user.updatePassword(newPassword)
            .then(() => {
              setIsLoading(false);
              Alert.alert("Your password has been changed successfully.")
              navigation.navigate(ROUTES.PROFILE);
            })
            .catch((e) => {
              setIsLoading(false);
              Alert.alert("Error updating password, Please try again.")
            });
        })
        .catch((e) => {
          setIsLoading(false);
          console.log('Error reauthenticating:', e.message);
          if (e.code === 'auth/wrong-password') {
            handleError("The password you entered is incorrect.", "currentPassword");
          }
        });
    } else {
      setIsLoading(false);
      console.log('No user signed in.');
    }

  }


  const validateUserInfo = () => {
    Keyboard.dismiss();
    let isValid = true;

    // if (!inputs.name) {
    //   handleError("Please input username.", "name");
    //   isValid = false;
    // }

    if (!inputs.gender) {
      handleError("Please select gender.", "gender");
      isValid = false;
    }

    if (!inputs.age) {
      handleError("Please input age.", "age");
      isValid = false;
    } else if (inputs.age < 18 || inputs.age > 80) {
      handleError("Please input age between 18-80 years.", "age");
      isValid = false;
    }

    if (!inputs.height) {
      handleError("Please input height.", "height");
      isValid = false;
    }

    if (!inputs.weight) {
      handleError("Please input weight.", "weight");
      isValid = false;
    }

    if (!inputs.activity) {
      handleError("Please select activity.", "activity");
      isValid = false;
    }

    if (isValid) {
      updateUser();
    }
  };

  const validateAccountInfo = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.currentPassword) {
      handleError("Please input current password.", "currentPassword");
      isValid = false;
    } else if (inputs.currentPassword.length < 6) {
      handleError("Min password length of 6.", "currentPassword");
      isValid = false;
    }

    if (!inputs.newPassword) {
      handleError("Please input new password.", "newPassword");
      isValid = false;
    } else if (inputs.newPassword.length < 6) {
      handleError("Min password length of 6.", "newPassword");
      isValid = false;
    }

    if (!inputs.confirmPassword) {
      handleError("Please input confirmation password.", "confirmPassword");
      isValid = false;
    } else if (inputs.confirmPassword !== inputs.newPassword) {
      handleError(
        "Password and confirmation password don't match.",
        "confirmPassword"
      );
      isValid = false;
    }

    if (isValid) {
      reauthenticateAndChangePassword(inputs.currentPassword, inputs.newPassword)
    }
  }

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
            <View className="flex-row relative h-16">
              {/* ----------------------- Tab1 --------------------------------- */}
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomWidth: 3,
                  borderBottomColor: showTab1 === true ? "#547F53" : "#fff",
                }}
                onPress={() => setShowTab1(true)}
              >
                <Text
                  style={{
                    color: showTab1 === true ? "#000" : "#adacac",
                    fontWeight: showTab1 === true ? "bold" : "normal",
                    fontSize: 16
                  }}
                >
                  Personal information
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomWidth: 3,
                  borderBottomColor: showTab1 == false ? COLORS.darkGreen : "#fff",
                  backgroundColor: "#fff",
                }}
                onPress={() => setShowTab1(false)}

              >
                <Text
                  style={{
                    color: showTab1 === true ? "#adacac" : "#000",
                    fontWeight: showTab1 === true ? "normal" : "bold",
                    fontSize: 16
                  }}
                >
                  Account information
                </Text>
              </TouchableOpacity>
            </View>
            {showTab1 ?
              <View>
                <View className="items-center pt-7">

                  {/* ----------------------- Tab1 --------------------------------- */}

                  <Dropdowns
                    value={inputs.gender}
                    headLabel="Gender"
                    onFocus={() => handleError(null, "gender")}
                    data={Data.gender}
                    dataType="gender"
                    handleOnchange={handleOnchange}
                    error={errors.gender}
                  />

                  <Input
                    value={inputs.age}
                    onChangeText={(text) => handleOnchange(text, "age")}
                    onFocus={() => handleError(null, "age")}
                    label="Age (years)"
                    placeholder="Enter your age (ages 18-80 years)"
                    keyboardType="number-pad"
                    error={errors.age}
                  />

                  <Input
                    value={inputs.height}
                    onChangeText={(text) => handleOnchange(text, "height")}
                    onFocus={() => handleError(null, "height")}
                    label="Height (cm)"
                    placeholder="Enter your current height"
                    keyboardType="decimal-pad"
                    error={errors.height}
                  />

                  <Input
                    value={inputs.weight}
                    onChangeText={(text) => handleOnchange(text, "weight")}
                    onFocus={() => handleError(null, "weight")}
                    label="Weight (kg)"
                    placeholder="Enter your current weight"
                    keyboardType="decimal-pad"
                    error={errors.weight}
                  />
                  <Dropdowns
                    value={inputs.activity}
                    headLabel="Activity"
                    onFocus={() => handleError(null, "activity")}
                    data={Data.activity}
                    dataType="activity"
                    handleOnchange={handleOnchange}
                    error={errors.activity}
                  />
                </View>
                <View style={{ alignItems: "center", marginTop: 30, }}>
                  <Buttons text="Save" action={validateUserInfo} />
                </View>
              </View>

              :

              /* ----------------------- Tab 2 -------------------------------------- */
              <View className="flex-1 mt-5">
                <View className="items-center" behavior="padding">
                  <Input
                    value={inputs.email}
                    isDisabled={true}
                    onChangeText={(text) => handleOnchange(text, "email")}
                    onFocus={() => handleError(null, "email")}
                    iconName="email-outline"
                    label="Email"
                    placeholder="Enter your email address"
                    keyboardType="email-address"
                    error={errors.email}
                  />
                  <Input
                    onChangeText={(text) => handleOnchange(text, "currentPassword")}
                    onFocus={() => handleError(null, "currentPassword")}
                    iconName="lock-outline"
                    label="Current password"
                    placeholder="Enter your current password"
                    error={errors.currentPassword}
                    password
                  />
                  <Input
                    onChangeText={(text) => handleOnchange(text, "newPassword")}
                    onFocus={() => handleError(null, "newPassword")}
                    iconName="lock-outline"
                    label="New Password"
                    placeholder="At least 6 characters"
                    error={errors.newPassword}
                    password
                  />
                  <Input
                    onChangeText={(text) => handleOnchange(text, "confirmPassword")}
                    onFocus={() => handleError(null, "confirmPassword")}
                    iconName="lock-outline"
                    label="Confirm Password"
                    placeholder="At least 6 characters"
                    error={errors.confirmPassword}
                    confirmPassword
                  />
                  <Pressable className="self-start ml-5 mt-10"
                  // onPress={''}
                  >
                    <Text className="text-lg font-semibold font-]">Forgot password ?</Text>
                  </Pressable>
                </View>
                <View style={{ alignItems: "center", marginTop: 30, }}>
                  <Buttons text={'Change password'} action={validateAccountInfo} />
                </View>
              </View>
            }
          </KeyboardAwareScrollView>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  preloader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },

});

export default ChangeUserProfile