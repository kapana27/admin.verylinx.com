<?php
	
	trait cache {
		
		var $cache_status = false;
		var $cache_prefix = "_cache_";
		var $cache_timeout = 300; // 5 minute
		
		function saveCache($key, $val) {
			global $mem;
			if ($this->cache_status) {
				$mem->init_mem();
				$mem->set($this->cache_prefix . md5($key), $val, time() + $this->cache_timeout);
			}
		}
		
		function getCache($key) {
			global $mem;
			if ($this->cache_status and (!isset($_REQUEST["live"]))) {
				$mem->init_mem();
				return $mem->get($this->cache_prefix . md5($key));
			}
			return false;
		}
		
		
	}
	
	
	
	
?>