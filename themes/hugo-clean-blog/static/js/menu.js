window.onload = function () {
	document.getElementById('menu_button').addEventListener('click', function () {
		document.getElementById('menu_button_bars').classList.toggle('js-active');
		document.getElementById('header_menu').classList.toggle('js-active');
	});
	document.addEventListener('touchstart', (e) => {
		if (!e.target.closest('.menu-button') && !e.target.closest('.header-menu ul')) {
			document.getElementById('menu_button_bars').classList.remove("js-active");
			document.getElementById('header_menu').classList.remove("js-active");
		}
	});
	document.addEventListener('mousedown', (e) => {
		if (!e.target.closest('.menu-button') && !e.target.closest('.header-menu ul')) {
			document.getElementById('menu_button_bars').classList.remove("js-active");
			document.getElementById('header_menu').classList.remove("js-active");
		}
	});
};
