"use strict";
console.log("=== УСЛОВИЯ С БУЛЕВЫМИ ЗНАЧЕНИЯМИ В JAVASCRIPT ===");

// №1 - Проверка, что переменная test равна true
let test = true;
if (test == true) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №2 - Проверка, что переменная test равна false
test = false;
if (test == false) {
    console.log('+++');
} else {
    console.log('---');
}

console.log("=== СРАВНЕНИЕ ЗНАЧЕНИЙ С БУЛЕВЫМ ТИПОМ В JAVASCRIPT ===");

// №1 - Значения, дающие false при приведении к логическому типу
console.log("Значения, дающие false: false, 0, '', null, undefined, NaN");
console.log("-------------");

// №2 - Сравнение числа 1 с true
test = 1;
if (test == true) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №3 - Сравнение числа 0 с true
test = 0;
if (test == true) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №4 - Сравнение числа 1 с false
test = 1;
if (test == false) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №5 - Проверка неравенства числа 1 и true
test = 1;
if (test != true) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №6 - Сравнение пустой строки с false
test = '';
if (test == false) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №7 - Сравнение undefined с true
test = undefined;
if (test == true) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №8 - Сравнение NaN с true
test = 3 * 'a';
if (test == true) {
    console.log('+++');
} else {
    console.log('---');
}

console.log("=== СОКРАЩЕННАЯ ФОРМА ПРОВЕРКИ НА ИСТИНУ В JAVASCRIPT ===");

// №1 - Переписывание проверки на true в сокращенной форме
test = true;
if (test) {
    console.log('+++');
} else {
    console.log('---');
}

console.log("=== СОКРАЩЕННАЯ ФОРМА ПРОВЕРКИ НА ЛОЖЬ В JAVASCRIPT ===");

// №1 - Переписывание проверки на false в сокращенной форме
test = true;
if (!test) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №2 - Переписывание проверки неравенства true в сокращенной форме
test = true;
if (!test) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №3 - Переписывание проверки неравенства false в сокращенной форме
test = true;
if (test) {
    console.log('+++');
} else {
    console.log('---');
}

console.log("=== ОБЩАЯ СОКРАЩЕННАЯ ФОРМА ПРОВЕРКИ В JAVASCRIPT ===");

// №1 - Проверка числа 3 в сокращенной форме
test = 3;
if (test) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №2 - Проверка строки 'abc' в сокращенной форме
test = 'abc';
if (test) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №3 - Проверка пустой строки в сокращенной форме
test = '';
if (test) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №4 - Проверка NaN в сокращенной форме
test = 3 * 'abc';
if (test) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №5 - Проверка null в сокращенной форме
test = null;
if (test) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №6 - Проверка false в сокращенной форме
test = false;
if (test) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №7 - Проверка undefined в сокращенной форме
test = undefined;
if (test) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №8 - Проверка числа 0 в сокращенной форме
test = 0;
if (test) {
    console.log('+++');
} else {
    console.log('---');
}

console.log("=== СЛОЖНЫЕ УСЛОВИЯ В СОКРАЩЕННОЙ ФОРМЕ В JAVASCRIPT ===");

// №1 - Переписывание сложного условия с И в сокращенной форме
let test1 = true;
let test2 = true;
if (test1 && test2) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №2 - Переписывание сложного условия с И и неравенством в сокращенной форме
test1 = true;
test2 = true;
if (test1 && !test2) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №3 - Переписывание сложного условия с отрицаниями в сокращенной форме
test1 = true;
test2 = true;
if (!test1 && !test2) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №4 - Переписывание сложного условия с неравенством false в сокращенной форме
test1 = true;
test2 = true;
if (test1 && test2) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №5 - Переписывание сложного условия с тремя переменными в сокращенной форме
test1 = true;
test2 = true;
let test3 = true;
if (test1 && test2 && test3) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №6 - Переписывание сложного условия с ИЛИ и И в сокращенной форме
test1 = true;
test2 = true;
test3 = true;
if (test1 || test2 && test3) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №7 - Переписывание сложного условия с ИЛИ и отрицаниями в сокращенной форме
test1 = true;
test2 = true;
test3 = true;
if (test1 || !test2 && !test3) {
    console.log('+++');
} else {
    console.log('---');
}

console.log("=== ИНВЕРТИРОВАНИЕ ЛОГИЧЕСКИХ ВЫРАЖЕНИЙ В JAVASCRIPT ===");

// №1 - Инвертирование условия с ИЛИ с помощью оператора !
let num1 = 5;
let num2 = 5;
if (!(num1 >= 0 || num2 <= 10)) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("=== НЕОБЯЗАТЕЛЬНОСТЬ КОНСТРУКЦИИ ELSE В JAVASCRIPT ===");

// №1 - Проверка равенства переменной 10 без else
test = 10;
if (test == 10) {
    console.log('yes');
}
console.log("-------------");

console.log("=== НЕОБЯЗАТЕЛЬНОСТЬ ФИГУРНЫХ СКОБОК В JAVASCRIPT ===");

// №1 - Сокращенная форма if-else без фигурных скобок
test = 5;
if (test > 0)
    console.log('+++');
else
    console.log('---');
console.log("-------------");

// №2 - Сокращенная форма if без фигурных скобок
test = 3;
if (test > 0)
    console.log('+++');
console.log("-------------");

console.log("=== КОНСТРУКЦИЯ ELSE IF В JAVASCRIPT ===");

// №1 - Определение декады месяца
let day = 15;
if (day >= 1 && day <= 10) {
    console.log('Первая декада');
} else if (day >= 11 && day <= 20) {
    console.log('Вторая декада');
} else if (day >= 21 && day <= 31) {
    console.log('Третья декада');
}
console.log("-------------");

// №2 - Определение декады месяца с проверкой ошибок
day = 35;
if (day >= 1 && day <= 10) {
    console.log('Первая декада');
} else if (day >= 11 && day <= 20) {
    console.log('Вторая декада');
} else if (day >= 21 && day <= 31) {
    console.log('Третья декада');
} else {
    console.log('Ошибка: число должно быть от 1 до 31');
}
console.log("-------------");

console.log("=== ВЛОЖЕННЫЕ КОНСТРУКЦИИ IF-ELSE В JAVASCRIPT ===");

// №1 - Сумма цифр числа и проверка ее разрядности
let num = 45;
if (num >= 10 && num <= 99) {
    let digit1 = Math.floor(num / 10);
    let digit2 = num % 10;
    let sum = digit1 + digit2;
    
    if (sum <= 9) {
        console.log('Сумма цифр однозначна: ' + sum);
    } else {
        console.log('Сумма цифр двухзначна: ' + sum);
    }
}
console.log("-------------");

console.log("=== КОНСТРУКЦИЯ SWITCH-CASE В JAVASCRIPT ===");

// №1 - Переписывание кода через switch-case для языков
let lang = 'ru';
switch (lang) {
    case 'ru':
        console.log('rus');
        break;
    case 'en':
        console.log('eng');
        break;
    case 'de':
        console.log('deu');
        break;
    default:
        console.log('language not supported');
        break;
}
console.log("-------------");

console.log("=== ТЕРНАРНЫЙ ОПЕРАТОР В JAVASCRIPT ===");

// №1 - Переписывание кода через тернарный оператор
num2 = 1;
let res = num2 >= 0 ? '1' : '2';
console.log(res);
console.log("-------------");

console.log("=== ЛОГИЧЕСКИЕ ОПЕРАЦИИ В JAVASCRIPT ===");

// №1 - Проверка равенства значений переменных
let a = 2 * (3 - 1);
let b = 6 - 2;
console.log(a == b);
console.log("-------------");

// №2 - Проверка, больше ли a чем b
a = 5 * (7 - 4);
b = 1 + 2 + 7;
console.log(a > b);
console.log("-------------");

// №3 - Проверка неравенства значений переменных
a = 2 ** 4;
b = 4 ** 2;
console.log(a != b);
console.log("-------------");

console.log("=== ФУНКЦИЯ CONFIRM В JAVASCRIPT ===");

// №1 - Проверка возраста пользователя через confirm
// Закомментировано, чтобы не мешать выполнению кода
// let ok = confirm('Вам есть 18 лет?');
// if (ok) {
//     console.log('Доступ разрешен: контент для взрослых');
// } else {
//     console.log('Доступ запрещен');
// }
console.log("Для демонстрации confirm закомментировано");
console.log("-------------");

console.log("=== ОБЛАСТЬ ВИДИМОСТИ ПЕРЕМЕННЫХ В IF-ELSE В JAVASCRIPT ===");

// №1 - Исправление ошибки области видимости переменной
let age = 17;
let adult;

if (age >= 18) {
    adult = true;
} else {
    adult = false;
}

console.log(adult);
console.log("=== ПРОБЛЕМЫ ОБЛАСТИ ВИДИМОСТИ ПЕРЕМЕННЫХ В IF-ELSE ===");

// №1 - Исправление ошибки области видимости (объявление внутри if)
age = 17;
adult;

if (age >= 18) {
    adult = true;
} else {
    adult = false;
}
console.log(adult);
console.log("-------------");

// №2 - Исправление ошибки области видимости (объявление в else)
age = 17;
adult;

if (age >= 18) {
    adult = true;
} else {
    adult = false;
}
console.log(adult);
console.log("-------------");

// №3 - Исправление ошибки области видимости (вложенные if)
age = 17;
res;

if (age >= 18) {
    if (age <= 23) {
        res = 'от 18 до 23';
    } else {
        res = 'больше 23';
    }
} else {
    res = 'меньше 18';
}
console.log(res);
console.log("-------------");

// №4 - Исправление ошибки области видимости (лишнее объявление)
age = 19;
res;

if (age >= 18) {
    if (age <= 23) {
        res = 'от 18 до 23';
    } else {
        res = 'больше 23';
    }
} else {
    res = 'меньше 18';
}
console.log(res);

console.log("=== ПРОВЕРКА ЧАСТЕЙ ЧАСА ЧЕРЕЗ IF-ELSE ===");

// №1 - Определение трети часа
let min = 25;
if (min >= 0 && min <= 19) {
    console.log('1 треть');
} else if (min >= 20 && min <= 39) {
    console.log('2 треть');
} else if (min >= 40 && min <= 59) {
    console.log('3 треть');
}

console.log("=== ПРОВЕРКА ДЛИНЫ СТРОК И МАССИВОВ ===");

// №1 - Проверка длины массива и сумма элементов
let arr = [1, 2, 3];
if (arr.length === 3) {
    let sum = arr[0] + arr[1] + arr[2];
    console.log('Сумма элементов: ' + sum);
}

console.log("=== ПРОВЕРКА СИМВОЛОВ СТРОКИ ===");

// №1 - Проверка начала строки на 'a'
let str = 'abcde';
if (str[0] === 'a') {
    console.log('Строка начинается на a');
}
console.log("-------------");

// №2 - Проверка конца строки на 'x'
str = 'testx';
if (str[str.length - 1] === 'x') {
    console.log('Строка заканчивается на x');
}
console.log("-------------");

// №3 - Проверка начала строки на 'a' или 'b'
str = 'bcd';
if (str[0] === 'a' || str[0] === 'b') {
    console.log('Строка начинается на a или b');
}

console.log("=== ПРОВЕРКА ЦИФР ЧИСЛА ===");

// №1 - Проверка последней цифры на ноль
num = 120;
let lastDigit = String(num)[String(num).length - 1];
if (lastDigit === '0') {
    console.log('Последняя цифра равна 0');
}
console.log("-------------");

// №2 - Проверка четности числа по последней цифре
num = 123;
lastDigit = String(num)[String(num).length - 1];
if (lastDigit === '0' || lastDigit === '2' || lastDigit === '4' || lastDigit === '6' || lastDigit === '8') {
    console.log('Число четное');
} else {
    console.log('Число нечетное');
}

console.log("=== ПРОВЕРКА ОСТАТКА ОТ ДЕЛЕНИЯ ===");

// №1 - Проверка четности числа через остаток
num = 10;
if (num % 2 === 0) {
    console.log('Число четное');
} else {
    console.log('Число нечетное');
}
console.log("-------------");

// №2 - Проверка делимости на 3
num = 9;
if (num % 3 === 0) {
    console.log('Число делится на 3');
} else {
    console.log('Число не делится на 3');
}

console.log("=== ПОИСК ОШИБОК В КОДЕ С УСЛОВИЯМИ ===");

// №1 - Проверка суммы чисел (правильный код)
num1 = 1;
num2 = 2;
if (num1 + num2 === 3) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №2 - Исправление проверки суммы строк
num1 = '1';
num2 = '2';
if (Number(num1) + Number(num2) === 3) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №3 - Исправление преобразования строк в числа
num1 = '1';
num2 = '2';
if (Number(num1) + Number(num2) === 3) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №4 - Исправление проверки первой цифры числа
num = 123;
if (String(num)[0] === '1') {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №5 - Исправление преобразования цифры числа
num = 123;
if (String(num)[0] === '1') {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №6 - Проверка первой цифры числа (правильный код)
num = 123;
if (String(num)[0] === '1') {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №7 - Проверка первой цифры через переменную (правильный код)
num = 123;
let first = String(num)[0];
if (first === '1') {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №8 - Исправление проверки длины числа
num = 12;
if (String(num).length === 2) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №9 - Исправление преобразования числа в строку
num = 12;
let strNum = String(num);
if (strNum.length === 2) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №10 - Исправление проверки длины числа
num = 12;
if (String(num).length === 2) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №11 - Исправление сравнения длины с строкой
num = 12;
if (String(num).length === 2) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №12 - Проверка длины числа (правильный код)
num = 12;
if (String(num).length === 2) {
    console.log('+++');
} else {
    console.log('---');
}
console.log("-------------");

// №13 - Исправление суммы цифр строки
num = '123033';
let sum1 = Number(num[0]) + Number(num[1]) + Number(num[2]);
let sum2 = Number(num[3]) + Number(num[4]) + Number(num[5]);
if (sum1 === sum2) {
    console.log('суммы равны');
} else {
    console.log('суммы не равны');
}

console.log("=== ПРАКТИКА НА УСЛОВИЯ IF-ELSE ===");

// №1 - Определение поры года по месяцу
let month = 6;
if (month >= 3 && month <= 5) {
    console.log('Весна');
} else if (month >= 6 && month <= 8) {
    console.log('Лето');
} else if (month >= 9 && month <= 11) {
    console.log('Осень');
} else {
    console.log('Зима');
}
console.log("-------------");

// №2 - Проверка первого символа строки
str = 'abcde';
if (str[0] === 'a') {
    console.log('Первый символ - a');
}
console.log("-------------");

// №3 - Проверка первой цифры числа
num = 12345;
let firstDigit = String(num)[0];
if (firstDigit === '1' || firstDigit === '2' || firstDigit === '3') {
    console.log('Первая цифра 1, 2 или 3');
}
console.log("-------------");

// №4 - Сумма цифр трехзначного числа
num = 123;
let digit1 = Math.floor(num / 100);
let digit2 = Math.floor((num % 100) / 10);
let digit3 = num % 10;
let sum = digit1 + digit2 + digit3;
console.log('Сумма цифр: ' + sum);
console.log("-------------");

// №5 - Проверка равенства сумм цифр шестизначного числа
num = 123321;
let numStr = String(num);
let sumFirst = Number(numStr[0]) + Number(numStr[1]) + Number(numStr[2]);
let sumSecond = Number(numStr[3]) + Number(numStr[4]) + Number(numStr[5]);
if (sumFirst === sumSecond) {
    console.log('Суммы первых и вторых трех цифр равны');
} else {
    console.log('Суммы не равны');
}
