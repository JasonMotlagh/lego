<?php

    include("config.php");

    $search_value = $_POST['search_value'];

    $return_array = [];
	$connection = new mysqli($host, $user, $pass, $db);
    //if(mysqli_connect_error()) {//Use for PHP versions prior to 5.3

	if ($connection->connect_error) {// Use for PHP versions 5.3+
		die("Connect Error (".mysqli_connect_errno().") ".mysqli_connect_error());
	} else {

		$sql = "SELECT did.pk_id, did.piece_design_id AS design_id,
                        did.fk_name_id AS name_pk_id, did.fk_sub_name_id AS sub_name_pk_id,
                        did.fk_category_id AS category_pk_id, did.fk_sub_category_id AS sub_category_pk_id,
                        nms.name AS name, snm.sub_name AS sub_name, cat.category AS category, sct.sub_category AS sub_category
                FROM design_ids AS did
                    INNER JOIN names nms ON nms.pk_id = did.fk_name_id
                    LEFT OUTER JOIN sub_names snm ON snm.pk_id = did.fk_sub_name_id
                    INNER JOIN categories cat ON cat.pk_id = did.fk_category_id
                    LEFT OUTER JOIN sub_categories sct ON sct.pk_id = did.fk_sub_category_id
                WHERE did.piece_design_id LIKE '%$search_value%'
                    OR nms.name LIKE '%$search_value%'
                ORDER BY did.piece_design_id ASC, nms.name ASC";

		$res = $connection->query($sql);
	}

	while ($obj = mysqli_fetch_object($res)) {
		array_push($return_array, $obj);
	}
	
	$close_success = $connection->close();
	echo json_encode($return_array);
?>