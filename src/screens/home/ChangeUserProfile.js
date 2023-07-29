import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Image, Alert, TouchableWithoutFeedback, Keyboard, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker';

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import Buttons from '../../components/Buttons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { COLORS } from '../../constants';
import Input from '../../components/Inputs';
import Dropdowns from '../../components/Dropdowns';
import { Data } from '../../../dataJson/data';
import { getUserProfile } from '../../store/userSlice';
import { useSelector } from 'react-redux';

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
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [key, setKey] = useState("");
  const [newPassword, setNewPassword] = useState('')
  const [isLoading, setisLoading] = useState(true);
  // const userKey = route.params.userKey;
  const [showTab1, setShowTab1] = useState(true);

  // -------------------- จัดแถบข้างบน -----------------------------]

  //   let bmr;
  //   let dailyCalVal;
  //   let dailyCal;

  //   switch (activity) {
  //       case "ออกกำลังกายน้อยมาก":
  //           dailyCalVal = 1.2;
  //         break;
  //       case "ออกกำลังกายน้อย":
  //           dailyCalVal =1.375;
  //         break;
  //       case "ออกกำลังกายปานกลาง":
  //           dailyCalVal = 1.55;
  //         break;
  //       case "ออกกำลังกายอย่างหนัก":
  //           dailyCalVal = 1.725;
  //         break;
  //       case "เป็นนักกีฬาหรือใช้แรงงานหนัก":
  //           dailyCalVal = 1.9;
  //         break;  
  //     }

  //   useEffect(() => {
  //     // console.log("load")

  //       const dbRef = db.collection('userDetail').doc(userKey);

  //       dbRef.get().then((res) => {
  //           //check ว่ามีข้อมูลอยู่ใน Doc ไหม
  //           if (res.exists){
  //             //ดึงค่าออกมาจาก firebase
  //               const user = res.data();
  //               setKey(res.id),
  //               setUserId(user.userId),
  //               setEmail(user.email),
  //               setGender(user.gender),
  //               setAge(user.age),
  //               setHeight(user.height),
  //               setWeight(user.weight),
  //               setActivity(user.activity),
  //               setisLoading(false)
  //           } else {
  //               console.log('Document does not exist!');
  //           }
  //       })

  //     }, []);


  //     //update ข้อมูล
  //   const updateUser = () => {
  //     setisLoading(true);
  //         if(gender == "ชาย"){
  //             bmr = parseInt((66 + (13.7* weight) + (5 * height) - (6.8 * age)));
  //             dailyCal = parseInt(bmr*dailyCalVal);              
  //         } else if(gender == "หญิง") {
  //             bmr = parseInt((665 + (9.6 * weight) + (1.8 * height) - (4.7 * age)));
  //             dailyCal = parseInt(bmr*dailyCalVal);
  //         }

  //       setisLoading(true);
  //       const updateDBRef = db.collection('userDetail').doc(userKey);
  //       updateDBRef.set({
  //           userId: userId,
  //           gender: gender,
  //           email: email,
  //           age: age,
  //           height: height,
  //           weight: weight,
  //           activity: activity,
  //           BMR: bmr,
  //           TDEE: dailyCal
  //       }).then(() => {
  //           setKey(''),
  //           setUserId(''),
  //           setGender(''),
  //           setAge(0),
  //           setHeight(0),
  //           setWeight(0),
  //           setActivity(""),
  //           setisLoading(false)
  //           Alert.alert("แก้ไขข้อมูลส่วนตัวสำเร็จ")
  //           navigation.navigate('MyProfile');
  //       })
  //       .catch((err) => {
  //           console.log("Error:", err),
  //           setisLoading(false)
  //       })
  // }


  // ----------- แก้ไขรหัสผ่าน -----------
  // const reauthrnticate = (currentPass) =>{
  //    const user = firebase.auth().currentUser;
  //     const cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPass);
  //     // console.log(cred)
  //     return user.reauthenticateWithCredential(cred);
  // }


  //   const updatePassword = (oldPassword, newPassword) => {
  //     setisLoading(true);
  //     reauthrnticate(oldPassword)
  //     .then(() => {
  //       const user = firebase.auth().currentUser;
  //       user.updatePassword(newPassword)
  //       .then(() => {
  //         setisLoading(false)
  //         Alert.alert("เปลี่ยนรหัสผ่านสำเร็จ")
  //           console.log("Edit Password success!");
  //           navigation.navigate('MyProfile');
  //     })
  //     .then(() => {
  //         setOldPassword("");
  //         setNewPassword("");
  //         setConfirmPassword("");
  //     })


  //   })
  //   .catch((err) => {
  //     Alert.alert("รหัสผ่านเก่าไม่ถูกต้อง")
  //     setisLoading(false)
  //     console.log("Error:", err)
  //     setOldPassword("");
  //     setNewPassword("");
  //     setConfirmPassword("");
  // })

  // }


  //   if (isLoading) {
  //     return (
  //         <View style={styles.preloader}>
  //             <ActivityIndicator size="large" color="#547F53" />
  //             <Text>กรุณารอสักครู่</Text>
  //         </View>
  //     )
  // }

  const validateUserInfo = () => {
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
      // createProfile();
    }
  };

  const validateAccountInfo = () => {
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
      // createProfile();
    }
  }

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
                  borderBottomColor: showTab1 == false ? "#547F53" : "#fff",
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
                label="Current password"
                placeholder="Enter your current password"
                error={errors.password}
                password
              />
               <Input
                onChangeText={(text) => handleOnchange(text, "confirmPassword")}
                onFocus={() => handleError(null, "confirmPassword")}
                iconName="lock-outline"
                label="New Password"
                placeholder="At least 6 characters"
                error={errors.confirmPassword}
                confirmPassword
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
                  <Buttons text={'Change password'} action={validateAccountInfo}/>
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