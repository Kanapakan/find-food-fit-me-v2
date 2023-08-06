import { View, Text, Button, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Buttons from '../../components/Buttons'
import { COLORS, ROUTES } from '../../constants'

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../../store/userSlice';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// import { getUserProfile } from '../../store/userSlice';

const ProfileScreen = ({ navigation, route }) => {
  const userData = useSelector(getUserProfile)
  const [userProfile, setUserProfile] = useState(userData.userProfile)
  const insets = useSafeAreaInsets();
  useEffect(() => {
    setUserProfile(userData.userProfile);
  }, [userData])


  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate(ROUTES.LOGIN)
      })
      .catch(error => alert(error.message))
  }

  return (
    <View style={{
      flex: 1,
      paddingTop: insets.top,
      backgroundColor: COLORS.lightGreen
    }}>
      {/* <View className="flex-1 flex-col "> */}
        <View className="flex-[2] flex-col">
          <View className="self-center mt-5" >
            <Text className="font-bold text-3xl">My Profile</Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <Image style={styles.profile} source={((userProfile?.gender === 'female') ? require("../../../assets/Eyes-amico-removebg.png") : require("../../../assets/Eyes-pana-removebg.png"))} />
          </View>


          <View style={{ alignItems: "center", marginTop: -40, }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ROUTES.CHANGE_USER_PROFILE)
              }}
              style={styles.btnContainer}
            >
              <Text style={styles.btnText}>Change Profile</Text>
            </TouchableOpacity>
          </View>
        </View>


        <View className="flex-[4] flex-col bg-white">
          <View className="flex-[5] flex-row mt-1 mb-4 mx-4">
            <View className="flex-[2] flex-col justify-around">
              <View className="flex flex-row justify-between">
                <Text className="self-center text-sm">Gender</Text>
                <View style={styles.btnContainerAll}>
                  <Text style={styles.btnTextAll2}>{userProfile?.gender.charAt(0).toUpperCase() + userProfile?.gender.slice(1)}</Text>
                </View>
              </View>

              <View className="flex flex-row justify-between">
                <Text className="self-center text-sm">Age</Text>
                <View style={styles.btnContainerAll}>
                  <Text style={styles.btnTextAll2}>{userProfile?.age}</Text>
                </View>
              </View>

              <View className="flex flex-row justify-between">
                <Text className="self-center text-sm">Weight (kg.)</Text>
                <View style={styles.btnContainerAll}>
                  <Text style={styles.btnTextAll2}>{userProfile?.weight}</Text>
                </View>
              </View>

              <View className="flex flex-row justify-between">
                <Text className="self-center text-sm">Height (cm.)</Text>
                <View style={styles.btnContainerAll}>
                  <Text style={styles.btnTextAll2}>{userProfile?.height}</Text>
                </View>
              </View>
              {/* <View className="flex flex-row justify-between">
                    <Text className="self-center text-sm">Activity</Text>
                    <View  style={styles.btnContainerAll2}>
                      <Text style={styles.btnTextAll2}>{userProfile?.activity.charAt(0).toUpperCase() + userProfile.activity.slice(1)}</Text>
                    </View>
                  </View> */}
            </View>

            <View className="flex-[1.85] justify-center items-end">
              <View style={styles.circle}>
                <Text className="font-semibold text-xs self-center text-center mt-7 leading-3">Total Daily Energy Expenditure</Text>
                {/* <Text className="text-xs self-center text-center">Total Daily Energy Expenditure</Text> */}
                {/* <Text className="text-sm self-center">(energy expenditure)</Text> */}
                <View className="flex-row self-center gap-1 mt-[0.5]">
                  <Text className="font-bold text-xl text-[#8EC18D]">{userProfile?.TDEE}</Text>
                  <Text className="text-xs self-end mb-1">Cals/day</Text>
                </View>
                <Text className="font-semibold text-xs self-center mt-3">Basal Metabolic Rate</Text>
                <View className="flex-row self-center gap-1">
                  <Text className="font-bold text-lg self-center text-[#8EC18D]"
                  >{userProfile?.BMR}</Text>
                  <Text className="text-xs self-end mb-1">Cals/day</Text>
                </View>
              </View>
            </View>

          </View>
          <View className="flex-1">
            <View className="flex flex-row">
              <Text className="self-center text-sm ml-4">Activity</Text>
              <View style={styles.btnContainerAll2}>
                <Text style={styles.btnTextAll2}>{userProfile?.activity.charAt(0).toUpperCase() + userProfile.activity.slice(1)}</Text>
              </View>
            </View>
          </View>
        <View className="items-center pb-3 bg-white" >
          <Buttons width={'w-[90%]'} title={'Log out'} action={handleSignOut} />
        </View>
        </View>

      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: COLORS.lightGreen,
  //   flexDirection: "column",
  // },
  preloader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  profile: {
    marginTop: -5,
    height: "70%",
    width: 110
  },
  btnContainer: {
    width: "40%",
    elevation: 8,
    backgroundColor: "#cecece",
    borderRadius: 10,
    paddingVertical: 5,
  },
  btnText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    alignSelf: "center",
  },
  btnTextAll: {
    fontSize: 18,
    color: "#000",
    margin: 30,
  },
  btnContainerAll: {
    width: "45%",
    // marginTop: -65,
    // marginLeft: 120,
    borderColor: COLORS.green,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,

  },
  btnTextAll2: {
    fontSize: 16,
    color: "#fff",
    alignSelf: "center",
    color: COLORS.black,
    fontWeight: 'bold'
  },
  btnContainerAll2: {
    width: "60%",
    // marginTop: -60,
    marginLeft: 56,
    borderColor: COLORS.green,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  },
  circle: {
    width: 165,
    height: 165,
    // marginTop: -290,
    // marginLeft: 220,
    borderRadius: 200 / 2,
    backgroundColor: "#fff",
    borderColor: "#E4EFE3",
    borderWidth: 5
  },
  calorieText: {
    fontSize: 18,
    alignSelf: "center",
    marginTop: 15,
  },
  calorieText3: {
    fontSize: 13,
    alignSelf: "center",
    marginTop: 15
  },
});

export default ProfileScreen