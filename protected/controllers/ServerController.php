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
				$this->result($serv);
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
