<?php
    /**************************************
    *
    * Author   : Orkhan Huseynov
    * Contacts : orkhan.huseynov@live.com
    *
    **************************************/
    class Applications_model extends CI_Model {
        var $ID;
        var $tagline_en;        
        var $tagline_az;
        var $text_en;       
        var $text_az;        
        var $section;
        var $sector;
        var $approved; 
        var $date;
        var $position;
        var $file;
        var $featured;        
        
        function __construct(){
            parent::__construct();
            $this->load->database();
            $this->load->library('session');
            $this->load->helper('url');
            $this->load->helper('text');
            $this->load->model('JSON_model');            
        }

        function getJSONList($vacancy_id=0, $gender=0){
            (integer) $vacancy_id;
            
            $this->load->model('vacancies_model');
            
            $res = array();
            $res['requestFirstIndex'] = 0;
            $res['firstIndex'] = 0;

            if($vacancy_id != 0 && $gender !== 0){
                $sql = 'SELECT * FROM cmsapplications WHERE `vacancy_id` = '.$vacancy_id.' AND `gender` = "'.$gender.'" ORDER BY position';
            }elseif($vacancy_id != 0 && $gender == 0){
                $sql = 'SELECT * FROM cmsapplications WHERE `vacancy_id` = '.$vacancy_id.' ORDER BY position';
            }elseif($vacancy_id == 0 && $gender !== 0){
                $sql = 'SELECT * FROM cmsapplications WHERE `gender` = "'.$gender.'" ORDER BY position';
            }else{
                $sql = 'SELECT * FROM cmsapplications ORDER BY position';
            }
            
            
            $query = $this->db->query($sql);
            $res['count'] = $query->num_rows();
            $res['totalCount'] = $query->num_rows();
            $res['columns'] = array('#', '<div style="text-align:center;">Vacancy №</div>', '<div style="text-align:center;">Position</div>',
            			/*'<div style="text-align:center;">Department</div>',*/ '<div style="text-align:center;">Date of Application</div>',
            			'<div style="text-align:center;">Firstname, Middlename, Lastname</div>',
            			'<div style="text-align:center;width:150px;">E-mail Address</div>', '<div style="text-align:center;">Mobile</div>',
            			'<div style="text-align:center;">Home Telephone</div>', '<div style="text-align:center;">Home Address</div>',
            			'<div style="text-align:center;">Home Post Code</div>', '<div style="text-align:center;">Contact Preference</div>',
            			'<div style="text-align:center;">Current/Most Recent Employer</div>', '<div style="text-align:center;">Current or most recent job title</div>',
            			'<div style="text-align:center;">Current or most recent base salary</div>', '<div style="text-align:center;">Professional Qualifications</div>',
            			'<div style="text-align:center;">Motivation/Summary of Skils</div>', '<div style="text-align:center;">CV</div>',
            			'<div style="text-align:center;">Date of Birth</div>', '<div style="text-align:center;">Gender</div>',
            			'<div style="text-align:center;">Nationality</div>', '<div style="text-align:center;">Ethnicity</div>',
            			'<div style="text-align:center;">Registered Disabled</div>', '<div style="text-align:center;">Special requirements</div>',
            			'<div style="text-align:center;">Status Date</div>', '<div style="text-align:center;">Application Status</div>',
                        '<div style="text-align:center;">Status comment</div>',
            			'<div style="text-align:center;">Actions</div>');

            $i = 0;
            if($query->num_rows() > 0){
                foreach($query->result() as $row){
                    $res['items'][$i]['id'] = $row->ID;
                    
                    $delete_url = site_url('ControlPanel/applications/delete/'.$row->ID);
                    
                    $vacancy_number = '<div style="text-align:center;">'.$row->vacancy_id.'</div>';
                    if($row->vacancy_id > 0){
                    	$vac_arr = $this->vacancies_model->getDetails($row->vacancy_id);
                        if(count($vac_arr) > 0){
                    	    $position = '<div style="text-align:center;">'.$vac_arr[0]['title_en'].'</div>';
                        }
                    }
                    $department = '<div style="text-align:center;">'.'None'.'</div>';
                    $date_of_application = '<div style="text-align:center;">'.$row->date.'</div>';
                    $name = '<div style="text-align:center;">'.$row->firstname.'&nbsp;'.$row->middlename.'&nbsp;'.$row->lastname.'</div>';
                    //$middlename = '<div style="text-align:center;">'.$row->middlename.'</div>';
                    //$lastname = '<div style="text-align:center;">'.$row->lastname.'</div>';
                    $email = '<div style="text-align:center;">'.$this->user_model->getEmail($row->user_id).'</div>';
                    $mobile = '<div style="text-align:center;">'.$row->mobile.'</div>';
                    $home_telephone = '<div style="text-align:center;">'.$row->home.'</div>';
                    $home_address = '<div style="text-align:center;">'.$row->address.'</div>';
                    $home_post_code = '<div style="text-align:center;">'.$row->post_code.'</div>';
                    $contact_preference = '<div style="text-align:center;">'.ucfirst(str_replace('_', '&nbsp;', $row->contact_preference)).'</div>';
                    $current_employer = '<div style="text-align:center;">'.$row->current_employer.'</div>';
                    $current_job_title = '<div style="text-align:center;">'.$row->current_job_title.'</div>';
                    $current_salary = '<div style="text-align:center;">'.strtoupper(str_replace('_', '-', $row->current_salary)).'</div>';
                    $professional_qualifications = '<div style="text-align:center;">'.$row->professional_qualifications.'</div>';
                    $motivation = '<div style="text-align:center;">'.$row->motivation.'</div>';
                    $cv = '<div style="text-align:center;"><a href="'.substr($row->cv, strpos($row->cv, '/upload')).'" target="_blank">Download</a></div>';
                    $date_of_birth = '<div style="text-align:center;">'.$row->date_of_birth.'</div>';
                    $gender = '<div style="text-align:center;">'.ucfirst($row->gender).'</div>';
                    $nationality = '<div style="text-align:center;">'.str_replace('_', '&nbsp;', $row->nationality).'</div>';
                    $ethnicity = '<div style="text-align:center;">'.str_replace('_', '&nbsp;', $row->ethnicity).'</div>';
                    $registered_disabled = '<div style="text-align:center;">'.ucfirst(str_replace('_', '&nbsp;', $row->register_disabled)).'</div>';
                    $special_requirements = '<div style="text-align:center;">'.$row->special_requirements.'</div>';
                    $status_date = '<div style="text-align:center;">'.$row->status_date.'</div>';
                    $status_comment = '<div style="text-align:center;">'.$row->status_comment.'</div>';
                    $status = '<div style="text-align:center;">'.$this->get_status_name($row->status).'&nbsp;-&nbsp;<a href="'.base_url().'ControlPanel/applications/change_status/'.$row->ID.'">change</a></div>';
                    

                    
                    /*if(strlen($row->title_en) > 150){
                        $title_en = '<div style="text-align:center;">'.substr(strip_tags($row->title_en), 0, 150) . '...</div>';
                    }else{
                        $title_en = '<div style="text-align:center;">'.strip_tags($row->title_en).'</div>';
                    }*/

                    $res['items'][$i]['info'] = array($row->ID, $vacancy_number, $position, /*$department,*/ $date_of_application, $name, 
                    		$email, $mobile, $home_telephone, $home_address, $home_post_code, $contact_preference, 
                    		$current_employer, $current_job_title, $current_salary, $professional_qualifications, $motivation, 
                    		$cv, $date_of_birth, $gender, $nationality, $ethnicity, $registered_disabled, $special_requirements,
                    		$status_date, $status, $status_comment, '<div style="text-align:center;"><a href="'.$delete_url.'">Delete</a></div>');
                    $i++;
                }
            }else{
                $res['items'][$i]['id'] = 1;
                $res['items'][$i]['info'] = array('No results');
            }
            $res = $this->JSON_model->encode($res);
            return $res;
        }

        function getTotalRows(){
            $sql = 'SELECT * FROM cmsapplications';
            $query = $this->db->query($sql);
            return $query->num_rows();
        }        
                     
        function save_list_order($items_array){
            $i = 1;
            foreach($items_array as $key => $value){
                    $item_id = $value['id'];
                    $sql = 'UPDATE cmsapplications SET position = '.$i.' WHERE ID = '.$item_id.' LIMIT 1';
                    $query = $this->db->query($sql);
                    $i++;
            }
        }

        function delete($id){
            (integer) $id;
            $sql = 'DELETE FROM cmsapplications WHERE ID = '.$id.' LIMIT 1';
            $query = $this->db->query($sql);
            return true;
        }

        function update($id, $approved, $featured, $title_en, $text_en, $title_az, $text_az, $tagline_en, $tagline_az){
            (integer) $id;
            (integer) $approved;
            (integer) $featured;

            $title_en= addslashes($title_en);
            $text_en= addslashes($text_en);
            $title_az= addslashes($title_az);
            $text_az= addslashes($text_az);
            $tagline_en = addslashes($tagline_en);
            $tagline_az = addslashes($tagline_az);            

            $sql = 'UPDATE `cmsapplications` SET `approved` = "'.$approved.'", `featured` = "'.$featured.'", `date` = NOW(), `title_en` = "'.$title_en.'", `text_en` = "'.$text_en.'", `title_az` = "'.$title_az.'", `text_az` = "'.$text_az.'", `tagline_en` = "'.$tagline_en.'", `tagline_az` = "'.$tagline_az.'" WHERE ID = '.$id.' LIMIT 1';
            $query = $this->db->query($sql);
            return true;
        }
        
        function getDetails($id){
            (integer) $id;
            $sql = 'SELECT * FROM `cmsapplications` WHERE `ID`='.$id.' LIMIT 1';
            $query = $this->db->query($sql);
            return $query->result_array();
        }
        
        function getUser($id){
            (integer) $id;
            $sql = 'SELECT `user_id` FROM `cmsapplications` WHERE `ID`='.$id.' LIMIT 1';
            $query = $this->db->query($sql);
            $res = $query->result_array();
            return $res[0]['user_id'];
        }
                       
        function add($vacancy_id, $firstname, $middlename, $lastname, $user_id, $mobile, $home, $address, $post_code, $contact_preference,
        				$current_employer, $current_job_title, $current_salary, $salary_expectation, $professional_qualifications,
        				$motivation, $cv, $date_of_birth, $gender, $nationality, $ethnicity, $register_disabled, $special_requirements,
        				$info){            
            (integer) $vacancy_id; 
            (integer) $user_id;         

            $vacancy_id= addslashes($vacancy_id);
            $firstname= addslashes($firstname);
            $middlename= addslashes($middlename);
            $lastname= addslashes($lastname);
            $user_id = addslashes($user_id);
            $mobile = addslashes($mobile);
            $home = addslashes($home);
            $address = addslashes($address);
            $post_code = addslashes($post_code);
            $contact_preference = addslashes($contact_preference);
            $current_employer = addslashes($current_employer);
            $current_job_title = addslashes($current_job_title);
            $current_salary = addslashes($current_salary);
            $salary_expectation = addslashes($salary_expectation);
            $professional_qualifications = addslashes($professional_qualifications);
            $motivation = addslashes($motivation);
            $cv = addslashes($cv);                        
            
			$date = str_replace('/', '-', $date_of_birth);
			$date_of_birth = date('Y-m-d', strtotime($date));
            
            $gender = addslashes($gender);
            $nationality = addslashes($nationality);
            $ethnicity = addslashes($ethnicity);
            $register_disabled = addslashes($register_disabled);
            $special_requirements = addslashes($special_requirements); 
            $status = 0;
           	$info = addslashes($info); 

            $sql = 'INSERT INTO cmsapplications(`vacancy_id`, `date`, `firstname`, `middlename`, `lastname`, `user_id`, `mobile`, `home`, `address`,
            			`post_code`, `contact_preference`, `current_employer`, `current_job_title`, `current_salary`, `salary_expectation`,
            			`professional_qualifications`, `motivation`, `cv`, `date_of_birth`, `gender`, `nationality`, `ethnicity`,
            			`register_disabled`, `special_requirements`, `status_date`, `status`, `info`)
            		VALUES
                        ("'.$vacancy_id.'", NOW(), "'.$firstname.'", "'.$middlename.'", "'.$lastname.'", "'.$user_id.'", "'.$mobile.'", "'.$home.'",
                        "'.$address.'", "'.$post_code.'", "'.$contact_preference.'", "'.$current_employer.'", "'.$current_job_title.'", 
                        "'.$current_salary.'", "'.$salary_expectation.'", "'.$professional_qualifications.'", "'.$motivation.'", "'.$cv.'",
                        "'.$date_of_birth.'", "'.$gender.'", "'.$nationality.'", "'.$ethnicity.'", "'.$register_disabled.'", 
                        "'.$special_requirements.'", NOW(), "'.$status.'", "'.$info.'")';
            $query = $this->db->query($sql);

            if($this->db->affected_rows() > 0){
                return true;
            }else{
                return false;
            }
        } 
        
        function get_status_name($id){
        	(integer) $id;
        	$id++;
            $sql = 'SELECT `name` FROM `cmsapplicationstatuses` WHERE `ID`='.$id.' LIMIT 1';
            $query = $this->db->query($sql);
            $res_arr = $query->result_array();
            
            return $res_arr[0]['name'];
        }
        
        function get_statuses_values(){
        	$sql = 'SELECT `ID`, `name` FROM `cmsapplicationstatuses`';
            $query = $this->db->query($sql);
            
            $list = '';
            
            if($query->num_rows > 0){
				foreach($query->result() as $row){
                    $list .= '<option value="'.$row->ID.'">'.$row->name.'</option>';                    
                }
                return $list;
            }else{
            	return $list;
            }
        }
        
        function change_status($id, $status, $status_comment){
        	(integer) $id;
            (integer) $status;
            $status_comment = addslashes($status_comment);
            
            $status--;
            
            $sql = 'UPDATE `cmsapplications` SET `status` = "'.$status.'", `status_date` = NOW(), `status_comment` = "'.$status_comment.'" WHERE ID = '.$id.' LIMIT 1';
            $query = $this->db->query($sql);
            return true;
        }
        
        function get_list_by_current_user(){
        	$user_id = $this->session->userdata('ID');
        	(integer) $user_id;
        	
        	if($user_id == 0){
        		return false;
        	}
        	
        	$sql = 'SELECT `ID`, `vacancy_id`, `date`, `status_date`, `status`, `status_comment` FROM `cmsapplications` WHERE `user_id` = '.$user_id.' LIMIT 1';
        	$query = $this->db->query($sql);
        	
        	$list = '<table border="1" style="width: 100%;border: 1px solid #bbb;">';
        	$list .= '<tr>';
        	$list .= '<td style="text-align: center;">Application Number</td>';
        	/*$list .= '<td style="text-align: center; width: 150px;">Department</td>';
        	$list .= '<td style="text-align: center; width: 130px;">Position</td>';*/
        	$list .= '<td style="text-align: center; width: 180px;">Application Submission Date</td>';
        	$list .= '<td style="text-align: center; width: 120px;">Status Date</td>';
        	$list .= '<td style="text-align: center; width: 120px;">Status</td>';
            $list .= '<td style="text-align: center; width: 120px;">Status comment</td>';
        	$list .= '</tr>';
        	
        	foreach($query->result() as $row){
                $list .= '<tr>';
                $list .= '<td style="text-align: center;">'.$row->ID.'</td>';
                /*$list .= '<td style="text-align: center;">'.'none'.'</td>';
                $list .= '<td style="text-align: center;">'.'none'.'</td>';*/
                $list .= '<td style="text-align: center;">'.$row->date.'</td>';
                $list .= '<td style="text-align: center;">'.$row->status_date.'</td>';
                $list .= '<td style="text-align: center;">'.$this->get_status_name($row->status).'</td>';
                $list .= '<td style="text-align: center;">'.$row->status_comment.'</td>';
                $list .= '</tr>';                
            }
            
            $list .= '</table>';
            
            return $list;
        }
        
        function notify_by_mail($id){
        	$user_id = $this->getUser($id);
        	$user_name = str_replace('&nbsp;', ' ', $this->user_model->getNameSurname($user_id));
        	$email = $this->user_model->getEmail($user_id);
        	
        	$message = 'Dear '.$user_name.', 

Thank you for your recent application for the above position with Baker Tilly Azerbaijan.

Unfortunately, after careful consideration, you have not been selected for interview.

We received a large number of high quality applications for this recruitment, and other candidates’ details more closely matched our requirements than your own.

I would like to thank you for the interest you have shown in Baker Tilly Azerbaijan and to wish you every success in obtaining a suitable position in the near future.

Yours sincerely,
Baker Tilly Azerbaijan Recruitment Team
';
        	
        	$this->load->library('email');

			$this->email->from('info@bakertillyaz.az', 'Baker Tily Azerbaijan');
			$this->email->to($email); 
						
			$this->email->subject('Automatic Reject e-mail');
			$this->email->message($message);	
			
			$this->email->send();
        }
        
        function notify_by_mail_after_submit($user_id){        	
        	$user_name = str_replace('&nbsp;', ' ', $this->user_model->getNameSurname($user_id));
        	$email = $this->user_model->getEmail($user_id);
        	
        	$message = 'Dear '.$user_name.', 

Thank you for your application for the above position.

Your application is now being considered and you will be contacted again in due course regarding your progress.

Kind regards,

The Baker Tilly Azerbaijan Recruitment Team

';
        	
        	$this->load->library('email');

			$this->email->from('info@bakertillyaz.az', 'Baker Tily Azerbaijan');
			$this->email->to($email); 
						
			$this->email->subject('Vacancy Name Job Application');
			$this->email->message($message);	
			
			$this->email->send();
        }
    }