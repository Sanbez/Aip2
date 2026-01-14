"use strict";
console.log("=== ПРИМЕНЕНИЕ ЛЕКСИЧЕСКОГО ОКРУЖЕНИЯ ФУНКЦИЙ ===");
console.log("№1 - Выведет 3");
console.log("№2 - Выведет 3");
console.log("№3 - Выведет 3");
console.log("№4 - Выведет 1");
console.log("-------------");

console.log("=== СЧЕТЧИК НА ЗАМЫКАНИЯХ ===");
function createCounter() {
    let num = 1;
    return function() {
        console.log(num);
        num++;
    };
}
let counter1 = createCounter();
console.log("Первый счетчик:");
counter1();
counter1();
counter1();

function createDecrementCounter() {
    let num = 10;
    return function() {
        if (num > 0) {
            console.log(num);
            num--;
        } else {
            console.log("Отсчет окончен");
        }
    };
}
let counter2 = createDecrementCounter();
console.log("Счетчик с уменьшением:");
for (let i = 0; i < 12; i++) {
    counter2();
}
console.log("-------------");

console.log("=== ЛОКАЛЬНАЯ ПЕРЕМЕННАЯ СЧЕТЧИКА ===");
console.log("№1 - Выведет 0, 0, 0");
console.log("№2 - Выведет 0, 0, 0");
console.log("-------------");

console.log("=== ГЛОБАЛЬНАЯ ПЕРЕМЕННАЯ СЧЕТЧИКА ===");
console.log("№1 - Выведет 0, 1, 2, 3, 4, 5");
console.log("№2 - Выведет 0, 1, 2, 3");
console.log("-------------");

// Демонстрация работы замыканий
console.log("=== ДЕМОНСТРАЦИЯ ЗАМЫКАНИЙ ===");

// Пример 1: Базовое замыкание
function test1() {
    let num1 = 1;
    let num2 = 2;
    return function() {
        return num1 + num2;
    };
}
let func1 = test1();
console.log("Пример 1:", func1());

// Пример 2: Независимые счетчики
function createIndependentCounter() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}
let counterA = createIndependentCounter();
let counterB = createIndependentCounter();
console.log("Независимые счетчики:");
console.log("Counter A:", counterA(), counterA(), counterA());
console.log("Counter B:", counterB(), counterB());

// Пример 3: Замыкание с внешней переменной
let externalNum = 5;
function test3() {
    let internalNum = 10;
    return function() {
        return internalNum + externalNum;
    };
}
let func3 = test3();
console.log("Замыкание с внешней переменной:", func3());

// Пример 4: Практическое применение - кэширование
function createCache() {
    let cache = {};
    return function(key, value) {
        if (value !== undefined) {
            cache[key] = value;
            return value;
        } else {
            return cache[key];
        }
    };
}
let cacheFunc = createCache();
cacheFunc('name', 'John');
cacheFunc('age', 25);
console.log("Кэширование:");
console.log("Name:", cacheFunc('name'));
console.log("Age:", cacheFunc('age'));
console.log("-------------");

console.log("=== РАЗНЫЕ ВИДЫ СЧЕТЧИКОВ ===");

// Счетчик с ограничением
function createLimitedCounter(max) {
    let count = 0;
    return function() {
        if (count < max) {
            count++;
            return count;
        } else {
            return "Достигнут максимум";
        }
    };
}
let limitedCounter = createLimitedCounter(3);
console.log("Ограниченный счетчик:");
console.log(limitedCounter());
console.log(limitedCounter());
console.log(limitedCounter());
console.log(limitedCounter());

// Счетчик с шагом
function createStepCounter(step) {
    let count = 0;
    return function() {
        count += step;
        return count;
    };
}
let stepCounter = createStepCounter(5);
console.log("Счетчик с шагом 5:");
console.log(stepCounter());
console.log(stepCounter());
console.log(stepCounter());
console.log("-------------");
