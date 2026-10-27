// Конфигурация для входа (в реальном проекте — проверка через API)
const AUTH_LOGIN = 'admin';
const AUTH_PASSWORD = '12345';

// Переменная для хранения текущей задачи
let currentTask = '';

// --- ФУНКЦИИ ПЕРЕКЛЮЧЕНИЯ ЭКРАНОВ ---
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// --- ЛОГИКА ВХОДА ---
function login() {
    const login = document.getElementById('login-input').value;
    const password = document.getElementById('password-input').value;
    const errorMsg = document.getElementById('login-error');

    if (login === AUTH_LOGIN && password === AUTH_PASSWORD) {
        errorMsg.textContent = '';
        showScreen('screen-menu');
    } else {
        errorMsg.textContent = 'Неверный логин или пароль!';
    }
}

function logout() {
    // Очистка полей ввода
    document.getElementById('login-input').value = '';
    document.getElementById('password-input').value = '';
    showScreen('screen-login');
}

// --- ЛОГИКА ЗАДАЧ ---
function goToMenu() {
    showScreen('screen-menu');
}

function startScan(taskName) {
    currentTask = taskName;
    document.getElementById('scan-title').textContent = taskName;
    document.getElementById('scan-result').textContent = '';
    showScreen('screen-scan');
}

// --- ИМИТАЦИЯ СКАНИРОВАНИЯ ---
function simulateScan() {
    const resultEl = document.getElementById('scan-result');
    resultEl.textContent = 'Сканирование...';

    // Имитация задержки работы камеры/сканера
    setTimeout(() => {
        // Случайный штрих-код
        const fakeBarcode = Math.floor(Math.random() * 9000000000000) + 1000000000000;
        resultEl.textContent = 'Штрих-код: ' + fakeBarcode;
        
        // Заполнение данных о товаре и переход на экран товара через 1 секунду
        setTimeout(() => {
            document.getElementById('product-name').textContent = 'Товар: ' + currentTask;
            document.getElementById('product-sku').textContent = fakeBarcode;
            document.getElementById('product-cell').textContent = 'A-' + Math.floor(Math.random() * 20 + 1);
            document.getElementById('product-qty').textContent = Math.floor(Math.random() * 50 + 1);
            showScreen('screen-product');
        }, 1000);
    }, 1500);
}

// --- ПОДТВЕРЖДЕНИЕ ОПЕРАЦИИ ---
function confirmAction() {
    alert('Операция успешно подтверждена! Данные переданы на сервер.');
    showScreen('screen-menu');
}

// --- РЕГИСТРАЦИЯ SERVICE WORKER ДЛЯ PWA ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(reg => console.log('Service Worker зарегистрирован!', reg))
            .catch(err => console.log('Ошибка регистрации SW:', err));
    });
}