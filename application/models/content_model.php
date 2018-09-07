<?php
    /**************************************
    *
    * Author   : Orkhan Huseynov
    * Contacts : orkhan.huseynov@live.com
    *
    **************************************/
    class Content_model extends CI_Model {
        var $ID;
        var $userID;
        var $title_en;
        var $title_ru;
        var $title_az;
        var $tagline_en;
        var $tagline_ru;
        var $tagline_az;
        var $text_en;
        var $text_ru;
        var $text_az;
        var $approved;
        var $tags;
        var $position;
        var $times_viewed;
        var $image_1;
        var $image_2;
        var $image_3;
        var $image_4;
        var $image_5;
        var $image_6;
        var $image_7;
        var $image_8;
        var $image_9;
        var $image_10;
        
        function __construct(){
            parent::__construct();
            $this->load->database();
            $this->load->library('session');
            $this->load->helper('url');
            $this->load->helper('text');
            $this->load->model('JSON_model');
            $this->load->model('section_model');
        }

        function getJSONList(){
            $res = array();
            $res['requestFirstIndex'] = 0;
            $res['firstIndex'] = 0;

            $sql = 'SELECT * FROM cmsarticles ORDER BY position';
            $query = $this->db->query($sql);
            $res['count'] = $query->num_rows();
            $res['totalCount'] = $query->num_rows();
            $res['columns'] = array('Title', '<div style="text-align:center;">Section</div>', '<div style="text-align:center;">Published</div>', '<div style="text-align:center;">Last modified</div>', '<div style="text-align:center;">Actions</div>');

            $i = 0;
            if($query->num_rows() > 0){
                foreach($query->result() as $row){
                    $res['items'][$i]['id'] = $row->ID;

                    $edit_url = site_url('ControlPanel/content/details/'.$row->ID);
                    $delete_url = site_url('ControlPanel/content/delete/'.$row->ID);

                    $parent_section = $this->section_model->parent($row->section);
                    $section_name = $this->section_model->getSectionName($row->section);
                    if($parent_section != 0){
                        $parent_section_name = $this->section_model->getSectionName($parent_section);
                        $section_name = '<div style="text-align:center;"><a href="'.site_url('ControlPanel/section/details/'.$row->section).'">'.$parent_section_name.'&nbsp;->&nbsp;'.$section_name.'</a></div>';
                    }else{
                        $section_name = '<div style="text-align:center;"><a href="'.site_url('ControlPanel/section/details/'.$row->section).'">'.$section_name.'</a></div>';
                    }

                    ($row->approved == 1)? $published = '<span style="color: rgb(51, 153, 0);">Yes</span>' : $published = '<span style="color: rgb(204, 0, 0);">No</span>';
                    $published = '<div style="text-align:center;">'.$published.'</div>';

                    $date = '<div style="text-align:center;">'.$row->date.'</div>';

                    $res['items'][$i]['info'] = array($row->title_ru, $section_name, $published, $date, '<div style="text-align:center;"><a href="'.$edit_url.'">Edit</a> | <a href="'.$delete_url.'">Delete</a></div>');
                    $i++;
                }
            }
            $res = $this->JSON_model->encode($res);
            return $res;
        }

        function getTotalRows($sectionid=0, $userid=0){
            (integer) $sectionid;
            (integer) $userid;
            $sql_get_children = 'SELECT ID FROM cmssections WHERE parentid = '.$sectionid;
            $query = $this->db->query($sql_get_children);
            $ins_sql = '';
            if($query->num_rows() > 0){
                foreach($query->result() as $row){
                    $id = $row->ID;
                    $ins_sql .= 'OR (section = '.$id.') ';
                }
            }
            if($sectionid > 0){
                $sql = 'SELECT * FROM cmsarticles WHERE ((section = '.$sectionid.') '.$ins_sql.') ORDER BY position';
            }elseif($userid > 0){
                $sql = 'SELECT * FROM cmsarticles WHERE `userid` = '.$userid;
            }else{
                $sql = 'SELECT * FROM cmsarticles';
            }
            $query = $this->db->query($sql);
            return $query->num_rows();
        }

        function getArticleTitle($id){
            (integer) $id;
            $sql = 'SELECT `title_ru` FROM cmsarticles WHERE ID='.$id.' LIMIT 1';
            $query = $this->db->query($sql);
            if($query->num_rows() > 0){
                foreach($query->result() as $row){
                    return $row->title_ru;
                }
            }
        }

        function getList($sectionid=0, $userid=0, $page=0, $start=0, $quantity=1000000000000000){
            (integer) $sectionid;
            
            if($userid == 0){
                $user_sql = '';
            }else{
                $user_sql = 'AND userID = '.$userid;
            }

            if($page != 0){
                $ins_sql = $this->findDependencies($sectionid);
                $sql = 'SELECT * FROM cmsarticles WHERE ('.$ins_sql.') '.$user_sql.' ORDER BY date DESC LIMIT '.$page.',12';
            }else{
                $ins_sql = $this->findDependencies($sectionid);
                $sql = 'SELECT * FROM cmsarticles WHERE ('.$ins_sql.') '.$user_sql.' ORDER BY date DESC LIMIT 12';
            }

            $query = $this->db->query($sql);
            $htm = '<div class="projects_container">';
            $i = 0;
                        
            if($query->num_rows() > 0){
                foreach($query->result() as $row){
                    $section_check = $row->section;
                    $id = $row->ID;
                    $title = word_limiter($row->title_ru, 4);
                    $tagline = $row->tagline_ru;
                    /*if(strlen($tagline) > 310){
                        $tagline = substr($row->tagline_ru, 0, 310) . '...';
                    }*/
                    $text = $row->text_ru;
                    $date = $row->date;
                    $image_1 = $row->image_1;
                    $image_2 = $row->image_2;
                    $image_3 = $row->image_3;
                    $image_4 = $row->image_4;
                    $image_5 = $row->image_5;
                    $image_6 = $row->image_6;
                    $image_7 = $row->image_7;
                    $image_8 = $row->image_8;
                    $image_9 = $row->image_9;
                    $image_10 = $row->image_10;
                    $userid = $row->userID;
                    $approved = $row->approved;

                    $times_viewed = $row->times_viewed;
                    $comments = $this->comment_model->get_count($row->ID);

                    $username = $this->user_model->getName($userid);
                    $nameSurname = $this->user_model->getNameSurname($userid);

                    if($sectionid != 0){
                        $section_type = $this->section_model->getSectionType($sectionid);
                    }else{
                        $section_type = '';
                    }

                    $href = 'href="'.base_url().'index/more/'.$section_check.'/'.$id.'/"';
                    
                    
                    if(($section_check == $sectionid) || ($sectionid == $this->section_model->parent($section_check) || $sectionid == 0)){
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
            }
            if($i == 0){
                $htm .= '<div style="width:100%;" height:400px; class="section_empty_message">Проектов пока нет.</div>';
            }
            $htm .= '</div><div style="width:100%;clear:both;height:100%;"></div>';
            return $htm;
        }

        function getImagesList($userid=0){
            if($userid == 0){
                $user_sql = '';
            }else{
                $user_sql = 'AND userID = '.$userid;
            }
            
            $sql = 'SELECT * FROM cmsarticles WHERE (approved = 1) '.$user_sql.' ORDER BY position, times_viewed DESC LIMIT 100';

            $query = $this->db->query($sql);
            $htm = '<ul id="mycarousel" class="jcarousel-skin-tango">';
            
            $i = 0;
            if($query->num_rows() > 0){
                foreach($query->result() as $row){                    
                    $id = $row->ID;
                    $image_1 = $row->image_1;
                    $section = $row->section;

                    $href = 'href="'.base_url().'index/more/'.$section.'/'.$id.'/"';

                    $htm .= '<li>';
                    $htm .= '<a '.$href.'>';
                    $htm .= '<img src="'.base_url().'userfiles/Pictures/'.$image_1.'" width="160" height="122" alt="" />';
                    $htm .= '</a>';
                    $htm .= '</li>';

                    $i++;
                }               
            }
            if($i == 0){
                $htm .= '<li>Творений пока нет.</li>';
            }
            $htm .= '</ul>';
            return $htm;
        }

        function findDependencies($sectionid){
            if($sectionid == 0){
                return '1 = 1';
            }

            $sql_get_children = 'SELECT ID FROM cmssections WHERE parentid = '.$sectionid;
            $query = $this->db->query($sql_get_children);
            $ins_sql = '(section = '.$sectionid.') ';
            if($query->num_rows() > 0){
                foreach($query->result() as $row){
                    $id = $row->ID;
                    $ins_sql .= 'OR (section = '.$id.') ';
                }
                if($this->section_model->hasChildren($sectionid) == 1){
                    //$ins_sql .= $this->findDependencies($sectionid);
                    return $ins_sql;
                }else{
                    return $ins_sql;
                }
            }else{
                return $ins_sql;
            }
        }

        function getDefaultPageList($page, $type='popular'){
            if($type == 'popular'){
                $sort = 'rating';
            }elseif($type == 'recent'){
                $sort = 'date';
            }
            if($page != 0){
                $sql = 'SELECT * FROM cmsarticles WHERE (approved = 1) ORDER BY position, '.$sort.' LIMIT '.$page.',15';
            }else{
                $sql = 'SELECT * FROM cmsarticles WHERE (approved = 1) ORDER BY position, '.$sort.' LIMIT 15';
            }
            $query = $this->db->query($sql);
            $htm = '<div class="default_page_container">';
            $i = 0;
            if($query->num_rows() > 0){
                foreach($query->result() as $row){
                    $htm .= '<div class="default_page_item">';
                    //$htm .= '<a href="'.base_url().'index/more/plain/'.$row->section.'/'.$row->ID.'/"><h3>'.$row->title_ru.'</h3></a>';
                    $htm .= '<a href="'.base_url().'index/more/plain/'.$row->section.'/'.$row->ID.'/">'.$row->tagline_ru.'</a>';
                    $htm .= '</div>';
                    $i++;
                }
            }
            if($i==0){
                $htm .= '<div style="width:100%;" height:400px; class="section_empty_message">The section you\'ve chosen is empty.</div>';
            }
            $htm .= '</div>';
            return $htm;
        }

        function save_list_order($items_array){
            $i = 1;
            foreach($items_array as $key => $value){
                    $item_id = $value['id'];
                    $sql = 'UPDATE cmsarticles SET position = '.$i.' WHERE ID = '.$item_id.' LIMIT 1';
                    $query = $this->db->query($sql);
                    $i++;
            }
        }

        function delete($id){
            (integer) $id;
            $sql = 'DELETE FROM cmsarticles WHERE ID = '.$id.' LIMIT 1';
            $query = $this->db->query($sql);
            return true;
        }

        function show($id){
            (integer) $id;
            $sql = 'UPDATE `cmsarticles` SET `approved` = 1 WHERE ID = '.$id.' LIMIT 1';
            $query = $this->db->query($sql);
            return true;
        }

        function hide($id){
            (integer) $id;
            $sql = 'UPDATE `cmsarticles` SET `approved` = 0 WHERE ID = '.$id.' LIMIT 1';
            $query = $this->db->query($sql);
            return true;
        }

        function update($id, $approved, $title_en, $title_ru, $title_az, $tagline_en, $tagline_ru, $tagline_az, $text_en, $text_ru, $text_az, $tags){
            (integer) $id;
            (integer) $approved;

            $title_en = addslashes($title_en);
            $title_ru = addslashes($title_ru);
            $title_az = addslashes($title_az);
            $tagline_en = addslashes($tagline_en);
            $tagline_ru = addslashes($tagline_ru);
            $tagline_az = addslashes($tagline_az);
            $text_en = addslashes($text_en);
            $text_ru = addslashes($text_ru);
            $text_az = addslashes($text_az);
            $tags = addslashes($tags);

            $sql = 'UPDATE cmsarticles SET `approved` = "'.$approved.'", `date` = NOW(), `title_en` = "'.$title_en.'", `title_ru` = "'.$title_ru.'", `title_az` = "'.$title_az.'", `tagline_en` = "'.$tagline_en.'", `tagline_ru` = "'.$tagline_ru.'", `tagline_az` = "'.$tagline_az.'", `text_en` = "'.$text_en.'", `text_ru` = "'.$text_ru.'", `text_az` = "'.$text_az.'", `tags` = "'.$tags.'" WHERE ID = '.$id.' LIMIT 1';
            $query = $this->db->query($sql);
            return true;
        }

        /*function update_area($sectionid, $content_1, $content_2, $content_3, $content_4, $content_5, $content_6, $content_7, $content_8, $content_9, $content_10, $content_11, $content_12, $content_13, $content_14, $content_15, $content_16, $content_17, $content_18, $content_19, $content_20, $content_21, $content_22, $content_23, $content_24, $content_25, $content_26, $content_27, $content_28, $content_29, $content_30, $content_31, $content_32, $content_33, $content_34, $content_35, $content_36, $content_37, $content_38, $content_39, $content_40, $lang='en'){
			$sql_get = 'SELECT ID FROM `cmsarticles` WHERE `section` = '.$sectionid.' AND `lang` = "'.$lang.'" LIMIT 1';
			$query_get = $this->db->query($sql_get);
			if($query_get->num_rows == 0){
				$sql_set = 'INSERT INTO cmsarticles(`section`, `userID`, `approved`, `date`, `lang`) VALUES
                                           ("'.$sectionid.'", 1, 1, NOW(), "'.$lang.'")';
				$query_set = $this->db->query($sql_set);
				}
			
			
			
			$content_1 = addslashes($content_1);
            $content_2 = addslashes($content_2);
            $content_3 = addslashes($content_3);
            $content_4 = addslashes($content_4);
            $content_5 = addslashes($content_5);
            $content_6 = addslashes($content_6);
            $content_7 = addslashes($content_7);
            $content_8 = addslashes($content_8);
            $content_9 = addslashes($content_9);
            $content_10 = addslashes($content_10);
            $content_11 = addslashes($content_11);
            $content_12 = addslashes($content_12);
            $content_13 = addslashes($content_13);
            $content_14 = addslashes($content_14);
            $content_15 = addslashes($content_15);
            $content_16 = addslashes($content_16);
            $content_17 = addslashes($content_17);
            $content_18 = addslashes($content_18);
            $content_19 = addslashes($content_19);
            $content_20 = addslashes($content_20);
            $content_21 = addslashes($content_21);
            $content_22 = addslashes($content_22);
            $content_23 = addslashes($content_23);
            $content_24 = addslashes($content_24);
            $content_25 = addslashes($content_25);
            $content_26 = addslashes($content_26);
            $content_27 = addslashes($content_27);
            $content_28 = addslashes($content_28);
            $content_29 = addslashes($content_29);
            $content_30 = addslashes($content_30);
            $content_31 = addslashes($content_31);
            $content_32 = addslashes($content_32);
            $content_33 = addslashes($content_33);
            $content_34 = addslashes($content_34);
            $content_35 = addslashes($content_35);
            $content_36 = addslashes($content_36);
            $content_37 = addslashes($content_37);
            $content_38 = addslashes($content_38);
            $content_39 = addslashes($content_39);
            $content_40 = addslashes($content_40); 
			
			$lang = addslashes($lang);
				
            $sql = 'UPDATE cmsarticles SET
                           `area_1` = "'.$content_1.'",
                           `area_2` = "'.$content_2.'",
                           `area_3` = "'.$content_3.'",
                           `area_4` = "'.$content_4.'",
                           `area_5` = "'.$content_5.'",
                           `area_6` = "'.$content_6.'",
                           `area_7` = "'.$content_7.'",
                           `area_8` = "'.$content_8.'",
                           `area_9` = "'.$content_9.'",
                           `area_10` = "'.$content_10.'",
                           `area_11` = "'.$content_11.'",
                           `area_12` = "'.$content_12.'",
                           `area_13` = "'.$content_13.'",
                           `area_14` = "'.$content_14.'",
                           `area_15` = "'.$content_15.'",
                           `area_16` = "'.$content_16.'",
                           `area_17` = "'.$content_17.'",
                           `area_18` = "'.$content_18.'",
                           `area_19` = "'.$content_19.'",
                           `area_20` = "'.$content_20.'",
                           `area_21` = "'.$content_21.'",
                           `area_22` = "'.$content_22.'",
                           `area_23` = "'.$content_23.'",
                           `area_24` = "'.$content_24.'",
                           `area_25` = "'.$content_25.'",
                           `area_26` = "'.$content_26.'",
                           `area_27` = "'.$content_27.'",
                           `area_28` = "'.$content_28.'",
                           `area_29` = "'.$content_29.'",
                           `area_30` = "'.$content_30.'",
                           `area_31` = "'.$content_31.'",
                           `area_32` = "'.$content_32.'",
                           `area_33` = "'.$content_33.'",
                           `area_34` = "'.$content_34.'",
                           `area_35` = "'.$content_35.'",
                           `area_36` = "'.$content_36.'",
                           `area_37` = "'.$content_37.'",
                           `area_38` = "'.$content_38.'",
                           `area_39` = "'.$content_39.'",
                           `area_40` = "'.$content_40.'"						   	
                    WHERE `section` = '.$sectionid.' AND `lang` = "'.$lang.'" LIMIT 1'; 
            $query = $this->db->query($sql); 
            return true;
        }*/

        function update_area($sectionid, $data_array, $lang='en'){
			$sql_get = 'SELECT ID FROM `cmsarticles` WHERE `section` = '.$sectionid.' AND `lang` = "'.$lang.'" LIMIT 1';
			$query_get = $this->db->query($sql_get);
			if($query_get->num_rows == 0){
				$sql_set = 'INSERT INTO cmsarticles(`section`, `userID`, `approved`, `date`, `lang`) VALUES
                                           ("'.$sectionid.'", 1, 1, NOW(), "'.$lang.'")';
				$query_set = $this->db->query($sql_set);
				}
			
			$lang = addslashes($lang);
			
			for($i=1;$i<=40;$i++){
				$sql_inner_get = 'SELECT `area_'.$i.'` FROM `cmsarticles` WHERE `section` = '.$sectionid.' AND `lang` = "'.$lang.'" LIMIT 1';
				$query_inner_get = $this->db->query($sql_inner_get);
				
				if($query_inner_get->num_rows() > 0){
					foreach($query_inner_get->result_array() as $row){
						if((trim(strip_tags($row['area_'.$i]))) != '' && (trim(strip_tags($data_array[$i])) == '')){
							continue;
						}else{
							$sql = 'UPDATE `cmsarticles` SET `area_'.$i.'` = "'.addslashes($data_array[$i]).'" WHERE `section` = '.$sectionid.' AND `lang` = "'.$lang.'" LIMIT 1';
							$query = $this->db->query($sql);
						}
					}	
				}
			}
			 
            return true;
        }

        function getArticleDetails($id, $lang='en'){
            (integer) $id; 
			
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
			
            $sql = 'SELECT * FROM cmsarticles WHERE section='.$id.' AND lang="'.$lang.'" LIMIT 1';
            $query = $this->db->query($sql);
            return $query->result_array();
        }
        
        function getSection($id){
            (integer) $id;
            $details = $this->getArticleDetails($id);
            return $details[0]['section'];
        }
                
        function add($section, $approved, $title, $text, $image_1, $image_2, $image_3, $image_4, $image_5, $image_6, $image_7, $image_8, $image_9, $image_10){
            (integer) $section;
            (integer) $approved;

            $userID = $this->user_model->ID;

            $title = addslashes($title);
            $text = addslashes($text);
            $image_1 = addslashes($image_1);
            $image_2 = addslashes($image_2);
            $image_3 = addslashes($image_3);
            $image_4 = addslashes($image_4);
            $image_5 = addslashes($image_5);
            $image_6 = addslashes($image_6);
            $image_7 = addslashes($image_7);
            $image_8 = addslashes($image_8);
            $image_9 = addslashes($image_9);
            $image_10 = addslashes($image_10);

            $sql = 'INSERT INTO cmsarticles(`section`, `userID`, `approved`, `date`, `title_ru`, `text_ru`, `image_1`, `image_2`, `image_3`, `image_4`, `image_5`, `image_6`, `image_7`, `image_8`, `image_9`, `image_10`) VALUES
                                           ("'.$section.'", "'.$userID.'", "'.$approved.'", NOW(), "'.$title.'", "'.$text.'", "'.$image_1.'", "'.$image_2.'", "'.$image_3.'", "'.$image_4.'", "'.$image_5.'", "'.$image_6.'", "'.$image_7.'", "'.$image_8.'", "'.$image_9.'", "'.$image_10.'")';
            $query = $this->db->query($sql);

            if($this->db->affected_rows() > 0){
                return true;
            }else{
                return false;
            }
        }

        function increaseTimesViewed($id){
            $sql = 'SELECT `times_viewed` FROM cmsarticles WHERE `ID` = '.$id.' LIMIT 1';
            $query = $this->db->query($sql);

            $times_viewed = 0;

            if($this->db->affected_rows() > 0){
                foreach($query->result() as $row){
                    $times_viewed = $row->times_viewed;
                }
            }

            $times_viewed++;

            $sql_upd = 'UPDATE cmsarticles SET `times_viewed` = '.$times_viewed.' WHERE `ID` = "'.$id.'" LIMIT 1';
            $query_upd = $this->db->query($sql_upd);

            if($this->db->affected_rows() > 0){
                return true;
            }else{
                return false;
            }
        }
		
		function register_email_for_updates($name_lastname, $email){
			$sql = 'INSERT INTO `cmsregister_emails`(`name_lastname`, `email`) VALUES("'.$name_lastname.'", "'.$email.'")';
			
			$query = $this->db->query($sql);

            if($this->db->affected_rows() > 0){
                return true;
            }else{
                return false;
            }			
		}
    }