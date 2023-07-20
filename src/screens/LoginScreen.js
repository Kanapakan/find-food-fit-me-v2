import GlobalStyles from '../../GlobalStyles';
import { View, Text, SafeAreaView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    })
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Text>LoginScreen</Text>
    </SafeAreaView>
  )
}

export default LoginScreen