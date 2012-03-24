<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="language" content="en" />
    <link rel="stylesheet" href="/adminJs/lib/extjs/resources/css/ext-all-gray.css" />
    <!--<link rel="stylesheet" href="./adminJs/resources/css/my-ext-theme.css" />-->
    <?php include dirname(__FILE__) . "/../../../protected/config/jsEnvs/env.php"; ?>
    <title><?php echo CHtml::encode($this->pageTitle); ?></title>
    <style type='text/css'>
	.sensor {
	    background-size: 40px;
	}

	.grid-no-data {
	    width:100%;
	    height:100%;
	    background-image:url('/images/grid-no-data.png');
	    background-position: center;
	    background-repeat: no-repeat;
	    background-size: 160px;
	}

	.active-icon {
		width: 40px;
		background: url('/images/admin/active-icon.png') no-repeat;
		background-size: 40px;
		height: 40px;
	}

	.inactive-icon {
		width: 40px;
		background: url('/images/admin/inactive-icon.png')no-repeat;
		background-size: 40px;
		height: 40px;
	}

	.edit-link img{
		cursor: pointer;
	}

	.edit-icon,
	.graphic-icon {
		margin-right: 5px;
	}

	.edit-icon {
		height: 37px;
	}

	.graphic-icon {
		width: 40px;
		height: 40px;
	}

	.x-grid-row {
		height: 40px;
		vertical-align: middle;
	}
    </style>
</head>

<body>

</body>
</html>
