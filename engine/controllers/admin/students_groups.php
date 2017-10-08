<?php
	class students_groups extends controller {
		
		use tableModel;
		
		function getGroups(){
			$this->table = "`students-groups`";
			$this->getData();
		}
		
		function edit() {
			print_r($_POST);
			$this->success();
		}
		
	}
?>