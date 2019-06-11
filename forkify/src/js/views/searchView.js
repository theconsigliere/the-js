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

/*
 'Pasta with tomato and Spinach'

 acc: 0 / accumulator + currentWord.length = 5 / newTitle = ['Pasta']
 acc: 5 / accumulator + currentWord.length = 9 / newTitle = ['Pasta', with]
 acc: 9 / accumulator + currentWord.length = 15 / newTitle = ['Pasta', with, 'tomato']
 acc: 15 / accumulator + currentWord.length = 18 / newTitle = ['Pasta', with, 'tomato']
 acc: 18 / accumulator + currentWord.length = 24 / newTitle = ['Pasta', with, 'tomato']
*/

const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
  // if title.length is longer than 17 we shorten it
  if (title.length > limit) {
    title.split(" ").reduce((accumculator, currentWord) => {
      if (accumculator + currentWord.length <= limit) {
        //pus current word into new title array
        newTitle.push(currentWord);
      }
      return accumculator + currentWord.length;
    }, 0);

    // return the result
    return `${newTitle.join(" ")} ...`;
  }
  // else we return the title
  return title;
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
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
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
