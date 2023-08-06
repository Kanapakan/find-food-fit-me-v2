import { View, Text, Pressable } from "react-native";
import React from "react";
import GlobalStyles from "../../GlobalStyles";

const Buttons = ({title, action = () => {}, width}) => {
  return (
    <Pressable
      // onPress={handleLogin}
      className={width}
      style={GlobalStyles.btnContainer}
      onPress={
        action
      }
    >
      <Text className="text-lg text-white font-bold">{title}</Text>
    </Pressable>
  );
};

export default Buttons;
