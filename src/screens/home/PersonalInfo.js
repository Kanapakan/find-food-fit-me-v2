import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Dropdowns from '../../components/Dropdowns'
import Input from '../../components/Inputs'
import Buttons from '../../components/Buttons'
import { Data } from '../../../dataJson/data'

const PersonalInfo = ({
	inputs,
	errors,
	handleOnchange = () => { },
	handleError = () => { },
	validateUserInfo = () => { },
}) => {
	// const [errors, setErrors] = useState({});

	return (
		<View>
			<View className="items-center pt-7">
				<Dropdowns
					value={inputs.gender}
					headLabel="Gender"
					onFocus={() => handleError(null, "gender")}
					data={Data.gender}
					dataType="gender"
					handleOnchange={handleOnchange}
					error={errors.gender}
				/>

				<Input
					value={inputs.age}
					onChangeText={(text) => handleOnchange(text, "age")}
					onFocus={() => handleError(null, "age")}
					label="Age (years)"
					placeholder="Enter your age (ages 18-80 years)"
					keyboardType="number-pad"
					error={errors.age}
				/>

				<Input
					value={inputs.height}
					onChangeText={(text) => handleOnchange(text, "height")}
					onFocus={() => handleError(null, "height")}
					label="Height (cm)"
					placeholder="Enter your current height"
					keyboardType="decimal-pad"
					error={errors.height}
				/>

				<Input
					value={inputs.weight}
					onChangeText={(text) => handleOnchange(text, "weight")}
					onFocus={() => handleError(null, "weight")}
					label="Weight (kg)"
					placeholder="Enter your current weight"
					keyboardType="decimal-pad"
					error={errors.weight}
				/>
				<Dropdowns
					value={inputs.activity}
					headLabel="Activity"
					onFocus={() => handleError(null, "activity")}
					data={Data.activity}
					dataType="activity"
					handleOnchange={handleOnchange}
					error={errors.activity}
				/>
			</View>
			<View style={{ alignItems: "center", marginTop: 30, }}>
				<Buttons width={'w-[90%]'} text="Save" action={validateUserInfo} />
			</View>
		</View>
	)
}

export default PersonalInfo