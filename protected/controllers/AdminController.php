<?php

class AdminController extends KmaController {

	public $layout = 'admin';

	public function actionIndex() {
		$this->render('index');
	}

	public function actions()
	{
		return array();
	}

	public function accessRules() {
	   return array(array('allow', // allow all users to perform 'index' and 'view' actions
	       'actions' => array(
		       		'index',
	        		'error',
	        ), 'users' => array('*'),), 
	        array('deny', // deny all users
	       'users' => array('*'),),);
    }
}