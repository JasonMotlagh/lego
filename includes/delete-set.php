<?php

	include("config.php");

    $set_pk_id = (int)$_POST['set_pk_id'];
	$return_array = [];
	$connection = new mysqli($host, $user, $pass, $db);
	//if(mysqli_connect_error()) {//Use for PHP versions prior to 5.3
	if ($connection->connect_error) {// Use for PHP versions 5.3+
		die("Connect Error (".mysqli_connect_errno().") ".mysqli_connect_error());
	} else {
		$sql = "DELETE FROM my_sets WHERE pk_id = ".$set_pk_id;
        $res = $connection->query($sql);
        array_push($return_array, $connection->affected_rows);
	}

	$close_success = $connection->close();
	if($close_success) {
		echo json_encode($return_array);
	}

?>