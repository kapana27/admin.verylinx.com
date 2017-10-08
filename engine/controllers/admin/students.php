<?php
	
	
	class students extends controller {
		
		use tableModel;
		
		function editProperty() {
			$id = intval($_POST["id"]);
			if (!empty($id)) {
				$this->require_db();
				if ($id == -1) {
					if ($this->db->query("
						insert
							`students-property-types`
						set
							`type` = '".$this->db->escape($_POST["type"])."',
							`datatype` = '".$this->db->escape($_POST["datatype"])."',
							`icon` = '".$this->db->escape(json_encode($_POST["icon"]))."',
							`name` = '".$this->db->escape($_POST["name"])."',
							`data` = '".$this->db->escape(json_encode($_POST["data"]))."'
						;
					")) {
						$this->success();
					}
				} else {
					if ($this->db->query("
						update
							`students-property-types`
						set
							`type` = '".$this->db->escape($_POST["type"])."',
							`datatype` = '".$this->db->escape($_POST["datatype"])."',
							`icon` = '".$this->db->escape(json_encode($_POST["icon"]))."',
							`name` = '".$this->db->escape($_POST["name"])."',
							`data` = '".$this->db->escape(json_encode($_POST["data"]))."'
						where
							`id` = '".$this->db->escape($id)."'
						limit
							1
						;
					")) {
						$this->success();
					}
				}
			}
			$this->error();
		}
		
		function getProperty() {
			$this->table = "`students-property-types`";
			$this->getData(function ($a) {
				if (!($a["data"] = json_decode($a["data"]))) {
					$a["data"] = array();
				}
				if (!($a["icon"] = json_decode($a["icon"]))) {
					$a["icon"] = array();
				}
				return $a;
			});
		}
		
	}
	
	
?>