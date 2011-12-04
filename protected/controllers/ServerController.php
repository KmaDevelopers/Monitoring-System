<?php

class ServerController extends KmaController {

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
					'list',
					'delete',
<<<<<<< HEAD
=======
					'update',
>>>>>>> b9db33af46f6a0caf34c55bf7752e9fef29533e7
					'create',
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

		$serv = new Server();
		$serv->attributes = CJSON::decode($json);

		if ($serv->validate()) {
			if ($serv->save()) {
				$this->result($serv);
=======
		$serv = new Server();
		if($_POST['Server']){
			$serv->attributes = $_POST['Server'];
		}else{
			$data = CJSON::decode(file_get_contents('php://input'));
			$serv->attributes = CJSON::decode($data);
		}

		if ($serv->validate()) {
			if ($serv->save()) {
				$this->result($serv->getItemArray(NULL),1);
>>>>>>> b9db33af46f6a0caf34c55bf7752e9fef29533e7
			} else {
				$this->error("Can't save server!");
			}
		} else {
			$this->error("Can't validate server!");
		}

		Yii::app()->end();
		
		if ($serv->validate()) {
			if ($serv->save()) {

				/////

				/**
				* @TODO НУЖНО СРАЗУ ЖЕ СОЗДАВАТЬ СЕНСОРЫ ДЛЯ СЕРВЕРА ПРИ СОЗДАНИИ И ПОМЕЧАТЬ ИХ КАК ДЕАКТИВИРОВАНЫЕ
				*/
				try{
					$results = @file_get_contents('http://'.$serv['ip'], 'r');
				}catch(Exception $e) {
					$this->result($serv->getItemArray(),1);
					Yii::app()->end();
				}

				if(empty($results)) {
					$this->result($serv->getItemArray(),1);
					Yii::app()->end();
				}

				$resArray = explode(";",$results);
				
				/**
				* create sensors
				*/

				$insertDataArray = array();
				$date = date('Y-m-d H:i:s');

				for($i = 0 ; $i < count($resArray)/2 ; $i +=2 ){

					$serial = $resArray[$i];
					if(!empty($sensorBySerial[$serial])) {
						$insertDataArray[] = $serial.",{$serv['serverId']},0";
					}
				}

				if(empty($insertDataArray)) {
					$this->result($serv->getItemArray(),1);
					Yii::app()->end();
				}

				$sql = "insert into `Sensor` (serial, serverId, active) VALUES (".implode('),(',$insertDataArray).")";
				Yii::app()->db->createCommand($sql)->execute();	
					
				$this->result($serv->getItemArray('sensors'),1);
			} else {
				$this->error("Can't save server!");
			}
		} else {
			$this->error("Can't validate server!");
		}

	}

	public function actionList() {

		// add pagination
		$models = KmaActiveRecord::model('Server')->findAll();

		if (isset($models)) {
			$res = array_map(function($it) {

						return $it->getItemArray('sensors');
					}, $models);

			$this->result($res);
		} else {
			$this->error("Can't load servers!");
		}
	}

}
