<?php

class m110926_122500_AddStatistics extends CDbMigration {

	public function up() {
		$this->createTable('Statistics',array(
			'statId' => 'pk',
			'sensorId' => 'int(11)',
			'temperature' => 'float(10,1)',
		));
	}

	public function down() {
		$this->dropTable('Statistics');
		
	}

}