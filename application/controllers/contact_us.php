<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
    /**************************************
    *
    * Author   : Orkhan Huseynov
    * Contacts : orkhan.huseynov@live.com
    *
    **************************************/

    class Contact_us extends CI_Controller {
        var $logged_in = FALSE;
        
        function __construct(){
            parent::__construct();

            $this->load->library('parser');
            $this->load->library('session');            
            $this->load->library('form_validation');
            $this->load->helper('url');
            $this->load->helper('security');
			$this->load->helper('cookie');
            $this->load->database();
            $this->load->model('header_model');
            $this->load->model('footer_model');
            $this->load->model('section_model');            
            $this->load->model('content_model');
			$this->load->model('people_model');
			$this->load->library('pagination');

            $this->db->query('SET NAMES utf8');
            header("Content-Type: text/html; charset=UTF-8");

            #Check Login
            if($this->user_model->checkLogin() === TRUE){
                $this->logged_in = TRUE;
            }
            #End
        }

        private function header($mode='popular', $sectionid=1){
            if($mode == 'plain'){
                $this->header_model->toggleAjaxLinks(false);
            }
            $sections = $this->section_model->createTree('projects', 0, false, $sectionid);
            $dashed_section_name = $this->section_model->get_dashed_name($sectionid);
            $this->header_model->set('sections', $sections);
            $this->header_model->set('dashed_section_name', $dashed_section_name);
            $this->header_model->set('section_id', $sectionid);
            $this->parser->parse('header_view', $this->header_model->get($sectionid, $mode));
		}

		private function footer(){
            $footer_menu = $this->section_model->getFooterMenu(2);
            $footer_menu_services = $this->section_model->getFooterMenu(3);
            $footer_menu_sectors = $this->section_model->getFooterMenu(4);
            if($this->user_model->checkLogin('', '', 2) === TRUE){
                $display_save_button = 'style="display:inline;"';
            }else{
                $display_save_button = 'style="display:none;"';
            }
            $this->footer_model->set('footer_menu', $footer_menu);
            $this->footer_model->set('footer_menu_services', $footer_menu_services);
            $this->footer_model->set('footer_menu_sectors', $footer_menu_sectors);
            $this->footer_model->set('display_save_button', $display_save_button);
            $this->parser->parse('footer_view', $this->footer_model->get());
		}
		
		private function build_option_values($parent, $sectionid){
            if($parent == 3){
                $htm = '<option selected="selected" value="0">All services</option>';
            }else{
                $htm = '<option selected="selected" value="0">All sectors</option>';
            }
         
            $htm .= str_replace('<option value="0">&nbsp;</option>', '', $this->section_model->get_options_tree($sectionid, $parent));
            return $htm;
        }
		
		private function build_bulleted_list($lastname){
			$htm = '';
			foreach(range('A','Z') as $i) {
				if($lastname == $i){
					$htm .= '<li class="selected"><a href="'.base_url().'contact_us/index/-/0/0/'.$i.'/">'.$i.'</a></li>';
				}else{
					$htm .= '<li><a href="'.base_url().'contact_us/index/-/0/0/'.$i.'/">'.$i.'</a></li>';
				}
			}
			return $htm;
		}
	
		public function index($name='-', $section=0, $sector=0, $lastname='-', $page=0){
            #Header
            $this->header('popular', 9);
            #End
            
            $lang = get_cookie('lang', TRUE);
    		if(!$lang){
				$lang = 'en';
			}
            $details = $this->content_model->getArticleDetails(9, $lang);
            
            $area_1 = $details[0]['area_1'];
            $area_2 = $details[0]['area_2'];
            $area_3 = $details[0]['area_3'];
            $area_4 = $details[0]['area_4'];
            $area_5 = $details[0]['area_5'];
            $area_6 = $details[0]['area_6'];
            $area_7 = $details[0]['area_7'];
            $area_8 = $details[0]['area_8'];
            $area_9 = $details[0]['area_9'];
            $area_10 = $details[0]['area_10'];
            $area_11 = $details[0]['area_11'];
            $area_12 = $details[0]['area_12'];
            $area_13 = $details[0]['area_13'];
            $area_14 = $details[0]['area_14'];
            $area_15 = $details[0]['area_15'];
            $area_16 = $details[0]['area_16'];
            $area_17 = $details[0]['area_17'];
            $area_18 = $details[0]['area_18'];
            $area_19 = $details[0]['area_19'];
            $area_20 = $details[0]['area_20'];
            $area_21 = $details[0]['area_21'];
            $area_22 = $details[0]['area_22'];
            $area_23 = $details[0]['area_23'];
            $area_24 = $details[0]['area_24'];
            $area_25 = $details[0]['area_25'];
            $area_26 = $details[0]['area_26'];
            $area_27 = $details[0]['area_27'];
            $area_28 = $details[0]['area_28'];
            $area_29 = $details[0]['area_29'];
            $area_30 = $details[0]['area_30'];
            $area_31 = $details[0]['area_31'];
            $area_32 = $details[0]['area_32'];
            $area_33 = $details[0]['area_33'];
            $area_34 = $details[0]['area_34'];
            $area_35 = $details[0]['area_35'];
            $area_36 = $details[0]['area_36'];
            $area_37 = $details[0]['area_37'];
            $area_38 = $details[0]['area_38'];
            $area_39 = $details[0]['area_39'];
            $area_40 = $details[0]['area_40'];

            if($this->user_model->checkLogin('', '', 2) === TRUE){
                $display_inline_editor = 'contenteditable="true"';
            }else{
                $display_inline_editor = '';
            }
            
            #Body
            $data_body = array(
                'base_url' => base_url(),                
                
                'display_inline_editor' => $display_inline_editor, 

                'area_1' => $area_1,
                'area_2' => $area_2,
                'area_3' => $area_3,
                'area_4' => $area_4,
                'area_5' => $area_5,
                'area_6' => $area_6,
                'area_7' => $area_7,
                'area_8' => $area_8,
                'area_9' => $area_9,
                'area_10' => $area_10,
                'area_11' => $area_11,
                'area_12' => $area_12,
                'area_13' => $area_13,
                'area_14' => $area_14,
                'area_15' => $area_15,
                'area_16' => $area_16,
                'area_17' => $area_17,
                'area_18' => $area_18,
                'area_19' => $area_19,
                'area_20' => $area_20,
                'area_21' => $area_21,
                'area_22' => $area_22,
                'area_23' => $area_23,
                'area_24' => $area_24,
                'area_25' => $area_25,
                'area_26' => $area_26,
                'area_27' => $area_27,
                'area_28' => $area_28,
                'area_29' => $area_29,
                'area_30' => $area_30,
                'area_31' => $area_31,
                'area_32' => $area_32,
                'area_33' => $area_33,
                'area_34' => $area_34,
                'area_35' => $area_35,
                'area_36' => $area_36,
                'area_37' => $area_37,
                'area_38' => $area_38,
                'area_39' => $area_39,
                'area_40' => $area_40               
                );
                
            $this->parser->parse('contact_us_view', $data_body);
			
			/*$name = xss_clean($name);
			$lastname = substr(xss_clean($lastname), 0, 1);
			
			$config['base_url'] = base_url().'contact_us/index/'.$name.'/'.$section.'/'.$sector.'/'.$lastname.'/';
			
			if($name == '-'){
				$name = '';
			}
			if($lastname == '-'){
				$lastname = '';
			}
            
            $search_list = $this->people_model->get_search_list($name, $section, $sector, $lastname, $page);
			$count = $this->people_model->get_count($name, $section, $sector, $lastname);
			$section_values = $this->build_option_values(3, $section);
			$sector_values = $this->build_option_values(4, $sector);
			$bulleted_list = $this->build_bulleted_list($lastname); 
			
			
			$config['total_rows'] = $count;
			$config['per_page'] = 10;
			$config['uri_segment'] = 7;
			$config['prev_link'] = 'Prev'; 
			$config['next_link'] = 'Next';
			$config['num_tag_open'] = '<li>';
			$config['num_tag_close'] = '</li>';
			$config['prev_tag_open'] = '<li>';
			$config['prev_tag_close'] = '</li>';
			$config['next_tag_open'] = '<li>';
			$config['next_tag_close'] = '</li>';
			$config['cur_tag_open'] = '<li><a class="current">';
			$config['cur_tag_close'] = '</a></li>';
			$config['first_tag_open'] = '<li>'; 
			$config['first_tag_close'] = '</li>';
			$config['first_link'] = 'First';
			$config['last_tag_open'] = '<li>';
			$config['last_tag_close'] = '</li>'; 
			$config['last_link'] = 'Last';
	
			$this->pagination->initialize($config); 
	
			$paging = $this->pagination->create_links();
			$results_from = $page + 1;
			$results_to = $page + 10;
			if($results_to > $count){
				$results_to = $count;
			}
			
			($count > 0)? $display_results = '' : $display_results = 'display:none;';
			
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
			
			$i_would_like_to_contact = ($lang == 'en')? 'I would like to contact...' : 'Əlaqə saxlamaq istəyirəm...';
			$a_partner = ($lang == 'en')? 'A partner' : 'Partnyor ilə';
			$filter_contacts = ($lang == 'en')? 'Filter contacts' : 'Kontaktlar üzrə filtr';
			$by_name = ($lang == 'en')? 'By name' : 'Ad üzrə'; 
			$by_service = ($lang == 'en')? 'Or, by service' : 'Və yaxud, xidmət üzrə';
			$by_sector = ($lang == 'en')? 'Or, by sector' : 'Və yaxud, sektor üzrə';
			$find_by_last_name = ($lang == 'en')? 'Find by last name' : 'Familiya üzrə axtarmaq';
       
            #Body
            $data_body = array(
                'base_url' => base_url(),
                'search_list' => $search_list,
				'paging' => $paging,
                'count' => $count,
                'results_from' => $results_from,
                'results_to' => $results_to,
                'display_results' => $display_results,
				'section_values' => $section_values,
				'sector_values' => $sector_values,
				'bulleted_list' => $bulleted_list,
				'i_would_like_to_contact' => $i_would_like_to_contact,
				'a_partner' => $a_partner,
				'filter_contacts' => $filter_contacts,
				'by_name' => $by_name,
				'by_service' => $by_service,
				'by_sector' => $by_sector,
				'find_by_last_name' => $find_by_last_name				
                );
            $this->parser->parse('contact_us_view', $data_body);
            #End Body*/

            #Footer
            $this->footer();
            #End
		}
		
		public function people($page=0){
            #Header
            $this->header('popular', 9);
            #End
        
			$search_list = $this->people_model->get_search_list($page);
			$count = $this->people_model->get_count();
            
			$config['base_url'] = base_url().'careers/people/';
			$config['total_rows'] = $count;
			$config['per_page'] = 10;
			$config['uri_segment'] = 3;
			$config['prev_link'] = '&lt;&nbsp;Prev'; 
			$config['next_link'] = 'Next&nbsp;&gt;';
	
			$this->pagination->initialize($config); 
	
			$paging = $this->pagination->create_links();
			$results_from = $page + 1;
			$results_to = $page + 10;
			if($results_to > $count){
				$results_to = $count;
			}
			
			($count > 0)? $display_results = '' : $display_results = 'display:none;';
       
            #Body
            $data_body = array(
                'base_url' => base_url(),                                
				'search_list' => $search_list,
				'paging' => $paging,
                'count' => $count,
                'results_from' => $results_from,
                'results_to' => $results_to,
                'display_results' => $display_results			
                
                );
            $this->parser->parse('careers_people_view', $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
		}
    	public function people_details($id=0){
	    	(integer) $id;
	
			#Header
			$this->header('popular', 9);
			#End
			
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
				
			$details_arr = $this->people_model->getDetails($id);
			$name_en = ($lang == 'en')? $details_arr[0]['name_en'] : $details_arr[0]['name_az'];
			$lastname_en = ($lang == 'en')? $details_arr[0]['lastname_en'] : $details_arr[0]['lastname_az'];
			$title_en = ($lang == 'en')? $details_arr[0]['title_en'] : $details_arr[0]['title_az'];
			$text_en = ($lang == 'en')? $details_arr[0]['text_en'] : $details_arr[0]['text_az'];
			
			$services = $details_arr[0]['section'];
			$sectors = $details_arr[0]['sector'];
			$phone = $details_arr[0]['phone'];
			$fax = $details_arr[0]['fax'];
			
			$qualifications = ($lang == 'en')? $details_arr[0]['qualifications_en'] : $details_arr[0]['qualifications_az'];
			$memberships = ($lang == 'en')? $details_arr[0]['memberships_en'] : $details_arr[0]['memberships_az'];
			
			$linkedin_profile = $details_arr[0]['linkedin_profile'];
			$file = $details_arr[0]['file'];
			
			$services_string = '';
			if($services != ''){
				$services_string .= ($lang == 'en')? '<strong>Services:</strong> ' : '<strong>Xidmətlər:</strong> ';
						
				$section_arr = explode('~', $services);
				foreach($section_arr as $key=>$val){
					$section_name = $this->section_model->getSectionName($val);
                    $section_url = $this->section_model->get_url($val);
					
					if($key == count($section_arr)-1){						
						$services_string .= '<a href="'.$section_url.'" >'.$section_name.'</a>'.'<br />';
					}else{
						$services_string .= '<a href="'.$section_url.'" >'.$section_name.'</a>'.', ';
					}
				}
			}
			$sectors_string = '';
			if($sectors != ''){
				$sectors_string .= ($lang == 'en')? '<strong>Sectors:</strong> ' : '<strong>Sektorlar:</strong> ';
						
				$sector_arr = explode('~', $sectors);
				foreach($sector_arr as $key=>$val){
					$sector_name = $this->section_model->getSectionName($val);
                    $sector_url = $this->section_model->get_url($val);
					
					if($key == count($sector_arr)-1){
						$sectors_string .= '<a href="'.$sector_url.'" >'.$sector_name.'</a>';
					}else{
						$sectors_string .= '<a href="'.$sector_url.'" >'.$sector_name.'</a>'.', ';
					}
				}
			}
			
			if($qualifications != ''){
				$qualifications_string = ($lang == 'en')? '<strong>Qualifications:</strong> ' : '<strong>Kvalifikasiya:</strong> ';
				$qualifications_string .= $qualifications.'<br />';
			}else{
				$qualifications_string = '';
			}
			
			if($memberships != ''){
				$memberships_string = ($lang == 'en')? '<strong>Memberships:</strong> ' : '<strong>Üzvlük:</strong> ';
				$memberships_string .= $memberships;
			}else{
				$memberships_string = '';
			}
			
			if($linkedin_profile != ''){
				$linkedin_profile_string = '<li id="linkedin"><a href="'.$linkedin_profile.'">';
				$linkedin_profile_string .= ($lang == 'en')? 'Connect with me</a></li>' : 'Əlaqə</a></li>';
			}else{
				$linkedin_profile_string = '';
			}
			
			$i_would_like_to_contact = ($lang == 'en')? 'I would like to contact...' : 'Əlaqə saxlamaq istəyirəm...';
			$back_to_listings = ($lang == 'en')? 'Back to listings' : 'Geriyə';
							
			#Body
			$data_body = array(
				'base_url' => base_url(), 				
				'name' => $name_en,
				'lastname' => $lastname_en,
				'title' => $title_en,
				'text' => $text_en,
				'services' => $services_string,
				'sectors' => $sectors_string,
				'phone' => $phone,
				'fax' => $fax,
				'qualifications' => $qualifications_string,
				'memberships' => $memberships_string,
				'linkedin_profile' => $linkedin_profile_string,
				'file' => $file,
				'i_would_like_to_contact' => $i_would_like_to_contact,
				'back_to_listings' => $back_to_listings
				);
			$this->parser->parse('contact_us_people_details_view', $data_body);
			#End Body
	
			#Footer
			$this->footer();
			#End
		}
	}

/* End of file contact_us.php */
/* Location: ./application/controllers/contact_us.php */