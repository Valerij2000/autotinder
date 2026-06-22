import '../scss/style.scss';

window.addEventListener('DOMContentLoaded', () => {

	const cars = [
		{ id: 1, brand: 'BMW', model: 'X5', price: 65000, body: 'SUV', fuel: 'Diesel', transmission: 'Automatic', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200' },
		{ id: 2, brand: 'Audi', model: 'Q7', price: 62000, body: 'SUV', fuel: 'Diesel', transmission: 'Automatic', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200' },
		{ id: 3, brand: 'Tesla', model: 'Model Y', price: 59000, body: 'SUV', fuel: 'Electric', transmission: 'Automatic', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1200' },
		{ id: 4, brand: 'Mercedes', model: 'GLE', price: 72000, body: 'SUV', fuel: 'Diesel', transmission: 'Automatic', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200' },
		{ id: 5, brand: 'Volvo', model: 'XC90', price: 61000, body: 'SUV', fuel: 'Hybrid', transmission: 'Automatic', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200' },
		{ id: 6, brand: 'Toyota', model: 'RAV4', price: 42000, body: 'SUV', fuel: 'Hybrid', transmission: 'Automatic', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200' },
		{ id: 7, brand: 'Lexus', model: 'RX', price: 69000, body: 'SUV', fuel: 'Hybrid', transmission: 'Automatic', image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200' },
		{ id: 8, brand: 'Porsche', model: 'Cayenne', price: 98000, body: 'SUV', fuel: 'Petrol', transmission: 'Automatic', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200' },
		{ id: 9, brand: 'Volkswagen', model: 'Touareg', price: 58000, body: 'SUV', fuel: 'Diesel', transmission: 'Automatic', image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200' },
		{ id: 10, brand: 'Skoda', model: 'Kodiaq', price: 41000, body: 'SUV', fuel: 'Diesel', transmission: 'Automatic', image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200' }
	];

	const state = {
		index: 0,
		liked: 0,
		disliked: 0,
		animating: false,
		progress: 0
	};

	const el = {
		container: document.querySelector('.card-container'),
		like: document.getElementById('like-btn'),
		dislike: document.getElementById('dislike-btn'),
		bar: document.getElementById('accuracy-bar'),
		text: document.getElementById('accuracy'),
		likeCount: document.querySelector('.liked-count'),
		dislikeCount: document.querySelector('.disliked-count'),
		badgeLike: document.querySelector('.badge-like'),
		badgeNope: document.querySelector('.badge-nope')
	};

	// ---------------- PROGRESS ----------------

	function updateProgress() {
		const total = cars.length;

		const percent = Math.min(
			100,
			(state.index / total) * 100
		);

		state.progress = percent;

		if (el.bar) {
			el.bar.style.width = percent + '%';

			// цвет прогресса
			if (percent < 40) el.bar.style.background = '#ef4444';
			else if (percent < 75) el.bar.style.background = '#f59e0b';
			else el.bar.style.background = '#22c55e';
		}

		if (el.text) {
			el.text.textContent = Math.round(percent) + '%';
		}
	}

	// ---------------- COUNTERS ----------------

	function updateCounters() {
		if (el.likeCount) el.likeCount.textContent = state.liked;
		if (el.dislikeCount) el.dislikeCount.textContent = state.disliked;
	}

	// ---------------- STACK PARALLAX ----------------

	function applyStackEffect(cards) {
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
			<div class="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent text-white">
				<h2 class="text-3xl font-bold">${car.brand} ${car.model}</h2>
				<div class="text-xl">${car.price.toLocaleString()} €</div>
				<div class="opacity-80">${car.body} • ${car.fuel} • ${car.transmission}</div>
			</div>
		`;

		return card;
	}

	// ---------------- RENDER ----------------

	function render() {
		el.container.innerHTML = '';

		const slice = cars.slice(state.index, state.index + 3);

		if (!slice.length) {
			showResult();
			return;
		}

		slice.reverse().forEach(c => {
			el.container.appendChild(createCard(c));
		});

		const cards = [...el.container.querySelectorAll('.card')];

		applyStackEffect(cards);

		const top = cards[cards.length - 1];

		if (top) bindDrag(top);

		updateProgress();
		updateCounters();
	}

	// ---------------- SWIPE ----------------

	function swipe(dir) {
		if (state.animating) return;

		const car = cars[state.index];
		if (!car) return;

		state.animating = true;

		const top = el.container.lastElementChild;

		if (!top) return;

		top.style.transition = 'transform .35s ease, opacity .35s ease';

		top.style.transform =
			dir === 'right'
				? 'translateX(160vw) rotate(25deg)'
				: 'translateX(-160vw) rotate(-25deg)';

		setTimeout(() => {

			if (dir === 'right') state.liked++;
			else state.disliked++;

			state.index++;
			state.animating = false;

			render();

		}, 350);
	}

	// ---------------- DRAG + LIVE FEEDBACK ----------------

	function bindDrag(card) {

		let startX = 0;
		let dx = 0;

		const move = (e) => {
			dx = e.clientX - startX;

			card.style.transform =
				`translateX(${dx}px) rotate(${dx / 12}deg)`;

			// LIVE PROGRESS (ВАЖНО)
			const progressDelta = Math.min(25, Math.abs(dx) / 8);

			if (el.bar) {
				el.bar.style.transform = `scaleX(${1 + progressDelta / 200})`;
			}

			// TINT
			if (dx > 30) {
				el.badgeLike?.classList.remove('hidden');
				el.badgeNope?.classList.add('hidden');
				card.style.boxShadow = '0 0 40px rgba(34,197,94,0.4)';
			} else if (dx < -30) {
				el.badgeNope?.classList.remove('hidden');
				el.badgeLike?.classList.add('hidden');
				card.style.boxShadow = '0 0 40px rgba(239,68,68,0.4)';
			}
		};

		const up = () => {

			el.badgeLike?.classList.add('hidden');
			el.badgeNope?.classList.add('hidden');

			card.style.boxShadow = '';

			if (dx > 120) return swipe('right');
			if (dx < -120) return swipe('left');

			card.style.transition = 'transform .25s ease';
			card.style.transform = 'translateX(0) rotate(0deg)';
		};

		card.onpointerdown = (e) => {
			if (state.animating) return;
			startX = e.clientX;

			card.setPointerCapture(e.pointerId);
			card.onpointermove = move;
			card.onpointerup = up;
		};
	}

	// ---------------- RESULT ----------------

	function showResult() {

		el.container.innerHTML = `
			<div class="bg-white p-8 rounded-3xl shadow-2xl text-center">

				<h2 class="text-3xl font-bold mb-4">
					Готово 🎯
				</h2>

				<p class="mb-2">Купил бы: ${state.liked}</p>
				<p class="mb-6">Не купил: ${state.disliked}</p>

				<button id="restart"
					class="bg-green-500 text-white px-6 py-3 rounded-full w-full mb-3">
					Начать заново
				</button>

				<button id="recommend"
					class="bg-blue-500 text-white px-6 py-3 rounded-full w-full mb-3">
					Получить рекомендацию
				</button>

				<a href="https://max.ru"
				   target="_blank"
				   class="text-blue-600 underline">
					Наш MAX канал
				</a>

			</div>
		`;

		document.getElementById('restart').onclick = () => {
			state.index = 0;
			state.liked = 0;
			state.disliked = 0;
			render();
		};

		document.getElementById('recommend').onclick = () => {
			alert('Рекомендация сформирована 🚗');
		};
	}

	// ---------------- INIT ----------------

	el.like?.addEventListener('click', () => swipe('right'));
	el.dislike?.addEventListener('click', () => swipe('left'));

	render();
});