<?php

    include("config.php");
    
	$pk_id = $_POST['design_pk_id'];
	$design_id = $_POST['design_id'];
    $name_id = $_POST['name'];
    $name_new = $_POST['name_new'];

    $sub_name_id = $_POST['sub_name'];
    $sub_name_new = $_POST['sub_name_new'];

    $category_id = $_POST['category'];
    $category_new = $_POST['category_new'];

    $sub_category_id = $_POST['sub_category'];
    $sub_category_new = $_POST['sub_category_new'];
    
    $return_array = [];
	$connection = new mysqli($host, $user, $pass, $db);
    //if(mysqli_connect_error()) {//Use for PHP versions prior to 5.3

	if ($connection->connect_error) {// Use for PHP versions 5.3+
		die("Connect Error (".mysqli_connect_errno().") ".mysqli_connect_error());
	} else {
        if(strlen($name_new) > 0) {
			$sql_name = "SELECT pk_id
						FROM names
						WHERE name = '".$name_new."'";
			$res_name = $connection->query($sql_name);
			$rows_name = mysqli_num_rows($res_name);

			if((int)$rows_name == 0) {
				$sql = "INSERT INTO names
							(pk_id, name)
						VALUES(NULL, '".$name_new."')";
				$res = $connection->query($sql);
				$name_id = (int)$connection->insert_id;
			}
        }
        if(strlen($sub_name_new) > 0) {
			$sql_sub_name = "SELECT pk_id
                            FROM sub_names
                            WHERE sub_name = '".$sub_name_new."'";
			$res_sub_name = $connection->query($sql_sub_name);
			$rows_sub_name = mysqli_num_rows($res_sub_name);

			if((int)$rows_sub_name == 0) {
				$sql = "INSERT INTO sub_names
							(pk_id, sub_name)
						VALUES(NULL, '".$sub_name_new."')";
				$res = $connection->query($sql);
				$sub_name_id = (int)$connection->insert_id;
			}
		}
        
        if(strlen($category_new) > 0) {
			$sql_category = "SELECT pk_id
                            FROM categories
                            WHERE category = '".$category_new."'";
			$res_category = $connection->query($sql_category);
			$rows_category = mysqli_num_rows($res_category);

			if((int)$rows_category == 0) {
				$sql = "INSERT INTO categories
							(pk_id, category)
						VALUES(NULL, '".$category_new."')";
				$res = $connection->query($sql);
				$category_id = (int)$connection->insert_id;
			}
		}
        if(strlen($sub_category_new) > 0) {
			$sql_sub_category = "SELECT pk_id
                                FROM sub_categories
                                WHERE sub_category = '".$sub_category_new."'";
			$res_sub_category = $connection->query($sql_sub_category);
			$rows_sub_category = mysqli_num_rows($res_sub_category);

			if((int)$rows_sub_category == 0) {
				$sql = "INSERT INTO sub_categories
							(pk_id, sub_category)
						VALUES(NULL, '".$sub_category_new."')";
				$res = $connection->query($sql);
				$sub_category_id = (int)$connection->insert_id;
			}
		}
		
		switch((int)$pk_id) {
			case -1:
				$sql = "INSERT INTO design_ids 
						(
							pk_id, 
							piece_design_id, 
							fk_name_id, 
							fk_sub_name_id, 
							fk_category_id, 
							fk_sub_category_id
						)
						VALUES
						(
							NULL, 
							".(int)$design_id.", "
							.(int)$name_id.", ";

							if((int)$sub_name_id == 0) {
								$sql .= "NULL, ";
							} else {
								$sql .= (int)$sub_name_id.", ";
							}

							$sql .= (int)$category_id.", ";
							
							if((int)$sub_category_id == 0) {
								$sql .= "NULL";
							} else {
								$sql .= (int)$sub_category_id;
							}
				$sql .= ")";
				break;
			
			default:
				$sql = "UPDATE design_ids
						SET fk_name_id = ".(int)$name_id.", fk_sub_name_id = ".(int)$sub_name_id.", fk_category_id = ".(int)$category_id.", fk_sub_category_id= ".(int)$sub_category_id;
				$sql .= " WHERE pk_id = ".(int)$pk_id;
				break;
		}
        
        $res = $connection->query($sql);
    }
	
	$close_success = $connection->close();
	echo json_encode($res);
?>