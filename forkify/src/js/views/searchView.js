//------------------------------------------------------
//returns input value of search field

import { elements } from "./base";

//returns input value of search field
export const getInput = () => elements.searchInput.value;

//private function
const renderRecipe = recipe => {};

// we return an array of 30 recipes now we loop through these to print ot user interface
export const renderResults = recipes => {
  // calls renderRecipe for each of the results
  recipes.foreach(renderRecipe);
};
