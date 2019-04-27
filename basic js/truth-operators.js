// truth and falsy

var title = document.querySelector("h1");

var firstName = "John";
var age = 16;

// falsy vaules: undefined, null, 0, '', NaN (not a number)
// truthy values: NOT a falsy value

var height;

// if we have a height value run first statement
if (height) {
  title.innerHTML = " height is defined";
} else {
  title.innerHTML = " height is undefined";
} // is undefined

var height;

height = 0;
// returns not defined as 0 is a falsy value, unless we use a operator
if (height || height === 0) {
  title.innerHTML = " height is defined";
} else {
  title.innerHTML = " height is undefined";
} // is undefined

//
//
//
//

//equality operators

// == non strict equality operator
// === strict equility operator

height = 23;

if (height == "23") {
  // answer is true which means converts string to number then says 23 string is the same as the 23 number
  console.log("The == operator does type coercion!");
}

//
//
//
//
//

// code challenge

var title = document.querySelector("h1");

var johnScore = (89 + 120 + 103) / 3;
var mikeScore = (116 + 94 + 123) / 3;

johnScore > mikeScore
  ? (title.innerHTML =
      "John's team's average points per game " +
      johnScore +
      " is better than Mike's team " +
      mikeScore)
  : (title.innerHTML =
      "Mike's team's average points per game " +
      mikeScore +
      " is better than John's team " +
      johnScore);

johnScore = (89 + 120 + 103) / 3;
mikeScore = (89 + 120 + 103) / 3;

var maryScore = (97 + 134 + 105) / 3;

if (johnScore > mikeScore) {
  title.innerHTML =
    "John's team's average points per game " +
    johnScore +
    " is better than Mike's team " +
    mikeScore;
} else if (johnScore === mikeScore) {
  title.innerHTML =
    "John's team's average points per game " +
    johnScore +
    " is the same as Mike's team " +
    mikeScore;
} else {
  title.innerHTML =
    "Mike's team's average points per game " +
    mikeScore +
    " is better than John's team " +
    johnScore;
}
