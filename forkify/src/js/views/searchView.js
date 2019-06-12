//------------------------------------------------------
//returns input value of search field

import { elements } from "./base";

//returns input value of search field
export const getInput = () => elements.searchInput.value;

// CLEARS FORM INPUT
//-----------------------------------------------------------------------------------

export const clearInput = () => {
  //clears search form
  elements.searchInput.value = " ";
};

export const clearResults = () => {
  // clears  results on left hand side
  elements.searchResultList.innerHTML = " ";
  // clear buttons
  elements.searchResultPages.innerHTML = " ";

  console.log(elements.searchResultList.innerHTML);
};

// RECIPE ITEM TITLE LIMIT
//-----------------------------------------------------------------------------------

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

// RECIPE ITEM MARKUP
//-----------------------------------------------------------------------------------

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

// BUTTON MARKUP
//-----------------------------------------------------------------------------------

// type: 'prev' or 'next'
const createButton = (
  page,
  type
) => ` <button class="btn-inline results__btn--${type}" data-goto=${
  type === "prev" ? page - 1 : page + 1
}>
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${
      type === "prev" ? "left" : "right"
    }"></use>
</svg>
<span>Page ${type === "prev" ? page - 1 : page + 1}</span>
</button>`;

// SHOW BUTTONS FOR PAGINATION
//-----------------------------------------------------------------------------------
const renderButtons = (page, numberResults, resultsPerPage) => {
  const pages = Math.ceil(numberResults / resultsPerPage);

  let button;
  if (page === 1 && pages > 1) {
    // only button to go to next page
    button = createButton(page, "next");
  } else if (page < pages) {
    // Both buttons
    button = `
    ${createButton(page, "prev")} 
    ${createButton(page, "next")} 
    `;
  } else if (page === pages && pages > 1) {
    // only button to go to prev page
    button = createButton(page, "prev");
  }

  // add 'markup' to .results_pages query selector
  elements.searchResultPages.insertAdjacentHTML("afterbegin", button);
};

// SHOW ONLY 10 RESULTS FOR EACH PAGE
//-----------------------------------------------------------------------------------
// we return an array of 30 recipes now we loop through these to print ot user interface
export const renderResults = (recipes, page = 1, resultsPerPage = 10) => {
  // * render results of current page

  // display only resultsper page = 10
  const start = (page - 1) * resultsPerPage;
  const end = page * resultsPerPage;
  // calls renderRecipe for each of the results
  recipes.slice(start, end).forEach(renderRecipe);

  // * render pagination buttons
  renderButtons(page, recipes.length, resultsPerPage);
};
