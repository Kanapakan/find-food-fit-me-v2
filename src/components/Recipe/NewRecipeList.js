import React from "react";
import {Text, View, StyleSheet, Image, TextInput, TouchableOpacity,FlatList, } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import NewRecipe from "./NewRecipe";


const NewRecipeList = (props) => {
    const renderRecipeItem = (itemData) => {
        const {id, recipeName, cals, time, ingredients, steps, image, carbs, protein, fat} = itemData.item

        return (
            <View className="flex-1">
                <NewRecipe
                data={itemData.item}
                
                navigation={props.navigation}
                onSelectRecipe={() => {
                    // เขียนโค้ดเพิ่ม
                    props.navigation.navigate("RecipeDetail", itemData.item)
                  }}
                />
            </View>
        )
    }
    return (
        <View style={styles.list}>
          <FlatList
            style={{ width: "100%", height: "100%" }}
            data={props.listData}
            renderItem={renderRecipeItem}
          />
        </View>
      );
    };


    const styles = StyleSheet.create({
        list: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
      });

export default NewRecipeList;