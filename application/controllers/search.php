<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
    /**************************************
    *
    * Author   : Orkhan Huseynov
    * Contacts : orkhan.huseynov@live.com
    *
    **************************************/

    class Search extends CI_Controller {
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
            $this->load->model('search_model');
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
            $footer_menu = $this->section_model->getFooterMenu(1);
            if($this->user_model->checkLogin('', '', 2) === TRUE){
                $display_save_button = 'style="display:inline;"';
            }else{
                $display_save_button = 'style="display:none;"';
            }
            $this->footer_model->set('footer_menu', $footer_menu);
            $this->footer_model->set('display_save_button', $display_save_button);
            $this->parser->parse('footer_view', $this->footer_model->get());
		}
	
		public function index($ss='', $page=0){
			$ss = trim(xss_clean(strip_tags($ss)));
            #Header
            $this->header('popular', 11);
            #End 
			
			$search_list = $this->search_model->get_search_list($ss, $page);
            $count = $this->search_model->get_count($ss, $page);
            
			$config['base_url'] = base_url().'search/index/'.$ss.'/';
			$config['total_rows'] = $count;
			$config['per_page'] = 10;
			$config['uri_segment'] = 4;
			$config['prev_link'] = 'Previous'; 
			$config['next_link'] = 'Next';
			$config['first_link'] = 'First'; 
			$config['first_tag_open'] = '<a class="doubleArrowL">';
			$config['first_tag_close'] = '</a>';
			$config['last_tag_open'] = '<a class="doubleArrowR"';
			$config['last_tag_close'] = '</a>';
			$config['next_tag_open'] = '<a class="next">';
			$config['next_tag_close'] = '</a><a class="singleArrowR" href="#">Single Arrow Right</a>';
			$config['prev_tag_open'] = '<a class="singleArrowL" href="#">Single Arrow Left</a><a class="prev">';
			$config['prev_tag_close'] = '</a>';
			$config['cur_tag_open'] = '<a class="active">';
			$config['cur_tag_close'] = '</a>';
	
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
                'display_results' => $display_results,	
                'ss' => $ss
                );
            $this->parser->parse('search_view', $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
		}
		
		
	}

/* End of file search.php */
/* Location: ./application/controllers/search.php */