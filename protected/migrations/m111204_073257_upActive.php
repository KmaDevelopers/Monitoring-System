<?php

class m111204_073257_upActive extends CDbMigration
{
	public function up()
	{
		$this->addColumn('Sensor','active','INT(1) DEFAULT 1');
		$this->addColumn('Server','active','INT(1) DEFAULT 1');
	}

	public function down()
	{
		$this->dropColumn('Sensor','active');
		$this->dropColumn('Server','active');
	}
}