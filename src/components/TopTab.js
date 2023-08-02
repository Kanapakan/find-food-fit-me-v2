import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const TopTab = ({ tabTitle, showTab, onPress = () => { } }) => {
	return (
		<View className="flex-1">
			<TouchableOpacity
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					borderBottomWidth: 3,
					borderBottomColor: showTab === true ? "#547F53" : "#fff",
				}}
				onPress={onPress}
			>
				<Text
					style={{
						color: showTab === true ? "#000" : "#adacac",
						fontWeight: showTab === true ? "bold" : "normal",
						fontSize: 16
					}}
				>
					{tabTitle}
				</Text>
			</TouchableOpacity>
		</View>
	)
}

export default TopTab