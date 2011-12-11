<?php

/**
 * This is the model class for table "Sensor".
 *
 * The followings are the available columns in table 'Sensor':
 * @property integer $sensorId
 * @property integer $serverId
 * @property string $serial
 * @property string $name
 * @property @deprecated string $path
 * @property int $x
 * @property int $y
 */
class Sensor extends KmaActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return Sensor the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'Sensor';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('serverId, x, y', 'numerical', 'integerOnly'=>true),
			array('serial', 'length', 'max'=>50),
			array('name', 'length', 'max'=>100),			
			array('active', 'safe'),
//			array('path', 'length', 'max'=>250),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('sensorId, serverId, serial, name, path', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
			'server' => array(self::BELONGS_TO,'Server','serverId'),
			'lastStat' => array(self::HAS_ONE,'Statistics','sensorId','order' => 'statId DESC'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'sensorId' => 'Sensor',
			'serverId' => 'Server',
			'serial' => 'Serial',
			'name' => 'Name',
			'path' => 'Path',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
	 */
	public function search()
	{
		// Warning: Please modify the following code to remove attributes that
		// should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('sensorId',$this->sensorId);
		$criteria->compare('serverId',$this->serverId);
		$criteria->compare('serial',$this->serial,true);
		$criteria->compare('name',$this->name,true);
		$criteria->compare('path',$this->path,true);

		return new CActiveDataProvider(get_class($this), array(
			'criteria'=>$criteria,
		));
	}
	
	public function getItemArray(){
		/**
		 *sensorId 	: 1
		 *name 		: "name"	
		 *x		: 1
		 *y		: 2
		 *ip		: "192.168.1.1"
		 *temp		: 20.4
		 */
		
		$temp = is_array($this->lastStat) ? $this->lastStat->temperature : 0;
		
		return array(
			     'sensorId' => $this['sensorId'],
				 'serial' => $this['serial'],
			     'name' => $this['name'],
			     'x' => $this['x'],
			     'y' => $this['y'],
				 'serverId' => $this['serverId'],
			     // 'ip' => $this->server->ip,
			     'temp' => $temp,
			     'active' => $this['active'],
			     );
	}

	protected static $sensorSerialArray = array();

	public static function getSensorIdBySerial($serial) {
			if(empty(self::$sensorSerialArray)){
				$res = Yii::app()->db->CreateCommand('Select serial,sensorId from Sensor WHERE active = 1')->queryAll(false);
				foreach($res as $v){
					self::$sensorSerialArray[$v[0]] = $v[1];
				}
			}
			if(array_key_exists($serial,self::$sensorSerialArray)){
							return self::$sensorSerialArray[$serial];
			}
			return -1;
	}
}
