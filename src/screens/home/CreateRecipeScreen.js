import { View, Text, Keyboard, TouchableWithoutFeedback, ScrollView, TouchableOpacity, TextInput, FlatList, Alert, PermissionsAndroid, Platform, Linking } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import Modal from "react-native-modal";
import Buttons from '../../components/Buttons';
import ImagePicker from 'react-native-image-crop-picker'
import Input from '../../components/Inputs';

const CreateRecipeScreen = ({ route, navigation }, props) => {
	const [inputs, setInputs] = useState({
		foodName: "",
		time: 0,
		ingredientName: [],
		step: "",
		protein: 0,
		carbs: 0,
		fat: 0,
		cals: 0,
		imageURL: "",
		ingredientName: "",
		ingredientQuantity: "",
		unit: "",
		category: "",



	});

	const [name, setname] = useState("");
	const [time, settime] = useState(0);
	const [protein, setprotein] = useState(0);
	const [fats, setfats] = useState(0);
	const [carbs, setcarbs] = useState(0);
	const [kcal, setkcal] = useState(0);
	const [imageURL, setimageURL] = useState("");
	const [modal, setmodal] = useState(false);
	const [modal2, setmodal2] = useState(false);
	const [modal3, setmodal3] = useState(false);
	const [ingred_name, setingred_name] = useState("");
	const [ingredient_quan, setingredient_quan] = useState("");
	const [ingredient_name, setingredient_name] = useState([]);
	const [ingredient_quantity, setingredient_quantity] = useState([]);
	const [objIn, setObjIn] = useState([]);
	const [objIn2, setObjIn2] = useState([]);
	// --------------- วิธีทำ -------------------------
	const [howto, sethowto] = useState("");
	const [steps, setsteps] = useState([]);
	// ---------------- tab --------------------------
	const [showTab1, setShowTab1] = useState(true)
	const [isLoading, setisLoading] = useState(true);
	const [image, setImage] = useState(null);
	const [errors, setErrors] = useState({});

	// const myRecipe = (useSelector((state) => state.recipes.myRecipe))

	// async function requestPhotoLibraryPermission() {

	// }

	const choosePhotoFromLibrary = async () => {
		ImagePicker.openPicker({
			width: 1200,
			height: 780,
			cropping: true,
		}).then((image) => {
			console.log(image);
			const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
			setImage(imageUri);
		});
	}


	const openModal = () => {
		setmodal(true);
		renderFlatList(ingredient_name, ingredient_quantity)
	}
	const openModal2 = () => {
		setmodal2(true);
		// renderFlatList(ingredient_name, ingredient_quantity)
	}

	const addHowto = (howto) => {
		if (howto != "") {
			const updatelist = [...steps]
			updatelist.push(howto)
			setsteps(updatelist)
			sethowto("")
		} else {
			Alert.alert("กรุณาใส่วิธีทำ")
		}
	}

	const addIngreList = (ingred_name, ingredient_quan) => {
		if (ingred_name != "" && ingredient_quan != "") {
			const ingedient = {
				ingredient_name: ingred_name,
				ingredient_quantity: ingredient_quan
			}
			const objList = [...objIn]
			objList.push(ingedient)
			setObjIn(objList)
			const listname = [...ingredient_name]
			const listquan = [...ingredient_quantity]
			listname.push(ingred_name)
			setingredient_name(listname)

			listquan.push(ingredient_quan)
			setingredient_quantity(listquan)

			setingred_name('')
			setingredient_quan("")

		} else {
			Alert.alert("กรุณาใส่ข้อมูลวัตถุดิบให้ครบถ้วน")
		}
	}

	const delIngedient = (item) => {
		const index = objIn.findIndex(recipe => recipe == item)
		const indexNameList = ingredient_name.findIndex(recipe => recipe == item.ingredient_name)
		const indexQuanList = ingredient_name.findIndex(recipe => recipe == item.ingredient_quantity)
		const updateobjIn = [...objIn];
		const updateobjInName = [...ingredient_name];
		const updateobjInQuan = [...ingredient_quantity];
		updateobjIn.splice(index, 1);
		updateobjInName.splice(indexNameList, 1)
		updateobjInQuan.splice(indexQuanList, 1)

		setObjIn(updateobjIn)
		setingredient_name(updateobjInName)
		setingredient_quantity(updateobjInQuan)
		// console.log('del', objIn)
	}
	const delHowto = (howto) => {
		const index = steps.findIndex(recipe => recipe == howto)
		const updatehowto = [...steps];
		updatehowto.splice(index, 1);
		setsteps(updatehowto)
		// console.log("del", howto)
	}

	const handleOnchange = (text, input) => {
		setInputs((prevState) => ({ ...prevState, [input]: text }));
	};

	const handleError = (error, input) => {
		setErrors((prevState) => ({ ...prevState, [input]: error }));
	};


	const renderFlatListHowto = (steps) => {
		// console.log(steps)
		return (
			<FlatList
				data={steps}
				renderItem={({ item, index }) => (
					<View style={styles.checkContainer}>
						<Text style={styles.ingredientName}>{index + 1}. {item}</Text>
						{/* <Text style={styles.ingredientName}>{data}</Text> */}
						<TouchableOpacity onPress={() => delHowto(item)}>
							{/* <Ionicons name="ios-trash-bin-sharp" color="#000" style={styles.delIngredient} /> */}
						</TouchableOpacity>
					</View>

				)}
			/>
		)

	}

	const renderFlatList = (ingredient_name, ingredient_quantity, objIn) => {

		return (
			<FlatList

				data={objIn}
				renderItem={({ item }) => (
					<View style={styles.checkContainer}>
						<Text style={styles.ingredientName}>{item.ingredient_name}</Text>
						<Text style={styles.ingredientName}>{item.ingredient_quantity}</Text>
						{/* <Text style={styles.ingredientName}>{data}</Text> */}
						<TouchableOpacity onPress={() => delIngedient(item)}>
							{/* <Ionicons name="ios-trash-bin-sharp" color="#000" style={styles.delIngredient} /> */}
						</TouchableOpacity>
					</View>

				)}
			/>
		)
	}

	// console.log(Object.values(objIn))


	return (
		<TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
			<SafeAreaView style={styles.container}>

				{/* ------------------ Modal 1 --------------------------- */}
				<Modal
					transparent={true}
					isVisible={modal}
					style={{
						flex: 1,
						margin: 0,
						justifyContent: "center",
						alignItems: "center"
					}}
				>
					<View
						style={{
							height: 500, //Fixed View size
							width: 350, //Fixed View size
							backgroundColor: "#fff",

						}}
					>
						<TouchableOpacity >
							{/* <Ionicons name="close" size={27} color="black" style={{marginTop: 10, paddingLeft: 300}} onPress={() => setmodal(false)} /> */}
						</TouchableOpacity>

						<Text style={{ color: "#4A6D7C", fontSize: 20, textAlign: "center", fontWeight: "bold" }}>
							เพิ่มวัตถุดิบของคุณ
						</Text>

						<View style={styles.containermodal}>
							<View style={{ flex: 1, flexDirection: "row" }}>
								<View style={{ flex: 1 }}>
									<Text style={styles.headerText}>วัตถุดิบ</Text>
									{/* <TextInput
                      style={styles.boxModal}
                      placeholder="ชื่อวัตถุดิบ"
                      keyboardType="default"
                      value={ingred_name}
                      onChangeText={setingred_name}
                    /> */}
								</View>

								<View style={{ flex: 1 }}>
									<Text style={styles.headerText}>ปริมาณ</Text>
									{/* <TextInput
                        style={styles.boxModal2}
                        placeholder="ปริมาณ"
                        keyboardType="default"
                        value={ingredient_quan}
                        onChangeText={setingredient_quan}
                      /> */}
								</View>
							</View>

							<TouchableOpacity onPress={() => addIngreList(ingred_name, ingredient_quan)}
								style={styles.btnAddIng}>
								<Text style={{
									fontSize: 18,
									color: "#fff",
									fontWeight: "bold",
									alignSelf: "center"
								}}>เพิ่ม</Text>
							</TouchableOpacity>

						</View>
						<View style={{ flex: 3.4 }}>
							<View style={styles.square}>
								{renderFlatList(ingredient_name, ingredient_quantity, objIn)}
							</View>

						</View>

					</View>
				</Modal>

				{/* ------------------ Modal 2 --------------------------- */}
				<Modal
					transparent={true}
					isVisible={modal2}
					style={{
						flex: 1,
						margin: 0,
						justifyContent: "center",
						alignItems: "center"
					}}
				>
					<View
						style={{
							height: 500, //Fixed View size
							width: 350, //Fixed View size
							backgroundColor: "#fff",

						}}
					>
						<TouchableOpacity >
							{/* <Ionicons name="close" size={27} color="black" style={{marginTop: 10, paddingLeft: 300}} onPress={() => setmodal2(false)} /> */}
						</TouchableOpacity>

						<Text style={{ color: "#4A6D7C", fontSize: 20, textAlign: "center", fontWeight: "bold" }}>
							เพิ่มวิธีทำอาหาร
						</Text>

						<View style={styles.containermodal}>
							<View style={{ flex: 1, flexDirection: "row" }}>
								<View style={{ flex: 1 }}>
									<Text style={styles.headerText}>วิธีทำ</Text>
									{/* <TextInput
                      style={styles.boxModal}
                      placeholder="วิธีทำ"
                      keyboardType="default"
                      value={howto}
                      onChangeText={sethowto}
                    /> */}
								</View>


							</View>

							<TouchableOpacity onPress={() => addHowto(howto)}
								style={styles.btnAddIng}>
								<Text style={{
									fontSize: 18,
									color: "#fff",
									fontWeight: "bold",
									alignSelf: "center"
								}}>เพิ่ม</Text>
							</TouchableOpacity>

						</View>
						<View style={{ flex: 3.4 }}>
							<View style={styles.square}>
								{renderFlatListHowto(steps)}
							</View>

						</View>

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
							// marginTop: 40,
							// marginBottom: 20,
							height: 50,
							position: "relative"
						}}
					>
						{/* ----------------------- Tab1 --------------------------------- */}
						<TouchableOpacity
							style={{
								flex: 1,
								justifyContent: "center",
								alignItems: "center",
								borderBottomWidth: 3,
								borderBottomColor: showTab1 == true ? "#547F53" : "#fff",
								backgroundColor: "#fff",

							}}
							onPress={() => setShowTab1(true)}
						>
							<Text
								style={{
									color: showTab1 == true ? "#000" : "#adacac",
									fontSize: 16
								}}
							>
								เมนูอาหารของคุณ
							</Text>
						</TouchableOpacity>

							{/* ----------------------- Tab2 --------------------------------- */}
						<TouchableOpacity
							style={{
								flex: 1,
								justifyContent: "center",
								alignItems: "center",
								borderBottomWidth: 3,
								borderBottomColor: showTab1 == false ? "#547F53" : "#fff",
								backgroundColor: "#fff",
							}}
							onPress={() => setShowTab1(false)}

						>
							<Text
								style={{
									color: showTab1 == false ? "#000" : "#adacac",
									fontSize: 16
								}}
							>
								สร้างเมนูใหม่
							</Text>
						</TouchableOpacity>
					</View>
				</View>
				{/* ------------------- Tab 1 ------------------ */}
				{showTab1 ?
					<ScrollView>
						<KeyboardAwareScrollView style={styles.container}>
							{/* ----------------------- Tab2 --------------------------------- */}
							<View style={styles.headBox} >
								<Text style={styles.headText}>เมนูอาหารของคุณ</Text>

							</View>
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
					:

					// ----------------------- Tab 2 --------------------------------------
					<ScrollView style={styles.container}>
							<View style={styles.headBox} >
								<Text style={styles.headText}>สร้างเมนูใหม่</Text>
							</View>
						<KeyboardAwareScrollView className="flex-1 flex-col">
							<View className="flex-1 flex-col items-center">
								<Input
									value={inputs.foodName}
									onChangeText={(text) => handleOnchange(text, "foodName")}
									onFocus={() => handleError(null, "foodName")}
									iconName="email-outline"
									label="Food name"
									placeholder="Enter food name"
									error={errors.foodName}
								/>
								{/* <TextInput
        style={styles.Box}
        placeholder="ชื่อเมนูอาหาร"
        keyboardType="default"
        value={name}
        onChangeText={setname}
      /> */}

								<Input
									value={inputs.time}
									onChangeText={(text) => handleOnchange(text, "time")}
									onFocus={() => handleError(null, "time")}
									iconName="email-outline"
									label="Time"
									placeholder="Enter cook time (min)"
									keyboardType="decimal-pad"
									error={errors.time}
								/>
								{/* <TextInput
        style={styles.Box}
        placeholder="เวลาการทำ(นาที)"
        keyboardType="numeric"
        value={time}
        onChangeText={settime}
      /> */}

								<Text style={styles.btnTextAll}>วัตถุดิบ</Text>
								<TouchableOpacity
									onPress={() => openModal()}
									style={styles.btnOpenAddIn}>
									<Text style={styles.btnSaveText}>เพิ่มวัตถุดิบ</Text>
								</TouchableOpacity>
								<Text style={styles.btnTextAll}>วิธีทำ</Text>
								<TouchableOpacity
									onPress={() => openModal2()}
									style={styles.btnOpenAddIn}>
									<Text style={styles.btnSaveText}>เพิ่มวิธีทำ</Text>
								</TouchableOpacity>

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
									{/* <TextInput
        style={styles.Box1}
        placeholder="โปรตีน"
        keyboardType="numeric"
        value={protein}
        onChangeText={setprotein}
      />
      <TextInput
        style={styles.Box1}
        placeholder="คาร์บ"
        keyboardType="numeric"
        value={carbs}
        onChangeText={setcarbs}
      />
      <TextInput
        style={styles.Box1}
        placeholder="ไขมัน"
        keyboardType="numeric"
        value={fat}
        onChangeText={setfat}
      /> */}
								</View>

								{/* <Text></Text> */}
								<Input
									value={inputs.cals}
									onChangeText={(text) => handleOnchange(text, "cals")}
									onFocus={() => handleError(null, "cals")}
									iconName="email-outline"
									label="Calories"
									placeholder="Enter food name"
									keyboardType="decimal-pad"
									error={errors.cals}
								/>
								{/* <TextInput
        style={styles.Box}
        placeholder="แคลอรี่(กิโลแคลอรี่)"
        keyboardType="numeric"
        value={kcal}
        onChangeText={setkcal}
      /> */}
								<View className="flex-1 flex-row mx-4">
									<Text className="flex-1 text-lg self-center">Photos</Text>
									<View className="flex-[1.5] items-end">
										
									<Buttons width={'w-[90%]'} text={"Add Photo"} action={choosePhotoFromLibrary} />
									</View>
								</View>

							</View>
								<View style={{ alignItems: "center", marginTop: 30, marginBottom: 30 }}>
									<Buttons width={'w-[90%]'} text={'Create'} />
								</View>
						</KeyboardAwareScrollView>
					</ScrollView>}

			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	headerText: {
		fontSize: 18,
		color: "#8ec18d",
		paddingTop: 10,
		paddingBottom: 10,
		textAlign: "center"
	},
	containermodal: {
		// flexDirection: "column",
		// flex: 1,
		backgroundColor: "#fff",
	},
	container: {
		flex: 1,
		backgroundColor: "#fff",
		// alignItems: "center",
		// justifyContent: "center",
	},
	headBox: {
		backgroundColor: "#e3e3e3",
		//ตอนเอาลง tab เอา marginTop ออกด้วยนะ

		alignItems: "flex-start",
		padding: 8
	},
	headText: {
		fontSize: 23,
		fontWeight: "bold",
		color: "#000",
		marginLeft: 30
	},
	btnTextAll: {
		fontSize: 18,
		color: "#000",
		marginLeft: 25,
		marginTop: 30
	},
	pickerBorder: {
		width: "40%",
		height: 45,
		marginTop: -35,
		marginLeft: 150,
		borderColor: '#adacac',
		borderWidth: 2,
		borderRadius: 10,
	},
	Box: {
		marginTop: -35,
		marginLeft: 170,
		width: "50%",
		height: 45,
		borderColor: '#adacac',
		borderWidth: 2,
		borderRadius: 10,
		fontSize: 18,
		textAlign: "center",
	},
	Box1: {
		// flex: 1,
		marginTop: -35,
		marginRight: 5,
		width: "27%",
		height: 45,
		borderColor: '#adacac',
		borderWidth: 2,
		borderRadius: 10,
		fontSize: 18,
		textAlign: "center",
	},
	boxModal: {
		marginLeft: 10,
		width: "95%",
		height: 45,
		borderColor: '#adacac',
		borderWidth: 2,
		borderRadius: 10,
		fontSize: 18,
		// justifyContent: "center",
		textAlign: "center",
	},
	boxModal2: {
		marginLeft: 15,
		width: "80%",
		height: 45,
		borderColor: '#adacac',
		borderWidth: 2,
		borderRadius: 10,
		fontSize: 18,
		// justifyContent: "center",
		textAlign: "center",
	},
	btnSave: {
		width: "40%",
		elevation: 8,
		backgroundColor: "#8ec18d",
		borderRadius: 10,
		paddingVertical: 10,
		// paddingHorizontal: 20,
	},
	btnOpenAddIn: {
		marginTop: -35,
		marginLeft: 170,
		width: "50%",
		elevation: 8,
		backgroundColor: "#8ec18d",
		borderRadius: 10,
		paddingVertical: 10,
		// paddingHorizontal: 20,
	},
	btnAddIng: {
		width: "30%",
		// elevation: 8,
		backgroundColor: "#8ec18d",
		borderRadius: 10,
		paddingVertical: 5,
		alignSelf: "center",
		marginTop: 75,
		// paddingHorizontal: 20,
	},
	btnSaveText: {
		fontSize: 20,
		color: "#fff",
		fontWeight: "bold",
		alignSelf: "center",
	},
	Box2: {
		marginTop: -35,
		marginLeft: 150,
		width: "40%",
		height: 45,
		borderColor: '#adacac',
		borderWidth: 2,
		borderRadius: 10,
		fontSize: 18,
		textAlign: "center",
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
		// borderStyle: "hidden",
		// marginTop: 5,
		// padding: 5,
		marginTop: -5,
		textAlign: "center",
	},
	square: {
		width: "90%",
		// backgroundColor: "#8ec18d",
		borderRadius: 10,
		alignSelf: 'center',
		marginTop: 20,
		borderWidth: 5,
		borderColor: '#8ec18d',

	},
	checkContainer: {
		width: "100%",
		flex: 1,
		paddingLeft: 10,
		flexDirection: 'row',
		alignSelf: "center",
		backgroundColor: '#8ec18d'
	},
	ingredientName: {
		flex: 1,
		fontSize: 24,
		color: "#fff",
		alignSelf: "center",
		paddingLeft: 10
		// paddingVertical:5
	},
	delIngredient: {
		fontSize: 28,
		fontWeight: "bold",
		// marginTop: 2,
		// marginLeft: 43,
		// flex: 1
	},
	headText2: {
		fontSize: 15,
		fontWeight: "bold",
		color: "#000",
		marginTop: 10,
		marginLeft: 10
	}

});

export default CreateRecipeScreen