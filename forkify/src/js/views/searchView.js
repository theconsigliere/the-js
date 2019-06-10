//------------------------------------------------------
//returns input value of search field

import { elements } from "./base";

//returns input value of search field
export const getInput = () => elements.searchInput.value;

//private function
const renderRecipe = recipe => {
  const markup = `
  <li>
    <a class="results__link results__link--active" href="#23456">
        <figure class="results__fig">
            <img src="img/test-1.jpg" alt="Test">
        </figure>
        <div class="results__data">
            <h4 class="results__name">Pasta with Tomato ...</h4>
            <p class="results__author">The Pioneer Woman</p>
        </div>
    </a>
</li>
 `;
};

// we return an array of 30 recipes now we loop through these to print ot user interface
export const renderResults = recipes => {
  // calls renderRecipe for each of the results
  recipes.foreach(renderRecipe);
};
