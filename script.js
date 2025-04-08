const displayBig = document.querySelector(".text-big");
const displaySmall = document.querySelector(".small");
const buttons = document.querySelectorAll("button");

let currentInput = "";       
let expression = "";  
let firstOperand = null;
let operator = null;

function calculate(a, operator, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  switch (operator) {
    case "+":
      return a + b;
    case "−":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      return b !== 0 ? a / b : "Ошибка";
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.innerText;

    // ===== Число или точка =====
    if (!isNaN(value) || value === ".") {
      if (value === "." && currentInput.includes(".")) return;

      currentInput += value;
      expression += value;
      displayBig.innerText = expression;
    }

    // ===== Оператор =====
    else if (["+", "−", "×", "÷"].includes(value)) {
      if (currentInput === "") return;

      if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
      } else if (operator) {
        const secondOperand = parseFloat(currentInput);
        firstOperand = calculate(firstOperand, operator, secondOperand);
      }

      operator = value;
      expression += `${value}`;
      currentInput = "";

      displayBig.innerText = expression;
    }

    // ===== Delete =====
    else if (value === "Delete") {
      if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1); 
        expression = expression.slice(0, -1);  
        displayBig.innerText = expression || "0"; 
      }
    }

    // ===== Равно =====
    else if (value === "=") {
      if (operator && currentInput !== "") {
        const secondOperand = parseFloat(currentInput);
        const result = calculate(firstOperand, operator, secondOperand);

        displaySmall.innerText = expression; 
        displayBig.innerText = result;  

        currentInput = result.toString(); 
        expression = currentInput;
        firstOperand = parseFloat(currentInput); 
        operator = null; 
      }
    }

    // ===== Очистка =====
    else if (value === "C") {
      currentInput = "";
      expression = "";
      firstOperand = null;
      operator = null;

      displayBig.innerText = "0";
      displaySmall.innerText = "";
    }
  });
});
