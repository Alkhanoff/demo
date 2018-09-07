<?php
    /**************************************
    *
    * Author   : Orkhan Huseynov
    * Contacts : orkhan.huseynov@live.com
    *
    **************************************/
    class Signout extends CI_Controller {
        function __construct(){
            parent::__construct();
            
            $this->load->library('session');
            $this->load->helper('url');
            $this->load->database();
            $this->load->model('user_model');

            $this->db->query('SET NAMES utf8');
            header("Content-Type: text/html; charset=UTF-8");
    }

    function index(){
        $this->user_model->logout();
        redirect(base_url());
    }    
}