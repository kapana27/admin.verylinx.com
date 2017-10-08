<?php
	
	class app {
		
		function __construct() {
			
		}
		
		function run() {
			$r = new route();
			$r->parse($_SERVER["REQUEST_URI"]);
			
			if ($controller = $r->getController()) {
				$method = $r->method;
				$content = $controller->$method();
				echo $content;
				die();
				return;
			}
			/* elseif ($tpl = $r->getTemplate()) {
				$html_tpl = new html_template();
				$html_tpl->load($tpl);
				$html_tpl->parse();
				echo $html_tpl;
			}
			*/
			/* 404 Not Found*/
			//header("404 Not found");
			die("<center><h2>404 Not Found</h2></center>");
		}
		
		
		
	}
	
	
	
	
?>