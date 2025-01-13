// var screen = document.querySelector("#inputField");
// var btn = document.querySelectorAll(".btn");

// for (item of btn) {
//   // to show text in the inputField
//   item.addEventListener("click", (e) => {
//     btntext = e.target.innerText; //e.target refers to DOM element that was clicked
//     //and .innerText gives the text of button

//     screen.value += btntext;
//   });
// }

// function evaluateExpression() {
//   const expression = screen.value;

//   try {
//     // Validate the expression using a regex
//     const isValid =
//       /^[0-9+\-*/().\s]*$/.test(expression) && !/[+\-*/.]{2,}/.test(expression);

//     if (!isValid || /[+\-*/]$/.test(expression)) {
//       screen.value = "Invalid Expression!";
//       return;
//     }

//     //move here if regular exp is valid
//     const result = eval(expression);
//     const formattedResult = parseFloat(result.toFixed(4));
//     screen.value = formattedResult;
//     addToHistory(`${expression} = ${formattedResult}`);
//   } catch (error) {
//     screen.value = "Error!";
//   }
// }

// function addToHistory(entry) {
//   const historyDiv = document.querySelector("#history");
//   const historyItem = document.createElement("div");
//   historyItem.innerText = entry;
//   historyDiv.appendChild(historyItem);
// }

// function clearHistory() {
//   const historyDiv = document.querySelector("#history");
//   historyDiv.innerHTML = "";
// }

// function sin() {
//   screen.value = Math.sin(screen.value);
// }
// function cos() {
//   screen.value = Math.cos(screen.value);
// }
// function tan() {
//   screen.value = Math.tan(screen.value);
// }
// function power() {
//   screen.value = Math.pow(screen.value, 2);
// }
// function sqrt() {
//   screen.value = Math.sqrt(screen.value, 2);
// }
// function log() {
//   screen.value = Math.log(screen.value);
// }
// function pi() {
//   screen.value = 3.1415;
// }
// function e() {
//   screen.value = 2.7182;
// }
// function factorial() {
//   let i, num, f;
//   f = 1;
//   num = screen.value;
//   for (i = 1; i <= num; i++) {
//     f = f * i;
//   }
//   screen.value = f;
// }
// function backSpace() {
//   screen.value = screen.value.substr(0, screen.value.length - 1);
// }

var screen = document.querySelector("#inputField");
var btn = document.querySelectorAll(".btn");

for (item of btn) {
  // to show text in the inputField
  item.addEventListener("click", (e) => {
    btntext = e.target.innerText; //e.target refers to DOM element that was clicked
    //and .innerText gives the text of button

    screen.value += btntext;
  });
}

function evaluateExpression() {
  const expression = screen.value;

  try {
    // Validate the expression using a regex

    // Step 1: Convert infix expression to postfix
    const postfixExpression = infixToPostfix(expression);

    // Step 2: Evaluate the postfix expression
    const result = evaluatePostfix(postfixExpression);

    // Format the result and update the screen
    const formattedResult = parseFloat(result.toFixed(4));
    screen.value = formattedResult;
    addToHistory(`${expression} = ${formattedResult}`);
  } catch (error) {
    screen.value = "Error!";
  }
}

function infixToPostfix(expression) {
  const precedence = { "+": 1, "-": 1, "*": 2, "/": 2, "%": 2 }; // Operator precedence
  const output = [];
  const operators = [];

  // Tokenize the input expression
  const tokens = expression.match(/\d+(\.\d+)?|[+\-*/%()]/g);

  if (!tokens) {
    throw new Error("Invalid expression!");
  }

  tokens.forEach((token) => {
    if (!isNaN(token)) {
      // If token is a number, add to the output
      output.push(token);
    } else if ("+-*/%".includes(token)) {
      // If token is an operator
      while (
        operators.length &&
        precedence[operators[operators.length - 1]] >= precedence[token]
      ) {
        output.push(operators.pop());
      }
      operators.push(token);
    } else if (token === "(") {
      // If token is '(', push it to the operator stack
      operators.push(token);
    } else if (token === ")") {
      // If token is ')', pop from the stack until '(' is found
      while (operators.length && operators[operators.length - 1] !== "(") {
        output.push(operators.pop());
      }
      operators.pop(); // Remove '('
    }
  });

  // Pop any remaining operators into the output
  while (operators.length) {
    output.push(operators.pop());
  }

  return output;
}

function evaluatePostfix(postfixExpression) {
  const stack = [];

  postfixExpression.forEach((token) => {
    if (!isNaN(token)) {
      // If the token is a number, push it onto the stack
      stack.push(parseFloat(token));
    } else {
      // If the token is an operator, pop the top two elements from the stack
      const b = stack.pop();
      const a = stack.pop();

      // Perform the operation based on the token
      switch (token) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
          stack.push(a / b);
          break;
        case "%":
          stack.push(a % b);
          break;
        default:
          throw new Error(`Unknown operator: ${token}`);
      }
    }
  });

  // The final result is the only element left in the stack
  return stack[0];
}

function addToHistory(entry) {
  const historyDiv = document.querySelector("#history");
  const historyItem = document.createElement("div");
  historyItem.innerText = entry;
  historyDiv.appendChild(historyItem);
}

function clearHistory() {
  const historyDiv = document.querySelector("#history");
  historyDiv.innerHTML = "";
}

function sin() {
  screen.value = Math.sin(screen.value);
}
function cos() {
  screen.value = Math.cos(screen.value);
}
function tan() {
  screen.value = Math.tan(screen.value);
}
function power() {
  screen.value = Math.pow(screen.value, 2);
}
function sqrt() {
  screen.value = Math.sqrt(screen.value, 2);
}
function log() {
  screen.value = Math.log(screen.value);
}
function pi() {
  screen.value = 3.1415;
}
function e() {
  screen.value = 2.7182;
}
function factorial() {
  let i, num, f;
  f = 1;
  num = screen.value;
  for (i = 1; i <= num; i++) {
    f = f * i;
  }
  screen.value = f;
}
function backSpace() {
  screen.value = screen.value.substr(0, screen.value.length - 1);
}
