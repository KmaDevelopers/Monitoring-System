<?php
	$result = array(
		'success' => true,
		'items' => array(
		)
	);

	for($j=0;$j<25;$j++) {
		$item = array();
		for($i=0;$i<5;$i++) {
			$item["sensor$i"] = rand(0, 100);
		}
		$item['name'] = date("Y-m-") . str_pad($j+1, 2, "0", STR_PAD_LEFT);
		$result['items'][] = $item;
	}

	echo json_encode($result);
?>