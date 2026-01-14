
document.getElementById('buttonSearch1').addEventListener('click', function() {
    const elem = document.querySelector('#elem1');
    const firstChild = elem.firstElementChild;
    firstChild.style.color = 'red';
});

document.getElementById('buttonSearch2').addEventListener('click', function() {
    const elem = document.querySelector('#elem2');
    const lastChild = elem.lastElementChild;
    lastChild.style.color = 'red';
});

document.getElementById('buttonSearch3').addEventListener('click', function() {
    const elem = document.querySelector('#elem3');
    const children = elem.children;
    
    for (let child of children) {
        child.textContent += '!';
    }
});

document.getElementById('buttonSearch4').addEventListener('click', function() {
    const elem = document.querySelector('#elem4');
    const parent = elem.parentElement;
    parent.style.border = '2px solid red';
});

document.getElementById('buttonSearch5').addEventListener('click', function() {
    const elem = document.querySelector('#elem5');
    const closestDiv = elem.closest('div');
    document.getElementById('result5').textContent = `Найден ближайший div: ${closestDiv ? 'да' : 'нет'}`;
});

document.getElementById('buttonSearch6').addEventListener('click', function() {
    const elem = document.querySelector('#elem6');
    const closestWww = elem.closest('.www');
    document.getElementById('result6').textContent = `Найден ближайший .www: ${closestWww ? 'да' : 'нет'}`;
});

document.getElementById('buttonSearch7').addEventListener('click', function() {
    const elem = document.querySelector('#elem7');
    const prevSibling = elem.previousElementSibling;
    if (prevSibling) {
        prevSibling.textContent += '!';
    }
});

document.getElementById('buttonSearch8').addEventListener('click', function() {
    const elem = document.querySelector('#elem8');
    const nextSibling = elem.nextElementSibling;
    if (nextSibling) {
        nextSibling.textContent += '!';
    }
});

document.getElementById('buttonSearch9').addEventListener('click', function() {
    const elem = document.querySelector('#elem9');
    const nextNextSibling = elem.nextElementSibling?.nextElementSibling;
    if (nextNextSibling) {
        nextNextSibling.textContent += '!';
    }
});

document.getElementById('buttonSearch10').addEventListener('click', function() {
    const elem = document.querySelector('#elem10');
    const prevSibling = elem.previousElementSibling;
    const nextSibling = elem.nextElementSibling;
    
    if (prevSibling && nextSibling) {
        const tempText = prevSibling.textContent;
        prevSibling.textContent = nextSibling.textContent;
        nextSibling.textContent = tempText;
    }
});

document.getElementById('buttonSearch11').addEventListener('click', function() {
    const elem = document.getElementById('elem11');
    elem.textContent = 'Текст установлен через getElementById!';
});

document.getElementById('buttonSearch12').addEventListener('click', function() {
    const lis = document.getElementsByTagName('li');
    
    for (let li of lis) {
        li.style.color = 'red';
    }
});

document.getElementById('buttonSearch13').addEventListener('click', function() {
    const elems = document.getElementsByClassName('www');
    
    for (let elem of elems) {
        elem.style.color = 'red';
    }
});

document.getElementById('buttonSearch14').addEventListener('click', function() {
    const parent = document.querySelector('#parent14');
    const elems1 = parent.querySelectorAll('.www');
    const elems2 = parent.querySelectorAll('.ggg');
    
    document.getElementById('result14').textContent = 
        `Найдено .www: ${elems1.length}, .ggg: ${elems2.length}`;
}); 