<?php
	
	class navigation extends controller {
		
		function navigation() {
			$this->success(array(
				"items" => json_decode(file_get_contents(__DIR__ . "/../../../public_html/data/admin/json/menu.json"))
			));
		}
		
		
	}