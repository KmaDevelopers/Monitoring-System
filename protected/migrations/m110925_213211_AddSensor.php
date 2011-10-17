<?php

class m110925_213211_AddSensor extends CDbMigration {

	public function up() {

		$this->createTable('Sensor', array(
			'sensorId' => 'pk',
			'serverId' => 'int(11)',
			'serial' => 'varchar(50)',
			'name' => 'varchar(100)',
			'path' => 'varchar(250)',
			'position' => 'varchar(250)',
		));
	}

	public function down() {
		$this->dropTable('Sensor');
	}

	/*
	  // Use safeUp/safeDown to do migration with transaction
	  public function safeUp()
	  {
	  }

	  public function safeDown()
	  {
	  }
	 */
}