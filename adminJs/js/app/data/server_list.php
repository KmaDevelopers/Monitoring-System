<?php
	echo json_encode(array(
		'items' => array(
			array(
				'name'=>"Server 1", 
				'serverId' => 1,
				'sensors' => array(
					array('sensorId'=>1, 'serverId'=>1, 'name'=>"Sensor1"),
					array('sensorId'=>2, 'serverId'=>1, 'name'=>"Sensor2"),
					array('sensorId'=>3, 'serverId'=>1, 'name'=>"Sensor3"),
					array('sensorId'=>4, 'serverId'=>1, 'name'=>"Sensor4"),
				)
			),
			array(
				'name'=>"Server 2", 
				'serverId' => 2,
				'sensors' => array(
					array('sensorId'=>5, 'serverId'=>2, 'name'=>"Sensor5"),
					array('sensorId'=>6, 'serverId'=>2, 'name'=>"Sensor6"),
					array('sensorId'=>7, 'serverId'=>2, 'name'=>"Sensor7"),
					array('sensorId'=>8, 'serverId'=>2, 'name'=>"Sensor8"),
				)
			),
			array(
				'name'=>"Server 3", 
				'serverId' => 3,
				'sensors' => array(
					array('sensorId'=>9, 'serverId'=>3, 'name'=>"Sensor9"),
					array('sensorId'=>10, 'serverId'=>3, 'name'=>"Sensor10"),
					array('sensorId'=>11, 'serverId'=>3, 'name'=>"Sensor11"),
					array('sensorId'=>12, 'serverId'=>3, 'name'=>"Sensor12"),
				)
			),
		)
	));
?>