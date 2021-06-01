<?php

    include("config.php");

    // $action = $_POST['action'];
	$set_pk_id = (int)$_POST['set_pk_id'];
	$name = $_POST['set_name'];
    $number = (int)$_POST['set_number'];
    $pieces = (int)$_POST['set_pieces'];
    $price = (float)$_POST['set_price'];
    $year = (int)$_POST['set_year'];
    $minifigures = (int)$_POST['set_minifigures'];
    $theme = (int)$_POST['set_theme'];

    if((int)$_POST['set_sub_theme'] == 0) {
        $sub_theme = "NULL";
    } else {
        $sub_theme = (int)$_POST['set_sub_theme'];
    }
    
    $quantity = (int)$_POST['set_quantity'];
    $built = (int)$_POST['set_built'];
    $sort = (int)$_POST['set_sort'];
    $build_time = (int)$_POST['set_build_time'];
    $weight_lbs = round((float)$_POST['set_weight_lbs'], 2);
    $weight_g = (int)$_POST['set_weight_g'];
    $retired = (int)$_POST['set_retired'];
    $retired_year = (int)$_POST['set_retired_year'];
    $image_url = "https://images.brickset.com/sets/large/".$number."-1.jpg";

    $return_array = [];
	$connection = new mysqli($host, $user, $pass, $db);
    //if(mysqli_connect_error()) {//Use for PHP versions prior to 5.3

	if ($connection->connect_error) {// Use for PHP versions 5.3+
		die("Connect Error (".mysqli_connect_errno().") ".mysqli_connect_error());
	} else {

        if($_POST['action'] == "update") {
            $sql = "UPDATE my_sets";
            $sql .= " SET set_number = ".$number.", fk_theme = ".$theme.", fk_sub_theme = ".$sub_theme;
                $sql .= ", year = ". $year.", set_name = '".$name."', num_minifigs = ".$minifigures.", num_pieces = ".$pieces;
                $sql .= ", price = ".$price.", weight_lbs = ".$weight_lbs.", weight_g = ".$weight_g.", built = ".$built;
                $sql .= ", sorted = ".$sort.", quantity = ".$quantity.", retired = ".$retired.", retired_year = ".$retired_year;
                $sql .= ", build_time_minutes = ".$build_time;

                if($_POST['set_description'] == "null" || $_POST['set_description'] == null || $_POST['set_description'] == "") {
                    $sql .= ", description = NULL";
                } else {
                    $sql .= ", description = '".$_POST['set_description']."'";
                }

            $sql .= " WHERE pk_id = ".$set_pk_id;
        } else {
            $sql = "INSERT INTO my_sets";
                $sql .= " (pk_id, set_number, fk_theme, fk_sub_theme, year, set_name, num_minifigs, num_pieces, price,";
                $sql .= " image_url, weight_lbs, weight_g, built, sorted, quantity, retired, retired_year, build_time_minutes, description)";
                $sql .= " VALUES(NULL, ".$number.", ".$theme.", ".$sub_theme.", ".$year.", '".$name."', ".$minifigures.", ".$pieces.", ".$price.", '".$image_url."', ".$weight_lbs.", ".$weight_g.", ".$built.", ".$sort.", ".$quantity.", ".$retired.", ".$retired_year.", ".$build_time;
                
                if($_POST['set_description'] == "null" || $_POST['set_description'] == null || $_POST['set_description'] == "") {
                    $sql .= ", NULL)";
                } else {
                    $sql .= ", '".$_POST['set_description']."')";
                }
        }

		$res = $connection->query($sql);
	}
	
	$close_success = $connection->close();
	echo json_encode($res);
?>