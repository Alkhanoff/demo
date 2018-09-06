<?php
	/**************************************
	*
	* Author   : Orkhan Huseynov
	* Contacts : orkhan.huseynov@live.com
	*
	**************************************/
	class Header_model extends CI_Model {
            var $header_data = array();
            var $ajaxLinks = true;
		
            function __construct(){
                parent::__construct();
                $this->load->database();
                $this->load->library('session');
                $this->load->model('options_model');
                $this->load->model('user_model');
                $this->load->model('section_model');
                $this->load->helper('url');
            }
		
            function set($key, $value){
            	$this->header_data[$key] = $value;
            }

            function toggleAjaxLinks($value){
                $this->ajaxLinks = $value;
            }
		
            function get($sectionid=0, $mode='popular'){
                $this->header_data['charset'] = $this->options_model->get('charset');
                $this->header_data['meta_keywords'] = $this->options_model->get('meta_keywords');
                $this->header_data['meta_description'] = $this->options_model->get('meta_description');
                $this->header_data['meta_email'] = $this->options_model->get('meta_email');
                $this->header_data['meta_author'] = $this->options_model->get('meta_author');
                $this->header_data['pageTitle'] = $this->options_model->get('pageTitle');
                $this->header_data['username'] = $this->user_model->getLoggedInUserName();
                $this->header_data['headMenu'] = $this->section_model->getHeadMenu($this->ajaxLinks);
                $this->header_data['submenu'] = $this->section_model->getSubMenu($sectionid, $mode);

                $this->header_data['site_url'] = site_url();
                $this->header_data['base_url'] = base_url();
				$this->header_data['current_url'] = str_replace('/', '~', uri_string(current_url()));

                return $this->header_data;
            }
	}