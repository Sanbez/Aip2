
"use strict";

// Функция для безопасного добавления элементов
function safeAppend(element) {
    if (document.body) {
        document.body.appendChild(element);
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            document.body.appendChild(element);
        });
    }
}

console.log("=== ОСНОВЫ РАБОТЫ С ФУНКЦИЕЙ SETINTERVAL В JAVASCRIPT ===");

// №1 - Таймер каждые 3 секунды
setInterval(function() {
    console.log("№1 - Таймер сработал!");
}, 3000);
console.log("№1 - Таймер каждые 3 секунды запущен");
console.log("-------------");

console.log("=== СЧЕТЧИК ЧЕРЕЗ ФУНКЦИЮ SETINTERVAL В JAVASCRIPT ===");

// №1 - Обратный отсчет от 100
let counter1 = 100;
setInterval(function() {
    counter1--;
    console.log("№1 - Обратный отсчет:", counter1);
}, 1000);
console.log("№1 - Обратный отсчет от 100 запущен");
console.log("-------------");

console.log("=== ОСТАНОВКА ТАЙМЕРА JAVASCRIPT ===");

// №1 - Остановка таймера при достижении 0
let counter2 = 10;
let timerId1 = setInterval(function() {
    console.log("№1 - Таймер:", counter2);
    counter2--;
    if (counter2 < 0) {
        clearInterval(timerId1);
        console.log("№1 - Таймер остановлен");
    }
}, 1000);
console.log("№1 - Таймер с остановкой запущен");
console.log("-------------");

console.log("=== КНОПКА ДЛЯ ЗАПУСКА ТАЙМЕРА НА JAVASCRIPT ===");

// №1 - Кнопка для обратного отсчета
const button1 = document.createElement('button');
button1.textContent = 'Запустить отсчет от 100';
const output1 = document.createElement('div');
safeAppend(button1);
safeAppend(output1);

button1.addEventListener('click', function() {
    let count = 100;
    output1.textContent = `Отсчет: ${count}`;
    
    const timerId = setInterval(function() {
        count--;
        output1.textContent = `Отсчет: ${count}`;
        if (count <= 0) {
            clearInterval(timerId);
        }
    }, 1000);
});
console.log("№1 - Кнопка для запуска отсчета создана");
console.log("-------------");

console.log("=== МНОГОКРАТНОЕ НАЖАТИЕ НА КНОПКУ ДЛЯ ЗАПУСКА ТАЙМЕРА НА JAVASCRIPT ===");

// №1 - Исправление проблемы многократного нажатия
const button2 = document.createElement('button');
button2.textContent = 'Запустить защищенный отсчет';
const output2 = document.createElement('div');
safeAppend(button2);
safeAppend(output2);

button2.addEventListener('click', function func() {
    let count = 100;
    output2.textContent = `Защищенный отсчет: ${count}`;
    
    const timerId = setInterval(function() {
        count--;
        output2.textContent = `Защищенный отсчет: ${count}`;
        if (count <= 0) {
            clearInterval(timerId);
        }
    }, 1000);
    
    this.removeEventListener('click', func);
});
console.log("№1 - Кнопка с защитой от многократного нажатия создана");
console.log("-------------");

console.log("=== ПРАКТИКА НА ТАЙМЕРЫ И РАБОТУ С DOM В JAVASCRIPT ===");

// №1-3 - Работа с инпутом
const input1 = document.createElement('input');
input1.id = 'elem1';
input1.value = '10';
safeAppend(input1);

let timerId2 = setInterval(function() {
    input1.value = Number(input1.value) - 1;
    if (Number(input1.value) <= 0) {
        clearInterval(timerId2);
    }
}, 1000);
console.log("№1-3 - Инпут с обратным отсчетом создан");
console.log("-------------");

// №4 - Обратный отсчет по потере фокуса
const input2 = document.createElement('input');
input2.placeholder = 'Введите число';
const paragraph1 = document.createElement('p');
paragraph1.textContent = 'Ожидание ввода...';
safeAppend(input2);
safeAppend(paragraph1);

input2.addEventListener('blur', function() {
    let count = Number(this.value);
    paragraph1.textContent = count;
    
    const timerId = setInterval(function() {
        count--;
        paragraph1.textContent = count;
        if (count <= 0) {
            clearInterval(timerId);
            paragraph1.textContent = 'Отсчет завершен!';
        }
    }, 1000);
});
console.log("№4 - Обратный отсчет по потере фокуса создан");
console.log("-------------");

// №5 - Отсчет по кнопке
const input3 = document.createElement('input');
input3.placeholder = 'Введите число';
const button3 = document.createElement('button');
button3.textContent = 'Запустить отсчет';
const paragraph2 = document.createElement('p');
paragraph2.textContent = 'Результат...';
safeAppend(input3);
safeAppend(button3);
safeAppend(paragraph2);

button3.addEventListener('click', function() {
    let count = Number(input3.value);
    paragraph2.textContent = count;
    
    const timerId = setInterval(function() {
        count--;
        paragraph2.textContent = count;
        if (count <= 0) {
            clearInterval(timerId);
        }
    }, 1000);
});
console.log("№5 - Отсчет по кнопке создан");
console.log("-------------");

// №6 - Запуск и остановка таймера
const paragraph3 = document.createElement('p');
paragraph3.textContent = '0';
const button4 = document.createElement('button');
button4.textContent = 'Старт';
const button5 = document.createElement('button');
button5.textContent = 'Стоп';
safeAppend(paragraph3);
safeAppend(button4);
safeAppend(button5);

let timerId3;
let counter3 = 0;

button4.addEventListener('click', function() {
    if (timerId3) return;
    
    timerId3 = setInterval(function() {
        counter3++;
        paragraph3.textContent = counter3;
    }, 1000);
});

button5.addEventListener('click', function() {
    if (timerId3) {
        clearInterval(timerId3);
        timerId3 = null;
    }
});
console.log("№6 - Таймер с кнопками старт/стоп создан");
console.log("-------------");

// №7 - Мигающий текст
const paragraph4 = document.createElement('p');
paragraph4.textContent = 'Мигающий текст';
paragraph4.style.color = 'red';
safeAppend(paragraph4);

let isRed = true;
setInterval(function() {
    paragraph4.style.color = isRed ? 'green' : 'red';
    isRed = !isRed;
}, 1000);
console.log("№7 - Мигающий текст создан");
console.log("-------------");

// №8 - Часы
const clock = document.createElement('div');
clock.style.fontSize = '24px';
clock.style.fontWeight = 'bold';
clock.style.padding = '20px';
clock.style.border = '2px solid black';
clock.style.display = 'inline-block';
safeAppend(clock);

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clock.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock();
console.log("№8 - Часы созданы");
console.log("-------------");

console.log("=== ТАЙМЕРЫ И ПОТЕРЯ КОНТЕКСТА В JAVASCRIPT ===");

// №1 - Исправление ошибки с контекстом
const button6 = document.createElement('input');
button6.type = 'button';
button6.id = 'elem2';
button6.value = '1';
safeAppend(button6);

button6.addEventListener('click', function() {
    let self = this;
    setInterval(function() {
        self.value = Number(self.value) + 1;
    }, 1000);
});
console.log("№1 - Ошибка с контекстом исправлена");
console.log("-------------");

console.log("=== ЗАДЕРЖКА ПЕРЕД ВЫПОЛНЕНИЕМ В JAVASCRIPT ===");

// №1 - Сообщение через 10 секунд
const paragraph5 = document.createElement('p');
paragraph5.textContent = 'Ожидайте сообщение...';
safeAppend(paragraph5);

setTimeout(function() {
    paragraph5.textContent = 'Сообщение через 10 секунд!';
}, 10000);
console.log("№1 - Таймер с задержкой 10 секунд установлен");
console.log("-------------");

console.log("=== ЗАПУСК ТАЙМЕРА В JAVASCRIPT ===");

// №1 - Рекурсивный таймер с увеличением задержки
let counter4 = 0;
let delay = 0;

function recursiveTimer() {
    setTimeout(function() {
        console.log("№1 - Рекурсивный таймер:", counter4);
        counter4++;
        delay += 1000;
        recursiveTimer();
    }, delay);
}

recursiveTimer();
console.log("№1 - Рекурсивный таймер запущен");
console.log("-------------");

// Если документ уже загружен, добавляем элементы сразу
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOM загружен, все элементы добавлены");
    });
} else {
    console.log("DOM уже загружен, все элементы добавлены");
}
