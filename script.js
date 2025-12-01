// Variables to store calculator state
let currentInput = '0';
let operator = null;
let previousInput = null;
let shouldResetDisplay = false;

// Get display element
const display = document.getElementById('display');

// Ensure display element exists
if (!display) {
    console.error('Display element not found!');
}

/**
 * Update the calculator display
 */
function updateDisplay() {
    display.textContent = currentInput;
}

/**
 * Append a number to the current input
 * @param {string} number - The number to append
 */
function appendNumber(number) {
    if (shouldResetDisplay) {
        currentInput = number;
        shouldResetDisplay = false;
    } else {
        currentInput = currentInput === '0' ? number : currentInput + number;
    }
    updateDisplay();
}

/**
 * Append a decimal point to the current input
 */
function appendDecimal() {
    if (shouldResetDisplay) {
        currentInput = '0.';
        shouldResetDisplay = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

/**
 * Set the operator for the calculation
 * @param {string} op - The operator (+, -, *, /)
 */
function appendOperator(op) {
    if (operator !== null && !shouldResetDisplay) {
        calculate();
    }
    previousInput = currentInput;
    operator = op;
    shouldResetDisplay = true;
}

/**
 * Perform the calculation based on the selected operator
 */
function calculate() {
    if (operator === null || previousInput === null) return;

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;

    // Perform calculation based on operator
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            // Check for division by zero
            if (current === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    // Update display with result
    // Round to avoid floating point precision issues
    currentInput = (Math.round(result * 100000000) / 100000000).toString();
    operator = null;
    previousInput = null;
    shouldResetDisplay = true;
    updateDisplay();
}

/**
 * Clear the calculator display and reset all values
 */
function clearDisplay() {
    currentInput = '0';
    operator = null;
    previousInput = null;
    shouldResetDisplay = false;
    updateDisplay();
}

/**
 * Keyboard support for calculator
 * Allows users to use their keyboard instead of clicking buttons
 */
document.addEventListener('keydown', function(event) {
    // Number keys
    if (event.key >= '0' && event.key <= '9') {
        appendNumber(event.key);
    } 
    // Decimal point
    else if (event.key === '.') {
        appendDecimal();
    } 
    // Operators
    else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        appendOperator(event.key);
    } 
    // Calculate (Enter or = key)
    else if (event.key === 'Enter' || event.key === '=') {
        calculate();
    } 
    // Clear (Escape or C key)
    else if (event.key === 'Escape' || event.key === 'c' || event.key === 'C') {
        clearDisplay();
    }
});