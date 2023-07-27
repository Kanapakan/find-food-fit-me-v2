import { View, Text, } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { addUserData, getUserData } from '../../store/userDataSlice';

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import { ROUTES } from '../../constants';

const HomeScreen = ({ navigation, route }, props) => {
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const userRef = firestore().collection('Users')
  useEffect(() => {
    //Get user detail from collection
    const getuser = async () => {
    const doc = await userRef.doc(auth().currentUser?.uid).get()
    if (!doc.exists) {
      console.log('No such document!')
    } else {
      console.log('Document data:', doc.data())
    }
}

    getuser()
  }, [])

  
  console.log(auth().currentUser?.uid);
  
  // const navigation = useNavigation();

  return (
    <View>
      <Text className="text-red-600 mt-4">HomeScreen</Text>
    </View>
  )
}

export default HomeScreen