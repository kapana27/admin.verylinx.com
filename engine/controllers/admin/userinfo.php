<?php
	
	class userinfo extends controller {
		
		function updateProfileInfo() {
			global $user;
			if (!empty($_POST["name"]) and !empty($_POST["display_name"])) {
				$this->require_db();
				if ($this->db->query("
					update
						`user-admin`
					set
						`username` = '".$this->db->escape($_POST["name"])."',
						`display_name` = '".$this->db->escape($_POST["display_name"])."'
					where
						`id` = '".$this->db->escape($user->id)."'
					limit
						1
					;
				")) {
					$user->data["username"] = $_POST["name"];
					$user->data["display_name"] = $_POST["display_name"];
					$this->success(array(
						"newToken" => $user->newToken()
					));
				}
			}
			$this->error();
		}
		
		function updateProfilePhoto() {
			global $user;
			if (isset($_FILES["file"]) and !empty($_FILES["file"]["name"]) and !empty($_FILES["file"]["tmp_name"]) and ($_FILES["file"]["error"] == 0)) {
				if ($im = new imagick($_FILES["file"]["tmp_name"])) {
					$im->cropThumbnailImage(295, 295);
					$im->setFormat("jpg");
					$name = uniqid();
					if (@file_put_contents(__DIR__ . "/../../../public_html/data/admin/images/$name.jpg", $im)) {
						$this->require_db();
						if ($this->db->query("
							update
								`user-admin`
							set
								`image` = '".$this->db->escape("/data/admin/images/$name.jpg")."'
							where
								`id` = '".$this->db->escape($user->id)."'
							limit
								1
							;
						")) {
							$user->data["image"] = "/data/admin/images/$name.jpg";
							$this->success(array(
								"newToken" => $user->newToken()
							));
						}
					}
				}
			}
			$this->error();
		}
		
		function updateProfilePassword(){
			global $user;
			if(!empty($_POST['current_password']) || !empty($_POST['password1']) || !empty($_POST['password2']) ){
				if($_POST['password1'] == $_POST['password2']){
					$this->require_db();
					$rr = $this->db->query("
						select
							`id`
						from
							`user-admin`
						where
							`id` = '".$this->db->escape($user->id)."'
							and `password` = '".$this->db->escape($user->cript($_POST["current_password"]))."'
						limit
							1
						;
					")->fetch_assoc();
					if (!empty($rr["id"])) {
						if($this->db->query("
							update
								`user-admin`
							set
								`password` = '".$this->db->escape(md5($_POST['password1']))."'
							where
								`id` = '".$this->db->escape($user->id)."'
							limit
								1
							;
						")){
							$this->success();
						}
					} else {
						$this->error("password_not_3");
					}
				} else {
					$this->error("password_not_1");
				}
			}
			$this->error("password_not_2");
		}
		
		
		
		
	}
	
	
	
?>