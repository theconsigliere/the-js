import axios from "axios";
import { key } from "../config";

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      //axios is like 'fetch' for all browsers but automatic returns json
      const res = await axios(
        `https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`
      );
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
      console.log(res);
      //   console.log(this.result);
    } catch (error) {
      alert("Something went wrong :(");
    }
  }

  calcTime() {
    // asuuming that we need 15 min for each 3 ingredients
    const numberIngredients = this.ingredients.length;
    const periods = Math.ceil(numberIngredients / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }
}
