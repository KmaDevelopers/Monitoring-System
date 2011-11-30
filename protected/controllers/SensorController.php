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
						   'delete',
						   ),
				'users' => array('*'),
			),
			array('deny', // deny all users
				'users' => array('*'),
			),
		);
	}
	
	public function actionCreate() {
		
		
		
		$json = file_get_contents('php://input');

		
		$serv = new Sensor();
		$serv->attributes = CJSON::decode($json);
		
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
