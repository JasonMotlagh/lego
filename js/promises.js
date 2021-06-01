function getColorsPromise() {
	console.log("getColorsPromise() called");
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/get-color-chart.php",
			type: 'POST',
			cache: false,
			dataType: 'json',

			success: function (data) {
				colors_array = [];
				colors_array = data;
				resolve(true);
			},

			error: function(xhr, desc, err) {
				reject(false);
				console.log(xhr)
				console.log("Details: " + desc + "\nError:" + err);
				console.log("getColorsPromise():Something broke");
			}
		});
	});
}

function getCasesPromise() {
	console.log("getCasesPromise() called");
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/get-cases.php",
			type: 'POST',
			cache: false,
			dataType: 'json',

			success: function (data) {
				cases_array = [];
				cases_array = data;
				resolve(true);
			},

			error: function(xhr, desc, err) {
				reject(false);
				console.log(xhr)
				console.log("Details: " + desc + "\nError:" + err);
				console.log("getCasesPromise():Something broke");
			}
		});
	});
}

function getThemesPromise() {
	console.log("getThemesPromise() called");
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/get-themes.php",
			type: 'POST',
			cache: false,
			dataType: 'json',

			success: function (data) {
				themes_array = [];
				themes_array = data;
				resolve(true);
			},

			error: function(xhr, desc, err) {
				reject(false);
				console.log(xhr)
				console.log("Details: " + desc + "\nError:" + err);
				console.log("getThemesPromise():Something broke");
			}
		});
	});
}

function getSubThemesPromise() {
	console.log("getSubThemesPromise() called");
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/get-sub-themes.php",
			type: 'POST',
			cache: false,
			dataType: 'json',

			success: function (data) {
				sub_themes_array = []
				sub_themes_array = data;
				resolve(true);
			},

			error: function(xhr, desc, err) {
				reject(false);
				console.log(xhr)
				console.log("Details: " + desc + "\nError:" + err);
				console.log("getSubThemesPromise():Something broke");
			}
		});
	});
}

// function getNamesPromise() {
// 	console.log("getNamesPromise() called");
// 	return new Promise(function(resolve, reject) {
// 		$.ajax({
// 			url: "includes/get-names.php",
// 			type: 'POST',
// 			cache: false,
// 			dataType: 'json',

// 			success: function (data) {
// 				names_array = [];
// 				names_array = data;
// 				resolve(true);
// 			},

// 			error: function(xhr, desc, err) {
// 				reject(false);
// 				console.log(xhr)
// 				console.log("Details: " + desc + "\nError:" + err);
// 				console.log("getNamesPromise():Something broke");
// 			}
// 		});
// 	});
// }

function getCategoriesPromise() {
	console.log("getCategoriesPromise() called");
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/get-categories.php",
			type: 'POST',
			cache: false,
			dataType: 'json',

			success: function (data) {
				categories_array = [];
				categories_array = data;
				resolve(true);
			},

			error: function(xhr, desc, err) {
				reject(false);
				console.log(xhr)
				console.log("Details: " + desc + "\nError:" + err);
				console.log("getCategoriesPromise():Something broke");
			}
		});
	});
}

function getSubCategoriesPromise() {
	console.log("getSubCategoriesPromise() called");
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/get-sub-categories.php",
			type: 'POST',
			cache: false,
			dataType: 'json',

			success: function (data) {
				sub_categories_array = [];
				sub_categories_array = data;
				resolve(true);
			},

			error: function(xhr, desc, err) {
				reject(false);
				console.log(xhr)
				console.log("Details: " + desc + "\nError:" + err);
				console.log("getSubCategoriesPromise():Something broke");
			}
		});
	});
}

function getNamesPromise() {
	console.log("getNamesPromise() called");
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/get-names.php",
			type: 'POST',
			cache: false,
			dataType: 'json',

			success: function (data) {
				names_array = [];
				names_array = data;
				resolve(true);
			},

			error: function(xhr, desc, err) {
				reject(false);
				console.log(xhr)
				console.log("Details: " + desc + "\nError:" + err);
				console.log("getNamesPromise():Something broke");
			}
		});
	});
}

function getSubNamesPromise() {
	console.log("getSubNamesPromise() called");
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/get-sub-names.php",
			type: 'POST',
			cache: false,
			dataType: 'json',

			success: function (data) {
				sub_names_array = [];
				sub_names_array = data;
				resolve(true);
			},

			error: function(xhr, desc, err) {
				reject(false);
				console.log(xhr)
				console.log("Details: " + desc + "\nError:" + err);
				console.log("getSubNamesPromise():Something broke");
			}
		});
	});
}

function getSetsPromise() {
	console.log("getSetsPromise() called");
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/get-sets.php",
			type: 'POST',
			cache: false,
			dataType: 'json',

			success: function (data) {
				sets_array = [];
				sets_array = data;
				resolve(true);
			},

			error: function(xhr, desc, err) {
				reject(false);
				console.log(xhr)
				console.log("Details: " + desc + "\nError:" + err);
				console.log("getSetsPromise():Something broke");
			}
		});
	});
}

function deleteSetPromise(param_set_pk_id) {
	console.log("deleteSetPromise() called");
	console.log("param_set_pk_id:", param_set_pk_id);
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/delete-set.php",
			type: 'POST',
			cache: false,
			dataType: 'json',
			data: {'set_pk_id': param_set_pk_id},

			success: function (data) {
				console.log("data:", data);
				resolve(true);
			},

			error: function(xhr, desc, err) {
				reject(false);
				console.log(xhr)
				console.log("Details: " + desc + "\nError:" + err);
				console.log("deleteSetPromise():Something broke");
			}
		});
	});
}

function getDesignIdsPromise() {
	console.log("getDesignIdsPromise() called");
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/get-design-ids.php",
			type: 'POST',
			cache: false,
			dataType: 'json',

			success: function (data) {
				design_ids_array = [];
				design_ids_array = data;
				resolve(true);
			},

			error: function(xhr, desc, err) {
				reject(false);
				console.log(xhr)
				console.log("Details: " + desc + "\nError:" + err);
				console.log("getDesignIdsPromise():Something broke");
			}
		});
	});
}

function updateSetsPromise(param_action) {
	console.log("updateSetsPromise() called");
	var temp_sub_theme;
	if($('#set-sub-theme').val() == null) {
        temp_sub_theme = 0;
    } else {
		temp_sub_theme = dataCleanUp($('#set-sub-theme').val());
	}
	console.log("temp_sub_theme:", temp_sub_theme);
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/update-sets.php",
			type: 'POST',
			cache: false,
			dataType: 'json',
			data: {'action': param_action,
				'set_pk_id': dataCleanUp($('#set-pk-id').val()),
				'set_name': dataCleanUp($('#set-name').val()),
				'set_number': dataCleanUp($('#set-number').val()),
				'set_pieces': dataCleanUp($('#set-pieces').val()),
				'set_price': dataCleanUp($('#set-price').val()),
				'set_year': dataCleanUp($('#set-year').val()),
				'set_minifigures': dataCleanUp($('#set-minifigures').val()),
				'set_theme': dataCleanUp($('#set-theme').val()),
				'set_sub_theme': temp_sub_theme,
				'set_quantity': dataCleanUp($('#set-quantity').val()),
				'set_built': dataCleanUp($('#set-built').val()),
				'set_sort': dataCleanUp($('#set-sort').val()),
				'set_build_time': dataCleanUp($('#set-build-time').val()),
				'set_weight_lbs': dataCleanUp($('#set-weight-lbs').val()),
				'set_weight_g': dataCleanUp($('#set-weight-g').val()),
				'set_retired': dataCleanUp($('#set-retired').val()),
				'set_retired_year': dataCleanUp($('#set-retired-year').val()),
				'set_description': dataCleanUp($('#set-description').val())
			},

			success: function (data) {
				set_view = "";
				resolve(true);
			},

			error: function(xhr, desc, err) {
				reject(false);
				console.log(xhr)
				console.log("Details: " + desc + "\nError:" + err);
				console.log("updateSetsPromise():Something broke");
			}
		});

	});
}

function getInventoryPromise(param_case) {
	console.log("getInventoryPromise() called");
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/get-inventory.php",
			type: 'POST',
			cache: false,
			dataType: 'json',
			data: {'case_pk_id': param_case},

			success: function (data) {
				inventory_array = [];
				inventory_array = data;
				resolve(true);
			},

			error: function(xhr, desc, err) {
				reject(false);
				console.log(xhr)
				console.log("Details: " + desc + "\nError:" + err);
				console.log("getInventoryPromise():Something broke");
			}
		});
	});
}
function updateInventoryPromise(param_action) {
	console.log("updateInventoryPromise() called");
	console.log("updateInventoryPromise():param_action:", param_action);
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/update-inventory.php",
			type: 'POST',
			cache: false,
			dataType: 'json',
			data: {'action': param_action,
				'orig_case_pk_id': orig_case_pk_id,
				'orig_col': orig_col,
				'orig_row': orig_row,
				'piece_pk_id': dataCleanUp($('#piece-pk-id').val()),
				'piece_design_pk_id': dataCleanUp($('#piece-design').val()),
				'piece_element': dataCleanUp($('#piece-element').val()),
				'piece_color_pk_id': dataCleanUp($('#piece-color').val().split('-')[0]),
				'piece_cf_pk_id': dataCleanUp($('#piece-color').val().split('-')[1]),
				'piece_quantity': dataCleanUp($('#piece-quantity').val()),
				'piece_case_pk_id': dataCleanUp($('#piece-case').val()),
				'piece_col': dataCleanUp($('#piece-col').val()),
				'piece_row': dataCleanUp($('#piece-row').val()),
				'piece_slot': dataCleanUp($('#piece-slot').val()),
				'piece_sub_slot': dataCleanUp($('#piece-sub-slot').val()),
				'piece_description': dataCleanUp($('#piece-description').val())
			},

			success: function (data) {
				piece_view = "";
				// console.log("data:", data);
				resolve(true);
			},

			error: function(xhr, desc, err) {
				reject(false);
				console.log(xhr)
				console.log("Details: " + desc + "\nError:" + err);
				console.log("updateInventoryPromise():Something broke");
			}
		});
	});
}

function getInvSearchResultsPromise(param_search_value) {
	console.log("getInvSearchResultsPromise() called");
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/search-inventory.php",
			type: 'POST',
			cache: false,
			dataType: 'json',
			data: {'search_value': param_search_value},

			success: function (data) {
				search_results_array = [];
				search_results_array = data;
				resolve(true);
			},

			error: function(xhr, desc, err) {
				reject(false);
				console.log(xhr)
				console.log("Details: " + desc + "\nError:" + err);
				console.log("getInvSearchResultsPromise():Something broke");
			}
		});
	});
}

function saveDesignIdsPromise() {
	console.log("saveDesignIdsPromise() called");
    var temp_sub_name;
	if($('#did-sub-name').val() == null) {
        temp_sub_name = 0;
    } else {
		temp_sub_name = dataCleanUp($('#did-sub-name').val());
	}

	if(dataCleanUp($('#did-sub-name-new').val()).length <= 0) {
		temp_new_sub_name = "";
	} else {
		temp_new_sub_name = dataCleanUp($('#did-sub-name-new').val());
	}

    var temp_sub_category;
	if($('#did-sub-category').val() == null) {
        temp_sub_category = 0;
    } else {
		temp_sub_category = dataCleanUp($('#did-sub-category').val());
	}

	if(dataCleanUp($('#did-sub-category-new').val()).length <= 0) {
		temp_new_sub_category = "";
	} else {
		temp_new_sub_category = dataCleanUp($('#did-sub-category-new').val());
	}

	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/save-designids.php",
			type: 'POST',
			cache: false,
			dataType: 'json',
			data: {'design_pk_id': dataCleanUp($('#did-pk-id').val()),
				'design_id': dataCleanUp($('#did-design-id').val()),
				'name': $('#did-name').val(),
				'name_new': dataCleanUp($('#did-name-new').val()),
				'sub_name': temp_sub_name,
				'sub_name_new': temp_new_sub_name,
				'category': $('#did-category').val(),
				'category_new': dataCleanUp($('#did-category-new').val()),
				'sub_category': temp_sub_category,
				'sub_category_new': temp_new_sub_category
			},

			success: function (data) {
				console.log("data:", data);
				resolve(true);
			},

			error: function(xhr, desc, err) {
				reject(false);
				console.log(xhr)
				console.log("Details: " + desc + "\nError:" + err);
				console.log("saveDesignIdsPromise():Something broke");
			}
		});
	});
}

function getDesignIdsSearchResultsPromise(param_search_value) {
	console.log("getDesignIdsSearchResultsPromise() called");
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/search-designids.php",
			type: 'POST',
			cache: false,
			dataType: 'json',
			data: {'search_value': param_search_value},

			success: function (data) {
				search_results_array = [];
				search_results_array = data;
				resolve(true);
			},

			error: function(xhr, desc, err) {
				reject(false);
				console.log(xhr)
				console.log("Details: " + desc + "\nError:" + err);
				console.log("getDesignIdsSearchResultsPromise():Something broke");
			}
		});
	});
}

function getSetsSearchResultsPromise(param_search_value) {
	console.log("getSetsSearchResultsPromise() called");
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "includes/search-sets.php",
			type: 'POST',
			cache: false,
			dataType: 'json',
			data: {'search_value': param_search_value},

			success: function (data) {
				search_results_array = [];
				search_results_array = data;
				resolve(true);
			},

			error: function(xhr, desc, err) {
				reject(false);
				console.log(xhr)
				console.log("Details: " + desc + "\nError:" + err);
				console.log("getSetsSearchResultsPromise():Something broke");
			}
		});
	});
}