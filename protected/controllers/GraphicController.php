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

		 	$ids = Yii::app()->db->createCommand("select sensorId from Sensor")->queryColumn();
		 	$list = implode(',',$ids);
			
			// Setup the graph
			$graph = new Graph(800,600);
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

			$dates = Yii::app()->db->createCommand('select date from Statistics where sensorId in ('.$list.')')->queryColumn();
			
			$dates = array_map(function($it){
				return date('m/d/y H:i', strtotime($it));
			},$dates);
			
			$graph->xaxis->SetTickLabels($dates);
//			$graph->xaxis->label_angle = 65;
			$graph->xaxis->label_angle = 75;
			$graph->xaxis->HideTicks(false,false);


			foreach($ids as $id) {
			$data = Yii::app()->db->
								createCommand('select temperature from Statistics where sensorId = '.$id )->queryColumn();

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