//Global app controller

//import npm package from node modules
import Search from "./models/search";
//everything from the searchView module will be stored as searchView object
import * as searchView from "./views/searchView";
// import from base query selector object
import { elements } from "./views/base";

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

    // 4) search for recipes
    await state.search.getResults();

    // 5) render results on the UI
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
