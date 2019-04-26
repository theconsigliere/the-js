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
