<?php
/**
* This command load all data from servers to sensor statistic
*/


class DayStatCommand extends CConsoleCommand{
	
	public function run($args){

		$sql = "SELECT sensorId,AVG(temperature) as 'aTemp',
			DATE_SUB(DATE_FORMAT(date,'%Y-%m-%d 00:00:00'),INTERVAL 1 DAY) as 'nDate'
			FROM Statistics
			WHERE 
			date >= DATE_SUB(DATE_FORMAT(date,'%Y-%m-%d 00:00:00'),INTERVAL 1 DAY)
			GROUP BY sensorId
			";

		$res = Yii::app()->db->createCommand($sql)->queryAll();

		if(empty($res)) {
			return;
		}

		$insertIntoArrayRows = array_map(function($it) {
			return "'{$it['sensorId']}','{$it['aTemp']}','{$it['nDate']}'"; 
		});
			
		$sql = "INSERT INTO DayStatistics(sensorId,temperature,date)
		VALUES (".implode('),(',$insertIntoArrayRows).")";
		
		// create send notifacation to admin if this query return false
		$res = Yii::app()->db->createCommand($sql)->execute();
		
	}

}