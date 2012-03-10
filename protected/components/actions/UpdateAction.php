<?php

class UpdateAction extends CAction {

	protected $name = '';

	public function run() {
		$this->name = $this->getController()->id;

		$json = file_get_contents('php://input');
		$data = CJSON::decode($json);

		$id = $data[$this->name.'Id'];
		if ($id) {
			$this->updateItem($data);
			$this->getController()->result($this->accept, 1);
		} else {
			if(is_array($data)) {
				foreach($data as $item){
					$this->updateItem($item);
				}
				$this->getController()->result($this->accept, count($this->accept));
			} else {
				$this->getController()->error("No {$name} item to update!");
			}
		}
	}

	protected function updateItem($data,$return = true ) {
		$id = $data[$this->name.'Id'];
		$model = KmaActiveRecord::model(ucfirst($this->name))->findByPk($id);
			if($model) {
				$model->attributes = is_array($data) ? $data : array($data);
				if ($model->save()) {
					$this->addToAcceptList(array($model->getItemArray()));
				} else {
					$this->getController()->error("{$name} item can't be updated!");
					Yii::end();
				}
			} else {
				$this->getController()->error("No {$name} item to update!");
			}
	}

	protected $accept = array();

	protected function addToAcceptList($item) {
		return array_push($this->accept,$item);
	}

}