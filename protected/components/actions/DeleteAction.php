<?php

class DeleteAction extends CAction {

	public function run() {
		$name = $this->getController()->id;

		$id = CJSON::decode(file_get_contents('php://input'));
		$id = $id[$name.'Id'];

		if ($id) {
			$model = KmaActiveRecord::model(ucfirst($name))->findByPk($id);
			if($model) {

				if ($model->delete()) {
					Yii::app()->db->createCommand("Update Sensor set active = 0 where serverId = {$id}")->execute();
					$this->getController()->result(array(), 0);
				} else {
					$this->getController()->error("{$name} item can't be deleted!");
				}
			} else {
				$this->getController()->error("No {$name} item to delete!");
			}
		} else {
			$this->getController()->error("No {$name} item to delete!");
		}
	}

}
