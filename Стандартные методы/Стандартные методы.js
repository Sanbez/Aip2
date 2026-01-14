console.log("=== СТЕПЕНЬ И КОРЕНЬ ===");
console.log("2 в 10 степени:", Math.pow(2, 10));
console.log("-------------");

console.log("Квадратный корень из 245:", Math.sqrt(245));
console.log("-------------");

let arr1 = [4, 2, 5, 19, 13, 0, 10];
let sumOfCubes = 0;
for (let i = 0; i < arr1.length; i++) {
    sumOfCubes += Math.pow(arr1[i], 3);
}
console.log("Квадратный корень из суммы кубов:", Math.sqrt(sumOfCubes));
console.log("-------------");

console.log("=== ФУНКЦИИ ОКРУГЛЕНИЯ ===");
let sqrt379 = Math.sqrt(379);
console.log("Корень из 379 - до целых:", Math.round(sqrt379));
console.log("Корень из 379 - до десятых:", Math.round(sqrt379 * 10) / 10);
console.log("Корень из 379 - до сотых:", Math.round(sqrt379 * 100) / 100);
console.log("-------------");

let sqrt587 = Math.sqrt(587);
let rounded587 = {
    floor: Math.floor(sqrt587),
    ceil: Math.ceil(sqrt587)
};
console.log("Корень из 587 - округление:", rounded587);
console.log("-------------");

console.log("=== ЭКСТРЕМАЛЬНЫЕ ЧИСЛА ===");
let numbers = [4, -2, 5, 19, -130, 0, 10];
console.log("Минимальное число:", Math.min(...numbers));
console.log("Максимальное число:", Math.max(...numbers));
console.log("-------------");

console.log("=== РАНДОМ ===");
console.log("Случайное число от 1 до 100:", Math.floor(Math.random() * 100) + 1);
console.log("-------------");

let randomArray = [];
for (let i = 0; i < 10; i++) {
    randomArray.push(Math.floor(Math.random() * 100) + 1);
}
console.log("Массив из 10 случайных чисел:", randomArray);
console.log("-------------");

console.log("=== МОДУЛИ ===");
let a = 10, b = 15;
console.log("Модуль разности a и b:", Math.abs(a - b));
console.log("-------------");

console.log("=== РЕГИСТР СИМВОЛОВ ===");
let str1 = 'js';
console.log("'js' в верхнем регистре:", str1.toUpperCase());
console.log("-------------");

let str2 = 'JS';
console.log("'JS' в нижнем регистре:", str2.toLowerCase());
console.log("-------------");

console.log("=== ВЫРЕЗАНИЕ СТРОК ===");
let str3 = 'i study javascript';
console.log("substr - 'study':", str3.substr(2, 5));
console.log("substr - 'javascript':", str3.substr(8));
console.log("-------------");

console.log("substring - 'study':", str3.substring(2, 7));
console.log("substring - 'javascript':", str3.substring(8));
console.log("-------------");

console.log("slice - 'study':", str3.slice(2, 7));
console.log("slice - 'javascript':", str3.slice(8));
console.log("-------------");

console.log("=== ПОИСК ПО СТРОКАМ ===");
let url = 'http://example.com';
console.log("Начинается на 'http://':", url.startsWith('http://'));
console.log("-------------");

let filename = 'index.html';
console.log("Заканчивается на '.html':", filename.endsWith('.html'));
console.log("-------------");

console.log("=== ЗАМЕНА ЧАСТЕЙ СТРОКИ ===");
let str4 = '1-2-3-4-5';
console.log("Замена дефисов на точки:", str4.replace(/-/g, '.'));
console.log("-------------");

console.log("=== РАЗБИЕНИЕ СТРОК ===");
let str5 = '1-2-3-4-5';
console.log("Разбиение строки по дефисам:", str5.split('-'));
console.log("-------------");

let str6 = '12345';
console.log("Разбиение строки на символы:", str6.split(''));
console.log("-------------");

let arr2 = [1, 2, 3, 4, 5];
console.log("Объединение массива в строку:", arr2.join('-'));
console.log("-------------");

console.log("=== ГРАНИЧНЫЕ ЭЛЕМЕНТЫ МАССИВОВ ===");
let arr3 = [1, 2, 3];
console.log("Первый элемент массива:", arr3[0]);
console.log("-------------");

console.log("Последний элемент массива:", arr3[arr3.length - 1]);
console.log("-------------");

arr3.push(4, 5, 6);
console.log("Добавление в конец:", arr3);
console.log("-------------");

let arr4 = [1, 2, 3];
arr4.unshift(4, 5, 6);
console.log("Добавление в начало:", arr4);
console.log("-------------");

console.log("=== ЧАСТИ МАССИВОВ ===");
let arr5 = [1, 2, 3, 4, 5];
console.log("Первые три элемента:", arr5.slice(0, 3));
console.log("-------------");

let arr6 = [1, 2, 3, 4, 5];
let lastTwo = arr6.slice(3);
console.log("Последние два элемента:", lastTwo);
console.log("-------------");

console.log("=== ВЫРЕЗАНИЕ МАССИВОВ ===");
let arr7 = [1, 2, 3, 4, 5];
arr7.splice(1, 2);
console.log("Удаление элементов 2 и 3:", arr7);
console.log("-------------");

let arr8 = [1, 2, 3, 4, 5];
arr8.splice(3, 0, 'a', 'b', 'c');
console.log("Вставка элементов:", arr8);
console.log("-------------");

let arr9 = [1, 2, 3, 4, 5];
arr9.splice(1, 0, 'a', 'b');
arr9.splice(6, 0, 'c');
arr9.splice(8, 0, 'e');
console.log("Множественная вставка:", arr9);
console.log("-------------");

console.log("=== ПОИСК ПО МАССИВАМ ===");
let arr10 = [1, 2, 3, 4, 5];
console.log("Есть ли число 3 в массиве:", arr10.includes(3));
console.log("-------------");

console.log("=== МАССИВ КЛЮЧЕЙ ОБЪЕКТА ===");
let obj1 = {a: 1, b: 2, c: 3};
console.log("Ключи объекта:", Object.keys(obj1));
console.log("-------------");

console.log("=== ПОИСК ОШИБОК В КОДЕ ===");
let num1 = 12345;
let arr11 = String(num1).split('');
let sum1 = 0;
for (let digit of arr11) {
    sum1 += Number(digit);
}
console.log("Сумма цифр числа 12345:", sum1);
console.log("-------------");

let num2 = 12345;
let arr12 = String(num2).split('');
let sum2 = 0;
for (let digit of arr12) {
    sum2 += Number(digit);
}
console.log("Сумма цифр числа 12345:", sum2);
console.log("-------------");

let num3 = 12345;
let arr13 = String(num3).split('');
let sum3 = 0;
for (let digit of arr13) {
    sum3 += Number(digit);
}
console.log("Сумма цифр числа 12345:", sum3);
console.log("-------------");
