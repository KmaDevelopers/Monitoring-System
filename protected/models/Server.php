<?php

/**
 * This is the model class for table "Server".
 *
 * The followings are the available columns in table 'Server':
 * @property integer $serverId
 * @property string $ip
 * @property string $name
 * @property string $path
 */
class Server extends KmaActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return Server the static model class
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
		return 'Server';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('ip', 'length', 'max'=>15),
			array('name', 'length', 'max'=>100),
			array('path', 'length', 'max'=>250),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('serverId, ip, name, path', 'safe', 'on'=>'search'),
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
			'serverId' => 'Server',
			'ip' => 'Ip',
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

		$criteria->compare('serverId',$this->serverId);
		$criteria->compare('ip',$this->ip,true);
		$criteria->compare('name',$this->name,true);
		$criteria->compare('path',$this->path,true);

		return new CActiveDataProvider(get_class($this), array(
			'criteria'=>$criteria,
		));
	}
	
	public function getItemArray(){
		return $this->attributes;
	}
}