import '../scss/style.scss';

window.addEventListener('DOMContentLoaded', () => {

	const cars = [
		{ id: 1, brand: 'BMW', model: 'X5', price: 65000, body: 'Внедорожник', fuel: 'Дизель', transmission: 'Автомат', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200' },
		{ id: 2, brand: 'Audi', model: 'Q7', price: 62000, body: 'Внедорожник', fuel: 'Дизель', transmission: 'Автомат', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200' },
		{ id: 3, brand: 'Tesla', model: 'Model Y', price: 59000, body: 'Внедорожник', fuel: 'Электро', transmission: 'Автомат', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1200' },
		{ id: 4, brand: 'Mercedes', model: 'GLE', price: 72000, body: 'Внедорожник', fuel: 'Дизель', transmission: 'Автомат', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200' },
		{ id: 5, brand: 'Volvo', model: 'XC90', price: 61000, body: 'Внедорожник', fuel: 'Гибрид', transmission: 'Автомат', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200' },
		{ id: 6, brand: 'Toyota', model: 'RAV4', price: 42000, body: 'Внедорожник', fuel: 'Гибрид', transmission: 'Автомат', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200' },
		{ id: 7, brand: 'Lexus', model: 'RX', price: 69000, body: 'Внедорожник', fuel: 'Гибрид', transmission: 'Автомат', image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200' },
		{ id: 8, brand: 'Porsche', model: 'Cayenne', price: 98000, body: 'Внедорожник', fuel: 'Бензин', transmission: 'Автомат', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200' },
		{ id: 9, brand: 'Volkswagen', model: 'Touareg', price: 58000, body: 'Внедорожник', fuel: 'Дизель', transmission: 'Автомат', image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200' },
		{ id: 10, brand: 'Skoda', model: 'Kodiaq', price: 41000, body: 'Внедорожник', fuel: 'Дизель', transmission: 'Автомат', image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200' },
		{ id: 11, brand: 'Ford', model: 'Explorer', price: 54000, body: 'Внедорожник', fuel: 'Бензин', transmission: 'Автомат', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200' },
		{ id: 12, brand: 'Hyundai', model: 'Santa Fe', price: 45000, body: 'Внедорожник', fuel: 'Гибрид', transmission: 'Автомат', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200' },
		{ id: 13, brand: 'Kia', model: 'Sorento', price: 47000, body: 'Внедорожник', fuel: 'Гибрид', transmission: 'Автомат', image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=1200' },
		{ id: 14, brand: 'Nissan', model: 'X-Trail', price: 39000, body: 'Внедорожник', fuel: 'Гибрид', transmission: 'Автомат', image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1200' },
		{ id: 15, brand: 'Mazda', model: 'CX-60', price: 52000, body: 'Внедорожник', fuel: 'Дизель', transmission: 'Автомат', image: 'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?w=1200' },
		{ id: 16, brand: 'Peugeot', model: '5008', price: 38000, body: 'Внедорожник', fuel: 'Дизель', transmission: 'Автомат', image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=1200' },
		{ id: 17, brand: 'Renault', model: 'Austral', price: 36000, body: 'Внедорожник', fuel: 'Гибрид', transmission: 'Автомат', image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1200' },
		{ id: 18, brand: 'Honda', model: 'CR-V', price: 48000, body: 'Внедорожник', fuel: 'Гибрид', transmission: 'Автомат', image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200' },
		{ id: 19, brand: 'Chevrolet', model: 'Tahoe', price: 87000, body: 'Внедорожник', fuel: 'Бензин', transmission: 'Автомат', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200' },
		{ id: 20, brand: 'Jeep', model: 'Grand Cherokee', price: 63000, body: 'Внедорожник', fuel: 'Гибрид', transmission: 'Автомат', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200' }
	];

	const state = {
		currentIndex: 0,
		liked: [],
		disliked: [],
		isAnimating: false,
		lastAction: null // для undo
	};

	const cardContainer = document.querySelector('.card-container');
	const likeBtn = document.getElementById('like-btn');
	const dislikeBtn = document.getElementById('dislike-btn');
	const undoBtn = document.getElementById('undo-btn');

	// ---------------- UI ----------------

	function updateCounters() {
		document.querySelector('.liked-count').textContent = state.liked.length;
		document.querySelector('.disliked-count').textContent = state.disliked.length;
	}

	function vibrate(type) {
		if (!navigator.vibrate) return;
		navigator.vibrate(type === 'like' ? 40 : 20);
	}

	function updateProgress() {
		const bar = document.getElementById('accuracy-bar');
		const text = document.getElementById('accuracy');

		const percent = (state.currentIndex / cars.length) * 100;

    if (bar) {
			bar.style.width = percent + '%';

			// цвет прогресса
			if (percent < 40) bar.style.background = '#ef4444';
			else if (percent < 75) bar.style.background = '#f59e0b';
			else bar.style.background = '#22c55e';
		}

    text.textContent = `${Math.round(percent)}%`;
	}

	function setTint(x) {
  const top = cardContainer.lastElementChild;
  if (!top) return;

  const likeOverlay  = top.querySelector('.like-overlay');
  const nopeOverlay  = top.querySelector('.nope-overlay');

  const opacity = Math.min(Math.abs(x) / 100, 1);

  if (x > 0) {
    likeOverlay.style.opacity  = opacity;
    nopeOverlay.style.opacity  = 0;
    top.style.boxShadow = `0 0 ${Math.round(opacity * 60)}px rgba(34,197,94,${(opacity * 0.7).toFixed(2)})`;
  } else if (x < 0) {
    nopeOverlay.style.opacity  = opacity;
    likeOverlay.style.opacity  = 0;
    top.style.boxShadow = `0 0 ${Math.round(opacity * 60)}px rgba(239,68,68,${(opacity * 0.7).toFixed(2)})`;
  } else {
    likeOverlay.style.opacity  = 0;
    nopeOverlay.style.opacity  = 0;
    top.style.boxShadow = 'none';
  }
}

	function clearTint() {
  const top = cardContainer.lastElementChild;
  if (!top) return;
  cardContainer.style.background = 'transparent';
  top.style.boxShadow = 'none';
  const likeOverlay = top.querySelector('.like-overlay');
  const nopeOverlay = top.querySelector('.nope-overlay');
  if (likeOverlay) likeOverlay.style.opacity = 0;
  if (nopeOverlay) nopeOverlay.style.opacity = 0;
}

	// ---------------- STACK PARALLAX ----------------

	function updateStack() {
		const cards = cardContainer.querySelectorAll('.card');

		cards.forEach((c, i) => {
			if (i === cards.length - 1) return;

			const depth = cards.length - i;

			c.style.transform = `
				scale(${1 - depth * 0.04})
				translateY(${depth * 10}px)
			`;

			c.style.opacity = 1 - depth * 0.1;
		});
	}

	// ---------------- CARD ----------------

	function createCard(car) {
		const card = document.createElement('div');

		card.className =
			'card absolute inset-0 rounded-3xl overflow-hidden shadow-2xl bg-cover bg-center';

		card.style.backgroundImage = `url(${car.image})`;
		card.dataset.id = car.id;

		card.innerHTML = `
			<div class="swipe-overlay like-overlay"></div>
      <div class="swipe-overlay nope-overlay"></div>
      <div class="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent text-white">
        <h2 class="text-3xl font-bold">${car.brand} ${car.model}</h2>
        <div class="text-xl">${car.price.toLocaleString()} €</div>
        <div>${car.body} • ${car.fuel} • ${car.transmission}</div>
      </div>
		`;

		return card;
	}

	// ---------------- RENDER ----------------

	function renderCards() {
		cardContainer.innerHTML = '';

		const stack = cars.slice(state.currentIndex, state.currentIndex + 3);

		if (!stack.length) {
			showResult();
			return;
		}

		stack.reverse().forEach(car => {
			cardContainer.appendChild(createCard(car));
		});

		const top = cardContainer.lastElementChild;
		if (top) initDrag(top);

		updateStack();
		updateCounters();
		updateProgress();
	}

	// ---------------- SWIPE ----------------

	function swipe(dir, car) {
		if (state.isAnimating) return;

		state.isAnimating = true;
    setButtonsDisabled(true);
		vibrate(dir === 'right' ? 'like' : 'dislike');

		state.lastAction = { dir, car };

		const top = cardContainer.lastElementChild;

		// SNAP EFFECT (iOS feel)
		const power = dir === 'right' ? 1 : -1;

		top.style.transition = 'transform 0.25s cubic-bezier(.2,.9,.2,1)';
		top.style.transform =
			`translateX(${power * 160}vw) rotate(${power * 25}deg)`;

		setTimeout(() => {

			if (dir === 'right') state.liked.push(car);
			else state.disliked.push(car);

			state.currentIndex++;

			state.isAnimating = false;
      setButtonsDisabled(false); 
			clearTint();
			renderCards();

		}, 250);
	}

	// ---------------- DRAG ----------------

	function initDrag(card) {

		let startX = 0;
		let dx = 0;

		const onDown = e => {
			if (state.isAnimating) return;

			startX = e.clientX;
			card.setPointerCapture(e.pointerId);

			card.onpointermove = onMove;
			card.onpointerup = onUp;
		};

		const onMove = e => {
			dx = e.clientX - startX;

			// PARALLAX feel (Tinder depth)
			card.style.transform =
				`translateX(${dx}px)
				 rotate(${dx / 12}deg)
				 scale(${1 - Math.min(Math.abs(dx) / 1000, 0.05)})`;

			setTint(dx);
		};

		const onUp = () => {

			card.onpointermove = null;
			card.onpointerup = null;

			clearTint();

			if (dx > 120) return swipe('right', cars[state.currentIndex]);
			if (dx < -120) return swipe('left', cars[state.currentIndex]);

			card.style.transition = 'transform 0.2s ease-out';
			card.style.transform = 'translateX(0) rotate(0) scale(1)';
		};

		card.onpointerdown = onDown;
	}

	// ---------------- AI RECOMMENDATION ----------------

	function getAIRecommendation() {

		const scoreMap = new Map();

		state.liked.forEach(car => {
			scoreMap.set(car.id, (scoreMap.get(car.id) || 0) + 2);
		});

		state.disliked.forEach(car => {
			scoreMap.set(car.id, (scoreMap.get(car.id) || 0) - 1);
		});

		let best = cars[0];
		let bestScore = -Infinity;

		for (const car of cars) {
			const score = scoreMap.get(car.id) || 0;
			if (score > bestScore) {
				bestScore = score;
				best = car;
			}
		}

		return best;
	}

	// ---------------- UNDO ----------------

	function undo() {
		if (!state.lastAction || state.currentIndex === 0) return;

    setButtonsDisabled(true);

		const { dir, car } = state.lastAction;

		state.currentIndex--;

		if (dir === 'right') {
			state.liked.pop();
		} else {
			state.disliked.pop();
		}

		state.lastAction = null;

		renderCards();

    setTimeout(() => setButtonsDisabled(false), 150);
	}

  function setButtonsDisabled(disabled) {
    [likeBtn, dislikeBtn, undoBtn].forEach(btn => {
      if (!btn) return;
      btn.disabled = disabled;
      btn.style.opacity = disabled ? '0.4' : '1';
      btn.style.pointerEvents = disabled ? 'none' : 'auto';
    });
  }

	// ---------------- RESULT ---------------- Готово 🎯

	function showResult() {

    [likeBtn, dislikeBtn, undoBtn].forEach(btn => {
      if (btn) btn.style.display = 'none';
    });

		cardContainer.style.height = '300px';

		const best = getAIRecommendation();

    // конфетти
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js';
    script.onload = () => {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#a855f7']
      });

      // второй залп через паузу
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 400);
    };
    document.head.appendChild(script);

		cardContainer.innerHTML = `
			<div class="bg-white p-8 rounded-3xl shadow-2xl text-center">
        <h2 class="text-3xl font-bold mb-3">Готово 🎯</h2>
        <p class="mb-3">Лучший вариант для вас:</p>
        <div class="mb-4 font-bold text-xl">
          ${best.brand} ${best.model}
        </div>
        <a href="https://t.me/Avtoraketaa" target="_blank"
          class="block bg-blue-500 text-white px-6 py-3 rounded-full w-full mb-3">
          Получить рекомендацию
        </a>
        <button id="restart"
          class="bg-green-500 text-white px-6 py-3 rounded-full w-full mb-3">
          Начать заново
        </button>
        <a href="https://max.ru/id930500136187_biz" target="_blank" class="text-blue-600 underline">
          Канал в MAX
        </a>
      </div>
		`;

		document.getElementById('restart').onclick = () => {
      
      [likeBtn, dislikeBtn, undoBtn].forEach(btn => {
        if (btn) btn.style.display = '';
      });

			state.currentIndex = 0;
			state.liked = [];
			state.disliked = [];
			state.lastAction = null;

			cardContainer.style.height = '500px';

			renderCards();
		};
	}

	// ---------------- EVENTS ----------------

	likeBtn?.addEventListener('click', () => swipe('right', cars[state.currentIndex]));
	dislikeBtn?.addEventListener('click', () => swipe('left', cars[state.currentIndex]));
	undoBtn?.addEventListener('click', undo);

	renderCards();
});