function collectColors() {
    var arr_lng = colors_array.length;
    var temp_html = "";

    for(i = 0; i < arr_lng; i++) {
        temp_html += `<div id='${colors_array[i].color_pk}' class='card card-colors' data-index='${i}'>`;
            if(colors_array[i].example_element == null) {
                temp_html += `<img src="/images/spacer.png" style=background-color:#${colors_array[i].hex_value};>`;
            } else {
                temp_html += `<img src="images/3001/${colors_array[i].example_element}.jpg">`;
            }
            temp_html += "<div class='lego-color-data'>";
                if(colors_array[i].exact_color == null) {
                    temp_html += "<p>&nbsp;</p>";
                } else {
                    temp_html += `<p>${colors_array[i].exact_color}</p>`;
                }

                if(colors_array[i].color_family == null) {
                    temp_html += "<p>&nbsp;</p>";
                } else {
                    temp_html += `<p>${colors_array[i].color_family}</p>`;
                }

                if(colors_array[i].lego_color_id == null) {
                    temp_html += "<p>&nbsp;</p>";
                } else {
                    temp_html += `<p>${colors_array[i].lego_color_id}</p>`;
                }
                
                if(colors_array[i].hex_value == null) {
                    temp_html += "<p>&nbsp;</p>";
                } else {
                    temp_html += "<p>#" + colors_array[i].hex_value + "</p>";
                }
            temp_html += "</div>";
        temp_html += "</div>";
    }

    $('.grid-container').html(temp_html);
    $('.card-colors').on('click', viewColor);
    $('main').show();
}

function viewColor(e) {
	e.preventDefault();
	selected_index = -1;
	selected_index = $(e.currentTarget).attr('data-index');
	loadModal("color-modal");
}

function showSelectedColor() {
    var temp_html = "";
    if(colors_array[selected_index].example_element == null) {
        temp_html += `<img src="/images/spacer.png" style=background-color:#${colors_array[selected_index].hex_value};>`;
    } else {
        temp_html += `<img src="images/3001/${colors_array[selected_index].example_element}.jpg">`;
    }

    temp_html += "<p>LEGO Exact Color:</p>";
    if(colors_array[selected_index].exact_color == null) {
        temp_html += "<p>&nbsp;</p>";
    } else {
        temp_html += `<p>${colors_array[selected_index].exact_color}</p>`;
    }
    temp_html += "<p>LEGO Color Family:</p>";
    if(colors_array[selected_index].color_family == null) {
        temp_html += "<p>&nbsp;</p>";
    } else {
        temp_html += `<p>${colors_array[selected_index].color_family}</p>`;
    }
    temp_html += "<p>LEGO Color ID:</p>";
    if(colors_array[selected_index].lego_color_id == null) {
        temp_html += "<p>&nbsp;</p>";
    } else {
        temp_html += `<p>${colors_array[selected_index].lego_color_id}</p>`;
    }

    temp_html += "<p>HEX Code:</p>";
    if(colors_array[selected_index].hex_value == null) {
        temp_html += "<p>&nbsp;</p>";
    } else {
        temp_html += `<p>${colors_array[selected_index].hex_value}</p>`;
    }

    temp_html += "<p>Brickset Color:</p>";
    if(colors_array[selected_index].brickset_color == null) {
        temp_html += "<p>&nbsp;</p>";
    } else {
        temp_html += `<p>${colors_array[selected_index].brickset_color}</p>`;
    }

    temp_html += "<p>Bricklink Color:</p>";
    if(colors_array[selected_index].bricklink_color == null) {
        temp_html += "<p>&nbsp;</p>";
    } else {
        temp_html += `<p>${colors_array[selected_index].bricklink_color}</p>`;
    }

    temp_html += "<p>Brickowl Color:</p>";
    if(colors_array[selected_index].brickowl_color == null) {
        temp_html += "<p>&nbsp;</p>";
    } else {
        temp_html += `<p>${colors_array[selected_index].brickowl_color}</p>`;
    }
    
    $('.modal-body').html(temp_html);
    $('.modal-edit').css('visibility', 'hidden');
    $('.modal-save').css('visibility', 'hidden');
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