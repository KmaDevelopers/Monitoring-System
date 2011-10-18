<?php

class m111004_162422_fixtures extends CDbMigration
{
	public function up()
	{

		$this->execute("Truncate `Sensor`");
		$this->execute("Truncate `Server`");
		$this->execute("Truncate `Statistics`");

		$this->execute("insert into `Server` values (1, '127.0.0.1:8000', 'server1', 'in the room')");

		//for($i=1;$i<10;$i++){
			// $this->execute("insert into `Sensor` 
			// 				values ($i, 1, 'serial1', 'sensor" . $i . "', '{x:100,y:$i}','in the room')");
		// }

		$this->execute("insert into `Sensor` values (1, 1, 'serial1', 'sensor1', '{x:100,y:100}','in the room')");
		

		for($i=0;$i<100;$i++){
			$val = rand(10,30);
			$time = date('Y-m-d H:i:s',(time() + $i * 120));
			$this->execute("insert into `Statistics` (`sensorId`,`temperature`,`date`) values (1, {$val}, '{$time}')");
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