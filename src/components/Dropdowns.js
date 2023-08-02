import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import GlobalStyles from "../../GlobalStyles";
import COLORS from "../constants/colors";

const Dropdowns = ({
  headLabel,
  dataType,
  data,
  iconName,
  error,
  onFocus = () => {},
  handleOnchange = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={styles.label}>{headLabel}</Text>
      <View
        style={[
          GlobalStyles.dropdownContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.green
              : COLORS.lightGreen,
            alignItems: "center",
          },
        ]}
      >
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          // iconStyle={styles.iconStyle}
          data={data}
          // search
          maxHeight={150}
          // minHeight={10}
          labelField="label"
          valueField="value"
          placeholder={!isFocused ? "Select your activity" : "..."}
          // searchPlaceholder="Search..."
          value={data}
          // onChange={item => handleOnchange(item.value, "gender")}
          onChange={(item) => handleOnchange(item.value, dataType)}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </View>
      {error && (
        <Text className="mt-1" style={{ color: COLORS.red, fontSize: 12 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default Dropdowns;

const styles = StyleSheet.create({
  dropdown: {
    height: 55,
    width: "100%",
    paddingHorizontal: 15,
  },
  icon: {
    // marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#B5B5B5",
    // paddingHorizontal: 20,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: COLORS.black,
    // paddingHorizontal: 15,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey,
  },
});
