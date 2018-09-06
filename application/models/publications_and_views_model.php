<?php
    /**************************************
    *
    * Author   : Orkhan Huseynov
    * Contacts : orkhan.huseynov@live.com
    *
    **************************************/
    class Publications_and_views_model extends CI_Model {
        var $ID;
        var $tagline_en;        
        var $tagline_az;
        var $text_en;       
        var $text_az;    
        var $approved; 
        var $date;
        var $position;        
        var $times_viewed;        
        
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

            $sql = 'SELECT * FROM cmspublicationsandviews ORDER BY position';
            $query = $this->db->query($sql);
            $res['count'] = $query->num_rows();
            $res['totalCount'] = $query->num_rows();
            $res['columns'] = array('Title', '<div style="text-align:center;">Published</div>', '<div style="text-align:center;">Featured</div>', '<div style="text-align:center;">Research</div>', '<div style="text-align:center;">Last modified</div>', '<div style="text-align:center;">Actions</div>');

            $i = 0;
            if($query->num_rows() > 0){
                foreach($query->result() as $row){
                    $res['items'][$i]['id'] = $row->ID;

                    $edit_url = site_url('ControlPanel/publications_and_views/details/'.$row->ID);
                    $delete_url = site_url('ControlPanel/publications_and_views/delete/'.$row->ID);
                    
                    ($row->approved == 1)? $published = '<span style="color: rgb(51, 153, 0);">Yes</span>' : $published = '<span style="color: rgb(204, 0, 0);">No</span>';
                    $published = '<div style="text-align:center;">'.$published.'</div>';

                    ($row->featured == 1)? $featured = '<span style="color: rgb(51, 153, 0);">Yes</span>' : $featured = '<span style="color: rgb(204, 0, 0);">No</span>';
                    $featured = '<div style="text-align:center;">'.$featured.'</div>';
 
                    ($row->research == 1)? $research = '<span style="color: rgb(51, 153, 0);">Yes</span>' : $research = '<span style="color: rgb(204, 0, 0);">No</span>';
                    $research = '<div style="text-align:center;">'.$research.'</div>';
            
                    $date = '<div style="text-align:center;">'.$row->date.'</div>';
                    if(strlen($row->title_en) > 150){
                        $title_en = '<div style="text-align:center;">'.substr(strip_tags($row->title_en), 0, 150) . '...</div>';
                    }else{
                        $title_en = '<div style="text-align:center;">'.strip_tags($row->title_en).'</div>';
                    }

                    $res['items'][$i]['info'] = array($title_en, $published, $featured, $research, $date, '<div style="text-align:center;"><a href="'.$edit_url.'">Edit</a> | <a href="'.$delete_url.'">Delete</a></div>');
                    $i++;
                }
            }
            $res = $this->JSON_model->encode($res);
            return $res;
        }

        function getTotalRows(){
            $sql = 'SELECT * FROM cmspublicationsandviews';
            $query = $this->db->query($sql);
            return $query->num_rows();
        }        
                     
        function save_list_order($items_array){
            $i = 1;
            foreach($items_array as $key => $value){
                    $item_id = $value['id'];
                    $sql = 'UPDATE cmspublicationsandviews SET position = '.$i.' WHERE ID = '.$item_id.' LIMIT 1';
                    $query = $this->db->query($sql);
                    $i++;
            }
        }

        function delete($id){
            (integer) $id;
            $sql = 'DELETE FROM cmspublicationsandviews WHERE ID = '.$id.' LIMIT 1';
            $query = $this->db->query($sql);
            return true;
        }

        function update($id, $approved, $featured, $research, $title_en, $text_en, $title_az, $text_az, $tagline_en, $tagline_az, $file, $image){
            (integer) $id;
            (integer) $approved; 
            (integer) $featured;
            (integer) $research;           

            $title_en= addslashes($title_en);
            $text_en= addslashes($text_en);
            $title_az= addslashes($title_az);
            $text_az= addslashes($text_az);
            $tagline_en = addslashes($tagline_en);
            $tagline_az = addslashes($tagline_az);
            $file = addslashes($file);
            $image = addslashes($image);            

            $sql = 'UPDATE `cmspublicationsandviews` SET `approved` = "'.$approved.'", `featured` = "'.$featured.'", `research` = "'.$research.'", `date` = NOW(), `title_en` = "'.$title_en.'", `text_en` = "'.$text_en.'", `title_az` = "'.$title_az.'", `text_az` = "'.$text_az.'", `tagline_en` = "'.$tagline_en.'", `tagline_az` = "'.$tagline_az.'"';
            if($file != '')	{
            	$sql .= ', `file` = "'.$file.'"';
            }
            if($image != '') {
            	$sql .= ', `image` = "'.$image.'"';
            }
            $sql .= ' WHERE ID = '.$id.' LIMIT 1';
            $query = $this->db->query($sql);
            return true;
        }
        
        function getDetails($id){
            (integer) $id;
            $sql = 'SELECT * FROM `cmspublicationsandviews` WHERE `ID`='.$id.' LIMIT 1';
            $query = $this->db->query($sql);
            return $query->result_array();
        }
                       
        function add($approved, $featured, $research, $title_en, $text_en, $title_az, $text_az, $tagline_en, $tagline_az, $section, $sector, $file, $image){            
            (integer) $approved;
            (integer) $section;
            (integer) $sector;
            (integer) $featured;
            (integer) $research;                    

            $title_en= addslashes($title_en);
            $text_en= addslashes($text_en);
            $title_az= addslashes($title_az);
            $text_az= addslashes($text_az);
            $tagline_en = addslashes($tagline_en);
            $tagline_az = addslashes($tagline_az);
            $file = addslashes($file);
            $image = addslashes($image);            

            $sql = 'INSERT INTO cmspublicationsandviews(`approved`, `featured`, `research`, `date`, `title_en`, `text_en`, `title_az`, `text_az`, `tagline_en`, `tagline_az`, `section`, `sector`, `file`, `image`) VALUES
                                           ("'.$approved.'", "'.$featured.'", "'.$research.'", NOW(), "'.$title_en.'", "'.$text_en.'", "'.$title_az.'", "'.$text_az.'", "'.$tagline_en.'", "'.$tagline_az.'", "'.$section.'", "'.$sector.'", "'.$file.'", "'.$image.'")';
            $query = $this->db->query($sql);

            if($this->db->affected_rows() > 0){
                return true;
            }else{
                return false;
            }
        }
        
        function get_most_viewed(){
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
			
            $sql = 'SELECT * FROM `cmspublicationsandviews` WHERE `approved` = 1 ORDER BY `times_viewed` DESC LIMIT 6';
            $query = $this->db->query($sql);
            
            $htm = '';
            
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
                    
			
                    
                    $htm .= '<article>';
                    $htm .= '<p>';
                    $htm .= '<a href="'.base_url().'publications_and_views/details/'.$id.'/">';
                    $htm .= '<strong>';
                    $htm .= $title_en;
                    $htm .= '</strong>';
                    $htm .= '</a>';
                    $htm .= '<br />';
                    $htm .= '</p><p></p>';
                    $htm .= '</article>';
                }
            }else{
                $htm .= '<article>No publications or views.</article>';
            }
            
            return $htm;
        }
        
        function section_parent($sectionid){
            $sectionid = ereg_replace("[^0-9]", "", $sectionid);
            $sql = 'SELECT parentid FROM cmssections WHERE ID='.$sectionid.' LIMIT 1';
            $query = $this->db->query($sql);
            foreach($query->result() as $row){
                return $row->parentid;
            }
            return false;
        }
        
        function time_elapsed_string($ptime) {
            $etime = time() - $ptime;
    
            if ($etime < 1){
               return '0 seconds ago';
            }
    
            $a = array( 12 * 30 * 24 * 60 * 60  =>  'year',
                    30 * 24 * 60 * 60       =>  'month',
                    24 * 60 * 60            =>  'day',
                    60 * 60                 =>  'hour',
                    60                      =>  'minute',
                    1                       =>  'second'
                 );
    
            foreach ($a as $secs => $str) {
                $d = $etime / $secs;
                if($d >= 1) {
                   $r = round($d);
                   return $r . ' ' . $str . ($r > 1 ? 's' : '') . ' ago';
                }
            }
        }

        /*function get_search_list($checked, $page=0, $perpage=10){            
            (integer) $page;
            (integer) $perpage;
			
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
            
            $found_section = false;
            $found_sector = false;
            $ins_sql = 'AND (';
            foreach($checked as $key=>$value){
                if($value == 'on'){
                    $section = filter_var($key, FILTER_SANITIZE_NUMBER_INT);
                    if($this->section_parent($section) == 3){
                        if(!$found_section){                        
                    	    $ins_sql .= '`section` = '.$section;
                    	}else{
                    	    $ins_sql .= ' OR `section` = '.$section;
                    	}
                    	$found_section = true;
                    }elseif($this->section_parent($section) == 4){
                        if(!$found_sector && !$found_section){                        
                    	    $ins_sql .= '`sector` = '.$section;
                    	}else{
                    	    $ins_sql .= ' OR `sector` = '.$section;
                    	}
                    	$found_sector = true;
                    }
                }
            }
            
            if(!$found_section && !$found_sector){
                $ins_sql = '';
            }else{
                $ins_sql .= ')';
            }
            
            if($page == 0){
                $sql = 'SELECT * FROM `cmspublicationsandviews` WHERE `approved` = 1 '.$ins_sql.' ORDER BY `position` ASC, `date` DESC LIMIT '.$perpage;
            }else{
                $sql = 'SELECT * FROM `cmspublicationsandviews` WHERE `approved` = 1 '.$ins_sql.' ORDER BY `position` ASC, `date` DESC LIMIT '.$page.','.$perpage;                
            }
            
           
            $query = $this->db->query($sql);
            $htm = '<ul class="publications clear">';

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
                    $date = $row->date;
                    $image = $row->image;
                    
                    $htm .= '<li>';
                    $htm .= '<div>';
                    $htm .= '<header>';
                    $htm .= '<h2>';
                    $htm .= '<a href="'.base_url().'publications_and_views/details/'.$id.'/">';
                    $htm .= $title_en;
                    $htm .= '</a>';
                    $htm .= '</h2>';
                    $htm .= '</header>';
                    $htm .= '<p>';
                    $htm .= $tagline_en;
                    $htm .= '</p>';
                    $htm .= '<p>';
                    $htm .= $this->time_elapsed_string(strtotime($date));
                    $htm .= '</p>';
                    $htm .= '</div>';
                    $htm .= '<img width="152" height="105" src="'.base_url().'uploads/'.$image.'">';

                    $htm .= '<div class="social-links" style="display: none; ">
                             <iframe allowtransparency="true" frameborder="0" scrolling="no" src="http://platform.twitter.com/widgets/tweet_button.1363148939.html#_=1363672811316&amp;count=none&amp;id=twitter-widget-3&amp;lang=en&amp;original_referer='.base_url().'publications_and_views%2Fdetails%2F'.$id.'%2F&amp;text='.$title_en.'&amp;url='.base_url().'publications_and_views%2Fdetails%2F'.$id.'%2F" class="twitter-share-button twitter-count-none" style="width: 59px; height: 20px; " title="Twitter Tweet Button" data-twttr-rendered="true"></iframe>';

                    //$htm .= '<br><span style="line-height: 1; vertical-align: baseline; display: inline-block; text-align: center; " class="IN-widget"><span style="padding: 0px !important; margin: 0px !important; text-indent: 0px !important; display: inline-block !important; vertical-align: baseline !important; font-size: 1px !important; "><span id="li_ui_li_gen_1363672811717_3"><a id="li_ui_li_gen_1363672811717_3-link" href="javascript:void(0);"><span id="li_ui_li_gen_1363672811717_3-logo">in</span><span id="li_ui_li_gen_1363672811717_3-title"><span id="li_ui_li_gen_1363672811717_3-mark"></span><span id="li_ui_li_gen_1363672811717_3-title-text">Share</span></span></a></span></span></span><script type="IN/Share+init" data-url="{base_url}publications_and_views/details/'.$id.'/"></script>';
                    $htm .= '</div>';
                    
		    $htm .= '</li>';
                }
            }else{
            	$htm .= '<li style="background:none;">Sorry, your search returned no results.</li>';
            }

            $htm .= '</ul>';
            return $htm;
        }*/
        
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
            
                $sql = 'SELECT * FROM `cmspublicationsandviews` WHERE `approved` = 1 '.$ins_sql.' ORDER BY `position` ASC, `date` DESC LIMIT 8';  //echo $sql;             
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
                 
                $sql = 'SELECT * FROM `cmspublicationsandviews` WHERE `approved` = 1 '.$ins_sql.' ORDER BY `position` ASC, `date` DESC LIMIT '.$page.', 8';               
            
            }

            $query = $this->db->query($sql);
            $htm = '<div class="grid">';

            if($query->num_rows > 0){
                $i=1;
				foreach($query->result() as $row){
                    $id = $row->ID;
                    $image = $row->image;
                    if($lang == 'en'){
						$title_en = $row->title_en;
						$tagline_en = $row->tagline_en;
					}else{
						$title_en = $row->title_az;
						$tagline_en = $row->tagline_az;
					}
                    $date = date("m/d/y", strtotime($row->date));

					$href = 'href="'.base_url().'publications_and_views/details/'.$id.'/"';
					if($i%4==0){
                        $htm .= '<a '.$href.' class="last">';
					}else{
					    $htm .= '<a '.$href.'>';
					}
					$htm .= '<img src="'.base_url().'uploads/'.$image.'" width="160" height="110" alt="news">';
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
        
        function get_count($checked){
            $found_section = false;
            $found_sector = false;
            $ins_sql = 'AND (';
            foreach($checked as $key=>$value){
                if($value == 'on'){
                    $section = filter_var($key, FILTER_SANITIZE_NUMBER_INT);
                    if($this->section_parent($section) == 3){
                        if(!$found_section){                        
                    	    $ins_sql .= '`section` = '.$section;
                    	}else{
                    	    $ins_sql .= ' OR `section` = '.$section;
                    	}
                    	$found_section = true;
                    }elseif($this->section_parent($section) == 4){
                        if(!$found_sector && !$found_section){                        
                    	    $ins_sql .= '`sector` = '.$section;
                    	}else{
                    	    $ins_sql .= ' OR `sector` = '.$section;
                    	}
                    	$found_sector = true;
                    }
                }
            }
            
            if(!$found_section && !$found_sector){
                $ins_sql = '';
            }else{
                $ins_sql .= ')';
            }
            
            $sql = 'SELECT COUNT(`ID`) AS `cnt` FROM `cmspublicationsandviews` WHERE `approved` = 1 '.$ins_sql.' ORDER BY `position` ASC, `date` DESC';
                        
            $query = $this->db->query($sql);
            
            if($query->num_rows > 0){
		foreach($query->result() as $row){
		     return $row->cnt;
		}
	    }
	    
	    return 0;
        }

        function get_featured_list(){
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
			
            $sql = 'SELECT * FROM `cmspublicationsandviews` WHERE `approved` = 1 AND `featured` = 1 ORDER BY `position` ASC, `date` DESC LIMIT 3';

            $query = $this->db->query($sql);
           
            $html = '<div class="resultsContainer">';
            $i = 1;
            
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
                $date = $row->date;
                $image = $row->image;
                $tagline_en = word_limiter(strip_tags($tagline_en), 20);
                $date = date("m/d/y", strtotime($row->date));
               
                $href = 'href="'.base_url().'publications_and_views/details/'.$id.'/"';
    		    $html .= '<a class="item" '.$href.'>';
    		    $html .= '<div class="thumb"><img src="'.base_url().'uploads/'.$image.'" width="220" height="150" alt="item"></div>';
    		    $html .= '<div class="itemDetail">';
    		    $html .= '<h2>'.$title_en.'</h2>';
    		    $html .= '<p class="date">'.$date.'</p>';
    		    $html .= '<p>'.$tagline_en.'</p>';
    		    $html .= '</div>';
    		    $html .= '</a>';
                
                $i++;
               }
            }else{
               $html .= '<div>No featured publications.</div>';
            }

            $html .= '</div>';

            return $html;
        }
		
		function get_default_page_list(){
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
			
            $sql = 'SELECT * FROM `cmspublicationsandviews` WHERE `approved` = 1 AND `featured` = 1 ORDER BY `position` ASC, `date` DESC LIMIT 3';

            $query = $this->db->query($sql);
           
            $html = '<ul style="position: relative; width: 448px; height: 278px; overflow: hidden; ">';
           
            
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
					$date = $row->date;
					$image = $row->image;		  
					  
					$html .= '<li class="story_black" style="background-image: url('.base_url().'uploads/'.$image.'); background-attachment: scroll; background-color: transparent; position: absolute; top: 0px; left: 0px; display: block; z-index: 4; opacity: 1; width: 408px; height: 258px; background-position: 50% 0%; background-repeat: no-repeat no-repeat; ">';  
					$html .= '<h3>'.$title_en.'</h3>';
					$html .= '<div class="ExternalClass4003CE7ECEE2416283013ECE5948D105">'.word_limiter($tagline_en, 15).'</div>';
					$html .= '<br>';
					$html .= '<p class="story-link"><a href="'.base_url().'publications_and_views/details/'.$id.'/">Read more</a></p>';
					$html .= '</li>';                            
               	}
            }else{
            	$html .= '<li>No featured publications.</li>';
            }

            $html .= '</ul>';

            return $html;
        }
		
		function get_default_page_list_thumbs(){
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
            $sql = 'SELECT * FROM `cmspublicationsandviews` WHERE `approved` = 1 AND `featured` = 1 ORDER BY `position` ASC, `date` DESC LIMIT 3';

            $query = $this->db->query($sql);
           
            $html = '<ul class="jcarousel-list jcarousel-list-horizontal" style="overflow: hidden; position: relative; top: 0px; left: 0px; margin: 0px; padding: 0px; width: 660px; ">';
           
            
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
					$date = $row->date;
					$image = $row->image;		  
					  
					$html .= '<li class="jcarousel-item jcarousel-item-horizontal jcarousel-item-1 jcarousel-item-1-horizontal" style="float: left; list-style: none; " jcarouselindex="1">';  
					$html .= '<img style="padding-right:10px;" height="68" width="90" src="'.base_url().'uploads/'.$image.'" alt="'.$title_en.'">';
					$html .= '<p><a href="'.base_url().'publications_and_views/details/'.$id.'/">'.word_limiter($title_en, 3).'</a></p>';					
					$html .= '</li>';                            
               	}
            }else{
            	$html .= '<li>No featured publications.</li>';
            }

            $html .= '</ul>';

            return $html;
        }

        function get_research_list($lang='en'){
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
            $sql = 'SELECT * FROM `cmspublicationsandviews` WHERE `approved` = 1 AND `research` = 1 ORDER BY `position` ASC, `date` DESC LIMIT 7';

            $query = $this->db->query($sql);

            $html = '';

            if($query->num_rows > 0){
                foreach($query->result() as $row){
                   $id = $row->ID;
                   $title = ($lang == 'en')? $row->title_en : $row->title_az;
                   
 
                   $html .= '<li>';
                   $html .= '<a title="" href="'.base_url().'publications_and_views/details/'.$id.'/">';
                   $html .= $title;
                   $html .= '</a>';
                   $html .= '</li>';
                }
            }else{
                $html .= '<li>No research publications.</li>';
            }

            return $html;
        }

        function get_ss_list($ss, $page){
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
			
            (integer) $page;
            if($page == 0){
                $sql = 'SELECT * FROM `cmspublicationsandviews` WHERE `approved` = 1 AND (`title_en` LIKE "%'.$ss.'%" OR `title_az` LIKE "%'.$ss.'%" OR `tagline_en` LIKE "%'.$ss.'%" OR `tagline_az` LIKE "%'.$ss.'%" OR `text_en` LIKE "%'.$ss.'%" OR `text_az` LIKE "%'.$ss.'%") ORDER BY `position` ASC, `date` DESC LIMIT 10';
            }else{
                $sql = 'SELECT * FROM `cmspublicationsandviews` WHERE `approved` = 1 AND (`title_en` LIKE "%'.$ss.'%" OR `title_az` LIKE "%'.$ss.'%" OR `tagline_en` LIKE "%'.$ss.'%" OR `tagline_az` LIKE "%'.$ss.'%" OR `text_en` LIKE "%'.$ss.'%" OR `text_az` LIKE "%'.$ss.'%") ORDER BY `position` ASC, `date` DESC LIMIT '.$page.', 10'; 
            }

            $query = $this->db->query($sql);

            $htm = '<ul class="publications clear">';
           
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
			
                    $title_en = str_replace($ss, '<strong><em>'.$ss.'</em></strong>', $title_en);
                    $tagline_en = str_replace($ss, '<strong><em>'.$ss.'</em></strong>', $tagline_en);
                    $date = $row->date;
                    $image = $row->image;
                    
                    $htm .= '<li style="background: none;">';
                    $htm .= '<div>';
                    $htm .= '<header>';
                    $htm .= '<h2>';
                    $htm .= '<a href="'.base_url().'publications_and_views/details/'.$id.'/">';
                    $htm .= $title_en;
                    $htm .= '</a>';
                    $htm .= '</h2>';
                    $htm .= '</header>';
                    $htm .= '<p style="width:320px;">';
                    $htm .= $tagline_en;
                    $htm .= '</p>';
                    $htm .= '<p>';
                    $htm .= $this->time_elapsed_string(strtotime($date));
                    $htm .= '</p>';
                    $htm .= '</div>';
                    $htm .= '<img width="152" height="105" src="'.base_url().'uploads/'.$image.'">';

                    $htm .= '<div class="social-links" style="display: none; ">
                             <iframe allowtransparency="true" frameborder="0" scrolling="no" src="http://platform.twitter.com/widgets/tweet_button.1363148939.html#_=1363672811316&amp;count=none&amp;id=twitter-widget-3&amp;lang=en&amp;original_referer='.base_url().'publications_and_views%2Fdetails%2F'.$id.'%2F&amp;text='.$title_en.'&amp;url='.base_url().'publications_and_views%2Fdetails%2F'.$id.'%2F" class="twitter-share-button twitter-count-none" style="width: 59px; height: 20px; " title="Twitter Tweet Button" data-twttr-rendered="true"></iframe>';

                    //$htm .= '<br><span style="line-height: 1; vertical-align: baseline; display: inline-block; text-align: center; " class="IN-widget"><span style="padding: 0px !important; margin: 0px !important; text-indent: 0px !important; display: inline-block !important; vertical-align: baseline !important; font-size: 1px !important; "><span id="li_ui_li_gen_1363672811717_3"><a id="li_ui_li_gen_1363672811717_3-link" href="javascript:void(0);"><span id="li_ui_li_gen_1363672811717_3-logo">in</span><span id="li_ui_li_gen_1363672811717_3-title"><span id="li_ui_li_gen_1363672811717_3-mark"></span><span id="li_ui_li_gen_1363672811717_3-title-text">Share</span></span></a></span></span></span><script type="IN/Share+init" data-url="{base_url}publications_and_views/details/'.$id.'/"></script>';
                    $htm .= '</div>';
                    
		    $htm .= '</li>';
                }
            }else{
            	$htm .= '<li style="background:none;">Sorry, your search returned no results.</li>';
            }

            $htm .= '</ul>';
            return $htm; 
        }

        function get_ss_count($ss){
            $sql = 'SELECT COUNT(`ID`) AS `cnt` FROM `cmspublicationsandviews` WHERE `approved` = 1 AND (`title_en` LIKE "%'.$ss.'%" OR `title_az` LIKE "%'.$ss.'%" OR `tagline_en` LIKE "%'.$ss.'%" OR `tagline_az` LIKE "%'.$ss.'%" OR `text_en` LIKE "%'.$ss.'%" OR `text_az` LIKE "%'.$ss.'%") ORDER BY `position` ASC, `date` DESC LIMIT 10';

            $query = $this->db->query($sql);

            if($query->num_rows > 0){
		foreach($query->result() as $row){
		     return $row->cnt;
		}
	    }
	    
	    return 0;
        }

        function increase_times_viewed($id){
            $sql = 'SELECT `times_viewed` FROM `cmspublicationsandviews` WHERE `ID` = '.$id.' LIMIT 1';
            $query = $this->db->query($sql);

            $times_viewed = 0;

            if($this->db->affected_rows() > 0){
                foreach($query->result() as $row){
                    $times_viewed = $row->times_viewed;
                }
            }

            $times_viewed++;

            $sql_upd = 'UPDATE `cmspublicationsandviews` SET `times_viewed` = '.$times_viewed.' WHERE `ID` = "'.$id.'" LIMIT 1';
            $query_upd = $this->db->query($sql_upd);

            if($this->db->affected_rows() > 0){
                return true;
            }else{
                return false;
            }
        }
        
        function get_default_page_carousel(){
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
            $sql = 'SELECT * FROM `cmspublicationsandviews` WHERE `approved` = 1 ORDER BY `position` ASC, `date` DESC LIMIT 3';

            $query = $this->db->query($sql);
           
            $html = '<ul class="unstyled image-li slides"><li>';
            $i = 0;
            
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
					$date = $row->date;
					
					$phpdate = strtotime($date);
                    $date = date('d.m.Y', $phpdate);

					$image = $row->image;		  
					  
					
					
					if($i > 0 && $i%3 == 0){
                        $html .= '</li><li>';
                    }
                    $i++;
					
					$html .= '<a href="'.base_url().'publications_and_views/details/'.$id.'/">';
					$html .= '<img style="padding-right:10px;" height="68" width="90" src="'.base_url().'uploads/'.$image.'" alt="'.$title_en.'">';
                    $html .= '<div class="detail">';
                    $html .= '<h3>'.word_limiter(strip_tags($title_en), 7).'</h3>';
                    $html .= '<div class="date">'.$date.'</div>';
                    $html .= '</div>';
                    $html .= '</a>';
                }
            }else{
            	$html .= '<li>No publications.</li>';
            }

            $html .= '</li></ul>';

            return $html;
        }
        
    }