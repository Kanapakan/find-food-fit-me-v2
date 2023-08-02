import { View, Text, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Input from '../../components/Inputs';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const SearchScreen = ({ navigation, route }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [titleBar, setTitleBar] = useState("กรอกด้วยตัวเอง");
  const [showFilter, setShowFilter] = useState(true)
  // const recipes = useSelector(state => state.recipes.recipes)


  // ---------------- funtion filter จากชื่อ
  // const searchHandler = (text) => {
  //   if (text !== "") {
  //     const newMenuList = recipes.filter((recipe) => {
  //       return recipe.name.indexOf(text) > -1;
  //     });
  //     setSearchResult(newMenuList)
  //     setSearchWord()
  //     setTitleBar("ผลการค้นหา")
  //     setShowFilter(false)
  //     // console.log(newMenuList)
  //   } else {
  //     setTitleBar("กรองด้วยตัวเอง")
  //     setSearchWord(text);
  //     setSearchResult([]);
  //     setShowFilter(true)
  //     // setFilter( < FilterIngredient />)
  //   }
  // }

  return (
    <TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <KeyboardAwareScrollView>
      <View className="items-center">
          <Input
            value={searchWord}
            iconName="magnify"
            // onChangeText={(text) => handleOnchange(text, "age")}
            // onFocus={() => handleError(null, "age")}
            // label="Enter by food name"
            placeholder="Enter food name"
            // keyboardType="number-pad"
            // error={errors.age}
            searchRecipe
          />

          {/* <TextInput
            className=""
            style={styles.searchBox}
            placeholder="Search by food name"
            // onChangeText={(text) => searchHandler(text)}
            value={searchWord}
          >
          </TextInput> */}
          {/* <Icon style={{ color: COLORS.green, fontSize: 24, marginRight: 10 }} 
            onPress={(text) => searchHandler('')}
            searchRecipe /> */}
        {/* </View> */}
      </View>
      <View style={styles.headBox} >
        <Text style={styles.headText}>{titleBar} </Text>

      </View>

      {/* -------------------- FilterIngredient ---------------------------- */}
      {/* {showFilter ? <FilterIngredient
        navigation={navigation} /> : null} */}

      {/* -------------------- List ผลการพิมพ์หา ---------------------------- */}
      {/* <View style={styles.container}>
        <RecipeList
          style={{ width: "100%", height: "100%" }}
          listData={searchResult}
          navigation={navigation}
        />

      </View> */}

    {/* </View> */}
    </KeyboardAwareScrollView>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )

}


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#fff",
    // maxHeight: '100%'
    // alignItems: "center",
    // justifyContent: "center",
  },
  headBox: {
    backgroundColor: "#e4efe3",
    //ตอนเอาลง tab เอา marginTop ออกด้วยนะ
    marginTop: 15,
    alignItems: "flex-start",
    padding: 8
  },
  headText: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 10
  },
  // css ของหน้าผลการค้นหา
  food: {
    height: 100,
    flex: 1,
    marginLeft: 10,
    borderRadius: 15
  },
  foodBox: {
    flexDirection: 'column',
    flex: 2,
  },
  foodName: {
    fontSize: 22,
    fontWeight: "bold",
    flex: 2,
    marginLeft: 10,
    marginTop: 10,
    flexWrap: "wrap",
  },
  foodCal: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    flex: 1,
  },
  foodTime: {
    flex: 1,
    marginLeft: 10,
  },
  timeText: {
    fontSize: 18,
    marginTop: -25,
    marginLeft: 30,
  },
  line: {
    height: 2,
    backgroundColor: "#adacac",
    marginTop: 20
  },

  // css ของหน้าค้นหาด้วยตัวเอง
  sensitiveText: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#547f53",
    alignSelf: "center",
    padding: 20
  },
  btnContainer: {
    width: "40%",
    elevation: 8,
    backgroundColor: "#8ec18d",
    borderRadius: 10,
    paddingVertical: 10,
    // paddingHorizontal: 20,
  },
  btnText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
  searchBox: {
    width: "75%",
    height: 40,
    // flex: 1,
    // borderColor: '#adacac',
    // borderWidth: 2,
    // borderRadius: 10,
    fontSize: 18,
  },
  searchBorder: {
    flexDirection: "row",
    width: "90%",
    height: 45,
    borderColor: '#8ec18d',
    borderWidth: 2,
    borderRadius: 10,
  },
});

export default SearchScreen