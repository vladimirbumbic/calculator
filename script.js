const theme1 = document.getElementById('theme1');
const theme2 = document.getElementById('theme2');
const theme3 = document.getElementById('theme3');
const buttons = document.querySelectorAll('button');
const themeToggle = document.querySelectorAll('label');

function toggleTheme(switchTheme) {
    document.documentElement.setAttribute('data-theme', switchTheme);

    themeToggle.forEach((elem) => {
        elem.classList.remove('toggleMove');
    });

    if (switchTheme === 'theme1') {
        return themeToggle[0].classList.add('toggleMove');
    } else if (switchTheme === 'theme2') {
        return themeToggle[1].classList.add('toggleMove');
    } else {
        return themeToggle[2].classList.add('toggleMove');
    }
}

toggleTheme('theme1');

theme1.addEventListener('click', () => {
    toggleTheme('theme1');
});

theme2.addEventListener('click', () => {
    toggleTheme('theme2');
});

theme3.addEventListener('click', () => {
    toggleTheme('theme3');
});

const calculator = {
    displayValue: '0',
    firstOperand: null,
    secondOperand: false,
    operator: null,
};

function inputDigit(number) {
    const { displayValue, secondOperand } = calculator;

    if (secondOperand === true) {
        calculator.displayValue = number;
        calculator.secondOperand = false;
    } else {
        if (calculator.displayValue.length <= 10) {
            calculator.displayValue =
                displayValue === '0' ? number : displayValue + number;
        }
    }
}

function inputDecimal(dot) {
    if (calculator.secondOperand === true) {
        calculator.displayValue = '0.';
        calculator.secondOperand = false;
        return;
    }

    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function updateDisplay() {
    const display = document.querySelector('.display');
    display.textContent =
        Number(calculator.displayValue) <= 99999999999
            ? Number(calculator.displayValue).toLocaleString('en-US', {
                  max: 10,
              })
            : Number(calculator.displayValue).toExponential(4);
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator !== '=' && calculator.secondOperand) {
        calculator.operator = nextOperator;
        return;
    }

    if (firstOperand == null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);

        calculator.displayValue = `${parseFloat(result.toFixed(10))}`;
        calculator.firstOperand = result;
    }

    calculator.secondOperand = true;
    calculator.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === 'x') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    }
    return secondOperand;
}

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.secondOperand = false;
    calculator.operator = null;
}

function handleInput(input) {
    switch (input) {
        case '+':
        case '-':
        case 'x':
        case '/':
        case '=':
            handleOperator(input);
            break;
        case 'DEL':
            calculator.displayValue = calculator.displayValue.slice(0, -1);
            break;
        case '.':
            inputDecimal(input);
            break;
        case 'RESET':
            resetCalculator();
            break;
        default:
            if (Number.isInteger(parseFloat(input))) {
                inputDigit(input);
            }
    }
    updateDisplay();
}

buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const { textContent } = e.target;
        handleInput(textContent);
    });
});
