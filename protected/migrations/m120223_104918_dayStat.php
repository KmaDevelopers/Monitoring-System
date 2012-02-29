<?php

class m120223_104918_dayStat extends CDbMigration
{
	public function up()
	{
		$this->createTable('DayStatistics',array(
			'statId' => 'pk',
			'sensorId' => 'int(11)',
			'temperature' => 'float(10,1)',
			'date' => 'DATE',
		// ),'ENGINE=ARCHIVE DEFAULT CHARSET=utf8');
		),'ENGINE=INNODB DEFAULT CHARSET=utf8');
	}

	public function down()
	{
		$this->dropTable('DayStatistics');
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