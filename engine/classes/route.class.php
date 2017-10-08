<?php
	
	class route {
		
		var $controller = "";
		private $template_directory;
		private $default_tpl = "main";
		var $method = "";
		
		function __construct() {
			$this->template_directory = __DIR__ ."/../../templates";
		}
		
		function parse($url) {
			$a = explode("/", $url);
			$b = array();
			foreach ($a as $k=>$v) {
				if (!empty($v) and preg_match("/^[a-zA-z0-9\-_]+$/", $v)) {
					$b[] = $v;
				}
			}
			if (isset($b[0])) {
				$this->controller = $b[0];
			}
			if (isset($b[1])) {
				$this->method = $b[1];
			}
		}


        function getController() {
		    $inc_class = "controllers\\".$this->controller;
			if (class_exists($this->controller)) {
				$c = new $inc_class();
				if ($c->is_controller) {
					if (method_exists($c, $this->method)) {
						$reflection = new ReflectionMethod($c, $this->method);
						if ($reflection->isPublic()) {
							return $c;
						}
					}
				}
			}
			return false;
		}
		
		function getTemplate($no_default=false) {
			global $template_priority;
			
			if (empty($this->controller)) {
				if ($no_default) {
					return false;
				}
				foreach ($template_priority as $k=>$v) {
					if (is_dir($this->template_directory ."/$v") and is_file($this->template_directory ."/$v/".$this->default_tpl.".php")) {
						return $this->template_directory ."/$v/".$this->default_tpl.".php";
					}
				}
			} else {
				$tpl = $this->controller;
				foreach ($template_priority as $k=>$v) {
					if (is_dir($this->template_directory ."/$v") and is_file($this->template_directory ."/$v/$tpl.php")) {
						return $this->template_directory ."/$v/$tpl.php";
					}
				}
				if ($no_default) {
					return false;
				}
				/*
				foreach ($template_priority as $k=>$v) {
					if ($k>0) {
						if (is_dir($this->template_directory ."/$v") and is_file($this->template_directory ."/$v/".$this->default_tpl.".php")) {
							return $this->template_directory ."/$v/".$this->default_tpl.".php";
						}
					}
				}
				// */
			}
			if ($no_default) {
				return false;
			}
			$this->not_found();
			die();
			//return $this->template_directory ."/".$template_priority[0]."/".$this->default_tpl.".php";
		}
		
		
		function not_found() {
			header("HTTP/1.1 404 Not Found");
			die("404 Not Found");
		}
		
	}
	
	
	
?>