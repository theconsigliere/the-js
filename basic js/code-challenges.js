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
//
//
//
//
//
//
//
//

//coding challenge 5

var john = {
  fullName: "John Smith",
  bills: [124, 48, 268, 180, 42],
  calcTips: function() {
    this.tips = [];
    this.finalValues = [];

    for (var i = 0; i < this.bills.length; i++) {
      // Determine percentage based on tipping rules
      var percentage;
      //bill selects current position of array
      var bill = this.bills[i];

      if (bill < 50) {
        percentage = 0.2;
      } else if (bill >= 50 && bill < 200) {
        percentage = 0.15;
      } else {
        percentage = 0.1;
      }

      // Add results to the corresponing arrays
      this.tips[i] = bill * percentage;
      this.finalValues[i] = bill + this.tips[i];
    }
  }
};

var mark = {
  fullName: "Mark Miller",
  bills: [77, 475, 110, 45],
  calcTips: function() {
    this.tips = [];
    this.finalValues = [];

    for (var i = 0; i < this.bills.length; i++) {
      // Determine percentage based on tipping rules
      var percentage;
      //bill selects current position of array
      var bill = this.bills[i];

      if (bill < 100) {
        percentage = 0.2;
      } else if (bill >= 100 && bill < 300) {
        percentage = 0.1;
      } else {
        percentage = 0.25;
      }

      // Add results to the corresponing arrays
      this.tips[i] = bill * percentage;
      this.finalValues[i] = bill + this.tips[i];
    }
  }
};

function calcAverage(tips) {
  var sum = 0;
  for (var i = 0; i < tips.length; i++) {
    // 0 if sum is 0 = 0 + tips position
    sum = sum + tips[i];
    // this will return all the tips added together
  }
  //then sum divided by how many in array
  return sum / tips.length;
}

//run methods

mark.calcTips();
john.calcTips();

//do the calculations

//creates average value in object
// the tips array put through the calc average function
john.average = calcAverage(john.tips);
mark.average = calcAverage(mark.tips);

//log john & mark object

console.log(john, mark); // now includes average value

//log who pays higher tips

if (john.average > mark.average) {
  console.log(
    john.fullName +
      "'s family pays higher tips than " +
      mark.fullName +
      "'s family"
  );
} else {
  console.log(
    mark.fullName +
      "'s family pays higher tips than " +
      john.fullName +
      "'s family"
  );
}
