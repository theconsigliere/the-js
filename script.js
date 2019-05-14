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

  //--------------------------------------------------------------------------------

  // DATA OBJECT
  //--------------------------------------------------------------------------------

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
    expensesContainer: ".expenses__list"
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
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        //
        element = DOMStrings.expensesContainer;
        html =
          ' <div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div> <div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // Replace the placeholder text with some actual data

      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);

      //insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
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
  };

  //UPDATE BUDGET

  var updateBudget = function() {
    // 1. Calculate the budget
    budgetCtrl.calculateBudget();

    // 2. Return the budget
    var budget = budgetCtrl.getBudget();

    console.log(budget);
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
    }
  };

  return {
    init: function() {
      setupEventListeners();
    }
  };

  //pass in the budgetcontroller and the Ui controller
})(budgetController, UIController);
//-------------------------------------------------------------------------------

//run event listeners
controller.init();
