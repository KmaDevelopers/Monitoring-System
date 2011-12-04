<?php

<<<<<<< HEAD

class DeleteAction extends CAction {

	public function run()
	{
		$name = $this->getController()->id;
		
		$id = (int) file_get_contents('php://input');		
		
		if($id) {
			$model = KmaActiveRecord::model(ucfirst($name))->findByPk($id);
			if($model->delete()) {
				$this->getController()->result(array());
			} else {
				$this->getController()->error("{$name} item can't be deleted!");	
			}
		}else{
			$this->getController()->error("No {$name} item to delete!");
		}
	}
=======
class DeleteAction extends CAction {

	public function run() {
		$name = $this->getController()->id;

		$id = CJSON::decode(file_get_contents('php://input'));
		$id = $id[$name.'Id'];

		if ($id) {
			$model = KmaActiveRecord::model(ucfirst($name))->findByPk($id);
			if($model) {
				if ($model->delete()) {
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

>>>>>>> b9db33af46f6a0caf34c55bf7752e9fef29533e7
}