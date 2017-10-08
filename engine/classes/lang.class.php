<?php
	
	
	class lang implements ArrayAccess {
		
		var $data = array();
		var $current_lang = "en";
		
		public function offsetSet($offset, $value) {
			if (is_null($offset)) {
				$this->data[] = $value;
			} else {
				$this->data[$offset] = $value;
			}
		}
		
		public function offsetExists($offset) {
			return isset($this->data[$offset]);
		}
		
		public function offsetUnset($offset) {
			unset($this->data[$offset]);
		}
		
		public function offsetGet($offset) {
			return isset($this->data[md5($offset)]) ? $this->data[md5($offset)] : $offset;
		}
		
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
?>