// DATA STORAGE
//-----------------------------------------------------
// Holds all data
export const elements = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  searchResultList: document.querySelector(".results__list"),
  searchResult: document.querySelector(".results"),
  searchResultPages: document.querySelector(".results__pages"),
  recipe: document.querySelector(".recipe")
};

export const elementStrings = {
  loader: ".loader"
};

// AJAX LOADER
//-----------------------------------------------------

export const renderLoader = parent => {
  const loader = `
  <div class='loader'>
  <svg><use href='img/icons.svg#icon-cw'></use></svg>
  </div>
  `;

  parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(elementStrings.loader);
  if (loader) {
    // remove loader
    loader.parentElement.removeChild(loader);
  }
};
