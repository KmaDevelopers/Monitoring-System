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
		$serv->attributes = $_POST['Server'];

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
