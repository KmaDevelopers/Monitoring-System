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
}
