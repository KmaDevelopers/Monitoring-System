<?php

class m110925_213204_AddServer extends CDbMigration {

	public function up() {
		$this->createTable('Server', array(
			'serverId' => 'pk',
			'ip' => 'varchar(15)',
			'name' => 'varchar(100)',
			'path' => 'varchar(250)',
		));
	}

	public function down() {
		$this->dropTable('Server');
	}

}