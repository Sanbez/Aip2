"use strict";
console.log("=== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ В ФУНКЦИЯХ ===");
console.log("№1 - Выведет 1");
console.log("№2 - Выведет 2");
console.log("№3 - Выведет 1, затем 2");
console.log("-------------");

console.log("=== ЛОКАЛЬНЫЕ ПЕРЕМЕННЫЕ В ФУНКЦИЯХ ===");
console.log("№1 - Ошибка, переменная num не определена");
console.log("№2 - Выведет 5");
console.log("-------------");

console.log("=== ОДИНАКОВЫЕ ИМЕНА ПЕРЕМЕННЫХ ===");
console.log("№1 - Выведет 2");
console.log("№2 - Выведет 1");
console.log("-------------");

console.log("=== СОВПАДЕНИЕ ИМЕН С ПАРАМЕТРАМИ ===");
console.log("№1 - Выведет 1");
console.log("№2 - Выведет 2");
console.log("№3 - Выведет 1");
console.log("-------------");

console.log("=== ИЗМЕНЕНИЕ ГЛОБАЛЬНЫХ ПЕРЕМЕННЫХ ===");
console.log("№1 - Выведет 2");
console.log("№2 - Выведет 1");
console.log("№3 - Выведет 1");
console.log("№4 - Выведет 1");
console.log("№5 - Выведет 1");
console.log("№6 - Выведет 4");
console.log("№7 - Выведет 1");
console.log("№8 - Выведет 2");
console.log("-------------");

console.log("=== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ И ПАРАМЕТРЫ ===");
console.log("№1 - Выведет 1");
console.log("№2 - Выведет 1");
console.log("№3 - Ничего не выведет");
console.log("№4 - Выведет 2");
console.log("№5 - Выведет 1");
console.log("№6 - Выведет 2");
console.log("№7 - Выведет 1");
console.log("-------------");

console.log("=== ПАРАМЕТРЫ-ОБЪЕКТЫ ===");
console.log("№1 - Выведет {a: '!', b: 2, c: 3}");
console.log("№2 - Выведет {a: 1, b: 2, c: 3}");
console.log("№3 - Выведет {a: 1, b: 2, c: 3}");
console.log("№4 - Выведет [1, 3]");
console.log("№5 - Выведет [1, 2, 3]");
console.log("№6 - Выведет ['!', 2, 3]");
console.log("-------------");

// Демонстрация некоторых примеров для наглядности
console.log("=== ДЕМОНСТРАЦИЯ КЛЮЧЕВЫХ ПРИМЕРОВ ===");

// Пример 1: Глобальная переменная
let num = 1;
function func1() {
    console.log(num);
}
console.log("Глобальная переменная:");
func1();
console.log("-------------");

// Пример 2: Локальная переменная
function func2() {
    let num = 5;
    return num;
}
console.log("Локальная переменная:");
console.log(func2());
console.log("-------------");

// Пример 3: Изменение глобальной переменной
let num3 = 1;
function func3() {
    num3 = 2;
}
func3();
console.log("Изменение глобальной переменной:");
console.log(num3);
console.log("-------------");

// Пример 4: Параметры-объекты
function func4(obj) {
    obj.a = '!';
}
let obj4 = {a: 1, b: 2, c: 3};
func4(obj4);
console.log("Параметры-объекты:");
console.log(obj4);
console.log("-------------");

// Пример 5: Независимость локальной переменной
let num5 = 1;
function func5() {
    let num5 = 2;
}
func5();
console.log("Независимость локальной переменной:");
console.log(num5);
console.log("-------------");
