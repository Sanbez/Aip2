
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

console.log("=== СОЗДАНИЕ И ВСТАВКА ЭЛЕМЕНТОВ НА JAVASCRIPT ===");

// №1 - Вставка li в конец ol
const ol1 = document.createElement('ol');
ol1.id = 'elem1';
safeAppend(ol1);

const li1 = document.createElement('li');
li1.textContent = 'item';
ol1.appendChild(li1);
console.log("№1 - Li вставлен в конец ol");
console.log("-------------");

// №2 - Добавление li по клику на кнопку
const ol2 = document.createElement('ol');
ol2.id = 'elem2';
const button1 = document.createElement('button');
button1.textContent = 'click me';
button1.id = 'button1';
safeAppend(ol2);
safeAppend(button1);

button1.addEventListener('click', function() {
    const li = document.createElement('li');
    li.textContent = 'item';
    ol2.appendChild(li);
});
console.log("№2 - Кнопка для добавления li создана");
console.log("-------------");

console.log("=== ПРИВЯЗЫВАНИЕ СОБЫТИЙ ПРИ ВСТАВКЕ ЭЛЕМЕНТОВ ===");

// №1 - Добавление li с обработчиком
const ol3 = document.createElement('ol');
ol3.id = 'elem3';
const button2 = document.createElement('button');
button2.textContent = 'Добавить li';
safeAppend(ol3);
safeAppend(button2);

button2.addEventListener('click', function() {
    const li = document.createElement('li');
    li.textContent = 'элемент';
    
    li.addEventListener('click', function() {
        this.textContent += '!';
    });
    
    ol3.appendChild(li);
});
console.log("№1 - Кнопка для добавления li с обработчиком создана");
console.log("-------------");

console.log("=== СОЗДАНИЕ ЭЛЕМЕНТОВ В ЦИКЛЕ НА JAVASCRIPT ===");

// №1 - 10 li с порядковыми номерами
const ul1 = document.createElement('ul');
ul1.id = 'elem4';
safeAppend(ul1);

for (let i = 1; i <= 10; i++) {
    const li = document.createElement('li');
    li.textContent = i;
    ul1.appendChild(li);
}
console.log("№1 - 10 li с порядковыми номерами созданы");
console.log("-------------");

console.log("=== НАВЕШИВАНИЕ ОБРАБОТЧИКОВ В ЦИКЛЕ НА JAVASCRIPT ===");

// №1 - 5 инпутов с обработчиками
const div1 = document.createElement('div');
div1.id = 'parent1';
const paragraph1 = document.createElement('p');
paragraph1.textContent = 'Текст появится здесь...';
safeAppend(div1);
safeAppend(paragraph1);

for (let i = 1; i <= 5; i++) {
    const input = document.createElement('input');
    input.placeholder = `Инпут ${i}`;
    
    input.addEventListener('blur', function() {
        paragraph1.textContent = this.value;
    });
    
    div1.appendChild(input);
}
console.log("№1 - 5 инпутов с обработчиками созданы");
console.log("-------------");

console.log("=== УДАЛЕНИЕ ЭЛЕМЕНТОВ НА JAVASCRIPT ===");

// №1 - Удаление li по клику
const ul2 = document.createElement('ul');
ul2.id = 'elem5';
for (let i = 1; i <= 3; i++) {
    const li = document.createElement('li');
    li.textContent = i;
    ul2.appendChild(li);
}
safeAppend(ul2);

const lis = ul2.querySelectorAll('li');
for (let li of lis) {
    li.addEventListener('click', function() {
        this.remove();
    });
}
console.log("№1 - Li удаляются по клику");
console.log("-------------");

// №2 - Удаление последнего элемента по кнопке
const ul3 = document.createElement('ul');
ul3.id = 'parent2';
const button3 = document.createElement('button');
button3.textContent = 'Удалить последний';
button3.id = 'button2';

for (let i = 1; i <= 3; i++) {
    const li = document.createElement('li');
    li.textContent = i;
    ul3.appendChild(li);
}

safeAppend(ul3);
safeAppend(button3);

button3.addEventListener('click', function() {
    const lastLi = ul3.lastElementChild;
    if (lastLi) {
        lastLi.remove();
    }
});
console.log("№2 - Кнопка для удаления последнего элемента создана");
console.log("-------------");

console.log("=== ВСТАВКА ЭЛЕМЕНТОВ В НАЧАЛО ИЛИ В КОНЕЦ НА JAVASCRIPT ===");

// №1 - Вставка в начало и конец
const ul4 = document.createElement('ul');
ul4.id = 'elem6';
for (let i = 1; i <= 5; i++) {
    const li = document.createElement('li');
    li.textContent = 'text';
    ul4.appendChild(li);
}
safeAppend(ul4);

const startLi = document.createElement('li');
startLi.textContent = 'start';
ul4.prepend(startLi);

const finishLi = document.createElement('li');
finishLi.textContent = 'finish';
ul4.append(finishLi);
console.log("№1 - Элементы вставлены в начало и конец");
console.log("-------------");

console.log("=== ВСТАВКА ЭЛЕМЕНТОВ ПЕРЕД ЭЛЕМЕНТАМИ НА JAVASCRIPT ===");

// №1-2 - Вставка перед элементом с обработчиком
const ul5 = document.createElement('ul');
ul5.id = 'parent3';
for (let i = 1; i <= 5; i++) {
    const li = document.createElement('li');
    li.textContent = 'text';
    if (i === 3) {
        li.id = 'elem7';
    }
    ul5.appendChild(li);
}
safeAppend(ul5);

const targetLi = document.querySelector('#elem7');
if (targetLi) {
    const newLi = document.createElement('li');
    newLi.textContent = 'new';
    
    newLi.addEventListener('click', function() {
        this.textContent += '!';
    });
    
    targetLi.parentNode.insertBefore(newLi, targetLi);
}
console.log("№1-2 - Элемент вставлен перед целевым с обработчиком");
console.log("-------------");

console.log("=== СМЕЖНАЯ ВСТАВКА ЭЛЕМЕНТОВ НА JAVASCRIPT ===");

// №1 - Вставка перед элементом
const div2 = document.createElement('div');
div2.id = 'elem8';
div2.style.border = '1px solid red';
for (let i = 1; i <= 3; i++) {
    const p = document.createElement('p');
    p.textContent = 'text';
    div2.appendChild(p);
}
safeAppend(div2);

const pBefore = document.createElement('p');
pBefore.textContent = '!!';
div2.insertAdjacentElement('beforebegin', pBefore);
console.log("№1 - Элемент вставлен перед div");
console.log("-------------");

// №2 - Вставка после элемента
const pAfter = document.createElement('p');
pAfter.textContent = '!!';
div2.insertAdjacentElement('afterend', pAfter);
console.log("№2 - Элемент вставлен после div");
console.log("-------------");

// №3 - Вставка в начало элемента
const pStart = document.createElement('p');
pStart.textContent = '!!';
div2.insertAdjacentElement('afterbegin', pStart);
console.log("№3 - Элемент вставлен в начало div");
console.log("-------------");

console.log("=== СМЕЖНАЯ ВСТАВКА ТЕГОВ НА JAVASCRIPT ===");

// №1 - Вставка HTML перед элементом
const div3 = document.createElement('div');
div3.id = 'elem9';
div3.style.border = '1px solid red';
for (let i = 1; i <= 3; i++) {
    const p = document.createElement('p');
    p.textContent = 'text';
    div3.appendChild(p);
}
safeAppend(div3);

const htmlToInsert = '<div class="www"><p>text</p><p>text</p><input></div>';
div3.insertAdjacentHTML('beforebegin', htmlToInsert);
console.log("№1 - HTML вставлен перед элементом");
console.log("-------------");

console.log("=== КЛОНИРОВАНИЕ ЭЛЕМЕНТОВ НА JAVASCRIPT ===");

// №1 - Клонирование инпута
const inputOriginal = document.createElement('input');
inputOriginal.placeholder = 'Оригинальный инпут';
const button4 = document.createElement('button');
button4.textContent = 'Клонировать инпут';
safeAppend(inputOriginal);
safeAppend(button4);

button4.addEventListener('click', function() {
    const clone = inputOriginal.cloneNode(true);
    document.body.appendChild(clone);
});
console.log("№1 - Кнопка для клонирования инпута создана");
console.log("-------------");

console.log("=== ПРОВЕРКА ЭЛЕМЕНТОВ В JAVASCRIPT ===");

// №1 - Проверка класса
const div4 = document.createElement('div');
div4.id = 'elem10';
div4.className = 'www';
safeAppend(div4);

const hasClass = div4.matches('.www');
console.log("№1 - Элемент имеет класс www:", hasClass);
console.log("-------------");

// №2 - Проверка тега
const p1 = document.createElement('p');
p1.textContent = 'Абзац';
safeAppend(p1);

const isParagraph = p1.matches('p');
console.log("№2 - Элемент является абзацем:", isParagraph);
console.log("-------------");

// №3 - Проверка потомка
const div5 = document.createElement('div');
div5.id = 'elem11';
const p2 = document.createElement('p');
p2.id = 'elem12';
p2.textContent = 'Абзац внутри div';
div5.appendChild(p2);
safeAppend(div5);

const elem1 = document.querySelector('#elem11');
const elem2 = document.querySelector('#elem12');
const isChild = elem1.contains(elem2);
console.log("№3 - Элемент является потомком:", isChild);
console.log("-------------");

// Если документ уже загружен, добавляем элементы сразу
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOM загружен, все элементы добавлены");
    });
} else {
    console.log("DOM уже загружен, все элементы добавлены");
}
