//------------------------------------------------------
//returns input value of search field

import { elements } from "./base";

//returns input value of search field
export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  //clears search form
  elements.searchInput.value = " ";
};

export const clearResults = () => {
  // clears  results on left hand side
  elements.searchResultList.innerHTML = " ";

  console.log(elements.searchResultList.innerHTML);
};

//private function
const renderRecipe = recipe => {
  const markup = `
  <li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${recipe.title}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>
 `;

  // add 'markup' to .results_list query selector
  elements.searchResultList.insertAdjacentHTML("afterbegin", markup);
};

// we return an array of 30 recipes now we loop through these to print ot user interface
export const renderResults = recipes => {
  // calls renderRecipe for each of the results
  recipes.forEach(renderRecipe);
};
