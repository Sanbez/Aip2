"use strict";
console.log("=== ОБЪЕКТЫ В JAVASCRIPT ===");

// №1 - Создание объекта с днями недели
let daysObj = {
    1: 'Понедельник',
    2: 'Вторник', 
    3: 'Среда',
    4: 'Четверг',
    5: 'Пятница',
    6: 'Суббота',
    7: 'Воскресенье'
};
console.log(daysObj[1]);
console.log(daysObj[2]);
console.log(daysObj[3]);
console.log(daysObj[4]);
console.log(daysObj[5]);
console.log(daysObj[6]);
console.log(daysObj[7]);

console.log("=== ВЫВОД ВСЕГО ОБЪЕКТА В JAVASCRIPT ===");

// №1 - Создание объекта с месяцами
let monthsObj = {
    1: 'Январь',
    2: 'Февраль',
    3: 'Март',
    4: 'Апрель',
    5: 'Май',
    6: 'Июнь',
    7: 'Июль',
    8: 'Август',
    9: 'Сентябрь',
    10: 'Октябрь',
    11: 'Ноябрь',
    12: 'Декабрь'
};
console.log(monthsObj);

console.log("=== СТРОКОВЫЕ КЛЮЧИ ОБЪЕКТОВ В JAVASCRIPT ===");

// №1 - Создание объекта user с ФИО
let user = {
    name: 'Иван',
    surname: 'Петров',
    patronymic: 'Сергеевич'
};
console.log(user['surname'] + ' ' + user['name'] + ' ' + user['patronymic']);

console.log("=== СВОЙСТВА ОБЪЕКТОВ В JAVASCRIPT ===");

// №1 - Создание объекта date с текущей датой
let currentDate = new Date();
let date = {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    day: currentDate.getDate()
};
console.log(date.year + '-' + date.month + '-' + date.day);

console.log("=== ОГРАНИЧЕНИЯ НА КЛЮЧИ ОБЪЕКТОВ В JAVASCRIPT ===");

// №1 - Анализ обязательности кавычек для ключей
let obj1 = {'!key': 'a', 'key-2': 'b', key3: 'c'};

console.log("---------");
// №2 - Исправление ошибок в коде объекта
let obj2 = {
    '1a': 1,
    'b2': 2,
    'c-c': 3,
    'd 4': 4,
    'e5': 5
};
console.log(obj2['1a']);
console.log(obj2['b2']);
console.log(obj2['c-c']);
console.log(obj2['d 4']);
console.log(obj2['e5']);
console.log("=== ИЗМЕНЕНИЕ ЭЛЕМЕНТОВ ОБЪЕКТОВ В JAVASCRIPT ===");

// №1 - Возведение в квадрат элементов объекта
let obj3 = {x: 1, y: 2, z: 3};
obj3['x'] = obj3['x'] * obj3['x'];
obj3['y'] = obj3['y'] * obj3['y'];
obj3['z'] = obj3['z'] * obj3['z'];
console.log(obj3);

console.log("=== ДОБАВЛЕНИЕ ЭЛЕМЕНТОВ В ОБЪЕКТЫ В JAVASCRIPT ===");

// №1 - Создание и заполнение пустого объекта
let obj4 = {};
obj4['a'] = 1;
obj4['b'] = 2;
obj4['c'] = 3;
console.log(obj4);

console.log("=== НЕУПОРЯДОЧЕННОСТЬ ОБЪЕКТОВ В JAVASCRIPT ===");

// №1 - Демонстрация независимости от порядка ключей
let obj5 = {3: 'c', 1: 'a', 2: 'b'};
console.log(obj5[1]); // выведет 'a'
console.log(obj5[2]); // выведет 'b'
console.log(obj5[3]); // выведет 'c'

console.log("=== МАССИВ КЛЮЧЕЙ ОБЪЕКТА В JAVASCRIPT ===");

// №1 - Получение массива ключей объекта
let obj6 = {x: 1, y: 2, z: 3};
let keys = Object.keys(obj6);
console.log(keys);

console.log("=== ДЛИНА ОБЪЕКТА В JAVASCRIPT ===");

// №1 - Нахождение количества элементов объекта
let obj7 = {x: 1, y: 2, z: 3};
let length = Object.keys(obj7).length;
console.log(length);

console.log("=== КЛЮЧИ ОБЪЕКТОВ ИЗ ПЕРЕМЕННЫХ В JAVASCRIPT ===");

// №1 - Вывод элемента объекта по ключу из переменной
let obj8 = {x: 1, y: 2, z: 3};
let key = 'x';
console.log(obj8[key]);

console.log("=== ОШИБКА ОБРАЩЕНИЯ К ЭЛЕМЕНТУ ПО КЛЮЧУ В JAVASCRIPT ===");

// №1 - Исправление ошибки обращения к элементу
let obj9 = {x: 1, y: 2, z: 3};
console.log(obj9['x']); // Было: obj[x]

// №2 - Исправление ошибки обращения через переменную
let obj10 = {x: 1, y: 2, z: 3};
let key10 = 'x';
console.log(obj10[key10]); // Было: obj['key']

console.log("=== ОШИБКА ОБРАЩЕНИЯ К СВОЙСТВУ ОБЪЕКТА В JAVASCRIPT ===");

// №1 - Исправление ошибки обращения через свойство
let obj11 = {x: 1, y: 2, z: 3};
let prop11 = 'x';
console.log(obj11[prop11]); 

// №2 - Исправление ошибки обращения через строку
let obj12 = {x: 1, y: 2, z: 3};
let prop12 = 'x';
console.log(obj12[prop12]); 

console.log("=== ВЫЧИСЛЯЕМЫЕ СВОЙСТВА В JAVASCRIPT ===");

// №1 - Исправление ошибки в вычисляемом свойстве
let key13 = 'x';
let obj13 = {
    [key13]: 1,
    y: 2,
    z: 3
}; // Было: key: 1

// №2 - Создание объекта с ключами из переменных
let key1 = 'x';
let key2 = 'y';
let key3 = 'z';
let obj14 = {
    [key1]: 1,
    [key2]: 2,
    [key3]: 3
};
console.log(obj14);

console.log("=== ОПЕРАТОР IN В JAVASCRIPT ===");

// №1 - Проверка наличия свойств в объекте
let obj15 = {x: 1, y: 2, z: 3};
console.log('x' in obj15);
console.log('w' in obj15);

console.log("=== ОПЕРАТОР DELETE В JAVASCRIPT ===");

// №1 - Проверка наличия свойства после удаления
let obj16 = {x: 1, y: 2, z: 3};
delete obj16.x;
console.log('x' in obj16);

console.log("=== ТИПИЗАЦИЯ ОБЪЕКТОВ В JAVASCRIPT ===");

// №1 - Определение типа объекта
console.log(typeof {x: 1, y: 2, z: 3});
console.log("---------");
// №2 - Определение типа пустого объекта
console.log(typeof {});
console.log("---------");
// №3 - Определение типа переменной с объектом
let obj17 = {x: 1, y: 2, z: 3};
console.log(typeof obj17);
console.log("---------");
// №4 - Определение типа значения свойства объекта
let obj18 = {x: 1, y: 2, z: 3};
console.log(typeof obj18['x']);

console.log("=== МАССИВЫ КАК ОБЪЕКТЫ В JAVASCRIPT ===");

// №1 - Определение типа объекта с свойствами
console.log(typeof {x: 1, y: 2, z: 3});
console.log("---------");
// №2 - Определение типа массива
console.log(typeof [1, 2, 3]);
console.log("---------");
// №3 - Определение типа переменной с массивом
let arr1 = [1, 2, 3];
console.log(typeof arr1);
console.log("---------");
// №4 - Определение типа элемента массива (числа)
let arr2 = [1, 2, 3];
console.log(typeof arr2[0]);
console.log("---------");
// №5 - Определение типа элемента массива (строки)
let arr3 = ['1', '2', '3'];
console.log(typeof arr3[0]);

console.log("=== ОТЛИЧАЕМ МАССИВЫ ОТ ОБЪЕКТОВ В JAVASCRIPT ===");

// №1 - Проверка является ли массивом
console.log(Array.isArray([1, 2, 3]));

// №2 - Проверка является ли объект массивом
console.log(Array.isArray({x: 1, y: 2, z: 3}));

console.log("=== ПЕРЕДАЧА ОБЪЕКТОВ ПО ССЫЛКЕ В JAVASCRIPT ===");

// №1 - Изменение массива через другую переменную
let arr4 = [1, 2, 3];
let arr5 = arr4;
arr4[0] = '!';
console.log(arr5);

// №2 - Взаимное изменение массива через переменные
let arr6 = [1, 2, 3];
let arr7 = arr6;
arr6[0] = '!';
arr7[1] = '!';
console.log(arr6);

// №3 - Изменение одного элемента через разные переменные
let arr8 = [1, 2, 3];
let arr9 = arr8;
arr8[0] = '!';
arr9[0] = '!';
console.log(arr9);

console.log("=== ПОДХОД ПРОГРАММИРОВАНИЯ ЧЕРЕЗ КОНСТАНТЫ В JAVASCRIPT ===");

// №1 - Переписывание кода с использованием const
const arr10 = [1, 2, 3, 4, 5];
const res = arr10[1] + arr10[2];
console.log(res);

console.log("=== ПОИСК ОШИБОК В КОДЕ С ОБЪЕКТАМИ JAVASCRIPT ===");

// №1 - Исправление ошибки обращения к элементу
let obj19 = {x: 1, y: 2, z: 3};
console.log(obj19['x']); // Было: obj[x]

// №2 - Исправление ошибки обращения через свойство
let obj20 = {x: 1, y: 2, z: 3};
let key20 = 'x';
console.log(obj20[key20]); // Было: obj.key

// №3 - Исправление ошибки вычисления суммы
let obj21 = {x: 1, y: 2, z: 3};
let sum = obj21['x'] + obj21['y'] + obj21['z']; // Было: obj[x] + obj[y] + obj[x]
console.log(sum); // Было: console.log(obj)

// №4 - Исправление ошибки определения длины объекта
let obj22 = {x: 1, y: 2, z: 3};
console.log(Object.keys(obj22).length); 

console.log("=== КОНСТАНТЫ С МАССИВАМИ ИЛИ ОБЪЕКТАМИ В JAVASCRIPT ===");

// №1 - Изменение элемента массива-константы
const arr11 = ['a', 'b', 'c'];
arr11[1] = '!';
console.log(arr11);

// №2 - Попытка переопределения массива-константы
const arr12 = ['a', 'b', 'c'];
// arr12 = [1, 2, 3]; // Эта строка вызовет ошибку
console.log(arr12);

// №3 - Попытка переопределения массива-константы тем же значением
const arr13 = ['a', 'b', 'c'];
// arr13 = ['a', 'b', 'c']; // Эта строка вызовет ошибку
console.log(arr13);
