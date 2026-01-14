// Задание 1: Добавить/убрать ширину, высоту и границу
document.getElementById('button1').addEventListener('click', function() {
    const elem = document.getElementById('elem1');
    
    if (elem.style.width) {
        // Если стили уже применены - убираем их
        elem.style.width = '';
        elem.style.height = '';
        elem.style.border = '';
        elem.textContent = 'Этот див';
    } else {
        // Если стилей нет - применяем их
        elem.style.width = '300px';
        elem.style.height = '100px';
        elem.style.border = '2px solid blue';
        elem.textContent = 'Див с шириной 300px, высотой 100px и синей границей';
    }
});

// Задание 2: Добавить/убрать размер шрифта, границу и фон
document.getElementById('button2').addEventListener('click', function() {
    const elem = document.getElementById('elem2');
    
    if (elem.style.fontSize) {
        // Убираем стили
        elem.style.fontSize = '';
        elem.style.borderTop = '';
        elem.style.backgroundColor = '';
        elem.textContent = 'Текст дива';
    } else {
        // Применяем стили
        elem.style.fontSize = '20px';
        elem.style.borderTop = '3px solid red';
        elem.style.backgroundColor = 'yellow';
        elem.textContent = 'Текст с размером 20px, верхней границей и желтым фоном';
    }
});

// Задание 3: Добавить/убрать float для списка
document.getElementById('button3').addEventListener('click', function() {
    const listItems = document.querySelectorAll('#list3 li');
    const firstItem = listItems[0];
    
    if (firstItem.style.cssFloat === 'left') {
        // Убираем float
        listItems.forEach(item => {
            item.style.cssFloat = '';
            item.style.marginRight = '';
            item.style.backgroundColor = '';
            item.style.color = '';
            item.style.padding = '';
        });
    } else {
        // Применяем float
        listItems.forEach(item => {
            item.style.cssFloat = 'left';
            item.style.marginRight = '10px';
            item.style.backgroundColor = '#007bff';
            item.style.color = 'white';
            item.style.padding = '10px';
        });
    }
});

// Задание 5: Изменение стилей абзаца (с переключением)
document.getElementById('button5-1').addEventListener('click', function() {
    const text = document.getElementById('text5');
    if (text.style.textDecoration === 'line-through') {
        text.style.textDecoration = 'none';
    } else {
        text.style.textDecoration = 'line-through';
    }
});

document.getElementById('button5-2').addEventListener('click', function() {
    const text = document.getElementById('text5');
    if (text.style.fontWeight === 'bold') {
        text.style.fontWeight = 'normal';
    } else {
        text.style.fontWeight = 'bold';
    }
});

document.getElementById('button5-3').addEventListener('click', function() {
    const text = document.getElementById('text5');
    if (text.style.color === 'red') {
        text.style.color = 'black';
    } else {
        text.style.color = 'red';
    }
});

document.getElementById('button6-1').addEventListener('click', function() {
    const text = document.getElementById('text6');
    text.classList.toggle('line-through');
});

document.getElementById('button6-2').addEventListener('click', function() {
    const text = document.getElementById('text6');
    text.classList.toggle('bold');
});

document.getElementById('button6-3').addEventListener('click', function() {
    const text = document.getElementById('text6');
    text.classList.toggle('red');
});
