<?php
    /**************************************
    *
    * Author   : Orkhan Huseynov
    * Contacts : orkhan.huseynov@live.com
    *
    **************************************/
    class Signin extends CI_Controller {
        function __construct(){
            parent::__construct();

            $this->load->library('parser');
            $this->load->library('session');
            $this->load->library('form_validation');
            $this->load->helper('url');
            $this->load->database();
            $this->load->model('user_model');
            $this->load->helper('security');

            $this->db->query('SET NAMES utf8');
            header("Content-Type: text/html; charset=UTF-8");
    }

    function index(){
        $this->form_validation->set_error_delimiters('<span class="form_error">', '</span>');
        $this->form_validation->set_rules('login', 'Логин', 'trim|alpha_dash|required|xss_clean|min_length[3]|max_length[20]');            
        $this->form_validation->set_rules('password', 'Пароль', 'trim|required|xss_clean|min_length[6]|max_length[30]');
        $value_login = $this->input->post(xss_clean(trim(strip_tags('login'))));            
        $value_password = $this->input->post(xss_clean(trim(strip_tags('password'))));
            
        if($this->form_validation->run() === false){
            redirect(base_url().'index/index/1/validationerror/');
        }else{
            if($this->user_model->checkLogin($value_login, $value_password, 10, site_url('index/index/1/success/')) == false){
                redirect(base_url().'index/index/1/loginerror/');
            }else{
                redirect(base_url().'index/index/1/success/');
            }
        }
    }    
}