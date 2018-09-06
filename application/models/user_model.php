<?php
    /**************************************
    *
    * Author   : Orkhan Huseynov
    * Contacts : orkhan.huseynov@live.com
    *
    **************************************/
    class User_model extends CI_Model {

        var $loggedin = false;
        var $ID;
        var $login;
        var $password;
        var $firstName;
        var $surName;
        var $email;
        var $thegroup;
        var $enabled;

        var $image;
        var $userpic;
        var $rating;
        var $times_viewed;
        var $birth_date;
        var $hide_year;
        var $country;
        var $city;
        var $native_city;
        var $register_date;
        var $gender;
        var $work;
        var $work_position;
        var $show_work;
        var $site;
        var $started_working_date;
        var $finished_working_date;
        var $now_work_here;
        var $about;

        function __construct(){
            parent::__construct();
            $this->load->database();
            $this->load->library('session');
            $this->load->helper('url');

            (isset($this->session->userdata['ID']))? $this->ID = $this->session->userdata['ID'] : '';
            (isset($this->session->userdata['login']))? $this->login = $this->session->userdata['login'] : '';
            (isset($this->session->userdata['password']))? $this->password = $this->session->userdata['password'] : '';
            (isset($this->session->userdata['firstName']))? $this->firstName = $this->session->userdata['firstName'] : '';
            (isset($this->session->userdata['surName']))? $this->surName = $this->session->userdata['surName'] : '';
            (isset($this->session->userdata['email']))? $this->email = $this->session->userdata['email'] : '';
            (isset($this->session->userdata['thegroup']))? $this->thegroup = $this->session->userdata['thegroup'] : '';
            (isset($this->session->userdata['enabled']))? $this->enabled = $this->session->userdata['enabled'] : '';
        }

        function logout(){
            unset($this->login);
            unset($this->password);
            $this->session->unset_userdata('login');
            $this->session->unset_userdata('password');
            $this->loggedin = false;
            return true;
        }

        function checkLogin($user = '',$pass = '',$group = 10,$goodRedirect = '',$badRedirect = ''){
            $pass = md5($pass);
            if(($this->session->userdata('login') != '') && ($this->session->userdata('password') != '')){
                $sql = 'SELECT * FROM cmsusers WHERE user = "'.$this->session->userdata('login').'" AND pass = "'.$this->session->userdata('password').'" AND thegroup <= '.$group.' AND enabled = 1';
                
                $query = $this->db->query($sql);
                    if($query->num_rows() > 0){ /*echo 1; die();*/
                        // Existing user ok, continue
                        $this->loggedin = true;
                        if($goodRedirect != ''){
                            header('Location: '.$goodRedirect) ;
                            exit;
                        }
                        return true;
                    }else{
                        // Existing user not ok, logout
                        $this->loggedin = false;
                        $this->logout();
                        return false;
                    }
                // User isn't logged in, check credentials
                }else{
                    $sql = "SELECT * FROM cmsusers WHERE user = '$user' AND pass = '$pass' AND thegroup <= $group AND enabled = 1";
                    //echo $sql; die();
                    $query = $this->db->query($sql);
                    
                    if($query->num_rows() > 0){
                        // Login OK, store session details
                        // Log in
                        $this->loggedin = true;
                        $res_array = $query->result_array();

                        $this->login = $res_array[0]['user'];
                        $this->password = $res_array[0]['pass'];
                        $this->thegroup = $res_array[0]['thegroup'];
                        $this->email = $res_array[0]['email'];
                        $this->enabled = $res_array[0]['enabled'];
                        $this->firstName  = $res_array[0]['firstname'];
                        $this->surName = $res_array[0]['surname'];
                        $this->ID = $res_array[0]['ID'];

                        $this->session->set_userdata('login', $this->login);
                        $this->session->set_userdata('password', $this->password);
                        $this->session->set_userdata('thegroup', $this->thegroup);
                        $this->session->set_userdata('email', $this->email);
                        $this->session->set_userdata('enabled', $this->enabled);
                        $this->session->set_userdata('firstName', $this->firstName);
                        $this->session->set_userdata('surName', $this->surName);
                        $this->session->set_userdata('ID', $this->ID);
                        
                        if ($this->thegroup == 6) {
                        	header('Location: '.site_url('ControlPanel/applications'));
                        	exit;
                        }

                        if ($goodRedirect) {
                            header('Location: '.$goodRedirect);
                            exit;
                        }
                        return true;
                    }else{
                        // Login BAD
                        $this->loggedin = false;
                        unset($this->login);
                        unset($this->password);
                        if ($badRedirect) {
                            header('Location: '.$badRedirect);
                            exit;
                        }
                        return false;
                    }
                }
            }

            function checkUsername($username){
                $username = trim($username);
                $query = $this->db->query("SELECT * FROM cmsusers WHERE user = '$username' AND enabled = 1");

                if($query -> num_rows() > 0){
                    $res_array = $query->result_array();
                    return $res_array[0]['ID'];
                }else{
                    return false;
                }
            }

            function add($user, $pass, $thegroup, $firstname, $surname, $email){
				$pass = md5($pass);
                $sql = 'INSERT INTO cmsusers(user, pass, thegroup, firstname, surname, email)
                                                  VALUES("'.$user.'", ("'.$pass.'"), "'.$thegroup.'", "'.$firstname.'", "'.$surname.'", "'.$email.'")';
                $query = $this->db->query($sql);

                if($this->db->affected_rows() > 0){
                        return mysql_insert_id();
                }else{
                        return false;
                }
            }

            function delete($id){
                if($this->checkLogin('', '', 2) == true){
                    (integer) $id;
                    $sql = 'DELETE FROM cmsusers WHERE ID = '.$id.' LIMIT 1';
                    $sql1 = 'DELETE FROM cmsfriends WHERE `userid` = '.$id.' OR `friendid` = '.$id;
                    $sql2 = 'DELETE FROM cmsarticles WHERE `userID` = '.$id;
                    $sql3 = 'DELETE FROM cmsvideos WHERE `userid` = '.$id;
                    $query = $this->db->query($sql);
                    $query1 = $this->db->query($sql1);
                    $query2 = $this->db->query($sql2);
                    $query3 = $this->db->query($sql3);

                    if($this->db->affected_rows() > 0){
                            return true;
                    }else{
                            return false;
                    }
                }else{
                    return false;
                }
            }

            function update($id, $password='', $thegroup='', $firstname='', $surname='', $email='', $enabled=''){
                    $password = md5($password);
                    if(($password != '') && ($thegroup != '')){
                            $sql = 'UPDATE cmsusers SET
                   `thegroup` = "'.$thegroup.'",
                   `firstname` = "'.$firstname.'",
                   `surname` = "'.$surname.'",
                               `email` = "'.$email.'",
                               `enabled` = "'.$enabled.'",
                               `pass` = "'.$password.'"
                 WHERE ID = "'.$id.'" LIMIT 1';
                    }elseif(($password != '') && ($thegroup == '')){
                            $sql = 'UPDATE cmsusers SET
                               `pass` = "'.$password.'"
                 WHERE ID = "'.$id.'" LIMIT 1';
                    }elseif(($password == '') && ($thegroup != '')){
                            $sql = 'UPDATE cmsusers SET
                   `thegroup` = "'.$thegroup.'",
                   `firstname` = "'.$firstname.'",
                   `surname` = "'.$surname.'",
                               `email` = "'.$email.'",
                               `enabled` = "'.$enabled.'"
                 WHERE ID = "'.$id.'" LIMIT 1';
                    }

                    $this->db->query($sql);

                    if($this->db->affected_rows() > 0){
                            return true;
                    }else{
                            return false;
                }
            }

            function updateDetails(){
                if($this->userpic){
                    $sql = 'UPDATE `cmsusers` SET
                        `firstname` = "'.$this->firstname.'",
                        `surname` = "'.$this->surname.'",
                        `gender` = "'.$this->gender.'",
                        `birth_date` = "'.$this->birth_date.'",
                        `hide_year` = "'.$this->hide_year.'",
                        `country` = "'.$this->country.'",
                        `city` = "'.$this->city.'",
                        `native_city` = "'.$this->native_city.'",
                        `work` = "'.$this->work.'",
                        `work_position` = "'.$this->work_position.'",
                        `show_work` = "'.$this->show_work.'",
                        `site` = "'.$this->site.'",
                        `started_working_date` = "'.$this->started_working_date.'",
                        `finished_working_date` = "'.$this->finished_working_date.'",
                        `now_work_here` = "'.$this->now_work_here.'",
                        `about` = "'.$this->about.'",
                        `userpic` = "'.$this->userpic.'"
                            WHERE `ID` = "'.$this->ID.'" LIMIT 1';
                }else{
                    $sql = 'UPDATE `cmsusers` SET
                        `firstname` = "'.$this->firstname.'",
                        `surname` = "'.$this->surname.'",
                        `gender` = "'.$this->gender.'",
                        `birth_date` = "'.$this->birth_date.'",
                        `hide_year` = "'.$this->hide_year.'",
                        `country` = "'.$this->country.'",
                        `city` = "'.$this->city.'",
                        `native_city` = "'.$this->native_city.'",
                        `work` = "'.$this->work.'",
                        `work_position` = "'.$this->work_position.'",
                        `show_work` = "'.$this->show_work.'",
                        `site` = "'.$this->site.'",
                        `started_working_date` = "'.$this->started_working_date.'",
                        `finished_working_date` = "'.$this->finished_working_date.'",
                        `now_work_here` = "'.$this->now_work_here.'",
                        `about` = "'.$this->about.'"
                            WHERE `ID` = "'.$this->ID.'" LIMIT 1';
                }

                $this->db->query($sql);
                if($this->db->affected_rows() > 0){
                    return true;
                }else{
                    return false;
                }
            }

            function getUsersList($orderby='ID', $orderdir='asc', $page=0){
                /*Explicit Validation*/
                if(($orderby != 'ID') && ($orderby != 'user') && ($orderby != 'thegroup') &&
                   ($orderby != 'firstname') && ($orderby != 'surname') && ($orderby != 'email') &&
                   ($orderby != 'enabled')){
                        $orderby = 'ID';
                }
                if(($orderdir != 'asc') && ($orderdir != 'desc')){
                        $orderdir = 'asc';
                }
                /*End Explicit Validation*/

                $sql = 'SELECT ID, user, thegroup, firstname, surname, email, enabled
                                        FROM cmsusers WHERE thegroup >= '.$this->thegroup.' ORDER BY '.$orderby.' '.$orderdir.' LIMIT '.$page.',10';
                $query = $this->db->query($sql);

                ($orderdir == 'asc')? $orderdir_versal = 'desc' : $orderdir_versal = 'asc';

                $html = '<table class="users_list_table" style="width:100%;">';
                $html .= '<tr style="background-color:#ccc;"><td style="width:67%;text-align:center;"><a class="users_heading" href="'.site_url('/ControlPanel/user/index/user/'.$orderdir_versal.'/'.$page.'/').'" title="Sort by Login">Login</a></td>
                                          <td style="width:18%;text-align:center;"><a class="users_heading" href="'.site_url('/ControlPanel/user/index/thegroup/'.$orderdir_versal.'/'.$page.'/').'" title="Sort by Priveleges">Privileges</a></td>
                                          <td style="width:10%;text-align:center;"><a class="users_heading" href="'.site_url('/ControlPanel/user/index/enabled/'.$orderdir_versal.'/'.$page.'/').'" title="Sort by Enabled">Enabled</a></td>
                                          <td style="width:5%;text-align:center;">&nbsp;</td></tr>';
                if($query->num_rows() > 0){
                        $i = 0;
                        foreach($query->result() as $row){
                                if($i%2){
                                        $class_name = 'row_countable';
                                }else{
                                        $class_name = 'row_uncountable';
                                }
                                $html .= '<tr class="'.$class_name.'"><td style="padding-left:15px;" onclick="javascript:gotolink(\''.site_url('/ControlPanel/user/details/'.$row->ID).'\');">';
                                $html .= $row->user;
                                $html .= '</td><td style="text-align:center;" onclick="javascript:gotolink(\''.site_url('/ControlPanel/user/details/'.$row->ID).'\');">';
                                $html .= $this->getGroupName($row->thegroup);
                                $html .= '</td><td style="text-align:center;vertical-align:middle;" onclick="javascript:gotolink(\''.site_url('/ControlPanel/user/details/'.$row->ID).'\');">';
                                $html .= ($row->enabled == 1)? '<div style="background-color:#E0F5BD;width:100%;height:100%;">Yes</div>' : '<div style="background-color:#F7C6C9;width:100%;">No</div>';
                                $html .= '</td><td style="text-align:center;">';
                                $drop_img_url = base_url().'/images/admin/drop.png';
                                $html .= '<a title="Delete User" class="confirm" href="'.site_url('/ControlPanel/user/delete/'.$row->ID).'"><img style="border:0;" class="drop-user" alt="Delete" src="'.$drop_img_url.'" /></a>';
                                $html .= '</td></tr>';
                                $i++;
                        }
                }
                $html .= '</table>';

                return $html;
            }

            function getUsersCount(){
                $sql = 'SELECT COUNT(ID) AS CNT FROM cmsusers WHERE thegroup >= '.$this->thegroup;
                $query = $this->db->query($sql);

                if($query->num_rows() > 0){
                        $row = $query->row();
                        return $row->CNT;
                }else{
                        return 0;
                }
            }

            function getUserDetails($userid=0){
                (integer) $userid;

                if(!$userid){
                    $userid = 0;
                }

                $sql = 'SELECT * FROM cmsusers WHERE ID='.$userid.' LIMIT 1';
                $query = $this->db->query($sql);
                return $query->result_array();
            }

            function getGroupName($groupid){
                (integer) $groupid;
                if(($groupid < 0) || ($groupid > 10)){
                        $groupid = 10;
                }
                $sql = 'SELECT name FROM cmsusersgroups WHERE ID='.$groupid;
                $query = $this->db->query($sql);

                if($query->num_rows() > 0){
                        $row = $query->result_array();
                        $name = $row[0]['name'];
                }else{
                        $name = 'User';
                }
                return $name;
            }

            function getLoggedInUserName(){
                if($this->session->userdata('login') != ''){
                    return $this->session->userdata('login');
                }else{
                    return false;
                }
            }

            function password_check($password){
                $password = md5($password);
                $sql = 'SELECT ID FROM cmsusers WHERE `pass` = "'.$password.'"';
                $query = $this->db->query($sql);
                if($query->num_rows() > 0){
                        return TRUE;
                }else{
                        return FALSE;
                }
            }

            function getName($id=0){
                (integer)$id;

                if($id == 0 && $this->ID != 0){
                    $id = $this->ID;
                }

                $sql = 'SELECT `user` FROM cmsusers WHERE ID='.$id.' LIMIT 1';
                $query = $this->db->query($sql);
                if($query->num_rows() > 0){
                    $row = $query->result_array();
                    return $row[0]['user'];
                }
                return false;
            }
            
            function getEmail($id=0){
                (integer)$id;

                if($id == 0 && $this->ID != 0){
                    $id = $this->ID;
                }

                $sql = 'SELECT `email` FROM cmsusers WHERE ID='.$id.' LIMIT 1';
                $query = $this->db->query($sql);
                if($query->num_rows() > 0){
                    $row = $query->result_array();
                    return $row[0]['email'];
                }
                return false;
            }

            function getNameSurname($id){
                (integer)$id;
                $sql = 'SELECT `firstname`, `surname` FROM cmsusers WHERE ID='.$id.' LIMIT 1';
                $query = $this->db->query($sql);
                if($query->num_rows() > 0){
                    $row = $query->result_array();
                    return $row[0]['firstname'] . '&nbsp;' . $row[0]['surname'];
                }
                return false;
            }

            function getUserpic($id){
                (integer)$id;
                $sql = 'SELECT `userpic` FROM cmsusers WHERE ID='.$id.' LIMIT 1';
                $query = $this->db->query($sql);
                if($query->num_rows() > 0){
                    $row = $query->result_array();
                    $userpic = $row[0]['userpic'];

                    if($userpic != '' && $userpic != ' '){
                        return $userpic;
                    }else{
                        return 'userpic_placeholder.png'; 
                    }
                }
                return 'userpic_placeholder.png';
            }

            function increaseTimesViewed($id){
                if(@$this->session->userdata['ID'] == $id){
                    return false;
                }

                $sql = 'SELECT `times_viewed` FROM cmsusers WHERE `ID` = '.$id.' LIMIT 1';
                $query = $this->db->query($sql);

                $times_viewed = 0;

                if($this->db->affected_rows() > 0){
                    foreach($query->result() as $row){
                        $times_viewed = $row->times_viewed;
                    }
                }

                $times_viewed++;

                $sql_upd = 'UPDATE cmsusers SET `times_viewed` = '.$times_viewed.' WHERE `ID` = "'.$id.'" LIMIT 1';
                $query_upd = $this->db->query($sql_upd);

                if($this->db->affected_rows() > 0){
                    return true;
                }else{
                    return false;
                }
            }

            function getFriends($userid){
                $sql = 'SELECT friendid, status FROM cmsfriends WHERE userid = '.$userid;
                $sql2= 'SELECT userid, status FROM cmsfriends WHERE friendid = '.$userid;

                $htm = '<div class="user_friends_body">';
                $query = $this->db->query($sql);
                $friends_array = array();
                $i=0;
                if($query->num_rows() > 0){                    
                    foreach($query->result() as $row){
                        $friends_array[$i]['userid'] = $row->friendid;
                        $friends_array[$i]['status'] = $row->status;
                        $i++;
                    }
                }
                $query2 = $this->db->query($sql2);
                if($query2->num_rows() > 0){
                    $arr2 = $query2->result_array();
                    $friends_array = array_merge($friends_array, $arr2);
                }
                 
                for($j=0;$j<count($friends_array);$j++){
                    $userDetails = $this->getUserDetails($friends_array[$j]['userid']);
                    $birth_date = $userDetails['0']['birth_date'];
                    $date_of_birth = strtotime(substr($birth_date, 0, 4));
                    $current_date = time();
                    $age = $current_date - $date_of_birth;
                    $age = round($age/(3600*24*365));
                    if($age == 1){
                        $suffix = 'год';
                    }elseif($age < 5){
                        $suffix = 'года';
                    }else{
                        $suffix = 'лет';
                    }
                    if($userDetails['0']['hide_year'] == 1){
                        $age = '';
                        $suffix = '';
                    }
                    $city = $userDetails['0']['city'];
                    $userpic = $this->getUserpic($userDetails['0']['ID']);
                    //$rating = $this->rating_model->get_liking_users_count($row->ID);
                    $htm .= '<div class="user_friends_item">';
                    $htm .= '<a href="'.base_url().'user/name/'.$userDetails['0']['user'].'"><img src="'.base_url().'userfiles/Pictures/'.$userpic.'" width="52" height="53" alt="" /></a>';
                    $htm .= '</div>';
                }
                if($j == 0){
                    $htm .= 'Друзей пока нет.';
                }
                
                $htm .= '</div>';
                return $htm;
            }

            function getFriendsList($userid){
                $sql = 'SELECT friendid, status FROM cmsfriends WHERE userid = '.$userid;
                $sql2= 'SELECT userid, status FROM cmsfriends WHERE friendid = '.$userid;

                $htm = '<div class="projects_container">';
                $query = $this->db->query($sql);
                $friends_array = array();
                $i=0;
                if($query->num_rows() > 0){
                    foreach($query->result() as $row){
                        $friends_array[$i]['userid'] = $row->friendid;
                        $friends_array[$i]['status'] = $row->status;
                        $i++;
                    }
                }
                $query2 = $this->db->query($sql2);
                if($query2->num_rows() > 0){
                    $arr2 = $query2->result_array();
                    $friends_array = array_merge($friends_array, $arr2);
                }

                for($j=0;$j<count($friends_array);$j++){
                    $userDetails = $this->getUserDetails($friends_array[$j]['userid']);;
                    $birth_date = $userDetails['0']['birth_date'];
                    $date_of_birth = strtotime(substr($birth_date, 0, 4));
                    $current_date = time();
                    $age = $current_date - $date_of_birth;
                    $age = round($age/(3600*24*365));
                    if($age == 1){
                        $suffix = 'год';
                    }elseif($age < 5){
                        $suffix = 'года';
                    }else{
                        $suffix = 'лет';
                    }
                    if($userDetails['0']['hide_year'] == 1){
                        $age = '';
                        $suffix = '';
                    }
                    $city = $userDetails['0']['city'];
                    //$rating = $this->rating_model->get_liking_users_count($row->ID);
                    $userpic = $this->getUserpic($userDetails[0]['ID']);
                    $htm .= '<div class="project">';
                    $htm .= '<a href="'.base_url().'user/name/'.$userDetails['0']['user'].'"><img src="'.base_url().'userfiles/Pictures/'.$userpic.'" alt="" /></a>';
                    $htm .= '<p>';
                    $htm .= '<a href="'.base_url().'user/name/'.$userDetails['0']['user'].'">';
                    $htm .= $userDetails['0']['firstname'] . '&nbsp;' . $userDetails['0']['surname'];
                    $htm .= '</a>';
                    $htm .= '</div>';
                }
                if($j == 0){
                    $htm .= 'Друзей пока нет.';
                }

                $htm .= '</div>';
                return $htm;
            }

            function getFriendStatusName($status, $userid, $friendid){
                if($status == 0){
                    return '<a href="'.base_url().'user/submit/'.$userid.'/'.$friendid.'/">подтвердить</a>';
                }elseif($status == 1){
                    return '';
                }
            }

            function submit($userid, $friendid){
                $sql = 'UPDATE cmsfriends SET `status` = 1 WHERE `userid`='.$userid.' AND `friendid`='.$friendid.' LIMIT 1';
                $query = $this->db->query($sql);
                if($this->db->affected_rows() > 0){
                    return true;
                }
                return false;
            }

            function add_friend($userid, $friendid){
                $sql = 'SELECT ID FROM cmsfriends WHERE `userid`='.$userid.' AND `friendid`='.$friendid;
                $query = $this->db->query($sql);

                $sql_versus = 'SELECT ID FROM cmsfriends WHERE `userid`='.$friendid.' AND `friendid`='.$userid;
                $query_versus = $this->db->query($sql_versus);
                if($query->num_rows() == 0 && $query_versus->num_rows() == 0){
                    $sql = 'INSERT INTO cmsfriends (`userid`, `friendid`, `status`) VALUES ('.$userid.', '.$friendid.', 1)';
                    $query = $this->db->query($sql);
                    if($this->db->affected_rows() > 0){
                        return true;
                    }
                    return false;
                }
                return false;
            }

            function getList($page){

                if($page == 0){
                    $sql = 'SELECT * FROM `cmsusers` WHERE `enabled` = 1 LIMIT 12';
                }else{
                    $sql = 'SELECT * FROM `cmsusers` WHERE `enabled` = 1 LIMIT '.$page.',12';
                }
                $query = $this->db->query($sql);

                $htm = '<div class="projects_container">';
                $i = 0;

                if($query->num_rows() > 0){
                    foreach($query->result() as $row){
                        $id = $row->ID;
                        $user = $row->user;
                        $firstname = $row->firstname;
                        $surname = $row->surname;
                        $userpic = $this->getUserpic($row->ID);
                        $about = $row->about;
                        $times_viewed = $row->times_viewed;
                        $comments = $this->comment_model->get_count(0, $id);

                        if($id == 1 || $user == 'orkhan'){
                            continue;
                        }
                        
                        $href = 'href="'.base_url().'user/name/'.$user.'/"';

                        $htm .= '<div class="project">';
                        $htm .= '<a '.$href.'>';
                        $htm .= '<img src="'.base_url().'userfiles/Pictures/'.$userpic.'" width="203" height="133" alt="" />';
                        $htm .= '</a>';
                        #$htm .= '<p><a '.$href.'>'.$firstname.'&nbsp;'.$surname.'</a></p>';
                        $htm .= '<p><a '.$href.'>'.$user.'</a></p>';
                        $htm .= '<span>'.$times_viewed.' просмотров | '.$comments.' комментариев</span>';
                        if($this->user_model->checkLogin('', '', 2)){
                            $htm .= '<br />';
                            $htm .= '<span>';
                            $htm .= '<a href="'.base_url().'user/delete/'.$id.'/" onclick="return confirm(\'Уверены?\')">Удалить</a>';
                            $htm .= '</span>';
                        }
                        $htm .= '</div>';

                        $i++;
                    }
                }

                if($i == 0){
                    $htm .= 'Участников пока нет';
                }
                $htm .= '</div>';

                return $htm;
            }

            function getTotalRows(){
                $sql = 'SELECT * FROM `cmsusers` WHERE (enabled =1)';

                $query = $this->db->query($sql);
                return $query->num_rows();
            }
            
            function getLoginForm($loginstatus=''){
                if($this->loggedin){
                    $htm = '<div style="color:#fff;">';
                    $htm .= 'Hello, '. $this->login .'!';
                    $htm .= '</div>';
                    $htm .= '<div>';
                    $htm .= '<a style="color:#fff;" href ="'.base_url().'signout/">Logout</a>';
                    $htm .= '</div>';
                }else{
                    if($loginstatus == 'validationerror'){
                        $err = '<span class="form_error">Please fill in login and password correctly</span>';
                    }elseif($loginstatus == 'loginerror'){
                        $err = '<span class="form_error">The login attempt failed</span>';
                    }else{
                        $err = '';
                    }
                    
                    $htm = '<form action="'.base_url().'signin/" method="post" name="login" class="form-login">';
                    $htm .= '<div class="clearfix">';
                    if($err !== ''){
                        $htm .= '<div class="row-form">';
                        $htm .= $err;
                        $htm .= '</div>';
                    }
                    $htm .= '<div class="username form-height">';
                    $htm .= '<input name="login" id="mod_login_username" type="text" class="inputbox" value="Username:" onblur="if(this.value==\'\') this.value=\'Username:\'" onfocus="if(this.value ==\'Username:\' ) this.value=\'\'" alt="Username:" />';
                    $htm .= '</div>';
                    $htm .= '<div class="password  form-height">';
                    $htm .= '<input type="password" autocomplete="off" id="mod_login_password" name="password" class="inputbox"  alt="Password" value="Password" onblur="if(this.value==\'\') this.value=\'Password\'" onfocus="if(this.value ==\'Password\' ) this.value=\'\'" />';
                    $htm .= '<br />';
                    $htm .= '</div>';
                    $htm .= '</div>';
                    $htm .= '<div class="clear">';
                    $htm .= '<input type="submit" name="Submit" class="button-login" value="Log in" />';
                    #$htm .= '<div class="row-form">';
                    #$htm .= '<input type="checkbox" name="remember" id="mod_login_remember" class="checkbox" value="yes" alt="Remember Me" /><label for="mod_login_remember" class="remember"> Remember Me </label>';
                    #$htm .= '</div>';
                    $htm .= '</div>';
                    #$htm .= '<div id="form-login-remember"> <a class="form-link1" href="/joomla/300111057/index.php?option=com_user&amp;view=reset#content"> Forgot  password? </a> <br  />';
                    #$htm .= '<a class="login-link" href="/joomla/300111057/index.php?option=com_user&amp;view=remind#content"> Forgot  username? </a>';
                    #$htm .= '<div>';
                    #$htm .= '<a class="reg" href="/joomla/300111057/index.php?option=com_user&amp;task=register#content"> Registry  </a>';
                    #$htm .= '</div>';
                    #$htm .= '</div>';
                    $htm .= '</form>';
                }
                return $htm;
            }
    }