<?php

    include("config.php");

    $search_value = $_POST['search_value'];

    $return_array = [];
	$connection = new mysqli($host, $user, $pass, $db);
    //if(mysqli_connect_error()) {//Use for PHP versions prior to 5.3

	if ($connection->connect_error) {// Use for PHP versions 5.3+
		die("Connect Error (".mysqli_connect_errno().") ".mysqli_connect_error());
	} else {
        $sql = "SELECT pk_id
                FROM my_sets AS mys
                WHERE set_number LIKE '%$search_value%'
                    OR set_name LIKE '%$search_value%'";

		$res = $connection->query($sql);
	}

	while ($obj = mysqli_fetch_object($res)) {
		array_push($return_array, $obj);
	}
	
	$close_success = $connection->close();
	echo json_encode($return_array);
?>