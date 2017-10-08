<?php


    namespace controllers {


        use Firebase\JWT\JWT;
        use user;

        class guest extends \controller {

            function login() {
                global /** @var user $user */
                /** @noinspection PhpUnusedLocalVariableInspection */ 
                $user;
                $this->require_JSON();
                if (!empty($_POST["username"]) && !empty($_POST["password"])) {
                    $this->require_db();
                    $r = $this->db->query("
                        select
                            *
                        from
                           `users`
                        where
                            `mail` = '".$this->db->escape($_POST["username"])."'
                            and `password` = '".$this->db->escape(md5($_POST["password"]))."'
                        limit 1
                    ")->fetch_assoc();
                    if (!empty($r["id"])) {
                        unset($r["password"]);
                        $token = JWT::encode($r, $user->jwtKey, 'HS512');
                        $this->success([
                            "token" => $token
                        ]);
                    }
                }
               $this->error();
            }

        }




    }


