<?php
	
	
	class controller {
		
		function __construct() {
			$this->require_JSON();
		}
		
		var $is_controller = true;
        /**
         * @var db $db;
         */
		protected $db;
		
		protected function require_db($db="") {
			$this->db = new db();
		}
		
		protected function require_JSON() {
			$postdata = file_get_contents("php://input");
			if (!empty($postdata)) {
				if ($postdata = @json_decode($postdata, true)) {
					foreach ($postdata as $k=>$v) {
						$_POST[$k] = $v;
					}
				}
			}
		}
		
		function session_renew() {
			$this->success();
		}
		
		
		protected function success($a = array()) {
			if (is_array($a)) {
				$a["res"] = "yes";
			} else {
				$a = array(
					"res" => "yes",
					"result" => $a
				);
			}
			$this->response($a);
		}
		
		protected function error($a = array()) {
			if (is_array($a)) {
				$a["res"] = "no";
			} else {
				$a = array(
					"res" => "no",
					"error" => $a
				);
			}
			$this->response($a);
		}
		
		protected function response($a = array()) {
			die(json_encode($a));
		}
		
	}
	
	
	
?>