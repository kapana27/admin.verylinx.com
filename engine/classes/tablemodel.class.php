<?php
	
	
	trait tableModel {
		
		var $table = "students";
		var $select = "*";
		var $count = "count(`id`) as `co`";
		var $where = "";
		
		function getData($callback=null) {
			$this->require_db();
			
			$page = intval($_POST["page"]);
			if ($page<1) $page = 1;
			$limit = intval($_POST["limit"]);
			if ($limit <10) {
				$limit = 10;
			}
			
			$total = $this->db->query("
				select
					".$this->count."
				from
					".$this->table."
					".$this->where."
			;
			")->fetch_assoc()["co"];
			$r = $this->db->query("
				select
					".$this->select."
				from
					".$this->table."
					".$this->where."
				limit
					".($page*$limit-$limit).", ".$limit."
				;
			");
			$a = array();
			while ($rr = $r->fetch_assoc()) {
				if ($callback != null) {
					$rr = $callback($rr);
				}
				$a[] = $rr;
			}
			$this->success(array(
				"items" => $a,
				"total" => $total
			));
		}
		
		
	}
	
	
	
?>