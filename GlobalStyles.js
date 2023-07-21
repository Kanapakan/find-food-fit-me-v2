import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    // backgroundColor: npLBlue,
    // paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  textInput: {
    // width: "100%",
    height: 55,
    // borderColor: "#8ec18d",
    // borderWidth: 2,
    // borderRadius: 10,
    fontSize: 18,
    // textAlign: "center",
    paddingLeft: 5,
    backgroundColor: "#8ec18d",
    
  },
  inputContailner: {
    width: "90%",
    height: 55,
    borderColor: "#8ec18d",
    borderWidth: 2,
    borderRadius: 10,
    // fontSize: 18,
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

});
