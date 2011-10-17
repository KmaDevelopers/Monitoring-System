<?php
class SiteController extends KmaController {
    /**
     * Specifies the access control rules.
     * This method is used by the 'accessControl' filter.
     * @return array access control rules
     */
    public function accessRules() {
	return array(array('allow', // allow all users to perform 'index' and 'view' actions
	'actions' => array('index', 'error',), 'users' => array('*'),), array('deny', // deny all users
	'users' => array('*'),),);
    }
    /**
     * This is the default 'index' action that is invoked
     * when an action is not explicitly requested by users.
     */
    public function actionIndex() {
	// renders the view file 'protected/views/site/index.php'
	// using the default layout 'protected/views/layouts/main.php'
	$this->render('index');
    }
    /**
     * This is the action to handle external exceptions.
     */
    public function actionError() {
	if ($error = Yii::app()->errorHandler->error) {
	    $this->error($error['message']);
	}
    }
}
