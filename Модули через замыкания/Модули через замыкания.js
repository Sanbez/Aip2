"use strict";

// Функция для безопасного добавления элементов
function safeAppend(element) {
    if (document.body) {
        document.body.appendChild(element);
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            document.body.appendChild(element);
        });
    }
}

console.log("=== ПЕРЕДАЧА ПАРАМЕТРОВ В МОДУЛЬ ЧЕРЕЗ ЗАМЫКАНИЯ В JAVASCRIPT ===");

// №1 - Модуль для суммы чисел
(function(btnSelector, inputSelectors) {
    const btn = document.querySelector(btnSelector);
    const inputs = document.querySelectorAll(inputSelectors);
    
    if (btn && inputs.length > 0) {
        btn.addEventListener('click', function() {
            let sum = 0;
            for (let input of inputs) {
                sum += Number(input.value) || 0;
            }
            console.log("Сумма чисел:", sum);
        });
    }
})('#sum-btn', '.num-input');

// Создаем элементы для демонстрации
const moduleContainer = document.createElement('div');
moduleContainer.innerHTML = `
    <input type="number" class="num-input" placeholder="Число 1">
    <input type="number" class="num-input" placeholder="Число 2">
    <input type="number" class="num-input" placeholder="Число 3">
    <button id="sum-btn">Вывести сумму в консоль</button>
`;
safeAppend(moduleContainer);
console.log("№1 - Модуль для суммы чисел создан");
console.log("-------------");

console.log("=== ЭКСПОРТ ПЕРЕМЕННЫХ И ФУНКЦИЙ В МОДУЛЯХ ЧЕРЕЗ ЗАМЫКАНИЯ В JAVASCRIPT ===");

// №1 - Экспорт переменных и функций
(function() {
    let str1 = "переменная модуля 1";
    let str2 = "переменная модуля 2";
    let str3 = "переменная модуля 3";
    
    function func1() {
        console.log("функция модуля 1");
    }
    
    function func2() {
        console.log("функция модуля 2");
    }
    
    function func3() {
        console.log("функция модуля 3");
    }
    
    // Экспортируем наружу
    window.exportedStr = str1;
    window.exportedFunc1 = func1;
    window.exportedFunc2 = func2;
})();

// Проверяем экспорт
if (typeof exportedFunc1 === 'function') {
    exportedFunc1();
}
if (typeof exportedFunc2 === 'function') {
    exportedFunc2();
}
console.log("№1 - Экспорт переменных и функций выполнен");
console.log("-------------");

console.log("=== ЭКСПОРТ ОБЪЕКТА В МОДУЛЯХ ЧЕРЕЗ ЗАМЫКАНИЯ В JAVASCRIPT ===");

// №1 - Экспорт объекта с функциями и переменными
(function() {
    let str1 = 'module variable 1';
    let str2 = 'module variable 2';
    let str3 = 'module variable 3';
    
    function func1() {
        console.log('module function 1');
    }
    
    function func2() {
        console.log('module function 2');
    }
    
    function func3() {
        console.log('module function 3');
    }
    
    function func4() {
        console.log('module function 4');
    }
    
    function func5() {
        console.log('module function 5');
    }
    
    // Экспортируем объект
    window.myModule = {
        str1,
        str2,
        func1,
        func2,
        func3,
        func4,
        func5
    };
})();

// Проверяем экспорт
if (window.myModule) {
    console.log("Переменная str1:", myModule.str1);
    myModule.func1();
    myModule.func2();
}
console.log("№1 - Экспорт объекта выполнен");
console.log("-------------");

console.log("=== БИБЛИОТЕКИ ЧЕРЕЗ ЗАМЫКАНИЯ В JAVASCRIPT ===");

// №1 - Модуль математических функций
(function() {
    // Вспомогательная функция (не экспортируется)
    function sum(arr, pow) {
        let res = 0;
        for (let elem of arr) {
            res += elem ** pow;
        }
        return res;
    }
    
    // Экспортируемые функции
    function avg1(arr) {
        return sum(arr, 1) / arr.length;
    }
    
    function avg2(arr) {
        return sum(arr, 2) / arr.length;
    }
    
    function avg3(arr) {
        return sum(arr, 3) / arr.length;
    }
    
    // Экспортируем наружу
    window.mathLib = {
        avg1,
        avg2,
        avg3
    };
})();

// Проверяем работу библиотеки
if (window.mathLib) {
    const testArr = [1, 2, 3, 4, 5];
    console.log("avg1:", mathLib.avg1(testArr));
    console.log("avg2:", mathLib.avg2(testArr));
    console.log("avg3:", mathLib.avg3(testArr));
}
console.log("№1 - Математическая библиотека создана");
console.log("-------------");

// №2 - Упрощенная версия библиотеки underscore
(function() {
    const _ = {};
    
    // Функция each (аналог _.each)
    _.each = function(collection, iterator) {
        if (Array.isArray(collection)) {
            for (let i = 0; i < collection.length; i++) {
                iterator(collection[i], i, collection);
            }
        } else if (typeof collection === 'object') {
            for (let key in collection) {
                if (collection.hasOwnProperty(key)) {
                    iterator(collection[key], key, collection);
                }
            }
        }
    };
    
    // Функция map (аналог _.map)
    _.map = function(collection, iterator) {
        const result = [];
        _.each(collection, function(value, key, coll) {
            result.push(iterator(value, key, coll));
        });
        return result;
    };
    
    // Функция filter (аналог _.filter)
    _.filter = function(collection, predicate) {
        const result = [];
        _.each(collection, function(value, key, coll) {
            if (predicate(value, key, coll)) {
                result.push(value);
            }
        });
        return result;
    };
    
    // Функция find (аналог _.find)
    _.find = function(collection, predicate) {
        let result;
        _.each(collection, function(value, key, coll) {
            if (predicate(value, key, coll) && result === undefined) {
                result = value;
            }
        });
        return result;
    };
    
    // Функция reduce (аналог _.reduce)
    _.reduce = function(collection, iterator, accumulator) {
        let result = accumulator;
        _.each(collection, function(value, key, coll) {
            result = iterator(result, value, key, coll);
        });
        return result;
    };
    
    // Функция contains (аналог _.contains)
    _.contains = function(collection, target) {
        return _.reduce(collection, function(found, value) {
            return found || value === target;
        }, false);
    };
    
    // Функция pluck (аналог _.pluck)
    _.pluck = function(collection, key) {
        return _.map(collection, function(item) {
            return item[key];
        });
    };
    
    // Функция without (аналог _.without)
    _.without = function(array, ...values) {
        return _.filter(array, function(item) {
            return !_.contains(values, item);
        });
    };
    
    // Функция range (аналог _.range)
    _.range = function(start, stop, step = 1) {
        const result = [];
        if (stop === undefined) {
            stop = start;
            start = 0;
        }
        for (let i = start; i < stop; i += step) {
            result.push(i);
        }
        return result;
    };
    
    // Экспортируем библиотеку
    window._ = _;
})();

// Проверяем работу библиотеки
if (window._) {
    const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const testObjects = [
        {name: 'Alice', age: 25},
        {name: 'Bob', age: 30},
        {name: 'Charlie', age: 35}
    ];
    
    console.log("Исходный массив:", testArray);
    console.log("map (умножение на 2):", _.map(testArray, x => x * 2));
    console.log("filter (четные числа):", _.filter(testArray, x => x % 2 === 0));
    console.log("find (первое число > 5):", _.find(testArray, x => x > 5));
    console.log("reduce (сумма):", _.reduce(testArray, (sum, x) => sum + x, 0));
    console.log("contains (число 5):", _.contains(testArray, 5));
    console.log("without (без 3, 5, 7):", _.without(testArray, 3, 5, 7));
    console.log("range (0-9):", _.range(10));
    console.log("pluck (имена):", _.pluck(testObjects, 'name'));
}
console.log("№2 - Библиотека underscore создана");
console.log("-------------");

// Если документ уже загружен, добавляем элементы сразу
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOM загружен, все модули инициализированы");
    });
} else {
    console.log("DOM уже загружен, все модули инициализированы");
}
