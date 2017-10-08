<?php
	
	
	$globalObjects = array(
		"db",
		"user",
		"lang",
		"mem"
	);
	foreach ($globalObjects as $k=>$v) {
		if (class_exists($v)) {
			$$v = new $v();
		}
	}

	
	
	
	
?>