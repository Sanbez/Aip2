"use strict";


console.log("=== МЕТОД MAP ДЛЯ ПЕРЕБОРА МАССИВА ===");
let arr1 = [4, 9, 16, 25];
let sqrtArr = arr1.map(num => Math.sqrt(num));
console.log("№1:", sqrtArr);
console.log("-------------");

let arr2 = ["hello", "world", "javascript"];
let exclamationArr = arr2.map(str => str + "!");
console.log("№2:", exclamationArr);
console.log("-------------");

let arr3 = ["abc", "def", "ghi"];
let reversedArr = arr3.map(str => str.split('').reverse().join(''));
console.log("№3:", reversedArr);
console.log("-------------");

let arr4 = ['123', '456', '789'];
let numberMatrix = arr4.map(str => str.split('').map(Number));
console.log("№4:", numberMatrix);
console.log("-------------");

let arr5 = [2, 3, 4, 5];
let multipliedArr = arr5.map((num, index) => num * index);
console.log("№5:", multipliedArr);
console.log("-------------");

console.log("=== МЕТОД FOREACH ДЛЯ ПЕРЕБОРА МАССИВА ===");
let arr6 = [1, 2, 3, 4];
let sumOfSquares = 0;
arr6.forEach(num => {
    sumOfSquares += num * num;
});
console.log("№1:", sumOfSquares);
console.log("-------------");

console.log("=== МЕТОД FILTER ДЛЯ ФИЛЬТРАЦИИ МАССИВА ===");
let arr7 = [-3, -1, 0, 2, 4, -5];
let positiveNumbers = arr7.filter(num => num > 0);
console.log("№1:", positiveNumbers);
console.log("-------------");

let negativeNumbers = arr7.filter(num => num < 0);
console.log("№2:", negativeNumbers);
console.log("-------------");

let arr8 = [-2, 0, 3, 7, 12, 15, 8];
let numbersBetween0And10 = arr8.filter(num => num > 0 && num < 10);
console.log("№3:", numbersBetween0And10);
console.log("-------------");

let arr9 = ["hi", "hello", "javascript", "web", "development"];
let longStrings = arr9.filter(str => str.length > 5);
console.log("№4:", longStrings);
console.log("-------------");

let arr10 = [5, 8, 3, 10, 2];
let filteredByProduct = arr10.filter((num, index) => num * index < 30);
console.log("№5:", filteredByProduct);
console.log("-------------");

let arr11 = [1, 2, [3, 4], 5, [6, 7], 8];
let regularElements = arr11.filter(elem => !Array.isArray(elem));
console.log("№6:", regularElements);
console.log("-------------");

console.log("=== МЕТОД EVERY ДЛЯ ПРОВЕРКИ МАССИВА ===");
let arr12 = [1, 3, 5, 7, 9];
let allPositive = arr12.every(num => num > 0);
console.log("№1:", allPositive);
console.log("-------------");

let arr13 = [4, 5, 6, 7];
let allProductsLessThan30 = arr13.every((num, index) => num * index < 30);
console.log("№2:", allProductsLessThan30);
console.log("-------------");

console.log("=== МЕТОД SOME ДЛЯ ПРОВЕРКИ МАССИВА ===");
let arr14 = [-5, -3, -1, 0, 2];
let hasPositive = arr14.some(num => num > 0);
console.log("№1:", hasPositive);
console.log("-------------");

let arr15 = [3, 7, 8, 10];
let hasProductGreaterThan30 = arr15.some((num, index) => num * index > 30);
console.log("№2:", hasProductGreaterThan30);
console.log("-------------");
