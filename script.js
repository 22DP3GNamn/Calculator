let display = document.getElementById('display');
let historyList = document.getElementById('historyList');
let history = JSON.parse(localStorage.getItem('history')) || [];

function appendNumber(number) {
    display.value += number;
}

function appendOperator(operator) {
    display.value += ` ${operator} `;
}

function clearDisplay() {
    display.value = '';
}

function calculate() {
    try {
        let result = eval(display.value);
        display.value = result;
        addToHistory(display.value);
    } catch (error) {
        display.value = 'Error';
    }
}

function addToHistory(result) {
    history.push(result);
    localStorage.setItem('history', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = '';
    history.forEach((item, index) => {
        let li = document.createElement('li');
        li.innerHTML = `${item} <button onclick="deleteHistory(${index})">Dzēst</button>`;
        historyList.appendChild(li);
    });
}

function deleteHistory(index) {
    history.splice(index, 1);
    localStorage.setItem('history', JSON.stringify(history));
    renderHistory();
}

function clearHistory() {
    history = [];
    localStorage.setItem('history', JSON.stringify(history));
    renderHistory();
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

renderHistory();