"use strict";
console.log("=== ПЕРЕБОР МАССИВА ЦИКЛОМ FOR-OF ===");
let arr1 = ['a', 'b', 'c', 'd', 'e'];
for (let elem of arr1) {
    console.log(elem);
}
console.log("-------------");

let obj1 = {x: 1, y: 2, z: 3};
for (let key in obj1) {
    console.log(key);
}
console.log("-------------");

let obj2 = {x: 1, y: 2, z: 3};
for (let key in obj2) {
    console.log(obj2[key]);
}
console.log("-------------");

console.log("=== ЦИКЛ WHILE ===");
let i1 = 1;
while (i1 <= 10) {
    console.log(i1);
    i1++;
}
console.log("-------------");

let i2 = 11;
while (i2 <= 15) {
    console.log(i2);
    i2++;
}
console.log("-------------");

let i3 = 5;
while (i3 >= 1) {
    console.log(i3);
    i3--;
}
console.log("-------------");

let num = 1;
let iterations = 0;
while (num <= 1000) {
    num *= 3;
    iterations++;
}
console.log("Получившееся число:", num);
console.log("Количество итераций:", iterations);
console.log("-------------");

console.log("=== ЦИКЛ FOR ===");
for (let i = 1; i <= 10; i++) {
    console.log(i);
}
console.log("-------------");

for (let i = 11; i <= 15; i++) {
    console.log(i);
}
console.log("-------------");

for (let i = 0; i <= 10; i++) {
    if (i % 2 === 0) {
        console.log(i);
    }
}
console.log("-------------");

for (let i = 1; i <= 10; i++) {
    if (i % 2 !== 0) {
        console.log(i);
    }
}
console.log("-------------");

for (let i = 5; i >= 0; i--) {
    console.log(i);
}
console.log("-------------");

console.log("=== ЦИКЛ FOR ДЛЯ МАССИВОВ ===");
let arr2 = ['a', 'b', 'c', 'd', 'e'];
for (let i = 0; i < arr2.length; i++) {
    console.log(arr2[i]);
}
console.log("-------------");

let arr3 = ['a', 'b', 'c', 'd', 'e'];
for (let i = 1; i < arr3.length - 1; i++) {
    console.log(arr3[i]);
}
console.log("-------------");

let arr4 = ['a', 'b', 'c', 'd', 'e'];
for (let i = arr4.length - 1; i >= 0; i--) {
    console.log(arr4[i]);
}
console.log("-------------");

console.log("=== УСЛОВИЯ В ЦИКЛАХ ===");
let arr5 = [2, 5, 9, 15, 1, 4];
for (let elem of arr5) {
    if (elem > 3 && elem < 10) {
        console.log(elem);
    }
}
console.log("-------------");

let obj3 = {a: 1, b: 2, c: 3, d: 4, e: 5};
for (let key in obj3) {
    if (obj3[key] % 2 !== 0) {
        console.log(obj3[key]);
    }
}
console.log("-------------");

console.log("=== НАКОПЛЕНИЕ ЧИСЕЛ В ЦИКЛАХ ===");
let sum1 = 0;
for (let i = 2; i <= 10; i += 2) {
    sum1 += i;
}
console.log("Сумма четных чисел:", sum1);
console.log("-------------");

let sum2 = 0;
for (let i = 1; i <= 10; i += 2) {
    sum2 += i;
}
console.log("Сумма нечетных чисел:", sum2);
console.log("-------------");

let product1 = 1;
for (let i = 1; i <= 5; i++) {
    product1 *= i;
}
console.log("Произведение чисел:", product1);
console.log("-------------");

console.log("=== НАКОПЛЕНИЕ ЭЛЕМЕНТОВ МАССИВОВ В ЦИКЛАХ ===");
let arr6 = [2, 5, 9, 3, 1, 4];
let sum3 = 0;
for (let elem of arr6) {
    sum3 += elem;
}
console.log("Сумма элементов массива:", sum3);
console.log("-------------");

let arr7 = [2, 5, 9, 3, 1, 4];
let sum4 = 0;
for (let elem of arr7) {
    if (elem % 2 === 0) {
        sum4 += elem;
    }
}
console.log("Сумма четных элементов массива:", sum4);
console.log("-------------");

let arr8 = [2, 5, 9, 3, 1, 4];
let sum5 = 0;
for (let elem of arr8) {
    sum5 += elem * elem;
}
console.log("Сумма квадратов элементов массива:", sum5);
console.log("-------------");

let arr9 = [2, 5, 9, 3, 1, 4];
let product2 = 1;
for (let elem of arr9) {
    product2 *= elem;
}
console.log("Произведение элементов массива:", product2);
console.log("-------------");

console.log("=== ФОРМИРОВАНИЕ СТРОК ЧЕРЕЗ ЦИКЛЫ ===");
let str1 = "";
for (let i = 0; i < 5; i++) {
    str1 += '-';
}
console.log(str1);
console.log("-------------");

let str2 = "";
for (let i = 1; i <= 9; i++) {
    str2 += i;
}
console.log(str2);
console.log("-------------");

let str3 = "";
for (let i = 9; i >= 1; i--) {
    str3 += i;
}
console.log(str3);
console.log("-------------");

let str4 = "";
for (let i = 1; i <= 9; i++) {
    str4 += '-' + i;
}
str4 += '-';
console.log(str4);
console.log("-------------");

console.log("=== ЦИФРЫ ЧИСЛА ПРИ ПЕРЕБОРЕ ЦИКЛОМ ===");
let firstDigits = [];
for (let i = 10; i <= 20; i++) {
    let str = String(i);
    firstDigits.push(str[0]);
}
console.log("Первые цифры чисел:", firstDigits);
console.log("-------------");

let digitSums = [];
for (let i = 10; i <= 20; i++) {
    let str = String(i);
    let sum = Number(str[0]) + Number(str[1]);
    digitSums.push(sum);
}
console.log("Суммы первых двух цифр:", digitSums);
console.log("-------------");

let numbersWith1 = [];
for (let i = 10; i <= 20; i++) {
    let str = String(i);
    if (str[0] === '1') {
        numbersWith1.push(i);
    }
}
console.log("Числа с первой цифрой 1:", numbersWith1);
console.log("-------------");

let numbersSum5 = [];
for (let i = 10; i <= 50; i++) {
    let str = String(i);
    let sum = Number(str[0]) + Number(str[1]);
    if (sum === 5) {
        numbersSum5.push(i);
    }
}
console.log("Числа с суммой первых двух цифр 5:", numbersSum5);
console.log("-------------");

console.log("=== НЕОБЯЗАТЕЛЬНОСТЬ СКОБОК В ЦИКЛАХ ===");
let arr10 = [1, 2, 3, 4, 5];
for (let elem of arr10)
    console.log(elem);
console.log("-------------");

console.log("=== ИНСТРУКЦИЯ BREAK ===");
let arr11 = [1, 2, 0, 4, 5];
for (let elem of arr11) {
    if (elem === 0) {
        break;
    }
    console.log(elem);
}
console.log("-------------");

let arr12 = [2, 5, -1, 3, 1, 4];
let sum6 = 0;
for (let elem of arr12) {
    if (elem < 0) {
        break;
    }
    sum6 += elem;
}
console.log("Сумма до первого отрицательного числа:", sum6);
console.log("-------------");

let arr13 = [1, 2, 3, 4, 5];
let position = -1;
for (let i = 0; i < arr13.length; i++) {
    if (arr13[i] === 3) {
        position = i;
        break;
    }
}
console.log("Позиция первого числа 3:", position);
console.log("-------------");

let sum7 = 0;
let count = 0;
for (let i = 1; i <= 100; i++) {
    sum7 += i;
    count++;
    if (sum7 > 100) {
        break;
    }
}
console.log("Нужно сложить чисел:", count);
console.log("-------------");

console.log("=== ВЛОЖЕННЫЕ ЦИКЛЫ ===");
let result1 = "";
for (let i = 1; i <= 9; i++) {
    for (let j = 1; j <= 3; j++) {
        result1 += i;
    }
}
console.log(result1);
console.log("-------------");

let result2 = "";
for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
        result2 += i + '' + j + ' ';
    }
}
console.log(result2);
console.log("-------------");

console.log("=== ЗАПОЛНЕНИЕ МАССИВА ===");
let arr14 = [];
for (let i = 1; i <= 10; i++) {
    arr14.push(i);
}
console.log(arr14);
console.log("-------------");

let arr15 = [];
for (let i = 0; i < 10; i++) {
    arr15.push('x');
}
console.log(arr15);
console.log("-------------");

let arr16 = [2, -5, 9, -3, 1, 4];
let positiveArr = [];
for (let elem of arr16) {
    if (elem > 0) {
        positiveArr.push(elem);
    }
}
console.log(positiveArr);
console.log("-------------");

console.log("=== ИЗМЕНЕНИЕ МАССИВА В ЦИКЛЕ ===");
let arr17 = [1, 2, 3, 4, 5];
for (let i = 0; i < arr17.length; i++) {
    arr17[i] = arr17[i] * arr17[i];
}
console.log(arr17);
console.log("-------------");

let arr18 = [1, 2, 3, 4, 5];
for (let i = 0; i < arr18.length; i++) {
    arr18[i]--;
}
console.log(arr18);
console.log("-------------");

let arr19 = [1, 2, 3, 4, 5];
for (let i = 0; i < arr19.length; i++) {
    arr19[i] += 10;
}
console.log(arr19);
console.log("-------------");

console.log("=== ЗАПОЛНЕНИЕ ОБЪЕКТОВ ЧЕРЕЗ ЦИКЛ ===");
let arr20 = ['a', 'b', 'c', 'd', 'e'];
let arr21 = [1, 2, 3, 4, 5];
let obj4 = {};
for (let i = 0; i < arr20.length; i++) {
    obj4[arr20[i]] = arr21[i];
}
console.log(obj4);
console.log("-------------");

let obj5 = {a: 1, b: 2, c: 3, d: 4, e: 5};
let evenObj = {};
for (let key in obj5) {
    if (obj5[key] % 2 === 0) {
        evenObj[key] = obj5[key];
    }
}
console.log(evenObj);
console.log("-------------");

let obj6 = {a: 1, b: 2, c: 3, d: 4, e: 5};
let reversedObj = {};
for (let key in obj6) {
    reversedObj[obj6[key]] = key;
}
console.log(reversedObj);
console.log("-------------");

console.log("=== ИЗМЕНЕНИЕ ОБЪЕКТОВ ЧЕРЕЗ ЦИКЛ ===");
let obj7 = {x: 1, y: 2, z: 3};
for (let key in obj7) {
    obj7[key] = obj7[key] * obj7[key];
}
console.log(obj7);
console.log("-------------");

let obj8 = {x: 1, y: 2, z: 3};
for (let key in obj8) {
    obj8[key]++;
}
console.log(obj8);
console.log("-------------");

console.log("=== РАБОТА С ФЛАГАМИ ===");
let arr22 = ['a', 'b', 'c', 'd', 'e'];
let flag1 = false;
for (let elem of arr22) {
    if (elem === 'c') {
        flag1 = true;
        break;
    }
}
if (flag1) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

let num2 = 17;
let isPrime = true;
if (num2 < 2) {
    isPrime = false;
} else {
    for (let i = 2; i < num2; i++) {
        if (num2 % i === 0) {
            isPrime = false;
            break;
        }
    }
}
console.log(`Число ${num2} простое:`, isPrime);
console.log("-------------");

console.log("=== СОВЕТЫ ПО НАПИСАНИЮ КОДА ===");
let arr23 = [10, 20, 30, 40, 21, 32, 51];
let sum8 = 0;
for (let elem of arr23) {
    let str = String(elem);
    if (str[0] === '1' || str[0] === '2') {
        sum8 += elem;
    }
}
console.log("Сумма элементов с первой цифрой 1 или 2:", sum8);
console.log("-------------");
