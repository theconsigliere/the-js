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

//typeof operator
console.log(typeof diff);
//returns the type of data ie boolean, string number or undefined

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
