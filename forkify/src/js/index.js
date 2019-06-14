//Global app controller

//import npm package from node modules
import Search from "./models/search";
import Recipe from "./models/recipe";

//everything from the searchView module will be stored as searchView object
import * as searchView from "./views/searchView";

import * as recipeView from "./views/recipeView";
// import from base query selector object
import {
  elements,
  renderLoader,
  clearLoader,
  elementStrings
} from "./views/base";

// Global state of the app
// * - Search Object
// * - Current Recipe Object
// * - Shopping List object
// * - Liked Recipes

const state = {};

// SEARCH CONTROLLER
//-------------------------------------------------------------------------------------------------

const controlSearch = async () => {
  // 1) get query from the view
  const query = searchView.getInput();

  //2) create new search object

  if (query) {
    //2) create new search object and add to state
    //call search.js object constructor
    state.search = new Search(query);

    // 3) prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchResult);

    try {
      // 4) search for recipes
      await state.search.getResults();

      // 5) render results on the UI
      clearLoader();
      // puts api result 'search.js object constructor' into renderResults method 'searchView.js'
      searchView.renderResults(state.search.result);
    } catch (error) {
      alert("Something went wrong with the search...");
      clearLoader();
    }
  }
};

// on submision of search form
//-----------------------------------------------------------------------------------
elements.searchForm.addEventListener("submit", cur => {
  //using preventdefault to stop the submission of the form taking you to a new page
  cur.preventDefault();
  controlSearch();
});

// BUTTON EVENT HANDLERS
//-----------------------------------------------------------------------------------

// add event listener to div that is already on the page so buttons can change depending on what page we are on
elements.searchResultPages.addEventListener("click", current => {
  const btn = current.target.closest(".btn-inline");
  // if button read go to page data attribute
  if (btn) {
    const gotToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, gotToPage);
    console.log(gotToPage);
  }
});

// RECIPE CONTROLLER
//-------------------------------------------------------------------------------------------------

// GET ANCHOR HASH
const controlRecipe = async () => {
  // get ID from URL & remove #
  const id = window.location.hash.replace("#", "");
  console.log(id);

  if (id) {
    // prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe); // always pass in where the loader should display itself

    // create new recipe object
    state.recipe = new Recipe(id);

    try {
      // get recipe data & parse ingrediients
      await state.recipe.getRecipe();
      // console.log(state.recipe.ingredients);
      state.recipe.parseIngredients();

      // calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);
    } catch (error) {
      alert(error);
    }
  }
};

// in url hash change run controlRecipe
// window.addEventListener("hashchange", controlRecipe);
// When we load page we can access the recipe
// window.addEventListener('load', controlRecipe)

["hashchange", "load"].forEach(event =>
  window.addEventListener(event, controlRecipe)
);
