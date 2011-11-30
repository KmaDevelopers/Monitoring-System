<?php
/**
 * Controller is the customized base controller class.
 * All controller classes for this application should extend from this base class.
 */
class KmaController extends CController {
   
	public function filters() {
		return array('accessControl', // perform access control for CRUD operations
		);
    }
    /**
     * Specifies the access control rules.
     * This method is used by the 'accessControl' filter.
     * @return array access control rules
     */
    public function accessRules() {
	throw new CHttpException(400, 'No rules for filter!');
    }
    /**
     * @var string the default layout for the controller view. Defaults to '//layouts/column1',
     * meaning using a single column layout. See 'protected/views/layouts/column1.php'.
     */
    public $layout = null; //'//layouts/column1';
    
    /**
     * @var array context menu items. This property will be assigned to {@link CMenu::items}.
     */
    public $menu = array();
    /**
     * @var array the breadcrumbs of the current page. The value of this property will
     * be assigned to {@link CBreadcrumbs::links}. Please refer to {@link CBreadcrumbs::links}
     * for more details on how to specify this property.
     */
    public $breadcrumbs = array();
    
    public function actions(){
        return array(
			'get' => 'application.components.actions.GetAction',
			'delete' => 'application.components.actions.DeleteAction'
			);
    }

    public function beforeAction($action) {
	//if(Yii::app()->request->isAjaxRequest) {
	//
	//	//throw new CHttpException(400,"Page is not available!");
	//
	//	echo CJSON::encode(array(
	//		'success' => false,
	//		'msg' => 'You can load this page!'
	//		));
	//
	//	Yii::app()->end();
	//}
	return parent::beforeAction($action);
    }

    public function result($items,$count=null) {
    	if (!is_array($items)) {
    	    $items = array($items);
    	}
    	echo CJSON::encode(array('success' => true, 'items' => $items,'total'=>$count));
    }

    public function error($msg) {
	   echo CJSON::encode(array('success' => false, 'msg' => $msg,));
    }
}
