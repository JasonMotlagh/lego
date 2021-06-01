var design_ids_array = [];
var cases_array = [];
var colors_array = [];
var names_array = [];
var sub_names_array = [];
var categories_array = [];
var sub_categories_array = [];
var sets_array = [];
var themes_array = [];
var sub_themes_array = [];
var inventory_array = [];
var img_load_count = 0;
var search_results_array = [];

var current_page = "";
var device_mobile = true;
var sel_i = -1;

var search_entities = ["Ø", "°",
						"\"", "\'",
						"©", "®", "™",
						"à", "á", "À", "Á",
						"è", "é", "È", "É"];
var replace_entities = ["&Oslash;", "&deg;",
						"&quot;", "&apos;",
						"&copy;", "&reg;", "&trade;",
						"&agrave;", "&aacute;", "&Agrave;", "&Aacute;",
						"&egrave;", "&eacute;", "&Egrave;", "&Eacute;"];

const my_url = new URL(window.location.href);
const loader_html = "<div class='load-animation-container'><div class='lds-dual-ring'></div><p>LOADING</p></div>";

// This matches the css media query in navbar.css for changing the menu in the navbar.
const js_mediaQuery = window.matchMedia('(min-width: 540px)');

function closeDropdownNavbar() {
	$('.drop-menu').prop('checked', false);
}

function checkDevice(e) {
	// Check if the media query is true
	if (e.matches) {
		device_mobile = false;
	} else {
		device_mobile = true;
	}
	console.log("device_mobile:", device_mobile);
	optionsCheck(current_page);
}

function optionsCheck(param_page) {
	switch(param_page) {
		case "inventory":
		case "sets":
		case "designIds":
			if(!device_mobile) {
				$('.nav-icon-spacer-container').css('display', 'flex');
				$('#icon-choices').css('display', 'flex');
				$('#icon-choices').css('visibility', 'visible');
			} else {
				$('.nav-icon-spacer-container').css('display', 'flex');
				$('#icon-choices').css('display', 'flex');
				$('#icon-choices').css('visibility', 'visible');
			}
			break;
		
		default:
			if(!device_mobile) {
				$('.nav-icon-spacer-container').hide();
				$('#icon-choices').css('visibility', 'hidden');
			} else {
				$('.nav-icon-spacer-container').css('display', 'flex');
				$('#icon-choices').css('visibility', 'hidden');
			}
			break;
	}
}

function loadPage(param_this) {
	console.log("loadPage() called");
	$("main").load("templates/" + param_this + ".html?nc=" + (Math.random() * 1000000),
		function(responseTxt, statusTxt, xhr) {
			switch(statusTxt) {
				case "success":
					pageCheck(param_this);
					break;

				case "error":
					break;
			}
	});
}

function pageCheck(param_page) {
	console.log("pageCheck(" + param_page + ") called");
	$('.options').html('');
	closeDropdownNavbar();
	current_page = param_page;
	switch(param_page) {
		case "inventory":
			sel_case_pk_id = -1;
			buildInventory();
        	buildInventoryOptions();
			optionsCheck(current_page);
			$('main').show();
			break;

		case "sets":
			showSets();
        	buildSetOptions();
			optionsCheck(current_page);
			break;

		case "designIds":
			// collectPieces();
			// collectPieceIds();
			buildDesignIdOptions();
			optionsCheck(current_page);
			break;

		case "colors":
			collectColors();
			optionsCheck(current_page);
			break;

		case "stats":
			getStatsPromise().then(function(resolve) {
				console.log("Stats Loaded.");
			}).catch(function(reject) {
				console.log("Stats NOT Loaded!");
			}).finally(function() {
				setStats();
			});
			optionsCheck(current_page);
			break;
	}
}

function loadModal(param_template, param_caller) {
	$(".modal").load("templates/" + param_template + ".html?nc=" + (Math.random() * 1000000),
		function(responseTxt, statusTxt, xhr) {
			switch(statusTxt) {
				case "success":
					modalCheck(param_template, param_caller);
					break;

				case "error":
					break;
			}
	});

}

function modalCheck(param_modal) {
	switch(param_modal) {
		case "color-modal":
			showSelectedColor();
			break;

		case "set-modal":
			showSetModal();
			break;

		case "inventory-modal":
			showInventoryModal();
			break;

		case "designids-modal":
			showDesignIdsModal();
			break;
	}
}

function imgErr(param_this, param_type) {
	console.log("imgErr() called");

	switch(param_type) {
		case 'piece':
			$(param_this).on('error', function() {
				$(param_this).off('error');
				$(param_this).attr('src', '/images/missing_image.jpg');
			});
			$(param_this).attr('src', 'https://www.lego.com/cdn/product-assets/element.img.lod4photo.192x192/' + inventory_array[parseInt($(param_this).data('index'))].element_id + '.jpg');
			break;
		
		case 'set':
			$(param_this).off('error');	
			$(param_this).attr('src', '/images/missing_image.jpg');
			break;
	}
}

function buildSetCards(param_rbp, param_i) {
	console.log("buildSetCards() called");
	var temp_html = "";

	var param_ratio = 0;
	if(sets_array[i].img_width > 0) {
		param_ratio = (sets_array[i].img_width / sets_array[i].img_height);
	}

	temp_html += `<div class="card card-sets" data-index="${param_i}">`;
		if(param_ratio === 0) {
			temp_html += `<img src="/images/missing_image.jpg"  class="v-card-sets-img" data-image="1">`;
		}else if(param_ratio < param_rbp) {
			temp_html += `<img src="https://images.brickset.com/sets/small/${sets_array[param_i].set_number}-1.jpg" class="v-card-sets-img" data-image="0" onerror="imgErr(this, 'set')">`;
		} else {
			temp_html += `<img src="https://images.brickset.com/sets/small/${sets_array[param_i].set_number}-1.jpg" class="h-card-sets-img" data-image="0" onerror="imgErr(this, 'set')">`;
		}
		temp_html += `<p>${sets_array[param_i].set_number}</p>`;
		temp_html += `<p>${sets_array[param_i].set_name}</p>`;
		temp_html += `<p>${new Intl.NumberFormat().format(sets_array[param_i].num_pieces)}</p>`;
	temp_html += "</div>";

	return temp_html;
}

function dataCleanUp(param_string) {
	var temp_string = param_string.trim().replace(/&/g, "&amp;");
	var new_string = "";
	var temp_len = search_entities.length;
	for(i = 0; i < temp_len; i++) {
		temp_string = temp_string.replace(new RegExp(search_entities[i], 'g'), replace_entities[i]);
	}

	var temp_array = temp_string.split(',');
	temp_len = temp_array.length;
	for(i = 0; i < temp_len; i++) {
		new_string += temp_array[i];
	}

	return new_string;
}

function reverseEntities(param_string) {
	var temp_string;
	if(typeof param_string == "string") {
		temp_string = param_string.trim().replace(/&amp;/g, "&");
		var temp_len = search_entities.length;
		for(i = 0; i < temp_len; i++) {
			temp_string = temp_string.replace(new RegExp(replace_entities[i], 'g'), search_entities[i]);
		}
		return temp_string;
	}
	
}

function getCaseArrayIndexFromPkId(param_pk_id) {
	// This is the pk_id of the selected case.
		// param_pk_id
	// This locates the item in the array with a matching pk_id.
		// cases_array.find( x => x.pk_id === String(param_pk_id) )
	// This gives the index of the located item in the array
		// cases_array.indexOf( cases_array.find( x => x.pk_id === String(param_pk_id) ) )
	return cases_array.indexOf( cases_array.find( x => x.pk_id === String(param_pk_id) ) );
}