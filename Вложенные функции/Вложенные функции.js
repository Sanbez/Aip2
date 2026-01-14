"use strict";
console.log("=== ПЕРЕДАЧА ФУНКЦИЙ ПАРАМЕТРАМИ ===");
function test1(func1, func2, func3) {
    console.log(func1() + func2() + func3());
}
test1(
    function() { return 1; },
    function() { return 2; },
    function() { return 3; }
);
console.log("-------------");

console.log("=== ИМЕНОВАННЫЕ ФУНКЦИИ-ПАРАМЕТРЫ ===");
function test2(func1, func2, func3) {
    return func1() + func2() + func3();
}

function func1() { return 1; }
function func2() { return 2; }
function func3() { return 3; }
console.log("Function Declaration:", test2(func1, func2, func3));

let func4 = function() { return 1; };
let func5 = function() { return 2; };
let func6 = function() { return 3; };
console.log("Function Expression:", test2(func4, func5, func6));
console.log("-------------");

console.log("=== ПАРАМЕТРЫ ПЕРЕДАВАЕМЫХ ФУНКЦИЙ ===");
function test3(func) {
    console.log(func(3));
}
test3(function(num) { return num ** 3; });

function func7(num) { return num ** 3; }
test3(func7);

let func8 = function(num) { return num ** 3; };
test3(func8);

function test4(func) {
    console.log(func(2, 3));
}
test4(function(a, b) { return a + b; });
console.log("-------------");

console.log("=== ПЕРЕДАЧА ЧИСЛА ПАРАМЕТРОМ ===");
function test5(num, func1, func2) {
    return func1(num) + func2(num);
}
let result1 = test5(3, 
    function(num) { return num * num; },
    function(num) { return num * num * num; }
);
console.log("Сумма квадрата и куба:", result1);
console.log("-------------");

console.log("=== ПРИМЕНЕНИЕ ПЕРЕДАЧИ ФУНКЦИИ ПАРАМЕТРОМ ===");
function test6(arr, func) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = func(arr[i]);
    }
    return arr;
}
let result2 = test6([1, 2, 3], function(num) {
    return num * num * num;
});
console.log("Кубы чисел:", result2);
console.log("-------------");

console.log("=== ВЛОЖЕННЫЕ ФУНКЦИИ ===");
function func9(num1, num2) {
    function square(num) {
        return num * num;
    }
    function cube(num) {
        return num * num * num;
    }
    return square(num1) + cube(num2);
}
console.log("Сумма квадрата и куба:", func9(2, 3));
console.log("-------------");

console.log("=== ОБЛАСТЬ ВИДИМОСТИ ВЛОЖЕННЫХ ФУНКЦИЙ ===");
console.log("№1 - Выведет 1");
console.log("№2 - Ничего не выведет (функция func не вызывается)");
console.log("№3 - Ошибка (func не определена вне test)");
console.log("-------------");

console.log("=== ПАРАМЕТРЫ ВНЕШНЕЙ ФУНКЦИИ ===");
console.log("№1 - Выведет 3");
console.log("№2 - Выведет 4");
console.log("-------------");

console.log("=== ОДНОИМЕННЫЕ ПАРАМЕТРЫ ===");
console.log("№1 - Выведет 1");
console.log("№2 - Выведет 1");
console.log("№3 - Выведет 2");
console.log("-------------");

console.log("=== ФУНКЦИЯ, ВОЗВРАЩАЮЩАЯ ФУНКЦИЮ ===");
function func10() {
    return function() {
        return 1;
    };
}
function func11() {
    return function() {
        return 2;
    };
}
console.log("Сумма:", func10()() + func11()());
console.log("-------------");

console.log("=== ЛЮБОЙ УРОВЕНЬ ВЛОЖЕННОСТИ ===");
function func12() {
    return function() {
        return function() {
            return function() {
                return function() {
                    return '!';
                };
            };
        };
    };
}
console.log("5 уровней вложенности:", func12()()()()());
console.log("-------------");

console.log("=== ПАРАМЕТРЫ ВОЗВРАЩАЕМОЙ ФУНКЦИИ ===");
function func13(num1) {
    return function(num2) {
        return function(num3) {
            return num1 + num2 + num3;
        };
    };
}
console.log("Сумма трех чисел:", func13(2)(3)(4));

function func14(num1) {
    return function(num2) {
        return function(num3) {
            return function(num4) {
                return function(num5) {
                    return [num1, num2, num3, num4, num5];
                };
            };
        };
    };
}
console.log("Массив чисел:", func14(2)(3)(4)(5)(0));
console.log("-------------");

console.log("=== ФУНКЦИИ-КОЛЛБЭКИ ===");
function each(arr, callback) {
    let result = [];
    for (let elem of arr) {
        result.push(callback(elem));
    }
    return result;
}

let numbers = [1, 2, 3, 4, 5];
console.log("Увеличение в 2 раза:", each(numbers, function(num) {
    return num * 2;
}));

let strings = ['abc', 'def', 'ghi'];
console.log("Перевернутые строки:", each(strings, function(str) {
    return str.split('').reverse().join('');
}));

console.log("Заглавные первые буквы:", each(strings, function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}));
console.log("-------------");

console.log("=== НЮАНСЫ КОЛЛБЭКОВ ===");
function cube(num) {
    return num ** 3;
}
console.log("Кубы чисел:", each([1, 2, 3, 4, 5], cube));
console.log("-------------");

console.log("=== ПРИМЕНЕНИЕ СТРЕЛОЧНЫХ ФУНКЦИЙ ===");
function filter(arr, callback) {
    let res = [];
    for (let elem of arr) {
        if (callback(elem) == true) {
            res.push(elem);
        }
    }
    return res;
}

let result3 = filter([1, 2, 3, 4, 5], elem => elem > 0);
console.log("Положительные числа:", result3);

let result4 = filter([1, 2, 3, 4, 5], elem => elem % 2 == 0);
console.log("Четные числа:", result4);
console.log("-------------");

// Демонстрация работы с областями видимости
console.log("=== ДЕМОНСТРАЦИЯ ОБЛАСТЕЙ ВИДИМОСТИ ===");
function test7(num) {
    function innerFunc() {
        console.log("Внутренняя функция видит num:", num);
    }
    innerFunc();
}
test7(10);

function test8(num1, num2) {
    function innerFunc() {
        console.log("Сумма параметров:", num1 + num2);
    }
    num1 = 5;
    innerFunc();
}
test8(2, 3);
console.log("-------------");
