//Global app controller

//import npm package from node modules
import Search from "./models/search";
import Recipe from "./models/recipe";
import List from "./models/List";
import Likes from "./models/Likes";

//everything from the searchView module will be stored as searchView object
import * as searchView from "./views/searchView";
import * as listView from "./views/listView";
import * as recipeView from "./views/recipeView";
import * as likesView from "./views/likesView";
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
window.state = state;

// SEARCH CONTROLLER
//-------------------------------------------------------------------------------------------------

const controlSearch = async () => {
  // 1) Get query from view
  const query = searchView.getInput();

  if (query) {
    // 2) New search object and add to state
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchResult);

    try {
      // 4) Search for recipes
      await state.search.getResults();

      // 5) Render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (err) {
      console.log(err);
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
  // console.log(id);

  if (id) {
    // prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe); // always pass in where the loader should display itself

    //Highlight selected search item
    if (state.search) {
      searchView.highlightSelected(id);
    }

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
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
    } catch (error) {
      console.log(error);
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

// LIST CONTROLLER
//-------------------------------------------------------------------------------------------------

const controlList = () => {
  //Create a new list IF there is none yet
  if (!state.list) state.list = new List();

  //Add each ingredient to the list & UI
  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderitem(item);
  });

  //Handle delete and update list item events
  elements.shopping.addEventListener("click", e => {
    const id = e.target.closest(".shopping__item").dataset.itemid;

    //Handle the delete button
    if (e.target.matches(".shopping__delete, .shopping__delete *")) {
      //Delete from state
      state.list.deleteItem(id);

      //Delete from UI
      listView.deleteItem(id);

      //Handle the count update
    } else if (e.target.matches(".shopping__count-value")) {
      const val = parseFloat(e.target.value, 10);
      state.list.updateCount(id, val);
    }
  });
};

// LIKE CONTROLLER
//---------------------------------------------------------------------------------------------------

// state.likes = new Likes();

const controlLike = () => {
  if (!state.likes) state.likes = new Likes();
  const currentID = state.recipe.id;

  // User has NOT yet liked current recipe
  if (!state.likes.isLiked(currentID)) {
    // Add like to the state
    const newLike = state.likes.addLike(
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    );
    // Toggle the like button
    likesView.toggleLikeBtn(true);

    // Add like to UI list
    likesView.renderLike(newLike);

    // User HAS liked current recipe
  } else {
    // Remove like from the state
    state.likes.deleteLike(currentID);

    // Toggle the like button
    likesView.toggleLikeBtn(false);

    // Remove like from UI list
    likesView.deleteLike(currentID);
  }
  likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// RESTORE LIKES THROUGH LOCAL STORAGE
//-----------------------------------------------------------------------------------------------------

window.addEventListener("load", () => {
  state.likes = new Likes();
  // Restore likes after page load
  state.likes.readStorage();

  //toggle like menu button
  likesView.toggleLikeMenu(state.likes.getNumLikes());

  //render existing likes
  state.likes.likes.forEach(like => {
    likesView.renderLike(like);
  });
});

// HANDLING RECIPE BUTTON CLICKS
//-----------------------------------------------------------------------------------------------------

elements.recipe.addEventListener("click", e => {
  if (e.target.matches(".btn-decrease, .btn-decrease *")) {
    //decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings("dec");
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches(".btn-increase, .btn-increase *")) {
    // Increase button is clicked
    state.recipe.updateServings("inc");
    recipeView.updateServingsIngredients(state.recipe);
  } else if (e.target.matches(".recipe__btn--add, recipe__btn--add *")) {
    //Add ingredients to shopping list
    controlList();
  } else if (e.target.matches(".recipe__love", ".recipe__love *")) {
    //Like Controller
    controlLike();
  }

  // console.log(state.recipe);
});

// NEW LIST
//-------------------------------------------------------------------------------------------------

window.l = new List();
