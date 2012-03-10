<?php

class UpdateAction extends CAction {

	protected $name = '';

	public function run() {
		$this->name = $this->getController()->id;

		$json = file_get_contents('php://input');
		$data = CJSON::decode($json);

		if (isset($data[$this->name.'Id']) && $data[$this->name.'Id'] > 1) {
			$this->updateItem($data);
			$this->getController()->result($this->accept, 1);
		} else {
			if(is_array($data)) {
				foreach($data as $item) {
					$this->updateItem($item);
				}
				$this->getController()->result($this->accept, count($this->accept));
			} else {
				$this->getController()->error("No {$name} item to update!");
			}
		}
	}

	protected function updateItem($data,$return = true ) {
		$id = isset($data[$this->name.'Id']) ? $data[$this->name.'Id'] : null ;
		$model = KmaActiveRecord::model(ucfirst($this->name))->findByPk($id);
			if($model) {
				$model->attributes = is_array($data) ? $data : array($data);
				if ($model->save()) {
					$this->addToAcceptList($model->getItemArray());
				} else {
					$this->getController()->error("{$this->name} item can't be updated!");
					Yii::end();
				}
			} else {
				$this->getController()->error("No {$this->name} item to update!");
			}
	}

	protected $accept = array();

	protected function addToAcceptList($item) {
		return array_push($this->accept,$item);
	}

}