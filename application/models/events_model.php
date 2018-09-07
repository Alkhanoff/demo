<?php
    /**************************************
    *
    * Author   : Orkhan Huseynov
    * Contacts : orkhan.huseynov@live.com
    *
    **************************************/
    class Events_model extends CI_Model {
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

            $sql = 'SELECT * FROM `cmsevents` ORDER BY position';
            $query = $this->db->query($sql);
            $res['count'] = $query->num_rows();
            $res['totalCount'] = $query->num_rows();
            $res['columns'] = array('Title', '<div style="text-align:center;">Published</div>', '<div style="text-align:center;">Last modified</div>', '<div style="text-align:center;">Actions</div>');

            $i = 0;
            if($query->num_rows() > 0){
                foreach($query->result() as $row){
                    $res['items'][$i]['id'] = $row->ID;

                    $edit_url = site_url('ControlPanel/events/details/'.$row->ID);
                    $delete_url = site_url('ControlPanel/events/delete/'.$row->ID);
                    
                    ($row->approved == 1)? $published = '<span style="color: rgb(51, 153, 0);">Yes</span>' : $published = '<span style="color: rgb(204, 0, 0);">No</span>';
                    $published = '<div style="text-align:center;">'.$published.'</div>';
                    $date = '<div style="text-align:center;">'.$row->date.'</div>';
                    if(strlen($row->tagline_en) > 150){
                        $title_en = '<div style="text-align:center;">'.substr(strip_tags($row->title_en), 0, 150) . '...</div>';
                    }else{
                        $title_en = '<div style="text-align:center;">'.strip_tags($row->title_en).'</div>';
                    }

                    $res['items'][$i]['info'] = array($title_en, $published, $date, '<div style="text-align:center;"><a href="'.$edit_url.'">Edit</a> | <a href="'.$delete_url.'">Delete</a></div>');
                    $i++;
                }
            }
            $res = $this->JSON_model->encode($res);
            return $res;
        }

        function getTotalRows(){
            $sql = 'SELECT * FROM `cmsevents`';
            $query = $this->db->query($sql);
            return $query->num_rows();
        }        

        function get_search_list($page){
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
						
			(integer) $page;
			if($page == 0){
				$sql = 'SELECT * FROM `cmsevents` WHERE `approved` = 1 ORDER BY `position` ASC, `date` DESC LIMIT 10';
			}else{
				$sql = 'SELECT * FROM `cmsevents` WHERE `approved` = 1 ORDER BY `position` ASC, `date` DESC LIMIT '.$page.', 10';
			}
			
			$query = $this->db->query($sql);
			$htm = '<ul class="events">';
			
			if($query->num_rows > 0){
				foreach($query->result() as $row){                    
                    $id = $row->ID;                    
                    if($lang == 'en'){
						$title_en = $row->title_en;
						$tagline_en = $row->tagline_en;
					}else{
						$title_en = $row->title_az;
						$tagline_en = $row->tagline_az;
					}
					$section = $row->section;
                    $section_name = $this->section_model->getSectionName($section);
                    $section_url = $this->section_model->get_url($section);
                    $sector = $row->sector;
                    $sector_name = $this->section_model->getSectionName($sector);
                    $sector_url = $this->section_model->get_url($sector);
					
					$href = 'href="'.base_url().'media_and_events/events_details/'.$id.'/"';
					$htm .= '<li>';
					$htm .= '<h2>';
					$htm .= '<a '.$href.'>';
					$htm .= $title_en;
					$htm .= '</a>';
					$htm .= '</h2>';
					
					$htm .= '<p>';
					$htm .= $tagline_en;
					$htm .= '</p>';
									
					if($section != 0){
                    	$htm .= '<p>Services: ';
                    	$htm .= '<a href="'.$section_url.'">';
                    	$htm .= $section_name;
                    	$htm .= '</a>';
                    	$htm .= '</p>';
                    }
                    if($sector != 0){
                    	$htm .= '<p>Sectors: ';
                    	$htm .= '<a href="'.$sector_url.'">';
                    	$htm .= $sector_name;
                    	$htm .= '</a>';
                    	$htm .= '</p>';
                    }
					
					$htm .= '<p>';
					$htm .= '<a '.$href.'>';
					$htm .= 'Display event dates and locations';
					$htm .= '</a>';
					$htm .= '</p>';
					
					$htm .= '<div class="clearance"></div>';
					$htm .= '</li>';
				}
			}
			
			$htm .= '</ul>';
			return $htm;
        }       
		
		function get_count(){                          
            $sql = 'SELECT COUNT(`ID`) AS `cnt` FROM `cmsevents` WHERE `approved` = 1 ORDER BY `position` ASC, `date` DESC';               
            

            $query = $this->db->query($sql);            

            if($query->num_rows > 0){
				foreach($query->result() as $row){
                    return $row->cnt;                    
                }
            }else{
            	return 0;
            }
        }        
             
        function save_list_order($items_array){
            $i = 1;
            foreach($items_array as $key => $value){
                    $item_id = $value['id'];
                    $sql = 'UPDATE cmsevents SET position = '.$i.' WHERE ID = '.$item_id.' LIMIT 1';
                    $query = $this->db->query($sql);
                    $i++;
            }
        }

        function delete($id){
            (integer) $id;
            $sql = 'DELETE FROM cmsevents WHERE ID = '.$id.' LIMIT 1';
            $query = $this->db->query($sql);
            return true;
        }

        function update($id, $approved, $title_en, $title_az, $tagline_en, $text_en, $tagline_az, $text_az){
            (integer) $id;
            (integer) $approved;
            //(integer) $section;
            //(integer) $sector;

            $title_en = addslashes($title_en);
            $title_az = addslashes($title_az);
            $tagline_en= addslashes($tagline_en);
            $text_en= addslashes($text_en);
            $tagline_az= addslashes($tagline_az);
            $text_az= addslashes($text_az);            

            $sql = 'UPDATE `cmsevents` SET `approved` = "'.$approved.'", `date` = NOW(), `title_en` = "'.$title_en.'", `title_az` = "'.$title_az.'", `tagline_en` = "'.$tagline_en.'", `text_en` = "'.$text_en.'", `tagline_az` = "'.$tagline_az.'", `text_az` = "'.$text_az.'" WHERE ID = '.$id.' LIMIT 1';
            $query = $this->db->query($sql);
            return true;
        }
        
        function getDetails($id){
			(integer) $id;
			$sql = 'SELECT * FROM `cmsevents` WHERE ID='.$id.' LIMIT 1';
			$query = $this->db->query($sql);
            return $query->result_array();
        }
                       
        function add($approved, $title_en, $title_az, $tagline_en, $text_en, $tagline_az, $text_az, $section, $sector){            
            (integer) $approved;           

            $tagline_en= addslashes($tagline_en);
            $text_en= addslashes($text_en);
            $tagline_az= addslashes($tagline_az);
            $text_az= addslashes($text_az);

            $sql = 'INSERT INTO cmsevents(`approved`, `date`, `title_en`, `title_az`, `tagline_en`, `text_en`, `tagline_az`, `text_az`, `section`, `sector`) VALUES
                                           ("'.$approved.'", NOW(), "'.$title_en.'", "'.$title_az.'", "'.$tagline_en.'", "'.$text_en.'", "'.$tagline_az.'", "'.$text_az.'", "'.$section.'", "'.$sector.'")';
            $query = $this->db->query($sql);

            if($this->db->affected_rows() > 0){
                return true;
            }else{
                return false;
            }
        }        
    }