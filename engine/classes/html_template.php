<?php
	
	
	class html_template {
		
		use cache;
		
		private $filename = "";
		private $data = "";
		private $parsed = false;
		
		function load($filename) {
			if ($rs = $this->getCache($filename)) {
				$this->data = $rs;
				$this->parsed = true;
			} else {
				if (is_file($filename)) {
					$this->filename = $filename;
					
					@ob_clean();
					@ob_start();
					@include($this->filename);
					$this->data = @ob_get_contents();
					@ob_clean();
					$this->translate();
				}
			}
		}
		
		function translate() {
			$lang = new lang();
			$langFilename = str_replace("/templates/", "/language/". $lang->current_lang ."/", $this->filename);
			if (@is_file($langFilename)) {
				include($langFilename);
			}
			$this->data = preg_replace_callback("/~(.*?)~/", function ($a) use ($lang) {
				if (!empty($a[1])) {
					return $lang[$a[1]];
				}
				return $a[1];
			}, $this->data);
			
		}
		
		function parse() {
			if ($this->parsed) {
				return;
			}
			$this->data = preg_replace_callback("#\{(load|page)\[([0-9a-zA-z\\\/\.\(\)_-]*)\]\}#", function ($a) {
				if (!empty($a[1])) {
					switch ($a[1]) {
						default:
							// continue
						break;
						case "load":
							$r = new route();
							$r->parse("/".$a[2]);
							if ($tpl = $r->getTemplate(true)) {
								$html_tpl = new html_template();
								$html_tpl->load($tpl);
								$html_tpl->parse();
								return $html_tpl->__toString();
							}
							return "";
						break;
					}
				}
				return $a[0];
			}, $this->data);
			$this->saveCache($this->filename, $this->data);
		}
		
		function __toString() {
			return $this->data;
		}
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
?>