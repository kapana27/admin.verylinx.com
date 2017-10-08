<?php
	
	$classDirectories = array(
		__DIR__ . "/classes",
		__DIR__ . "/api",
		__DIR__ . "/controllers"
	);
	$classPrefix = array(
		".class"
	);
	$template_priority = array();
	
	function ini_loader($className) {
		$className = strtolower($className);
		global $classDirectories, $classPrefix;
		foreach ($classDirectories as $k=>$dir) {
			if (is_file($dir."/".$className.".php")) {
				require_once($dir."/".$className.".php");
				return;
			} else {
				foreach ($classPrefix as $kk=>$pref) {
					if (is_file($dir."/".$className.$pref.".php")) {
						require_once($dir."/".$className.$pref.".php");
						return;
					}
				}
			}
		}
	}
	require_once(__DIR__ . "/../vendor/autoload.php");
	spl_autoload_register("ini_loader", true, true);
	
	
	
	
	
	
	
	
	
	
?>