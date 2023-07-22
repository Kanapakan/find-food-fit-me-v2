import { View, Text, Pressable } from "react-native";
import React from "react";
import GlobalStyles from "../../GlobalStyles";

const Buttons = ({text, validate = () => {}}) => {
  return (
    <Pressable
      // onPress={handleLogin}
      style={GlobalStyles.btnContainer}
      onPress={
        validate
      }
    >
      <Text className="text-lg text-white font-bold">{text}</Text>
    </Pressable>
  );
};

export default Buttons;
