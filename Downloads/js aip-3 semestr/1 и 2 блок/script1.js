"use strict";
alert('Всем привет!'); 
let num;
num = 3;  
alert(num);

let a, b, c;
a=3
b=5
c=a+b

alert(a);
alert(b);
alert(c);

let d;  

d = 10;    
alert(d); 

d = 20;    
alert(d); 

a = 10;
b = 2;
alert(a+b);
alert(a-b);
alert(a*b);
alert(a/b);

let result;
c = 10;
d = 5;
result = c + d;
alert(result);

a = 1;
c = 2;
b = 3;
alert(a+c+b);

a = 10;
b = 5;
c = a + b;
d = 7
result = c + d;
alert(result);

a = 1.5;
b = 0.75;
alert(a+b);

a = 100;
alert(-a);

a = -20;
alert(-a);

a = 13;
b = 5;
alert(a % b);

a = 2;
b = 10;
alert(a ** b);

let str;
str = 'Valera';
alert(str);
str = 'Soyankin';
alert(str);


let str1;
str1 = '!!!';
alert(str1);

let str2 = 'java';
let str3 = 'script';
alert(str2 + str3);

let str4 = 'hello';
let str5 = 'world';
alert(str4 + ' ' + str5);


let gop = 'qfsafgsdag';
alert(gop.length); 

let str6 = 'xxx';
let str7 = 'yyy';
let txt  = `aaa ${str6} bbb ${str7} ccc`;
alert(txt);


str = `a
b
c`
alert(str);

let j = undefined;
alert(j);

let l = null;
alert(l);

let o = true;
alert(o);

let p = false;
alert(p);

alert('fsf' * 'sdg');

alert( 10 / 0); // выведет Infinity
alert(-10 / 0); // выведет -Infinity

const PI = 3.14;
let radius = 5;
let circumference = 2 * PI * radius;
alert(circumference);

a = +'2';
b = +'3';
alert(a + b);

num1 = parseInt('5px');
num2 = parseInt('6px');
alert(num1 + num2);

num1 = parseFloat('5.5px');
num2 = parseFloat('6.25px');
alert(num1 + num2);

num1 = parseFloat('5.5px');
num2 = parseFloat('6.25px');
num3 = 'px';
alert(num1 + num2 + num3);

let num12 = 112532;
let num13 = 2132521;
alert(String(num12) + String(num13));

num = 1234512412523;
alert(String(num).length);

num1 = 1234512423;
num2 = 1234512;
alert(String(num1).length + String(num2).length);

str = 'abcde';
alert(str[0]);
alert(str[2]);
alert(str[4]);

str = 'abcde';
alert(str[4], str[3], str[2], str[1], str[0]);

str = 'abcde';
num = 2;
alert(str[num]);

str = 'abcde';
alert(str[str.length - 1]);

str = 'abcde';
alert(str[str.length - 2]);

str = 'abcde';
alert(str[str.length - 3]);

test = '12345';
alert(Number(test[0]) + Number(test[1]) + Number(test[2]) + Number(test[3]) + Number(test[4]));

test = '12345';
alert(Number(test[0]) * Number(test[1]) * Number(test[2]) * Number(test[3]) * Number(test[4]));

test = '12345';
alert(test[4] + test[3] + test[2] + test[1] + test[0]);

num = 47;
num += 7;
num -= 18;
num *= 10;
num /= 15;
alert(num);

num = 10;
num ++;
num ++;
num --;
alert(num);

alert(0.1 * 0.2);

alert(0.3 - 0.1);

alert('Ваш возраст: ' + prompt('Ваш возраст?'));

num1 = prompt('Введите первое число');
let num2 = prompt('Введите второе число');

alert(Number[num1] + Number[num2]);

num1 = prompt('Введите сторону квадрата');
num2 = 2;
alert = ('Площадь квадрата: ' ** prompt('Введите сторону квадрата'))


let side1 = prompt("Введите первую сторону прямоугольника:");
let side2 = prompt("Введите вторую сторону прямоугольника:");
let perimeter = 2 * (Number(side1) + Number(side2));

alert("Периметр прямоугольника: " + perimeter);

document.write('text');
str = 'text';
document.write('<i>' + str + '</i>');

document.write('1<br>');
document.write('2<br>');
document.write('3<br>');
document.write('4<br>');
document.write('5<br>');