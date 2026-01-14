
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

console.log("=== ФУНКЦИИ ДЛЯ РАБОТЫ С DOM ЭЛЕМЕНТОМ НА JAVASCRIPT ===");

// №1 - Функция setText с CSS селектором
function setText(selector, text) {
    let elem = document.querySelector(selector);
    if (elem) {
        elem.textContent = text;
    }
}

// Создаем элементы для демонстрации
const elem1 = document.createElement('p');
elem1.id = 'elem1';
elem1.textContent = 'Исходный текст 1';
safeAppend(elem1);

const elem2 = document.createElement('p');
elem2.id = 'elem2';
elem2.textContent = 'Исходный текст 2';
safeAppend(elem2);

// Используем функцию
setText("#elem1", 'Новый текст 1');
setText("#elem2", 'Новый текст 2');
console.log("№1 - Функция setText с селектором создана");
console.log("-------------");

// №2 - Функция setAttr
function setAttr(selector, attrName, attrValue) {
    let elem = document.querySelector(selector);
    if (elem) {
        elem.setAttribute(attrName, attrValue);
    }
}

const elem3 = document.createElement('div');
elem3.id = 'elem3';
elem3.textContent = 'Элемент с атрибутами';
safeAppend(elem3);

setAttr("#elem3", "title", "Всплывающая подсказка");
setAttr("#elem3", "data-custom", "custom value");
console.log("№2 - Функция setAttr создана");
console.log("-------------");

console.log("=== ФУНКЦИИ ДЛЯ РАБОТЫ С ГРУППОЙ DOM ЭЛЕМЕНТОВ ===");

// №1 - Функция appendText для группы элементов
function appendText(selector, text) {
    let elems = document.querySelectorAll(selector);
    for (let elem of elems) {
        elem.textContent += text;
    }
}

// Создаем группу элементов
const groupContainer = document.createElement('div');
for (let i = 1; i <= 3; i++) {
    const p = document.createElement('p');
    p.className = 'group-elem';
    p.textContent = `Элемент ${i}`;
    groupContainer.appendChild(p);
}
safeAppend(groupContainer);

appendText(".group-elem", " - добавленный текст");
console.log("№1 - Функция appendText для группы создана");
console.log("-------------");

console.log("=== ПЕРЕДАЧА КОЛЛБЭКА ДЛЯ РАБОТЫ С DOM НА JAVASCRIPT ===");

// Функция forEach
function forEach(selector, func) {
    let elems = document.querySelectorAll(selector);
    for (let elem of elems) {
        func(elem);
    }
}

// Создаем элементы для демонстрации
const callbackContainer = document.createElement('div');
for (let i = 1; i <= 5; i++) {
    const p = document.createElement('p');
    p.className = 'callback-elem';
    p.textContent = i;
    callbackContainer.appendChild(p);
}
safeAppend(callbackContainer);

// №1 - Добавление восклицательного знака
forEach('.callback-elem', function(elem) {
    elem.textContent = elem.textContent + '!';
});
console.log("№1 - Функция forEach с добавлением '!' создана");
console.log("-------------");

console.log("=== ПЕРЕДАЧА ПОРЯДКОВОГО НОМЕРА В КОЛЛБЭК НА JAVASCRIPT ===");

// Обновленная функция forEach с индексом
function forEachWithIndex(selector, func) {
    let elems = document.querySelectorAll(selector);
    for (let i = 0; i < elems.length; i++) {
        func(elems[i], i);
    }
}

// Создаем элементы для демонстрации
const indexContainer = document.createElement('div');
for (let i = 1; i <= 3; i++) {
    const p = document.createElement('p');
    p.className = 'index-elem';
    p.textContent = `Абзац`;
    indexContainer.appendChild(p);
}
safeAppend(indexContainer);

// №1 - Добавление порядкового номера в начало
forEachWithIndex('.index-elem', function(elem, index) {
    elem.textContent = (index + 1) + '. ' + elem.textContent;
});
console.log("№1 - Функция forEach с индексом создана");
console.log("-------------");

console.log("=== ПЕРЕДАЧА DOM ЭЛЕМЕНТА ПАРАМЕТРОМ ФУНКЦИИ ===");

// №1 - Функция appendText для одного элемента
function appendTextSingle(elem, text) {
    elem.textContent += text;
}

const singleElem = document.createElement('p');
singleElem.id = 'single-elem';
singleElem.textContent = 'Текст элемента';
safeAppend(singleElem);

appendTextSingle(singleElem, ' - добавленный текст');
console.log("№1 - Функция appendText для одного элемента создана");
console.log("-------------");

// №2 - Добавление '!' к группе абзацев
const exclamationContainer = document.createElement('div');
const exclamationElems = [];
for (let i = 1; i <= 3; i++) {
    const p = document.createElement('p');
    p.className = 'exclamation-elem';
    p.textContent = `Абзац ${i}`;
    exclamationContainer.appendChild(p);
    exclamationElems.push(p);
}
safeAppend(exclamationContainer);

for (let elem of exclamationElems) {
    appendTextSingle(elem, '!');
}
console.log("№2 - Добавление '!' к группе абзацев выполнено");
console.log("-------------");

// №3 - Функция setValue
function setValue(inputElem, value) {
    inputElem.value = value;
}

const inputDemo = document.createElement('input');
inputDemo.type = 'text';
inputDemo.placeholder = 'Введите текст';
safeAppend(inputDemo);

setValue(inputDemo, 'Установленное значение');
console.log("№3 - Функция setValue создана");
console.log("-------------");

console.log("=== ПЕРЕДАЧА ГРУППЫ DOM ЭЛЕМЕНТОВ ПАРАМЕТРАМИ ФУНКЦИЙ ===");

// №1 - Функция appendText для массива элементов
function appendTextArray(elems, text) {
    for (let elem of elems) {
        elem.textContent += text;
    }
}

const arrayContainer = document.createElement('div');
const arrayElems = [];
for (let i = 1; i <= 3; i++) {
    const p = document.createElement('p');
    p.className = 'array-elem';
    p.textContent = `Элемент ${i}`;
    arrayContainer.appendChild(p);
    arrayElems.push(p);
}
safeAppend(arrayContainer);

appendTextArray(arrayElems, ' - текст из массива');
console.log("№1 - Функция appendText для массива создана");
console.log("-------------");

// №2 - Функция appendElem для ul
function appendElem(ulElem, text) {
    const li = document.createElement('li');
    li.textContent = text;
    ulElem.appendChild(li);
}

const ulDemo = document.createElement('ul');
ulDemo.id = 'ul-demo';
safeAppend(ulDemo);

appendElem(ulDemo, 'Первый элемент');
appendElem(ulDemo, 'Второй элемент');
console.log("№2 - Функция appendElem для ul создана");
console.log("-------------");

// №3 - Запись массива в ul
const ulArray = document.createElement('ul');
ulArray.id = 'ul-array';
safeAppend(ulArray);

const items = ['Яблоко', 'Банан', 'Апельсин', 'Груша'];
for (let item of items) {
    appendElem(ulArray, item);
}
console.log("№3 - Массив записан в ul");
console.log("-------------");

console.log("=== ФУНКЦИЯ ДЛЯ СОЗДАНИЯ HTML ТАБЛИЦ НА JAVASCRIPT ===");

// №1 - Функция createTable
function createTable(rows, cols, parent) {
    let table = document.createElement('table');
    table.style.borderCollapse = 'collapse';
    
    for (let i = 0; i < rows; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            const td = document.createElement('td');
            td.textContent = `${i+1}-${j+1}`;
            td.style.border = '1px solid black';
            td.style.padding = '10px';
            td.style.width = '50px';
            td.style.height = '50px';
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    
    parent.appendChild(table);
}

const tableContainer1 = document.createElement('div');
tableContainer1.id = 'table-container-1';
safeAppend(tableContainer1);

createTable(3, 4, tableContainer1);
console.log("№1 - Функция createTable создана");
console.log("-------------");

console.log("=== ВОЗВРАТ ТАБЛИЦЫ ИЗ ФУНКЦИИ НА JAVASCRIPT ===");

// №1 - Обновленная функция createTable (возвращает таблицу)
function createTableReturn(rows, cols) {
    let table = document.createElement('table');
    table.style.borderCollapse = 'collapse';
    
    for (let i = 0; i < rows; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            const td = document.createElement('td');
            td.textContent = `${i+1}-${j+1}`;
            td.style.border = '1px solid black';
            td.style.padding = '10px';
            td.style.width = '50px';
            td.style.height = '50px';
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    
    return table;
}

const tableContainer2 = document.createElement('div');
tableContainer2.id = 'table-container-2';
safeAppend(tableContainer2);

const table2 = createTableReturn(4, 3);
table2.style.color = 'red';
tableContainer2.appendChild(table2);
console.log("№1 - Функция createTable с возвратом создана");
console.log("-------------");

// №2 - Вставка таблицы в div с абзацами
const divWithParagraphs = document.createElement('div');
divWithParagraphs.id = 'div-with-paragraphs';

for (let i = 1; i <= 3; i++) {
    const p = document.createElement('p');
    p.textContent = `Абзац ${i}`;
    divWithParagraphs.appendChild(p);
}

safeAppend(divWithParagraphs);

const newTable = createTableReturn(2, 2);
divWithParagraphs.appendChild(newTable);
console.log("№2 - Таблица вставлена в div с абзацами");
console.log("-------------");

console.log("=== ФУНКЦИЯ ДЛЯ СОЗДАНИЯ ТАБЛИЦЫ ИЗ МАССИВА ===");

// №1 - Функция createTableByArr
function createTableByArr(arr) {
    let table = document.createElement('table');
    table.style.borderCollapse = 'collapse';
    
    for (let subArr of arr) {
        const tr = document.createElement('tr');
        for (let elem of subArr) {
            const td = document.createElement('td');
            td.textContent = elem;
            td.style.border = '1px solid black';
            td.style.padding = '10px';
            td.style.width = '50px';
            td.style.height = '50px';
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    
    return table;
}

const arrayTableContainer = document.createElement('div');
arrayTableContainer.id = 'array-table-container';
safeAppend(arrayTableContainer);

const arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const arrayTable = createTableByArr(arr);
arrayTableContainer.appendChild(arrayTable);
console.log("№1 - Функция createTableByArr создана");
console.log("-------------");

// Если документ уже загружен, добавляем элементы сразу
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOM загружен, все элементы добавлены");
    });
} else {
    console.log("DOM уже загружен, все элементы добавлены");
}
