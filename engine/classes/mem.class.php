<?php
	
	
	class mem extends memcached {
		
		var $connected = false;
		
		function init_mem() {
			if (!$this->connected) {
				$this->addServer("127.0.0.1", 11211);
				$this->connected = true;
			}
		}
		
	}
	
	
	
	
	
?>