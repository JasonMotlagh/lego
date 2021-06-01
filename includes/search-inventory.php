<?php

    include("config.php");

    $search_value = (int)$_POST['search_value'];

    $return_array = [];
	$connection = new mysqli($host, $user, $pass, $db);
    //if(mysqli_connect_error()) {//Use for PHP versions prior to 5.3

	if ($connection->connect_error) {// Use for PHP versions 5.3+
		die("Connect Error (".mysqli_connect_errno().") ".mysqli_connect_error());
	} else {

		$sql = "SELECT inv.pk_id, inv.element_id, inv.fk_design_id AS des_pk_id,
						inv.fk_sorting_case AS case_pk_id, inv.col, inv.row,
						did.piece_design_id AS design_id, sc.case_name
				FROM my_inventory AS inv
					INNER JOIN sorting_cases sc ON sc.pk_id = inv.fk_sorting_case
					INNER JOIN design_ids did ON did.pk_id = inv.fk_design_id
				WHERE inv.element_id LIKE '%$search_value%'
					OR did.piece_design_id LIKE '%$search_value%'
				ORDER BY inv.element_id ASC, did.piece_design_id ASC";

		$res = $connection->query($sql);
	}

	while ($obj = mysqli_fetch_object($res)) {
		array_push($return_array, $obj);
	}
	
	$close_success = $connection->close();
	echo json_encode($return_array);
?>