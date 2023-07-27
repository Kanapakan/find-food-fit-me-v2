import { View, Text, Button } from 'react-native'
import React from 'react'
import Buttons from '../../components/Buttons'
import { ROUTES } from '../../constants'

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';

const ProfileScreen = ({ navigation, route }) => {

  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate(ROUTES.LOGIN)
      })
      .catch(error => alert(error.message))
  }

  return (
    <View>
      <Text>ProfileScreen</Text>
      <Buttons text="Log Out" action={handleSignOut}/>
    </View>
  )
}

export default ProfileScreen