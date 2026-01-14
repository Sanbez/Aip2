"use strict";
console.log("=== ИСХОДНЫЙ КОД ФУНКЦИИ И ЕЕ РЕЗУЛЬТАТ ===");
function func() {
    return '!';
}
console.log("Результат работы функции:", func());
console.log("Исходный код функции:", func);
console.log("-------------");

console.log("=== ФУНКЦИЯ КАК ПЕРЕМЕННАЯ ===");
function func1() {
    return 'строка';
}
console.log("Результат работы функции:", func1());
console.log("Исходный код функции:", func1);
func1 = 123;
console.log("Новое значение переменной:", func1);
console.log("-------------");

console.log("=== ЗАПИСЬ ФУНКЦИИ В ДРУГУЮ ПЕРЕМЕННУЮ ===");
function func2() {
    return 3;
}
let test = func2;
console.log("Сумма результатов:", func2() + test());
console.log("-------------");

console.log("=== ПРИСВАИВАНИЕ ФУНКЦИЙ В ПЕРЕМЕННЫЕ ===");
let func3 = function() {
    return 1;
};
let func4 = function() {
    return 2;
};
console.log("Сумма значений функций:", func3() + func4());
console.log("-------------");

console.log("=== FUNCTION EXPRESSION И FUNCTION DECLARATION ===");
console.log("Function Declaration");
console.log("Function Expression");
console.log("-------------");

console.log("=== РАЗНИЦА ОБЪЯВЛЕНИЙ ФУНКЦИИ ===");
console.log("Function Declaration:");
console.log(funcDecl());
function funcDecl() {
    return 'Function Declaration';
}

let funcExpr = function() {
    return 'Function Expression';
};
console.log(funcExpr());
console.log("-------------");

console.log("=== ТОЧКА С ЗАПЯТОЙ ПРИ ОБЪЯВЛЕНИИ ФУНКЦИЙ ===");
let func5 = function() { console.log('!'); };
let func6 = function() {
    console.log('!');
};
function func7() {
    console.log('!');
}
console.log("-------------");

console.log("=== МАССИВ С АНОНИМНЫМИ ФУНКЦИЯМИ ===");
let arr = [
    function() { return 1; },
    function() { return 2; },
    function() { return 3; }
];
console.log("Число 3:", arr[2]());
console.log("Сумма результатов:", arr[0]() + arr[1]() + arr[2]());
console.log("Результаты всех функций:");
for (let func of arr) {
    console.log(func());
}
console.log("-------------");

console.log("=== ОБЪЕКТ С АНОНИМНЫМИ ФУНКЦИЯМИ ===");
let obj = {
    func1: function() { return 1; },
    func2: function() { return 2; },
    func3: function() { return 3; }
};
console.log("Сумма чисел:", obj.func1() + obj.func2() + obj.func3());
console.log("Результаты всех функций:");
for (let key in obj) {
    console.log(obj[key]());
}
console.log("-------------");

console.log("=== ПРИМЕНЕНИЕ ОБЪЕКТА С ФУНКЦИЯМИ ===");
let math = {
    sum: function(arr) {
        let sum = 0;
        for (let num of arr) {
            sum += num;
        }
        return sum;
    },
    sumSquares: function(arr) {
        let sum = 0;
        for (let num of arr) {
            sum += num * num;
        }
        return sum;
    },
    sumCubes: function(arr) {
        let sum = 0;
        for (let num of arr) {
            sum += num * num * num;
        }
        return sum;
    }
};
let numbers = [1, 2, 3];
console.log("Сумма элементов:", math.sum(numbers));
console.log("Сумма квадратов:", math.sumSquares(numbers));
console.log("Сумма кубов:", math.sumCubes(numbers));
console.log("-------------");

console.log("=== КАК ПРОВЕРИТЬ ТИП ФУНКЦИИ ===");
console.log("Function Expression");
console.log("Function Expression"); 
console.log("Function Expression");
console.log("Function Declaration");
console.log("-------------");

console.log("=== ВЫРАЖЕНИЕ СЛЕВА ФУНКЦИИ ===");
console.log("Function Expression");
console.log("Function Declaration");
console.log("Function Declaration");
console.log("Function Declaration");
console.log("Function Expression");
console.log("-------------");

console.log("=== ВЫРАЖЕНИЕ СПРАВА ФУНКЦИИ ===");
console.log("Function Declaration");
console.log("Function Expression");
console.log("Function Expression");
console.log("Function Expression");
console.log("Function Declaration");
console.log("Function Expression");
console.log("-------------");

console.log("=== ДЕМОНСТРАЦИЯ РАЗНИЦЫ ===");
console.log("Function Declaration (до объявления):", testDeclaration());
function testDeclaration() {
    return "Function Declaration работает!";
}

try {
    testExpression();
} catch (e) {
    console.log("Function Expression (до объявления): Ошибка - нельзя вызвать до объявления");
}

let testExpression = function() {
    return "Function Expression работает!";
};

console.log("Function Expression (после объявления):", testExpression());
console.log("-------------");
