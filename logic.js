const display = document.getElementById('display');

function appendToDisplay(input) {
    display.value += input;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Factorial Helper Function
function getFactorial(n) {
    if (n < 0) return "Error";
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
}

function calculate() {
    try {
        let expression = display.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-');

        let result = eval(expression);
        // Dynamic decimal adjustment (Max 12 places, no trailing zeros)
        display.value = Math.round(result * 1e12) / 1e12;
    } catch (error) {
        display.value = "Error";
        setTimeout(clearDisplay, 1500);
    }
}

function scientific(type) {
    let val = parseFloat(display.value) || 0;
    let result;

    switch(type) {
        case 'sin': result = Math.sin(val * Math.PI / 180); break;
        case 'cos': result = Math.cos(val * Math.PI / 180); break;
        case 'tan': result = Math.tan(val * Math.PI / 180); break;
        case 'sqrt': result = Math.sqrt(val); break;
        case 'log': result = Math.log10(val); break;
        case 'ln': result = Math.log(val); break; // Math.log(x) is Natural Log (ln) in JS
        case 'fact': result = getFactorial(val); break;
        case 'pi': 
            display.value += Math.PI; 
            return;
    }
    
    // Check if result is a number before rounding
    if (typeof result === 'number') {
        display.value = Math.round(result * 1e12) / 1e12;
    } else {
        display.value = result; // Displays "Error" for negative factorials
    }
}