<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Main extends MY_Controller {


    public function __construct(){
          parent::__construct();
          date_default_timezone_set( 'Asia/Baku' );

          if(!$this->session->userdata('language')){

          $this->session->set_userdata('language', 'English');}
  }

//Main page
  function index()
  {
    if(getLang() == 'az'){
        $data['pub'] = $this->dtbs->homepub_az();
    }
    if(getLang() == 'en'){
        $data['pub'] = $this->dtbs->homepub_en();
    }
    $data['item'] = $this->dtbs->getdatas('sector_groups');
    $data['about'] = $this->dtbs->getdata('about');
    $this->load->view('front/mainPage' , $data);
  }

// About Page
 function about(){
   $this->load->view('front/about/about');
 }
 function about_group(){
   $this->load->view('front/about/about_group');
 }
 function management(){
   $this->load->view('front/about/management');
 }
 function managers(){
   $this->load->view('front/about/managers');
 }
 //End About

 //sectors
 function sectors(){
   $this->load->view('front/sectors/sectors');
 }
 function sectors_group(){
   $this->load->view('front/sectors/sectors_group');
 }
 //End sectors
 //Services
 function services(){
   $this->load->view('front/services/services');
 }
 function services_group(){
   $this->load->view('front/services/services_group');
 }
 //End Services
 //Careers
 function careers(){
   $this->load->view('front/careers/careers');
 }
 function online_application(){
   $this->load->view('front/careers/online_application');
 }
 function vacancies(){
   $this->load->view('front/careers/vacancies');
 }
 function selection_procedures(){
   $this->load->view('front/careers/selection_procedures');
 }
 function contact_us(){
   $this->load->view('front/careers/contact_us');
 }
 //End Careers

 //News
 function news(){
   $this->load->view('front/news/news');
 }
 function news_details(){
   $this->load->view('front/news/news_details');
 }
 //End news

 //Publications
 function publications(){
   $this->load->view('front/publications/publications');
 }
 function publications_details(){
   $this->load->view('front/publications/publications_details');
 }

//End Publications

//Contacts
function contacts(){
  $this->load->view('front/contacts/contacts');
}
//End publications

//site_map
function site_map(){
  $this->load->view('front/site_map/site_map');
}
//End site_map

//search
function search(){
  $this->load->view('front/search/search');
}
}
