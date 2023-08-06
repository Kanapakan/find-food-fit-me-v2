import { View, Text, StyleSheet } from 'react-native'
import React, { createRef } from 'react'
import BottomSheet from 'reanimated-bottom-sheet';
import Buttons from './Buttons';
import { COLORS } from '../constants';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const BottomSheets = ({action = () => {}, bs}) => {
  renderInner = () => (
		<View style={styles.panel}>

			<Icon
				onPress={() => bs.current.snapTo(1)}
				name='window-close'
				style={{ color: COLORS.darkBlue, fontSize: 22 }}
			/>
			<View style={{ alignItems: 'center' }}>
				<Text style={styles.panelTitle}>Upload Photo</Text>
				<Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
			</View>
			{/* <TouchableOpacity style={styles.panelButton}>
			<Text style={styles.panelButtonTitle}>Take Photo</Text>
		  </TouchableOpacity> */}
			<View className="flex-col">
				<View className="mb-3">

					<Buttons width={"w-['90'%]"} title={'Take Photo'} />
				</View>
				<View>

					<Buttons width={"w-['90'%]"} title={'Choose From Library'} action={action} />
				</View>
			</View>
		</View>
	);

//   bs = React.createRef();

  return (
    <View>
      <BottomSheet
					ref={bs}
					snapPoints={[260, 0]}
					renderContent={renderInner}
					// renderHeader={renderHeader}
					initialSnap={1}
					// callbackNode={fall}
					enabledGestureInteraction={true}
				/>
    </View>
  )
}

const styles = StyleSheet.create({
	panel: {
		padding: 20,
		backgroundColor: '#FFFFFF',
		// paddingTop: 60,
		// borderTopLeftRadius: 20,
		// borderTopRightRadius: 20,
		// shadowColor: '#000000',
		// shadowOffset: {width: 0, height: 0},
		// shadowRadius: 5,
		// shadowOpacity: 0.4,
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
	panelHandle: {
		width: 40,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#00000040',
		marginBottom: 10,
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
	action: {
		flexDirection: 'row',
		marginTop: 10,
		marginBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#f2f2f2',
		paddingBottom: 5,
	},
	actionError: {
		flexDirection: 'row',
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#FF0000',
		paddingBottom: 5,
	},
	textInput: {
		flex: 1,
		marginTop: Platform.OS === 'ios' ? 0 : -12,
		paddingLeft: 10,
		color: '#05375a',
	},

});

export default BottomSheets