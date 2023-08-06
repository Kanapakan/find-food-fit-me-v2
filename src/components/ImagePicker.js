import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const choosePhotoFromLibrary = async ({image, setImage}) => {
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

export const ImagePicker = ({image}) => {
	// const [image, setImage] = useState(null);

	return (
		<View>
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
	)
}