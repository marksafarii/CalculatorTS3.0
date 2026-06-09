const display = document.querySelector('.display');

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

//keyboard support
document.addEventListener('keydown', function(e) {
    const key = e.key;

   if (!isNaN(key) || ['+', '-', '÷', '×'].includes(key)) {
    appendValue(key);
} else if (key === 'Enter' || key === '=') {
    calculateResult();
} else if (key === 'Backspace') {
    display.value = display.value.slice(0, -1);

}else if (key === 'Escape') {
    clearDisplay();
}
});

//light and dark mode toggle
function toggleTheme() {
    document.body.classList.toggle('dark');

}

//History feature setting
const historyList = document.getElementById('historyList');

function calculateResult() { 
    if(!display.value) return;
    try {
        //TRANSLATION LAYER
        //this take the display value and replaces '÷" with '/' and '×' with '*' 
        let expression = display.value.replace(/÷/g, '/').replace(/×/g, '*');  
        
        //Now js understands the expression and can evaluate it
        const result = Function(`'use strict'; return (${expression})`)();

        historyList.innerHTML += `<li>${display.value} = ${result}</li>`;
        display.value = result;
}catch {
        display.value = 'Error';  
}
}
