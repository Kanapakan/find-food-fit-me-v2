import React from "react";
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import RecipeItem from "./RecipeItem";

const RecipeList = (props) => {
	const renderRecipeItem = (itemData) => {
		const { id, name, kcal, time, ingredient_quantity, ingredient_name, ingredient_type, steps, imageURL, originalURL, carbs, protein, fats } = itemData.item

		return (
			<View>
				<RecipeItem
					name={name}
					kcal={kcal}
					time={time}
					image={imageURL}
					onSelectRecipe={() => {
						console.log('hi');
						// เขียนโค้ดเพิ่ม
						props.navigation.navigate("RecipeDetail", { itemData })
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

export default RecipeList;