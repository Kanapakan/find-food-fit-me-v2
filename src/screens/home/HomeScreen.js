import { View, Text, } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
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