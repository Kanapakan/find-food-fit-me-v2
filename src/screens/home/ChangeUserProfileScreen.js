import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Image, Alert, TouchableWithoutFeedback, Keyboard, Pressable } from 'react-native'
import React, { useState } from 'react'

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
import TopTab from '../../components/TopTab';
import AccountInfoScreen from './AccountInfoScreen';
import PersonalInfoScreen from './PersonalInfoScreen';


const ChangeUserProfileScreen = ({ navigation, route }) => {
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
  const [isLoading, setIsLoading] = useState(false);
  const [showTab, setShowTab] = useState(true);

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
              <TopTab
                tabTitle={"Personal Information"}
                showTab={showTab}
                setshowTab={setShowTab}
                onPress={() => setShowTab(true)}
              />
              <TopTab
                tabTitle={"Account Information"}
                showTab={!showTab}
                setshowTab={setShowTab}
                onPress={() => setShowTab(false)}
              />
            </View>

            {showTab ?
              <PersonalInfoScreen
                inputs={inputs}
                handleOnchange={handleOnchange}
                handleError={handleError}
                validateUserInfo={validateUserInfo}
                errors={errors}
              />
              :
              <AccountInfoScreen
                inputs={inputs}
                handleOnchange={handleOnchange}
                handleError={handleError}
                validateAccountInfo={validateAccountInfo}
                errors={errors}
              />
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

export default ChangeUserProfileScreen