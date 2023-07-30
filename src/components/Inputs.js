import GlobalStyles from "../../GlobalStyles";
import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import COLORS from "../constants/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Input = ({
  isDisabled = false,
  value,
  label,
  iconName,
  error,
  password,
  confirmPassword,
  keyboardType,
  userInfo,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = useState(password);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(confirmPassword);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          !isDisabled ? GlobalStyles.inputContailner : GlobalStyles.inputContailnerDisable,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.green
              : COLORS.light,
            alignItems: "center",
          },
        ]}
      >
        <Icon
          name={iconName}
          style={{ color: COLORS.green, fontSize: 24, marginRight: 10 }}
        />
        <TextInput
          editable={!isDisabled}
          value={value}
          placeholderTextColor='#B5B5B5'
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          keyboardType={keyboardType ? keyboardType : "default"}
          secureTextEntry={
            password
              ? hidePassword
              : confirmPassword
              ? hideConfirmPassword
              : false
          }
          style={{ color: COLORS.darkBlue, flex: 1 }}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? "eye-off-outline" : "eye-outline"}
            style={{ color: COLORS.darkBlue, fontSize: 22 }}
          />
        )}
        {confirmPassword && (
          <Icon
            onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
            name={hideConfirmPassword ? "eye-off-outline" : "eye-outline"}
            style={{ color: COLORS.darkBlue, fontSize: 22 }}
          />
        )}
      </View>
      {error && (
        <Text className="mt-1" style={{ color: COLORS.red, fontSize: 12 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey,
    
  },
  placeholderStyle: {
    fontSize: 14,
    color: COLORS.black
  },
});

export default Input;
