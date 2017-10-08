<?php



	class user extends api {
	
		var		$id			= "";
		var		$username	= "";
		var		$name		= "";
		var		$fname		= "";
		var		$lname		= "";
		var		$type		= "standart";
		var		$data		= array();
		var     $jwtKey     = "793vWfptMg6sH5ejIU6fH";
		var     $userLevel = "guest";

		function __construct() {
			global $classDirectories, $template_priority;
			
			if ($this->is_loged()) {
				$this->id = $_SESSION["user_data"]["id"];
				$this->username = $_SESSION["user_data"]["mail"];
				$this->name = $_SESSION["user_data"]["fname"]." ".$_SESSION["user_data"]["lname"];
				$this->fname = $_SESSION["user_data"]["fname"];
				$this->lname = $_SESSION["user_data"]["lname"];
				$this->type = $_SESSION["user_data"]["type"];
				$this->data = $_SESSION["user_data"];		
				$classDirectories[] = __DIR__ . "/../controllers/".$this->userLevel;
				$template_priority[] = $this->userLevel;
			} else {
				$template_priority[] = "guest";
				$classDirectories[] = __DIR__ . "/../controllers/guest";
			}
		
		}
		
		function is_loged() {
			return !empty($_SESSION["user_data"]["id"]);
		}

		function auth($username, $password) {
			$this->require_db("main"); 
			$r = $this->db->query("
				select
					*
				from
					`users`
				where
					(
						`mail` = '".$this->db->escape($username)."'
					)
					and `password` = '".$this->db->escape($this->crypt($password))."'
				limit
					1
				;
			")->fetch_assoc();
			if (!empty($r["id"])) {
				unset($r["password"]);
				$_SESSION["user_data"] = $r;
				$_SESSION["user_level"] = "user";
				return true;
			}
			return false;
		}
		

		function crypt($a) {
		    return md5($a);
        }

	}
	
