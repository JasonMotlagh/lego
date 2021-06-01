var des_id_action = "";
var chosen_search_index = -1;

function buildDesignIdOptions() {
    var temp_html = "";
    // var temp_len = cases_array.length;
    temp_html += `<li >`;
        temp_html += `<a class="options-add">Add Design ID</a>`;
    temp_html += `</li>`;

    temp_html += `<li class="options-divider">`;
        temp_html += `<p class="search-instructions">Search Design ID's. Partial numbers/names work</p>`;
        temp_html += `<div class="options-search">`;
            temp_html += `<input type="text" class="search-bar" id="search-bar" name="search-bar" placeholder="Design ID">`;
            temp_html += `<div class="search-icon">`;
                temp_html += `<i class="fas fa-search"></i>`;
            temp_html += `</div>`;
        temp_html += `</div>`;
        temp_html += `<p class="search-error">Please enter only numbers.</p>`;
    temp_html += `</li>`;

    $('.options').html(temp_html);
    $('.options-add').on('click', addDesignId);

    $('.search-icon').on('click', searchDesignIds);
    showDesignIds();
}

function showDesignIds() {
    console.log("showDesignIds() called");
    var temp_html = "";
    var temp_title = "";

    temp_title += `<div class="page-title"><h3>LEGO&reg; Design ID's</h3></div>`;
    temp_html += `<div class="card welcome-container">`;
        temp_html += `<p>From the options menu <i class="nav-spacer fas fa-cogs"></i>, you can search for a specific Design ID to view/edit.</p>`;
        temp_html += `<p>You may also add a new Design ID.</p>`;
    temp_html += `</div>`;

    $('.shell').html(temp_title + temp_html);
}

function addDesignId(e) {
    console.log("addDesignId() Called");
    e.preventDefault;
    des_id_action = "add";
    $('.choices').prop('checked', false);
	loadModal("designids-modal");
}

function showDesignIdsModal() {
	console.log("showDesignIdsModal() called");
    var temp_html = "";
    temp_html += `<input type="hidden" id="did-pk-id" name="did-pk-id" value="-1" disabled>`
    temp_html += `<label class="did-design-id-title" for="did-design-id">Design ID:</label>`;

    switch(des_id_action) {
        case "add":
            temp_html += `<input class="did-design-id" type="number" id="did-design-id" name="did-design-id" value="">`;
            break;
        
        case "edit":
            temp_html += `<select class="did-design-id" id="did-design-id" name="did-design-id">`;   
                temp_html += `<option value='0' selected disabled>Select a Design ID</option>`;
                for(i = 0; i < design_ids_array.length; i++) {
                    temp_html += `<option value="${design_ids_array[i].design_id_pk}"`;
                    temp_html += `>${design_ids_array[i].piece_design_id}</option>`;
                }
            temp_html   += `</select> `;
            break;
    }

    temp_html += `<div class="did-sub-grid did-name-grid">`;
        temp_html += `<label for="did-name">Name:</label>`;
        temp_html += `<select class="did-name" id="did-name" name="did-name">`;
            temp_html += "<option value='0' selected disabled>Select a Name</option>";
            for(i = 0; i < names_array.length; i++) {
                temp_html += `<option value="${names_array[i].pk_id}"`;
                temp_html += `>${names_array[i].name}</option>`;
            }
        temp_html += `</select>`;
        temp_html += `<label for="did-name-new">- or -</label>`;
        temp_html += `<input class="did-name-new" type="text" id="did-name-new" name="did-name-new" value="" placeholder="New Name">`;
    temp_html += `</div>`;
    temp_html += `<div class="did-sub-grid did-sub-name-grid">`;
        temp_html += `<label for="did-sub-name">Sub-Name:</label>`;
        temp_html += `<select class="did-sub-name" id="did-sub-name" name="did-sub-name">`;
            temp_html += `<option value='0' selected disabled>Select a Sub-Name</option>`;
            for(i = 0; i < sub_names_array.length; i++) {
                temp_html += `<option value="${sub_names_array[i].pk_id}"`;
                temp_html += `>${sub_names_array[i].sub_name}</option>`;
            }
        temp_html += `</select>`;
        temp_html += `<label for="did-sub-name-new">- or -</label>`;
        temp_html += `<input class="did-sub-name-new" type="text" id="did-sub-name-new" name="did-sub-name-new" value="" placeholder="New Sub-Name">`;
    temp_html += `</div>`;

    temp_html += `<div class="did-sub-grid did-category-grid">`;
        temp_html += `<label for="did-category">Category:</label>`;
        temp_html += `<select class="did-category" id="did-category" name="did-category">`;
            temp_html += `<option value='0' selected disabled>Select a Category</option>`;
            for(i = 0; i < categories_array.length; i++) {
                temp_html += `<option value="${categories_array[i].pk_id}"`;
                temp_html += `>${categories_array[i].category}</option>`;
            }
        temp_html += `</select>`;
        temp_html += `<label for="did-category-new">- or -</label>`;
        temp_html += `<input class="did-category-new" type="text" id="did-category-new" name="did-category-new" value="" placeholder="New Category">`;
    temp_html += `</div>`;
    temp_html += `<div class="did-sub-grid did-sub-category-grid">`;
        temp_html += `<label for="did-sub-category">Sub-Category:</label>`;
        temp_html += `<select class="did-sub-category" id="did-sub-category" name="did-sub-category">`;
            temp_html += `<option value='0' selected disabled>Select a Sub-Category</option>`;
            for(i = 0; i < sub_categories_array.length; i++) {
                console.log(i + " : " + sub_categories_array[i].pk_id + " : " + sub_categories_array[i].sub_category);
                temp_html += `<option value="${sub_categories_array[i].pk_id}"`;
                temp_html += `>${sub_categories_array[i].sub_category}</option>`;
            }
        temp_html += `</select>`;
        temp_html += `<label for="did-sub-category-new">- or -</label>`;
        temp_html += `<input class="did-sub-category-new" type="text" id="did-sub-category-new" name="did-sub-category-new" value="" placeholder="New Sub-Category">`;
    temp_html += `</div>`;
    $('.modal-body').html(temp_html);

    switch(des_id_action) {
        case "add":
            $('.modal-edit').css('visibility', 'hidden');
            $('.modal-save').css('visibility', 'visible');
            break;
        
        case "edit":
            $('#did-pk-id').val(`${search_results_array[chosen_search_index].pk_id}`).prop('selected', true).prop('disabled', true);
            $('.did-design-id').val(`${search_results_array[chosen_search_index].pk_id}`).prop('selected', true).prop('disabled', true);
            $('.did-name').val(`${search_results_array[chosen_search_index].name_pk_id}`).prop('selected', true).prop('disabled', true);
            $('.did-sub-name').val(`${search_results_array[chosen_search_index].sub_name_pk_id}`).prop('selected', true).prop('disabled', true);
            $('.did-category').val(`${search_results_array[chosen_search_index].category_pk_id}`).prop('selected', true).prop('disabled', true);
            $('.did-sub-category').val(`${search_results_array[chosen_search_index].sub_category_pk_id}`).prop('selected', true).prop('disabled', true);
            $('.modal-edit').css('visibility', 'visible');
            $('.modal-save').css('visibility', 'hidden');
            break;
    }

    addSelectInputEventListeners();
    $('.modal-edit').on('click', editDesignIds);
    $('.modal-save').on('click', saveDesignIds);
    $('.modal-content').on('click', function(e) {
		e.preventDefault();
    	e.stopPropagation();
    	e.stopImmediatePropagation();
	});
    $('.modal-close').on('click', function(e) {
        $('.modal').hide();
    });
    $('.modal-footer').hide();
    
    $('.modal').show();
}

function editDesignIds(e) {
    console.log("editDesignIds called");
    e.preventDefault;
    $('input').prop('disabled', false);
    $('select').prop('disabled', false);
    $('.did-design-id').prop('disabled', true);
    $('.modal-save').css('visibility', 'visible');
}

function saveDesignIds(e) {
    e.preventDefault();
    console.log("saveDesignIds called");
    var should_add = true;
    var temp_error = "<h3>Please fix the following errors:</h3><div class='error-grid'>";
    
    if($('#did-design-id').val() == "") {
        should_add = false;
        // Add warning that a name must be entered
        console.log("Add design id");
        temp_error += "<p class='set-error'>Design ID cannot be blank</p>";
    }
    if($('#did-name').val() == null && $('#did-name-new').val() == "") {
        should_add = false;
        // Add warning that a name must be entered
        console.log("Add name");
        temp_error += "<p class='set-error'>Name cannot be blank</p>";
    }
    if($('#did-category').val() == null && $('#did-category-new').val() == "") {
        should_add = false;
        // Add warning that a name must be entered
        console.log("Add category");
        temp_error += "<p class='set-error'>Category cannot be blank</p>";
    }
    console.log("should_add:", should_add);

    if(should_add) {
        saveDesignIdsPromise().then(function(resolve) {
            console.log("Save Design ID Loaded.");
        }).catch(function(reject) {
            console.log("Save Design ID NOT Loaded!");
        }).finally(function() {
            
            getDesignIdsPromise().then(function(resolve) {
                console.log("Design Ids Loaded.");
            }).catch(function(reject) {
                console.log("Design Ids NOT Loaded!");
            }).finally(function() {
                console.log("Moving On.");
                $('#search-bar').val('');
                $('.modal').hide();
                loader();
                loadPage(current_page);
            });
        });
    } else {
        $('.add-errors').html(temp_error).show();
    }
}

function searchDesignIds() {
    console.log("searchDesignIds() called");
    console.log("$(#search-bar).val():", $('#search-bar').val());

    $('.search-error').hide();
    $('.choices').prop('checked', false);
    search_string = dataCleanUp($('#search-bar').val());

    getDesignIdsSearchResultsPromise(search_string).then(function(resolve) {
        console.log("Design ID's Search Results Loaded.");
    }).catch(function(reject) {
        console.log("Design ID's Search Results NOT Loaded!");
    }).finally(function() {
        $('#search-bar').val('');
        buildDesignIdsSearchResults();
    });
}

function buildDesignIdsSearchResults() {
    var temp_title = "";
    var temp_html = "";
    var temp_len = search_results_array.length;

    if(temp_len == 0) {
        temp_title += `<div class="page-title"><h3>Design ID&apos;s Search Results</h3></div>`;
        temp_html += `<div class="welcome-container">`;
            temp_html += `<p>Your search for '<span class="search-string">${search_string}</span>' produced no results.</p>`;
            temp_html += `<p>Please try refining your search.</p>`;
        temp_html += `</div>`;
    } else {
        temp_title += `<div class="page-title">`;
            temp_title += `<h3>Design ID&apos;s Search Results for '${search_string}'</h3>`;
            temp_title += `<p><span class="search-string">${temp_len}</span> results found.</p>`;
        temp_title += `</div>`;
        temp_html += `<div class="grid-container-designid-search">`;
        for(i = 0; i < temp_len; i++) {
            temp_html += `<div class="card card-designid-search-results" data-desid="${search_results_array[i].pk_id}" data-searchindex="${i}">`;

                temp_html += `<p>Design ID:</p>`;
                temp_html += `<p>${search_results_array[i].design_id}</p>`;
                temp_html += `<p>Name:</p>`;
                temp_html += `<p>${search_results_array[i].name}</p>`;

                temp_html += `<p>Sub-Name:</p>`;
                if(search_results_array[i].sub_name == null) {
                    temp_html += `<p>NA</p>`;
                } else {
                    temp_html += `<p>${search_results_array[i].sub_name}</p>`;
                }
                
                temp_html += `<p>Category:</p>`;
                temp_html += `<p>${search_results_array[i].category}</p>`;

                temp_html += `<p>Sub-Category:</p>`;
                if(search_results_array[i].sub_category == null) {
                    temp_html += `<p>NA</p>`;
                } else {
                    temp_html += `<p>${search_results_array[i].sub_category}</p>`;
                }
                
            temp_html += "</div>";
        }
        temp_html += "</div>";
    }

    $('.shell').html(temp_title + temp_html);
    $('.card-designid-search-results').on('click', function() {
        // sel_case_pk_id = parseInt($(this).data('designid'));
        // buildInventory();
        console.log("Design ID clicked");
        console.log($(this).data('desid'));
        console.log($(this).data('searchindex'));
        chosen_search_index = parseInt($(this).data('searchindex'));
        des_id_action = "edit";
        loadModal("designids-modal");
    });
    $('main').show();
}

function addSelectInputEventListeners() {
    // Name/New Name Events
        $('.did-name').change(function() {
            if($('.did-name').val() != null) {
                $('.did-name-new').val('');
            }
        });
        $('.did-name-new').on('input', function() {
            if($('.did-name-new').val() != "") {
                $('.did-name').val(0);
            }
        });

    // Sub-Name/New Sub-Name Events
        $('.did-sub-name').change(function() {
            if($('.did-sub-name').val() != null) {
                $('.did-sub-name-new').val('');
            }
        });
        $('.did-sub-name-new').on('input', function() {
            if($('.did-sub-name-new').val() != "") {
                $('.did-sub-name').val(0);
            }
        });

    // Category/New Category Events
        $('.did-category').change(function() {
            if($('.did-category').val() != null) {
                $('.did-category-new').val('');
            }
        });
        $('.did-category-new').on('input', function() {
            if($('.did-category-new').val() != "") {
                $('.did-category').val(0);
            }
        });

    // Sub-Category/New Sub-Category Events
        $('.did-sub-category').change(function() {
            if($('.did-sub-category').val() != null) {
                $('.did-sub-category-new').val('');
            }
        });
        $('.did-sub-category-new').on('input', function() {
            if($('.did-sub-category-new').val() != "") {
                $('.did-sub-category').val(0);
            }
        });
}