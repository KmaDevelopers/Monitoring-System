<?php


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
}