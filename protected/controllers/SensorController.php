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
<<<<<<< HEAD
=======
						   'update',
>>>>>>> b9db33af46f6a0caf34c55bf7752e9fef29533e7
						   ),
				'users' => array('*'),
			),
			array('deny', // deny all users
				'users' => array('*'),
			),
		);
	}
	
	public function actionCreate() {
<<<<<<< HEAD
		
		
		
		$json = file_get_contents('php://input');

		
		$serv = new Sensor();
		$serv->attributes = CJSON::decode($json);
		
		$serv->attributes = isset($_POST['Sensor']) ? $_POST['Sensor'] : array();
=======
		
		$sens = new Sensor();
		$sens->attributes = $_POST['Sensor'];
		
		$sens->attributes = isset($_POST['Sensor']) ? $_POST['Sensor'] : array();
>>>>>>> b9db33af46f6a0caf34c55bf7752e9fef29533e7
		
		if($sens->validate()){
			if($sens->save()){
				$this->result($sens->getItemArray(),1);
			} else {
				$this->error("Can't save sensor!");
			}
		} else {
			$this->error("Can't validate sensor!");
		}
	}

}
