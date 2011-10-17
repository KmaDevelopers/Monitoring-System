<?php

/**
 * This is the model class for table "Statistics".
 *
 * The followings are the available columns in table 'Statistics':
 * @property integer $statId
 * @property integer $sensorId
 * @property double $temperature
 * @property string $datetime
 */
class Statistics extends KmaActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return Statistics the static model class
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
		return 'Statistics';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('sensorId', 'numerical', 'integerOnly'=>true),
			array('temperature', 'numerical'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('statId, sensorId, temperature', 'safe', 'on'=>'search'),
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
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'statId' => 'Stat',
			'sensorId' => 'Sensor',
			'temperature' => 'Temperature',
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

		$criteria->compare('statId',$this->statId);
		$criteria->compare('sensorId',$this->sensorId);
		$criteria->compare('temperature',$this->temperature);

		return new CActiveDataProvider(get_class($this), array(
			'criteria'=>$criteria,
		));
	}
	
	
	/*
	 * @return array of Statatistics by sensor id
	 */
	public static function getStatisticsBySensorId($sensorId, $criteria){
		$criteriaConfig = array_merge($criteria, array(
				'condition' => 'sensorId = :sensorId',
				'params' => array(':sensorId' => $sensorId)
		));
		
		$criteria = new CDbCriteria($criteriaConfig);
		$stats = Statistics::model()->findAll($criteria);
		$result = array();
		
		foreach($stats as $stat){
			array_push($result, Statistics::prepareItem($stat));
		}

		$countCriteria = new CDbCriteria(array(
			'condition' => 'sensorId = :sensorId',
			'params' => array(':sensorId' => $sensorId),
		));

		$count = Statistics::model()->count($countCriteria);
		return array($result, $count);
	}
	
	public static function prepareItem(Statistics $it) {		
		return $it->attributes;
	}
}
