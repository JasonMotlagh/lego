<?php

	include("config.php");

    $case_pk_id = (int)$_POST['case_pk_id'];
	$return_array = [];
	$connection = new mysqli($host, $user, $pass, $db);
	//if(mysqli_connect_error()) {//Use for PHP versions prior to 5.3
	if ($connection->connect_error) {// Use for PHP versions 5.3+
		die("Connect Error (".mysqli_connect_errno().") ".mysqli_connect_error());
	} else {
		$sql = "SELECT myi.pk_id, myi.element_id, myi.quantity,
                        myi.fk_design_id, did.piece_design_id, n.name,
                        sn.sub_name, myi.fk_sorting_case,
                        myi.col, myi.row, myi.slot, myi.sub_slot,
                        myi.description,
                        sc.num_cols, sc.num_rows,
						clr.exact_color, clr.pk_id AS col_pk_id, clr.fk_color_family_id AS cf_pk_id
                FROM my_inventory myi
                    INNER JOIN sorting_cases sc ON sc.pk_id = myi.fk_sorting_case
                    INNER JOIN design_ids did ON did.pk_id = myi.fk_design_id
                    INNER JOIN colors clr ON clr.pk_id = myi.fk_color_id
                    INNER JOIN names n ON n.pk_id = did.fk_name_id
                    LEFT OUTER JOIN sub_names sn ON sn.pk_id = did.fk_sub_name_id
                WHERE myi.fk_sorting_case = ".$case_pk_id." ORDER BY myi.col, myi.row, myi.slot, myi.sub_slot ASC";
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