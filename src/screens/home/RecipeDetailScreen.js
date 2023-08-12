import { View, Text } from 'react-native'
import React, { useRef, useState } from 'react'
import Animated from 'react-native-reanimated';

const HEADER_MIN_HEIGHT = 100;
const HEADER_MAX_HEIGHT = 300
const RecipeDetailScreen = ({ navigation, route }, props) => {
  const {id, recipeName, cals, time, ingredients, steps, image, carbs, protein, fat} = route.params;
  const [mealTime, setMealTime] = useState("")
  const scrollYAnimatedValue = useRef(new Animated.Value(0)).current;

  // ------------------- Loop ingredients's name -----------------------------
  const renderIn_name = () => {
    return ingredients.map(function (item, i) {
      return (
        <View key={i}>
          <Octicons name="primitive-dot" size={24} color="#6b6969" />
          <Text style={styles.ingredianName}>{item}</Text>
        </View>
      );
    })
  };

  // ------------------- Loop quantity's list -----------------------------
  const renderIngredient_quantity = () => {
    return ingredient_quantity.map(function (item, i) {
      return (
        <View key={i}>
          {/* <Octicons name="primitive-dot" size={24} color="#6b6969"/> */}
          <Text style={styles.amount}>{item}</Text>
        </View>
      );
    })
  };

  const renderSteps = () => {
    return steps.map(function (item, i) {
      return (
        <View key={i}>
          <View style={[{ flexDirection: "row" }]} >
            <Text style={styles.step}>{i + 1}. </Text>
            <Text style={styles.stepDetail}>{item}</Text>
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

  

  return (
    <View>
      <Text>RecipeDetailScreen</Text>
    </View>
  )
}

export default RecipeDetailScreen