"use strict";
// Функция для вычисления среднего арифметического
function average(...numbers) {
    if (numbers.length === 0) {
        return 0;
    }
    
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}

// Примеры использования
console.log("Пример 1:", average(1, 2, 3, 4, 5));        // 3
console.log("Пример 2:", average(10, 20, 30));           // 20
console.log("Пример 3:", average(5));                    // 5
console.log("Пример 4:", average());                     // 0
console.log("Пример 5:", average(1.5, 2.5, 3.5));        // 2.5
console.log("Пример 6:", average(-10, 0, 10));           // 0

// Практические примеры
const grades = [85, 92, 78, 96, 88];
console.log("Средний балл:", average(...grades));         // 87.8

const temperatures = [22, 25, 19, 30, 28];
console.log("Средняя температура:", average(...temperatures)); // 24.8

// Пример с большим количеством чисел
console.log("Среднее 10 чисел:", average(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)); // 5.5