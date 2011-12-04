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
						   'update',
						   ),
				'users' => array('*'),
			),
			array('deny', // deny all users
				'users' => array('*'),
			),
		);
	}
	
	public function actionCreate() {
		
		$sens = new Sensor();

		if(isset($_POST['Sensor'])) {
			$sens->attributes = $_POST['Sensor'];
		}else{
			$data = CJSON::decode(file_get_contents('php://input'));
			$sens->attributes = $data;
		}
		
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
