<?php

	ini_set('display_errors', 1);
	error_reporting(E_ALL^E_NOTICE);
	require_once(__DIR__ ."/init.php");

	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: Content-Type, Authorization");

	$app = new app();
	$app->run();