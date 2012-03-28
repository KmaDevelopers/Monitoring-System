<?php

class GraphicController extends KmaController
{

	public $defaultAction = 'index';
	/**
     * Specifies the access control rules.
     * This method is used by the 'accessControl' filter.
     * @return array access control rules
     */
    public function accessRules() {
		
		return array(
			array('allow', // allow all users to perform 'index' and 'view' actions
			'actions' => array('index',), 
				'users' => array('*'),), 
			array('deny', // deny all users
				'users' => array('*'),),
		);
    }
		
	public function actions() {
		return array();
	}
	
	public function actionIndex($name) {

		 require_once (Yii::getPathOfAlias('application').'/vendors/jpgraph/jpgraph.php');
		 require_once (Yii::getPathOfAlias('application').'/vendors/jpgraph/jpgraph_line.php');
		 require_once (Yii::getPathOfAlias('application').'/vendors/jpgraph/jpgraph_date.php');

		 /*************
		 **************
		 *************/

		 if(isset($_REQUEST['filter']) && !empty($_REQUEST['filter'])){
			$filter = CJSON::decode($_REQUEST['filter']);
			$dateFrom = isset($filter['startDate']) ? $filter['startDate'] : null;
			$dateTo = isset($filter['endDate']) ? $filter['endDate'] : null;
			$sensorIds = isset($filter['sensorIds']) ? $filter['sensorIds'] : null;
		} else {
			$date = time();			
			$dateFrom = date('Y-m-d H:i:s',$date-(60*60*2));
			$dateTo = date('Y-m-d H:i:s',$date);
			$sensorIds = Yii::app()->db->createCommand("select * from Sensor where active = 1")->queryColumn();
		}
		
		if(!is_array($sensorIds) || empty($sensorIds) ){
			$sensorIds = Yii::app()->db->createCommand("select * from Sensor where active = 1")->queryColumn();
		}
		
		$sensorList = implode(',',$sensorIds);
		
		$sql = "select sensorId,serial from Sensor where sensorId in ({$sensorList})";
		$res = Yii::app()->db->createCommand($sql)->queryAll(false);
		
		$sensorSerialById = array();
		
		foreach ($res as $v) {
			$sensorSerialById[$v[0]] = $v[1];
		}
		
		$tableName = 'Statistics'; // change table name when we change period

		$period = abs(strtotime($dateTo) - strtotime($dateFrom));
		
		if($period <= (60*60*2)){ // 2 hours
			$tableName = 'Statistics';
		}elseif($period > (60*60*2) && $period < (60*60*24)){ // 1 day
			$tableName = 'HourStatistics';
		}elseif($period > (60*60*24) && $period < (60*60*24 * 20)){ // 20 day
			$tableName = 'DayStatistics';
		}else{
			$tableName = 'MonthStatistics';
		}
		
		$sql = "
			select * FROM {$tableName} `stat`
			WHERE date BETWEEN '{$dateFrom}' AND '{$dateTo}'
			AND sensorId in ({$sensorList})
			ORDER BY date ASC
		";
		
		/*************
		 **************
		 *************/

			// Setup the graph
			$graph = new Graph(2000,600);
			$graph->SetScale("datelin");

//			$theme_class = new UniversalTheme;

//			$graph->SetTheme($theme_class);
//			$graph->img->SetAntiAliasing(false);
//			$graph->title->Set('Температурный график',15);
			$graph->SetBox(false);

			$graph->img->SetAntiAliasing();

			$graph->yaxis->HideZeroLabel();
			$graph->yaxis->HideLine(false);
			$graph->yaxis->HideTicks(false,false);

			$graph->xgrid->Show();
			$graph->xgrid->SetLineStyle("solid");

			$dates = Yii::app()->db->createCommand($sql)->queryColumn();
			
			$dates = array_map(function($it){
				return date('m/d/y H:i', strtotime($it));
			},$dates);
			
			$graph->xaxis->SetTickLabels($dates);
//			$graph->xaxis->label_angle = 65;
			$graph->xaxis->label_angle = 75;
			$graph->xaxis->HideTicks(false,false);


			foreach($sensorIds as $id) {
			$data = Yii::app()->db->
								createCommand("select temperature from {$tableName} where sensorId = ".$id )->queryColumn();

						// Create the graph line
						$p1 = new LinePlot($data);
						$graph->Add($p1);
						$p1->SetColor("#".dechex( $id * 4132));
						$p1->SetLegend('Sensor '.$id);
						
						$graph->legend->SetPos(0.5,0.94);
						$graph->legend->SetFrameWeight(1);
			}
			// Output line
			$graph->Stroke();

	}

}