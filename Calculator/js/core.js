//The calculator object above consists of everything that we need to construct a valid expression:
const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};
const keys = document.querySelector(".calculator-keys");

keys.addEventListener(
  "click",
  (event) => {
    // Access the clicked element
    const { target } = event; // equivalent to const target = event.target;

    // Check if the cliked element is a button
    // If no exit from the function
    // matches fonction check with the css selector
    if (!target.matches("button")) {
      return;
    }

    if (target.classList.contains("operator")) {
      handleOperator(target.value);
      updateDisplay();

      return;
    }

    if (target.classList.contains("decimal")) {
      inputDecimal(target.value);
      updateDisplay();
      return;
    }

    if (target.classList.contains("all-clear")) {
      console.log("all-clear : ", target.value);
      return;
    }

    inputDigit(target.value);
    updateDisplay();
  },
  false
);

updateDisplay();

function updateDisplay() {
  // Select the element with the class 'calculator-screen'
  const display = document.querySelector(".calculator-screen");
  //Update the value of the element with the content of DisplayValue
  display.value = calculator.displayValue;
}

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;
  // Overwrite `displayValue` if the current value is '0' otherwise append to it

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }

  console.log(calculator);
}

function inputDecimal(dot) {
  // If the `displayValue` property does not contain a decimal point
  if (!calculator.displayValue.includes(dot)) {
    // Append decimal point
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  // Destructure the properties on the calculator object
  const { firstOperand, displayValue, operator } = calculator;
  // `parseFloat` converts the string contents of `displayValue`
  // to a floating-point number
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

  // verify that `firstOperand` is null and that the `inputValue`
  // is not a `NaN` value
  if (firstOperand === null && !isNaN(inputValue)) {
    // Update the firstOperand property
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;

  console.log(calculator);
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "*") {
    return firstOperand * secondOperand;
  } else if (operator === "/") {
    return firstOperand / secondOperand;
  }

  return secondOperand;
}
