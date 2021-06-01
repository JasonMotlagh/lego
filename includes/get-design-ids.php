<?php

	include("config.php");

	$return_array = [];
	$connection = new mysqli($host, $user, $pass, $db);
	//if(mysqli_connect_error()) {//Use for PHP versions prior to 5.3
	if ($connection->connect_error) {// Use for PHP versions 5.3+
		die("Connect Error (".mysqli_connect_errno().") ".mysqli_connect_error());
	} else {
		$sql = "SELECT dids.pk_id AS design_id_pk,
					dids.piece_design_id AS piece_design_id,
					dids.fk_name_id AS name_id,
					dids.fk_sub_name_id AS sub_name_id,
					dids.fk_category_id AS category_id,
					dids.fk_sub_category_id AS sub_category_id,
					nms.name AS piece_name,
					snms.sub_name AS piece_sub_name,
					cat.category AS category,
					scat.sub_category AS sub_category
				FROM design_ids dids
					INNER JOIN names nms ON dids.fk_name_id = nms.pk_id
					LEFT OUTER JOIN sub_names snms ON dids.fk_sub_name_id = snms.pk_id
					INNER JOIN categories cat ON cat.pk_id = dids.fk_category_id
					LEFT OUTER JOIN sub_categories scat ON scat.pk_id = dids.fk_sub_category_id
				ORDER BY design_id_pk ASC";
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