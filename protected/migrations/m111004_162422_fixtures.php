<?php

class m111004_162422_fixtures extends CDbMigration
{
	public function up()
	{
		for($i=1;$i<10;$i++){
			$this->execute("insert into `Sensor` 
							values ($i, 1, 'serial1', 'sensor" . $i . "', '{x:100,y:$i}','in the room')");
		}

		$this->execute("insert into `Server` values (1, '192.168.1.100', 'server1', 'in the room')");


		for($i=0;$i<100;$i++){
			$this->execute("insert into `Statistics` (`sensorId`,`temperature`,`date`) values (1, 23, now())");
		}
	}

	public function down()
	{
		$this->execute("truncate table `Sensor`");
		$this->execute("truncate table `Statistics`");
		$this->execute("truncate table `Server`");
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