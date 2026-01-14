function updateDateTime() {
    let date = new Date();

    let currentDay = date.getDate();
    let currentMonth = date.getMonth() + 1;
    let currentYear = date.getFullYear();

    console.clear();
    console.log("=== ТЕКУЩИЕ ДАТА И ВРЕМЯ ===");
    console.log("День: " + currentDay);
    console.log("Месяц: " + currentMonth);
    console.log("Год: " + currentYear);

    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');

    console.log("Время: " + hours + ":" + minutes + ":" + seconds);

    // День недели
    let dayOfWeek = date.getDay();
    let days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    console.log("День недели:", days[dayOfWeek]);

    let isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
    console.log("Тип дня:", isWeekend ? "выходной" : "рабочий");

    let daysUntilSunday = (7 - dayOfWeek) % 7;
    console.log("Дней до воскресенья:", daysUntilSunday);

    // Доп. данные
    let birthday = new Date(2007, 4, 25);
    let birthdayDay = birthday.getDay();
    console.log("День недели в день рождения:", days[birthdayDay]);

    let newYear2025 = new Date(2025, 0, 1);
    console.log("Timestamp 1 января 2025:", newYear2025.getTime());

    // Разные даты
    let date1 = new Date(1988, 2, 1);
    let date2 = new Date(2000, 0, 10);
    let diffDays = Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
    console.log("Дней между 1.03.1988 и 10.01.2000:", Math.floor(diffDays));

    let now = new Date();
    let monthsDiff = (now.getFullYear() - birthday.getFullYear()) * 12 + (now.getMonth() - birthday.getMonth());
    console.log("Месяцев с дня рождения:", monthsDiff);

    let date3 = new Date(2000, 8, 1);
    let date4 = new Date(2010, 1, 15);
    let diffMs = Math.abs(date4 - date3);
    console.log("Миллисекунд между 1.09.2000 и 15.02.2010:", diffMs);
    console.log("Разница в днях:", Math.floor(diffMs / 86400000));

    let yearsDiff = date4.getFullYear() - date3.getFullYear();
    console.log("Разница в годах:", yearsDiff);
}

// Вызываем сразу
updateDateTime();

// И обновляем каждую секунду
setInterval(updateDateTime, 1000);



// ==========================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ==========================

function addZero(num) {
    return (num >= 0 && num <= 9) ? '0' + num : num;
}

function convertDateFormat(dateStr) {
    let arr = dateStr.split('-');
    return arr[2] + '.' + arr[1] + '.' + arr[0];
}

function getLastDayOfMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

function isLeap(year) {
    return new Date(year, 2, 0).getDate() === 29;
}

function checkDate(year, month, day) {
    let d = new Date(year, month, day);
    return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
}

function getZodiacSign(dateStr) {
    let [month, day] = dateStr.split('-').map(Number);
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Овен';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Телец';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Близнецы';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Рак';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Лев';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Дева';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Весы';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Скорпион';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Стрелец';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Козерог';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Водолей';
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Рыбы';
    return 'Неизвестно';
}
