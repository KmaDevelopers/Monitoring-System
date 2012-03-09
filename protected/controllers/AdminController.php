<?php

class AdminController extends KmaController {
	
	public $layout = 'admin';

	public function accessRules()
	{
	   return array(array('allow', // allow all users to perform 'index' and 'view' actions
	       'actions' => array(
		       		'index',
	        		'error',
				'chart',
	        ), 'users' => array('*'),), 
	        array('deny', // deny all users
	       'users' => array('*'),),);
	}

	public function actionIndex() {
		$this->render('index');
	}

	public function actions()
	{
		return array();
	}
	
	public function actionChart() {
		
		//var_dump($_REQUEST);
		//Yii::app()->end();
		
		if(isset($_REQUEST['filter']) && !empty($_REQUEST['filter'])){
			$filter = CJSON::decode($_REQUEST['filter']);
			$dateFrom = isset($filter['startDate']) ? $filter['startDate'] : null;
			$dateTo = isset($filter['endDate']) ? $filter['endDate'] : null;
			$sensorIds = isset($filter['sensorIds']) ? $filter['sensorIds'] : null;
		} else {
			$date = time();			
			$dateFrom = date('Y-m-d H:i:s',$date-(60*60*2));
			$dateTo = date('Y-m-d H:i:s',$date);
			$sensorIds = Yii::app()->db->createCommand("select * from Sensor where active = 1")->queryColumn();
		}
		
		if(!is_array($sensorIds) || empty($sensorIds) ){
			$sensorIds = Yii::app()->db->createCommand("select * from Sensor where active = 1")->queryColumn();
		}
		
		$sensorList = implode(',',$sensorIds);
		
		$sql = "select sensorId,serial from Sensor where sensorId in ({$sensorList})";
		$res = Yii::app()->db->createCommand($sql)->queryAll(false);
		
		$sensorSerialById = array();
		
		foreach ($res as $v) {
			$sensorSerialById[$v[0]] = $v[1];
		}
		
		$tableName = 'Statistics'; // change table name when we change period
		
		//$sql = "
		//	select DATE_FORMAT(date,'%Y-%m-%d %H:%i'),sensorId,AVG(temperature)
		//	FROM {$tableName} `stat`
		//	WHERE date BETWEEN '{$dateFrom}' AND '{$dateTo}'
		//	AND sensorId in ({$sensorList})
		//	ORDER BY date ASC
		//	LIMIT 20
		//";

		$period = abs(strtotime($dateTo) - strtotime($dateFrom));
		
		if($period <= (60*60*2)){ // 2 hours
			$tableName = 'Statistics';
		}elseif($period > (60*60*2) && $period < (60*60*24)){ // 1 day
			$tableName = 'HourStatistics';
		}elseif($period > (60*60*24) && $period < (60*60*24 * 2)){ // 2 day
			$tableName = 'DayStatistics';
		}else{
			$tableName = 'MonthStatistics';
		}
		
		$sql = "
			select DATE_FORMAT(date,'%Y-%m-%d %H:%i'),sensorId,temperature
			FROM {$tableName} `stat`
			WHERE date BETWEEN '{$dateFrom}' AND '{$dateTo}'
			AND sensorId in ({$sensorList})
			ORDER BY date ASC
		";
		
		
		$res = Yii::app()->db->createCommand($sql)->queryAll(false);
				
		$data = array();
		
		foreach($res as $v){
			$data[$v[0]][] = $v;
		}
		
		$items = array();
		
		foreach($data as $d => $v) {
			$it = array();
			
			$it['name'] = $d;
			foreach($v as $i){
				$it[$sensorSerialById[(int)$i[1]]] = $i[2]; // $it[1] sensorId
			}
			
			$items[] = $it; 
		}
		
		$this->result($items,count($items));
		
		Yii::app()->end();
	}
	
}