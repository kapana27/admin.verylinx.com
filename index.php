<?php
die("sssfff");
	ini_set('display_errors', 1);
	error_reporting(E_ALL^E_NOTICE);
	require_once(__DIR__ ."/init.php");

	$app = new app();
	$app->run();