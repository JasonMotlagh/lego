var sel_case_pk_id = -1;

var orig_case_pk_id = 0;
var orig_col = 0;
var orig_row = 0;

var search_string = "";

function buildInventoryOptions() {
    var temp_html = "";
    var temp_len = cases_array.length;
    temp_html += `<li >`;
        temp_html += `<a class="options-add">Add Piece</a>`;
    temp_html += `</li>`;

    temp_html += `<li class="options-divider">`;
        temp_html += `<p class="search-instructions">Search piece ID's. Partial numbers work</p>`;
        temp_html += `<div class="options-search">`;
            temp_html += `<input type="text" class="search-bar" id="search-bar" name="search-bar" placeholder="Design/Element ID">`;
            temp_html += `<div class="search-icon">`;
                temp_html += `<i class="fas fa-search"></i>`;
            temp_html += `</div>`;
        temp_html += `</div>`;
        temp_html += `<p class="search-error">Please enter only numbers.</p>`;
    temp_html += `</li>`;
    
    temp_html += `<h4 class="options-divider">Primary Cases</h4>`;
        for(i = 0; i < temp_len; i++) {
            if(parseInt(cases_array[i].primary_case) == 1) {
                temp_html += `<li><a class="options-link" data-caseid="${cases_array[i].pk_id}">Case ${cases_array[i].case_name}</a></li>`;
            }
        }
    temp_html += `<h4 class="options-divider">Secondary Cases</h4>`;
    for(i = 0; i < temp_len; i++) {
        if(parseInt(cases_array[i].primary_case) == 0) {
            temp_html += `<li><a class="options-link" data-caseid="${cases_array[i].pk_id}">Case ${cases_array[i].case_name}</a></li>`;
        }
    }

    $('.options').html(temp_html);
    $('.options-link').on('click', function(e) {
        e.preventDefault();
        $('.choices').prop('checked', false);
        sel_case_pk_id = parseInt($(this).data('caseid'));
        buildInventory();
    });
    $('.options-add').on('click', addPiece);

    $('.search-icon').on('click', searchInventory);
}

function buildInventory() {
    console.log("buildInventory() called");
    var temp_html = "";
    var temp_title = "";
    var temp_len;
    var num_rows;
    var num_cols;

    if(sel_case_pk_id == -1) {
        temp_title += `<div class="page-title"><h3>LEGO&reg; Inventory</h3></div>`;
        temp_html += `<div class="card welcome-container">`;
            temp_html += `<p>From the options menu <i class="nav-spacer fas fa-cogs"></i>, you can choose an inventory case to view/edit.</p>`;
            temp_html += `<p>You may also search for a specific Design or Element ID.</p>`;
        temp_html += `</div>`;

        $('.shell').html(temp_title + temp_html);
    } else {
        // show selected case inventory
        getInventoryPromise(sel_case_pk_id).then(function(resolve) {
            console.log("Inventory Loaded.");
        }).catch(function(reject) {
            console.log("Inventory NOT Loaded!");
        }).finally(function() {
            console.log("Fresh Inventory.");
            console.log(inventory_array);
            temp_len = inventory_array.length;
            if(temp_len == 0) {
                temp_title += `<div class="page-title page-title-error"><h3>Oops!</h3></div>`;
                temp_html += `<div class="welcome-container">`;
                    temp_html += `<p>There doesn't seem to be inventory in that case, please select a different one.</p>`;
                temp_html += `</div>`;
                $('.shell').html(temp_title + temp_html);
            } else {
                num_rows = inventory_array[0].num_rows;
                num_cols = inventory_array[0].num_cols;
                
                temp_title += `<div class="page-title"><h3>Case ${cases_array[getCaseArrayIndexFromPkId(sel_case_pk_id)].case_name}</h3></div>`;
                temp_html += `<div class="grid-container grid-container-inventory grid-container-inventory-${num_cols}-${num_rows}">`;

                for(r = 1; r <= num_rows; r++) {

                    for(c = 1; c <= num_cols; c++) {
                        temp_html += `<div class="case-drawer">`;
                            temp_html += `<div class="case-drawer-col-row-title">r${r}/c${c}</div>`;
                            temp_html += `<div class="area-design-id-0" id="dis-${r}-${c}-0-0"></div>`;
                            temp_html += `<div class="area-piece-0">`;
                                temp_html += `<img class="invisible inventory-piece" id="img-${r}-${c}-0-0" src="/images/temp_img.png" onerror="imgErr(this, 'piece')">`;
                                temp_html += `<img class="invisible inventory-piece" id="img-${r}-${c}-0-1" src="/images/temp_img.png" onerror="imgErr(this, 'piece')">`;
                            temp_html += `</div>`;
                            temp_html += `<div class="area-design-id-1" id="dis-${r}-${c}-1-0"></div>`;
                            temp_html += `<div class="area-piece-1">`;
                                temp_html += `<img class="invisible inventory-piece" id="img-${r}-${c}-1-0" src="/images/temp_img.png" onerror="imgErr(this, 'piece')">`;
                                temp_html += `<img class="invisible inventory-piece" id="img-${r}-${c}-1-1" src="/images/temp_img.png" onerror="imgErr(this, 'piece')">`;
                            temp_html += `</div>`;
                        temp_html += `</div>`;
                    }

                }

                temp_html += `</div>`;
                scrollToTop();
                $('.shell').html(temp_title + temp_html);

                for(i = 0; i < temp_len; i++) {
                    var e_p = `${inventory_array[i].row}-${inventory_array[i].col}-${inventory_array[i].slot}-${inventory_array[i].sub_slot}`;
                    $('#dis-' + e_p).html(inventory_array[i].piece_design_id);
                    $('#img-' + e_p).data('index', i);
                    $('#img-' + e_p).attr('src', 'https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/' + inventory_array[i].element_id + '.jpg');
                    $('#img-' + e_p).removeClass('invisible');
                }
            }

            $('.inventory-piece').on('click', viewPiece);
        });
    }
}

function viewPiece(e) {
    console.log("viewPiece() called");
    e.preventDefault();
    sel_i = -1;
    sel_i = $(e.currentTarget).data('index');
    piece_view = "update";
	loadModal("inventory-modal");
}

function addPiece(e) {
    console.log("addPiece() Called");
    e.preventDefault;
    $('.choices').prop('checked', false);
    piece_view = "add";
	loadModal("inventory-modal");
}

function showInventoryModal() {
	console.log("showInventoryModal() called");
    var temp_html = "";
    temp_html = "<option value='0' selected disabled>Select a Design ID</option>";
    for(i = 0; i < design_ids_array.length; i++) {
        temp_html += `<option value="${design_ids_array[i].design_id_pk}"`;
        temp_html += `>${design_ids_array[i].piece_design_id} - ${design_ids_array[i].piece_name}`;

        if(design_ids_array[i].piece_sub_name != null) {
            temp_html += `, ${design_ids_array[i].piece_sub_name}`;
        }

        temp_html += `</option>`;
    }

    $('.piece-design').html(temp_html);

    temp_html = "";    
    temp_html = "<option value='0' selected disabled>Select a Color</option>";
    for(i = 0; i < colors_array.length; i++) {
        temp_html += `<option value="${colors_array[i].color_pk}-${colors_array[i].cf_pk}"`;
        temp_html += `>${colors_array[i].exact_color}</option>`;
    }
    $('.piece-color').html(temp_html);

    temp_html = "";
    temp_html = "<option value='0' selected disabled>Select a Case</option>";
    for(i = 0; i < cases_array.length; i++) {
        temp_html += `<option value="${cases_array[i].pk_id}"`;
        temp_html += `>${cases_array[i].case_name}</option>`;
    }
    $('.piece-case').html(temp_html);

    $('#piece-element').on('change', function() {
		$('#piece-img').attr('src', 'https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/' + $('#piece-element').val() + '.jpg');
	});
    
    switch(piece_view) {
        case "update":
            $('.piece_pk_id').val(inventory_array[sel_i].pk_id);
            $('#piece-img').data('index', sel_i);
            $('#piece-img').attr('src', 'https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/' + inventory_array[sel_i].element_id + '.jpg');

            var temp_name = "";
            temp_name = reverseEntities(inventory_array[sel_i].name);
            if(inventory_array[sel_i].sub_name != null) {
                temp_name += ", " + reverseEntities(inventory_array[sel_i].sub_name);
            }
            
            $('.piece-name-title').html(temp_name);
            $('#piece-pk-id').val(`${inventory_array[sel_i].pk_id}`);
            $('.piece-design').val(`${inventory_array[sel_i].fk_design_id}`).prop('selected', true).prop('disabled', true);
            $('.piece-element').val(`${inventory_array[sel_i].element_id}`).prop('disabled', true);
            $('.piece-color').val(`${inventory_array[sel_i].col_pk_id}-${inventory_array[sel_i].cf_pk_id}`).prop('selected', true).prop('disabled', true);
            $('.piece-quantity').val(`${inventory_array[sel_i].quantity}`).prop('disabled', true);

            $('.piece-case').val(`${inventory_array[sel_i].fk_sorting_case}`).prop('selected', true).prop('disabled', true);
            orig_case_pk_id = inventory_array[sel_i].fk_sorting_case;
            var case_index = getCaseArrayIndexFromPkId(inventory_array[sel_i].fk_sorting_case);

            $('.piece-col').attr('max', cases_array[case_index].num_cols);
            $('.piece-col').val(inventory_array[sel_i].col).prop('disabled', true);
            orig_col = inventory_array[sel_i].col;
            
            $('.piece-row').attr('max', cases_array[case_index].num_rows);
            $('.piece-row').val(inventory_array[sel_i].row).prop('disabled', true);
            orig_row = inventory_array[sel_i].row;
            
            $('.piece-slot').val(inventory_array[sel_i].slot).prop('disabled', true);
            $('.piece-sub-slot').val(inventory_array[sel_i].sub_slot).prop('disabled', true);
            $('.piece-description').val(reverseEntities(inventory_array[sel_i].description)).prop('disabled', true);

            $('.move-drawer').prop('disabled', true);

            $('.modal-edit').css('visibility', 'visible');
            $('.modal-save').css('visibility', 'hidden');
            $('.modal-delete').css('visibility', 'hidden');
            break;

        case "add":
            $('.modal-edit').css('visibility', 'hidden');
            $('.modal-save').css('visibility', 'visible');
            $('.modal-footer').hide();

            $('.piece-case').change(function() {
                // This is the pk_id of the selected case.
                    // $(this).val()

                $('.piece-col').attr('max', cases_array[ getCaseArrayIndexFromPkId($(this).val()) ].num_cols);
                $('.piece-row').attr('max', cases_array[ getCaseArrayIndexFromPkId($(this).val()) ].num_rows);
            });

            $('#piece-element').on('change', function() {
                $('#piece-img').attr('src', 'https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/' + dataCleanUp($('#piece-element').val()) + '.jpg');
            });
            break;

        default:
            break;
    }
    
    if($('#piece-sub-theme').val() == null) {
        $('#piece-sub-theme').val(0);
    }

    $('.modal-edit').on('click', editPiece);
    $('.modal-save').on('click', savePiece);
    // $('.modal-content').on('click', function(e) {
	// 	e.preventDefault();
    // 	e.stopPropagation();
    // 	e.stopImmediatePropagation();
	// });
    $('.modal-close').on('click', function(e) {
        $('.modal').hide();
    });
    
    $('.modal').show();
}

function editPiece(e) {
    e.preventDefault();
    console.log("editPiece() called");
    $('input').prop('disabled', false);
    $('select').prop('disabled', false);
    $('textarea').prop('disabled', false);
    $('.modal-save').css('visibility', 'visible');
    $('.modal-footer').css('display', 'flex');

    $('.move-drawer').change(function() {
        if($(this).prop('checked')) {
            console.log("I'm Checked!");
            $('.piece-design').val(`${inventory_array[sel_i].fk_design_id}`).prop('selected', true).prop('disabled', true);
            $('.piece-element').val(`${inventory_array[sel_i].element_id}`).prop('disabled', true);
            $('.piece-color').val(`${inventory_array[sel_i].col_pk_id}-${inventory_array[sel_i].cf_pk_id}`).prop('selected', true).prop('disabled', true);
            $('.piece-quantity').val(`${inventory_array[sel_i].quantity}`).prop('disabled', true);
            $('.piece-slot').val(inventory_array[sel_i].slot).prop('disabled', true);
            $('.piece-sub-slot').val(inventory_array[sel_i].sub_slot).prop('disabled', true);
            $('.piece-description').val(reverseEntities(inventory_array[sel_i].description)).prop('disabled', true);

            piece_view = "move";
        } else {
            console.log("I am not checked.");
            $('input').prop('disabled', false);
            $('select').prop('disabled', false);
            $('textarea').prop('disabled', false);

            piece_view = "update";
        }
    });
}

function savePiece(e) {
    e.preventDefault();
    console.log("savePiece() called");
    var should_add = true;
    var temp_error = "<h3>Please fix the following errors:</h3><div class='error-grid'>";

    if($('#piece-design').val() == null) {
        should_add = false;
        // Add warning that a name must be entered
        console.log("Add Design ID");
        temp_error += "<p class='set-error'>Design ID cannot be blank</p>";
    }
    if($('#piece-color').val() == null) {
        should_add = false;
        // Add warning that a number must be entered
        console.log("Add color");
        temp_error += "<p class='set-error'>Color cannot be blank</p>";
    }
    if($('#piece-case').val() == null) {
        should_add = false;
        // Add warning that a piece count must be entered
        console.log("Add case");
        temp_error += "<p class='set-error'>Case cannot be blank</p>";
    }
    if($('#piece-col').val() == "") {
        should_add = false;
        // Add warning that a price must be entered
        console.log("Add column");
        temp_error += "<p class='set-error'>Column cannot be blank</p>";
    }
    if($('#piece-row').val() == "") {
        should_add = false;
        // Add warning that a year must be entered
        console.log("Add row");
        temp_error += "<p class='set-error'>Row cannot be blank</p>";
    }
    if($('#piece-slot').val() == "") {
        should_add = false;
        // Add warning that a year must be entered
        console.log("Add slot");
        temp_error += "<p class='set-error'>Slot cannot be blank</p>";
    }
    if($('#piece-sub-slot').val() == "") {
        should_add = false;
        // Add warning that a year must be entered
        console.log("Add sub-slot");
        temp_error += "<p class='set-error'>Sub-Slot cannot be blank</p>";
    }

    if($('#piece-quantity').val() == null) {
        should_add = false;
        // Add warning that a Theme must be chosen
        console.log("Add quantity");
        temp_error += "<p class='set-error'>Quantity cannot be blank</p>";
    }

    if(parseInt($('#spiece-quantity').val()) == 0) {
        should_add = false;
        // Add warning that a quantity must be entered
        console.log("Add quantity");
        temp_error += "<p class='set-error'>Quantity cannot be 0</p>";
    }

    if(should_add) {
        updateInventoryPromise(piece_view).then(function(resolve) {
            console.log("Piece Updated.");
        }).catch(function(reject) {
            console.log("Piece NOT Updated!");
        }).finally(function() {
            console.log("Moving on now.");
            $('.modal').hide();
            buildInventory();
        });
    } else {
        $('.add-errors').html(temp_error).show();
    }
}

function searchInventory() {
    console.log("searchInventory() called");
    console.log("$(#search-bar).val():", parseInt($('#search-bar').val()));
    if(String(parseInt($('#search-bar').val())) == "NaN") {
        console.log("I'm not a number.");
        $('.search-error').show();
    } else {
        console.log("Got your number.");
        $('.search-error').hide();
        $('.choices').prop('checked', false);
        search_string = $('#search-bar').val();

        getInvSearchResultsPromise(search_string).then(function(resolve) {
            console.log("Inventory Search Results Loaded.");
        }).catch(function(reject) {
            console.log("Inventory Search Results NOT Loaded!");
        }).finally(function() {
            $('#search-bar').val('');
            buildInventorySearchResults() ;
        });
    }
}

function buildInventorySearchResults() {
    var temp_title = "";
    var temp_html = "";
    var temp_len = search_results_array.length;

    if(temp_len == 0) {
        temp_title += `<div class="page-title"><h3>Inventory Search Results</h3></div>`;
        temp_html += `<div class="welcome-container">`;
            temp_html += `<p>Your search for <span class="search-string">${search_string}</span> produced no results.</p>`;
            temp_html += `<p>Please try refining your search.</p>`;
        temp_html += `</div>`;
    } else {
        temp_title += `<div class="page-title"><h3>Inventory Search Results for ${search_string}</h3></div>`;
        temp_html += `<div class="grid-container-inventory-search">`;
        for(i = 0; i < temp_len; i++) {
            temp_html += `<div class="card card-inventory-search-results" data-caseid="${search_results_array[i].case_pk_id}">`;
                
                temp_html += `<img class="search-result-piece" src="https://www.lego.com/cdn/product-assets/element.img.lod5photo.192x192/${search_results_array[i].element_id}.jpg" onerror="imgErr(this)">`;

                temp_html += `<p>Case:</p>`;
                temp_html += `<p>${search_results_array[i].case_name}</p>`;
                temp_html += `<p>Column:</p>`;
                temp_html += `<p>${search_results_array[i].col}</p>`;
                temp_html += `<p>Row:</p>`;
                temp_html += `<p>${search_results_array[i].row}</p>`;
            temp_html += "</div>";
        }
        temp_html += "</div>";
    }

    $('.shell').html(temp_title + temp_html);
    $('.card-inventory-search-results').on('click', function() {
        sel_case_pk_id = parseInt($(this).data('caseid'));
        buildInventory();
    });
    $('main').show();
}