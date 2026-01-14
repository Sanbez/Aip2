
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

console.log("=== СОЗДАНИЕ ЭЛЕМЕНТОВ ИЗ МАССИВА НА JAVASCRIPT ===");

// №1 - Абзацы из массива с увеличением по клику
const parent1 = document.createElement('div');
parent1.id = 'parent1';
safeAppend(parent1);

const arr1 = [1, 2, 3, 4, 5];
for (let elem of arr1) {
    const p = document.createElement('p');
    p.textContent = elem;
    
    p.addEventListener('click', function() {
        this.textContent = Number(this.textContent) + 1;
    });
    
    parent1.appendChild(p);
}
console.log("№1 - Абзацы из массива созданы");
console.log("-------------");

console.log("=== ПРАКТИКА НА СОЗДАНИЕ СПИСКОВ UL НА JAVASCRIPT ===");

// №1-4 - Список из массива с различными функциями
const ul1 = document.createElement('ul');
ul1.id = 'elem1';
safeAppend(ul1);

const arr2 = ['Элемент 1', 'Элемент 2', 'Элемент 3', 'Элемент 4'];
for (let elem of arr2) {
    const li = document.createElement('li');
    li.textContent = elem;
    
    let clicked = false;
    
    li.addEventListener('click', function() {
        console.log("№2 - Текст элемента:", this.textContent);
        
        if (!clicked) {
            this.textContent += '!';
            clicked = true;
        }
    });
    
    ul1.appendChild(li);
}
console.log("№1-4 - Список с функциями создан");
console.log("-------------");

console.log("=== СОЗДАНИЕ HTML ТАБЛИЦ НА JAVASCRIPT ===");

// №1-3 - Таблица 5x5
const table1 = document.createElement('table');
table1.id = 'table1';
table1.style.borderCollapse = 'collapse';
safeAppend(table1);

for (let i = 0; i < 5; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < 5; j++) {
        const td = document.createElement('td');
        td.textContent = 'x';
        td.style.border = '1px solid black';
        td.style.padding = '10px';
        tr.appendChild(td);
    }
    table1.appendChild(tr);
}
console.log("№1-3 - Таблица 5x5 создана");
console.log("-------------");

// №4 - Генератор таблиц
const widthInput = document.createElement('input');
widthInput.type = 'number';
widthInput.placeholder = 'Ширина';
const heightInput = document.createElement('input');
heightInput.type = 'number';
heightInput.placeholder = 'Высота';
const generateBtn = document.createElement('button');
generateBtn.textContent = 'Создать таблицу';
const tableContainer = document.createElement('div');

safeAppend(widthInput);
safeAppend(heightInput);
safeAppend(generateBtn);
safeAppend(tableContainer);

generateBtn.addEventListener('click', function() {
    const width = parseInt(widthInput.value) || 5;
    const height = parseInt(heightInput.value) || 5;
    
    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse';
    
    for (let i = 0; i < height; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < width; j++) {
            const td = document.createElement('td');
            td.textContent = `${i+1}-${j+1}`;
            td.style.border = '1px solid black';
            td.style.padding = '10px';
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
});
console.log("№4 - Генератор таблиц создан");
console.log("-------------");

console.log("=== ПОСЛЕДОВАТЕЛЬНОЕ ЗАПОЛНЕНИЕ HTML ТАБЛИЦ ===");

// №1 - Таблица с числами 1-25
const table2 = document.createElement('table');
table2.id = 'table2';
table2.style.borderCollapse = 'collapse';
safeAppend(table2);

let counter = 1;
for (let i = 0; i < 5; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < 5; j++) {
        const td = document.createElement('td');
        td.textContent = counter++;
        td.style.border = '1px solid black';
        td.style.padding = '10px';
        tr.appendChild(td);
    }
    table2.appendChild(tr);
}
console.log("№1 - Таблица с числами 1-25 создана");
console.log("-------------");

// №2 - Таблица с четными числами
const table3 = document.createElement('table');
table3.id = 'table3';
table3.style.borderCollapse = 'collapse';
safeAppend(table3);

let evenCounter = 2;
for (let i = 0; i < 5; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < 5; j++) {
        const td = document.createElement('td');
        td.textContent = evenCounter;
        evenCounter += 2;
        td.style.border = '1px solid black';
        td.style.padding = '10px';
        tr.appendChild(td);
    }
    table3.appendChild(tr);
}
console.log("№2 - Таблица с четными числами создана");
console.log("-------------");

console.log("=== СОЗДАНИЕ HTML ТАБЛИЦЫ ИЗ МАССИВА НА JAVASCRIPT ===");

// №1-2 - Таблица из двумерного массива
const table4 = document.createElement('table');
table4.id = 'table4';
table4.style.borderCollapse = 'collapse';
safeAppend(table4);

const arr3 = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]];
for (let subArr of arr3) {
    const tr = document.createElement('tr');
    for (let elem of subArr) {
        const td = document.createElement('td');
        td.textContent = elem * elem; // Квадраты элементов
        td.style.border = '1px solid black';
        td.style.padding = '10px';
        tr.appendChild(td);
    }
    table4.appendChild(tr);
}
console.log("№1-2 - Таблица из массива с квадратами создана");
console.log("-------------");

console.log("=== СОЗДАНИЕ HTML ТАБЛИЦЫ ИЗ МАССИВА ОБЪЕКТОВ ===");

// №1-2 - Таблица из объектов с редактированием возраста
const table5 = document.createElement('table');
table5.id = 'table5';
table5.style.borderCollapse = 'collapse';
safeAppend(table5);

const employees = [
    {name: 'employee1', age: 30, salary: 400},
    {name: 'employee2', age: 31, salary: 500},
    {name: 'employee3', age: 32, salary: 600}
];

for (let employee of employees) {
    const tr = document.createElement('tr');
    
    const tdName = document.createElement('td');
    tdName.textContent = employee.name;
    tdName.style.border = '1px solid black';
    tdName.style.padding = '10px';
    tr.appendChild(tdName);
    
    const tdAge = document.createElement('td');
    tdAge.textContent = employee.age;
    tdAge.style.border = '1px solid black';
    tdAge.style.padding = '10px';
    
    tdAge.addEventListener('click', function() {
        this.textContent = Number(this.textContent) + 1;
    });
    
    tr.appendChild(tdAge);
    
    const tdSalary = document.createElement('td');
    tdSalary.textContent = employee.salary;
    tdSalary.style.border = '1px solid black';
    tdSalary.style.padding = '10px';
    tr.appendChild(tdSalary);
    
    table5.appendChild(tr);
}
console.log("№1-2 - Таблица из объектов создана");
console.log("-------------");

console.log("=== ДОБАВЛЕНИЕ РЯДОВ И КОЛОНОК В HTML ТАБЛИЦУ ===");

// №1 - Добавление рядов
const table6 = document.createElement('table');
table6.id = 'table6';
table6.style.borderCollapse = 'collapse';
const addRowBtn = document.createElement('button');
addRowBtn.textContent = 'Добавить ряд';

// Создаем начальную таблицу 2x2
for (let i = 0; i < 2; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < 2; j++) {
        const td = document.createElement('td');
        td.textContent = `${i+1}-${j+1}`;
        td.style.border = '1px solid black';
        td.style.padding = '10px';
        tr.appendChild(td);
    }
    table6.appendChild(tr);
}

safeAppend(table6);
safeAppend(addRowBtn);

addRowBtn.addEventListener('click', function() {
    const tr = document.createElement('tr');
    const cols = table6.rows[0].cells.length;
    
    for (let j = 0; j < cols; j++) {
        const td = document.createElement('td');
        td.textContent = `${table6.rows.length + 1}-${j+1}`;
        td.style.border = '1px solid black';
        td.style.padding = '10px';
        tr.appendChild(td);
    }
    
    table6.appendChild(tr);
});
console.log("№1 - Кнопка добавления рядов создана");
console.log("-------------");

// №2 - Добавление рядов и колонок
const table7 = document.createElement('table');
table7.id = 'table7';
table7.style.borderCollapse = 'collapse';
const expandBtn = document.createElement('button');
expandBtn.textContent = 'Расширить таблицу';

// Создаем начальную таблицу 2x2
for (let i = 0; i < 2; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < 2; j++) {
        const td = document.createElement('td');
        td.textContent = `${i+1}-${j+1}`;
        td.style.width = '80px';
        td.style.height = '50px';
        td.style.border = '1px solid black';
        tr.appendChild(td);
    }
    table7.appendChild(tr);
}

safeAppend(table7);
safeAppend(expandBtn);

expandBtn.addEventListener('click', function() {
    // Добавляем новый ряд
    const newRow = document.createElement('tr');
    const cols = table7.rows[0].cells.length;
    
    for (let j = 0; j < cols; j++) {
        const td = document.createElement('td');
        td.textContent = `${table7.rows.length + 1}-${j+1}`;
        td.style.width = '80px';
        td.style.height = '50px';
        td.style.border = '1px solid black';
        newRow.appendChild(td);
    }
    table7.appendChild(newRow);
    
    // Добавляем колонку ко всем рядам
    const rows = table7.querySelectorAll('tr');
    for (let i = 0; i < rows.length; i++) {
        const td = document.createElement('td');
        td.textContent = `${i+1}-${rows[i].cells.length + 1}`;
        td.style.width = '80px';
        td.style.height = '50px';
        td.style.border = '1px solid black';
        rows[i].appendChild(td);
    }
});
console.log("№2 - Кнопка расширения таблицы создана");
console.log("-------------");

console.log("=== ИЗМЕНЕНИЕ ЯЧЕЕК HTML ТАБЛИЦЫ НА JAVASCRIPT ===");

// №1 - Удвоение чисел в таблице
const table8 = document.createElement('table');
table8.id = 'table8';
table8.style.borderCollapse = 'collapse';
const doubleBtn = document.createElement('button');
doubleBtn.textContent = 'Удвоить числа';

// Создаем таблицу с числами
for (let i = 0; i < 3; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < 3; j++) {
        const td = document.createElement('td');
        td.textContent = (i * 3 + j + 1) * 10;
        td.style.border = '1px solid black';
        td.style.padding = '10px';
        tr.appendChild(td);
    }
    table8.appendChild(tr);
}

safeAppend(table8);
safeAppend(doubleBtn);

doubleBtn.addEventListener('click', function() {
    const tds = table8.querySelectorAll('td');
    for (let td of tds) {
        td.textContent = Number(td.textContent) * 2;
    }
});
console.log("№1 - Кнопка удвоения чисел создана");
console.log("-------------");

console.log("=== САМОУДАЛЕНИЕ НОВЫХ ЭЛЕМЕНТОВ НА JAVASCRIPT ===");

// №1 - Самоудаляющиеся элементы
const ul2 = document.createElement('ul');
ul2.id = 'parent2';
const addItemBtn = document.createElement('button');
addItemBtn.textContent = 'Добавить элемент';

// Начальные элементы
for (let i = 1; i <= 3; i++) {
    const li = document.createElement('li');
    li.textContent = `Элемент ${i}`;
    ul2.appendChild(li);
}

safeAppend(ul2);
safeAppend(addItemBtn);

// Обработчик для удаления
function setupRemoveHandler(li) {
    li.addEventListener('click', function() {
        this.remove();
    });
}

// Назначаем обработчики начальным элементам
ul2.querySelectorAll('li').forEach(setupRemoveHandler);

// Добавление новых элементов
addItemBtn.addEventListener('click', function() {
    const li = document.createElement('li');
    li.textContent = `Новый элемент ${ul2.children.length + 1}`;
    setupRemoveHandler(li);
    ul2.appendChild(li);
});
console.log("№1 - Самоудаляющиеся элементы созданы");
console.log("-------------");

console.log("=== СОЗДАНИЕ ССЫЛОК ДЛЯ УДАЛЕНИЯ ЭЛЕМЕНТОВ НА JAVASCRIPT ===");

// №1 - Ссылки удаления для списка
const ul3 = document.createElement('ul');
ul3.id = 'parent3';
for (let i = 1; i <= 3; i++) {
    const li = document.createElement('li');
    li.textContent = `Элемент ${i}`;
    ul3.appendChild(li);
}

ul3.querySelectorAll('li').forEach(li => {
    const removeLink = document.createElement('a');
    removeLink.href = '#';
    removeLink.textContent = ' удалить';
    removeLink.style.marginLeft = '10px';
    removeLink.style.color = 'red';
    
    removeLink.addEventListener('click', function(event) {
        li.remove();
        event.preventDefault();
    });
    
    li.appendChild(removeLink);
});

safeAppend(ul3);
console.log("№1 - Ссылки удаления для списка созданы");
console.log("-------------");

// №2 - Ссылки удаления для таблицы
const table9 = document.createElement('table');
table9.id = 'table9';
table9.style.borderCollapse = 'collapse';

for (let i = 0; i < 3; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < 3; j++) {
        const td = document.createElement('td');
        td.textContent = `${i+1}-${j+1}`;
        td.style.border = '1px solid black';
        td.style.padding = '10px';
        tr.appendChild(td);
    }
    
    // Добавляем колонку с ссылкой удаления
    const removeTd = document.createElement('td');
    const removeLink = document.createElement('a');
    removeLink.href = '#';
    removeLink.textContent = 'удалить';
    removeLink.style.color = 'red';
    
    removeLink.addEventListener('click', function(event) {
        tr.remove();
        event.preventDefault();
    });
    
    removeTd.appendChild(removeLink);
    removeTd.style.border = '1px solid black';
    removeTd.style.padding = '10px';
    tr.appendChild(removeTd);
    
    table9.appendChild(tr);
}

safeAppend(table9);
console.log("№2 - Таблица со ссылками удаления создана");
console.log("-------------");

console.log("=== РЕДАКТИРОВАНИЕ ОТДЕЛЬНОГО ЭЛЕМЕНТА НА JAVASCRIPT ===");

// №1 - Редактирование по мере ввода
const parent4 = document.createElement('div');
parent4.id = 'parent4';
const elem2 = document.createElement('p');
elem2.id = 'elem2';
elem2.textContent = 'Исходный текст';
const input1 = document.createElement('input');
input1.id = 'input1';

parent4.appendChild(elem2);
parent4.appendChild(input1);
safeAppend(parent4);

input1.value = elem2.textContent;
input1.addEventListener('input', function() {
    elem2.textContent = this.value;
});
console.log("№1 - Редактирование по мере ввода создано");
console.log("-------------");

console.log("=== РЕДАКТИРОВАНИЕ В ГРУППЕ ЭЛЕМЕНТОВ НА JAVASCRIPT ===");

// №1 - Редактирование элементов списка
const ul4 = document.createElement('ul');
ul4.id = 'parent5';
for (let i = 1; i <= 3; i++) {
    const li = document.createElement('li');
    li.textContent = `Элемент ${i}`;
    ul4.appendChild(li);
}

ul4.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', function func() {
        const input = document.createElement('input');
        input.value = this.textContent;
        
        this.textContent = '';
        this.appendChild(input);
        input.focus();
        
        const blurHandler = function() {
            li.textContent = this.value;
            li.addEventListener('click', func);
        };
        
        input.addEventListener('blur', blurHandler);
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                blurHandler.call(this);
            }
        });
        
        li.removeEventListener('click', func);
    });
});

safeAppend(ul4);
console.log("№1 - Редактирование списка создано");
console.log("-------------");

// №2 - Редактирование ячеек таблицы
const table10 = document.createElement('table');
table10.id = 'table10';
table10.style.borderCollapse = 'collapse';

for (let i = 0; i < 3; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < 3; j++) {
        const td = document.createElement('td');
        td.textContent = `${i+1}-${j+1}`;
        td.style.border = '1px solid black';
        td.style.padding = '10px';
        
        td.addEventListener('click', function func() {
            const input = document.createElement('input');
            input.value = this.textContent;
            input.style.width = '100%';
            
            this.textContent = '';
            this.appendChild(input);
            input.focus();
            
            const blurHandler = function() {
                td.textContent = this.value;
                td.addEventListener('click', func);
            };
            
            input.addEventListener('blur', blurHandler);
            input.addEventListener('keypress', function(event) {
                if (event.key === 'Enter') {
                    blurHandler.call(this);
                }
            });
            
            td.removeEventListener('click', func);
        });
        
        tr.appendChild(td);
    }
    table10.appendChild(tr);
}

safeAppend(table10);
console.log("№2 - Редактирование таблицы создано");
console.log("-------------");

console.log("=== ОДНОВРЕМЕННОЕ РЕДАКТИРОВАНИЕ И УДАЛЕНИЕ ЭЛЕМЕНТОВ ===");

// №1-2 - Редактирование с удалением
const parent6 = document.createElement('div');
parent6.id = 'parent6';
for (let i = 1; i <= 3; i++) {
    const p = document.createElement('p');
    const span = document.createElement('span');
    span.textContent = `Текст ${i}`;
    p.appendChild(span);
    parent6.appendChild(p);
}

parent6.querySelectorAll('p').forEach(p => {
    const span = p.querySelector('span');
    
    // Добавляем ссылку удаления
    const removeLink = document.createElement('a');
    removeLink.href = '#';
    removeLink.textContent = ' удалить';
    removeLink.style.marginLeft = '10px';
    removeLink.style.color = 'red';
    
    removeLink.addEventListener('click', function(event) {
        p.remove();
        event.preventDefault();
    });
    
    p.appendChild(removeLink);
    
    // Редактирование span
    span.addEventListener('click', function func() {
        const input = document.createElement('input');
        input.value = this.textContent;
        
        this.textContent = '';
        this.appendChild(input);
        input.focus();
        
        const blurHandler = function() {
            span.textContent = this.value;
            span.addEventListener('click', func);
        };
        
        input.addEventListener('blur', blurHandler);
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                blurHandler.call(this);
            }
        });
        
        span.removeEventListener('click', func);
    });
});

safeAppend(parent6);
console.log("№1-2 - Редактирование с удалением создано");
console.log("-------------");

console.log("=== СТИЛИЗАЦИЯ ЭЛЕМЕНТОВ НА JAVASCRIPT ===");

// №1-4 - Стилизация с различными функциями
const parent7 = document.createElement('div');
parent7.id = 'parent7';
for (let i = 1; i <= 3; i++) {
    const p = document.createElement('p');
    const span = document.createElement('span');
    span.textContent = `Текст ${i}`;
    p.appendChild(span);
    parent7.appendChild(p);
}

parent7.querySelectorAll('p').forEach(p => {
    const span = p.querySelector('span');
    
    // №1-2 - Ссылка для перечеркивания
    const strikeLink = document.createElement('a');
    strikeLink.href = '#';
    strikeLink.textContent = ' перечеркнуть';
    strikeLink.style.marginLeft = '10px';
    strikeLink.style.color = 'blue';
    
    strikeLink.addEventListener('click', function(event) {
        span.style.textDecoration = 'line-through';
        this.remove(); // Удаляем ссылку после использования
        event.preventDefault();
    });
    
    p.appendChild(strikeLink);
});

safeAppend(parent7);
console.log("№1-2 - Стилизация с перечеркиванием создана");
console.log("-------------");

// №3-4 - Стилизация таблицы
const table11 = document.createElement('table');
table11.id = 'table11';
table11.style.borderCollapse = 'collapse';

for (let i = 0; i < 3; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < 3; j++) {
        const td = document.createElement('td');
        td.textContent = `${i+1}-${j+1}`;
        td.style.border = '1px solid black';
        td.style.padding = '10px';
        tr.appendChild(td);
    }
    
    // Добавляем колонку со ссылкой
    const styleTd = document.createElement('td');
    const styleLink = document.createElement('a');
    styleLink.href = '#';
    styleLink.textContent = ' раскрасить';
    styleLink.style.color = 'green';
    
    let isGreen = false;
    
    styleLink.addEventListener('click', function(event) {
        if (!isGreen) {
            tr.style.backgroundColor = 'lightgreen';
            isGreen = true;
        } else {
            tr.style.backgroundColor = '';
            isGreen = false;
        }
        event.preventDefault();
    });
    
    styleTd.appendChild(styleLink);
    styleTd.style.border = '1px solid black';
    styleTd.style.padding = '10px';
    tr.appendChild(styleTd);
    
    table11.appendChild(tr);
}

safeAppend(table11);
console.log("№3-4 - Стилизация таблицы создана");
console.log("-------------");

console.log("=== КНОПКИ ДЛЯ СКРЫТИЯ И ПОКАЗА ЭЛЕМЕНТА НА JAVASCRIPT ===");

// №1 - Одна кнопка для показа/скрытия
const elem3 = document.createElement('p');
elem3.id = 'elem3';
elem3.textContent = 'Скрываемый текст';
const toggleBtn = document.createElement('button');
toggleBtn.textContent = 'Показать/Скрыть';

safeAppend(elem3);
safeAppend(toggleBtn);

let isVisible = true;
toggleBtn.addEventListener('click', function() {
    if (isVisible) {
        elem3.style.display = 'none';
        isVisible = false;
    } else {
        elem3.style.display = 'block';
        isVisible = true;
    }
});
console.log("№1 - Кнопка показа/скрытия создана");
console.log("-------------");

console.log("=== АКТИВАЦИЯ ЭЛЕМЕНТОВ НА JAVASCRIPT ===");

// №1-2 - Активация списка
const ul5 = document.createElement('ul');
ul5.id = 'parent8';
for (let i = 1; i <= 5; i++) {
    const li = document.createElement('li');
    li.textContent = `Пункт ${i}`;
    ul5.appendChild(li);
}

ul5.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', function() {
        if (this.style.backgroundColor === 'red') {
            this.style.backgroundColor = '';
        } else {
            this.style.backgroundColor = 'red';
        }
    });
});

safeAppend(ul5);
console.log("№1-2 - Активируемый список создан");
console.log("-------------");

// Если документ уже загружен, добавляем элементы сразу
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOM загружен, все элементы добавлены");
    });
} else {
    console.log("DOM уже загружен, все элементы добавлены");
}
