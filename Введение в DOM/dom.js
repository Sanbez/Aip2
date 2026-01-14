// Задание №2 - Получение DOM элементов по id
let elem1 = document.querySelector('#elem1');
let elem2 = document.querySelector('#elem2');
let elem3 = document.querySelector('#elem3');

console.log("Задание №2 - Элемент 1:", elem1);
console.log("Задание №2 - Элемент 2:", elem2);
console.log("Задание №2 - Элемент 3:", elem3);

// Задание №3 - Получение первого абзаца из div с id="block"
let firstPInBlockById = document.querySelector('#block p');
console.log("Задание №3 - Первый абзац в div#block:", firstPInBlockById);

// Задание №4 - Получение первого абзаца из div с классом "block"
let firstPInBlockByClass = document.querySelector('.block p');
console.log("Задание №4 - Первый абзац в div.block:", firstPInBlockByClass);

// Задание №5 - Получение первого абзаца с классом "www"
let firstPWithClassWWW = document.querySelector('.www');
console.log("Задание №5 - Первый абзац с классом www:", firstPWithClassWWW);

// Задание №6 - Обработчики событий для кнопок
let button1 = document.querySelector('#button1');
let button2 = document.querySelector('#button2');
let button3 = document.querySelector('#button3');

if (button1) button1.addEventListener('click', function() { console.log('1'); });
if (button2) button2.addEventListener('click', function() { console.log('2'); });
if (button3) button3.addEventListener('click', function() { console.log('3'); });

// Задание №7 - Именованные обработчики событий
let task7Button1 = document.querySelector('#task7_button1');
let task7Button2 = document.querySelector('#task7_button2');

function func1() { console.log(1); }
function func2() { console.log(2); }

if (task7Button1) task7Button1.addEventListener('click', func1);
if (task7Button2) task7Button2.addEventListener('click', func2);

// Задание №8 - Один обработчик для многих элементов
function task8Func() { console.log('message'); }

let task8Elems = ['#task8_elem1', '#task8_elem2', '#task8_elem3', '#task8_elem4', '#task8_elem5'];
task8Elems.forEach(selector => {
    let elem = document.querySelector(selector);
    if (elem) elem.addEventListener('click', task8Func);
});

// Задание №9 - Несколько обработчиков одного события
let task9Elem = document.querySelector('#task9_elem');
if (task9Elem) {
    function task9Func1() { console.log('1'); }
    function task9Func2() { console.log('2'); }
    function task9Func3() { console.log('3'); }

    task9Elem.addEventListener('click', task9Func1);
    task9Elem.addEventListener('click', task9Func2);
    task9Elem.addEventListener('click', task9Func3);
}

// Задание №10 - Обработка двойного клика
let task10Button = document.querySelector('#task10_button');
if (task10Button) task10Button.addEventListener('dblclick', function() {
    console.log('Двойной клик сработал!');
});

// Задание №11 - Обработка наведения курсора
let task11Button = document.querySelector('#task11_button');
if (task11Button) task11Button.addEventListener('mouseover', function() {
    console.log('Курсор наведен на кнопку!');
});

// Задание №12 - Обработка ухода курсора
let task12Button = document.querySelector('#task12_button');
if (task12Button) task12Button.addEventListener('mouseout', function() {
    console.log('Курсор ушел с кнопки!');
});

// Задание №13 - Обработка наведения и ухода курсора
let task13Button = document.querySelector('#task13_button');
if (task13Button) {
    task13Button.addEventListener('mouseover', function() {
        console.log('Привет! Курсор на кнопке');
    });
    task13Button.addEventListener('mouseout', function() {
        console.log('Пока! Курсор ушел с кнопки');
    });
}

// Задание №14 - Чтение текста абзаца
let task14Elem = document.querySelector('#task14_elem');
let task14Button = document.querySelector('#task14_button');
if (task14Button && task14Elem) task14Button.addEventListener('click', function() {
    console.log('Текст абзаца:', task14Elem.textContent);
});

// Задание №15 - Запись нового текста в абзац
let task15Elem = document.querySelector('#task15_elem');
let task15Button = document.querySelector('#task15_button');
if (task15Button && task15Elem) task15Button.addEventListener('click', function() {
    task15Elem.textContent = 'Новый текст!';
});

// Задание №16 - Сумма двух чисел из абзацев
let task16Elem1 = document.querySelector('#task16_elem1');
let task16Elem2 = document.querySelector('#task16_elem2');
let task16Button = document.querySelector('#task16_button');
if (task16Button && task16Elem1 && task16Elem2) task16Button.addEventListener('click', function() {
    let num1 = parseInt(task16Elem1.textContent) || 0;
    let num2 = parseInt(task16Elem2.textContent) || 0;
    let sum = num1 + num2;
    console.log('Сумма чисел:', sum);
});

// Задание №17 - Сумма трех чисел в див
let task17Elem1 = document.querySelector('#task17_elem1');
let task17Elem2 = document.querySelector('#task17_elem2');
let task17Elem3 = document.querySelector('#task17_elem3');
let task17Result = document.querySelector('#task17_result');
let task17Button = document.querySelector('#task17_button');
if (task17Button && task17Elem1 && task17Elem2 && task17Elem3 && task17Result) {
    task17Button.addEventListener('click', function() {
        let num1 = parseInt(task17Elem1.textContent) || 0;
        let num2 = parseInt(task17Elem2.textContent) || 0;
        let num3 = parseInt(task17Elem3.textContent) || 0;
        let sum = num1 + num2 + num3;
        task17Result.textContent = 'Сумма: ' + sum;
    });
}

// Задание №18 - Увеличение числа на 1
let task18Elem = document.querySelector('#task18_elem');
let task18Button = document.querySelector('#task18_button');
if (task18Button && task18Elem) task18Button.addEventListener('click', function() {
    let currentValue = parseInt(task18Elem.textContent) || 0;
    task18Elem.textContent = currentValue + 1;
});

// Задание №19 - Добавление восклицательного знака
let task19Elem = document.querySelector('#task19_elem');
let task19Button = document.querySelector('#task19_button');
if (task19Button && task19Elem) task19Button.addEventListener('click', function() {
    task19Elem.textContent += '!';
});

// Задание №20 - Чтение HTML кода абзаца
let task20Elem = document.querySelector('#task20_elem');
let task20Button = document.querySelector('#task20_button');
if (task20Button && task20Elem) task20Button.addEventListener('click', function() {
    console.log('HTML код абзаца:', task20Elem.innerHTML);
});

// Задание №21 - Запись жирного текста в абзац
let task21Elem = document.querySelector('#task21_elem');
let task21Button = document.querySelector('#task21_button');
if (task21Button && task21Elem) task21Button.addEventListener('click', function() {
    task21Elem.innerHTML = '<b>Новый жирный текст</b>';
});

// Задание №22 - Показать атрибут type инпута
let task22Elem = document.querySelector('#task22_elem');
let task22Button = document.querySelector('#task22_button');
if (task22Button && task22Elem) task22Button.addEventListener('click', function() {
    console.log('Атрибут type:', task22Elem.type);
});

// Задание №23 - Изменить атрибут type на submit
let task23Elem = document.querySelector('#task23_elem');
let task23Button = document.querySelector('#task23_button');
if (task23Button && task23Elem) task23Button.addEventListener('click', function() {
    task23Elem.type = 'submit';
    console.log('Атрибут type изменен на submit');
});

// Задание №24 - Показать атрибут href ссылки в абзаце
let task24Link = document.querySelector('#task24_link');
let task24Button = document.querySelector('#task24_button');
let task24Result = document.querySelector('#task24_result');
if (task24Button && task24Link && task24Result) task24Button.addEventListener('click', function() {
    task24Result.textContent = 'Href ссылки: ' + task24Link.href;
});

// Задание №25 - Добавить href в текст ссылки
let task25Link = document.querySelector('#task25_link');
let task25Button = document.querySelector('#task25_button');
if (task25Button && task25Link) task25Button.addEventListener('click', function() {
    task25Link.textContent += ' (' + task25Link.href + ')';
});

// Задание №26 - Показать атрибут src картинки
let task26Img = document.querySelector('#task26_img');
let task26Button = document.querySelector('#task26_button');
let task26Result = document.querySelector('#task26_result');
if (task26Button && task26Img && task26Result) task26Button.addEventListener('click', function() {
    task26Result.textContent = 'Src картинки: ' + task26Img.src;
});

// Задание №27 - Установить width картинки в 300
let task27Img = document.querySelector('#task27_img');
let task27Button = document.querySelector('#task27_button');
if (task27Button && task27Img) task27Button.addEventListener('click', function() {
    task27Img.width = 300;
    console.log('Ширина установлена в 300px');
});

// Задание №28 - Увеличить width картинки в 2 раза
let task28Img = document.querySelector('#task28_img');
let task28Button = document.querySelector('#task28_button');
if (task28Button && task28Img) task28Button.addEventListener('click', function() {
    let currentWidth = parseInt(task28Img.width) || 0;
    task28Img.width = currentWidth * 2;
    console.log('Ширина увеличена в 2 раза: ' + (currentWidth * 2) + 'px');
});

// Задание №29 - Смена картинок по кнопкам
let task29Img = document.querySelector('#task29_img');
let task29Button1 = document.querySelector('#task29_button1');
let task29Button2 = document.querySelector('#task29_button2');

if (task29Button1 && task29Img) task29Button1.addEventListener('click', function() {
    task29Img.src = 'https://via.placeholder.com/200/ff0000/ffffff?text=Image+1';
    console.log('Установлена картинка 1');
});

if (task29Button2 && task29Img) task29Button2.addEventListener('click', function() {
    task29Img.src = 'https://via.placeholder.com/200/0000ff/ffffff?text=Image+2';
    console.log('Установлена картинка 2');
});

// Задание №30 - Записать текст в инпут
let task30Input = document.querySelector('#task30_input');
let task30Button = document.querySelector('#task30_button');
if (task30Button && task30Input) task30Button.addEventListener('click', function() {
    task30Input.value = 'Новый текст!';
});

// Задание №31 - Вывести текст из инпута в абзац
let task31Input = document.querySelector('#task31_input');
let task31Button = document.querySelector('#task31_button');
let task31Result = document.querySelector('#task31_result');
if (task31Button && task31Input && task31Result) task31Button.addEventListener('click', function() {
    task31Result.textContent = task31Input.value;
});

// Задание №32 - Вычислить квадрат числа
let task32Input1 = document.querySelector('#task32_input1');
let task32Input2 = document.querySelector('#task32_input2');
let task32Button = document.querySelector('#task32_button');
if (task32Button && task32Input1 && task32Input2) task32Button.addEventListener('click', function() {
    let number = parseFloat(task32Input1.value);
    if (!isNaN(number)) {
        task32Input2.value = number * number;
    } else {
        task32Input2.value = 'Ошибка: введите число';
    }
});

// Задание №33 - Поменять значения инпутов местами
let task33Input1 = document.querySelector('#task33_input1');
let task33Input2 = document.querySelector('#task33_input2');
let task33Button = document.querySelector('#task33_button');
if (task33Button && task33Input1 && task33Input2) task33Button.addEventListener('click', function() {
    let temp = task33Input1.value;
    task33Input1.value = task33Input2.value;
    task33Input2.value = temp;
});

// Задание №34 - Вычислить среднее арифметическое
let task34Input1 = document.querySelector('#task34_input1');
let task34Input2 = document.querySelector('#task34_input2');
let task34Input3 = document.querySelector('#task34_input3');
let task34Input4 = document.querySelector('#task34_input4');
let task34Input5 = document.querySelector('#task34_input5');
let task34Button = document.querySelector('#task34_button');
let task34Result = document.querySelector('#task34_result');

if (task34Button && task34Result) task34Button.addEventListener('click', function() {
    let num1 = parseFloat(task34Input1?.value) || 0;
    let num2 = parseFloat(task34Input2?.value) || 0;
    let num3 = parseFloat(task34Input3?.value) || 0;
    let num4 = parseFloat(task34Input4?.value) || 0;
    let num5 = parseFloat(task34Input5?.value) || 0;
    
    let sum = num1 + num2 + num3 + num4 + num5;
    let average = sum / 5;
    
    task34Result.textContent = 'Среднее арифметическое: ' + average.toFixed(2);
});

// Задание №35 - Запись чисел при фокусе и потере фокуса
let task35Input = document.querySelector('#task35_input');
if (task35Input) {
    task35Input.addEventListener('focus', function() { this.value = '1'; });
    task35Input.addEventListener('blur', function() { this.value = '2'; });
}

// Задание №36 - Вычисление квадрата числа при потере фокуса
let task36Input = document.querySelector('#task36_input');
let task36Result = document.querySelector('#task36_result');
if (task36Input && task36Result) task36Input.addEventListener('blur', function() {
    let number = parseFloat(this.value);
    if (!isNaN(number)) {
        task36Result.textContent = 'Квадрат числа: ' + (number * number);
    } else {
        task36Result.textContent = 'Пожалуйста, введите число';
    }
});

// Задание №37 - Очистка инпута при получении фокуса
let task37Input = document.querySelector('#task37_input');
if (task37Input) task37Input.addEventListener('focus', function() {
    this.value = '';
});

// Задание №38 - Чтение атрибута class через className
let task38Elem = document.querySelector('#task38_elem');
let task38Button = document.querySelector('#task38_button');
if (task38Button && task38Elem) task38Button.addEventListener('click', function() {
    console.log('Классы элемента:', task38Elem.className);
    alert('Классы элемента: ' + task38Elem.className);
});

// Задание №39 - Запись класса через className
let task39Elem = document.querySelector('#task39_elem');
let task39Button = document.querySelector('#task39_button');
if (task39Button && task39Elem) task39Button.addEventListener('click', function() {
    task39Elem.className = 'new-class';
    console.log('Добавлен класс: new-class');
});

// Задание №40 - Получение массива CSS классов
let task40Elem = document.querySelector('#task40_elem');
let task40Button = document.querySelector('#task40_button');
if (task40Button && task40Elem) task40Button.addEventListener('click', function() {
    let classesString = task40Elem.className;
    let classesArray = classesString.split(' ').filter(c => c !== '');
    console.log('Массив классов:', classesArray);
    alert('Массив классов: ' + JSON.stringify(classesArray));
});

// Задание №41 - Использование цепочки методов вместо переменной
let task41Image = document.querySelector('#task41_image');
if (task41Image) console.log("Задание №41 - src картинки:", task41Image.src);

// Задание №42 - Исправление неоптимального кода
let task42Image = document.querySelector('#task42_image');
if (task42Image) {
    console.log("Задание №42 - src:", task42Image.src);
    console.log("Задание №42 - width:", task42Image.width);
    console.log("Задание №42 - height:", task42Image.height);
}

// Задание №43 - Использование объекта this для работы с фокусом
let task43Input = document.querySelector('#task43_input');
if (task43Input) {
    task43Input.addEventListener('focus', function() { this.value = '1'; });
    task43Input.addEventListener('blur', function() { this.value = '2'; });
}

// Задание №44 - Увеличение значения кнопки при клике с использованием this
let task44Button = document.querySelector('#task44_button');
if (task44Button) task44Button.addEventListener('click', function() {
    let currentValue = parseInt(this.value) || 0;
    this.value = currentValue + 1;
});

// Задание №45 - Добавление восклицательного знака при клике на абзац с использованием this
let task45Paragraphs = document.querySelectorAll('.task45_paragraph');
task45Paragraphs.forEach(paragraph => {
    paragraph.addEventListener('click', function() {
        this.textContent += '!';
    });
});

// Задание №46 - Возведение числа в квадрат при потере фокуса с использованием this
let task46Inputs = document.querySelectorAll('.task46_input');
task46Inputs.forEach(input => {
    input.addEventListener('blur', function() {
        let number = parseFloat(this.value);
        if (!isNaN(number)) {
            this.value = number * number;
        }
    });
});

// Задание №47 - Установка текста 'text' для всех абзацев по кнопке
let task47Button = document.querySelector('#task47_button');
let task47Paragraphs = document.querySelectorAll('.task47_paragraph');
if (task47Button) task47Button.addEventListener('click', function() {
    task47Paragraphs.forEach(paragraph => {
        paragraph.textContent = 'text';
    });
});

// Задание №48 - Добавление порядкового номера к тексту абзацев
let task48Button = document.querySelector('#task48_button');
let task48Paragraphs = document.querySelectorAll('.task48_paragraph');
if (task48Button) task48Button.addEventListener('click', function() {
    task48Paragraphs.forEach((paragraph, index) => {
        paragraph.textContent += ' ' + (index + 1);
    });
});

// Задание №49 - Вычисление суммы чисел из инпутов
let task49Button = document.querySelector('#task49_button');
let task49Result = document.querySelector('#task49_result');
let task49Inputs = document.querySelectorAll('.task49_input');
if (task49Button && task49Result) task49Button.addEventListener('click', function() {
    let sum = 0;
    task49Inputs.forEach(input => {
        let number = parseFloat(input.value) || 0;
        sum += number;
    });
    task49Result.textContent = 'Сумма: ' + sum;
});

// Задание №50 - Добавление обработчиков в цикле для инпутов
function task50Func() {
    this.value = Number(this.value) + 1;
}
let task50Inputs = document.querySelectorAll('.task50_input');
task50Inputs.forEach(input => {
    input.addEventListener('blur', task50Func);
});

// Задание №51 - Возведение числа в квадрат при клике на абзац
let task51Paragraphs = document.querySelectorAll('.task51_paragraph');
task51Paragraphs.forEach(paragraph => {
    paragraph.addEventListener('click', function() {
        let number = Number(this.textContent);
        this.textContent = number * number;
    });
});

// Задание №52 - Использование анонимной функции вместо именованной
let task52Divs = document.querySelectorAll('.task52_div');
task52Divs.forEach(div => {
    div.addEventListener('click', function() {
        this.textContent = Number(this.textContent) + 1;
    });
});

// Задание №53 - Добавление href в текст ссылки только по первому нажатию
let task53Link = document.querySelector('#task53_link');
let task53Button = document.querySelector('#task53_button');
if (task53Button && task53Link) {
    function task53Func() {
        task53Link.textContent += ' (' + task53Link.href + ')';
        task53Button.removeEventListener('click', task53Func);
    }
    task53Button.addEventListener('click', task53Func);
}

// Задание №54 - Увеличение значения кнопки до 10 с последующим отвязыванием
let task54Button = document.querySelector('#task54_button');
if (task54Button) {
    function task54Func() {
        let currentValue = Number(this.value);
        this.value = currentValue + 1;
        
        if (currentValue + 1 >= 10) {
            this.removeEventListener('click', task54Func);
        }
    }
    task54Button.addEventListener('click', task54Func);
}

// Задание №55 - Добавление восклицательного знака только по первому нажатию на абзац
let task55Paragraphs = document.querySelectorAll('.task55_paragraph');
task55Paragraphs.forEach(paragraph => {
    function task55Func() {
        this.textContent += '!';
        this.removeEventListener('click', task55Func);
    }
    paragraph.addEventListener('click', task55Func);
});

// Задание №56 - Увеличение числа в li при клике
let task56Items = document.querySelectorAll('#task56_list li');
task56Items.forEach(item => {
    item.addEventListener('click', function() {
        let currentValue = Number(this.textContent);
        this.textContent = currentValue + 1;
    });
});

// Задание №57 - Увеличение числа в li только по первому нажатию
let task57Items = document.querySelectorAll('#task57_list li');
task57Items.forEach(item => {
    function func() {
        let currentValue = Number(this.textContent);
        this.textContent = currentValue + 1;
        this.removeEventListener('click', func);
    }
    item.addEventListener('click', func);
});

// Задание №58 - Увеличение числа в li только если значение меньше 10
let task58Items = document.querySelectorAll('#task58_list li');
task58Items.forEach(item => {
    function func() {
        let currentValue = Number(this.textContent);
        
        if (currentValue < 10) {
            this.textContent = currentValue + 1;
        }
        
        this.removeEventListener('click', func);
    }
    item.addEventListener('click', func);
});

// Задание №59 - Года с суммой цифр равной 6
let task59Items = document.querySelectorAll('#task59_list li');
let task59Result = document.querySelector('#task59_result');
if (task59Result) {
    let sumOfYears = 0;
    let yearsWithSum6 = [];

    function getDigitSum(number) {
        let sum = 0;
        let str = number.toString();
        
        for (let char of str) {
            sum += parseInt(char) || 0;
        }
        
        return sum;
    }

    task59Items.forEach(item => {
        let year = Number(item.textContent);
        let digitSum = getDigitSum(year);
        
        if (digitSum === 6) {
            yearsWithSum6.push(year);
            sumOfYears += year;
        }
    });

    task59Result.textContent = `Года с суммой цифр 6: ${yearsWithSum6.join(', ')}. Сумма: ${sumOfYears}`;
}

// Задание №60 - Исправление ошибок
let task60Elems = document.querySelectorAll('.task60');
task60Elems.forEach(elem => {
    elem.textContent += '!';
});

// Задание №61 - Исправление ошибок
let task61Elems = document.querySelectorAll('.task61');
task61Elems.forEach(elem => {
    elem.addEventListener('click', function() {
        this.textContent = Number(this.textContent) + 1;
    });
});

// Задание №62 - Исправление ошибок
let task62Buttons = document.querySelectorAll('button.task62');
let task62Elems = document.querySelectorAll('p.task62');
task62Buttons.forEach(button => {
    button.addEventListener('click', function() {
        task62Elems.forEach(elem => {
            elem.innerHTML = '<b>' + elem.textContent + '</b>';
        });
    });
});

// Задание №63 - Исправление ошибок
let task63Button = document.querySelector('button.task63');
let task63Elems = document.querySelectorAll('p.task63');
if (task63Button) task63Button.addEventListener('click', function() {
    let sum = 0;
    task63Elems.forEach(elem => {
        sum += Number(elem.textContent) || 0;
    });
    console.log(sum);
});

// Задание №64 - Исправление ошибок
let task64Elems = document.querySelectorAll('.task64');
task64Elems.forEach(elem => {
    elem.addEventListener('click', function() {
        this.textContent += '!';
    });
});

// Задание №65 - Исправление ошибок
let task65Button = document.querySelector('button.task65');
let task65Elems = document.querySelectorAll('p.task65');
if (task65Button) task65Button.addEventListener('click', function() {
    task65Elems.forEach(elem => {
        elem.innerHTML = '<b>' + elem.textContent + '</b>';
    });
});

// Задание №66 - Исправление ошибок
let task66Button = document.querySelector('button.task66');
let task66Elems = document.querySelectorAll('p.task66');
if (task66Button) task66Button.addEventListener('click', function() {
    let sum = 0;
    task66Elems.forEach(elem => {
        sum += Number(elem.textContent) || 0;
    });
    console.log(sum);
});

// Задание №67 - Исправление ошибок
let task67Button = document.querySelector('button.task67');
let task67Inputs = document.querySelectorAll('input.task67');
if (task67Button) task67Button.addEventListener('click', function() {
    let sum = 0;
    task67Inputs.forEach(input => {
        sum += Number(input.value) || 0;
    });
    console.log(sum);
});

// Задание №68 - Исправление ошибок
let btn68 = document.querySelector('#btn_68');
let inp168 = document.querySelector('#inp1_68');
let inp268 = document.querySelector('#inp2_68');
let inp368 = document.querySelector('#inp3_68');
if (btn68 && inp168 && inp268 && inp368) {
    btn68.addEventListener('click', function() {
        inp368.value = Number(inp168.value) + Number(inp268.value);
    });
}

// Задание №69 - Исправление ошибок
let btn69 = document.querySelector('#btn_69');
let res69 = document.querySelector('#res_69');
let inp169 = document.querySelector('#inp1_69');
let inp269 = document.querySelector('#inp2_69');
if (btn69 && res69 && inp169 && inp269) {
    btn69.addEventListener('click', function() {
        res69.textContent = Number(inp169.value) + Number(inp269.value);
    });
}

// Задание №70 - Исправление ошибок
let inputs70 = document.querySelectorAll('.task70');
let button70 = document.querySelector('#btn_70');
if (button70) {
    button70.addEventListener('click', function() {
        inputs70.forEach(input => {
            input.classList.remove('right', 'wrong');
            if (input.value === input.dataset.text) {
                input.classList.add('right');
            } else {
                input.classList.add('wrong');
            }
        });
    });
}

// Задание №71 - Исправление ошибок
let inputs71 = document.querySelectorAll('.task71');
let button71 = document.querySelector('#btn_71');
if (button71) {
    let texts71 = ['text1', 'text2', 'text3'];
    button71.addEventListener('click', function() {
        inputs71.forEach((input, i) => {
            input.classList.remove('right', 'wrong');
            if (input.value === texts71[i]) {
                input.classList.add('right');
            } else {
                input.classList.add('wrong');
            }
        });
    });
}

// Задание №72 - Исправление ошибок
let inputs72 = document.querySelectorAll('.task72');
let btn72 = document.querySelector('#btn_72');
if (btn72) {
    btn72.addEventListener('click', function() {
        let sum = 0;
        inputs72.forEach(input => {
            sum += Number(input.value) || 0;
        });
        console.log(sum);
    });
}

// Задание №73 - Исправление ошибок
let btn73 = document.querySelector('#btn_73');
let inp173 = document.querySelector('#inp1_73');
let inp273 = document.querySelector('#inp2_73');
let inp373 = document.querySelector('#inp3_73');
if (btn73 && inp173 && inp273 && inp373) {
    btn73.addEventListener('click', function() {
        let sum = Number(inp173.value) + Number(inp273.value);
        inp373.value = sum;
    });
}

// Задание №74 - Исправление ошибок
let inp74 = document.querySelector('#inp_74');
if (inp74) {
    inp74.addEventListener('blur', function() {
        let digits = this.value.split('').map(Number);
        let sum = 0;
        digits.forEach(digit => {
            if (!isNaN(digit)) sum += digit;
        });
        console.log(sum);
    });
}

// Задание №75 - Запись значения инпута в конец текста абзаца при потере фокуса
let task75Input = document.querySelector('#task75_input');
let task75Result = document.querySelector('#task75_result');
if (task75Input && task75Result) {
    task75Input.addEventListener('blur', function() {
        task75Result.textContent += this.value;
    });
}

// Задание №76 - Вычисление суммы чисел из инпутов по кнопке
let task76Button = document.querySelector('#task76_button');
let task76Inputs = document.querySelectorAll('.task76_input');
let task76Result = document.querySelector('#task76_result');
if (task76Button && task76Result) {
    task76Button.addEventListener('click', function() {
        let sum = 0;
        task76Inputs.forEach(input => {
            sum += Number(input.value) || 0;
        });
        task76Result.textContent = 'Сумма: ' + sum;
    });
}

// Задание №77 - Нахождение суммы цифр числа при потере фокуса
let task77Input = document.querySelector('#task77_input');
let task77Result = document.querySelector('#task77_result');
if (task77Input && task77Result) {
    task77Input.addEventListener('blur', function() {
        let number = this.value;
        let sum = 0;
        
        for (let char of number) {
            if (!isNaN(char) && char !== ' ') {
                sum += Number(char);
            }
        }
        
        task77Result.textContent = 'Сумма цифр: ' + sum;
    });
}

// Задание №78 - Нахождение среднего арифметического чисел через запятую
let task78Input = document.querySelector('#task78_input');
let task78Result = document.querySelector('#task78_result');
if (task78Input && task78Result) {
    task78Input.addEventListener('blur', function() {
        let numbersString = this.value;
        let numbersArray = numbersString.split(',');
        let sum = 0;
        let count = 0;
        
        numbersArray.forEach(numStr => {
            let num = Number(numStr.trim());
            if (!isNaN(num)) {
                sum += num;
                count++;
            }
        });
        
        let average = count > 0 ? sum / count : 0;
        task78Result.textContent = 'Среднее арифметическое: ' + average.toFixed(2);
    });
}

// Задание №79 - Разделение ФИО на фамилию, имя и отчество
let task79Fio = document.querySelector('#task79_fio');
let task79Surname = document.querySelector('#task79_surname');
let task79Name = document.querySelector('#task79_name');
let task79Patronymic = document.querySelector('#task79_patronymic');
if (task79Fio && task79Surname && task79Name && task79Patronymic) {
    task79Fio.addEventListener('blur', function() {
        let fioParts = this.value.trim().split(' ');
        
        task79Surname.value = '';
        task79Name.value = '';
        task79Patronymic.value = '';
        
        if (fioParts.length >= 1) {
            task79Surname.value = fioParts[0];
        }
        if (fioParts.length >= 2) {
            task79Name.value = fioParts[1];
        }
        if (fioParts.length >= 3) {
            task79Patronymic.value = fioParts[2];
        }
    });
}

// Задание №80 - ФИО с заглавных букв
let task80Input = document.querySelector('#task80_input');
if (task80Input) {
    task80Input.addEventListener('blur', function() {
        let fio = this.value.trim();
        let words = fio.split(' ');
        
        let capitalizedWords = words.map(word => {
            if (word.length > 0) {
                return word[0].toUpperCase() + word.slice(1).toLowerCase();
            }
            return word;
        });
        
        this.value = capitalizedWords.join(' ');
    });
}

// Задание №81 - Количество слов в тексте
let task81Input = document.querySelector('#task81_input');
let task81Result = document.querySelector('#task81_result');
if (task81Input && task81Result) {
    task81Input.addEventListener('blur', function() {
        let text = this.value.trim();
        let words = text.split(/\s+/).filter(word => word.length > 0);
        let wordCount = words.length;
        
        task81Result.textContent = 'Количество слов: ' + wordCount;
    });
}

// Задание №82 - Изменение формата даты
let task82Input = document.querySelector('#task82_input');
if (task82Input) {
    task82Input.addEventListener('blur', function() {
        let dateString = this.value.trim();
        let dateParts = dateString.split('.');
        
        if (dateParts.length === 3) {
            let day = dateParts[0].padStart(2, '0');
            let month = dateParts[1].padStart(2, '0');
            let year = dateParts[2];
            
            if (day.length === 2 && month.length === 2 && year.length === 4) {
                this.value = `${year}-${month}-${day}`;
            }
        }
    });
}

// Задание №83 - Проверка на палиндром
let task83Input = document.querySelector('#task83_input');
let task83Button = document.querySelector('#task83_button');
let task83Result = document.querySelector('#task83_result');
if (task83Button && task83Input && task83Result) {
    task83Button.addEventListener('click', function() {
        let word = task83Input.value.trim().toLowerCase();
        let reversedWord = word.split('').reverse().join('');
        
        if (word === reversedWord && word.length > 0) {
            task83Result.textContent = `"${word}" - это палиндром!`;
            task83Result.className = 'palindrome';
        } else {
            task83Result.textContent = `"${word}" - не палиндром`;
            task83Result.className = 'not-palindrome';
        }
    });
}

// Задание №84 - Проверка на наличие цифры 3
let task84Input = document.querySelector('#task84_input');
if (task84Input) {
    task84Input.addEventListener('blur', function() {
        let number = this.value;
        
        if (number.includes('3')) {
            this.classList.add('contains-three');
            this.classList.remove('no-three');
        } else {
            this.classList.add('no-three');
            this.classList.remove('contains-three');
        }
    });
}

// Задание №85 - Счетчик кликов по абзацам
let task85Paragraphs = document.querySelectorAll('.task85_paragraph');
let task85Input = document.querySelector('#task85_input');
let clickCount = 0;

if (task85Input) {
    task85Paragraphs.forEach(paragraph => {
        paragraph.addEventListener('click', function() {
            clickCount++;
            task85Input.value = `Кликов: ${clickCount}`;
        });
    });
}

// Задание №86 - Обрезка текста в дивах
let task86Button = document.querySelector('#task86_button');
let task86Divs = document.querySelectorAll('.task86_div');
if (task86Button) {
    task86Button.addEventListener('click', function() {
        task86Divs.forEach(div => {
            let text = div.textContent;
            if (text.length > 10) {
                div.textContent = text.substring(0, 10) + '...';
            }
        });
    });
}

// Задание №87 - Генерация случайной строки
let task87Button = document.querySelector('#task87_button');
let task87Input = document.querySelector('#task87_input');
if (task87Button && task87Input) {
    task87Button.addEventListener('click', function() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        
        for (let i = 0; i < 8; i++) {
            randomString += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        task87Input.value = randomString;
    });
}

// Задание №88 - Перемешивание строки
let task88Button = document.querySelector('#task88_button');
let task88Input = document.querySelector('#task88_input');
if (task88Button && task88Input) {
    task88Button.addEventListener('click', function() {
        let text = task88Input.value;
        let textArray = text.split('');
        
        for (let i = textArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [textArray[i], textArray[j]] = [textArray[j], textArray[i]];
        }
        
        task88Input.value = textArray.join('');
    });
}

// Задание №89 - Конвертер температуры
let task89Button = document.querySelector('#task89_button');
let task89Input = document.querySelector('#task89_input');
let task89Result = document.querySelector('#task89_result');
if (task89Button && task89Input && task89Result) {
    task89Button.addEventListener('click', function() {
        let fahrenheit = parseFloat(task89Input.value);
        if (!isNaN(fahrenheit)) {
            let celsius = (fahrenheit - 32) * 5 / 9;
            task89Result.textContent = `Температура в Цельсиях: ${celsius.toFixed(2)}°C`;
        }
    });
}

// Задание №90 - Вычисление факториала
let task90Button = document.querySelector('#task90_button');
let task90Input = document.querySelector('#task90_input');
let task90Result = document.querySelector('#task90_result');
if (task90Button && task90Input && task90Result) {
    function factorial(n) {
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    task90Button.addEventListener('click', function() {
        let number = parseInt(task90Input.value);
        if (!isNaN(number) && number >= 0) {
            let fact = factorial(number);
            task90Result.textContent = `Факториал: ${fact}`;
        }
    });
}

// Задание №91 - Решение квадратного уравнения
let task91Button = document.querySelector('#task91_button');
let task91A = document.querySelector('#task91_a');
let task91B = document.querySelector('#task91_b');
let task91C = document.querySelector('#task91_c');
let task91Result = document.querySelector('#task91_result');
if (task91Button && task91A && task91B && task91C && task91Result) {
    task91Button.addEventListener('click', function() {
        let a = parseFloat(task91A.value);
        let b = parseFloat(task91B.value);
        let c = parseFloat(task91C.value);
        
        if (isNaN(a) || isNaN(b) || isNaN(c)) {
            task91Result.textContent = 'Введите корректные коэффициенты';
            return;
        }
        
        let D = b * b - 4 * a * c;
        
        if (D > 0) {
            let x1 = (-b + Math.sqrt(D)) / (2 * a);
            let x2 = (-b - Math.sqrt(D)) / (2 * a);
            task91Result.textContent = `Корни уравнения: x₁ = ${x1.toFixed(2)}, x₂ = ${x2.toFixed(2)}`;
        } else if (D === 0) {
            let x = -b / (2 * a);
            task91Result.textContent = `Уравнение имеет один корень: x = ${x.toFixed(2)}`;
        } else {
            task91Result.textContent = 'Уравнение не имеет действительных корней';
        }
    });
}

console.log("Все обработчики событий установлены!");