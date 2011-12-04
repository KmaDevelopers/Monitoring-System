<?php
/**
* This command load all data from servers to sensor statistic
*/


class LoadSensorDataCommand extends CConsoleCommand{
	
	public function run($args){

		$servers = Yii::app()->db->createCommand("
		select 
		* 
		from Server 
		where active = 1;
		")->queryAll();


		// echo "Servers";
		// print_r($servers);

		foreach($servers as $server){
			$this->proccedServer($server);
		}

	}

	protected function proccedServer($server) {
		try{
			$results = @file_get_contents('http://'.$server['ip'], 'r');
		}catch(Exception $e) {
			return;
		}

		// echo "results for server {$server['serverId']}\n";
		// print_r($results);
		// echo "\n";

		if(empty($results)) {
			return;
		}

		/**
		* get all server sensors
		*/

		$sensors = Yii::app()->db->createCommand("
		Select 
		* 
		from Sensor 
		where 
		active = 1 AND 
		serverId = {$server['serverId']}")->queryAll();

		// echo "sensors for server {$server['serverId']}\n";
		// print_r($sensors);
		// echo "\n";

		$resArray = explode(";",$results);
		
		if(empty($sensors)) {
			return; // to next server or stop
		} else {
			$sensorBySerial = array();
			foreach ($sensors as $v) {
				$sensorBySerial[$v['serial']] = $v;
			}
		}

		$insertDataArray = array();
		$date = date('Y-m-d H:i:s');

		for($i = 0 ; $i < count($resArray)/2 ; $i +=2 ){

			$serial = $resArray[$i];
			$temp = $resArray[$i+1];
			if(!empty($sensorBySerial[$serial])) {
				$insertDataArray[] = $sensorBySerial[$serial]['sensorId'].",'{$date}',{$temp}";
			}
		}

		if(empty($insertDataArray)) {
			return;
		}

		// echo "insert data server {$server['serverId']}\n";
		// print_r($insertDataArray);
		// echo "\n";

		$sql = "insert into `Statistics` (sensorId, date, temperature) VALUES (".implode('),(',$insertDataArray).")";
		Yii::app()->db->createCommand($sql)->execute();

	}

}