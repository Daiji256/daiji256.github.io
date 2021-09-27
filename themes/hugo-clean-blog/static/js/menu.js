window.onload = function () {
	document.getElementById('header_btn').addEventListener('click', function () {
		document.getElementById('header_btn').classList.toggle('js-active');
		document.getElementById('header_menu').classList.toggle('js-active');
	});
	document.addEventListener('touchstart', (e) => {
		if (!e.target.closest('.header-btn') && !e.target.closest('.header-menu ul')) {
			document.getElementById('header_btn').classList.remove("js-active");
			document.getElementById('header_menu').classList.remove("js-active");
		}
	});
	document.addEventListener('mousedown', (e) => {
		if (!e.target.closest('.header-btn') && !e.target.closest('.header-menu ul')) {
			document.getElementById('header_btn').classList.remove("js-active");
			document.getElementById('header_menu').classList.remove("js-active");
		}
	});
};
