import { View, Text } from 'react-native'
import React from 'react'

const Modal = () => {
	return (
		<View>
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
		</View>
	)
}

export default Modal