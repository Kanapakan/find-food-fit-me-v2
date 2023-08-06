import { View, Text, } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import { ROUTES } from '../../constants';
import { addUserProfile, getUserProfile } from '../../store/userSlice';

const HomeScreen = ({ navigation, route }, props) => {
  const userData = useSelector(getUserProfile);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const userRef = firestore().collection('Users')
  
  const getuser = () => {
    const unsub = userRef.doc(auth().currentUser?.uid).onSnapshot(docSnapshot => {
      if (!docSnapshot.exists) {
        console.log('No matching documents.')
        return
      } else {
        dispatch(addUserProfile({
          userProfile: docSnapshot.data()
        }))
      }
    })
  }

  useEffect(() => {
    getuser()
  }, [])

  
  // const navigation = useNavigation();

  return (
    <View className="bg-slate-500 flex-1">
      <Text className="text-red-600 mt-4">HomeScreen</Text>
    </View>
  )
}

export default HomeScreen