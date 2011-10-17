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
						   'create',
						   ),
				'users' => array('*'),
			),
			array('deny', // deny all users
				'users' => array('*'),
			),
		);
	}
	
	public function actionIndex(){
		$this->result(array());
	}
	
	public function actionGet() {
		
		$serverId = $_REQUEST['id'];
		
		$serv = Server::model()->findByPk($serverId);
		
		if($serv){
			$this->result(array(
				$serv->getItemArray()
			));
		} else {
			$this->error('Can\'t load server by Id!');
		}
	}
	
	public function actionCreate(){
		
		$serv = new Server();
		$serv->attributes = $_REQUEST['Server'];
		
		if($serv->validate()){
			if($serv->save()){
				$this->result($serv);
			} else {
				$this->error("Can't save server!");
			}
		} else {
			$this->error("Can't validate server!");
		}
		
	}
	
}
