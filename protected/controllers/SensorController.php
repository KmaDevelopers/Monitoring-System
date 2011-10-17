<?php

class SensorController extends KmaController
{
	/**
	 * Specifies the access control rules.
	 * This method is used by the 'accessControl' filter.
	 * @return array access control rules
	 */
	public function accessRules() {
		return array(
			array('allow', // allow all users to perform 'index' and 'view' actions
				'actions' => array(
						   'get',
						   'index',
						   'create',
						   ),
				'users' => array('*'),
			),
			array('deny', // deny all users
				'users' => array('*'),
			),
		);
	}
	
	public function actionIndex() {
		$this->result(array());
	}
	
	public function actionGet() {
		$sensorId = isset($_REQUEST['id']) ? : false;
		
		if(!$sensorId){
			/**
			 *get all sensors
			 */
			$sensors = Sensor::model()->findAll();
		} else {
			$sensor = Sensor::model()->findByPk($sensorId);
		}
		
		if(isset($sensor)) {
			$this->result(array(
				$sensor->getItemArray()
			));
		} elseif(isset($sensors)) {
			$res = array();
			foreach($sensors as $sen){
				array_push($res,$sen->getItemArray()); 
			}
			
			$this->result($res);
			
		} else {
			$this->error('Can\'t load sensor by Id!');
		}
	}
	
	public function actionCreate(){
		
		$serv = new Sensor();
		$serv->attributes = isset($_POST['Sensor']) ? $_POST['Sensor'] : array();
		
		if($serv->validate()){
			if($serv->save()){
				$this->result($serv);
			} else {
				$this->error("Can't save sensor!");
			}
		} else {
			$this->error("Can't validate sensor!");
		}
	}

}
