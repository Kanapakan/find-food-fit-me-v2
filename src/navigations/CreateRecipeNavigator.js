import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants';
import CreateRecipeScreen from '../screens/home/CreateRecipeScreen';
import RecipeDetailScreen from '../screens/home/RecipeDetailScreen';

const Stack = createNativeStackNavigator();

const CreateRecipeNavigator = () => {
    return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerStyle: { backgroundColor: "#E4EFE3" },
            headerTintColor: "#547F53",
            headerTitleStyle: {
              fontWeight: "bold",
              // fontSize:  "25px",
            },
          }}
        >
          <Stack.Screen
            name={ROUTES.CREATE_NEW_RECIPE}
            options={{ title: "Create new recipe" }}
            component={CreateRecipeScreen}
          />
          <Stack.Screen
            name="RecipeDetail"
            options={{
              headerShown: false,
            }}
            component={RecipeDetailScreen}
          />
        </Stack.Navigator>
      );
}

export default CreateRecipeNavigator