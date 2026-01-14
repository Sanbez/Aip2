"use strict";
console.log("=== ВЫЗОВ ФУНКЦИИ НА МЕСТЕ (IIFE) ===");
console.log("№1 - Выведет '!'");
console.log("№2 - Ошибка (Function Declaration нельзя вызвать без имени)");
console.log("-------------");

console.log("=== ПРИСВАИВАНИЕ ФУНКЦИИ В ПЕРЕМЕННУЮ ===");
console.log("№1 - Выведет '!'");
console.log("№2 - Выведет код функции");
console.log("№3 - Выведет код функции");
console.log("-------------");

console.log("=== ПРИМЕНЕНИЕ ВЫЗОВА ФУНКЦИИ НА МЕСТЕ ===");
console.log("№1 - Выведет 3");
console.log("-------------");

console.log("=== ПАРАМЕТРЫ ФУНКЦИИ ПРИ ВЫЗОВЕ НА МЕСТЕ ===");
console.log("№1 - Выведет 3");
console.log("-------------");

console.log("=== МНОЖЕСТВЕННЫЕ ВЫЗОВЫ IIFE ===");
console.log("№1 - Код должен возвращать функцию");
console.log("№2 - Код должен возвращать функцию, принимающую параметр");
console.log("№3 - Код должен возвращать функцию, возвращающую функцию");
console.log("-------------");

console.log("=== ТОЧКА С ЗАПЯТОЙ ДЛЯ БЕЗОПАСНОСТИ В IIFE ===");
console.log("№1 - Выведет 1");
console.log("№2 - Ошибка (отсутствует точка с запятой)");
console.log("-------------");

console.log("=== КРУГЛЫЕ СКОБКИ В IIFE ===");
console.log("№1 - Выведет '!'");
console.log("№2 - Выведет '!'");
console.log("№3 - Выведет код функции");
console.log("-------------");

// Демонстрация работы IIFE
console.log("=== ДЕМОНСТРАЦИЯ IIFE ===");

// Базовый IIFE
console.log("Базовый IIFE:");
(function() {
    console.log('!');
})();

// IIFE с возвратом значения
let result1 = (function() {
    return '!';
})();
console.log("IIFE с возвратом:", result1);

// IIFE с параметрами
console.log("IIFE с параметрами:");
(function(a, b) {
    console.log("Сумма:", a + b);
})(5, 3);

// IIFE в выражении
let sum = 10 + (function() { return 5; })();
console.log("IIFE в выражении:", sum);

// Множественные вызовы
console.log("Множественные вызовы:");
let result2 = (function(x) {
    return function(y) {
        return function(z) {
            return x + y + z;
        };
    };
})(1)(2)(3);
console.log("Сумма трех чисел:", result2);
console.log("-------------");

console.log("=== ЗАМЫКАНИЯ И IIFE ===");

// Счетчик через IIFE
let counter1 = (function() {
    let count = 1;
    return function() {
        console.log(count);
        count++;
    };
})();
console.log("Счетчик через IIFE:");
counter1();
counter1();
counter1();

// Счетчик с ограничением через IIFE
let counter2 = (function() {
    let count = 1;
    return function() {
        if (count <= 5) {
            console.log(count);
            count++;
        } else {
            count = 1;
            console.log(count);
            count++;
        }
    };
})();
console.log("Счетчик до 5 и по кругу:");
for (let i = 0; i < 8; i++) {
    counter2();
}
console.log("-------------");

// Практические примеры IIFE
console.log("=== ПРАКТИЧЕСКИЕ ПРИМЕРЫ IIFE ===");

// Создание изолированной области видимости
(function() {
    let privateVar = "Приватная переменная";
    console.log("Изолированная область:", privateVar);
})();

// Инициализация модуля
let mathModule = (function() {
    function square(x) { return x * x; }
    function cube(x) { return x * x * x; }
    
    return {
        square: square,
        cube: cube
    };
})();
console.log("Модуль через IIFE:");
console.log("Квадрат 4:", mathModule.square(4));
console.log("Куб 3:", mathModule.cube(3));

// Защита от конфликтов имен
(function($) {
    console.log("Защита от конфликтов - параметр $:", typeof $);
})(jQuery);
console.log("-------------");

// Решение задач с множественными вызовами
console.log("=== РЕШЕНИЕ ЗАДАЧ С МНОЖЕСТВЕННЫМИ ВЫЗОВАМИ ===");

// Задача 1: вывод '!'
let task1 = (function() {
    return function() {
        console.log('!');
    };
})()();

// Задача 2: сумма двух чисел
let task2 = (function(x) {
    return function(y) {
        return x + y;
    };
})(1)(2);
console.log("Сумма двух чисел:", task2);

// Задача 3: сумма трех чисел  
let task3 = (function(x) {
    return function(y) {
        return function(z) {
            return x + y + z;
        };
    };
})(1)(2)(3);
console.log("Сумма трех чисел:", task3);
console.log("-------------");
