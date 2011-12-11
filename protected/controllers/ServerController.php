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
					'update',
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
		$json = file_get_contents('php://input');

		$serv = new Server();
		$serv->attributes = CJSON::decode($json);
		
		if ($serv->validate()) {
			if ($serv->save()) {
				/////

				/**
				* @TODO НУЖНО СРАЗУ ЖЕ СОЗДАВАТЬ СЕНСОРЫ ДЛЯ СЕРВЕРА ПРИ СОЗДАНИИ И ПОМЕЧАТЬ ИХ КАК ДЕАКТИВИРОВАНЫЕ
				*/
				try{
					$results = file_get_contents('http://'.$serv['ip'].'/', 'r');
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
				
				$c = count($resArray);				
				if($c >= 2)
					for($i = 0 ; $i < $c/2 ; $i +=2 ){
					
						$serial = $resArray[$i];
						$id = (int) Sensor::getSensorIdBySerial($serial);
						if($id < 0) {
							$insertDataArray[] = "'{$serial}','{$serial}',{$serv['serverId']},1";
						}
					}

				if(empty($insertDataArray)) {
					$this->result($serv->getItemArray(),1);
					Yii::app()->end();
				}
				
				$sql = "insert into `Sensor` (serial, name ,serverId, active) VALUES (".implode('),(',$insertDataArray).")";
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
