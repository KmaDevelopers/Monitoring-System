<?php

class m111129_175556_upSensors extends CDbMigration {

	public function up() {
		$this->dropColumn('Sensor', 'path');
		$this->addColumn('Sensor', 'x','INT(11) DEFAULT 0');
		$this->addColumn('Sensor', 'y','INT(11) DEFAULT 0');
	}

	public function down() {
		$this->dropColumn('Sensor', 'x');
		$this->dropColumn('Sensor', 'y');
		$this->addColumn('Sensor', 'path','VARCHAR(250)');
		$this->execute('update Sensor set path = \'{x:100,y:100}\'');
	}
	
}

	