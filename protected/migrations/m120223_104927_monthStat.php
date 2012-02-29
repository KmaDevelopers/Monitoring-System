<?php

class m120223_104927_monthStat extends CDbMigration
{
	public function up()
	{
		$this->createTable('MonthStatistics',array(
			'statId' => 'pk',
			'sensorId' => 'int(11)',
			'temperature' => 'float(10,1)',
			'date' => 'DATE',
		// ),'ENGINE=ARCHIVE DEFAULT CHARSET=utf8');
		),'ENGINE=INNODB DEFAULT CHARSET=utf8');
	}

	public function down()
	{
		$this->dropTable('MonthStatistics');
	}
}