<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
    /**************************************
    *
    * Author   : Orkhan Huseynov
    * Contacts : orkhan.huseynov@live.com
    *
    **************************************/

    class Register_for_updates extends CI_Controller {
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
		
		public function index($save=''){
			#Header
            $this->header('popular', 1);
            #End
			$this->form_validation->set_error_delimiters('<span class="form_error">', '</span>');
			
			if($save == ''){
				$data_body = array(
                	'base_url' => base_url()					
				);
				$this->parser->parse('register_for_updates_view', $data_body);
			
			}else{
				$this->form_validation->set_rules('name_lastname', 'Name, lastname', 'trim|required|xss_clean|min_length[2]|max_length[150]');
				$this->form_validation->set_rules('email', 'Email', 'trim|required|xss_clean|valid_email|min_length[2]|max_length[150]|matches[confirm_email]');
				$this->form_validation->set_rules('confirm_email', 'Confirm email', 'trim|required|xss_clean|valid_email|min_length[2]|max_length[150]');
				
				$value_name_lastname = $this->input->post(xss_clean(trim(strip_tags('name_lastname'))));
				$value_email = $this->input->post(xss_clean(trim(strip_tags('email'))));
				$value_confirm_email = $this->input->post(xss_clean(trim(strip_tags('confirm_email'))));
				
				if ($this->form_validation->run() == FALSE){
					$data_body = array(
                		'base_url' => base_url()					
					);
					$this->parser->parse('register_for_updates_view', $data_body);
				}else{
					$this->content_model->register_email_for_updates($value_name_lastname, $value_email);
					header('Location:'.site_url('register_for_updates/success/'));
                    exit;
				}
			}	
				
			
			#Footer
            $this->footer();
            #End
		}
		
		public function success(){
			#Header
			$this->header('popular', 1);
			#End
			
			$data_body = array(
                'base_url' => base_url()					
			);
			$this->parser->parse('register_for_updates_success_view', $data_body);
				
			#Footer
            $this->footer();
            #End
		}
	
		
		
	}

/* End of file register_for_updates.php */
/* Location: ./application/controllers/register_for_updates.php */