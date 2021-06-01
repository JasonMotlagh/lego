$(document).ready(function() {
	loader();
	
	$('.navbar-link').on('click', function() {
		loader();
		current_page = $(this).data('page');
		switch(current_page) {
			case "sets":
				preLoadImgs(sets_array.length);	
				break;

			default:
				loadPage(current_page);
				break;
		}
	});
	
	$('.nav-logo').on('click', function() {
		window.location.href = '/';
	});

	$('.drop-menu').change(function() {
		$('.choices').prop('checked', false);
	});

	// $('.modal').on('click', function(e) {
	// 	$('.modal').hide();
	// });

	// console.log = function() {};
	checkDevice(js_mediaQuery);
	js_mediaQuery.addListener(checkDevice);
	getAllArrays();

});

function getAllArrays() {
	getColorsPromise().then(function(resolve) {
		console.log("Colors Loaded.");
	}).catch(function(reject) {
		console.log("Colors NOT Loaded!");
	}).finally(function() {

		getCasesPromise().then(function(resolve) {
			console.log("Cases Loaded.");
		}).catch(function(reject) {
			console.log("Cases NOT Loaded!");
		}).finally(function() {

			getThemesPromise().then(function(resolve) {
				console.log("Themes Loaded.");
			}).catch(function(reject) {
				console.log("Themes NOT Loaded!");
			}).finally(function() {

				getSubThemesPromise().then(function(resolve) {
					console.log("Sub Themes Loaded.");
				}).catch(function(reject) {
					console.log("Sub Themes NOT Loaded!");
				}).finally(function() {
					
					getCategoriesPromise().then(function(resolve) {
						console.log("Categories Loaded.");
					}).catch(function(reject) {
						console.log("Categories NOT Loaded!");
					}).finally(function() {

						getSubCategoriesPromise().then(function(resolve) {
							console.log("Sub Categories Loaded.");
						}).catch(function(reject) {
							console.log("Sub Categories NOT Loaded!");
						}).finally(function() {

							getNamesPromise().then(function(resolve) {
								console.log("Names Loaded.");
							}).catch(function(reject) {
								console.log("Names NOT Loaded!");
							}).finally(function() {

								getSubNamesPromise().then(function(resolve) {
									console.log("Sub Names Loaded.");
								}).catch(function(reject) {
									console.log("Sub Names NOT Loaded!");
								}).finally(function() {

									getSetsPromise().then(function(resolve) {
										console.log("Sets Loaded.");
									}).catch(function(reject) {
										console.log("Sets NOT Loaded!");
									}).finally(function() {

										getDesignIdsPromise().then(function(resolve) {
											console.log("Design Ids Loaded.");
										}).catch(function(reject) {
											console.log("Design Ids NOT Loaded!");
										}).finally(function() {
											$('nav').css('visibility', 'visible');
											welcomeScreen();
										});

									});

								});

							});

						});

					});

				});

			});

		});

	});
}

function loader() {
	closeDropdownNavbar();
	$('.choices').prop('checked', false);
	$('main').html(loader_html);
}

function welcomeScreen() {
	var temp_html = "";
	temp_html += `<div class="page-title"><h3>LEGO&reg; Collection App</h3></div>`;
	temp_html += `<div class="card welcome-container">`;
		temp_html += `<p>Welcome to my little app. Here you can view piece inventory, sets, and even design id's. from my collection. There is also a fun section with stastics about the collection.</p>`;
		temp_html += `<p>I can update exsisting inventory and sets as well as add new ones.</p>`;
		temp_html += `<p>Choose a section from the navigation/hamburger menu above.</p>`;
		temp_html += `<p>If options are available for the section, this icon '<i class="nav-spacer fas fa-cogs"></i>' will appear in the upper left corner. Click/tap it to see them for the section.</p>`;
	temp_html += `</div>`;
	$('main').html(temp_html);

	var temp_nav_height = parseInt($('nav').height()) + parseInt($('nav').css('margin-bottom'));
	var temp_body_top_margin = parseInt($('body').css('margin-top'));
	$('.options-container').css('top', (temp_nav_height + temp_body_top_margin + 5));
}

function scrollToTop() {
	window.scrollTo(0, 0);
}