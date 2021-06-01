<?php

	include("config.php");

	$return_array = [];
	$connection = new mysqli($host, $user, $pass, $db);
	//if(mysqli_connect_error()) {//Use for PHP versions prior to 5.3
	if ($connection->connect_error) {// Use for PHP versions 5.3+
		die("Connect Error (".mysqli_connect_errno().") ".mysqli_connect_error());
	} else {
		$sql = "SELECT scat.pk_id AS pk_id,
					scat.sub_category AS sub_category
				FROM sub_categories scat
				ORDER BY sub_category ASC";
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