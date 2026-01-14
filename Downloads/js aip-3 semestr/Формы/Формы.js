function safeAppend(element) {
    if (document.body) {
        document.body.appendChild(element);
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            document.body.appendChild(element);
        });
    }
}

console.log("=== РАБОТА С TEXTAREA В JAVASCRIPT ===");

// №1 - Текст textarea в абзац при потере фокуса
const textarea1 = document.createElement('textarea');
const paragraph1 = document.createElement('p');
paragraph1.textContent = 'Текст появится здесь...';
safeAppend(textarea1);
safeAppend(paragraph1);

textarea1.addEventListener('blur', function() {
    paragraph1.textContent = this.value;
});
console.log("№1 - Textarea и абзац созданы");
console.log("-------------");

console.log("=== АТРИБУТ DISABLED В JAVASCRIPT ===");

// №1 - Блокировка инпута по кнопке
const input1 = document.createElement('input');
const button1 = document.createElement('button');
button1.textContent = 'Заблокировать';
safeAppend(input1);
safeAppend(button1);

button1.addEventListener('click', function() {
    input1.disabled = true;
});
console.log("№1 - Кнопка блокировки создана");
console.log("-------------");

// №2 - Блокировка и разблокировка инпута
const input2 = document.createElement('input');
const button2a = document.createElement('button');
const button2b = document.createElement('button');
button2a.textContent = 'Заблокировать';
button2b.textContent = 'Разблокировать';
safeAppend(input2);
safeAppend(button2a);
safeAppend(button2b);

button2a.addEventListener('click', function() {
    input2.disabled = true;
});
button2b.addEventListener('click', function() {
    input2.disabled = false;
});
console.log("№2 - Кнопки блокировки/разблокировки созданы");
console.log("-------------");

// №3 - Проверка состояния инпута
const input3 = document.createElement('input');
const button3 = document.createElement('button');
button3.textContent = 'Проверить состояние';
safeAppend(input3);
safeAppend(button3);

button3.addEventListener('click', function() {
    console.log("№3 - Инпут заблокирован:", input3.disabled);
});
console.log("№3 - Кнопка проверки состояния создана");
console.log("-------------");

console.log("=== РАБОТА С ЧЕКБОКСАМИ В JAVASCRIPT ===");

// №1 - Установка состояния чекбокса
const checkbox1 = document.createElement('input');
checkbox1.type = 'checkbox';
const button1a = document.createElement('button');
const button1b = document.createElement('button');
button1a.textContent = 'Отметить';
button1b.textContent = 'Снять отметку';
safeAppend(checkbox1);
safeAppend(button1a);
safeAppend(button1b);

button1a.addEventListener('click', function() {
    checkbox1.checked = true;
});
button1b.addEventListener('click', function() {
    checkbox1.checked = false;
});
console.log("№1 - Чекбокс и кнопки созданы");
console.log("-------------");

// №2 - Вывод состояния чекбокса
const checkbox2 = document.createElement('input');
checkbox2.type = 'checkbox';
const button2 = document.createElement('button');
const paragraph2 = document.createElement('p');
button2.textContent = 'Проверить';
paragraph2.textContent = 'Результат...';
safeAppend(checkbox2);
safeAppend(button2);
safeAppend(paragraph2);

button2.addEventListener('click', function() {
    paragraph2.textContent = checkbox2.checked ? 'привет' : 'пока';
});
console.log("№2 - Чекбокс с выводом создан");
console.log("-------------");

console.log("=== ЧЕРЕДОВАНИЕ АТРИБУТОВ БЕЗ ЗНАЧЕНИЙ ===");

// №1 - Объяснение кода
console.log("№1 - Код elem.disabled = !elem.disabled инвертирует текущее состояние disabled");
console.log("-------------");

// №2 - Смена состояния чекбокса
const checkbox3 = document.createElement('input');
checkbox3.type = 'checkbox';
const button3a = document.createElement('button');
button3a.textContent = 'Переключить';
safeAppend(checkbox3);
safeAppend(button3a);

button3a.addEventListener('click', function() {
    checkbox3.checked = !checkbox3.checked;
});
console.log("№2 - Чекбокс с переключением создан");
console.log("-------------");

console.log("=== РАБОТА С РАДИОКНОПКАМИ В JAVASCRIPT ===");

// №1 - Получение value выбранной радиокнопки
const radio1 = document.createElement('input');
radio1.type = 'radio';
radio1.name = 'group1';
radio1.value = '1';
const radio2 = document.createElement('input');
radio2.type = 'radio';
radio2.name = 'group1';
radio2.value = '2';
const radio3 = document.createElement('input');
radio3.type = 'radio';
radio3.name = 'group1';
radio3.value = '3';
const paragraph3 = document.createElement('p');
const button4 = document.createElement('button');
button4.textContent = 'Получить значение';
paragraph3.textContent = 'Значение...';
safeAppend(radio1);
safeAppend(radio2);
safeAppend(radio3);
safeAppend(button4);
safeAppend(paragraph3);

button4.addEventListener('click', function() {
    const radios = document.querySelectorAll('input[name="group1"]');
    for (let radio of radios) {
        if (radio.checked) {
            paragraph3.textContent = radio.value;
            break;
        }
    }
});
console.log("№1 - Радиокнопки созданы");
console.log("-------------");

console.log("=== СОБЫТИЕ CHANGE В JAVASCRIPT ===");

// №1 - Вывод текста инпута в абзац при изменении
const input4 = document.createElement('input');
const paragraph4 = document.createElement('p');
paragraph4.textContent = 'Текст...';
safeAppend(input4);
safeAppend(paragraph4);

input4.addEventListener('change', function() {
    paragraph4.textContent = this.value;
});
console.log("№1 - Инпут с change создан");
console.log("-------------");

// №2 - Вывод состояния чекбокса при изменении
const checkbox4 = document.createElement('input');
checkbox4.type = 'checkbox';
safeAppend(checkbox4);

checkbox4.addEventListener('change', function() {
    console.log("№2 - Состояние чекбокса:", this.checked);
});
console.log("№2 - Чекбокс с change создан");
console.log("-------------");

// №3 - Разница между blur и change
console.log("№3 - blur возникает при потере фокуса, change - при изменении значения");
console.log("-------------");

// №4 - Проверка длины текста в инпуте
const input5 = document.createElement('input');
input5.style.border = '2px solid black';
safeAppend(input5);

input5.addEventListener('change', function() {
    if (this.value.length < 5) {
        this.style.borderColor = 'green';
    } else {
        this.style.borderColor = 'red';
    }
});
console.log("№4 - Инпут с проверкой длины создан");
console.log("-------------");

console.log("=== СОБЫТИЕ INPUT В JAVASCRIPT ===");

// №1 - Сообщение при достижении 5 символов
const input6 = document.createElement('input');
safeAppend(input6);

input6.addEventListener('input', function() {
    if (this.value.length === 5) {
        console.log("№1 - Достигнуто 5 символов!");
    }
});
console.log("№1 - Инпут с проверкой на 5 символов создан");
console.log("-------------");

// №2 - Отслеживание количества символов
const input7 = document.createElement('input');
const paragraph5 = document.createElement('p');
paragraph5.textContent = 'Можно ввести 5 символов';
safeAppend(input7);
safeAppend(paragraph5);

input7.addEventListener('input', function() {
    const length = this.value.length;
    if (length <= 5) {
        paragraph5.textContent = `Можно ввести еще ${5 - length} символов`;
    } else {
        paragraph5.textContent = `Превышено на ${length - 5} символов`;
    }
});
console.log("№2 - Инпут с отслеживанием символов создан");
console.log("-------------");

console.log("=== МЕТОДЫ FOCUS И BLUR В JAVASCRIPT ===");

// №1 - Переход фокуса между инпутами
const input8 = document.createElement('input');
const input9 = document.createElement('input');
safeAppend(input8);
safeAppend(input9);

input8.addEventListener('input', function() {
    if (this.value.length === 2) {
        input9.focus();
    }
});

input9.addEventListener('input', function() {
    if (this.value.length === 2) {
        this.blur();
    }
});
console.log("№1 - Инпуты с переходом фокуса созданы");
console.log("-------------");

console.log("=== ПОИСК ОШИБОК В КОДЕ С ФОРМАМИ ===");

// №1 - Исправление ошибки с textarea
const textarea2 = document.createElement('textarea');
const div1 = document.createElement('div');
safeAppend(textarea2);
safeAppend(div1);

textarea2.addEventListener('blur', function() {
    div1.textContent = this.value;
});
console.log("№1 - Ошибка исправлена: используем this.value вместо textarea.textContent");
console.log("-------------");

// №2 - Исправление ошибки с чекбоксом
const checkbox5 = document.createElement('input');
checkbox5.type = 'checkbox';
const div2 = document.createElement('div');
const button5 = document.createElement('button');
button5.textContent = 'Проверить';
safeAppend(checkbox5);
safeAppend(button5);
safeAppend(div2);

button5.addEventListener('click', function() {
    if (checkbox5.checked) {
        div2.textContent = '111';
    } else {
        div2.textContent = '222';
    }
});
console.log("№2 - Ошибки исправлены: правильные селекторы и textContent вместо value");
console.log("-------------");

// Если документ уже загружен, добавляем элементы сразу
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOM загружен, элементы добавлены");
    });
} else {
    console.log("DOM уже загружен, элементы добавлены");
}
