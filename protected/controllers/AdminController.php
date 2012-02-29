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
			$filter = $_REQUEST['filter'];
			$dateFrom = $filter['startFrom'];
			$dateTo = $filter['endTo'];
			$sensorIds = $filter['sensorIds'];
			$sensorList = implode(',',$sensorIds);
			
			$sql = "select sensorId,serial from Sensor where sensorId in ({$sensorList})";
			$res = Yii::app()->db->createCommand($sql)->queryAll(false);
			
			$sensorSerialById = array();
			
			foreach($res as $v){
				$sensorSerialById[$v[0]] = $v[1];
			}
			
			$tableName = 'Statistics'; // change table name when we change period
			
			$sql = "
				select DATE_FORMAT(date,'%Y-%m-%d %H:%i'),sensorId,AVG(temperature)
				FROM {$tableName} `stat`
				WHERE date BETWEEN '{$dateFrom}' AND '{$dateTo}'
				AND sensorId in ({$sensorList})
				ORDER BY date ASC
				LIMIT 20
			";
			
			echo $sql;
			
			Yii::app()->end();
			
			$res = Yii::app()->db->createCommand($sql)->queryAll(false);
			
			var_dump($res);
			
			Yii::app()->end();
			
			$this->result(array(
					    'period' => '2012-02-22 10:00:00;2012-02-22 11:00:00',
					    'sensorId1' => '32.4'
					    ));
			/**
			 * calculate period
			 */
			
			
			/**
			 * startDate: 2010-02-03 12:00:00
			 * endDate: 2010-02-03 22:00:00
			 * 
			 * [{
			 *	name: "2010-02-03 12:00",
			 *	sensor0: "24"
			 * }, {
			 * 	name: "2010-02-03 13:00",
			 *	sensor0: "25"
			 * }]
			 *
			 */
			Yii::app()->end();	
		}
		
		$this->result(array(),0);
	}
	
}