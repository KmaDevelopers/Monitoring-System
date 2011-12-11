<?php

class m110925_213211_AddSensor extends CDbMigration {

	public function up() {

		$this->createTable('Sensor', array(
			'sensorId' => 'pk',
			'serverId' => 'int(11)',
			'serial' => 'varchar(50)',
			'name' => 'varchar(100)',
			'x' => 'int(5) DEFAULT 0',
			'y' => 'int(5) DEFAULT 0',
			'position' => 'varchar(250)',
			'active' => 'INT(1) DEFAULT 1'
		),'ENGINE=INNODB DEFAULT CHARSET=utf8');
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
