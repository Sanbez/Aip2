const { JSDOM } = require("jsdom");

// ------------------------------
//  HTML-шаблон
// ------------------------------
const dom = new JSDOM(`
<!DOCTYPE html>
<html>
<body>

<input id="elem" value="hello">
<div id="elem2" class="myClass"></div>
<input id="elem3">
<div id="elem4"></div>
<input id="elem5" value="deleteMe">
<input id="elem6" value="123">

<div id="elem7" data-text="_ADD"></div>

<div class="task8_div" data-num="1">DIV</div>
<div class="task8_div" data-num="2">DIV</div>

<button id="task9_button1" data-click-count="0">Click</button>
<button id="task9_button2">Show</button>
<div id="task9_result"></div>

<input id="task10_input" data-length="5" value="hello">
<div id="task10_result"></div>

<input id="task11_input" data-min="3" data-max="7" value="12345">
<div id="task11_result"></div>

<div id="task12_elem" data-product-price="10" data-product-amount="3">Товар</div>

<p class="task13_paragraph">Paragraph 1</p>
<p class="task13_paragraph">Paragraph 2</p>
<p class="task13_paragraph">Paragraph 3</p>

<div id="task14_16_elem" class="aa bb cc"></div>

<div id="task17_19_elem" class="www zzz ggg"></div>

</body>
</html>
`);

const document = dom.window.document;

// Логгер
const log = (n, value) => console.log(`${n}:`, value);

// ------------------------------
// 1-6. Работа с атрибутами
// ------------------------------
log(1, document.querySelector('#elem').value);
log(2, document.querySelector('#elem2').className);

let elem3 = document.querySelector('#elem3');
elem3.value = "text";
log(3, elem3.value);

let elem4 = document.querySelector('#elem4');
elem4.className = "valid";
log(4, elem4.className);

let elem5 = document.querySelector('#elem5');
log("5 before", elem5.getAttribute("value"));
elem5.removeAttribute("value");
log("5 after", elem5.getAttribute("value"));

log(6, document.querySelector('#elem6').hasAttribute('value'));

// ------------------------------
// 7. data-text + клик
// ------------------------------
let elem7 = document.querySelector('#elem7');
elem7.addEventListener('click', () => {
    elem7.textContent += elem7.dataset.text;
});
elem7.click();
log(7, elem7.textContent);

// ------------------------------
// 8. data-num
// ------------------------------
let task8Divs = [...document.querySelectorAll('.task8_div')];
task8Divs.forEach(div => {
    div.addEventListener('click', () => {
        div.textContent += " " + div.dataset.num;
    });
    div.click();
});
log(8, task8Divs.map(d => d.textContent));

// ------------------------------
// 9. Счётчик кликов
// ------------------------------
let btn1 = document.querySelector('#task9_button1');
let btn2 = document.querySelector('#task9_button2');
let res9 = document.querySelector('#task9_result');

btn1.addEventListener('click', () => {
    btn1.dataset.clickCount = Number(btn1.dataset.clickCount) + 1;
});

btn2.addEventListener('click', () => {
    res9.textContent = btn1.dataset.clickCount;
});

btn1.click();
btn1.click();
btn2.click();
log(9, res9.textContent);

// ------------------------------
// 10. Проверка длины
// ------------------------------
let t10 = document.querySelector('#task10_input');
let t10res = document.querySelector('#task10_result');

t10.addEventListener('blur', () => {
    t10res.textContent = t10.value.length === Number(t10.dataset.length)
        ? "OK" : "ERROR";
});
t10.blur();
log(10, t10res.textContent);

// ------------------------------
// 11. Диапазон длины
// ------------------------------
let t11 = document.querySelector('#task11_input');
let t11res = document.querySelector('#task11_result');

t11.addEventListener('blur', () => {
    let len = t11.value.length;
    let min = Number(t11.dataset.min);
    let max = Number(t11.dataset.max);
    t11res.textContent = (len >= min && len <= max) ? "OK" : "ERROR";
});
t11.blur();
log(11, t11res.textContent);

// ------------------------------
// 12. Цена * количество
// ------------------------------
let t12 = document.querySelector('#task12_elem');
t12.addEventListener('click', () => {
    let total = Number(t12.dataset.productPrice) * Number(t12.dataset.productAmount);
    t12.textContent += ` (стоимость: ${total})`;
});
t12.click();
log(12, t12.textContent);

// ------------------------------
// 13. data-num параграфов
// ------------------------------
let paras = [...document.querySelectorAll('.task13_paragraph')];
paras.forEach((p, i) => (p.dataset.num = i + 1));
log(13, paras.map(p => p.dataset.num));

// ------------------------------
// 14-19. Работа с classList
// ------------------------------
let t14 = document.querySelector('#task14_16_elem');
log(14, t14.classList.length);

log(15, [...t14.classList]);

t14.classList.add("xxx");
log(16, t14.className);

let t17 = document.querySelector('#task17_19_elem');
t17.classList.remove("www", "zzz");
log(17, t17.className);

log(18, t17.classList.contains("ggg"));

t17.classList.toggle("www");
t17.classList.toggle("www");
log(19, t17.className);
