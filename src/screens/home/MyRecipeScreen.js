import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import NewRecipeList from '../../components/Recipe/NewRecipeList'

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import Loader from '../../components/Loader';

const MyRecipeScreen = ({ route, navigation }, props) => {
	const [userRecipe, setUserRecipe] = useState([]);
	const [isLoading, setisLoading] = useState(false);

	useEffect(() => {
    fetchUserRecipes();
  }, []);

	// useEffect(() => {
  //   fetchPosts();
  //   setDeleted(false);
  // }, [deleted]);

	// const userRecipe = [
	// 	{
	// 		id: 'pijfvisdjfsd', recipeName: "Air Fryer Lemon Pepper Shrimp", cals: 200, time: 20, ingredients: [{ name: "chicken", category: "meat", quantity: 100, unit: "g" },
	// 		{ name: "cod fillets", category: "meat", quantity: 1, unit: "pound" },
	// 		{ name: "large egg", category: "dairy products", quantity: 1, unit: "-" },
	// 		{ name: "butter", category: "dairy products", quantity: 1, unit: "Tbsp" },
	// 		{ name: "grated onion", category: "herbs and spice", quantity: 1, unit: "Tbsp" },]
	// 		, image: "https://www.allrecipes.com/thmb/I2xhZcwsj7FXmG0vBUS1CiJnhoA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/4830008-691ae7a34cea4071afe1f0dcb60b8a84.jpg", carbs: 20, protein: 20, fat: 20, steps: [
	// 			"Bring clam juice and oregano to a boil in a saucepan over medium-high heat. Add shrimp; cook and stir just until shrimp turn pink, about 2 minutes. (They will not be cooked through.) Transfer shrimp to a bowl with a slotted spoon; let cool to room temperature. Reserve liquid.",
	// 			"While the shrimp are cooling, combine tomatoes, cucumbers, celery, onion, and jalapeños in a mixing bowl. Gently mix in reserved cooking liquid, ketchup, lime juice, 2 tablespoons cilantro, and hot sauce until well combined.",
	// 			"Place four whole shrimp in a small bowl; cover with plastic wrap. Chop remaining shrimp into bite-sized pieces; add to vegetable mixture and stir to combine. Cover with plastic wrap. Refrigerate both bowls until thoroughly chilled, 2 to 3 hours.",
	// 			"Place four whole shrimp in a small bowl; cover with plastic wrap. Chop remaining shrimp into bite-sized pieces; add to vegetable mixture and stir to combine. Cover with plastic wrap. Refrigerate both bowls until thoroughly chilled, 2 to 3 hours."

	// 		]
	// 	}
	// ]

	const fetchUserRecipes = async () => {
		setisLoading(true);
    try {
      const list = [];

      await firestore()
        .collection('recipes')
        // .orderBy('createdAt')
				.where('userId', '==', auth().currentUser?.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const {id, userId, recipeName, cals, time, ingredients, steps, image, carbs, protein, fat, createdAt} = doc.data();
            list.push({
              id: doc.id,
              userId,
							recipeName,
							cals,
							time,
							ingredients,
							steps,
							image,
							carbs,
							protein,
							fat,
							createdAt,
            });
          });
        });

      setUserRecipe(list);
			setisLoading(false);
    } catch (e) {
			setisLoading(false);
      console.log(e);
    }
  };

	if(isLoading) {
    return (
      <Loader />
    )
  }

	return (
		<View className="flex-1">
			<View className="flex-1">
				{/* ----------------------- Tab2 --------------------------------- */}
				{/* <View style={styles.headBox} >
								<Text style={styles.headText}>เมนูอาหารของคุณ</Text>

							</View> */}
				{userRecipe.length > 0 ?
					<NewRecipeList
						style={{ width: "100%", height: "100%" }}
						listData={userRecipe}
						// objIn={objIn2}
						navigation={navigation}
					/> :
					<Text>ไม่พบเมนูอาหาร</Text>}
			</View>
		</View>
	)
}

export default MyRecipeScreen