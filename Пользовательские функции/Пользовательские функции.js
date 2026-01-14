console.log("=== ОСНОВЫ РАБОТЫ С ПОЛЬЗОВАТЕЛЬСКИМИ ФУНКЦИЯМИ ===");
function showName() {
    console.log("Ваше имя");
}
showName();
console.log("-------------");

function sumFrom1To100() {
    let sum = 0;
    for (let i = 1; i <= 100; i++) {
        sum += i;
    }
    console.log(sum);
}
sumFrom1To100();
console.log("-------------");

console.log("=== ПАРАМЕТРЫ ФУНКЦИЙ ===");
function cube(num) {
    console.log(num ** 3);
}
cube(3);
console.log("-------------");

function checkNumber(num) {
    if (num >= 0) {
        console.log('++');
    } else {
        console.log('--');
    }
}
checkNumber(5);
checkNumber(-3);
console.log("-------------");

console.log("=== НЕСКОЛЬКО ПАРАМЕТРОВ ФУНКЦИЙ ===");
function sumThree(num1, num2, num3) {
    console.log(num1 + num2 + num3);
}
sumThree(1, 2, 3);
console.log("-------------");

console.log("=== ПАРАМЕТРЫ-ПЕРЕМЕННЫЕ ФУНКЦИЙ ===");
function sumThreeNumbers(num1, num2, num3) {
    console.log(num1 + num2 + num3);
}
let param1 = 1;
let param2 = 2;
let param3 = 3;
sumThreeNumbers(param1, param2, param3);
console.log("-------------");

console.log("=== ИНСТРУКЦИЯ RETURN ===");
function getCube(num) {
    return num ** 3;
}
let res1 = getCube(3);
console.log("Куб числа 3:", res1);
console.log("-------------");

function getSquareRoot(num) {
    return Math.sqrt(num);
}
let root3 = getSquareRoot(3);
let root4 = getSquareRoot(4);
console.log("Сумма корней 3 и 4:", root3 + root4);
console.log("-------------");

console.log("=== ПОСЛЕДОВАТЕЛЬНЫЙ ВЫЗОВ ФУНКЦИЙ ===");
function sqrt(num) {
    return Math.sqrt(num);
}
function round(num) {
    return num.toFixed(3);
}
console.log("Корень из 2 округленный:", round(sqrt(2)));
console.log("-------------");

function sum(num1, num2, num3) {
    return num1 + num2 + num3;
}
let res2 = sum(sqrt(2), sqrt(3), sqrt(4));
console.log("Сумма корней 2, 3 и 4:", res2);
console.log("-------------");

let res3 = round(sum(sqrt(2), sqrt(3), sqrt(4)));
console.log("Сумма корней округленная:", res3);
console.log("-------------");

console.log("=== ТОНКОЕ МЕСТО RETURN ===");
function func1(num) {
    return num;
    let res = num ** 2;
    return res;
}
console.log("func1(3):", func1(3));
console.log("-------------");

function func2(num) {
    if (num <= 0) {
        return Math.abs(num);
    } else {
        return num ** 2;
    }
}
console.log("func2(10):", func2(10));
console.log("func2(-6):", func2(-6));
console.log("-------------");

function func3(num) {
    if (num <= 0) {
        return Math.abs(num);
    }
    return num ** 2;
}
console.log("func3(10):", func3(10));
console.log("func3(-6):", func3(-6));
console.log("-------------");

console.log("=== ПРИМЕНЕНИЕ RETURN В ЦИКЛАХ ===");
function divideUntilLessThan10(num) {
    let count = 0;
    while (num >= 10) {
        num = num / 2;
        count++;
    }
    return count;
}
console.log("Итераций для числа 100:", divideUntilLessThan10(100));
console.log("-------------");

console.log("=== ПРИЕМ РАБОТЫ С RETURN ===");
function multiplyOrSubtract(num1, num2) {
    if (num1 > 0 && num2 > 0) {
        return num1 * num2;
    } else {
        return num1 - num2;
    }
}
console.log("multiplyOrSubtract(3, 4):", multiplyOrSubtract(3, 4));
console.log("-------------");

console.log("=== ФЛАГИ В ФУНКЦИЯХ ===");
function allEven(arr) {
    for (let elem of arr) {
        if (elem % 2 !== 0) {
            return false;
        }
    }
    return true;
}
console.log("Все четные в [2,4,6]:", allEven([2, 4, 6]));
console.log("Все четные в [2,3,6]:", allEven([2, 3, 6]));
console.log("-------------");

function allDigitsOdd(num) {
    let str = String(num);
    for (let digit of str) {
        if (Number(digit) % 2 === 0) {
            return false;
        }
    }
    return true;
}
console.log("Все цифры нечетные в 135:", allDigitsOdd(135));
console.log("Все цифры нечетные в 136:", allDigitsOdd(136));
console.log("-------------");

function hasConsecutiveDuplicates(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === arr[i + 1]) {
            return true;
        }
    }
    return false;
}
console.log("Есть подряд одинаковые в [1,2,2,3]:", hasConsecutiveDuplicates([1, 2, 2, 3]));
console.log("Есть подряд одинаковые в [1,2,3,4]:", hasConsecutiveDuplicates([1, 2, 3, 4]));
console.log("-------------");

console.log("=== ЛОГИЧЕСКИЕ ОПЕРАТОРЫ БЕЗ IF ===");
function areEqual(a, b) {
    return a == b;
}
console.log("areEqual(5,5):", areEqual(5, 5));
console.log("areEqual(5,6):", areEqual(5, 6));
console.log("-------------");

function areNotEqual(a, b) {
    return a != b;
}
console.log("areNotEqual(5,5):", areNotEqual(5, 5));
console.log("areNotEqual(5,6):", areNotEqual(5, 6));
console.log("-------------");

function sumGreaterOrEqual10(a, b) {
    return (a + b) >= 10;
}
console.log("sumGreaterOrEqual10(4,6):", sumGreaterOrEqual10(4, 6));
console.log("sumGreaterOrEqual10(3,4):", sumGreaterOrEqual10(3, 4));
console.log("-------------");

function isPositive(num) {
    return num >= 0;
}
console.log("isPositive(5):", isPositive(5));
console.log("isPositive(-3):", isPositive(-3));
console.log("-------------");

console.log("=== ЦИКЛ И RETURN ===");
function sumToN(num) {
    let sum = 0;
    for (let i = 1; i <= num; i++) {
        sum += i;
    }
    return sum;
}
console.log("sumToN(5):", sumToN(5));
console.log("-------------");

console.log("=== НЕОБЯЗАТЕЛЬНЫЕ ПАРАМЕТРЫ ===");
function square(num = 5) {
    console.log(num * num);
}
square(2);
square(3);
square();
console.log("-------------");

function add(num1 = 0, num2 = 0) {
    console.log(num1 + num2);
}
add(2, 3);
add(3);
add();
console.log("-------------");

console.log("=== ПРАКТИКА НА ФУНКЦИИ ===");
function getDivisors(num) {
    let divisors = [];
    for (let i = 1; i <= num; i++) {
        if (num % i === 0) {
            divisors.push(i);
        }
    }
    return divisors;
}
console.log("Делители числа 12:", getDivisors(12));
console.log("-------------");

function getCommonDivisors(num1, num2) {
    let common = [];
    let min = Math.min(num1, num2);
    for (let i = 1; i <= min; i++) {
        if (num1 % i === 0 && num2 % i === 0) {
            common.push(i);
        }
    }
    return common;
}
console.log("Общие делители 12 и 18:", getCommonDivisors(12, 18));
console.log("-------------");

function getDigitSum(num) {
    let sum = 0;
    let str = String(num);
    for (let digit of str) {
        sum += Number(digit);
    }
    return sum;
}
console.log("Сумма цифр числа 123:", getDigitSum(123));
console.log("-------------");

function getCurrentDay() {
    let days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
    let date = new Date();
    return days[date.getDay()];
}
console.log("Текущий день недели:", getCurrentDay());
console.log("-------------");

function getDayOfDate(dateStr) {
    let days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
    let date = new Date(dateStr);
    return days[date.getDay()];
}
console.log("День недели для 2023-10-01:", getDayOfDate('2023-10-01'));
console.log("-------------");

function secondsToDays(seconds) {
    return seconds / (24 * 60 * 60);
}
console.log("Суток в 86400 секундах:", secondsToDays(86400));
console.log("-------------");

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
console.log("2024 високосный:", isLeapYear(2024));
console.log("2023 високосный:", isLeapYear(2023));
console.log("-------------");

function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}
console.log("7 простое:", isPrime(7));
console.log("8 простое:", isPrime(8));
console.log("-------------");

console.log("=== ПОИСК ОШИБОК В КОДЕ ===");
let num = 12345;
let arr = String(num).split('');
let sum = 0;
for (let digit of arr) {
    sum += Number(digit);
}
console.log("Сумма цифр числа 12345:", sum);
console.log("-------------");

let num2 = 12345;
let arr2 = String(num2).split('');
let sum2 = 0;
for (let digit of arr2) {
    sum2 += Number(digit);
}
console.log("Сумма цифр числа 12345:", sum2);
console.log("-------------");

let num3 = 12345;
let arr3 = String(num3).split('');
let sum3 = 0;
for (let digit of arr3) {
    sum3 += Number(digit);
}
console.log("Сумма цифр числа 12345:", sum3);
console.log("-------------");
