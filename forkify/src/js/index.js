//Global app controller

//import npm package from node modules
import Search from "./models/search";
//everything from the searchView module will be stored as searchView object
import * as searchView from "./views/searchView";
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

    // 4) search for recipes
    await state.search.getResults();

    // 5) render results on the UI
    clearLoader();
    // puts api result 'search.js object constructor' into renderResults method 'searchView.js'
    searchView.renderResults(state.search.result);
  }
};

// on submision of search form
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
