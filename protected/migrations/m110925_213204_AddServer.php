<?php

class m110925_213204_AddServer extends CDbMigration {

	public function up() {
		$this->createTable('Server', array(
			'serverId' => 'pk',
			'ip' => 'varchar(20)',
			'name' => 'varchar(100)',
			'path' => 'varchar(250)',
			'active' => 'INT(1) DEFAULT 1'
		),'ENGINE=INNODB DEFAULT CHARSET=utf8');
	}

	public function down() {
		$this->dropTable('Server');
	}

}
