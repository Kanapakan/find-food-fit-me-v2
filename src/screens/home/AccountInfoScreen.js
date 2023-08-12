import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Input from '../../components/Inputs';
import { Pressable } from 'react-native';
import Buttons from '../../components/Buttons';

const AccountInfoScreen = ({
  inputs,
  errors,
  handleOnchange = () => { },
  handleError = () => { },
  validateAccountInfo = () => { },
}) => {
  
  return (
    <View>
      <View className="flex-1 mt-5">
        <View className="items-center" behavior="padding">
          <Input
            value={inputs.email}
            isDisabled={true}
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            keyboardType="email-address"
            error={errors.email}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "currentPassword")}
            onFocus={() => handleError(null, "currentPassword")}
            iconName="lock-outline"
            label="Current password"
            placeholder="Enter your current password"
            error={errors.currentPassword}
            password
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "newPassword")}
            onFocus={() => handleError(null, "newPassword")}
            iconName="lock-outline"
            label="New Password"
            placeholder="At least 6 characters"
            error={errors.newPassword}
            password
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
          <Buttons width={'w-[90%]'} title={'Change password'} action={validateAccountInfo} />
        </View>
      </View>
    </View>
  )
}

export default AccountInfoScreen