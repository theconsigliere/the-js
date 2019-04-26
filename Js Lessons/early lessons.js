//prompts and alerts

var name = prompt("what is your name?");

alert("my name is" + " " + name);

//logical operators

var age, _newage;
age = 25;
_newage = 26;

var diff = age < _newage;
//returns boolean, returns true
console.log(diff);

//operator precedence

var now = 2018;
var yearJohn = 1989;
var fullAge = 18;

var isFullAge = now - yearJohn >= fullAge;
// - is more of a precedence than >=
console.log(isFullAge);

//more operators

var x = 25;

x += 2; //means var x = x + 2 // 27
console.log(x);
x *= 2; //means var x = x * 2 // 54
console.log(x);
x++; //means var x plus one // 55
console.log(x);

//code challenge

var markMass = 75;
var markheight = 1.8;

var johnMass = 115;
var johnheight = 1.6;

var markBmi = markMass / (markheight * markheight);
console.log("Mark's bmi is" + " " + markBmi);
var johnBmi = johnMass / (johnheight * johnheight);
console.log("John's bmi is" + " " + johnBmi);

var diffBmi = markBmi > johnBmi;

console.log("Is Mark's Bmi higher than John's?" + " " + diffBmi);

// if statement

var firstName = "john";
var civilStatus = "single";

if (civilStatus === "married") {
  console.log(firstName + " " + "is married!");
} else {
  console.log(firstName + " " + "is not married!");
}

var isMarried = true;
// can pass true or false statement into the if argument
if (isMarried) {
  console.log(firstName + " " + "is married!");
} else {
  console.log(firstName + " " + "is not married!");
}

//code challenge V2

var title = document.querySelector("h1");

var markMass = 75;
var markHeight = 1.8;

var johnMass = 115;
var johnHeight = 1.6;

var markBmi = markMass / (markHeight * markHeight);
console.log("Mark's bmi is" + " " + markBmi);

var johnBmi = johnMass / (johnHeight * johnHeight);
console.log("John's bmi is" + " " + johnBmi);

if (markBmi > johnBmi) {
  console.log("mark's BMI is higher than John's");
  title.innerHTML = "Mark's BMI is higher than John's";
} else {
  console.log("John's BMI is higher than Mark's");
  title.innerHTML = "John's BMI is higher than Mark's";
}

//boolean Operators
var title = document.querySelector("h1");

var firstName = "john";
var age = 16;

if (age < 13) {
  title.innerHTML = firstName + " is a boy.";
  //   so john is older than 13 but not older than 20, both are true so therefore john is a teenager
} else if (age >= 13 && age < 20) {
  // between 13 & 20 === age >= 13 and age < 20
  title.innerHTML = firstName + " is a teenager.";
} else {
  title.innerHTML = firstName + " is a Man.";
}

//   and = && , true if all are true
//   or = ||, true if one is true
//   not = !, inverts true/ false value
