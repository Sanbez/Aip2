// Импорт Three.js
import * as THREE from '/three/build/three.module.min.js';

// Реалистичная 3D модель Луны с настоящей текстурой NASA

let scene, camera, renderer, moon, moonGroup;
let mouseX = 0, mouseY = 0;
let targetRotationX = 0, targetRotationY = 0;
let isInteracting = false;

function init() {
    const container = document.getElementById('moon-container');
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 500;

    // Создание сцены
    scene = new THREE.Scene();

    // Создание камеры
    camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 2.5;

    // Создание рендерера с улучшенными настройками
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Создаем группу для луны (для лучшего контроля вращения)
    moonGroup = new THREE.Group();
    scene.add(moonGroup);

    // Создание высокодетализированной геометрии луны
    const geometry = new THREE.SphereGeometry(1, 256, 256);

    // Загружаем настоящую текстуру NASA
    const textureLoader = new THREE.TextureLoader();
    const moonTexture = textureLoader.load('/images/moon_texture.jpg');

    // Настройки текстуры для лучшего качества
    moonTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    moonTexture.minFilter = THREE.LinearFilter;
    moonTexture.magFilter = THREE.LinearFilter;

    // Реалистичный материал луны с настоящей текстурой
    const material = new THREE.MeshStandardMaterial({
        map: moonTexture,
        roughness: 0.95,
        metalness: 0.0,
        bumpMap: moonTexture,
        bumpScale: 0.005
    });

    moon = new THREE.Mesh(geometry, material);
    moon.castShadow = true;
    moon.receiveShadow = true;
    moonGroup.add(moon);

    // Реалистичное освещение как от солнца
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.5);
    sunLight.position.set(5, 3, 5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    // Мягкий заполняющий свет (отражение от Земли)
    const fillLight = new THREE.HemisphereLight(0x0d1117, 0x000000, 0.2);
    scene.add(fillLight);

    // Слабый ambient для видимости темной стороны
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    // Rim light для контура
    const rimLight = new THREE.DirectionalLight(0x5566aa, 0.3);
    rimLight.position.set(-5, 0, -3);
    scene.add(rimLight);

    // Обработка событий мыши
    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('touchstart', onTouchStart);
    container.addEventListener('touchmove', onTouchMove);
    container.addEventListener('touchend', onTouchEnd);

    // Адаптивность
    window.addEventListener('resize', onWindowResize);

    // Начальный наклон луны для лучшего вида
    moonGroup.rotation.x = 0.1;
    moonGroup.rotation.y = 0;

    // Запуск анимации
    animate();
}

function onMouseDown() {
    isInteracting = true;
}

function onMouseUp() {
    isInteracting = false;
}

function onMouseMove(event) {
    if (!isInteracting) return;

    const container = document.getElementById('moon-container');
    const rect = container.getBoundingClientRect();

    mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    targetRotationY = mouseX * 0.8;
    targetRotationX = mouseY * 0.5;
}

function onMouseLeave() {
    isInteracting = false;
}

function onTouchStart(event) {
    isInteracting = true;
    if (event.touches.length > 0) {
        const touch = event.touches[0];
        const container = document.getElementById('moon-container');
        const rect = container.getBoundingClientRect();
        mouseX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
    }
}

function onTouchMove(event) {
    if (!isInteracting || event.touches.length === 0) return;
    event.preventDefault();

    const touch = event.touches[0];
    const container = document.getElementById('moon-container');
    const rect = container.getBoundingClientRect();

    mouseX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
    mouseY = -((touch.clientY - rect.top) / rect.height) * 2 + 1;

    targetRotationY = mouseX * 0.8;
    targetRotationX = mouseY * 0.5;
}

function onTouchEnd() {
    isInteracting = false;
}

function onWindowResize() {
    const container = document.getElementById('moon-container');
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 500;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

function animate() {
    requestAnimationFrame(animate);

    // Медленное автоматическое вращение
    if (!isInteracting) {
        moonGroup.rotation.y += 0.001;
    }

    // Плавное интерактивное вращение при взаимодействии
    if (isInteracting) {
        moonGroup.rotation.x += (targetRotationX - moonGroup.rotation.x) * 0.05;
        moonGroup.rotation.y += (targetRotationY - moonGroup.rotation.y) * 0.05;
    }

    renderer.render(scene, camera);
}

// Запуск при загрузке страницы
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
