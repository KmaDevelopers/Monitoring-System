<?php

class ServerController extends KmaController
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
	
	public function actionCreate(){
		
		$serv = new Server();
		$serv->attributes = $_REQUEST['Server'];
		
		if($serv->validate()) {
			if($serv->save()) {
				$this->result($serv);
			} else {
				$this->error("Can't save server!");
			}
		} else {
			$this->error("Can't validate server!");
		}
	}
	
	public function actionList(){
		
		// add pagination
		$models = KmaActiveRecord::model('Server')->findAll();
		
		if(isset($models)) {
			$res = array_map(function($it){
					return $it->getItemArray('sensors');
				}, $models);
			
				$this->getController()->result($res);
		} else {
			$this->getController()->error("Can't load servers!");
		}
	}
	
}
