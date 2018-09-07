<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
    /**************************************
    *
    * Author   : Orkhan Huseynov
    * Contacts : orkhan.huseynov@live.com
    *
    **************************************/

    class Sectors extends CI_Controller {
        var $logged_in = FALSE;
        
        function __construct(){
            parent::__construct();

            $this->load->library('parser');
            $this->load->library('session'); 
            $this->load->helper('url');
            $this->load->helper('security');
			$this->load->helper('cookie');
            $this->load->database();
            $this->load->model('header_model');
            $this->load->model('footer_model');
            $this->load->model('section_model');
            $this->load->model('content_model');

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
            $this->header('popular', 4);
            #End
            
            $left_menu = $this->section_model->getLeftMenu(4);
            $details = $this->content_model->getArticleDetails(4);
            
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
                'area_40' => $area_40               
                );
            $this->parser->parse('sectors_view', $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
	}

        public function agriculture($submenu='agriculture'){
            $sectionid = $this->section_model->get_id_by_dashed_name($submenu);
 
            #Header
            if(!$sectionid){
                $this->header('popular', 74);
                $left_menu = $this->section_model->getLeftMenu(74);
                $details = $this->content_model->getArticleDetails(74);
            }else{
                $this->header('popular', $sectionid);
                $left_menu = $this->section_model->getLeftMenu($sectionid);
                $details = $this->content_model->getArticleDetails($sectionid);
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

            if($this->user_model->checkLogin('', '', 2) === TRUE){
                $display_inline_editor = 'contenteditable="true"';
            }else{
                $display_inline_editor = '';
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
                'area_40' => $area_40               
                );
            
            $view_name = 'sectors_agriculture_'.$submenu.'_view';  
           
            $this->parser->parse($view_name , $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
	}

        public function automative($submenu='automative'){
            $sectionid = $this->section_model->get_id_by_dashed_name($submenu);
 
            #Header
            if(!$sectionid){
                $this->header('popular', 75);
                $left_menu = $this->section_model->getLeftMenu(75);
                $details = $this->content_model->getArticleDetails(75);
            }else{
                $this->header('popular', $sectionid);
                $left_menu = $this->section_model->getLeftMenu($sectionid);
                $details = $this->content_model->getArticleDetails($sectionid);
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

            if($this->user_model->checkLogin('', '', 2) === TRUE){
                $display_inline_editor = 'contenteditable="true"';
            }else{
                $display_inline_editor = '';
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
                'area_40' => $area_40               
                );
            
            $view_name = 'sectors_automative_'.$submenu.'_view';  
           
            $this->parser->parse($view_name , $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
	}

        public function sector_business_services($submenu='sector_business_services'){
            $sectionid = $this->section_model->get_id_by_dashed_name($submenu);
 
            #Header
            if(!$sectionid){
                $this->header('popular', 76);
                $left_menu = $this->section_model->getLeftMenu(76);
                $details = $this->content_model->getArticleDetails(76);
            }else{
                $this->header('popular', $sectionid);
                $left_menu = $this->section_model->getLeftMenu($sectionid);
                $details = $this->content_model->getArticleDetails($sectionid);
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

            if($this->user_model->checkLogin('', '', 2) === TRUE){
                $display_inline_editor = 'contenteditable="true"';
            }else{
                $display_inline_editor = '';
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
                'area_40' => $area_40               
                );
            
            $view_name = 'sectors_sector_business_services_'.$submenu.'_view';  
           
            $this->parser->parse($view_name , $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
	}

        public function energy_and_natural_resources($submenu='energy_and_natural_resources'){
            $sectionid = $this->section_model->get_id_by_dashed_name($submenu);
 
            #Header
            if(!$sectionid){
                $this->header('popular', 78);
                $left_menu = $this->section_model->getLeftMenu(78);
                $details = $this->content_model->getArticleDetails(78);
            }else{
                $this->header('popular', $sectionid);
                $left_menu = $this->section_model->getLeftMenu($sectionid);
                $details = $this->content_model->getArticleDetails($sectionid);
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

            if($this->user_model->checkLogin('', '', 2) === TRUE){
                $display_inline_editor = 'contenteditable="true"';
            }else{
                $display_inline_editor = '';
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
                'area_40' => $area_40               
                );
            
            $view_name = 'sectors_energy_and_natural_resources_'.$submenu.'_view';  
           
            $this->parser->parse($view_name , $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
	}

        public function financial_sector($submenu='financial_services'){
            $sectionid = $this->section_model->get_id_by_dashed_name($submenu);
 
            #Header
            if(!$sectionid){
                $this->header('popular', 82);
                $left_menu = $this->section_model->getLeftMenu(82);
                $details = $this->content_model->getArticleDetails(82);
            }else{
                $this->header('popular', $sectionid);
                $left_menu = $this->section_model->getLeftMenu($sectionid);
                $details = $this->content_model->getArticleDetails($sectionid);
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

            if($this->user_model->checkLogin('', '', 2) === TRUE){
                $display_inline_editor = 'contenteditable="true"';
            }else{
                $display_inline_editor = '';
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
                'area_40' => $area_40               
                );
            
            $view_name = 'sectors_financial_services_'.$submenu.'_view';  
           
            $this->parser->parse($view_name , $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
	}

        public function food_and_drink($submenu='food_and_drink'){
            $sectionid = $this->section_model->get_id_by_dashed_name($submenu);
 
            #Header
            if(!$sectionid){
                $this->header('popular', 83);
                $left_menu = $this->section_model->getLeftMenu(83);
                $details = $this->content_model->getArticleDetails(83);
            }else{
                $this->header('popular', $sectionid);
                $left_menu = $this->section_model->getLeftMenu($sectionid);
                $details = $this->content_model->getArticleDetails($sectionid);
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

            if($this->user_model->checkLogin('', '', 2) === TRUE){
                $display_inline_editor = 'contenteditable="true"';
            }else{
                $display_inline_editor = '';
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
                'area_40' => $area_40               
                );
            
            $view_name = 'sectors_food_and_drink_'.$submenu.'_view';  
           
            $this->parser->parse($view_name , $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
	}

        public function tourism_and_hospitality($submenu='leisure_and_hospitality'){
            $sectionid = $this->section_model->get_id_by_dashed_name($submenu);
 
            #Header
            if(!$sectionid){
                $this->header('popular', 84);
                $left_menu = $this->section_model->getLeftMenu(84);
                $details = $this->content_model->getArticleDetails(84);
            }else{
                $this->header('popular', $sectionid);
                $left_menu = $this->section_model->getLeftMenu($sectionid);
                $details = $this->content_model->getArticleDetails($sectionid);
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

            if($this->user_model->checkLogin('', '', 2) === TRUE){
                $display_inline_editor = 'contenteditable="true"';
            }else{
                $display_inline_editor = '';
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
                'area_40' => $area_40               
                );
            
            $view_name = 'sectors_leisure_and_hospitality_'.$submenu.'_view';  
           
            $this->parser->parse($view_name , $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
	}

        public function manufacturing($submenu='manufacturing'){
            $sectionid = $this->section_model->get_id_by_dashed_name($submenu);
 
            #Header
            if(!$sectionid){
                $this->header('popular', 85);
                $left_menu = $this->section_model->getLeftMenu(85);
                $details = $this->content_model->getArticleDetails(85);
            }else{
                $this->header('popular', $sectionid);
                $left_menu = $this->section_model->getLeftMenu($sectionid);
                $details = $this->content_model->getArticleDetails($sectionid);
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

            if($this->user_model->checkLogin('', '', 2) === TRUE){
                $display_inline_editor = 'contenteditable="true"';
            }else{
                $display_inline_editor = '';
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
                'area_40' => $area_40               
                );
            
            $view_name = 'sectors_manufacturing_'.$submenu.'_view';  
           
            $this->parser->parse($view_name , $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
	}

        public function telecommunications_and_it($submenu='media_and_technology'){
            $sectionid = $this->section_model->get_id_by_dashed_name($submenu);
 
            #Header
            if(!$sectionid){
                $this->header('popular', 86);
                $left_menu = $this->section_model->getLeftMenu(86);
                $details = $this->content_model->getArticleDetails(86);
            }else{
                $this->header('popular', $sectionid);
                $left_menu = $this->section_model->getLeftMenu($sectionid);
                $details = $this->content_model->getArticleDetails($sectionid);
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

            if($this->user_model->checkLogin('', '', 2) === TRUE){
                $display_inline_editor = 'contenteditable="true"';
            }else{
                $display_inline_editor = '';
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
                'area_40' => $area_40               
                );
            
            $view_name = 'sectors_media_and_technology_'.$submenu.'_view';  
           
            $this->parser->parse($view_name , $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
	}

        public function non_profits($submenu='not_for_profit'){
            $sectionid = $this->section_model->get_id_by_dashed_name($submenu);
 
            #Header
            if(!$sectionid){
                $this->header('popular', 88);
                $left_menu = $this->section_model->getLeftMenu(88);
                $details = $this->content_model->getArticleDetails(88);
            }else{
                $this->header('popular', $sectionid);
                $left_menu = $this->section_model->getLeftMenu($sectionid);
                $details = $this->content_model->getArticleDetails($sectionid);
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

            if($this->user_model->checkLogin('', '', 2) === TRUE){
                $display_inline_editor = 'contenteditable="true"';
            }else{
                $display_inline_editor = '';
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
                'area_40' => $area_40               
                );
            
            $view_name = 'sectors_not_for_profit_'.$submenu.'_view';  
           
            $this->parser->parse($view_name , $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
	}

        public function banking($submenu='pensions'){
            $sectionid = $this->section_model->get_id_by_dashed_name($submenu);
 
            #Header
            if(!$sectionid){
                $this->header('popular', 95);
                $left_menu = $this->section_model->getLeftMenu(95);
                $details = $this->content_model->getArticleDetails(95);
            }else{
                $this->header('popular', $sectionid);
                $left_menu = $this->section_model->getLeftMenu($sectionid);
                $details = $this->content_model->getArticleDetails($sectionid);
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

            if($this->user_model->checkLogin('', '', 2) === TRUE){
                $display_inline_editor = 'contenteditable="true"';
            }else{
                $display_inline_editor = '';
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
                'area_40' => $area_40               
                );
            
            $view_name = 'sectors_pensions_'.$submenu.'_view';  
           
            $this->parser->parse($view_name , $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
	}

        public function professional_practices($submenu='professional_practices'){
            $sectionid = $this->section_model->get_id_by_dashed_name($submenu);
 
            #Header
            if(!$sectionid){
                $this->header('popular', 96);
                $left_menu = $this->section_model->getLeftMenu(96);
                $details = $this->content_model->getArticleDetails(96);
            }else{
                $this->header('popular', $sectionid);
                $left_menu = $this->section_model->getLeftMenu($sectionid);
                $details = $this->content_model->getArticleDetails($sectionid);
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

            if($this->user_model->checkLogin('', '', 2) === TRUE){
                $display_inline_editor = 'contenteditable="true"';
            }else{
                $display_inline_editor = '';
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
                'area_40' => $area_40               
                );
            
            $view_name = 'sectors_professional_practices_'.$submenu.'_view';  
           
            $this->parser->parse($view_name , $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
	}

        public function real_estate_and_construction($submenu='real_estate_and_construction'){
            $sectionid = $this->section_model->get_id_by_dashed_name($submenu);
 
            #Header
            if(!$sectionid){
                $this->header('popular', 98);
                $left_menu = $this->section_model->getLeftMenu(98);
                $details = $this->content_model->getArticleDetails(98);
            }else{
                $this->header('popular', $sectionid);
                $left_menu = $this->section_model->getLeftMenu($sectionid);
                $details = $this->content_model->getArticleDetails($sectionid);
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

            if($this->user_model->checkLogin('', '', 2) === TRUE){
                $display_inline_editor = 'contenteditable="true"';
            }else{
                $display_inline_editor = '';
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
                'area_40' => $area_40               
                );
            
            $view_name = 'sectors_real_estate_and_construction_'.$submenu.'_view';  
           
            $this->parser->parse($view_name , $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
	}

        public function retail($submenu='retail'){
            $sectionid = $this->section_model->get_id_by_dashed_name($submenu);
 
            #Header
            if(!$sectionid){
                $this->header('popular', 98);
                $left_menu = $this->section_model->getLeftMenu(99);
                $details = $this->content_model->getArticleDetails(99);
            }else{
                $this->header('popular', $sectionid);
                $left_menu = $this->section_model->getLeftMenu($sectionid);
                $details = $this->content_model->getArticleDetails($sectionid);
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

            if($this->user_model->checkLogin('', '', 2) === TRUE){
                $display_inline_editor = 'contenteditable="true"';
            }else{
                $display_inline_editor = '';
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
                'area_40' => $area_40               
                );
            
            $view_name = 'sectors_retail_'.$submenu.'_view';  
           
            $this->parser->parse($view_name , $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
	}
}

/* End of file sectors.php */
/* Location: ./application/controllers/sectors.php */