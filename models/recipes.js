import { ThemeConsumer } from "react-native-elements";

class Recipe {
    constructor(
      id,
      name,
      kcal,
      time,
      ingredient_quantity,
      ingredient_name,
      ingredient_type,
      steps,
      imageURL,
      originalURL,
      carbs,
      protein,
      fats,


    ) {
      this.id = id;
      this.name = name;
      this.kcal = kcal;
      this.time = time;
      this.ingredient_quantity = ingredient_quantity
      this.ingredient_name = ingredient_name
      this.ingredient_type = ingredient_type
      this.steps = steps;
      this.imageURL = imageURL;
      this.originalURL = originalURL;
      this.carbs = carbs;
      this.protein = protein;
      this.fats = fats;
    }
  }
  
  export default Recipe;
  