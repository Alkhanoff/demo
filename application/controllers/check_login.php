<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
    /**************************************
    *
    * Author   : Orkhan Huseynov
    * Contacts : orkhan.huseynov@live.com
    *
    **************************************/

    class Check_login extends CI_Controller {
        var $logged_in = FALSE;
        
        function __construct(){
            parent::__construct();
            
            $this->load->library('session');    
			$this->load->helper('cookie'); 
            $this->load->helper('url');
            $this->load->helper('security');
			$this->load->model('user_model');			
            $this->load->database();            		

            $this->db->query('SET NAMES utf8');
            header("Content-Type: text/html; charset=UTF-8");
            
        }       
	
		public function index($back_url=''){
            #Check Login
            if($this->user_model->checkLogin('', '', 5) === TRUE){
				set_cookie('ifrs_user', md5($this->user_model->login), 21600);
                redirect(site_url($back_url));
			}else{
				redirect(site_url('ControlPanel/login/index/5/ifrs/'));
			}
            #End
		}
		
		public function logout($back_url=''){
			$this->user_model->logout();
			delete_cookie('ifrs_user');
			redirect(site_url($back_url));
		}
	}

/* End of file check_login.php */
/* Location: ./application/controllers/check_login.php */