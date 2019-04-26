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

// Coding Challenge 2

var firstBill = 124;
var secBill = 48;
var thirdBill = 268;

function calculate(amount) {
  if (amount < 50) {
    return amount * 0.2;
  } else if (amount >= 50 && amount < 200) {
    return amount * 0.15;
  } else {
    return amount * 0.1;
  }
}

var johnFirstTip = calculate(firstBill);
var johnSecondTip = calculate(secBill);
var johnThirdTip = calculate(thirdBill);

console.log(johnFirstTip, johnSecondTip, johnThirdTip);

var threeTips = [johnFirstTip, johnSecondTip, johnThirdTip];

console.log(threeTips);

var finalPay = [
  johnFirstTip + firstBill,
  secBill + johnSecondTip,
  thirdBill + johnThirdTip
];

console.log(finalPay);

//coding challenge v3

var mark = {
  fullName: "Mark Man",
  mass: 55,
  height: 1.8,
  calcBmi: function() {
    this.bmi = this.mass / (this.height * this.height);
  }
};

var john = {
  fullName: "John Man",
  mass: 35,
  height: 1.8,
  calcBmi: function() {
    this.bmi = this.mass / (this.height * this.height);
  }
};

if (mark.calcBmi() > john.calcBmi()) {
  title.innerHTML = mark.fullName + " has a higher bmi than " + john.fullName;
} else if (mark.calcBmi() < john.calcBmi()) {
  title.innerHTML = john.fullName + " has a higher bmi than " + mark.fullName;
} else {
  title.innerHTML = john.fullName + " has the same bmi as " + mark.fullName;
}
