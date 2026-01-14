
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

console.log("=== ОСНОВЫ РАБОТЫ С ОБЪЕКТОМ EVENT В JAVASCRIPT ===");

// №1 - Вывод объекта события в консоль
const button1 = document.createElement('button');
button1.textContent = 'Нажми меня';
safeAppend(button1);

button1.addEventListener('click', function(event) {
    console.log("№1 - Объект события:", event);
});
console.log("№1 - Кнопка для изучения события создана");
console.log("-------------");

console.log("=== КООРДИНАТЫ СОБЫТИЯ В JAVASCRIPT ===");

// №1 - Отображение координат курсора
const coordsDisplay = document.createElement('div');
coordsDisplay.style.position = 'fixed';
coordsDisplay.style.top = '10px';
coordsDisplay.style.right = '10px';
coordsDisplay.style.padding = '10px';
coordsDisplay.style.backgroundColor = 'white';
coordsDisplay.style.border = '1px solid black';
coordsDisplay.textContent = '0:0';
safeAppend(coordsDisplay);

document.addEventListener('mousemove', function(event) {
    coordsDisplay.textContent = `${event.clientX}:${event.clientY}`;
});
console.log("№1 - Отображение координат создано");
console.log("-------------");

console.log("=== ТИП СОБЫТИЯ В ОБЪЕКТЕ EVENT В JAVASCRIPT ===");

// №1 - Разные цвета по разным кликам
const button2 = document.createElement('button');
button2.textContent = 'Клик/Двойной клик';
safeAppend(button2);

function func(event) {
    if (event.type === 'click') {
        button2.style.backgroundColor = 'green';
    } else if (event.type === 'dblclick') {
        button2.style.backgroundColor = 'red';
    }
}

button2.addEventListener('click', func);
button2.addEventListener('dblclick', func);
console.log("№1 - Кнопка с разными событиями создана");
console.log("-------------");

console.log("=== ЭЛЕМЕНТ СОБЫТИЯ В ОБЪЕКТЕ EVENT В JAVASCRIPT ===");

// №1 - Обработка кликов по списку
const ul1 = document.createElement('ul');
ul1.id = 'elem';
ul1.style.padding = '30px';
ul1.style.border = '1px solid red';

for (let i = 1; i <= 5; i++) {
    const li = document.createElement('li');
    li.textContent = 'text';
    li.style.listStyleType = 'none';
    li.style.marginBottom = '20px';
    li.style.border = '1px dashed black';
    ul1.appendChild(li);
}

safeAppend(ul1);

ul1.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        event.target.textContent += '!';
    } else if (event.target.tagName === 'UL') {
        console.log("Клик по тегу UL");
    }
});
console.log("№1 - Список с обработкой кликов создан");
console.log("-------------");

console.log("=== ПОЛУЧЕНИЕ НАЖАТЫХ КЛАВИШ В JAVASCRIPT ===");

// №1 - Вывод клавиш и их кодов
const input1 = document.createElement('input');
input1.placeholder = 'Вводите текст здесь...';
const output1 = document.createElement('div');
safeAppend(input1);
safeAppend(output1);

input1.addEventListener('keypress', function(event) {
    output1.textContent = `Клавиша: "${event.key}", Код: ${event.code}`;
});
console.log("№1 - Инпут с выводом клавиш создан");
console.log("-------------");

// №3-4 - Коды специальных клавиш
const input2 = document.createElement('input');
input2.placeholder = 'Нажмите Enter или Backspace...';
safeAppend(input2);

input2.addEventListener('keydown', function(event) {
    if (event.code === 'Enter') {
        console.log("№3 - Код клавиши Enter: Enter");
    }
    if (event.code === 'Backspace') {
        console.log("№4 - Код клавиши Backspace: Backspace");
    }
});
console.log("№3-4 - Инпут для проверки специальных клавиш создан");
console.log("-------------");

console.log("=== ОТСЛЕЖИВАНИЕ КЛАВИШ-МОДИФИКАТОРОВ В JAVASCRIPT ===");

// №1 - Клик с Alt
const div1 = document.createElement('div');
div1.textContent = 'Кликни с Alt';
div1.style.padding = '20px';
div1.style.border = '1px solid black';
div1.style.margin = '10px';
safeAppend(div1);

div1.addEventListener('click', function(event) {
    if (event.altKey) {
        this.style.backgroundColor = 'red';
    }
});
console.log("№1 - Элемент с Alt-кликом создан");
console.log("-------------");

// №2 - Список с Ctrl/Shift
const ul2 = document.createElement('ul');
ul2.id = 'elem';
for (let i = 1; i <= 5; i++) {
    const li = document.createElement('li');
    li.textContent = 'text';
    ul2.appendChild(li);
}
safeAppend(ul2);

ul2.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        if (event.ctrlKey) {
            event.target.textContent += '1';
        } else if (event.shiftKey) {
            event.target.textContent += '2';
        }
    }
});
console.log("№2 - Список с Ctrl/Shift создан");
console.log("-------------");

console.log("=== ОТМЕНА ДЕЙСТВИЯ ПО УМОЛЧАНИЮ В JAVASCRIPT ===");

// №1 - Ссылки без перехода
const link1 = document.createElement('a');
link1.href = 'https://example.com';
link1.textContent = 'Ссылка 1';
const link2 = document.createElement('a');
link2.href = 'https://google.com';
link2.textContent = 'Ссылка 2';
safeAppend(link1);
safeAppend(link2);

[link1, link2].forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        this.textContent += ` (${this.href})`;
    });
});
console.log("№1 - Ссылки с отменой перехода созданы");
console.log("-------------");

// №2 - Сумма чисел по ссылке
const input3 = document.createElement('input');
input3.type = 'number';
const input4 = document.createElement('input');
input4.type = 'number';
const paragraph1 = document.createElement('p');
paragraph1.textContent = 'Сумма: ';
const link3 = document.createElement('a');
link3.href = '#';
link3.textContent = 'Посчитать сумму';
safeAppend(input3);
safeAppend(input4);
safeAppend(link3);
safeAppend(paragraph1);

link3.addEventListener('click', function(event) {
    event.preventDefault();
    const sum = Number(input3.value) + Number(input4.value);
    paragraph1.textContent = `Сумма: ${sum}`;
});
console.log("№2 - Форма с суммой создана");
console.log("-------------");

console.log("=== ВСПЛЫТИЕ СОБЫТИЙ В JAVASCRIPT ===");

// №1 - Демонстрация всплытия
const div2 = document.createElement('div');
div2.style.padding = '50px';
div2.style.backgroundColor = 'green';
div2.textContent = 'Зеленый (родитель)';

const div3 = document.createElement('div');
div3.style.padding = '30px';
div3.style.backgroundColor = 'blue';
div3.textContent = 'Голубой (ребенок)';

const div4 = document.createElement('div');
div4.style.padding = '20px';
div4.style.backgroundColor = 'red';
div4.textContent = 'Красный (внук)';

div3.appendChild(div4);
div2.appendChild(div3);
safeAppend(div2);

[div2, div3, div4].forEach((elem, index) => {
    elem.addEventListener('click', function(event) {
        console.log(`Клик по ${['зеленому', 'голубому', 'красному'][index]} блоку`);
    });
});
console.log("№1 - Блоки для демонстрации всплытия созданы");
console.log("-------------");

console.log("=== ПОЛУЧЕНИЕ ЦЕЛЕВОГО ЭЛЕМЕНТА ПРИ ВСПЛЫТИИ СОБЫТИЙ ===");

// №1-2 - Обработка кликов по вложенным элементам
const div5 = document.createElement('div');
div5.style.padding = '20px';
div5.style.border = '1px solid red';

const ul3 = document.createElement('ul');
ul3.style.border = '1px solid orange';
ul3.style.padding = '20px';

for (let i = 1; i <= 3; i++) {
    const li = document.createElement('li');
    li.textContent = i;
    li.style.border = '1px solid green';
    li.style.padding = '20px';
    li.style.listStyleType = 'none';
    ul3.appendChild(li);
}

div5.appendChild(ul3);
safeAppend(div5);

div5.addEventListener('click', function(event) {
    if (event.target.matches('li')) {
        event.target.textContent += '!';
        console.log("Клик по li");
    } else if (event.target.matches('ul')) {
        console.log("Клик по ul");
    } else if (event.target.matches('div')) {
        console.log("Клик по div");
    }
});
console.log("№1-2 - Вложенные элементы с обработкой созданы");
console.log("-------------");

console.log("=== ПРИМЕНЕНИЕ ПРЕКРАЩЕНИЯ ВСПЛЫТИЯ СОБЫТИЙ В JAVASCRIPT ===");

// №1 - Отмена всплытия
const parent = document.createElement('div');
parent.id = 'parent';
parent.style.padding = '50px';
parent.style.border = '1px solid black';

const button3 = document.createElement('button');
button3.textContent = 'click me';

const block = document.createElement('div');
block.id = 'block';
block.textContent = 'Скрытый блок';
block.style.padding = '20px';
block.style.border = '1px solid blue';
block.style.display = 'none';

parent.appendChild(button3);
parent.appendChild(block);
safeAppend(parent);

button3.addEventListener('click', function(event) {
    event.stopPropagation();
    block.style.display = 'block';
});

parent.addEventListener('click', function() {
    block.style.display = 'none';
});
console.log("№1 - Пример с отменой всплытия создан");
console.log("-------------");

console.log("=== ДЕЛЕГИРОВАНИЕ СОБЫТИЙ В JAVASCRIPT ===");

// №1 - Делегирование событий
const list = document.createElement('ul');
list.style.padding = '20px';
list.style.border = '1px solid red';

for (let i = 1; i <= 3; i++) {
    const li = document.createElement('li');
    li.textContent = `item ${i}`;
    list.appendChild(li);
}

const addButton = document.createElement('button');
addButton.textContent = 'Добавить новый пункт';
safeAppend(list);
safeAppend(addButton);

list.addEventListener('click', function(event) {
    event.target.textContent = event.target.textContent + '!';
});

addButton.addEventListener('click', function() {
    const newLi = document.createElement('li');
    newLi.textContent = `Новый item ${list.children.length + 1}`;
    list.appendChild(newLi);
});
console.log("№1 - Список с делегированием создан");
console.log("-------------");

console.log("=== УНИВЕРСАЛЬНОЕ ДЕЛЕГИРОВАНИЕ СОБЫТИЙ В JAVASCRIPT ===");

// №1 - Универсальное делегирование
const list2 = document.createElement('ul');
list2.style.padding = '20px';
list2.style.border = '1px solid blue';

for (let i = 1; i <= 3; i++) {
    const li = document.createElement('li');
    li.innerHTML = `item <i>italic</i> item`;
    list2.appendChild(li);
}

const addButton2 = document.createElement('button');
addButton2.textContent = 'Добавить сложный пункт';
safeAppend(list2);
safeAppend(addButton2);

list2.addEventListener('click', function(event) {
    const li = event.target.closest('li');
    if (li) {
        li.innerHTML = li.innerHTML + '!';
    }
});

addButton2.addEventListener('click', function() {
    const newLi = document.createElement('li');
    newLi.innerHTML = `Новый item <i>italic</i> item`;
    list2.appendChild(newLi);
});
console.log("№1 - Список с универсальным делегированием создан");
console.log("-------------");

// Если документ уже загружен, добавляем элементы сразу
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOM загружен, все элементы добавлены");
    });
} else {
    console.log("DOM уже загружен, все элементы добавлены");
}
