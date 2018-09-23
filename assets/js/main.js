// main.js

$('ul.navbar-nav li.dropdown').hover(function() {
	$(this).find('.dropdown-menu').show();
}, function() {
	$(this).find('.dropdown-menu').hide();
});
