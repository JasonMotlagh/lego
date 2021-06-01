<?php

	include("config.php");

	$return_array = [];
	$connection = new mysqli($host, $user, $pass, $db);
	//if(mysqli_connect_error()) {//Use for PHP versions prior to 5.3
	if ($connection->connect_error) {// Use for PHP versions 5.3+
		die("Connect Error (".mysqli_connect_errno().") ".mysqli_connect_error());
	} else {
		$sql = "SELECT mys.pk_id, mys.set_number, mys.fk_theme, thm.theme,
					mys.fk_sub_theme, sth.sub_theme,
					mys.year, mys.set_name, mys.num_minifigs, mys.num_pieces,
					mys.price, mys.weight_lbs, mys.weight_g, mys.built,
					mys.sorted, mys.quantity, mys.retired, mys.retired_year,
					mys.build_time_minutes, mys.description
				FROM my_sets mys
					INNER JOIN themes AS thm ON thm.pk_id = mys.fk_theme
					LEFT OUTER JOIN sub_themes AS sth ON sth.pk_id = mys.fk_sub_theme
				ORDER BY pk_id DESC";
		$res = $connection->query($sql);
	}

	while ($obj = mysqli_fetch_object($res)) {
		array_push($return_array, $obj);
	}

	$close_success = $connection->close();
	if($close_success) {
		echo json_encode($return_array);
	}

?>