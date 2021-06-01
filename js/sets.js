var set_view = "";
var missing_img = 0;

function preLoadImgs(param_len) {
    console.log("preLoadImgs() called");
    img_load_count = 0;
	for(i = 0; i < param_len; i++) {
		imageObj = new Image();
		imageObj.onload = function() {
			imagesLoadedCount(this.src, param_len, this.width, this.height);
		}
		imageObj.onerror = function() {
            imagesLoadedCount(this.src, param_len, 0, 0);
		}
		imageObj.src = "https://images.brickset.com/sets/small/" + sets_array[i].set_number + "-1.jpg?" + i;
	}
}
function imagesLoadedCount(param_src, param_len, param_width, param_height) {
	var temp = param_src.split('?');
	img_load_count++;
	sets_array[parseInt(temp[1])].img_width = parseInt(param_width);
	sets_array[parseInt(temp[1])].img_height = parseInt(param_height);
	if(img_load_count == param_len) {
        console.log("All images loaded.");
        img_load_count = 0;
        loadPage(current_page);
	}
}

function showSets() {
	console.log("showSets() called");
    var set_len = sets_array.length;
    var temp_html = "";
    var ratio_break_point = 1;
    temp_html += `<div class="grid-container grid-container-sets">`;
	for(i = 0; i < set_len; i++) {
        temp_html += buildSetCards(ratio_break_point, i);
    }
    temp_html += "</div>";
    
    $('.shell').html(temp_html);
    $('.card-sets').on('click', viewSet);
    $('main').show();
}

function buildSetOptions() {
    var temp_html = "";
    temp_html += `<li>`;
        temp_html += `<a class="options-add">Add Set</a>`;
    temp_html += `</li>`;

    temp_html += `<li class="options-divider">`;
        temp_html += `<p class="search-instructions">Search set names or nmbers.</p>`;
        temp_html += `<p class="search-instructions">Partial names and numbers work</p>`;
        temp_html += `<div class="options-search">`;
            temp_html += `<input type="text" class="search-bar" id="search-bar" name="search-bar" placeholder="Set name or number">`;
            temp_html += `<div class="search-icon" data-filter="search">`;
                temp_html += `<i class="fas fa-search"></i>`;
            temp_html += `</div>`;
        temp_html += `</div>`;
        temp_html += `<p class="search-error">Please enter only numbers.</p>`;
    temp_html += `</li>`;

    temp_html += `<li class="options-divider">`;
        temp_html += `<a class="options-filter" data-filter="non-retired">Non-Retired</a>`;
    temp_html += `</li>`;
    temp_html += `<li>`;
        temp_html += `<a class="options-filter" data-filter="retired">Retired</a>`;
    temp_html += `</li>`;
    temp_html += `<li class="options-divider">`;
        temp_html += `<a class="options-filter" data-filter="built">Built</a>`;
    temp_html += `</li>`;
    temp_html += `<li>`;
        temp_html += `<a class="options-filter" data-filter="unbuilt">To Be Built</a>`;
    temp_html += `</li>`;
    temp_html += `<li>`;
        temp_html += `<a class="options-filter" data-filter="sorted">Sorted</a>`;
    temp_html += `</li>`;
    temp_html += `<li class="options-divider">`;
        temp_html += `<a class="options-filter" data-filter="all">All</a>`;
    temp_html += `</li>`;
    $('.options').html(temp_html);
    $('.options-add').on('click', addSet);
    $('.options-filter').on('click', function() {
        if($(this).data('filter') == "all") {
            showSets();
        } else {
            showFilteredSets($(this).data('filter'));
        }
        $('.choices').prop('checked', false);
    });
    $('.search-icon').on('click', searchSets);
}

function searchSets(e) {
    e.preventDefault;
    console.log("searchSets() called");
    console.log("$(#search-bar).val():", $('#search-bar').val());

    $('.search-error').hide();
    $('.choices').prop('checked', false);
    search_string = dataCleanUp($('#search-bar').val());

    getSetsSearchResultsPromise(search_string).then(function(resolve) {
        console.log("Sets Search Results Loaded.");
    }).catch(function(reject) {
        console.log("Sets Search Results NOT Loaded!");
    }).finally(function() {
        $('#search-bar').val('');
        // buildDesignIdsSearchResults();
        showFilteredSets($(e.currentTarget).data('filter'));
    });
}

function showFilteredSets(param_filter) {
    console.log("showFilteredSets called");

    var set_len = sets_array.length;
    var temp_html = "";
    var ratio_break_point = 1;
    temp_html += `<div class="grid-container grid-container-sets">`;

    switch(param_filter) {
        case "non-retired":
            for(i = 0; i < set_len; i++) {
                if(parseInt(sets_array[i].retired) == 0) {
                    temp_html += buildSetCards(ratio_break_point, i);
                }
            }
            break;

        case "retired":
            for(i = 0; i < set_len; i++) {
                if(parseInt(sets_array[i].retired) == 1) {
                    temp_html += buildSetCards(ratio_break_point, i);
                }
            }
            break;

        case "built":
            for(i = 0; i < set_len; i++) {
                if(parseInt(sets_array[i].built) > 0 && parseInt(sets_array[i].sorted) == 0) {
                    temp_html += buildSetCards(ratio_break_point, i);
                }
            }
            break;

        case "unbuilt":
            for(i = 0; i < set_len; i++) {
                if(parseInt(sets_array[i].built) < parseInt(sets_array[i].quantity) && parseInt(sets_array[i].sorted) == 0) {
                    temp_html += buildSetCards(ratio_break_point, i);
                }
            }
            break;

        case "sorted":
            for(i = 0; i < set_len; i++) {
                if(parseInt(sets_array[i].built) == 0 && parseInt(sets_array[i].sorted) == 1) {
                    temp_html += buildSetCards(ratio_break_point, i);
                }
            }
            break;
        
        case "search":
            var res_len = search_results_array.length;
            for(q = 0; q < res_len; q++) {
                for(i = 0; i < set_len; i++) {
                    if(search_results_array[q].pk_id === sets_array[i].pk_id) {
                        temp_html += buildSetCards(ratio_break_point, i);
                    }
                }
            }
            break;
    }
    temp_html += "</div>";
    $('.shell').html(temp_html);
    $('.card-sets').on('click', viewSet);
    $('main').show();
}

function viewSet(e) {
	console.log("viewSet() called");
    e.preventDefault();
    $('.choices').prop('checked', false);
    sel_i = -1;
    sel_i = $(e.currentTarget).data('index');
    missing_img = $(e.currentTarget).children(0).data('image');
    set_view = "update";
	loadModal("set-modal");
}
function addSet(e) {
    console.log("addSet() Called");
    e.preventDefault;
    $('.choices').prop('checked', false);
    set_view = "add";
	loadModal("set-modal");
}

function showSetModal() {
	console.log("showSetModal() called");
    var temp_html = "";
    temp_html = "<option value='0' selected disabled>Select a Theme</option>";
    for(i = 0; i < themes_array.length; i++) {
        temp_html += `<option value="${themes_array[i].pk_id}"`;
        temp_html += `>${themes_array[i].theme}</option>`;
    }
    $('.set-theme').html(temp_html);

    temp_html = "";
    temp_html = "<option value='0' selected disabled>Select a Sub-Theme</option>";
    for(i = 0; i < sub_themes_array.length; i++) {
        temp_html += `<option value="${sub_themes_array[i].pk_id}"`;
        temp_html += `>${sub_themes_array[i].sub_theme}</option>`;
    }
    $('.set-sub-theme').html(temp_html);
    
    temp_html = "";
    for(i = 0; i < 2; i++) {
        temp_html += `<option value="${i}"`;
        if(i == 0) {
            temp_html += ` selected>No</option>`;
        } else {
            temp_html += `>Yes</option>`;
        }
    }
    $('.set-retired').html(temp_html);

    $('#set-number').on('change', function() {
		$('#set-img').attr('src', "https://images.brickset.com/sets/small/" + $('#set-number').val() + "-1.jpg");
	});

    switch(set_view) {
        case "update":
            $('#set-pk-id').val(sets_array[sel_i].pk_id);

            if(missing_img == 0) {
                $('#set-img').attr('src', 'https://images.brickset.com/sets/small/' + sets_array[sel_i].set_number + '-1.jpg');
            } else {
                $('#set-img').attr('src', '/images/missing_image.jpg');
            }
            
            $('.set-name').val(reverseEntities(sets_array[sel_i].set_name)).prop('disabled', true);
            $('.set-number').val(sets_array[sel_i].set_number).prop('disabled', true);
            $('.set-pieces').val(Intl.NumberFormat().format(sets_array[sel_i].num_pieces)).prop('disabled', true);
            $('.set-price').val(Intl.NumberFormat().format(sets_array[sel_i].price)).prop('disabled', true);
            $('.set-year').val(sets_array[sel_i].year).prop('disabled', true);
            $('.set-minifigures').val(Intl.NumberFormat().format(sets_array[sel_i].num_minifigs)).prop('disabled', true);

            $('.set-theme').val(parseInt(sets_array[sel_i].fk_theme)).prop('selected', true).prop('disabled', true);
            $('.set-sub-theme').val(parseInt(sets_array[sel_i].fk_sub_theme)).prop('selected', true).prop('disabled', true);

            $('.set-quantity').val(Intl.NumberFormat().format(sets_array[sel_i].quantity)).prop('disabled', true);
            $('.set-built').val(Intl.NumberFormat().format(sets_array[sel_i].built)).prop('disabled', true);
            $('.set-sort').val(Intl.NumberFormat().format(sets_array[sel_i].sorted)).prop('disabled', true);
            $('.set-build-time').val(Intl.NumberFormat().format(sets_array[sel_i].build_time_minutes)).prop('disabled', true);
            $('.set-weight-lbs').val(Intl.NumberFormat().format(sets_array[sel_i].weight_lbs)).prop('disabled', true);
            $('.set-weight-g').val(Intl.NumberFormat().format(sets_array[sel_i].weight_g)).prop('disabled', true);

            $('.set-retired').val(parseInt(sets_array[sel_i].retired)).prop('selected', true).prop('disabled', true);

            $('.set-retired-year').val(sets_array[sel_i].retired_year).prop('disabled', true);
            $('.set-description').val(reverseEntities(sets_array[sel_i].description)).prop('disabled', true);

            $('.modal-edit').css('visibility', 'visible');
            $('.modal-save').css('visibility', 'hidden');
            $('.modal-delete').hide();
            break;

        case "add":
            $('.modal-edit').css('visibility', 'hidden');
            $('.modal-save').css('visibility', 'visible');
            $('.modal-delete').hide();
            break;

        default:
            break;
    }

    if($('#set-sub-theme').val() == null) {
        $('#set-sub-theme').val(0);
    }

    $('.modal-edit').on('click', editSet);
    $('.modal-save').on('click', saveSet);
    $('.modal-delete').on('click', deleteSet);
    $('.modal-content').on('click', function(e) {
		e.preventDefault();
    	e.stopPropagation();
    	e.stopImmediatePropagation();
	});
    $('.modal-close').on('click', function(e) {
        $('.modal').hide();
    });
    
    $('.modal').show();
}

function editSet(e) {
    e.preventDefault();
    console.log("editSet() called");
    $('input').prop('disabled', false);
    $('select').prop('disabled', false);
    $('textarea').prop('disabled', false);
    $('.modal-save').css('visibility', 'visible');
    $('.modal-delete').show();
}

function saveSet(e) {
    e.preventDefault();
    console.log("saveSet() called");
    var should_add = true;
    var temp_error = "<h3>Please fix the following errors:</h3><div class='error-grid'>";

    if($('#set-name').val() == "") {
        should_add = false;
        // Add warning that a name must be entered
        console.log("Add name");
        temp_error += "<p class='set-error'>Set Name cannot be blank</p>";
    }
    if($('#set-number').val() == "") {
        should_add = false;
        // Add warning that a number must be entered
        console.log("Add number");
        temp_error += "<p class='set-error'>Set Number cannot be blank</p>";
    }
    if($('#set-pieces').val() == "") {
        should_add = false;
        // Add warning that a piece count must be entered
        console.log("Add pieces");
        temp_error += "<p class='set-error'>Pieces cannot be blank</p>";
    }
    if($('#set-price').val() == "") {
        should_add = false;
        // Add warning that a price must be entered
        console.log("Add price");
        temp_error += "<p class='set-error'>Price cannot be blank</p>";
    }
    if($('#set-year').val() == "") {
        should_add = false;
        // Add warning that a year must be entered
        console.log("Add year");
        temp_error += "<p class='set-error'>Year cannot be blank</p>";
    }

    if($('#set-theme').val() == null) {
        should_add = false;
        // Add warning that a Theme must be chosen
        console.log("Add theme");
        temp_error += "<p class='set-error'>Theme cannot be blank</p>";
    }

    if(parseInt($('#set-quantity').val()) == 0) {
        should_add = false;
        // Add warning that a quantity must be entered
        console.log("Add quantity");
        temp_error += "<p class='set-error'>Quantity cannot be 0</p>";
    }

    var temp_count = parseInt($('#set-built').val().trim()) + parseInt($('#set-sort').val().trim());
    if(parseInt($('#set-quantity').val().trim()) < temp_count) {
        should_add = false;
        // Add warning that total sets is less than sum of built and sorted
        console.log("Quantity is lees than sum of built and sorted");
        temp_error += "<p class='set-error'>Quantity cannot be less than sum of Built and Sorted</p>";
    }

    if(parseInt($('#set-retired').val()) == 1 && $('#set-retired-year').val() == "") {
        should_add = false;
        // Add warning that a retired year must be entered
        console.log("Add retired year");
        temp_error += "<p class='set-error'>Retired Year cannot be blank</p>";
    }

    if(should_add) {
        updateSetsPromise(set_view).then(function(resolve) {
            console.log("Sets Updated.");
        }).catch(function(reject) {
            console.log("Sets NOT Updated!");
        }).finally(function() {
            console.log("Moving on now.");

            getSetsPromise().then(function(resolve) {
                console.log("Sets Loaded.");
            }).catch(function(reject) {
                console.log("Sets NOT Loaded!");
            }).finally(function() {
                console.log("Fresh Sets.");
                $('.modal').hide();
                loader();
                preLoadImgs(sets_array.length);
            });

        });
    } else {
        $('.add-errors').html(temp_error).show();
    }
}

function deleteSet(e) {
    e.preventDefault();
    console.log("deleteSet() called");

    deleteSetPromise(sets_array[sel_i].pk_id).then(function(resolve) {
        console.log("Set Deleted.");
    }).catch(function(reject) {
        console.log("Set NOT Deleted!");
    }).finally(function() {
        
        getSetsPromise().then(function(resolve) {
            console.log("Sets Loaded.");
        }).catch(function(reject) {
            console.log("Sets NOT Loaded!");
        }).finally(function() {
            console.log("Fresh Sets.");
            $('.modal').hide();
            loader();
            preLoadImgs(sets_array.length);
        });

    });
}