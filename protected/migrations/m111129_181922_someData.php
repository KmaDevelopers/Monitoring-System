<?php

class m111129_181922_someData extends CDbMigration {

	public function up() {

		$this->execute("Truncate `Sensor`");
		$this->execute("Truncate `Server`");
		$this->execute("Truncate `Statistics`");

		$this->execute("insert into `Server` values (1, '127.0.0.1:8000', 'server1', 'in the room')");
		$this->execute("insert into `Server` values (2, '127.0.0.1:8000', 'server2', 'in the room')");
		$this->execute("insert into `Server` values (3, '127.0.0.1:8000', 'server3', 'in the room')");

		//for($i=1;$i<10;$i++){
		// $this->execute("insert into `Sensor` 
		// 				values ($i, 1, 'serial1', 'sensor" . $i . "', '{x:100,y:$i}','in the room')");
		// }

		for ($i = 1; $i <= 50; $i++) {
			$sId = rand(1, 3);
			$x = rand(0, 400);
			$y = rand(0, 400);
			$this->execute("insert into `Sensor` values 
				({$i}, {$sId}, 'serial{$i}', 'sensor{$i}', 
				'100','100','in the room')");
		}

		date_default_timezone_set('Europe/Kiev');
		$dataArray = array();
		for ($i = 0; $i < 100; $i++) {
			$dataArray = array();
			for ($j = 1; $j <= 50; $j++) {
				$val = rand(10, 30);
				$time = '\'' . date('Y-m-d H:i:s', (time() + $i * 120) - 100000) . '\'';
				$dataArray[] = "{$j},{$val},{$time}";
			}
			$this->execute("insert into `Statistics` 
				(`sensorId`,`temperature`,`date`) values 
				(" . implode("),(", $dataArray) . ")");
		}
	}

	public function down() {
		$this->execute("truncate table `Sensor`");
		$this->execute("truncate table `Statistics`");
		$this->execute("truncate table `Server`");
	}

}
