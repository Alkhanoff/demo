<?php
    /**************************************
    *
    * Author   : Orkhan Huseynov
    * Contacts : orkhan.huseynov@live.com
    *
    **************************************/
    class News_model extends CI_Model {
        var $ID;
        var $tagline_en;        
        var $tagline_az;
        var $text_en;       
        var $text_az;
        var $date;
        var $approved;        
        var $times_viewed;
        var $rating;
        var $position;
        var $section;
        var $sector;
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

            $sql = 'SELECT * FROM `cmsnews` ORDER BY position';
            $query = $this->db->query($sql);
            $res['count'] = $query->num_rows();
            $res['totalCount'] = $query->num_rows();
            $res['columns'] = array('Title', '<div style="text-align:center;">Published</div>', '<div style="text-align:center;">Last modified</div>', '<div style="text-align:center;">Actions</div>');

            $i = 0;
            if($query->num_rows() > 0){
                foreach($query->result() as $row){
                    $res['items'][$i]['id'] = $row->ID;

                    $edit_url = site_url('ControlPanel/news/details/'.$row->ID);
                    $delete_url = site_url('ControlPanel/news/delete/'.$row->ID);
                    
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
            $sql = 'SELECT * FROM `cmsnews`';
            $query = $this->db->query($sql);
            return $query->num_rows();
        }

        function getList($page=0, $start=0, $quantity=1000000000000000){
            if($page != 0){                
                $sql = 'SELECT * FROM cmsnews ORDER BY date DESC LIMIT '.$page.',12';
            }else{                
                $sql = 'SELECT * FROM cmsnews ORDER BY date DESC LIMIT 12';
            }

            $query = $this->db->query($sql);
            $htm = '<div class="projects_container">';
            $i = 0;
                        
            if($query->num_rows() > 0){
                foreach($query->result() as $row){                    
                    $id = $row->ID;                    
                    $tagline = $row->tagline_en;
                    $tagline = substr($row->tagline_en, 0, 310) . '...';                    
                    $text = $row->text_en;
                    $date = $row->date;                   
                    $approved = $row->approved;

                    $times_viewed = $row->times_viewed;
                    $href = 'href="'.base_url().'media/news/'.$id.'/"';
                    
                                    
                        if($approved > 0){
                            $htm .= '<div class="project">';
                        }else{
                            if(!$this->user_model->checkLogin('', '', 2)){
                                continue;
                            }
                            $htm .= '<div class="project_hidden">';
                        }
                        $htm .= '<a '.$href.'>';
                        $htm .= '<img src="'.base_url().'userfiles/Pictures/'.$image_1.'" width="203" height="133" alt="" />';
                        $htm .= '</a>';
                        $htm .= '<p><a '.$href.'>'.$title.'</a></p>';
                        $htm .= '<span><a href="'.base_url().'user/name/'.$username.'/.">'.$nameSurname.'</a></span>';
                        $htm .= '<br />';
                        $htm .= '<span>'.$times_viewed.' просмотров | '.$comments.' комментариев</span>';
                        if($this->user_model->checkLogin('', '', 2)){
                            $htm .= '<br />';
                            $htm .= '<span>';
                            if($approved > 0){
                                $htm .= '<a href="'.base_url().'index/hide/'.$id.'/">Скрыть</a>';
                            }else{
                                $htm .= '<a href="'.base_url().'index/show/'.$id.'/">Показать</a>';
                            }
                            $htm .= ' | ';
                            $htm .= '<a href="'.base_url().'index/delete/'.$id.'/" onclick="return confirm(\'Уверены?\')">Удалить</a>';
                            $htm .= '</span>';
                        }
                        $htm .= '</div>';

                        $i++;
                    
                   
                }
            }
            if($i == 0){
                $htm .= '<div style="width:100%;" height:400px; class="section_empty_message">Проектов пока нет.</div>';
            }
            $htm .= '</div><div style="width:100%;clear:both;height:100%;"></div>';
            return $htm;
        }

        function get_default_page_list(){
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
			
			$sql = 'SELECT * FROM `cmsnews` WHERE `approved` = 1 ORDER BY `position` ASC, `date` DESC LIMIT 4';
			
			$query = $this->db->query($sql);
			$htm = '<div class="inner">';
			
			if($query->num_rows > 0){
				foreach($query->result() as $row){                    
                    $id = $row->ID;                    
                    $title_en = $row->title_en;	
					if($lang == 'en'){
                    	$title_en = word_limiter($row->title_en, 10); 
					}else{
						$title_en = word_limiter($row->title_az, 10);
					}
					
					$href = 'href="'.base_url().'media_and_events/news_details/'.$id.'/"';
					$htm .= '<p>';
					$htm .= '<a '.$href.'>';
					$htm .= $title_en;
					$htm .= '</a>';
					$htm .= '</p>';
				}
			}
			$htm .= '<a class="link" href="/media_and_events/news">'.($lang == 'en' ? 'More news' : 'Ətraflı').'</a>';
			$htm .= '</div>';
			return $htm;
        }
		
		function get_whatsnew_list(){
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
			
			$sql = 'SELECT * FROM `cmsnews` WHERE `approved` = 1 ORDER BY `position` ASC, `date` DESC LIMIT 3';
			
			$query = $this->db->query($sql);
			$htm = '<div id="news">';
			
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
                    $title_en = word_limiter($title_en, 10);
					$tagline_en = word_limiter($tagline_en, 30);
					
					$href = 'href="'.base_url().'media_and_events/news_details/'.$id.'/"';
					$htm .= '<h4><a '.$href.'>'.$title_en.'</a></h4>';					
					$htm .= $tagline_en;	
					$htm .= '<br /><br />';
				}
			}
			
			$htm .= '</div>';
			return $htm;
        }

        function get_search_list($section, $sector, $month, $year, $page=0){
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
			
            (integer) $section;
            (integer) $sector;
			(integer) $month;
			(integer) $year;
            (integer) $page;
			
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
            
            if($page == 0){
                $ins_sql = '';
                if($section != 0){
                    $ins_sql .= 'AND `section` = '.$section.' ';
                }
                if($sector != 0){
                    $ins_sql .= 'AND `sector` = '.$sector.' ';
                }
                if($month != 0){
                    $month_date_start = date('Y-m-d 00:00:00', strtotime($year.'-'.$month));
					$month_date_end = date('Y-m-t 00:00:00', strtotime($year.'-'.$month));
                    $ins_sql .= 'AND `date` >= "'.$month_date_start.'" AND `date` <= "'.$month_date_end.'"';
                }
                if($year != 0){
					$year_date_start = date('Y-01-01 00:00:00', strtotime($year.'-01'));
                    $year_date_end = date('Y-12-31 00:00:00', strtotime($year.'-01'));
                    $ins_sql .= 'AND `date` >= "'.$year_date_start.'" AND `date` <= "'.$year_date_end.'"';
                }
            
                $sql = 'SELECT * FROM `cmsnews` WHERE `approved` = 1 '.$ins_sql.' ORDER BY `position` ASC, `date` DESC LIMIT 8';  //echo $sql;             
            }else{
                $ins_sql = '';
                if($section != 0){
                    $ins_sql .= 'AND `section` = '.$section.' ';
                }
                if($sector != 0){
                    $ins_sql .= 'AND `sector` = '.$sector.' ';
                }
                if($month != 0){
                    $month_date_start = date('Y-m-d 00:00:00', strtotime($month));
					$month_date_end = date('Y-m-t 00:00:00', strtotime($month));
                    $ins_sql .= 'AND `date` >= "'.$month_date_start.'" AND `date` <= "'.$month_date_end.'"';
                }
                if($year != 0){
					$year_date_start = date('Y-01-01 00:00:00', strtotime($year.'-01'));
                    $year_date_end = date('Y-12-31 00:00:00', strtotime($year.'-01'));
                    $ins_sql .= 'AND `date` >= "'.$year_date_start.'" AND `date` <= "'.$year_date_end.'"';
                }
                 
                $sql = 'SELECT * FROM `cmsnews` WHERE `approved` = 1 '.$ins_sql.' ORDER BY `position` ASC, `date` DESC LIMIT '.$page.', 8';               
            
            }

            $query = $this->db->query($sql);
            $htm = '<div class="grid">';

            if($query->num_rows > 0){
                $i=1;
				foreach($query->result() as $row){
                    $id = $row->ID;
                    if($lang == 'en'){
						$title_en = $row->title_en;
						$tagline_en = $row->tagline_en;
					}else{
						$title_en = $row->title_az;
						$tagline_en = $row->tagline_az;
					}
                    $date = date("m/d/y", strtotime($row->date));

					$href = 'href="'.base_url().'media_and_events/news_details/'.$id.'/"';
					if($i%4==0){
                        $htm .= '<a '.$href.' class="last">';
					}else{
					    $htm .= '<a '.$href.'>';
					}
                    $htm .= '<h2>'.word_limiter($title_en, 15).'</h2>';
                    $htm .= '<p class="date">'.$date.'</p>';
		    		$htm .= '</a>';
		    		
		    		if($i<8 && $i%4==0){
		    		    $htm .= '</div><div class="grid last-child">';
		    		}
		    		
		    		$i++;
                }
            }else{
            	$htm .= '<p style="background:none;">Sorry, your search returned no results.</p>';
            }

            $htm .= '</div>';
            return $htm;
        }
		
		function get_count($section, $sector, $month, $year){
            (integer) $section;
            (integer) $sector;
			(integer) $month;
			(integer) $year;
                        
            
            $ins_sql = '';
            if($section != 0){
                $ins_sql .= 'AND `section` = '.$section.' ';
            }
            if($sector != 0){
                $ins_sql .= 'AND `sector` = '.$sector.' ';
            }
            if($month != 0){
                $month_date_start = date('Y-m-d 00:00:00', strtotime($month));
				$month_date_end = date('Y-m-t 00:00:00', strtotime($month));
                $ins_sql .= 'AND `date` >= "'.$month_date_start.'" AND `date` <= "'.$month_date_end.'"';
            }
            if($year != 0){
				$year_date_start = date('Y-01-01 00:00:00', strtotime($year.'-01'));
                $year_date_end = date('Y-12-31 00:00:00', strtotime($year.'-01'));
                $ins_sql .= 'AND `date` >= "'.$year_date_start.'" AND `date` <= "'.$year_date_end.'"';
            }
            
            $sql = 'SELECT COUNT(`ID`) AS `cnt` FROM `cmsnews` WHERE `approved` = 1 '.$ins_sql.' ORDER BY `position` ASC, `date` DESC';               
            

            $query = $this->db->query($sql);            

            if($query->num_rows > 0){
				foreach($query->result() as $row){
                    return $row->cnt;                    
                }
            }else{
            	return 0;
            }
        }

        function get_featured_list(){
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
			
            $sql = 'SELECT * FROM `cmsnews` WHERE `approved` = 1 ORDER BY `position` ASC, `date` DESC LIMIT 3';
			
    	    $query = $this->db->query($sql);
    	    $htm = '<div class="resultsContainer">';
    			
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
                    $tagline_en = word_limiter(strip_tags($tagline_en), 20);
                    $date = date("m/d/y", strtotime($row->date)); 
    					
    		    	$href = 'href="'.base_url().'media_and_events/news_details/'.$id.'/"';
    		    	$htm .= '<a class="result" '.$href.'>';
    		    	$htm .= '<h2>'.$title_en.'</h2>';
    		    	$htm .= '<p class="date">'.$date.'</p>';
    		    	$htm .= '<p>'.$tagline_en.'</p>';
    		    	$htm .= '</a>';
    			}
    	    }
    			
    	    $htm .= '</div>';
    	    return $htm;
        }
             
        function save_list_order($items_array){
            $i = 1;
            foreach($items_array as $key => $value){
                    $item_id = $value['id'];
                    $sql = 'UPDATE cmsnews SET position = '.$i.' WHERE ID = '.$item_id.' LIMIT 1';
                    $query = $this->db->query($sql);
                    $i++;
            }
        }

        function delete($id){
            (integer) $id;
            $sql = 'DELETE FROM cmsnews WHERE ID = '.$id.' LIMIT 1';
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

            $sql = 'UPDATE `cmsnews` SET `approved` = "'.$approved.'", `date` = NOW(), `title_en` = "'.$title_en.'", `title_az` = "'.$title_az.'", `tagline_en` = "'.$tagline_en.'", `text_en` = "'.$text_en.'", `tagline_az` = "'.$tagline_az.'", `text_az` = "'.$text_az.'" WHERE ID = '.$id.' LIMIT 1';
            $query = $this->db->query($sql);
            return true;
        }
        
        function getNewsDetails($id){
            (integer) $id;
            $sql = 'SELECT * FROM `cmsnews` WHERE `ID`='.$id.' LIMIT 1';
            $query = $this->db->query($sql);
            return $query->result_array();
        }
                       
        function add($approved, $title_en, $title_az, $tagline_en, $text_en, $tagline_az, $text_az, $section, $sector){            
            (integer) $approved;           

            $tagline_en= addslashes($tagline_en);
            $text_en= addslashes($text_en);
            $tagline_az= addslashes($tagline_az);
            $text_az= addslashes($text_az);

            $sql = 'INSERT INTO cmsnews(`approved`, `date`, `title_en`, `title_az`, `tagline_en`, `text_en`, `tagline_az`, `text_az`, `section`, `sector`) VALUES
                                           ("'.$approved.'", NOW(), "'.$title_en.'", "'.$title_az.'", "'.$tagline_en.'", "'.$text_en.'", "'.$tagline_az.'", "'.$text_az.'", "'.$section.'", "'.$sector.'")';
            $query = $this->db->query($sql);

            if($this->db->affected_rows() > 0){
                return true;
            }else{
                return false;
            }
        }

        function increaseTimesViewed($id){
            $sql = 'SELECT `times_viewed` FROM cmsnews WHERE `ID` = '.$id.' LIMIT 1';
            $query = $this->db->query($sql);

            $times_viewed = 0;

            if($this->db->affected_rows() > 0){
                foreach($query->result() as $row){
                    $times_viewed = $row->times_viewed;
                }
            }

            $times_viewed++;

            $sql_upd = 'UPDATE cmsnews SET `times_viewed` = '.$times_viewed.' WHERE `ID` = "'.$id.'" LIMIT 1';
            $query_upd = $this->db->query($sql_upd);

            if($this->db->affected_rows() > 0){
                return true;
            }else{
                return false;
            }
        }
    }