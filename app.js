class Calculator {
  constructor(prevButton, currButton) {
    this.prevButton = prevButton;
    this.currButton = currButton;
    this.clear();
  }
  clear() {
    this.prevOper = "";
    this.currOper = "";
    this.operation = undefined;
  }
  delete() {
    this.currOper = this.currOper.toString().slice(0, -1);
  }
  append(number) {
    if (number === "." && this.currOper.includes(".")) return;
    this.currOper = this.currOper.toString() + number.toString();
  }
  choose(operation) {
    if (this.currOper === "") return;
    if (this.prevOper !== "") {
      this.compute();
    }
    this.operation = operation;
    this.prevOper = this.currOper;
    this.currOper = "";
  }
  compute() {
    let computaion;
    const prev = parseFloat(this.prevOper);
    const current = parseFloat(this.currOper);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computaion = prev + current;
        break;
      case "-":
        computaion = prev - current;
        break;
      case "*":
        computaion = prev * current;
        break;
      case "/":
        computaion = prev / current;
        break;
      default:
        return;
    }
    this.currOper = computaion;
    this.operation = undefined;
    this.prevOper = "";
  }
  update() {
    this.currButton.innerText = this.currOper;
    if (this.operation != null) {
      this.prevButton.innerText = `${this.prevOper} ${this.operation}`;
    }else{
        this.prevButton.innerText = this.prevOper;
    }
  }
}
const numberButton = document.querySelectorAll("[data-number]");
const operationButton = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const delButton = document.querySelector("[data-del]");
const prevButton = document.querySelector("[data-prev]");
const currButton = document.querySelector("[data-curr]");

const calculator = new Calculator(prevButton, currButton);

numberButton.forEach(button => {
  button.addEventListener("click", () => {
    calculator.append(button.innerText);
    calculator.update();
  });
});

operationButton.forEach(button => {
  button.addEventListener("click", () => {
    calculator.choose(button.innerText);
    calculator.update();
  });
});

equalsButton.addEventListener("click", button => {
  calculator.compute();
  calculator.update();
});

allClearButton.addEventListener("click", button => {
    calculator.clear();
    calculator.update();
});

delButton.addEventListener("click", button => {
  calculator.delete();
  calculator.update();
});
