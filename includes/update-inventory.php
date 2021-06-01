<?php

    include("config.php");

    $orig_case_pk_id = (int)$_POST['orig_case_pk_id'];
    $orig_col = (int)$_POST['orig_col'];
    $orig_row = (int)$_POST['orig_row'];

	$fk_design_id = (int)$_POST['piece_design_pk_id'];
	$element_id = (int)$_POST['piece_element'];
    $color_pk_id = (int)$_POST['piece_color_pk_id'];
    $cf_pk_id = (int)$_POST['piece_cf_pk_id'];
    $quantity = (int)$_POST['piece_quantity'];
    $fk_case = (int)$_POST['piece_case_pk_id'];
    $col = (int)$_POST['piece_col'];
    $row = (int)$_POST['piece_row'];
    $slot = (int)$_POST['piece_slot'];
    $sub_slot = (int)$_POST['piece_sub_slot'];

    $return_array = [];
	$connection = new mysqli($host, $user, $pass, $db);
    //if(mysqli_connect_error()) {//Use for PHP versions prior to 5.3

	if ($connection->connect_error) {// Use for PHP versions 5.3+
		die("Connect Error (".mysqli_connect_errno().") ".mysqli_connect_error());
	} else {

        switch($_POST['action']) {
            case "update":
                $sql = "UPDATE my_inventory";
                $sql .= " SET element_id = ".$element_id.", fk_design_id = ".$fk_design_id;
                $sql .= ", fk_color_family_id = ".$cf_pk_id.", fk_color_id = ".$color_pk_id;
                $sql .= ", quantity = ".$quantity.", fk_sorting_case = ".$fk_case;
                $sql .= ", col = ".$col.", row = ".$row.", slot = ".$slot.", sub_slot = ".$sub_slot;

                if($_POST['piece_description'] == "null" || $_POST['piece_description'] == null || $_POST['piece_description'] == "") {
                    $sql .= ", description = NULL";
                } else {
                    $sql .= ", description = '".$_POST['piece_description']."'";
                }

                $sql .= " WHERE pk_id = ".$_POST['piece_pk_id'];
                break;
            
            case "add":
                $sql = "INSERT INTO my_inventory";
                $sql .= " (pk_id, element_id, fk_design_id, fk_color_family_id, fk_color_id, quantity, fk_sorting_case, col, row, slot, sub_slot, description)";
                $sql .= " VALUES(NULL, ".$element_id.", ".$fk_design_id.", ".$cf_pk_id.", ".$color_pk_id;
                $sql .= ", ".$quantity.", ".$fk_case.", ".$col.", ".$row.", ".$slot.", ".$sub_slot;

                if($_POST['piece_description'] == "null" || $_POST['piece_description'] == null || $_POST['piece_description'] == "") {
                    $sql .= ", NULL)";
                } else {
                    $sql .= ", '".$_POST['piece_description']."')";
                }
                break;
            
            case "move":
                $sql = "UPDATE my_inventory";
                $sql .= " SET fk_sorting_case = ".$fk_case.", col = ".$col.", row = ".$row;
                $sql .= " WHERE fk_sorting_case = ".$orig_case_pk_id." AND col = ".$orig_col." AND row = ".$orig_row;
                break;
            
            default:
                break;
        }

		$res = $connection->query($sql);
	}
	
	$close_success = $connection->close();
	echo json_encode($res);
?>