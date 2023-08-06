import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

const MyRecipeScreen = () => {
  return (
    <ScrollView className="flex-1">
      <Text>This is my recipe screen</Text>
						<KeyboardAwareScrollView className="flex-1">
							{/* ----------------------- Tab2 --------------------------------- */}
							{/* <View style={styles.headBox} >
								<Text style={styles.headText}>เมนูอาหารของคุณ</Text>

							</View> */}
							{/* {myRecipe.length > 0 ? 
                  <NewRecipeList
                      style={{ width: "100%", height: "100%" }}
                      listData={myRecipe}
                      objIn={objIn2}
                      navigation={navigation}
                    /> : 
                    <Text style={styles.headText2}>ไม่พบเมนูอาหาร</Text>} */}
						</KeyboardAwareScrollView>
					</ScrollView>
  )
}

export default MyRecipeScreen