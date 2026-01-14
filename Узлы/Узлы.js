
"use strict";

console.log("=== РАБОТА С УЗЛАМИ В JAVASCRIPT ===");

// Создаем тестовый элемент для демонстрации
const testDiv = document.createElement('div');
testDiv.innerHTML = 'txt<b>tag</b><!--com-->txt<b>tag</b><!--com-->';

// Проверяем, что документ загружен
if (document.body) {
    document.body.appendChild(testDiv);
} else {
    document.addEventListener('DOMContentLoaded', function() {
        document.body.appendChild(testDiv);
        runNodeExamples();
    });
}

function runNodeExamples() {
    let elem = testDiv;

    // №1 - Разница между lastChild и lastElementChild
    console.log("№1 - lastChild:", elem.lastChild);
    console.log("№1 - lastElementChild:", elem.lastElementChild);
    console.log("-------------");

    // №2 - Разница между nextSibling и nextElementSibling
    let firstChild = elem.firstChild;
    console.log("№2 - nextSibling:", firstChild.nextSibling);
    console.log("№2 - nextElementSibling:", firstChild.nextElementSibling);
    console.log("-------------");

    // №3 - Разница между previousSibling и previousElementSibling
    let lastChild = elem.lastChild;
    console.log("№3 - previousSibling:", lastChild.previousSibling);
    console.log("№3 - previousElementSibling:", lastChild.previousElementSibling);
    console.log("-------------");

    console.log("=== ПЕРЕБОР УЗЛОВ ЦИКЛОМ В JAVASCRIPT ===");

    // №1 - Перебор всех узлов дива
    console.log("№1 - Все узлы дива:");
    for (let node of elem.childNodes) {
        console.log(node);
    }
    console.log("-------------");

    console.log("=== НАЗВАНИЕ УЗЛОВ В JAVASCRIPT ===");

    // №1 - Вывод названий узлов
    console.log("№1 - Названия узлов:");
    for (let node of elem.childNodes) {
        console.log(node.nodeName);
    }
    console.log("-------------");

    console.log("=== ТИП УЗЛОВ В JAVASCRIPT ===");

    // №1 - Вывод только узлов-элементов и текстовых узлов
    console.log("№1 - Узлы-элементы и текстовые узлы:");
    for (let node of elem.childNodes) {
        if (node.nodeType === 1 || node.nodeType === 3) {
            console.log(node);
        }
    }
    console.log("-------------");

    console.log("=== ТЕКСТ УЗЛОВ В JAVASCRIPT ===");

    // №1 - Тексты всех узлов
    console.log("№1 - Тексты всех узлов:");
    for (let node of elem.childNodes) {
        console.log(node.textContent || node.data);
    }
    console.log("-------------");

    // №2 - Тексты комментариев и текстовых узлов
    console.log("№2 - Тексты комментариев и текстовых узлов:");
    for (let node of elem.childNodes) {
        if (node.nodeType === 3 || node.nodeType === 8) {
            console.log(node.data);
        }
    }
    console.log("-------------");

    // №3 - Тексты текстовых узлов и элементов
    console.log("№3 - Тексты текстовых узлов и элементов:");
    for (let node of elem.childNodes) {
        if (node.nodeType === 1) {
            console.log(node.textContent);
        } else if (node.nodeType === 3) {
            console.log(node.data);
        }
    }
    console.log("-------------");

    // №4 - Запись типа узла в конец
    console.log("№4 - Узлы с их типами:");
    for (let node of elem.childNodes) {
        let type = '';
        switch(node.nodeType) {
            case 1: type = 'element'; break;
            case 3: type = 'text'; break;
            case 8: type = 'comment'; break;
            default: type = 'unknown';
        }
        console.log(node, `- ${type}`);
    }
    console.log("-------------");

    // Удаляем тестовый элемент
    if (document.body.contains(testDiv)) {
        document.body.removeChild(testDiv);
    }
}

// Если документ уже загружен, запускаем сразу
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runNodeExamples);
} else {
    runNodeExamples();
}
