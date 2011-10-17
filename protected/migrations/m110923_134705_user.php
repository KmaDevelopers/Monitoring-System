<?php

class m110923_134705_user extends CDbMigration
{
	public function up() {
		$this->createTable('User', array(
			'userId' => 'pk',
			'login' => 'varchar(20)',
			'password' => 'varchar(50)',
		));
	}

	public function down() {
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