<?php
    /**************************************
    *
    * Author   : Orkhan Huseynov
    * Contacts : orkhan.huseynov@live.com
    *
    **************************************/
    class People_model extends CI_Model {
        var $ID;
        var $tagline_en;        
        var $tagline_az;
        var $text_en;       
        var $text_az;
        var $date;
        var $approved;        
        var $position;
        var $section;
        var $sector;               
        
        function __construct(){
            parent::__construct();
            $this->load->database();
            $this->load->library('session');
            $this->load->helper('url');
            $this->load->helper('text');
            $this->load->model('JSON_model');
        }

        function getJSONList(){
            $res = array();
            $res['requestFirstIndex'] = 0;
            $res['firstIndex'] = 0;

            $sql = 'SELECT * FROM `cmspeople` ORDER BY position';
            $query = $this->db->query($sql);
            $res['count'] = $query->num_rows();
            $res['totalCount'] = $query->num_rows();
			$res['columns'] = array('Photo', '<div style="text-align:center;">Position</div>', '<div style="text-align:center;">Name</div>', '<div style="text-align:center;">Published</div>', '<div style="text-align:center;">Last modified</div>', '<div style="text-align:center;">Actions</div>');

            $i = 0;
            if($query->num_rows() > 0){
                foreach($query->result() as $row){
                    $res['items'][$i]['id'] = $row->ID;

                    $edit_url = site_url('ControlPanel/people/details/'.$row->ID);
                    $delete_url = site_url('ControlPanel/people/delete/'.$row->ID);
                    
                    ($row->approved == 1)? $published = '<span style="color: rgb(51, 153, 0);">Yes</span>' : $published = '<span style="color: rgb(204, 0, 0);">No</span>';
                    $published = '<div style="text-align:center;height:40px;">'.$published.'</div>';
                    $date = '<div style="text-align:center;height:40px;">'.$row->date.'</div>';
                    if(strlen($row->name_en.' '.$row->lastname_en) > 150){
						$title_en = '<div style="text-align:center;height:40px;">'.substr(strip_tags($row->name_en.' '.$row->lastname_en), 0, 150) . '...</div>';
                    }else{
                        $title_en = '<div style="text-align:center;height:40px;">'.strip_tags($row->name_en.' '.$row->lastname_en).'</div>';
                    }

					$photo = '<img height="40" src="'.base_url().'uploads/'.$row->file.'" alt="" />'; 
					$position = '<div style="text-align:center;height:40px;">'.$row->title_en.'</div>';
					
					$res['items'][$i]['info'] = array($photo, $position, $title_en, $published, $date, '<div style="text-align:center;height:40px;"><a href="'.$edit_url.'">Edit</a> | <a href="'.$delete_url.'">Delete</a></div>');
                    $i++;
                }
            }
            $res = $this->JSON_model->encode($res);
            return $res;
        }

        function getTotalRows(){
            $sql = 'SELECT * FROM `cmspeople`';
            $query = $this->db->query($sql);
            return $query->num_rows();
        }        

        function get_search_list($name, $section, $sector, $lastname, $page){
			(integer) $section;
            (integer) $sector;			
            (integer) $page;
			
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
			
			if($page == 0){
                $ins_sql = '';
                if($section != 0){
                    $ins_sql .= 'AND `section` LIKE "%'.$section.'%" ';
                }
                if($sector != 0){
                    $ins_sql .= 'AND `sector` LIKE "%'.$sector.'%" ';
                }
                if($name != ''){                    
                    $ins_sql .= 'AND `name_en` LIKE "%'.$name.'%" ';
                }
                if($lastname != ''){					
                    $ins_sql .= 'AND `lastname_en` LIKE "'.$lastname.'%"';
                }
            
                $sql = 'SELECT * FROM `cmspeople` WHERE `approved` = 1 '.$ins_sql.' ORDER BY `position` ASC LIMIT 10';               
            }else{
                $ins_sql = '';
                if($section != 0){
                    $ins_sql .= 'AND `section` LIKE "%'.$section.'%" ';
                }
                if($sector != 0){
                    $ins_sql .= 'AND `sector` LIKE "%'.$sector.'%" ';
                }
                if($name != ''){                    
                    $ins_sql .= 'AND `name_en` LIKE "%'.$name.'%" ';
                }
                if($lastname != ''){					
                    $ins_sql .= 'AND `lastname_en` LIKE "'.$lastname.'%"';
                }
                 
                $sql = 'SELECT * FROM `cmspeople` WHERE `approved` = 1 '.$ins_sql.' ORDER BY `position` ASC LIMIT '.$page.', 10';               
            
            }
												
			$query = $this->db->query($sql);
			$htm = '<table cellspacing="0" cellpadding="0" border="0">';
			$htm .= '<tbody>';
			
			
			if($query->num_rows > 0){
				foreach($query->result() as $row){                    
                    $id = $row->ID; 
					$section = $row->section;                    
                    $sector = $row->sector;
					
					$title_en = ($lang == 'en')? $row->title_en : $row->title_az;
					$name_en = ($lang == 'en')? $row->name_en : $row->name_az;
					$lastname_en = ($lang == 'en')? $row->lastname_en : $row->lastname_az;
					$text_en = ($lang == 'en')? $row->text_en : $row->text_az;
					$qualifications_en = ($lang == 'en')? $row->qualifications_en : $row->qualifications_az;					
                    $memberships_en = ($lang == 'en')? $row->memberships_en : $row->memberships_az;			
					
					$phone = $row->phone;
					$fax = $row->fax;
					$linkedin_profile = $row->linkedin_profile;
					$file = $row->file;
					
					$href = 'href="'.base_url().'contact_us/people_details/'.$id.'/"';
					$htm .= '<tr>';
					$htm .= '<td class="profile-pic">';
					$htm .= '<img height="80" src="'.base_url().'uploads/'.$file.'" alt="" />';
					$htm .= '</td>';
					$htm .= '<td class="profile-name" style="padding-right: 15px;">';
					$htm .= '<span class="blue"><a '.$href.'>'.$name_en.' '.$lastname_en.'</a></span><br />';
					$htm .= $title_en;
					$htm .= '<br />';
					
					if($section != ''){
						$htm .= '<strong>Services:</strong> ';
						
						$section_arr = explode('~', $section);
						foreach($section_arr as $key=>$val){
							if($key == count($section_arr)-1){
								$htm .= $this->section_model->getSectionName($val).'<br />';
							}else{
								$htm .= $this->section_model->getSectionName($val).', ';
							}
						}
					}
					if($sector != ''){
						$htm .= '<strong>Sectors:</strong> ';
						
						$sector_arr = explode('~', $sector);
						foreach($sector_arr as $key=>$val){
							if($key == count($sector_arr)-1){
								$htm .= $this->section_model->getSectionName($val);
							}else{
								$htm .= $this->section_model->getSectionName($val).', ';
							}
						}
					}
					
					$htm .= '</td><td>';
					
					$htm .= '<strong>T:</strong> '.$phone.'<br>';
					$htm .= '<strong>F:</strong> '.$fax.'<br>';
					
					$htm .= '</td></tr>';
				}
			}else{
				$htm .= '<tr><td colspan="2">Sorry, your search returned no results.</td></tr>';
			}
			
			$htm .= '</tbody></table>';
			return $htm;
        }       
		
		function get_count($name, $section, $sector, $lastname){                          
            $sql = 'SELECT COUNT(`ID`) AS `cnt` FROM `cmspeople` WHERE `approved` = 1 ORDER BY `position` ASC, `date` DESC';               
            
			$ins_sql = '';
            if($section != 0){
            	$ins_sql .= 'AND `section` LIKE "%'.$section.'%" ';
            }
            if($sector != 0){
                $ins_sql .= 'AND `sector` LIKE "%'.$sector.'%" ';
            }
            if($name != ''){                    
                $ins_sql .= 'AND `name_en` LIKE "%'.$name.'%" ';
            }
            if($lastname != ''){					
                $ins_sql .= 'AND `lastname_en` LIKE "'.$lastname.'%"';
            }
                 
            $sql = 'SELECT COUNT(`ID`) AS `cnt` FROM `cmspeople` WHERE `approved` = 1 '.$ins_sql.' ORDER BY `position` ASC';

            $query = $this->db->query($sql);            

            if($query->num_rows > 0){
				foreach($query->result() as $row){
                    return $row->cnt;                    
                }
            }else{
            	return 0;
            }
        }
		
		function get_left_sidebar_item($section=0, $sector=0){
			
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
			
			$sql = 'SELECT * FROM `cmspeople` WHERE `approved` = 1 AND (`section` = '.$section.' OR `sector` = '.$sector.') ORDER BY `position` ASC, `date` DESC LIMIT 1';
			
			
			$query = $this->db->query($sql);            

            if($query->num_rows > 0){
				foreach($query->result() as $row){
					$id = $row->ID;
					$section = $row->section;                    
                    $sector = $row->sector;
					
					$title_en = ($lang == 'en')? $row->title_en : $row->title_az;
					$name_en = ($lang == 'en')? $row->name_en : $row->name_az;
					$lastname_en = ($lang == 'en')? $row->lastname_en : $row->lastname_az;
					$text_en = ($lang == 'en')? $row->text_en : $row->text_az;
					$qualifications_en = ($lang == 'en')? $row->qualifications_en : $row->qualifications_az;					
                    $memberships_en = ($lang == 'en')? $row->memberships_en : $row->memberships_az;			
					
					$phone = $row->phone;
					$fax = $row->fax;
					$linkedin_profile = $row->linkedin_profile;
					$file = $row->file;	
					
					$html = '<div style="background:none;" id="ata" class="ata-module ata-module-long"><div style="background:none;" class="ata-inner">';
					
					$html .= '<section class="featured-publication float-left" style="width:148px;">';
					$html .= '<div class="ata-headshot">';
					$html .= '<img class="contact-image" src="'.base_url().'uploads/'.$file.'" style="border-width:0px;">';
					$html .= '</div>';
					$html .= '<a href="'.base_url().'contact_us/people_details/'.$id.'/">'.$name_en.'&nbsp;'.$lastname_en.'</a>';
					$html .= '<br>'.$title_en.'<br><br>';
					$html .= '<span class="author-summary"></span>';
					$html .= '<p><strong>T:</strong> '.$phone.' <br><strong>F:</strong> '.$fax.'</p>';
					$html .= '</section>';
					
					$html .= '</div></div>';
					
					return $html;
				}
			}else{
				return '';
			}
		}
             
        function save_list_order($items_array){
            $i = 1;
            foreach($items_array as $key => $value){
                    $item_id = $value['id'];
                    $sql = 'UPDATE cmspeople SET position = '.$i.' WHERE ID = '.$item_id.' LIMIT 1';
                    $query = $this->db->query($sql);
                    $i++;
            }
        }

        function delete($id){
            (integer) $id;
            $sql = 'DELETE FROM cmspeople WHERE ID = '.$id.' LIMIT 1';
            $query = $this->db->query($sql);
            return true;
        }

        function update($id, $approved, $name_en, $name_az, $lastname_en, $lastname_az, $title_en, $title_az, $text_en, $text_az, $qualifications_en, $qualifications_az, $memberships_en, $memberships_az, $phone, $fax, $linkedin_profile, $section, $sector, $file){
            (integer) $id;
            (integer) $approved;
            
			$name_en = addslashes($name_en);
            $name_az = addslashes($name_az);
			$lastname_en = addslashes($lastname_en);
			$lastname_az = addslashes($lastname_az);
            $title_en = addslashes($title_en);
            $title_az = addslashes($title_az);
			$text_en = addslashes($text_en);
			$text_az = addslashes($text_az);
			$qualifications_en = addslashes($qualifications_en);
			$qualifications_az = addslashes($qualifications_az);
			$memberships_en = addslashes($memberships_en);
			$memberships_az = addslashes($memberships_az);
			$phone = addslashes($phone);
			$fax = addslashes($fax);
			$linkedin_profile = addslashes($linkedin_profile);
			$section = addslashes($section);
			$sector = addslashes($sector);
            
            $sql = 'UPDATE `cmspeople` SET
						`approved` = "'.$approved.'",
						`date` = NOW(),
						`name_en` = "'.$name_en.'",
						`name_az` = "'.$name_az.'",
						`lastname_en` = "'.$lastname_en.'",
						`lastname_az` = "'.$lastname_az.'",
						`title_en` = "'.$title_en.'",
						`title_az` = "'.$title_az.'",
						`text_en` = "'.$text_en.'",
						`text_az` = "'.$text_az.'",
						`qualifications_en` = "'.$qualifications_en.'",										
						`qualifications_az` = "'.$qualifications_az.'",										
						`memberships_en` = "'.$memberships_en.'",
						`memberships_az` = "'.$memberships_az.'",
						`phone` = "'.$phone.'",
						`fax` = "'.$fax.'",
						`linkedin_profile` = "'.$linkedin_profile.'",
						`section` = "'.$section.'",
						`sector` = "'.$sector.'",
						`file` = "'.$file.'"
					WHERE ID = '.$id.' LIMIT 1';
            $query = $this->db->query($sql);
            return true;
        }
        
        function getDetails($id){
            (integer) $id;
            $sql = 'SELECT * FROM `cmspeople` WHERE `ID`='.$id.' LIMIT 1';
            $query = $this->db->query($sql);
            return $query->result_array();
        }
                       
        function add($approved, $name_en, $name_az, $lastname_en, $lastname_az, $title_en, $title_az, $text_en, $text_az, $qualifications_en, $qualifications_az, $memberships_en, $memberships_az, $phone, $fax, $linkedin_profile, $section, $sector, $file){            
            (integer) $approved;           

            $name_en = addslashes($name_en);
            $name_az = addslashes($name_az);
			$lastname_en = addslashes($lastname_en);
			$lastname_az = addslashes($lastname_az);
            $title_en = addslashes($title_en);
            $title_az = addslashes($title_az);
			$text_en = addslashes($text_en);
			$text_az = addslashes($text_az);
			$qualifications_en = addslashes($qualifications_en);
			$qualifications_az = addslashes($qualifications_az);
			$memberships_en = addslashes($memberships_en);
			$memberships_az = addslashes($memberships_az);
			$phone = addslashes($phone);
			$fax = addslashes($fax);
			$linkedin_profile = addslashes($linkedin_profile);
			$section = addslashes($section);
			$sector = addslashes($sector);
			$file = addslashes($file);

            $sql = 'INSERT INTO cmspeople(`approved`, `date`, `name_en`, `name_az`, `lastname_en`, `lastname_az`, `title_en`, `title_az`, `text_en`, `text_az`, `qualifications_en`, `qualifications_az`, `memberships_en`, `memberships_az`, `phone`, `fax`, `linkedin_profile`, `section`, `sector`, `file`)
					VALUES ("'.$approved.'",
							 NOW(),
							"'.$name_en.'",
							"'.$name_az.'",
							"'.$lastname_en.'",
							"'.$lastname_az.'",
							"'.$title_en.'",
							"'.$title_az.'",
							"'.$text_en.'",
							"'.$text_az.'",
							"'.$qualifications_en.'",
							"'.$qualifications_az.'",
							"'.$memberships_en.'",
							"'.$qualifications_az.'",
							"'.$phone.'",
							"'.$fax.'",
							"'.$linkedin_profile.'",							
							"'.$section.'",
							"'.$sector.'",
							"'.$file.'")';
            $query = $this->db->query($sql);

            if($this->db->affected_rows() > 0){
                return true;
            }else{
                return false;
            }
        }        
    }