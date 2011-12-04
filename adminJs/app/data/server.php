<?php
	// create
	if(strtolower($_SERVER['REQUEST_METHOD']) == 'put') {
		echo json_encode(
			array(
				"items" => array(array(
					'name' => "Server 233",
					'ipAddress' => "Server IP Addrss",
					'serverId' => 124
				)),
				"success"=> true
			)
		);
		// destroy
	} elseif (strtolower($_SERVER['REQUEST_METHOD']) == 'delete') {
		echo json_encode(
			array(
				"items" => array(),
				"success"=> true
			)
		);
		// get
	} elseif (strtolower($_SERVER['REQUEST_METHOD']) == 'get') {
		echo json_encode(array(
			'items' => array(
				array(
					'name'=>"Server 1", 
					'ipAddress'=> "125.2.24.21",
					'serverId' => 1,
					'path' => "In the root",
					'sensors' => array(
						array('sensorId'=>1, 'serverId'=>1, 'location'=>"Sensor1"),
						array('sensorId'=>2, 'serverId'=>1, 'location'=>"Sensor2"),
						array('sensorId'=>3, 'serverId'=>1, 'location'=>"Sensor3"),
						array('sensorId'=>4, 'serverId'=>1, 'location'=>"Sensor4"),
					)
				),
				array(
					'name'=>"Server 2", 
					'ipAddress'=> "125.2.24.22",
					'path' => "In the root 2",
					'serverId' => 2,
					'sensors' => array(
						array('sensorId'=>5, 'serverId'=>2, 'location'=>"Sensor5"),
						array('sensorId'=>6, 'serverId'=>2, 'location'=>"Sensor6"),
						array('sensorId'=>7, 'serverId'=>2, 'location'=>"Sensor7"),
						array('sensorId'=>8, 'serverId'=>2, 'location'=>"Sensor8"),
					)
				),
				array(
					'name'=>"Server 3", 
					'ipAddress'=> "125.2.24.25",
					'path' => "In the root 3",
					'serverId' => 3,
					'sensors' => array(
						array('sensorId'=>9, 'serverId'=>3, 'location'=>"Sensor9"),
						array('sensorId'=>10, 'serverId'=>3, 'location'=>"Sensor10"),
						array('sensorId'=>11, 'serverId'=>3, 'location'=>"Sensor11"),
						array('sensorId'=>12, 'serverId'=>3, 'location'=>"Sensor12"),
					)
				),
			)
		));
	} elseif (strtolower($_SERVER['REQUEST_METHOD']) == 'post') {
		echo json_encode(
			array(
				"items" => array(array(
					'name' => "new server name",
					'ipAddress' => "127.0.0.1",
					'serverId' => 124
				)),
				"success"=> true
			)
		);
	}
?>