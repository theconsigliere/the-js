// Budget Calculator
//--------------------------------------------------------------------------------

// BUDGET CONTROLLER
//--------------------------------------------------------------------------------
//IIFE function
//creates own scope
var budgetController = (function() {
  //function constructors
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  //function constructors
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };
})();

//--------------------------------------------------------------------------------
// seperation of concerns, each module is a stand alone

// UI CONTROLLER
//--------------------------------------------------------------------------------
var UIController = (function() {
  //some code

  var DOMStrings = {
    // put all of selectors in a object so we can access them easily
    inputType: ".add__type",
    inputDesc: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn"
  };

  return {
    getInput: function() {
      return {
        // returns all inputs as an object
        type: document.querySelector(DOMStrings.inputType).value, // will be either inc or exp
        description: document.querySelector(DOMStrings.inputDesc).value,
        value: document.querySelector(DOMStrings.inputValue).value
      };
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
//budget & UI controller passed in and named different so if we chose to pass in different values the mdoule will still work
var controller = (function(budgetCtrl, UICtrl) {
  var setupEventListeners = function() {
    //recieve dom strings
    var DOM = UICtrl.getDOMStrings();

    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function(event) {
      // not accessing a particular elemnt but a key press needs access to whole webpage
      //console.log(event.keyCode);
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  //called when event listener is pressed of clicked
  var ctrlAddItem = function() {
    //
    //1. Get the field input data
    var input = UICtrl.getInput();

    //2. Add the item to the budget Controller
    //3. Add the item to the UI
    //4. Calculate the budget
    //5. Display the budget on the UI
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
