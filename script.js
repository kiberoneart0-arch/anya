// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Элементы ---
    const surpriseBtn = document.getElementById('surpriseBtn');
    const wishCard = document.getElementById('wishCard');
    const gameContainer = document.getElementById('gameContainer');
    const scoreSpan = document.getElementById('score');
    const resetBtn = document.getElementById('resetGame');
    const winMessage = document.getElementById('winMessage');

    // --- Переменные игры ---
    let collectedCount = 0;
    const totalFlowers = 9; // 3x3 сетка
    const flowerEmojis = ['🌻', '🌷', '🌸', '🌹', '🌺', '🌸', '🌼', '🌷', '🌸']; // Набор цветов

    // --- 1. Интерактивность для гифки и поздравления ---
    surpriseBtn.addEventListener('click', () => {
        // Показываем карточку с пожеланием
        wishCard.classList.remove('hidden');

        // Небольшая анимация гифки (эффект "встряски")
        const gif = document.getElementById('mainGif');
        gif.style.transform = 'scale(1.1)';
        setTimeout(() => {
            gif.style.transform = 'scale(1)';
        }, 200);

        // Можно менять текст кнопки
        surpriseBtn.textContent = '💐 Еще разок? 💐';
    });

    // --- 2. Логика игры "Собери букет" ---

    // Функция для создания цветов
    function createFlowers() {
        gameContainer.innerHTML = ''; // очищаем контейнер
        for (let i = 0; i < totalFlowers; i++) {
            const flowerDiv = document.createElement('div');
            flowerDiv.classList.add('flower');
            // Чередуем эмодзи, чтобы было красиво
            flowerDiv.textContent = flowerEmojis[i % flowerEmojis.length];
            flowerDiv.dataset.index = i;
            flowerDiv.dataset.collected = 'false';

            // Обработчик клика на цветок
            flowerDiv.addEventListener('click', function() {
                // Если цветок еще не собран
                if (this.dataset.collected === 'false') {
                    this.classList.add('collected');
                    this.dataset.collected = 'true';
                    collectedCount++;
                    scoreSpan.textContent = collectedCount;

                    // Проверка победы
                    if (collectedCount === totalFlowers) {
                        winMessage.classList.remove('hidden');
                        // Можно добавить конфетти-эффект (имитация)
                        document.body.style.overflow = 'hidden';
                        setTimeout(() => {
                            document.body.style.overflow = 'auto';
                        }, 500);
                    }
                }
            });

            gameContainer.appendChild(flowerDiv);
        }
    }

    // Функция сброса игры
    function resetGame() {
        collectedCount = 0;
        scoreSpan.textContent = collectedCount;
        winMessage.classList.add('hidden');

        const flowers = document.querySelectorAll('.flower');
        flowers.forEach(flower => {
            flower.classList.remove('collected');
            flower.dataset.collected = 'false';
        });

        // Перемешаем эмодзи для разнообразия (опционально)
        const shuffledEmojis = [...flowerEmojis].sort(() => Math.random() - 0.5);
        flowers.forEach((flower, index) => {
            flower.textContent = shuffledEmojis[index % shuffledEmojis.length];
        });
    }

    // Начальная инициализация игры
    createFlowers();

    // Обработчик кнопки "Начать заново"
    resetBtn.addEventListener('click', resetGame);

    // --- 3. Дополнительные интерактивные весенние фишки ---

    // При клике на гифку появляется дополнительное сообщение (сюрприз)
    const gifElement = document.getElementById('mainGif');
    gifElement.addEventListener('dblclick', () => {
        alert('🌷💖 С любовью, твоя Аня! 💖🌷');
    });

    // Добавим звук весны? Нет, просто всплывающие подсказки при наведении на цветы в игре
    // (уже реализовано в CSS)

    // Эффект "летящих лепестков" при движении мыши (простой)
    document.addEventListener('mousemove', (e) => {
        // Создаем маленький элемент лепестка изредка
        if (Math.random() > 0.97) { // 3% шанс при движении
            const petal = document.createElement('span');
            petal.textContent = '🌸';
            petal.style.position = 'absolute';
            petal.style.left = e.pageX + 'px';
            petal.style.top = e.pageY + 'px';
            petal.style.fontSize = '20px';
            petal.style.pointerEvents = 'none';
            petal.style.opacity = '0.5';
            petal.style.transition = 'all 2s ease';
            document.body.appendChild(petal);

            // Анимация исчезновения
            setTimeout(() => {
                petal.style.transform = 'translateY(-30px) rotate(20deg)';
                petal.style.opacity = '0';
            }, 10);

            // Удаляем элемент через 2 секунды
            setTimeout(() => {
                petal.remove();
            }, 2000);
        }
    });

    // Маленькая анимация для заголовка (переливание цветов)
    const title = document.querySelector('.main-title');
    const colors = ['#b34180', '#d46b4a', '#4a9b6e', '#c9456b'];
    let colorIndex = 0;
    setInterval(() => {
        title.style.color = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, 800);
});