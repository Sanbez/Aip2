"use strict";
console.log("=== РЕКУРСИЯ - ВЫВОД ЭЛЕМЕНТОВ МАССИВА ===");
// №1 - Вывод элементов массива с помощью рекурсии
function printArrayElements(arr) {
    console.log(arr.shift());
    if (arr.length !== 0) {
        printArrayElements(arr);
    }
}
console.log("№1 - Вывод элементов массива [1, 2, 3, 4, 5]:");
printArrayElements([1, 2, 3, 4, 5]);
console.log("-------------");

console.log("=== РЕКУРСИЯ - СУММА ЭЛЕМЕНТОВ МАССИВА ===");
// №1 - Сумма квадратов элементов массива
function sumOfSquares(arr) {
    let sum = Math.pow(arr.shift(), 2);
    if (arr.length !== 0) {
        sum += sumOfSquares(arr);
    }
    return sum;
}
console.log("№1 - Сумма квадратов массива [1, 2, 3, 4, 5]:", sumOfSquares([1, 2, 3, 4, 5]));
console.log("-------------");

console.log("=== РЕКУРСИЯ И МНОГОМЕРНЫЕ СТРУКТУРЫ ===");
// №1 - Вывод примитивных элементов многомерного объекта
function printPrimitives(obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            printPrimitives(obj[key]);
        } else {
            console.log(obj[key]);
        }
    }
}
console.log("№1 - Примитивные элементы объекта:");
printPrimitives({a:1, b: {c:2, d:3, e:4}, f: {g:5, j:6, k: {l:7, m: {n:8, o:9}}}});
console.log("-------------");

// №2 - Разворот многомерного массива в одномерный
function flattenArray(arr) {
    let result = [];
    for (let elem of arr) {
        if (Array.isArray(elem)) {
            result = result.concat(flattenArray(elem));
        } else {
            result.push(elem);
        }
    }
    return result;
}
console.log("№2 - Развернутый массив:", flattenArray([1, [2, 7, 8], [3, 4, [5, [6, 7]]]]));
console.log("-------------");

console.log("=== СУММА ЭЛЕМЕНТОВ МАССИВА ЧЕРЕЗ РЕКУРСИЮ ===");
// №1 - Сумма элементов многомерного объекта
function sumObjectElements(obj) {
    let sum = 0;
    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            sum += sumObjectElements(obj[key]);
        } else {
            sum += obj[key];
        }
    }
    return sum;
}
console.log("№1 - Сумма элементов объекта:", sumObjectElements({a: 1, b: {c: 2, d: 3, e: 4}, f: {g: 5, j: 6, k: {l: 7, m: {n: 8, o: 9}}}}));
console.log("-------------");

// №2 - Слияние строк многомерного массива
function concatStrings(arr) {
    let result = '';
    for (let elem of arr) {
        if (Array.isArray(elem)) {
            result += concatStrings(elem);
        } else {
            result += elem;
        }
    }
    return result;
}
console.log("№2 - Результат слияния строк:", concatStrings(['a', ['b', 'c', 'd'], ['e', 'f', ['g', ['j', 'k']]]]));
console.log("-------------");

console.log("=== МАНИПУЛЯЦИИ С ЭЛЕМЕНТАМИ В JAVASCRIPT ===");
// №1 - Возведение элементов-чисел в квадрат
function squareNumbers(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] === 'object') {
            arr[i] = squareNumbers(arr[i]);
        } else {
            arr[i] = Math.pow(arr[i], 2);
        }
    }
    return arr;
}
console.log("№1 - Массив с возведенными в квадрат числами:", squareNumbers([1, [2, 7, 8], [3, 4], [5, [6, 7]]]));
console.log("-------------");
