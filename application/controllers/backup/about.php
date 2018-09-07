<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
    /**************************************
    *
    * Author   : Orkhan Huseynov
    * Contacts : orkhan.huseynov@live.com
    *
    **************************************/

    class About extends CI_Controller {
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
            $this->load->model('news_model');

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
		
		public function index(){
            #Header
            $this->header('popular', 2);
            #End
		
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
				
				
				$left_menu = $this->section_model->getLeftMenu(2);
				$details = $this->content_model->getArticleDetails(2, $lang);
				
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

            	$default_page_list = $this->news_model->get_default_page_list();

				if($this->user_model->checkLogin('', '', 2) === TRUE){
					$display_inline_editor = 'contenteditable="true"';
				}else{
					$display_inline_editor = '';
				}
	
				if($lang == 'en'){
					$latestnews_text = 'Latest news';
				}else{
					$latestnews_text = 'Son xəbərlər';
				}
				
				#Body
				$data_body = array(
					'base_url' => base_url(),
					'left_menu' => $left_menu,
					
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
					'area_40' => $area_40,
					
					'latestnews_text' => $latestnews_text,
	
					'default_page_list' => $default_page_list					
					);
				$this->parser->parse('about_view', $data_body);
				#End Body
	
				#Footer
				$this->footer();
				#End
		}
	
		public function management($person=''){
            #Header
            switch ($person) {
    			case '' : { 
                    $this->header('popular', 10);
                    $left_menu = $this->section_model->getLeftMenu(10);
                    $details = $this->content_model->getArticleDetails(10);
                    break; }
				case 'samir_valiyev' : {
                    $this->header('popular', 106);
                    $left_menu = $this->section_model->getLeftMenu(106);
                    $details = $this->content_model->getArticleDetails(106);
                    break; }
				case 'ziya_ibrahimov' : {
                    $this->header('popular', 107);
                    $left_menu = $this->section_model->getLeftMenu(107);
                    $details = $this->content_model->getArticleDetails(107);
                    break; }
				case 'rena_isayeva' : {
                    $this->header('popular', 108);
                    $left_menu = $this->section_model->getLeftMenu(108);
                    $details = $this->content_model->getArticleDetails(108);
                    break; }
				case 'nurana_quliyeva' : {
                    $this->header('popular', 118);
                    $left_menu = $this->section_model->getLeftMenu(118);
                    $details = $this->content_model->getArticleDetails(118);
                    break; }
				case 'rustam_safaraliyev' : {
                    $this->header('popular', 110);
                    $left_menu = $this->section_model->getLeftMenu(110);
                    $details = $this->content_model->getArticleDetails(110);
                    break; }
				case 'azer_akbarov' : {
                    $this->header('popular', 111); 
                    $left_menu = $this->section_model->getLeftMenu(111);
                    $details = $this->content_model->getArticleDetails(111);
                    break; }
                case 'vadim_abdullayev' : {
                    $this->header('popular', 109); 
                    $left_menu = $this->section_model->getLeftMenu(109);
                    $details = $this->content_model->getArticleDetails(109);
                    break; }
                case 'ziya_nasirov' : {
                    $this->header('popular', 119); 
                    $left_menu = $this->section_model->getLeftMenu(119);
                    $details = $this->content_model->getArticleDetails(119);
                    break; }
                case 'azad_huseynov' : {
                    $this->header('popular', 120); 
                    $left_menu = $this->section_model->getLeftMenu(120);
                    $details = $this->content_model->getArticleDetails(120);
                    break; }    
                default : {
                    $this->header('popular', 10);
                    $left_menu = $this->section_model->getLeftMenu(10);
                    $details = $this->content_model->getArticleDetails(10);
                }
			}            
            #End
            	                      
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

            $default_page_list = $this->news_model->get_default_page_list();

            if($this->user_model->checkLogin('', '', 2) === TRUE){
                $display_inline_editor = 'contenteditable="true"';
                $display_accordion = 'class="accordion_disabled"';
            }else{
                $display_inline_editor = '';
                $display_accordion = 'class="accordion"';
            }

            
            #Body
            $data_body = array(
                'base_url' => base_url(),
                'left_menu' => $left_menu,
                
                'display_inline_editor' => $display_inline_editor,
                'display_accordion' => $display_accordion, 

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
                'area_40' => $area_40,

                'default_page_list' => $default_page_list                
                ); 
			
			switch ($person) {
				case '' : $this->parser->parse('about_management_view', $data_body); break;
				case 'samir_valiyev' : $this->parser->parse('about_management_samir_valiyev_view', $data_body); break;
				case 'ziya_ibrahimov' : $this->parser->parse('about_management_ziya_ibrahimov_view', $data_body); break;
				case 'rena_isayeva' : $this->parser->parse('about_management_rena_isayeva_view', $data_body); break;
				case 'nurana_quliyeva' : $this->parser->parse('about_management_nurana_guliyeva_view', $data_body); break;
				case 'rustam_safaraliyev' : $this->parser->parse('about_management_rustam_safaraliyev_view', $data_body); break;
				case 'azer_akbarov' : $this->parser->parse('about_management_azer_akbarov_view', $data_body); break;
				case 'vadim_abdullayev' : $this->parser->parse('about_management_vadim_abdullayev_view', $data_body); break;
				case 'ziya_nasirov' : $this->parser->parse('about_management_ziya_nasirov_view', $data_body); break;
				case 'azad_huseynov' : $this->parser->parse('about_management_azad_huseynov_view', $data_body); break;
			}            
            #End Body

            #Footer
            $this->footer();
            #End
	}

        public function history(){
            #Header
            $this->header('popular', 11);
            #End
            
            $left_menu = $this->section_model->getLeftMenu(11);
            $details = $this->content_model->getArticleDetails(11);            
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

            $default_page_list = $this->news_model->get_default_page_list();

            if($this->user_model->checkLogin('', '', 2) === TRUE){
                $display_inline_editor = 'contenteditable="true"';
                $display_accordion = 'class="accordion_disabled"';
            }else{
                $display_inline_editor = '';
                $display_accordion = 'class="accordion"';
            }

            
            #Body
            $data_body = array(
                'base_url' => base_url(),
                'left_menu' => $left_menu,
                
                'display_inline_editor' => $display_inline_editor,
                'display_accordion' => $display_accordion, 

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
                'area_40' => $area_40,

                'default_page_list' => $default_page_list                
                );
            $this->parser->parse('about_history_view', $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
	}

        public function our_vision(){
            #Header
            $this->header('popular', 12);
            #End
            
            $left_menu = $this->section_model->getLeftMenu(12);
            $details = $this->content_model->getArticleDetails(12);            
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

            $default_page_list = $this->news_model->get_default_page_list();

            if($this->user_model->checkLogin('', '', 2) === TRUE){
                $display_inline_editor = 'contenteditable="true"';
                $display_accordion = 'class="accordion_disabled"';
            }else{
                $display_inline_editor = '';
                $display_accordion = 'class="accordion"';
            }

            
            #Body
            $data_body = array(
                'base_url' => base_url(),
                'left_menu' => $left_menu,
                
                'display_inline_editor' => $display_inline_editor,
                'display_accordion' => $display_accordion, 

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
                'area_40' => $area_40,

                'default_page_list' => $default_page_list                
                );
            $this->parser->parse('about_awards_view', $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
	}
		
		public function our_mission(){
            #Header
            $this->header('popular', 105);
            #End
            
            $left_menu = $this->section_model->getLeftMenu(105);
            $details = $this->content_model->getArticleDetails(105);            
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

            $default_page_list = $this->news_model->get_default_page_list();

            if($this->user_model->checkLogin('', '', 2) === TRUE){
                $display_inline_editor = 'contenteditable="true"';
                $display_accordion = 'class="accordion_disabled"';
            }else{
                $display_inline_editor = '';
                $display_accordion = 'class="accordion"';
            }

            
            #Body
            $data_body = array(
                'base_url' => base_url(),
                'left_menu' => $left_menu,
                
                'display_inline_editor' => $display_inline_editor,
                'display_accordion' => $display_accordion, 

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
                'area_40' => $area_40,

                'default_page_list' => $default_page_list                
                );
            $this->parser->parse('about_our_mission_view', $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
	}

        public function our_values(){
            #Header
            $this->header('popular', 13);
            #End
            
            $left_menu = $this->section_model->getLeftMenu(13);
            $details = $this->content_model->getArticleDetails(13);            
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

            $default_page_list = $this->news_model->get_default_page_list();

            if($this->user_model->checkLogin('', '', 2) === TRUE){
                $display_inline_editor = 'contenteditable="true"';
                $display_accordion = 'class="accordion_disabled"';
            }else{
                $display_inline_editor = '';
                $display_accordion = 'class="accordion"';
            }

            
            #Body
            $data_body = array(
                'base_url' => base_url(),
                'left_menu' => $left_menu,
                
                'display_inline_editor' => $display_inline_editor,
                'display_accordion' => $display_accordion, 

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
                'area_40' => $area_40,

                'default_page_list' => $default_page_list                
                );
            $this->parser->parse('about_our_values_view', $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
	}
 
        public function international(){
            #Header
            $this->header('popular', 14);
            #End
            
            $left_menu = $this->section_model->getLeftMenu(14);
            $details = $this->content_model->getArticleDetails(14);            
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

            $default_page_list = $this->news_model->get_default_page_list();

            if($this->user_model->checkLogin('', '', 2) === TRUE){
                $display_inline_editor = 'contenteditable="true"';
                $display_accordion = 'class="accordion_disabled"';
            }else{
                $display_inline_editor = '';
                $display_accordion = 'class="accordion"';
            }

            
            #Body
            $data_body = array(
                'base_url' => base_url(),
                'left_menu' => $left_menu,
                
                'display_inline_editor' => $display_inline_editor,
                'display_accordion' => $display_accordion, 

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
                'area_40' => $area_40,

                'default_page_list' => $default_page_list                
                );
            $this->parser->parse('about_international_view', $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
	}

}

/* End of file about.php */
/* Location: ./application/controllers/about.php */