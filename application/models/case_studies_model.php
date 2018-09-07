<?php
    /**************************************
    *
    * Author   : Orkhan Huseynov
    * Contacts : orkhan.huseynov@live.com
    *
    **************************************/
    class Case_studies_model extends CI_Model {
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

        function getJSONList(){
            $res = array();
            $res['requestFirstIndex'] = 0;
            $res['firstIndex'] = 0;

            $sql = 'SELECT * FROM cmscasestudies ORDER BY position';
            $query = $this->db->query($sql);
            $res['count'] = $query->num_rows();
            $res['totalCount'] = $query->num_rows();
            $res['columns'] = array('Title', '<div style="text-align:center;">Published</div>', '<div style="text-align:center;">Featured</div>', '<div style="text-align:center;">Last modified</div>', '<div style="text-align:center;">Actions</div>');

            $i = 0;
            if($query->num_rows() > 0){
                foreach($query->result() as $row){
                    $res['items'][$i]['id'] = $row->ID;

                    $edit_url = site_url('ControlPanel/case_studies/details/'.$row->ID);
                    $delete_url = site_url('ControlPanel/case_studies/delete/'.$row->ID);
                    
                    ($row->approved == 1)? $published = '<span style="color: rgb(51, 153, 0);">Yes</span>' : $published = '<span style="color: rgb(204, 0, 0);">No</span>';
                    $published = '<div style="text-align:center;">'.$published.'</div>';

                    ($row->featured == 1)? $featured = '<span style="color: rgb(51, 153, 0);">Yes</span>' : $featured = '<span style="color: rgb(204, 0, 0);">No</span>';
                    $featured = '<div style="text-align:center;">'.$featured .'</div>';

                    $date = '<div style="text-align:center;">'.$row->date.'</div>';
                    if(strlen($row->title_en) > 150){
                        $title_en = '<div style="text-align:center;">'.substr(strip_tags($row->title_en), 0, 150) . '...</div>';
                    }else{
                        $title_en = '<div style="text-align:center;">'.strip_tags($row->title_en).'</div>';
                    }

                    $res['items'][$i]['info'] = array($title_en, $published, $featured, $date, '<div style="text-align:center;"><a href="'.$edit_url.'">Edit</a> | <a href="'.$delete_url.'">Delete</a></div>');
                    $i++;
                }
            }
            $res = $this->JSON_model->encode($res);
            return $res;
        }

        function getTotalRows(){
            $sql = 'SELECT * FROM cmscasestudies';
            $query = $this->db->query($sql);
            return $query->num_rows();
        }        

        function get_featured_case_studies(){
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
			
	    	$sql = 'SELECT * FROM `cmscasestudies` WHERE `approved` = 1 AND `featured` = 1 ORDER BY `position` ASC, `date` DESC LIMIT 3';
			
	    $query = $this->db->query($sql);
	    $htm = '<ul class="case-studies three-col">';
	    
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
			    
		    $htm .= '<li class="col">';
		    $htm .= '<h3>';
                    $htm .= '<a href="'.base_url().'case_studies/details/'.$id.'/">';
                    $htm .= $title_en;
                    $htm .= '</a>';
                    $htm .= '</h3>';
                    if($section != 0){
                    	$htm .= '<div class="service">Services:';
                    	$htm .= '<a href="'.$section_url.'">';
                    	$htm .= $section_name;
                    	$htm .= '</a>';
                    	$htm .= '</div>';
                    }
                    if($sector != 0){
                    	$htm .= '<div class="service">Sectors:';
                    	$htm .= '<a href="'.$sector_url.'">';
                    	$htm .= $sector_name;
                    	$htm .= '</a>';
                    	$htm .= '</div>';
                    }
                    
		    $htm .= '<p>';
		    $htm .= $tagline_en;
		    $htm .= '</p>';
		    $htm .= '</li>';
		}
	    }
			
	    $htm .= '</ul>';
	    return $htm;
        }
             
        function save_list_order($items_array){
            $i = 1;
            foreach($items_array as $key => $value){
                    $item_id = $value['id'];
                    $sql = 'UPDATE cmscasestudies SET position = '.$i.' WHERE ID = '.$item_id.' LIMIT 1';
                    $query = $this->db->query($sql);
                    $i++;
            }
        }

        function delete($id){
            (integer) $id;
            $sql = 'DELETE FROM cmscasestudies WHERE ID = '.$id.' LIMIT 1';
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

            $sql = 'UPDATE `cmscasestudies` SET `approved` = "'.$approved.'", `featured` = "'.$featured.'", `date` = NOW(), `title_en` = "'.$title_en.'", `text_en` = "'.$text_en.'", `title_az` = "'.$title_az.'", `text_az` = "'.$text_az.'", `tagline_en` = "'.$tagline_en.'", `tagline_az` = "'.$tagline_az.'" WHERE ID = '.$id.' LIMIT 1';
            $query = $this->db->query($sql);
            return true;
        }
        
        function getDetails($id){
            (integer) $id;
            $sql = 'SELECT * FROM `cmscasestudies` WHERE `ID`='.$id.' LIMIT 1';
            $query = $this->db->query($sql);
            return $query->result_array();
        }
                       
        function add($approved, $featured, $title_en, $text_en, $title_az, $text_az, $tagline_en, $tagline_az, $section, $sector, $file){            
            (integer) $approved; 
            (integer) $featured;
            (integer) $section;          

            $title_en= addslashes($title_en);
            $text_en= addslashes($text_en);
            $title_az= addslashes($title_az);
            $text_az= addslashes($text_az);
            $tagline_en = addslashes($tagline_en);
            $tagline_az = addslashes($tagline_az);
            $file = addslashes($file);

            $sql = 'INSERT INTO cmscasestudies(`approved`, `featured`, `date`, `title_en`, `text_en`, `title_az`, `text_az`, `tagline_en`, `tagline_az`, `section`, `sector`, `file`) VALUES
                                           ("'.$approved.'", "'.$featured.'", NOW(), "'.$title_en.'", "'.$text_en.'", "'.$title_az.'", "'.$text_az.'", "'.$tagline_en.'", "'.$tagline_az.'", '.$section.', '.$sector.', "'.$file.'")';
            $query = $this->db->query($sql);

            if($this->db->affected_rows() > 0){
                return true;
            }else{
                return false;
            }
        }

        function get_search_list($section, $sector, $page=0){
            (integer) $section;
            (integer) $sector;
            (integer) $page;
			
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
            
            if($page == 0){
                if($section != 0 && $sector != 0){
                    $sql = 'SELECT * FROM `cmscasestudies` WHERE `section` = '.$section.' AND `sector` = '.$sector.' AND `approved` = 1 ORDER BY `position` ASC, `date` DESC LIMIT 10'; 
                }elseif($section != 0 && $sector == 0){
                    $sql = 'SELECT * FROM `cmscasestudies` WHERE `section` = '.$section.' AND `approved` = 1 ORDER BY `position` ASC, `date` DESC LIMIT 10';
                }elseif($section == 0 && $sector != 0){
                    $sql = 'SELECT * FROM `cmscasestudies` WHERE `sector` = '.$sector.' AND `approved` = 1 ORDER BY `position` ASC, `date` DESC LIMIT 10';
                }else{
                    $sql = 'SELECT * FROM `cmscasestudies` WHERE `approved` = 1 ORDER BY `position` ASC, `date` DESC LIMIT 10';
                }
            }else{
                if($section != 0 && $sector != 0){
                    $sql = 'SELECT * FROM `cmscasestudies` WHERE `section` = '.$section.' AND `sector` = '.$sector.' AND `approved` = 1 ORDER BY `position` ASC, `date` DESC LIMIT '.$page.',10'; 
                }elseif($section != 0 && $sector == 0){
                    $sql = 'SELECT * FROM `cmscasestudies` WHERE `section` = '.$section.' AND `approved` = 1 ORDER BY `position` ASC, `date` DESC LIMIT '.$page.',10';
                }elseif($section == 0 && $sector != 0){
                    $sql = 'SELECT * FROM `cmscasestudies` WHERE `sector` = '.$sector.' AND `approved` = 1 ORDER BY `position` ASC, `date` DESC LIMIT '.$page.',10';
                }else{
                    $sql = 'SELECT * FROM `cmscasestudies` WHERE `approved` = 1 ORDER BY `position` ASC, `date` DESC LIMIT '.$page.',10';
                }
            }

            $query = $this->db->query($sql);
            $htm = '<ul id="lvItems_lvLayout" class="case-studies clearance">';

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

                    $htm .= '<li>';
                    $htm .= '<h3>';
                    $htm .= '<a href="'.base_url().'case_studies/details/'.$id.'/">';
                    $htm .= $title_en;
                    $htm .= '</a>';
                    $htm .= '</h3>';
      
                    if($section != 0){
						$htm .= ($lang == 'en')? '<div class="service">Services: ' : '<div class="service">Xidmətlər: ';
                    	$htm .= '<a href="'.$section_url.'">';
                    	$htm .= $section_name;
                    	$htm .= '</a>';
                    	$htm .= '</div>';
                    }
                    if($sector != 0){
						$htm .= ($lang == 'en')? '<div class="service">Sectors: ' : '<div class="service">Sektorlar: ';
                    	$htm .= '<a href="'.$sector_url.'">';
                    	$htm .= $sector_name;
                    	$htm .= '</a>';
                    	$htm .= '</div>';
                    } 

                    $htm .= '<p>';
		    $htm .= $tagline_en;
		    $htm .= '</p>';
		    $htm .= '</li>';
                }
            }else{
            	$htm .= '<li style="background:none;">Sorry, your search returned no results.</li>';
            }

            $htm .= '</ul>';
            return $htm;
        }
        
        function get_count($section=0, $sector=0){
            if($section != 0 && $sector != 0){
            	$sql = 'SELECT count(`ID`) AS `cnt` FROM `cmscasestudies` WHERE `section` = '.$section.' AND `sector` = '.$sector.' AND `approved` = 1 ORDER BY `position` ASC, `date` DESC LIMIT 10'; 
            }elseif($section != 0 && $sector == 0){
                $sql = 'SELECT count(`ID`) AS `cnt` FROM `cmscasestudies` WHERE `section` = '.$section.' AND `approved` = 1 ORDER BY `position` ASC, `date` DESC LIMIT 10';
            }elseif($section == 0 && $sector != 0){
                $sql = 'SELECT count(`ID`) AS `cnt` FROM `cmscasestudies` WHERE `sector` = '.$sector.' AND `approved` = 1 ORDER BY `position` ASC, `date` DESC LIMIT 10';
            }else{
                $sql = 'SELECT count(`ID`) AS `cnt` FROM `cmscasestudies` WHERE `approved` = 1 ORDER BY `position` ASC, `date` DESC LIMIT 10';
            }
            
            $query = $this->db->query($sql);
            
            if($query->num_rows > 0){
		foreach($query->result() as $row){
		     return $row->cnt;
		}
	    }
	    
	    return 0;
        }
        
    }