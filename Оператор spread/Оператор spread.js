
"use strict";

console.log("=== ОПЕРАТОР SPREAD В JAVASCRIPT ===");
let arr = [1, 2, 3, 4, 5];

function func(num1, num2, num3, num4, num5) {
    return num1 + num2 + num3 + num4 + num5;
}

let result = func(...arr);
console.log("№1:", result);
console.log("-------------");

console.log("=== ИСПОЛЬЗОВАНИЕ SPREAD В JAVASCRIPT ===");
function func2(n1, n2, n3, n4, n5, n6, n7, n8) {
    return (n1 + n2 + n3 + n4) * (n5 + n6 + n7 + n8);
}

let result2 = func2(1, ...[2, 3, 4], 5, ...[6], ...[7, 8]);
console.log("№1:", result2);
console.log("-------------");

console.log("=== ЭКСТРЕМАЛЬНЫЕ ЗНАЧЕНИЯ МАССИВА ЧЕРЕЗ SPREAD ===");
let numbers = [3, 7, 2, 9, 1, 5];
let minValue = Math.min(...numbers);
console.log("№1:", minValue);
console.log("-------------");

console.log("=== ОПЕРАТОР SPREAD И СЛИЯНИЕ МАССИВОВ ===");
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let arr3 = ['a', ...arr1, 'b', 'c', ...arr2];
console.log("№1:", arr3);
console.log("-------------");

let arr4 = ['e', ...arr1, ...arr1, 'b', 'c'];
console.log("№2:", arr4);
console.log("-------------");

let arr5 = [1, 2, 3];
let arr6 = [...arr5, 4, 5, 6];
let arr7 = ['e', 'b', 'c', ...arr6];
console.log("№3:", arr7);
console.log("-------------");

let arr8 = [1, 2, 3];
let arr9 = [...arr8, 4, 5, 6];
let arr10 = [...arr9, 7, 8, 9];
let arr11 = [0, ...arr10];
console.log("№4:", arr11);
console.log("-------------");

console.log("=== ОПЕРАТОР SPREAD ДЛЯ СТРОК В JAVASCRIPT ===");
let arr12 = [...'12345'];
console.log("№1:", arr12);
console.log("-------------");

let arr13 = ['a', ...'12345'];
console.log("№2:", arr13);
console.log("-------------");

let arr14 = [...'12345', ...'56789'];
console.log("№3:", arr14);
console.log("-------------");

let arr15 = ['a', 'b', 'c'];
let arr16 = [...arr15, ...'12345'];
console.log("№4:", arr16);
console.log("-------------");
