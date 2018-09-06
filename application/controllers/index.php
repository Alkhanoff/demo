<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
    /**************************************
    *
    * Author   : Orkhan Huseynov
    * Contacts : orkhan.huseynov@live.com
    *
    **************************************/

    class Index extends CI_Controller {
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
			$this->load->model('publications_and_views_model');
			$this->load->model('news_model');

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
		    redirect(base_url().'index/default_page/');
			$data_body = array(
                'base_url' => base_url()
				);
			$this->parser->parse('index_view', $data_body);
		}

    public function testdemo(){
      $result = $this->dtbs->getdatas('cmsnews');
      $data['item'] =$result;
      $this->load->view('demotest' , $data);
    }

		public function default_page(){
            #Header
            $this->header('popular', 1);
            #End

			$default_publications = $this->publications_and_views_model->get_default_page_list();
			$default_publications_thumbs = $this->publications_and_views_model->get_default_page_list_thumbs();
			$whatsnew_list = $this->news_model->get_whatsnew_list();

			$services_list = $this->section_model->get_home_page_list(4);
			$services_list = str_replace('{base_url}', base_url(), $services_list);

			$default_page_carousel = $this->publications_and_views_model->get_default_page_carousel();

			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}

			$details = $this->content_model->getArticleDetails(1, $lang);

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
				'default_publications' => $default_publications,
                'default_publications_thumbs' => $default_publications_thumbs,
				'whatsnew_list' => $whatsnew_list,
				'services_list' => $services_list,
				'default_page_carousel' => $default_page_carousel,

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
            $this->parser->parse('default_view', $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
		}

		public function legal_disclaimer(){
            #Header
            $this->header('popular', 114);
            #End

			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}

			$details = $this->content_model->getArticleDetails(114, $lang);

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
            $this->parser->parse('legal_disclaimer_view', $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
		}

		public function lang($lang='en', $back_url=''){
			set_cookie('lang', $lang, 1000000000);

			if($back_url != ''){
				redirect(site_url(str_replace('~', '/', $back_url)));
			}else{
				redirect(site_url('index/default_page'));
			}
		}

		/*public function update_area($section){
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}

			$this->content_model->update_area($section,
				$this->input->post('content_1'),
				$this->input->post('content_2'),
				$this->input->post('content_3'),
				$this->input->post('content_4'),
				$this->input->post('content_5'),
				$this->input->post('content_6'),
				$this->input->post('content_7'),
				$this->input->post('content_8'),
				$this->input->post('content_9'),
				$this->input->post('content_10'),
				$this->input->post('content_11'),
				$this->input->post('content_12'),
				$this->input->post('content_13'),
				$this->input->post('content_14'),
				$this->input->post('content_15'),
				$this->input->post('content_16'),
				$this->input->post('content_17'),
				$this->input->post('content_18'),
				$this->input->post('content_19'),
				$this->input->post('content_20'),
				$this->input->post('content_21'),
				$this->input->post('content_22'),
				$this->input->post('content_23'),
				$this->input->post('content_24'),
				$this->input->post('content_25'),
				$this->input->post('content_26'),
				$this->input->post('content_27'),
				$this->input->post('content_28'),
				$this->input->post('content_29'),
				$this->input->post('content_30'),
				$this->input->post('content_31'),
				$this->input->post('content_32'),
				$this->input->post('content_33'),
				$this->input->post('content_34'),
				$this->input->post('content_35'),
				$this->input->post('content_36'),
				$this->input->post('content_37'),
				$this->input->post('content_38'),
				$this->input->post('content_39'),
				$this->input->post('content_40'),
				$lang);

			echo 1;

		}*/

                public function update_area($section){
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}

			$data_array = array(1 => $this->input->post('content_1'),
							   2 => $this->input->post('content_2'),
							   3 => $this->input->post('content_3'),
							   4 => $this->input->post('content_4'),
							   5 => $this->input->post('content_5'),
							   6 => $this->input->post('content_6'),
							   7 => $this->input->post('content_7'),
							   8 => $this->input->post('content_8'),
							   9 => $this->input->post('content_9'),
							   10 => $this->input->post('content_10'),
							   11 => $this->input->post('content_11'),
							   12 => $this->input->post('content_12'),
							   13 => $this->input->post('content_13'),
							   14 => $this->input->post('content_14'),
							   15 => $this->input->post('content_15'),
							   16 => $this->input->post('content_16'),
							   17 => $this->input->post('content_17'),
							   18 => $this->input->post('content_18'),
							   19 => $this->input->post('content_19'),
							   20 => $this->input->post('content_20'),
							   21 => $this->input->post('content_21'),
							   22 => $this->input->post('content_22'),
							   23 => $this->input->post('content_23'),
							   24 => $this->input->post('content_24'),
							   25 => $this->input->post('content_25'),
							   26 => $this->input->post('content_26'),
							   27 => $this->input->post('content_27'),
							   28 => $this->input->post('content_28'),
							   29 => $this->input->post('content_29'),
							   30 => $this->input->post('content_30'),
							   31 => $this->input->post('content_31'),
							   32 => $this->input->post('content_32'),
							   33 => $this->input->post('content_33'),
							   34 => $this->input->post('content_34'),
							   35 => $this->input->post('content_35'),
							   36 => $this->input->post('content_36'),
							   37 => $this->input->post('content_37'),
							   38 => $this->input->post('content_38'),
							   39 => $this->input->post('content_39'),
							   40 => $this->input->post('content_40'));

			$this->content_model->update_area($section, $data_array, $lang);
			echo 1;
		}

		public function sitemap(){
		    #Header
            $this->header('popular', 121);
            #End

			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}

			$details = $this->content_model->getArticleDetails(121, $lang);

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
            $this->parser->parse('sitemap_view', $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
		}


	}

/* End of file index.php */
/* Location: ./application/controllers/index.php */
