<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
    /**************************************
    *
    * Author   : Orkhan Huseynov
    * Contacts : orkhan.huseynov@live.com
    *
    **************************************/

    class Case_studies extends CI_Controller {
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
            $this->load->model('case_studies_model');
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
            $footer_menu = $this->section_model->getFooterMenu(5);
            if($this->user_model->checkLogin('', '', 2) === TRUE){
                $display_save_button = 'style="display:inline;"';
            }else{
                $display_save_button = 'style="display:none;"';
            }
            $this->footer_model->set('footer_menu', $footer_menu);
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
	
	public function index($section=0, $sector=0, $page=0){
            #Header
            $this->header('popular', 5);
            #End
                        
            $details = $this->content_model->getArticleDetails(5);
            
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
            
            $featured_case_studies = $this->case_studies_model->get_featured_case_studies();
            $services_options = $this->build_option_values(3, $section);
            $sectors_options = $this->build_option_values(4, $sector);
            $search_list = $this->case_studies_model->get_search_list($section, $sector, $page);
            $count = $this->case_studies_model->get_count($section, $sector);
            
            $config['base_url'] = base_url().'case_studies/index/'.$section.'/'.$sector.'/';
	    $config['total_rows'] = $count;
	    $config['per_page'] = 10;
	    $config['uri_segment'] = 5;
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

		$lang = get_cookie('lang', TRUE);
		if(!$lang){
			$lang = 'en';
		}
		
		$search_case_studies = ($lang == 'en')? 'Search case studies' : 'Tematik tədqiqatlar üzrə axtarış';
		$by_sector = ($lang == 'en')? 'By sector' : 'Sektor';
		$by_service = ($lang == 'en')? 'By service' : 'Xidmət';
		$results = ($lang == 'en')? 'Results' : 'Nəticələr';
		$of = ($lang == 'en')? 'Of' : '-';
            
            #Body
            $data_body = array(
                'base_url' => base_url(), 
				
				'search_case_studies' => $search_case_studies,
				'by_sector' => $by_sector,
				'by_service' => $by_service,
				'results' => $results,
				'of' => $of,
                
                'display_inline_editor' => $display_inline_editor,
                'featured_case_studies' => $featured_case_studies, 
                'services_options' => $services_options,
                'sectors_options' => $sectors_options,
                'search_list' => $search_list,
                'paging' => $paging,
                'count' => $count,
                'results_from' => $results_from,
                'results_to' => $results_to,
                'display_results' => $display_results,

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
            $this->parser->parse('case_studies_view', $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
	}
	
	public function details($id=0){
	    (integer) $id;
	
            #Header
            $this->header('popular', 5);
            #End
            
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
		
            $details_arr = $this->case_studies_model->getDetails($id);
            $title = ($lang == 'en')? $details_arr[0]['title_en'] : $details_arr[0]['title_az'];
			$details = ($lang == 'en')? $details_arr[0]['text_en'] : $details_arr[0]['text_az'];
		
			$section = $details_arr[0]['section'];
			$sector = $details_arr[0]['sector'];
		
			$left_sidebar = $this->people_model->get_left_sidebar_item($section, $sector);
                        
            #Body
            $data_body = array(
                'base_url' => base_url(),                
                     'title' => $title,
                     'details' => $details,
					 'left_sidebar' => $left_sidebar
                );
            $this->parser->parse('case_studies_details_view', $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
	}
}

/* End of file case_studies.php */
/* Location: ./application/controllers/case_studies.php */