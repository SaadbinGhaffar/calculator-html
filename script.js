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
    const isValid =
      /^[0-9+\-*/().\s]*$/.test(expression) && !/[+\-*/.]{2,}/.test(expression);

    if (!isValid || /[+\-*/]$/.test(expression)) {
      screen.value = "Invalid Expression!";
      return;
    }

    //move here if regular exp is valid
    const result = eval(expression);
    const formattedResult = parseFloat(result.toFixed(4));
    screen.value = formattedResult;
    addToHistory(`${expression} = ${formattedResult}`);
  } catch (error) {
    screen.value = "Error!";
  }
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
