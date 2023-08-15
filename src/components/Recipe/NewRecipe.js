import React from "react";
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from "../../constants";

const NewRecipe = (props) => {
	const {id, recipeName, cals, time, ingredients, steps, image, carbs, protein, fat} = props.data
	// const dispatch = useDispatch();
	// const delRecipe = () => {
	//     dispatch(createNewRecipe(props.data, "del"));
	//     // console.log('del', props.data)


	//   }

	return (
		<View style={styles.container}>
			{/* <TouchableOpacity onPress={props.onSelectRecipe} > */}
			<TouchableOpacity onPress={props.onSelectRecipe}>
				<View className="flex-1 flex-row my-2 mx-3">
					<View className="flex-1">
						<View style={styles.foodImage} >
							<Image className="flex-1 object-contain w-full h-full" source={{ uri: image }} />
						</View>
					</View>
					<View className="flex-[3]">
						<View className="flex-1 flex-col ml-2">
							<View className="flex-1 flex-row">

								<Text className="mt-2"  style={styles.foodName} numberOfLines={1} >{recipeName}</Text>

								<View className="flex-1 flex-row justify-end gap-2">
									<TouchableOpacity onPress={() => props.navigation.navigate("UpdateNewMenu", { data: props.data, ingredients: ingredients })}>
										<FontAwesome name="pencil-square-o" color="#adacac" style={styles.updateMeal} />
									</TouchableOpacity>

									<TouchableOpacity >
										<Ionicons name="ios-trash-bin-sharp" color="#adacac" style={styles.delMeal} />
									</TouchableOpacity>
								</View>

							</View>
							<View className="flex-1 mt-5 flex-row items-center">
								<MaterialIcons name="access-time" size={24} color="black" />
								<Text className="flex-1 ml-1 text-sm">{time} min</Text>
								<View>
									<Text style={styles.foodCal}>{cals} Cals.</Text>
								</View>
							</View>
						</View>
					</View>

					{/* <View style={styles.foodBox}>
						<Text numberOfLines={1} style={styles.foodName}>{props.recipeName}</Text>
						<View style={styles.foodTime}>
							<MaterialIcons name="access-time" size={26} color="black" />
							<Text style={styles.timeText}>{props.time} นาที</Text>
						</View>
					</View>
					<View className="flex-1 flex-col">
						<View style={styles.box2}>
							<TouchableOpacity onPress={() => props.navigation.navigate("UpdateNewMenu", { data: props.data, ingredients: props.ingredients })}>
								<FontAwesome name="pencil-square-o" color="#adacac" style={styles.updateMeal} />
							</TouchableOpacity> */}

					{/* <TouchableOpacity onPress={() => delRecipe()}> */}
					{/* <TouchableOpacity >

								<Ionicons name="ios-trash-bin-sharp" color="#adacac" style={styles.delMeal} />
							</TouchableOpacity>
						</View>
						<View className="flex-1 flex-row">

						<Text style={styles.foodCal}>{props.cals} Cals.</Text>
						</View>
					</View> */}

				</View>
			</TouchableOpacity>
			{/* <View style={styles.line} /> */}


		</View>

	)
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
		borderBottomWidth: 2,
		borderBottomColor: COLORS.green
	},
	headBox: {
		backgroundColor: "#e3e3e3",
		//ตอนเอาลง tab เอา marginTop ออกด้วยนะ
		alignItems: "flex-start",
		padding: 8
	},
	headText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#000",
		marginLeft: 10
	},
	foodImage: {
		flex: 1,
		width: '100%',
		height: 90,
		// marginLeft: 10,
		backgroundColor: COLORS.grey,
		borderRadius: 10,
		overflow: "hidden"
	},
	foodBox: {
		flexDirection: 'column',
		flex: 2,
	},
	box2: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 8
	},
	foodName: {
		flex: 2,
		// width: 180,
		fontSize: 16,
		fontWeight: "bold",
		// marginLeft: 10,
		// marginTop: 10,
		flexWrap: "wrap",
	},
	foodCal: {
		fontSize: 18,
		fontWeight: "bold",
		// marginTop: 16,
		// flex: 1,
		// marginRight: 10
	},
	foodTime: {
		flex: 1,
		marginLeft: 10,
		marginTop: 20,
	},
	delMeal: {
		fontSize: 35,
		fontWeight: "bold",
		// marginTop: 2,
		// marginLeft: 15,
		// flex: 1,
	},
	updateMeal: {
		fontSize: 35,
		fontWeight: "bold",
		marginTop: 2,
		// marginRight: 5,
		// flex: 1,
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
	}

});
export default NewRecipe;