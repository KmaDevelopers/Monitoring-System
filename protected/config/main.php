<?php

// uncomment the following to define a path alias
// Yii::setPathOfAlias('local','path/to/local-folder');
// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.

    return array(
        'basePath' => dirname(__FILE__) . DIRECTORY_SEPARATOR . '..',
        'name' => 'KMA Web Application',
    
        //	'defaultController' => 'kma/index',
        
        // preloading 'log' component
    
        'preload' => array(
            'log'
        ) ,
    
        // autoloading model and component classes
        'import' => array(
            'application.models.*',
            'application.components.*',
            'application.components.actions.*',
        ) ,
        'modules' => array(
    
            // uncomment the following to enable the Gii tool
            'gii' => array(
                'class' => 'system.gii.GiiModule',
                'password' => '1',
    
                // If removed, Gii defaults to localhost only. Edit carefully to taste.
                'ipFilters' => array(
                    '127.0.0.1',
                    '::1'
                ) ,
            ) ,
        ) ,
        // application components
        'components' => array(
            'user' => array(
    
                // enable cookie-based authentication
                'allowAutoLogin' => true,
            ) ,
    
            // uncomment the following to enable URLs in path-format
            'urlManager' => array(
                'urlFormat' => 'path',
                'showScriptName' => false,
                'caseSensitive' => false,
             'rules' => array(
                    'graphic/<name>' => 'graphic/index/name/<name>',                  
                    
                    array('sensor/get', 'pattern'=>'sensor', 'verb'=>'GET'),
                    array('sensor/get', 'pattern'=>'sensor/<id:\d+>', 'verb'=>'GET'),
                    array('sensor/update', 'pattern'=>'sensor', 'verb'=>'PUT'),
                    array('sensor/delete', 'pattern'=>'sensor', 'verb'=>'DELETE'),
                    array('sensor/create', 'pattern'=>'sensor', 'verb'=>'POST'),
                    
                    array('server/get', 'pattern'=>'server/<id:\d+>', 'verb'=>'GET'),
                    array('server/get', 'pattern'=>'server', 'verb'=>'GET'),
					array('server/update', 'pattern'=>'server', 'verb'=>'PUT'),
                    array('server/delete', 'pattern'=>'server', 'verb'=>'DELETE'),
                    array('server/create', 'pattern'=>'server', 'verb'=>'POST'),
                   					                    
                    array('statistics/list', 'pattern'=>'statistics/<id:\d+>', 'verb'=>'GET'),
                    
                    '<controller:\w+>/<id:\d+>' => '<controller>/list',
                    '<controller:\w+>/<action:\w+>/<id:\d+>' => '<controller>/<action>',
                    '<controller:\w+>/<action:\w+>' => '<controller>/<action>',
                    '<controller:\w+>/<id:\d+>' => '<controller>/view',
                ) ,
            ) ,
    
            //		'db'=>array(
            
            //			'connectionString' => 'sqlite:'.dirname(__FILE__).'/../data/testdrive.db',
    
            
            //		),
    
            
            // uncomment the following to use a MySQL database
    
            'db' => array(
                'connectionString' => 'mysql:host=localhost;dbname=kma',
                'emulatePrepare' => true,
                'username' => 'kma',
                'password' => 'kma',
                'charset' => 'utf8',
            ) ,
            'errorHandler' => array(
                // use 'site/error' action to display errors
                'errorAction' => 'site/error',
            ) ,
            'log' => array(
                'class' => 'CLogRouter',
                'routes' => array(
                    array(
                        'class' => 'CFileLogRoute',
                        'levels' => 'error, warning',
                    ) ,
    
                    // uncomment the following to show log messages on web pages
                    
                    /*
    
                    array(
                    'class'=>'CWebLogRoute',
                    ),
                    */
                ) ,
            ) ,
        ) ,
    
        // application-level parameters that can be accessed
        
        // using Yii::app()->params['paramName']
    
        'params' => array(
    
            // this is used in contact page
            'adminEmail' => 'webmaster@example.com',
        ) ,
    );
