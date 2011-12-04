<?php

class UpdateAction extends CAction {

	public function run() {
		$name = $this->getController()->id;

		$json = file_get_contents('php://input');
		$data = CJSON::decode($json);

		$id = $data[$name.'Id'];

		if ($id) {
			$model = KmaActiveRecord::model(ucfirst($name))->findByPk($id);
			if($model) {
				$model->attributes = is_array($data) ? $data : array($data);

				if ($model->save()) {
					$this->getController()->result(array($model->getItemArray()), 1);
				} else {
					$this->getController()->error("{$name} item can't be updated!");
				}
			} else {
				$this->getController()->error("No {$name} item to update!");
			}
		} else {
			$this->getController()->error("No {$name} item to update!");
		}
	}
}