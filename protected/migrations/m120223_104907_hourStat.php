<?php

class m120223_104907_hourStat extends CDbMigration
{
	public function up()
	{
		
		$this->createTable('HourStatistics',array(
			'statId' => 'pk',
			'sensorId' => 'int(11)',
			'temperature' => 'float(10,1)',
			'date' => 'DATETIME',
		// ),'ENGINE=ARCHIVE DEFAULT CHARSET=utf8');
		),'ENGINE=INNODB DEFAULT CHARSET=utf8');
		
	}

	public function down()
	{
		$this->dropTable('HourStatistics');
	}
}