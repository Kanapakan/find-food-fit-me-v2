import { StyleSheet, View, Text, Keyboard, TouchableWithoutFeedback, ScrollView, TouchableOpacity, TextInput, FlatList, Alert, PermissionsAndroid, Platform, Linking, Pressable, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import Modal from "react-native-modal";
import Buttons from '../../components/Buttons';
import ImagePicker from 'react-native-image-crop-picker'
import Input from '../../components/Inputs';
import { COLORS } from '../../constants';
import TopTab from '../../components/TopTab';
import BottomSheet from 'reanimated-bottom-sheet';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MyRecipeScreen from './MyRecipeScreen';
import Dropdowns from '../../components/Dropdowns';
import { Data } from '../../../dataJson/data';

import storage from '@react-native-firebase/storage';

const CreateRecipeScreen = ({ route, navigation }, props) => {
	const [inputs, setInputs] = useState({
		recipeName: "",
		time: 0,
		// ingredientName: [],
		step: "",
		protein: 0,
		carbs: 0,
		fat: 0,
		cals: 0,
		imageURL: "",
		ingredientName: "",
		ingredientQuantity: 0,
		ingredientUnit: "",
		ingredientCategory: "",
	});

	const [modalIngredients, setModalIngredients] = useState(false);
	const [modalSteps, setModalSteps] = useState(false);
	const [ingredient_name, setingredient_name] = useState([]);
	const [ingredient_quantity, setingredient_quantity] = useState([]);
	const stepsData = [
		"Bring clam juice and oregano to a boil in a saucepan over medium-high heat. Add shrimp; cook and stir just until shrimp turn pink, about 2 minutes. (They will not be cooked through.) Transfer shrimp to a bowl with a slotted spoon; let cool to room temperature. Reserve liquid.",
		"While the shrimp are cooling, combine tomatoes, cucumbers, celery, onion, and jalapeños in a mixing bowl. Gently mix in reserved cooking liquid, ketchup, lime juice, 2 tablespoons cilantro, and hot sauce until well combined.",
		"Place four whole shrimp in a small bowl; cover with plastic wrap. Chop remaining shrimp into bite-sized pieces; add to vegetable mixture and stir to combine. Cover with plastic wrap. Refrigerate both bowls until thoroughly chilled, 2 to 3 hours.",
		"Place four whole shrimp in a small bowl; cover with plastic wrap. Chop remaining shrimp into bite-sized pieces; add to vegetable mixture and stir to combine. Cover with plastic wrap. Refrigerate both bowls until thoroughly chilled, 2 to 3 hours."
	]

	const ingredientData = [
		{ name: "chicken", category: "meat", quantity: 100, unit: "g" },
		{ name: "cod fillets", category: "meat", quantity: 1, unit: "pound" },
		{ name: "large egg", category: "dairy products", quantity: 1, unit: "-" },
		{ name: "butter", category: "dairy products", quantity: 1, unit: "Tbsp" },
		{ name: "grated onion", category: "herbs and spice", quantity: 1, unit: "Tbsp" },
	]
	const [steps, setSteps] = useState(stepsData);
	const [ingredients, setIngredients] = useState(ingredientData);

	// ---------------- tab --------------------------
	const [showTab, setShowTab] = useState(true)
	const [isLoading, setisLoading] = useState(true);
	const [image, setImage] = useState('https://cdn-icons-png.flaticon.com/512/1048/1048392.png');

	const [errors, setErrors] = useState({});
	const [isVisible, setIsVisible] = useState(false);
	const insets = useSafeAreaInsets();


	// const myRecipe = (useSelector((state) => state.recipes.myRecipe))

	// async function requestPhotoLibraryPermission() {

	// }

	const takePhotoFromCamera = async () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

	const choosePhotoFromLibrary = async () => {
		ImagePicker.openPicker({
			width: 1200,
			height: 780,
			cropping: true,
		}).then((image) => {
			console.log(image);
			const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
			setImage(imageUri);
			// this.bs.current.snapTo(1);
		});
	}

	const openModalIngredients = () => {
		setModalIngredients(true);
		// renderIngredientList(ingredient_name, ingredient_quantity)
	}

	const closeModalIngredients = () => {
		setModalIngredients(false);
		setInputs((prevState) => ({ ...prevState, ['ingredientName']: "" }));
	}

	const openModalSteps = () => {
		setModalSteps(true);
	}

	const closeModalSteps = () => {
		setModalSteps(false);
		setInputs((prevState) => ({ ...prevState, ['step']: "" }));
	}

	const showMyRecipeTab = () => {
		this.bs.current.snapTo(1)
		setShowTab(true)
		
	}

	const addStep = () => {
		if (inputs.step !== "") {
			const updatelist = [...steps]
			updatelist.push(inputs.step)
			setSteps(updatelist)
			setInputs((prevState) => ({ ...prevState, ['step']: "" }));
			// console.log('steps', steps);
		} else {
			Alert.alert("Please enter food step.")
		}
		console.log(inputs.step);
	}

	const delStep = (step) => {
		const index = steps.findIndex(recipe => recipe === step)
		const updateStep = [...steps];
		updateStep.splice(index, 1);
		setSteps(updateStep)
		// console.log("del", step)
	}

	const addIngreList = () => {
		if (inputs.ingredientName !== "" && inputs.ingredientQuantity !== 0
			&& inputs.ingredientCategory != "" && inputs.ingredientUnit != "") {
			const ingredientArray = {
				name: inputs.ingredientName,
				quantity: inputs.ingredientQuantity,
				category: inputs.ingredientCategory,
				unit: inputs.ingredientUnit
			}
			setIngredients([...ingredients, ingredientArray]);
			setInputs((prevState) => ({ ...prevState, ['ingredientName']: "" }));
			setInputs((prevState) => ({ ...prevState, ['ingredientQuantity']: 0 }));
			setInputs((prevState) => ({ ...prevState, ['ingredientCategory']: "" }));
			setInputs((prevState) => ({ ...prevState, ['ingredientUnit']: "" }));
			console.log("add ", ingredientArray)
		} else {
			Alert.alert("กรุณาใส่ข้อมูลวัตถุดิบให้ครบถ้วน")
		}
		console.log("all new ", ingredients)
	}

	const delIngredient = (item) => {
		const index = ingredients.findIndex(ingredient => ingredient === item)
		const updateIngredients = [...ingredients];
		updateIngredients.splice(index, 1);
		setIngredients(updateIngredients)
		console.log('del', item)
	}

	// const createNewRecipe = () => {

	// }

	const handleOnchange = (text, input) => {
		setInputs((prevState) => ({ ...prevState, [input]: text }));
	};

	const handleError = (error, input) => {
		setErrors((prevState) => ({ ...prevState, [input]: error }));
	};


	const renderSteps = () => {
		return (
			<View>
				{steps.map((item, index) => (
					<View key={index} className="w-full flex-row self-center border-b-2 mb-2">
						<View className="flex-[10] mb-2 flex-row gap-[0.1] mr-4 ">
							<Text className="text-sm font-semibold" >{index + 1}. </Text>
							<Text className="text-sm" >{item}</Text>
						</View>
						<TouchableOpacity className="flex-1 items-end" onPress={() => delStep(item)}>
							<Icon name="delete" style={styles.delIngredient} />
						</TouchableOpacity>
					</View>
				))}
			</View>
		)

	}

	const renderIngredientList = () => {
		return (
			<View>
				{ingredients.map((item, index) => (
					<View key={index} className="flex-1 flex-col self-center border-b-2 mb-2">
						<View className="w-full flex-row">
							<View className="flex-[11] flex-row gap-5 mr-4 ">
								<View className="flex-[1.5] flex-row">
									<Text className="text-sm font-semibold" >{index + 1}. </Text>
									<Text className="text-sm" >{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Text>
								</View>
								<View className="flex-1 flex-row">
									<Text className="flex-1 text-sm text-center" >{item.quantity}</Text>
									<Text className="flex-1 text-sm text-center" >{item.unit}</Text>
								</View>
							</View>

							<TouchableOpacity className="flex-1 items-end" onPress={() => delIngredient(item)}>
								<Icon name="delete" style={styles.delIngredient} />
							</TouchableOpacity>
						</View>
						<Text className="flex-1 text-sm mb-2" >({item.category.charAt(0).toUpperCase() + item.category.slice(1)})</Text>
					</View>
				))}
			</View>
		)
	}

	const clickOutside = () => {
		// bs.current.snapTo(1)
		Keyboard.dismiss
		setIsVisible(false)
	}

	renderInner = () => (
		<TouchableWithoutFeedback onPress={() => bs.current.snapTo(1)}>
		<View style={styles.panel}>
			<View className=" items-end">
				<Icon
					onPress={() => this.bs.current.snapTo(1)}
				name='window-close'
				style={{ color: COLORS.darkBlue, fontSize: 22 }}
			/>
			</View>
			
			
			<View style={{ alignItems: 'center' }}>
				<Text style={styles.panelTitle}>Upload Photo</Text>
				<Text style={styles.panelSubtitle}>Choose Your Recipe Picture</Text>
			</View>
			{/* <TouchableOpacity style={styles.panelButton}>
			<Text style={styles.panelButtonTitle}>Take Photo</Text>
		  </TouchableOpacity> */}
			<View className="flex-col">
				<View className="mb-3">

					<Buttons width={"w-['90'%]"} title={'Take Photo'} action={takePhotoFromCamera}/>
				</View>
				<View>

					<Buttons width={"w-['90'%]"} title={'Choose From Library'} action={choosePhotoFromLibrary} />
				</View>
			</View>
		</View>
		</TouchableWithoutFeedback>
	);

	bs = React.createRef();


	return (
		<TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
			<View style={{
				flex: 1,
				marginTop: insets.top,
				backgroundColor: COLORS.white,
			}}>
				<BottomSheet
					ref={this.bs}
					snapPoints={[260, 0]}
					renderContent={this.renderInner}
					renderHeader={this.renderHeader}
					initialSnap={1}
					enabledGestureInteraction={true}
					isVisible={isVisible}
					modalProps={{ onRequestClose: () => { setIsVisible(false)}}}
				/>


				{/* ------------------ Modal 1 --------------------------- */}
				<Modal
					transparent={true}
					isVisible={modalIngredients}
					statusBarTranslucent={true}
					animationInTiming={500}
					animationOutTiming={1000}
				>
					<View className="flex-1  items-center">
						<TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
							<View style={styles.modalView}>
								<View className="flex-1 flex-col w-full">
									<TouchableOpacity className="self-end">
										<Icon name="close" style={{ color: COLORS.black, fontSize: 22, }} onPress={closeModalIngredients} />
									</TouchableOpacity>
									<View className="flex-1 items-center">
										<Text style={{ color: COLORS.darkGreen, fontSize: 20, textAlign: "center", fontWeight: "bold" }}>
											Cooking Ingredients
										</Text>
										<View className="flex-1 flex-col w-full mt-2">
											<View className="flex-1 flex-col items-center">
												<View className="flex-[2.15] items-center flex-col w-full">
													<View className="flex-1 flex-row w-full mt-4">
														<View className="flex-[1.5] items-center">
															<Input
																value={inputs.ingredientName}
																onChangeText={(text) => handleOnchange(text, "ingredientName")}
																onFocus={() => handleError(null, "ingredientName")}
																// iconName={'shaker'}
																placeholder="Ingredient name"
																error={errors.ingredientName}
															/>
														</View>

														<View className="flex-1 items-center">
															<Dropdowns
																value={inputs.ingredientCategory}
																// headLabel="Ingredient Category"
																onFocus={() => handleError(null, "ingredientCategory")}
																data={Data.ingredient_categories}
																dataType="ingredientCategory"
																handleOnchange={handleOnchange}
																placeholderText="Category"
																error={errors.ingredientCategory}
															/>
														</View>
													</View>
													<View className="flex-1 flex-row w-full mt-3 mb-3">
														<View className="flex-[1] items-center">
															<Input
																value={inputs.ingredientQuantity}
																onChangeText={(text) => handleOnchange(text, "ingredientQuantity")}
																onFocus={() => handleError(null, "ingredientQuantity")}
																keyboardType="number-pad"
																placeholder="Quantity"
																error={errors.ingredientQuantity}
															/>
														</View>

														<View className="flex-1 items-center">
															<Dropdowns
																value={inputs.ingredientUnit}
																// headLabel="Ingredient Category"
																onFocus={() => handleError(null, "ingredientUnit")}
																data={Data.ingredient_units}
																dataType="ingredientUnit"
																placeholderText="Unit"
																handleOnchange={handleOnchange}
																error={errors.ingredientUnit}
															/>
														</View>
													</View>
													<View className="flex-1 w-full items-center mb-3">
														<Buttons width={'w-[50%]'} title={'Add ingredients'} action={addIngreList} />
													</View>
												</View>

												{steps &&
													<ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-[4] flex-col w-full">
														<Pressable>
															<View style={styles.square}>
																{renderIngredientList()}
															</View>
														</Pressable>
													</ScrollView>}
											</View>
										</View>
									</View>
								</View>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</Modal>

				{/* ------------------ Modal 2 --------------------------- */}
				<Modal
					animationType="slide"
					transparent={true}
					isVisible={modalSteps}
					statusBarTranslucent={true}
					animationInTiming={500}
					animationOutTiming={1000}
				>
					<View className="flex-1 justify-center items-center">
						<TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
							<View style={styles.modalView}>
								<View className="flex-1 flex-col w-full">
									<TouchableOpacity className="self-end">
										<Icon name="close" style={{ color: COLORS.black, fontSize: 22, }} onPress={closeModalSteps} />
									</TouchableOpacity>
									<View className="flex-1 items-center">
										<Text style={{ color: COLORS.darkGreen, fontSize: 20, textAlign: "center", fontWeight: "bold" }}>
											Cooking steps
										</Text>
										<View className="flex-1 flex-col w-full">
											<View className="flex-1 flex-col items-center mt-4 h-36">
												<Input
													value={inputs.step}
													onChangeText={(text) => handleOnchange(text, "step")}
													onFocus={() => handleError(null, "step")}
													iconName={'shaker'}
													placeholder="Enter food step"
													multiline
													numberOfLines={4}
													error={errors.step}
												/>
												<View className="mb-3 w-full items-center">

													<Buttons width={'w-[30%]'} title={'Add step'} action={addStep} />
												</View>
												{steps &&
													<ScrollView className="flex-1 flex-col w-full">
														<Pressable>
															<View style={styles.square}>
																{renderSteps()}
															</View>
														</Pressable>
													</ScrollView>}

											</View>
										</View>
										{/* <Buttons width={'w-[90%]'} title={'Save'} /> */}
									</View>
								</View>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</Modal>

				<View
					style={{
						width: "100%",
						marginLeft: "auto",
						marginRight: "auto"
					}}
				>
					<View
						style={{
							flexDirection: "row",
							height: 50,
							position: "relative"
						}}
					>
						<TopTab
							tabTitle={"My Recipes"}
							showTab={showTab}
							setshowTab={setShowTab}
							onPress={() => showMyRecipeTab()}
						/>
						<TopTab
							tabTitle={"Create New Recipe"}
							showTab={!showTab}
							setshowTab={setShowTab}
							onPress={() => setShowTab(false)}
						/>
					</View>
				</View>
				{/* ------------------- Tab 1 ------------------ */}
				{showTab ?
					<MyRecipeScreen
					navigation={navigation}
					/>
					:

					// ----------------------- Tab 2 --------------------------------------
					<ScrollView style={styles.container}>
						<TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
							<View className="flex-1 h-52 w-auto bg-gray-600 justify-center">
								<ImageBackground
									source={{
										uri: image,
									}}
									className="flex-1 object-cover">
									<View
										className="flex-1 justify-center items-center">
										<Icon
											name="camera"
											size={35}
											color="#fff"
											style={{
												opacity: 0.7,
												alignItems: 'center',
												justifyContent: 'center',
												borderWidth: 1,
												borderColor: '#fff',
												borderRadius: 10,
											}}
										/>
									</View>
								</ImageBackground>
							</View>
						</TouchableOpacity>
						<Pressable onPress={() => this.bs.current.snapTo(1)}>
							<View className="flex-1 flex-col mt-3">
								<View className="flex-1 flex-col items-center">
									<Input
										value={inputs.recipeName}
										onChangeText={(text) => handleOnchange(text, "recipeName")}
										onFocus={() => handleError(null, "recipeName")}
										iconName="pasta"
										label="Food name"
										placeholder="Enter food name"
										error={errors.recipeName}
									/>

									<Input
										value={inputs.time}
										onChangeText={(text) => handleOnchange(text, "time")}
										onFocus={() => handleError(null, "time")}
										iconName="clock-time-eight-outline"
										label="Time"
										placeholder="Enter cook time (min)"
										keyboardType="decimal-pad"
										error={errors.time}
									/>
									<View className="mb-2"></View>
									<Buttons width={'w-[90%]'} title={'Show ingredients'} action={openModalIngredients} />
									<View className="mt-5"></View>
									<Buttons width={'w-[90%]'} title={'Show steps'} action={openModalSteps} />

									<Text className="text-lg mt-5 mb-2 font-semibold text-gray-600">Nutrition Facts (per serving)</Text>
									<View className="flex-1 flex-row mx-3">
										<View className="flex-1 items-center">
											<Input
												value={inputs.protein}
												onChangeText={(text) => handleOnchange(text, "protein")}
												onFocus={() => handleError(null, "protein")}
												label="Protein"
												placeholder="Protein (g)"
												keyboardType="decimal-pad"
												error={errors.protein}
											/>
										</View>
										<View className="flex-1 items-center">
											<Input
												value={inputs.carbs}
												onChangeText={(text) => handleOnchange(text, "carbs")}
												onFocus={() => handleError(null, "carbs")}
												label="Carbs"
												placeholder="Carbs (g)"
												keyboardType="decimal-pad"
												error={errors.carbs}
											/>
										</View>
										<View className="flex-1 items-center">
											<Input
												value={inputs.fat}
												onChangeText={(text) => handleOnchange(text, "fat")}
												onFocus={() => handleError(null, "fat")}
												label="Fat"
												placeholder="Fat (g)"
												keyboardType="decimal-pad"
												error={errors.fat}
											/>
										</View>
									</View>
									<View className="flex-1 w-full items-center">
										<Input
											value={inputs.cals}
											onChangeText={(text) => handleOnchange(text, "cals")}
											onFocus={() => handleError(null, "cals")}
											iconName="calculator"
											label="Calories (Optional)"
											placeholder="Enter food calories (Optional)"
											keyboardType="decimal-pad"
											error={errors.cals}
										/>
									</View>

								</View>
								<View className="flex-1 items-center mb-3" >
									<Buttons width={'w-[90%]'} title={'Create'}/>
								</View>
							</View>
						</Pressable>
					</ScrollView>}

			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	square: {
		width: "90%",
		// backgroundColor: "#8ec18d",
		// borderRadius: 10,
		alignSelf: 'center',
		marginTop: 5,
		// borderWidth: 5,
		// borderColor: '#8ec18d',

	},
	delIngredient: {
		fontSize: 28,
		fontWeight: "bold",
		color: COLORS.darkGreen
	},
	panel: {
		padding: 21,
		backgroundColor: COLORS.lightGreen,
		shadowColor: COLORS.black,
		shadowOffset: { width: -1, height: -6 },
		shadowRadius: 2,
		shadowOpacity: 0.4,
		// paddingTop: 60,
		// borderTopLeftRadius: 20,
		// borderTopRightRadius: 20,
	},
	header: {
		backgroundColor: COLORS.blue,
		shadowColor: '#333333',
		shadowOffset: { width: -1, height: -3 },
		shadowRadius: 2,
		shadowOpacity: 0.4,
		// elevation: 5,
		paddingTop: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	panelTitle: {
		fontSize: 27,
		height: 35,
	},
	panelSubtitle: {
		fontSize: 14,
		color: 'gray',
		height: 30,
		marginBottom: 10,
	},
	panelButton: {
		padding: 13,
		borderRadius: 10,
		backgroundColor: '#FF6347',
		alignItems: 'center',
		marginVertical: 7,
	},
	panelButtonTitle: {
		fontSize: 17,
		fontWeight: 'bold',
		color: 'white',
	},
	modalView: {
		flex: 1,
		height: 600,
		marginVertical: 30,
		width: '100%',
		backgroundColor: 'white',
		borderRadius: 20,
		paddingVertical: 20,
		paddingHorizontal: 15,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},

});

export default CreateRecipeScreen