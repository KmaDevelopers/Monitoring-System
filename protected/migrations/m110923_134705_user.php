<?php

class m110923_134705_user extends CDbMigration
{
	public function up() {
		$this->createTable('User', array(
			'userId' => 'pk',
			'login' => 'varchar(20)',
			'password' => 'varchar(50)',
		),'ENGINE=ARCHIVE DEFAULT CHARSET=utf8');
	}

	public function down() {
		$this->dropTable('User');
	}

}