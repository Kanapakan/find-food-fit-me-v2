import { View, Text, } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { addUserData, getUserData } from '../../store/userDataSlice';

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';

const HomeScreen = () => {
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();
  // const [userData, setUserData] = useState([]);
  // useEffect(() => {
  //   first
  
  //   return () => {
  //     second
  //   }
  // }, [third])
  console.log(auth().currentUser?.uid);
  
  // const navigation = useNavigation();

  // useLayoutEffect(() => {
  //     navigation.setOptions({
  //         headerShown: false
  //     })
  // })
  return (
    <View>
      <Text className="text-red-600 mt-4">HomeScreen</Text>
    </View>
  )
}

export default HomeScreen