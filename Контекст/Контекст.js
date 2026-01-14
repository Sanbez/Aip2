
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

console.log("=== ПОТЕРЯ КОНТЕКСТА В JAVASCRIPT ===");

// №1 - Демонстрация потери контекста
const input1 = document.createElement('input');
input1.id = 'elem1';
input1.value = 'test';
safeAppend(input1);

input1.addEventListener('blur', parent);

function parent() {
    console.log("№1 - parent this.value:", this.value); // Выведет 'test'
    
    function child() {
        console.log("№1 - child this.value:", this.value); // Выведет undefined (ошибка в strict mode)
    }
    child();
}
console.log("№1 - Демонстрация потери контекста создана");
console.log("-------------");

console.log("=== КОНТЕКСТ ЧЕРЕЗ ПЕРЕМЕННУЮ В JAVASCRIPT ===");

// №1 - Исправление ошибки автора кода
const input2 = document.createElement('input');
input2.id = 'elem2';
input2.value = '3';
safeAppend(input2);

input2.addEventListener('blur', func);

function func() {
    let self = this; // Сохраняем контекст во внешней переменной
    
    function square() {
        return self.value * self.value; // Используем сохраненный контекст
    }
    
    alert(square()); // Выведет 9
}
console.log("№1 - Ошибка исправлена: используется переменная self для сохранения контекста");
console.log("-------------");

console.log("=== КОНТЕКСТ ЧЕРЕЗ ПАРАМЕТР В JAVASCRIPT ===");

// №1 - Исправление через передачу параметра
const input3 = document.createElement('input');
input3.id = 'elem3';
input3.value = '3';
safeAppend(input3);

input3.addEventListener('blur', func2);

function func2() {
    child2(this); // Передаем контекст как параметр
}

function child2(param) {
    alert(param.value * param.value); // Используем переданный контекст
}
console.log("№1 - Исправление через передачу параметра создано");
console.log("-------------");

console.log("=== КОНТЕКСТ ЧЕРЕЗ СТРЕЛОЧНУЮ ФУНКЦИЮ В JAVASCRIPT ===");

// №1 - Исправление через стрелочную функцию
const input4 = document.createElement('input');
input4.id = 'elem4';
input4.value = '3';
safeAppend(input4);

input4.addEventListener('blur', func3);

function func3() {
    const child3 = () => {
        alert(this.value * this.value); // Стрелочная функция сохраняет контекст родителя
    };
    child3();
}
console.log("№1 - Исправление через стрелочную функцию создано");
console.log("-------------");

console.log("=== ПРИВЯЗЫВАНИЕ КОНТЕКСТА ЧЕРЕЗ МЕТОД CALL В JAVASCRIPT ===");

// №1 - Вывод value каждого инпута с помощью call
const input5 = document.createElement('input');
input5.id = 'elem5';
input5.value = 'text1';
const input6 = document.createElement('input');
input6.id = 'elem6';
input6.value = 'text2';
const input7 = document.createElement('input');
input7.id = 'elem7';
input7.value = 'text3';

safeAppend(input5);
safeAppend(input6);
safeAppend(input7);

function func4() {
    console.log(this.value);
}

// Вызов функции с разными контекстами
func4.call(input5); // Выведет 'text1'
func4.call(input6); // Выведет 'text2'
func4.call(input7); // Выведет 'text3'
console.log("№1 - Вызовы с методом call выполнены");
console.log("-------------");

console.log("=== МЕТОД CALL С ПАРАМЕТРАМИ В JAVASCRIPT ===");

// №1 - Call с параметрами
const input8 = document.createElement('input');
input8.id = 'elem8';
input8.value = 'hello';
safeAppend(input8);

function func5(surname, name) {
    console.log(this.value + ', ' + name + ' ' + surname);
}

func5.call(input8, 'Smit', 'John'); // Выведет 'hello, John Smit'
console.log("№1 - Call с параметрами выполнен");
console.log("-------------");

console.log("=== ПРИВЯЗЫВАНИЕ КОНТЕКСТА ЧЕРЕЗ МЕТОД APPLY В JAVASCRIPT ===");

// №1 - Apply с параметрами
const input9 = document.createElement('input');
input9.id = 'elem9';
input9.value = 'hello';
safeAppend(input9);

function func6(surname, name) {
    console.log(this.value + ', ' + surname + ', ' + name);
}

func6.apply(input9, ['Smit', 'John']); // Выведет 'hello, Smit, John'
console.log("№1 - Apply с параметрами выполнен");
console.log("-------------");

console.log("=== ПРИВЯЗЫВАНИЕ КОНТЕКСТА ЧЕРЕЗ МЕТОД BIND В JAVASCRIPT ===");

// №1 - Bind для постоянного контекста
const input10 = document.createElement('input');
input10.id = 'elem10';
input10.value = 'hello';
safeAppend(input10);

function func7(name, surname) {
    console.log(this.value + ', ' + name + ' ' + surname);
}

// Привязываем контекст
func7 = func7.bind(input10);

// Вызовы с привязанным контекстом
func7('John', 'Smith'); // Выведет 'hello, John Smith'
func7('Eric', 'Luis'); // Выведет 'hello, Eric Luis'
console.log("№1 - Bind для постоянного контекста выполнен");
console.log("-------------");

// Если документ уже загружен, добавляем элементы сразу
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOM загружен, все элементы добавлены");
    });
} else {
    console.log("DOM уже загружен, все элементы добавлены");
}
