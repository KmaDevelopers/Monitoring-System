<?php
/**
* This command load all data from servers to sensor statistic
*/


class LoadSensorDataCommand extends CConsoleCommand{
	
	public function run($args){

		$servers = Server::model()->with('sensors')->findAll();

		foreach($servers as $server){
			$this->proccedServer($server);
		}

	}

	protected function proccedServer($server) {
		$results = file_get_contents('http://'.$server->ip, 'r');

		$resArray = explode(";",$results);
		
		for($i = 0 ; $i < count($resArray)/2 ; $i +=2 ){

			$serial = $resArray[$i];
			$temp = $resArray[$i+1];
			
			$sensorId = Sensor::model()->getSensorIdBySerial($serial);

			$sql = "insert into `Statistics` (sensorId, date, temperature) VALUES (:sensorId, :date, :temp)";
				
			// echo "\nTemp:".$temp;
			// echo "\nSerial:".$serial."\n";

			Yii::app()->db->createCommand($sql)->execute(
				array(
					':sensorId' => $sensorId,
					':date' => date('Y-m-d H:i:s'),
					':temp' => $temp
				));
		}
	}

}