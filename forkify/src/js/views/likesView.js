import { elements } from "./base";

export const toggleLikeBtn = isLiked => {
  const iconString = isLiked ? "heart" : "heart-outlined";
  document
    .querySelector(".recipe__love use")
    .setAttribute("href", `img/icons.svg#icon-${iconString}`);
  // icons.svg#icon-heart-outlined
};

export const toggleLikeMenu = numLikes => {
  elements.likesMenu.style.visibility = numLikes > 0 ? "visible" : "hidden;";
};
