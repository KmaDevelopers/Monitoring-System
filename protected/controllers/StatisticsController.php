<?php
class StatisticsController extends KmaController {
    /**
     * Specifies the access control rules.
     * This method is used by the 'accessControl' filter.
     * @return array access control rules
     */
    public function accessRules() {
		return array(array('allow', // allow all users to perform 'index' and 'view' actions
			'actions' => array('list',), 'users' => array('*'),), array('deny', // deny all users
			'users' => array('*'),),
		);
    }
    public function actionList() {
		$sensorId = Yii::app()->request->getParam('id', 1);
		$sort = Yii::app()->request->getParam('sort', 'statId');
		$order = Yii::app()->request->getParam('dir', 'ASC');
		$page = Yii::app()->request->getParam('page', 0);
		$start = Yii::app()->request->getParam('start', 0);
		$size = Yii::app()->request->getParam('limit', 25);


		$criteria = array(
			'order' => $sort . ' ' . $order,
			'limit' => $size,
			'offset' => $start
		);

		$sensor = Sensor::model()->findByPk($sensorId);

		if($sensor) {
			list($items, $count) = Statistics::getStatisticsBySensorId($sensorId, $criteria);
			$this->result($items, $count);
		} else {
			$this->error("Sensor's $sensorId Statistics not found");
		}
    }
}
