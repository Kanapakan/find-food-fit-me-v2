import { View, Text } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react'
const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <View>
      <Text>AuthNavigator</Text>
    </View>
  )
}

export default AuthNavigator