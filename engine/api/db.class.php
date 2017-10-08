<?php
	
	class db extends mysqli {
		
		var $con = null;
		var $connected = false;
		
		private $mysql_server	= "46.105.221.101";
		private $mysql_user		= "verylinx";
		private $mysql_pass		= "P3n{d8:N6-hP#EAS";
		private $database_name	= "verylinx";
		
		function __construct($db="") { 
			$this->connect_db($db);
		}
		
		function connect_db($db="") {
			if (!$this->connected) {
				$this->connect($this->mysql_server, $this->mysql_user, $this->mysql_pass, $this->database_name,3306);
				if ($this->connect_errno) {
					$this->connected = false;
				} else {
					$this->connected = true;
					$this->query("set names utf8");
					if (!empty($db)) {
						$this->select_db($db);
					}
				}
			}
		}
		
		function escape($string) {
			return $this->real_escape_string($string);
		}
		
		
		
	}
	
	
?>