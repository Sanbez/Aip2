"use strict";

// Для имитации select — храним массив options и selectedIndex
class Select {
    constructor(options = []) {
        this.options = options.map((text, i) => ({
            textContent: text,
            value: text,
            selected: i === 0
        }));
        this.selectedIndex = 0;
    }

    addOption(text, value = text) {
        this.options.push({ textContent: text, value, selected: false });
    }

    get value() {
        return this.options[this.selectedIndex].value;
    }

    select(index) {
        if (index >= 0 && index < this.options.length) {
            this.selectedIndex = index;
            this.options.forEach((o, i) => o.selected = i === index);
        }
    }

    get selectedOption() {
        return this.options[this.selectedIndex];
    }
}

console.log("=== Демонстрация работы выпадающих списков в Node.js ===");

// ----------------------------
// №1 Вывод текста выбранного пункта
// ----------------------------
const select1 = new Select(['один', 'два', 'три']);
console.log("№1 выбранный пункт:", select1.value);
select1.select(1);
console.log("→ после выбора:", select1.value);

console.log("-------------");

// ----------------------------
// №2 — Проверка года на високосность
// ----------------------------
function isLeap(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

const select2 = new Select(
    Array.from({ length: 11 }, (_, i) => (2020 + i).toString())
);

select2.select(0);
let year = parseInt(select2.value);
console.log(`Год ${year} — ${isLeap(year) ? 'високосный' : 'не високосный'}`);

select2.select(3);
year = parseInt(select2.value);
console.log(`Год ${year} — ${isLeap(year) ? 'високосный' : 'не високосный'}`);

console.log("-------------");

// ----------------------------
// Дни недели + рабочий/выходной
// ----------------------------
const days = ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'];
const select3 = new Select(days.map((d, i) => d));

select3.select(0);
console.log(`${select3.selectedOption.textContent}: рабочий`);

select3.select(6);
console.log(`${select3.selectedOption.textContent}: выходной`);

console.log("-------------");

// ----------------------------
// Текущий месяц по умолчанию
// ----------------------------
const months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
const select4 = new Select(months);
select4.select(new Date().getMonth());
console.log("Текущий месяц:", select4.selectedOption.textContent);

console.log("-------------");

// ----------------------------
// Выбор пункта по номеру (имитация input)
// ----------------------------
const select5 = new Select(['Пункт 1','Пункт 2','Пункт 3','Пункт 4','Пункт 5']);
let indexInput = 3;
select5.select(indexInput - 1);
console.log("Выбран пункт:", select5.selectedOption.textContent);

console.log("-------------");

// ----------------------------
// Текущий день недели по умолчанию
// ----------------------------
const weekDays = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
const select6 = new Select(weekDays);
select6.select(new Date().getDay());
console.log("Сегодня:", select6.selectedOption.textContent);

console.log("-------------");

// ----------------------------
// Добавить value в текст
// ----------------------------
const select7 = new Select([]);

for (let i = 1; i <= 3; i++) {
    select7.addOption(`Пункт ${i}`, `value${i}`);
}

console.log("До добавления:");
console.log(select7.options.map(o => o.textContent));

for (let option of select7.options) {
    option.textContent = `${option.textContent} (${option.value})`;
}

console.log("После добавления:");
console.log(select7.options.map(o => o.textContent));

console.log("-------------");

// ----------------------------
// Добавление знаков к выбранным/невыбранным
// ----------------------------
const select8 = new Select(['Элемент 1','Элемент 2','Элемент 3','Элемент 4']);

select8.select(2);

for (let option of select8.options) {
    option.textContent += option.selected ? "!" : "?";
}

console.log("После изменения:", select8.options.map(o => o.textContent));

console.log("-------------");

// ----------------------------
// Выбор последнего пункта
// ----------------------------
const select9 = new Select(['Вариант 1','Вариант 2','Вариант 3','Вариант 4','Вариант 5']);
select9.select(select9.options.length - 1);
console.log("Последний выбран:", select9.selectedOption.textContent);

console.log("-------------");

// ----------------------------
// Получение выбранного option
// ----------------------------
const select10 = new Select(['Элемент 1','Элемент 2','Элемент 3']);
select10.select(1);
console.log("Выбран текст:", select10.selectedOption.textContent);

console.log("-------------");

// ----------------------------
// Добавление ! к выбранному
// ----------------------------
const select11 = new Select(['Пункт 1','Пункт 2','Пункт 3']);
select11.select(0);
select11.selectedOption.textContent += "!";
console.log("Изменённый вариант:", select11.selectedOption.textContent);

console.log("-------------");

console.log("=== Готово. Версия для Node.js выполнена. ===");
