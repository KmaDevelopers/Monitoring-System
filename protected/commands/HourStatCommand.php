<?php
/**
* This command load all data from servers to sensor statistic
*/


class HourStatCommand extends CConsoleCommand{
	
	public function run($args){

		$sql = "SELECT sensorId,AVG(temperature) as 'aTemp',
			DATE_SUB(DATE_FORMAT(date,'%Y-%m-%d %H:00:00'),INTERVAL 1 HOUR) as 'nDate'
			FROM Statistics
			WHERE 
			date >= DATE_SUB(DATE_FORMAT(date,'%Y-%m-%d %H:00:00'),INTERVAL 1 HOUR)
			GROUP BY sensorId
			";

		$res = Yii::app()->db->createCommand($sql)->queryAll();

		if(empty($res)) {
			return;
		}

		$insertIntoArrayRows = array_map(function($it) {
			return "'{$it['sensorId']}','{$it['aTemp']}','{$it['nDate']}'"; 
		},$res);
			
		$sql = "INSERT INTO HourStatistics(sensorId,temperature,date)
		VALUES (".implode('),(',$insertIntoArrayRows).")";
		
		// create send notifacation to admin if this query return false
		$res = Yii::app()->db->createCommand($sql)->execute();

	}


}