import { View, Text, StyleSheet, Animated, ScrollView, Image, TouchableOpacity, TouchableWithoutFeedback, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
// import Animated from 'react-native-reanimated';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants';
import Buttons from '../../components/Buttons';
import Dropdowns from '../../components/Dropdowns';
import { Data } from '../../../dataJson/data';

const HEADER_MIN_HEIGHT = 95;
const HEADER_MAX_HEIGHT = 300

const RecipeDetailScreen = ({ navigation, route }, props) => {
  const [inputs, setInputs] = useState({
		meals: ""
	});
  const { id, recipeName, cals, time, ingredients, steps, image, carbs, protein, fat } = route.params;
  const [mealTime, setMealTime] = useState("")
  const scrollYAnimatedValue = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const [errors, setErrors] = useState({});
  console.log(ingredients);
  // ------------------- Loop ingredients's name -----------------------------
  const renderIngredients = () => {
    return ingredients.map(function (item, i) {
      return (
        <View className="flex-1 flex-row items-center" key={i}>
          <View className="flex-[2.5] flex-col">
            <View className="flex-1 flex-row items-center gap-3" >
              <Octicons className="self-center" name="dot-fill" size={16} color="#6b6969" />
              <Text className="text-lg flex-wrap">{item?.name.charAt(0).toUpperCase() + item?.name.slice(1)}</Text>
            </View>
          </View>
          <View className="flex-1 flex-col items-center">
            <Text style={styles.amount}>{item.quantity}</Text>
          </View>
          <View className="flex-1 flex-col justify-end">
            <Text className="text-center flex-wrap" style={styles.amount}>{item.unit}</Text>
          </View>
        </View>
      );
    })
  };

  const renderSteps = () => {
    return steps.map(function (item, i) {
      return (
        <View key={i}>
          <View className="flex-1 flex-row mb-3 gap-1" >
            <Text className="text-lg font-semibold" >{i + 1}. </Text>
            <View className="flex-1 pt-1">
              <Text className="text-lg flex-wrap leading-6">{item}</Text>
            </View>
          </View>

        </View>
      );
    })
  };

  // ---------- ปุ่ม bookmark ---------------
  //  const pressBookmark = (id) => {
  //   toggleBookmarkHandler(id)
  //   if (bookmark === false) {
  //     Alert.alert("เพิ่ม \"" + name + "\" เข้า Bookmark")
  //   } else {
  //     Alert.alert("ลบ \"" + name + "\" ออกจาก Bookmark")
  //   }
  //   setBookmark(!bookmark);
  // };

  const headerHeight = scrollYAnimatedValue.interpolate(
    {
      inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    });

  const headerBackgroundColor = scrollYAnimatedValue.interpolate(
    {
      inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
      outputRange: ['#000', '#000'],
      extrapolate: 'clamp'
    });

    const handleOnchange = (text, input) => {
      setInputs((prevState) => ({ ...prevState, [input]: text }));
    };
  
    const handleError = (error, input) => {
      setErrors((prevState) => ({ ...prevState, [input]: error }));
    };


  return (
    <TouchableWithoutFeedback>
      <View style={{
				flex: 1,
				marginTop: insets.top,
				backgroundColor: COLORS.white,
			}}>

      <View style={styles.container} >
        <ScrollView
          contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollYAnimatedValue } } }], { useNativeDriver: false }
          )}>
            <Pressable>

            

          <View style={[styles.foodCard]}>

            {/* carbohydrate card */}
            <View style={styles.square}>
              <Text style={styles.typeFood}>Carbs (g)</Text>
              <Image style={styles.typeImage} source={require("../../../assets/carbohydrate-removebg.png")} />
              <Text style={styles.gram}>{carbs}</Text>
            </View>

            {/* carbohydrate card */}
            <View style={styles.square}>
              <Text style={styles.typeFood}>Protein (g)</Text>
              <Image style={styles.typeImage} source={require("../../../assets/protein-removebg.png")} />
              <Text style={styles.gram}>{protein}</Text>
            </View>

            {/* fat card */}
            <View style={styles.square}>
              <Text style={styles.typeFood}>Fats (g)</Text>
              <Image style={styles.typeImage} source={require("../../../assets/fat-removebg.png")} />
              <Text style={styles.gram}>{fat}</Text>
            </View>

          </View>


          <Text style={styles.header}>Ingredients</Text>
          {/* ตัวอย่างที่ลองใส่มา code เหมือนกัน เปลี่ยนแค่ชื่อกับปริมาณที่ใส่ */}

          {/* มายองเนส */}

          <View style={styles.ingredianBox}>

            <View className="flex-1 mx-6">
              <View>
                {renderIngredients()}
              </View>
            </View>

            {/* <View style={[styles.amountBox, { flex: 1 }]}>
            <View>
              {renderIngredient_quantity()}
            </View>
          </View> */}

          </View>

          {/* renderSteps() */}
          {/* ---------------------------- วิธีทำ -------------------------------------------- */}
          <Text style={styles.header}>Cooking Steps</Text>
          <View className="flex-1 mx-6">
            {renderSteps()}
          </View>



          <View style={styles.line} />

          {/* ---------------------- เลือกมื้ออาหาร ----------------------------- */}
          <View className="flex-1 flex-row mt-5">
            {/* <Text style={styles.foodCalBottom}>{cals} Kcal.</Text> */}
            <View className="flex-1 items-center">
              <Dropdowns
                // value={inputs.ingredientUnit}
                // headLabel="Ingredient Category"
                onFocus={() => handleError(null, "meals")}
                data={Data.meals}
                dataType="meals"
                placeholderText="Add Food to Your Meals"
                handleOnchange={handleOnchange}
                error={errors.meals}
              />
            </View>
            {/* <View style={styles.pickerBorder}> */}
              {/* <Picker
              selectedValue={mealTime}
              style={styles.pickerdropdown}
              onValueChange={(itemValue, itemIndex) => setMealTime(itemValue)}

            >
              <Picker.Item label="กรุณาเลือก" value="" />
              <Picker.Item label="อาหารเช้า" value="breakfast" />
              <Picker.Item label="อาหารกลางวัน" value="lunch" />
              <Picker.Item label="อาหารเย็น" value="dinner" />
            </Picker > */}
            {/* </View> */}

          </View>

          <View style={{ alignItems: "center", marginTop: 20, marginBottom: 20 }}>
            {/* <TouchableOpacity
              onPress={() => selectMeals(id, mealTime, kcal)}
              style={styles.btnContainer}>
              <Text style={styles.btnText}>บันทึกลงตารางอาหาร</Text>
            </TouchableOpacity> */}
            <Buttons width={"w-[90%]"} title={"Save"} />
          </View>
          </Pressable>
        </ScrollView>

        {/* ---------------------------- รูปอาหาร ------------------------------------- */}
        <Animated.View style={[styles.animatedHeaderContainer, { height: headerHeight }]}>
          <View style={[styles.item1, { flex: 2 }]}>
            <Image style={styles.foodImage} source={{ uri: image }} />
          </View>
          {/* ---------------------------- กล่องชื่ออาหาร ------------------------------------- */}
          <View className="w-full bg-[#e4efe3] shadow-md shadow-gray-300">
            <View className="flex-col h-24 ml-4">

              <View className="flex-[1.5] flex-row">

                <Text className="flex-[2] mt-3" numberOfLines={1} style={styles.foodName}>{recipeName}</Text>
                <TouchableOpacity className="-mt-2 mr-2"
                onPress={() => pressBookmark(id)}>

                <Ionicons
                  name="bookmark"
                  size={40}
                  // color={bookmark ? "black" : "white"} style={styles.favIcon} />
                  color="black" />

              </TouchableOpacity>
                

              </View>
              <View className="flex-1 flex-row ">
                <View className="flex-[2] flex-row gap-1">
                    <MaterialIcons name="access-time" size={26} color="black" />
                    <Text className="text-lg">{time} min</Text>
                </View>
                  
                  <Text className="flex-1 text-xl text-center font-bold" >{cals} Cals.</Text>
              </View>

            </View>
          </View>

        </Animated.View>

      </View>
      </View>
    </TouchableWithoutFeedback>
  );

}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      justifyContent: "center",
      flexDirection: "column"

    },
    animatedHeaderContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center'
    },
    item: {
      backgroundColor: '#ff9e80',
      margin: 8,
      height: 45,
      justifyContent: 'center',
      alignItems: 'center'
    },
    item2: {
      backgroundColor: "#e4efe3",
      // justifyContent: "center",
      width: "100%"
    },
    itemText: {
      color: 'black',
      fontSize: 16
    },
    item1: {
      backgroundColor: "#fff",
      height: 150,
      width: "100%",

    },
    foodImage: {
      height: "100%",
      width: "100%"
    },
    foodName: {
      width: 260,
      fontSize: 23,
      fontWeight: "bold",
      color: COLORS.darkGreen,
      flexWrap: "wrap",
    },
    foodTime: {
      marginLeft: 20,
      marginTop: 10,
    },
    timeText: {
      fontSize: 18,
      marginTop: -25,
      marginLeft: 30,
      marginBottom: 10
    },
    foodCal: {
      fontSize: 22,
      fontWeight: "bold",
      textAlign: "center",
      // marginTop: 17
    },
    right: {
      backgroundColor: COLORS.white,
    },
    favIcon: {
      marginTop: -6,
    },
    square: {
      width: 110,
      height: 120,
      borderColor: "#b7cbb6",
      borderWidth: 4,
      borderRadius: 10,
      margin: 10,
      marginTop: 20,
      justifyContent: "center",
    },
    typeFood: {
      fontSize: 14,
      fontWeight: "bold",
      alignSelf: "center",
      color: "#6b6969",
      margin: 5
    },
    typeImage: {
      height: "40%",
      width: "55%",
      alignSelf: "center",
    },
    gram: {
      fontSize: 19,
      alignSelf: "center",
      color: "#6b6969",
      margin: 5
    },
    foodCard: {
      backgroundColor: "white",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    ingredianBox: {
      flexDirection: "row",
      margin: 5,
    },
    header: {
      fontSize: 22,
      fontWeight: "bold",
      color: "black",
      marginLeft: 20,
      marginTop: 15,
      marginBottom: 5
    },
    detailIngredian: {
      marginLeft: 40
    },
    amountBox: {
      justifyContent: "center"
    },
    ingredianName: {
      // marginBottom: 1.75,
      fontSize: 18,
      color: "#6b6969",
      // marginTop: -26,
      // marginLeft: 20,
      flexWrap: "wrap"
    },
    amount: {
      fontSize: 18,
      color: "#6b6969",
    },
    stepBox: {
      // flexDirection: "row",
      marginLeft: 40,
      marginRight: 30
    },
    step: {
      flex: 0.07,
      fontSize: 18,
      color: "#6b6969",
      marginTop: 5
    },
    stepDetail: {
      flex: 1,
      fontSize: 18,
      color: "#6b6969",
      marginTop: 5,
      flexWrap: "wrap",
    },
    line: {
      height: 2,
      backgroundColor: "#adacac",
      marginTop: 20
    },
    bottom: {
      flexDirection: "row",
    },
    foodCalBottom: {
      flex: 1,
      fontSize: 25,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 20,
      marginLeft: 40,
      // backgroundColor: "green"
    },
    pickerBorder: {
      flex: 1,
      width: "80%",
      height: 40,
      borderColor: '#8ec18d',
      borderWidth: 2,
      borderRadius: 10,
      marginTop: 20,
      marginRight: 40,
    },
    btnContainer: {
      width: "60%",
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
    pickerdropdown: {
      fontFamily: 'serif',
      fontSize: 18,
      // paddingHorizontal: 10,
      // paddingVertical: 10,
      // borderWidth: 2,
      // borderColor: '#8ec18d',
      color: "#adacac",
      // fontWeight: "bold",
      // borderRadius: 8,
      marginTop: -5,
      // padding: 4,
      // borderStyle: "hidden",
      textAlign: "center"
    }

  });

export default RecipeDetailScreen