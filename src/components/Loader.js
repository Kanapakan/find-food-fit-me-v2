import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'

const Loader = () => {
	return (
		<View style={styles.preloader}>
			<ActivityIndicator size="large" color="#547F53" />
			<Text>Loading...</Text>
		</View>
	)
}

const styles = StyleSheet.create({
  preloader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Loader