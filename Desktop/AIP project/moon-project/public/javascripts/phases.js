// Визуализация фаз луны

document.addEventListener('DOMContentLoaded', function() {
    const phaseVisuals = document.querySelectorAll('.moon-phase-visual');

    phaseVisuals.forEach(function(visual) {
        const phase = parseFloat(visual.getAttribute('data-phase'));
        drawMoonPhase(visual, phase);
    });
});

function drawMoonPhase(element, phase) {
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    element.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 40;

    // Очистка canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рисуем полную луну (фон)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#555';
    ctx.fill();

    // Рисуем освещенную часть
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.clip();

    // Определяем стиль освещения в зависимости от фазы
    if (phase < 0.5) {
        // Растущая луна (от новолуния к полнолунию)
        const offset = (phase * 2 - 1) * radius;
        ctx.beginPath();
        ctx.ellipse(centerX + offset, centerY, Math.abs(offset) + radius, radius, 0, 0, 2 * Math.PI);
        ctx.fillStyle = '#ddd';
        ctx.fill();

        // Темная часть справа
        if (phase < 0.25) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, -Math.PI / 2, Math.PI / 2);
            ctx.fillStyle = '#555';
            ctx.fill();
        }
    } else {
        // Убывающая луна (от полнолуния к новолунию)
        const offset = ((1 - phase) * 2 - 1) * radius;
        ctx.beginPath();
        ctx.ellipse(centerX - offset, centerY, Math.abs(offset) + radius, radius, 0, 0, 2 * Math.PI);
        ctx.fillStyle = '#ddd';
        ctx.fill();

        // Темная часть слева
        if (phase > 0.75) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, Math.PI / 2, -Math.PI / 2);
            ctx.fillStyle = '#555';
            ctx.fill();
        }
    }

    ctx.restore();

    // Добавляем тень для глубины
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    // Обводка
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 1;
    ctx.stroke();
}
