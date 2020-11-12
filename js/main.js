'use strict';

/* Плавная прокрутка, в том числе по кнопке наверх*/

// Прослушиватель на всю стр.
document.addEventListener('DOMContentLoaded', function () {

	const links = document.querySelectorAll('[data-scroll]'); // получ. коллекцию ссылок
	for (let i = 0; i < links.length; i++) { // перебор, навеш. событие на каждую ссылку
		links[i].addEventListener('click', function (event) {
			event.preventDefault();
			const blockID = event.target.getAttribute('href').substr(1); // получ. id без #

			// находим эл. с нужным id и плавно переходим к нему
			document.getElementById(blockID).scrollIntoView({
				behavior: 'smooth', // плавно
				block: 'start', // к началу
			});

		});
	}


	/* Динамическая дата в footer */
	let dateFooter = document.querySelector('.footer-date');

	dateFooter.innerHTML = "© " + new Date().getFullYear();

	/* Кнопка для прокрутки наверх */

	// Используется Intersection Observer API: вызов функции при пересечении элемента с root или viewport (область просмотра)

	// элемент для отслеживания

	let target = document.querySelector('.footer'); // отслеживаемый эл.
	let scrollToTopBtn = document.querySelector('.scrollToTopBtn');
	let rootElement = document.documentElement; // область просмотра (html)

	// Функция, ко-я вызывается при пересечении этого эл.(footer) и области видимости
	function callback(entries, observer) {
		// обратный вызов вернёт массив записей, даже если наблюдается 1 эл.
		for (let i = 0; i < entries.length; i++) {

			if (entries[i].isIntersecting) { // если пересекается
				// показываем кнопку, добавл. класс без прозрачности
				scrollToTopBtn.classList.add('showBtn');
			} else {
				// скрываем кнопку
				scrollToTopBtn.classList.remove('showBtn');
			}
		}
	}

	// Создаём экземпляр наблюдателя с функцией, ко-ю создали выше
	let observer = new IntersectionObserver(callback);

	// Наблюдаем за нашим элементом асинхронно(footer)
	observer.observe(target);

	/* end кнопка вверх */

});
