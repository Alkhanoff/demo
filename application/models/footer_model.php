<?php
	/**************************************
	*
	* Author   : Orkhan Huseynov
	* Contacts : info@luxe.az
	*
	**************************************/
	class Footer_model extends CI_Model {
		
            var $footer_data = array();
		
            function __construct(){
		parent::__construct();
		$this->load->database();
                $this->load->helper('url');
		$this->load->model('options_model');
            }
            
            function set($key, $value){
            	$this->footer_data[$key] = $value;
            }
            
            function get(){
                $this->footer_data['base_url'] = base_url();
                $this->footer_data['site_url'] = site_url();
		$this->footer_data['footerText'] = $this->options_model->get('footerText');
				
		return $this->footer_data;	
            }
		
	}
?>