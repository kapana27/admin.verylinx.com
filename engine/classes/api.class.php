<?php
	
	class api {

        /**
         * @var db $db;
         */
		var $db = null;
		
		function __construct() {
			
		}
		
		function require_db(/** @noinspection PhpUnusedParameterInspection */
            $db="") {
			if ($this->db == null) {
				$this->db = new db();
			}
		}
		
	}
	
