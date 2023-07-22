import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    // backgroundColor: npLBlue,
    // paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  inputContailner: {
    width: "90%",
    height: 55,
    borderColor: "#8ec18d",
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 15,
    textAlign: "center",
  },

  btnContainer: {
    width: "90%",
    height: 55,
    backgroundColor: "#8ec18d",
    borderColor: "#8ec18d",
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownContainer: {
    height: 55,
    width: '90%',
    borderColor: "#8ec18d",
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
  }

});
