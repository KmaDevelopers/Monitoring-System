<?php
class KmaActiveRecord extends CActiveRecord {
    /**
     *@return string All errors in string
     */
    public function errorsToString() {
        /**
         *@todo show all errors of model (formatted)
         */
        return "You have errors!";
    }

    public function beforeSave() {


    	if(array_key_exists('active',$this->attributes)) {
    		$this->active = intval($this->active); 
    	}
    	return parent::beforeSave();
    }
}
