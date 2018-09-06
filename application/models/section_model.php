<?php
    /**************************************
    *
    * Author   : Orkhan Huseynov
    * Contacts : orkhan.huseynov@live.com
    *
    **************************************/
    class Section_model extends CI_Model {
        var $ID;
        var $name_en;
        var $name_ru;
        var $name_az;
        var $parent;
        var $position;
        var $link;
        var $type;
        var $has_icon;

        function __construct(){
            parent::__construct();
            $this->load->database();
            $this->load->library('session');
            $this->load->helper('url');
            $this->load->model('JSON_model');
        }

        function countItems($item) {
            $count = 0;
            if($item['children']) {
                foreach ($item['children'] as $i) {
                    $count++;
                    $count += countItems($i);
                }
            }
            return $count;
        }

        function getTreeViewJSONList(){
            $res = array();
            $res['text'] = 'Sample Text';
            $res['expanded'] = true;
            $res['childen'] = array('text' => 'text');

            $res = $this->JSON_model->encode($res);
            return $res;
        }

        function getJSONList(){
            $res = array();
            $res['requestFirstIndex'] = 0;
            $res['firstIndex'] = 0;

            $sql = 'SELECT * FROM cmssections WHERE parentid=0 ORDER BY position';
            $query = $this->db->query($sql);
            $res['count'] = $query->num_rows();
            $res['totalCount'] = $query->num_rows();
            $res['columns'] = array('Name', '<div style="text-align:center;">Articles</div>', '<div style="text-align:center;">Actions</div>');

            $i = 0;
            if($query->num_rows() > 0){
                foreach($query->result() as $row){
                    $res['items'][$i]['id'] = $row->ID;
                    $new_url = site_url('ControlPanel/section/add/'.$row->ID);
                    $edit_url = site_url('ControlPanel/section/details/'.$row->ID);
                    $delete_url = site_url('ControlPanel/section/delete/'.$row->ID);
                    $add_article_url = site_url('ControlPanel/content/add/'.$row->ID);
                    $res['items'][$i]['info'] = array($row->name_ru, '<div style="text-align:center;"><a href="'.$add_article_url.'">Add&nbsp;Article</a></div>', '<div style="text-align:center;"><a href="'.$new_url.'">New</a>&nbsp;|&nbsp;<a href="'.$edit_url.'">Edit</a>&nbsp;|&nbsp;<a class="confirm" href="'.$delete_url.'">Delete</a></div>');
                    $res['items'][$i]['children'] = $this->populateChildren($row->ID);
                    $i++;
                }
            }
            $res = $this->JSON_model->encode($res);
            return $res;
        }

        private function populateChildren($sectionid){
            $res = array();
            $sectionid = (integer)$sectionid;
            $sql = 'SELECT * FROM cmssections WHERE parentid = '.$sectionid.' ORDER BY position';
            $query = $this->db->query($sql);

            $i=0;
            if($query->num_rows() > 0){
            foreach($query->result() as $row){
                $res[$i]['id'] = $row->ID;
                $new_url = site_url('ControlPanel/section/add/'.$row->ID);
                $edit_url = site_url('ControlPanel/section/details/'.$row->ID);
                $delete_url = site_url('ControlPanel/section/delete/'.$row->ID);
                $add_article_url = site_url('ControlPanel/content/add/'.$row->ID);
                $res[$i]['info'] = array($row->name_ru, '<div style="text-align:center;"><a href="'.$add_article_url.'">Add&nbsp;Article</a></div>', '<div style="text-align:center;"><a href="'.$new_url.'">New</a>&nbsp;|&nbsp;<a href="'.$edit_url.'">Edit</a>&nbsp;|&nbsp;<a class="confirm" href="'.$delete_url.'">Delete</a></div>');
                if($this->hasChildren($row->ID) == 1){
                        $res[$i]['children'] = $this->populateChildren($row->ID);
                }
                $i++;
                }
            }
            return $res;
        }

        function hasChildren($sectionid){
            $sectionid = (integer)$sectionid;
            $sql = 'SELECT ID FROM cmssections WHERE parentid = '.$sectionid;
            $query = $this->db->query($sql);

            if($query->num_rows() > 0){
                return 1;
            }else{
                return 0;
            }
        }

        function save_list_order($items_array, $isChild=FALSE, $par_id=0){
            $i = 1;
            foreach($items_array as $key => $value){
                $item_id = $value['id'];
                $children = $value['children'];

                if(!$isChild){
                        $sql = 'UPDATE cmssections SET position = '.$i.', parentid = 0 WHERE ID = '.$item_id.' LIMIT 1';
                }else{
                        $sql = 'UPDATE cmssections SET position = '.$i.', parentid = '.$par_id.' WHERE ID = '.$item_id.' LIMIT 1';
                }
                $query = $this->db->query($sql);

                if(is_array($children)){
                        $this->save_list_order($children, TRUE, $item_id);
                }
                $i++;
            }
        }

        function delete($id){
            (integer) $id;
            $sql = 'DELETE FROM cmssections WHERE ID = '.$id.' LIMIT 1';
            $query = $this->db->query($sql);
            return true;
        }

        function update($id, $name_en, $name_ru, $name_az, $link, $type, $has_icon){
            (integer) $id;
            if($link == ''){
                    $link = ' ';
            }
            $sql = 'UPDATE cmssections SET name_en = "'.$name_en.'", name_ru = "'.$name_ru.'", name_az = "'.$name_az.'", link = "'.$link.'", type = "'.$type.'", has_icon = "'.$has_icon.'" WHERE ID = '.$id.' LIMIT 1';
            $query = $this->db->query($sql);
            return true;
        }

        function getSectionDetails($id){
            (integer) $id;
            $sql = 'SELECT * FROM cmssections WHERE ID='.$id.' LIMIT 1';
            $query = $this->db->query($sql);
            return $query->result_array();
        }

        function add($parentid, $name_en, $name_ru, $name_az, $link, $type, $has_icon){
            $name_en = addslashes($name_en);
            $name_ru = addslashes($name_ru);
            $name_az = addslashes($name_az);
            $link = addslashes($link);
            $type = addslashes($type);
            $has_icon = addslashes($has_icon);

            $sql = 'INSERT INTO cmssections(name_en, name_ru, name_az, parentid, link, type, has_icon) VALUES("'.$name_en.'", "'.$name_ru.'", "'.$name_az.'", "'.$parentid.'", "'.$link.'", "'.$type.'", "'.$has_icon.'")';
            $query = $this->db->query($sql);

            if($this->db->affected_rows() > 0){
                    return true;
            }else{
                    return false;
            }
        }

        function getSectionName($section_id, $lang=''){
            (integer) $section_id;
			
			if($lang == ''){
				$lang = get_cookie('lang', TRUE);
				if(!$lang){
					$lang = 'en';
				}
			}
			
            $sql = 'SELECT name_en, name_ru, name_az FROM cmssections WHERE ID='.$section_id.' LIMIT 1';
            $query = $this->db->query($sql);

            foreach($query->result() as $row){
                switch($lang){
                    case 'en' : return $row->name_ru;
                    case 'ru' : return $row->name_ru;
                    case 'az' : return $row->name_az;
                }
            }
            return false;
        }

        function getSectionID($section_name){
            $sql = 'SELECT ID from cmssections WHERE link LIKE "%'.$section_name.'%" LIMIT 1';
            $query = $this->db->query($sql);
            
            foreach($query->result() as $row){
                return $row->ID;
            }
            
            return 1;
        }
        
        function getSectionType($section_id){
            (integer) $section_id;
            $sql = 'SELECT type FROM cmssections WHERE ID='.$section_id.' LIMIT 1';
            $query = $this->db->query($sql);

            foreach($query->result() as $row){
                return $row->type;
            }
            return false;
        }

        function getSectionHasIcon($section_id){
            (integer) $section_id;

            $sql = 'SELECT has_icon FROM cmssections WHERE ID='.$section_id.' LIMIT 1';
            $query = $this->db->query($sql);

            foreach($query->result() as $row){
                return $row->has_icon;
            }
            return false;
        }

        function CreateTree($type='projects', $parentid=0, $child=false, $sectionid=0){
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
			
            if($type == 'projects'){
                $lnk = base_url().'index/index/';
            }else{
                $lnk = base_url().'videos/index/';
            }

            $sql = 'SELECT * FROM cmssections WHERE parentid='.$parentid.' AND active=1 ORDER BY parentid, position';
            $query = $this->db->query($sql);
            $num_rows = $query->num_rows();

            $tree = '';
            
            $i = 0;

            if($num_rows > 0){/*echo $i, ' ', $num_rows;*/
                ($child)?$tree .= '<ul class="unstyled pull-left">':$tree .= '<ul class="unstyled pull-left">';
                foreach($query->result() as $row){
                    $pid = $row->parentid;
                    $id = $row->ID;
                    $link = $row->link;
					if($lang == 'en'){
                    	$name = $row->name_ru;
					}else{
						$name = $row->name_az;
					}
                                        
                    if($i == 0 && $id == $sectionid){
                        $li_class = 'first active';
                    }elseif($i == 0){
                        $li_class = 'first';
                    }elseif($id == $sectionid){
                        $li_class = 'active';
                    }elseif($i == $num_rows-1){
                        $li_class = 'last';
                    }else{
                        $li_class = '';
                    }

                    $tree .= '<li onclick="javascript:gotolink(\''.$lnk.$id.'\');" class="'.$li_class.'">';
                    if(($link == '')||($link == ' ')){
                        if($this->hasChildren($id)){
                            $tree .= '<a href="'.$lnk.$id.'/">';
                            $tree .= str_replace(' ', '&nbsp;', $name);
                            $tree .= '</a>';
                        }else{
                            $tree .= '<a href="'.$lnk.$id.'/">';
                            $tree .= str_replace(' ', '&nbsp;', $name);
                            $tree .= '</a>';
                        }                        
                    }else{
                        $tree .= '<a href="'.$link.'">';
                        $tree .= str_replace(' ', '&nbsp;', $name);
                        $tree .= '</a>';
                    }

                    //$tree .= $this->CreateTree($type, $id, true, $sectionid);
                    $tree .= '</li>';
                    
                    $i++;
                }
                $tree .= '</ul>';
            }
           
            return $tree;
        }
        
        function get_home_page_list($parentid=0, $child=false, $sectionid=0){
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
			
            $lnk = base_url().'index';
            
            $sql = 'SELECT * FROM cmssections WHERE parentid='.$parentid.' AND active=1 ORDER BY parentid, position';
            $query = $this->db->query($sql);
            $num_rows = $query->num_rows();

            $tree = '';
            
            $i = 0;

            if($num_rows > 0){
                ($child)?$tree .= '<ul class="unstyled text-only-li" style="margin:0;">':$tree .= '<ul style="margin:0;" class="unstyled text-only-li">';
                foreach($query->result() as $row){
                    $pid = $row->parentid;
                    $id = $row->ID;
                    $link = $row->link;
					if($lang == 'en'){
                    	$name = $row->name_ru;
					}else{
						$name = $row->name_az;
					}
                       
                    $tree .= '<li style="margin-top:0;margin-bottom:10px;">';
                    if(($link == '')||($link == ' ')){
                        if($this->hasChildren($id)){
                            $tree .= '<a href="'.$lnk.$id.'/">';
                            $tree .= str_replace(' ', '&nbsp;', $name);
                            $tree .= '</a>';
                        }else{
                            $tree .= '<a href="'.$lnk.$id.'/">';
                            $tree .= str_replace(' ', '&nbsp;', $name);
                            $tree .= '</a>';
                        }                        
                    }else{
                        $tree .= '<a href="'.base_url().$link.'">';
                        $tree .= str_replace(' ', '&nbsp;', $name);
                        $tree .= '</a>';
                    }
                    
                    $tree .= '</li>';
                    
                    $i++;
                }
                $tree .= '</ul>';
            }
           
            return $tree;
        }
        
        function parent($sectionid){
            $sectionid = preg_replace("/[^0-9]/", "", $sectionid);
            $sql = 'SELECT parentid FROM cmssections WHERE ID='.$sectionid.' LIMIT 1';
            $query = $this->db->query($sql);
            foreach($query->result() as $row){
                return $row->parentid;
            }
            return false;
        }

        function firstParent($sectionid){
            while($sectionid != 0){
                if($this->parent($sectionid) == 0){
                    return $sectionid;
                }
                $sectionid = $this->parent($sectionid);
            }
            return $sectionid;
        }

        function getHeadMenu(){            
            $lnk = base_url().'index/articles/popular/';
            $sql = 'SELECT * FROM cmssections WHERE parentid=0 ORDER BY parentid, position';
            $query = $this->db->query($sql);
            $headMenu = '<div id="headMenu">';            
            foreach($query->result() as $row){
                $id = $row->ID;
                $link = $row->link;
                $name = trim($row->name_ru);

                if($link == '' || $link == ' '){
                    $headMenu .= '<span><a class="link_ajax" href="'.$lnk.$id.'/">';
                    $headMenu .= str_replace(' ', '&nbsp;', $name);
                    $headMenu .= '</a></span>';
                }else{
                    $headMenu .= '<span class="span_link"><a class="link_plain" href="'.$link.'">';
                    $headMenu .= str_replace(' ', '&nbsp;', $name);
                    $headMenu .= '</a></span>';
                }
            }            
            $headMenu .= '</div>';
            return $headMenu;
        }

        function getSubMenu($parentid=1, $mode='popular'){
            (integer) $parentid;
            $parentid= preg_replace("/[^0-9]/", "", $parentid);

            if($parentid == 0){
                return false;
            }
            if($this->parent($parentid) != false){
                $parentid = $this->parent($parentid);
            }
            $lnk = base_url().'index/articles/'.$mode.'/';
            $sql = 'SELECT * FROM cmssections WHERE parentid='.$parentid.' ORDER BY parentid, position';
            $query = $this->db->query($sql);
            $submenu = '';
            foreach($query->result() as $row){
                $id = $row->ID;
                $link = $row->link;
                $name = trim($row->name_ru);
                if($link == '' || $link == ' '){
                    $submenu .= '<span><a href="'.$lnk.$id.'/">';
                    $submenu .= str_replace(' ', '&nbsp;', $name);
                    $submenu .= '</a></span>';
                }else{
                    $submenu .= '<span><a href="'.$link.'">';
                    $submenu .= str_replace(' ', '&nbsp;', $name);
                    $submenu .= '</a></span>';
                }
            }
            return $submenu;
        }

        function getParentsArray($sectionid){
            $parents = array();
            $i = 1;
            $parents[$i]['id'] = $sectionid;
            $parents[$i]['name'] = $this->getSectionName($sectionid);
            while($parent = $this->parent($sectionid)){
                $i++;
                $parents[$i]['id'] = $parent;
                $parents[$i]['name'] = $this->getSectionName($parent);
                $sectionid = $parent;
            }
            return array_reverse($parents);
        }

        function getSiteMapPath($sectionid, $articleTitle){
            (integer) $sectionid;
            $outputString = '<div class="breadCrumbHolder module">';
            $outputString .= '<div id="breadCrumb2" class="breadCrumb module">';
            $outputString .= '<ul>';
            $outputString .= '<li>';
            $outputString .= '<a href="'.base_url().'">Главная</a>';
            $outputString .= '</li>';
            $parentsArray = $this->getParentsArray($sectionid);
            foreach($parentsArray as $key => $value){
                if($value['id'] != ''){
                    $outputString .= '<li>';
                    $outputString .= '<a class="title_link" href="'.base_url().'index/articles/plain/';
                    $outputString .= $value['id'];
                    $outputString .= '/">';
                    $outputString .= $value['name'];
                    $outputString .= '</a>';
                    $outputString .= '</li>';
                }
            }
            if($articleTitle != ''){
                $outputString .= '<li>';
                $outputString .= $articleTitle;
                $outputString .= '</li>';
            }
            $outputString .= '</ul>';
            $outputString .= '</div>';
            $outputString .= '</div>';
            return $outputString;
        }

        function get_options_tree($sectionid, $parentid=0, $child=false, $display_child=false, $multiselected=array(0)){
			if(!$multiselected){
				$multiselected = array(0);
			}
            (integer) $sectionid;
            $sql = 'SELECT * FROM cmssections WHERE parentid='.$parentid.' ORDER BY parentid, position';
            $query = $this->db->query($sql);
            $num_rows = $query->num_rows();

            ($child)? $tree = '' : $tree = '<option value="0">&nbsp;</option>';

            $i = 0;

            if($num_rows > 0){
                foreach($query->result() as $row){
                    ($child)? $tree .= '<option class="child" ' : $tree .= '<option ';

                    $pid = $row->parentid;
                    $id = $row->ID;
                    $link = $row->link;
                    $name = $row->name_ru;

                    $tree .= 'value='.$id.' ';
                    if($id == $sectionid || in_array($id, $multiselected)){
                        $tree .= 'selected="selected"';
                    }
                    $tree .= '>';
                    if($child){
                        $tree.= '&nbsp;-&nbsp;';
                    }
                    $tree .= $name;
                    $tree .= '</option>';

                    if($display_child){
                        $tree .= $this->get_options_tree($sectionid, $id, true);
                    }
                }
            }
            return $tree;
        }
        
        function getLeftMenu($parentid, $get_parent=true, $active_id=0){
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
			
            $parent = $this->parent($parentid);
            if($parent != 0 && $get_parent){
               $s_parent = $this->parent($parent);
               if($s_parent !=0 && $get_parent){
                   $sql = 'SELECT * FROM cmssections WHERE parentid='.$s_parent.' AND active=1 ORDER BY parentid, position';
               }else{
                   $sql = 'SELECT * FROM cmssections WHERE parentid='.$parent.' AND active=1 ORDER BY parentid, position';
               }
            }else{
               $sql = 'SELECT * FROM cmssections WHERE parentid='.$parentid.' AND active=1 ORDER BY parentid, position'; 
            }
            
            $query = $this->db->query($sql);
            $num_rows = $query->num_rows();

            $tree = '';
            
            $i = 0;

            if($num_rows > 0){
                if($get_parent){
                    $tree .= '<ul class="unstyled full-width level-1" style="height:500px;">';
                }else{
                    $tree .= '<ul class="unstyled active-ul level-2">';
                }
                foreach($query->result() as $row){
                    $pid = $row->parentid;
                    $id = $row->ID;
                    $link = $row->link;
                    if($lang == 'en'){
                    	$name = $row->name_ru;
					}else{
						$name = $row->name_az;
					}
                                        
                    if($parentid == $id || $active_id == $id){
                        $li_class = 'active-li';
                    }else{
                        $li_class = '';
                    } 

                    $tree .= '<li class="'.$li_class .'">'; 
                    if($id == $parentid || ($get_parent == false && $id == $active_id)){ 
                        $tree .= '<a href="'.base_url().$link.'">';
                        //if(!$get_parent){$tree .= '-&nbsp;';}
                        $tree .= $name;
                        $tree .= '</a>';
                       
                        if($this->hasChildren($id) == 1){
                             $tree .= $this->getLeftMenu($id, false);
                        }
                    }elseif($this->parent($parentid) == $id){
                        //$tree .= '<span>';
                        $tree .= '<a href="'.base_url().$link.'">';
                        //if(!$get_parent){$tree .= '-&nbsp;';}
                        $tree .= $name;
                        $tree .= '</a>';
                        //$tree .= '</span>';

                        $tree .= $this->getLeftMenu($this->parent($parentid), false, $parentid);                                         
                    }else{
                        $tree .= '<a href="'.base_url().$link.'">';
                        //if(!$get_parent){$tree .= '-&nbsp;';}
                        $tree .= $name;
                        $tree .= '</a>';
                    }
                    
                    $tree .= '</li>';
                    
                    $i++;
                }
                $tree .= '</ul>';
            }
           
            return $tree;            
    }
    
    function getFooterMenu($parentid=0, $child=false, $sectionid=0){
        $lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
			
            $lnk = base_url().'index';
            
            $sql = 'SELECT * FROM cmssections WHERE parentid='.$parentid.' AND active=1 ORDER BY parentid, position';
            $query = $this->db->query($sql);
            $num_rows = $query->num_rows();

            $tree = '';
            
            $i = 0;

            if($num_rows > 0){
                ($child)?$tree .= '<ul class="unstyled">':$tree .= '<ul class="unstyled">';
                foreach($query->result() as $row){
                    $pid = $row->parentid;
                    $id = $row->ID;
                    $link = $row->link;
					if($lang == 'en'){
                    	$name = $row->name_ru;
					}else{
						$name = $row->name_az;
					}
                       
                    $tree .= '<li>';
                    if(($link == '')||($link == ' ')){
                        if($this->hasChildren($id)){
                            $tree .= '<a href="'.$lnk.$id.'/">';
                            $tree .= str_replace(' ', '&nbsp;', $name);
                            $tree .= '</a>';
                        }else{
                            $tree .= '<a href="'.$lnk.$id.'/">';
                            $tree .= str_replace(' ', '&nbsp;', $name);
                            $tree .= '</a>';
                        }                        
                    }else{
                        $tree .= '<a href="'.base_url().$link.'">';
                        $tree .= str_replace(' ', '&nbsp;', $name);
                        $tree .= '</a>';
                    }
                    
                    $tree .= '</li>';
                    
                    $i++;
                }
                $tree .= '</ul>';
            }
           
            return $tree;      
    }

    function get_dashed_name($id){
         $parent = $this->parent($id);
         if($parent == 0){ 
             return url_title($this->getSectionName($id, 'ru'), '_', true);
         }else{
             return $this->get_dashed_name($parent);
         }         
    }

    function get_id_by_dashed_name($dashed_name){
         $dashed_name = addslashes(xss_clean(strip_tags($dashed_name)));
         $sql = 'SELECT `ID` FROM `cmssections` WHERE `link` LIKE "%'.$dashed_name.'%" LIMIT 1';
         $query = $this->db->query($sql);
      
         foreach($query->result() as $row){
            return $row->ID;
         }
 
         return false;
    }

    function get_url($id){
        $parent = $this->parent($id);
        if($parent != 0){
            $parent_name = ''.$this->get_dashed_name($id);
        }else{
            $parent_name = '';
        }
        $name = url_title($this->getSectionName($id, 'ru'), '_', true);

        return base_url().$parent_name.'/'.$name.'/';
    }

    function get_publications_labels_list($parent=0, $checked){
        (integer) $parent;
        $sql = 'SELECT `ID`, `name_ru` FROM `cmssections` WHERE `parentid`='.$parent.' ORDER BY parentid, position';
        $query = $this->db->query($sql);
        
        $list = '<ul>';
        $i = 0;
        foreach($query->result() as $row){
            $id = $row->ID;
            $name = $row->name_ru;
           
            ($i % 5 == 0)? $list.= '</ul><ul>' : '';

            if(isset($checked['checkbox_'.$id]) && $checked['checkbox_'.$id] == 'on'){
                $chk = 'checked="checked"';
                $label_class = 'class="selected"';
            }else{
                $chk = '';
                $label_class = '';
            }

            $list .= '<li>';
            $list .= '<label style="cursor:pointer;" for="publications_label_checkbox_'.$id.'" '.$label_class.'>';
            $list .= $name;
            $list .= '<input type="checkbox" '.$chk.' id="publications_label_checkbox_'.$id.'" name="checkbox_'.$id.'" class="hidden">';
            $list .= '</li>'; 
            $i++;
        }        

        return $list;
    }
    
}