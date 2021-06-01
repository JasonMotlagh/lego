<?php

	include("config.php");

	$return_array = [];
	$connection = new mysqli($host, $user, $pass, $db);
	//if(mysqli_connect_error()) {//Use for PHP versions prior to 5.3
	if ($connection->connect_error) {// Use for PHP versions 5.3+
		die("Connect Error (".mysqli_connect_errno().") ".mysqli_connect_error());
	} else {
		$sql_colors = "SELECT c.pk_id AS color_pk,
								c.exact_color, c.lego_color_id,
								cf.pk_id AS cf_pk, cf.color_family, c.brickset_color,
								c.brickset_color_family, c.bricklink_color,
								c.brickowl_color, c.hex_value, c.example_element
							FROM colors c
								INNER JOIN color_families cf ON cf.pk_id = c.fk_color_family_id
							ORDER BY c.exact_color";
		$res_colors = $connection->query($sql_colors);
	}

	while ($obj = mysqli_fetch_object($res_colors)) {
		array_push($return_array, $obj);
	}

	$close_success = $connection->close();
	if($close_success) {
		echo json_encode($return_array);
	}

?>