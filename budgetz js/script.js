// Budget Calculator ***************************
//--------------------------------------------------------------------------------

// BUDGET CONTROLLER
//--------------------------------------------------------------------------------

var budgetController = (function() {
  // EXPENSE FUNCTION CONSTRUCTOR
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  // calculate method for our percentage
  Expense.prototype.calcPercentage = function(totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };

  // get method to return percentage
  Expense.prototype.getPercentage = function() {
    return this.percentage;
  };

  // INCOME FUNCTION CONSTRUCTOR
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // CALCULATE TOTAL

  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(cur) {
      sum += cur.value;
    });
    data.totals[type] = sum;
  };

  // DATA OBJECT

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };

  // ADD ITEM FUNCTION
  return {
    addItem: function(type, des, val) {
      var newItem, ID;

      //Create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Create new item based on 'inc' or 'exp' type
      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new Income(ID, des, val);
      }
      // type is 'exp' or 'inc', use brackets to select which array we need from the data object then push newitem to chosen array
      data.allItems[type].push(newItem);
      // return the newitem
      return newItem;
    },
    //DELETE ITEM

    deleteItem: function(type, id) {
      var ids, index;

      ids = data.allItems[type].map(function(current) {
        return current.id;
      });

      index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },

    // CALCULATE BUDGET

    calculateBudget: function() {
      // calculate total income and expenses
      calculateTotal("exp");
      calculateTotal("inc");

      // Calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      //calculate the percentage of income that we spent

      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }

      //Expense = 100 & income 300, spent 33.333% = 100/300 = 0.3333 * 100
    },

    calculatePercentages: function() {
      data.allItems.exp.forEach(function(cur) {
        //calls calc percentage method so it calculates our expenses
        cur.calcPercentage(data.totals.inc);
      });
    },

    getPercentages: function() {
      var allPerc = data.allItems.exp.map(function(cur) {
        return cur.getPercentage();
      });

      return allPerc;
    },

    // GET BUDGET METHOD
    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
    },

    // TESTING METHOD
    testing: function() {
      console.log(data);
    }
  };
})();

//--------------------------------------------------------------------------------

// UI CONTROLLER
//--------------------------------------------------------------------------------
var UIController = (function() {
  //some code
  //holds all css values in an object for quick reference
  var DOMStrings = {
    // put all of selectors in a object so we can access them easily
    inputType: ".add__type",
    inputDesc: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expensesLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    container: ".container",
    expensesPercLabel: ".item__percentage",
    dateLabel: ".budget__title--month"
  };

  // FORMAT NUMBERS METHOD

  var formatNumber = function(num, type) {
    var numSplit, int, dec;
    /*  + or - before number exactly 2 decimal points
        comma seperating the thousands
        
        2310.4567 -> - 2,310.46
        2000 -> + 2,000.00
        */

    // The Math.abs() function returns the absolute value of a number
    num = Math.abs(num);
    // round to two decimal places
    num = num.toFixed(2);

    numSplit = num.split(".");

    int = numSplit[0];

    if (int.length > 3) {
      int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3); // input 2310, output 2,310
    }

    dec = numSplit[1];

    // tenary operator
    return (type === "exp" ? "-" : "+") + " " + int + "." + dec;
  };

  // NODE LIST FOR EACH FUNCTION

  var nodeListForEach = function(list, callback) {
    for (var i = 0; i < list.length; i++) {
      //callback recieves two values
      callback(list[i], i);
    }
  };

  return {
    getInput: function() {
      return {
        // returns all inputs as an object
        type: document.querySelector(DOMStrings.inputType).value, // will be either inc or exp
        description: document.querySelector(DOMStrings.inputDesc).value,
        //parse float turns string into a decimal number so we can use number to calc
        value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
      };
    },

    addlistItem: function(obj, type) {
      var html, newHtml, element;
      //Create HTML String with placeholder text
      if (type === "inc") {
        //
        element = DOMStrings.incomeContainer;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        //
        element = DOMStrings.expensesContainer;
        html =
          ' <div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div> <div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // Replace the placeholder text with some actual data

      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));

      //insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    // DELETE LIST ITEM METHOD

    deleteListItem: function(selectorID) {
      var el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);
    },

    //CLEAR FIELDS METHOD
    clearFields: function() {
      var fields, fieldsArr;
      fields = document.querySelectorAll(
        DOMStrings.inputDesc + "," + DOMStrings.inputValue
      );
      // turn fields into an array
      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function(current, index, array) {
        current.value = "";
      });
      // after fields are cleared focus back to the desc input box
      fieldsArr[0].focus();
    },

    //DISPLAY BUDGET

    displayBudget: function(obj) {
      var type;

      obj.budget > 0 ? (type = "inc") : (type = "exp");

      document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(
        obj.budget,
        type
      );
      document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(
        obj.totalInc,
        "inc"
      );
      document.querySelector(
        DOMStrings.expensesLabel
      ).textContent = formatNumber(obj.totalExp, "exp");
      obj.totalExp;

      if (obj.percentage > 0) {
        document.querySelector(DOMStrings.percentageLabel).textContent =
          obj.percentage + "%";
      } else {
        document.querySelector(DOMStrings.percentageLabel).textContent = "---";
      }
    },

    // DISPLAY PERCENTAGES

    displayPercentages: function(percentages) {
      var fields = document.querySelectorAll(DOMStrings.expensesPercLabel);

      // first argument called fields = list, both the current & index arguments = callback
      nodeListForEach(fields, function(current, index) {
        if (percentages[index] > 0) {
          current.textContent = percentages[index] + "%";
        } else {
          current.textContent = "---";
        }
      });
    },

    // DISPLAY MONTH

    displayMonth: function() {
      var now, year, month, months;

      now = new Date();
      //var christmas = new Date(2016, 11, 25)

      year = now.getFullYear();

      months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "Septmeber",
        "October",
        "November",
        "December"
      ];
      month = now.getMonth();

      document.querySelector(DOMStrings.dateLabel).textContent =
        months[month] + " " + year;
    },

    // CHANGE INPUT BOX OUTLINE METHOD

    changedType: function() {
      var fields = document.querySelectorAll(
        DOMStrings.inputType +
          "," +
          DOMStrings.inputDesc +
          "," +
          DOMStrings.inputValue
      );

      //returns nodelist

      nodeListForEach(fields, function(cur) {
        cur.classList.toggle("red-focus");
      });

      document.querySelector(DOMStrings.inputBtn).classList.toggle("red");
    },

    //Making DOM strings accessible to the public scope
    getDOMStrings: function() {
      return DOMStrings;
    }
  };
})();
//--------------------------------------------------------------------------------

// GLOBAL APP CONTROLLER
//--------------------------------------------------------------------------------

var controller = (function(budgetCtrl, UICtrl) {
  var setupEventListeners = function() {
    //recieve dom strings
    var DOM = UICtrl.getDOMStrings();

    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function(event) {
      // not accessing a particular elemnt but a key press needs access to whole webpage

      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });

    document
      .querySelector(DOM.container)
      .addEventListener("click", ctrlDeleteItem);

    document
      .querySelector(DOM.inputType)
      .addEventListener("change", UICtrl.changedType);
  };

  //UPDATE BUDGET

  var updateBudget = function() {
    // 1. Calculate the budget
    budgetCtrl.calculateBudget();

    // 2. Return the budget
    var budget = budgetCtrl.getBudget();

    //3. Display the budget on the UI
    UICtrl.displayBudget(budget);
  };

  // UPDATE PERCENTAGES

  var updatePercentages = function() {
    // 1. Calculate Percentages
    budgetCtrl.calculatePercentages();

    // 2. Read Percentages from the budget controller
    var percentages = budgetCtrl.getPercentages();

    // 3. Update the UI with the new percentages
    UICtrl.displayPercentages(percentages);
  };

  //ADD ITEM

  var ctrlAddItem = function() {
    var input, newItem;
    //

    //1. Get the field input data
    input = UICtrl.getInput();
    // the input desc has no value and the number is nan and input is greater than zero
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      //2. Add the item to the budget Controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      //3. Add the item to the UI
      UICtrl.addlistItem(newItem, input.type);

      //4. Clear the fields
      UICtrl.clearFields();

      // 5, calculate & update budget
      updateBudget();

      // 6. calculate & update percentages
      updatePercentages();
    }
  };

  var ctrlDeleteItem = function(event) {
    var itemId, splitID, type, ID;
    //get id of parent div of inc or exp item that is clicked
    itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemId) {
      //inc-1
      splitID = itemId.split("-");
      //returns exp 0r inc
      type = splitID[0];
      //returns id number of exp or inc item added
      ID = parseInt(splitID[1]);

      //1. delete the item from the data structure
      budgetCtrl.deleteItem(type, ID);

      //2. delete the item from the UI
      UICtrl.deleteListItem(itemId);

      //3. Update and show the new budget
      updateBudget();

      // 4. calculate & update percentages
      updatePercentages();
    }
  };

  return {
    init: function() {
      console.log("Application has started");
      UICtrl.displayMonth();
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: 0
      });
      setupEventListeners();
    }
  };

  //pass in the budgetcontroller and the Ui controller
})(budgetController, UIController);
//-------------------------------------------------------------------------------

//run event listeners
controller.init();
