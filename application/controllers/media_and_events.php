<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
    /**************************************
    *
    * Author   : Orkhan Huseynov
    * Contacts : orkhan.huseynov@live.com
    *
    **************************************/

    class Media_and_events extends CI_Controller {
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
            $this->load->model('news_model');
			$this->load->model('events_model');
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
	
	private function build_option_values($parent, $sectionid){
            if($parent == 3){
                $htm = '<option selected="selected" value="0">All services</option>';
            }else{
                $htm = '<option selected="selected" value="0">All sectors</option>';
            }
         
            $htm .= str_replace('<option value="0">&nbsp;</option>', '', $this->section_model->get_options_tree($sectionid, $parent));
            return $htm;
        }
        
        private function build_month_values($month){
            $htm = '<option value="0">All months</option>';
            
            $time = strtotime('-1 month', time());
            $i = 1;
            while($i <= 12){
                if(date('Y-m', $time) == $month){
                    $htm .= '<option selected="selected" value="'.date('Y-m', $time).'">'.date('M Y', $time).'</option>';
                }else{
                    $htm .= '<option value="'.date('Y-m', $time).'">'.date('M Y', $time).'</option>';
                }
                $time = strtotime('-1 month', $time);
                $i++;
            }     
            return $htm;      
        }
        
        private function build_year_values($year){
            $htm = '<option value="0">All years</option>'; 
            if(date('Y') == $year){
                $htm .= '<option selected="selected" value="'.date('Y').'">'.date('Y').'</option>';
            }else{
                $htm .= '<option value="'.date('Y').'">'.date('Y').'</option>';
            }
            if(date('Y', strtotime('-1 year', time())) == $year){
                $htm .= '<option selected="selected" value="'.date('Y', strtotime('-1 year', time())).'">'.date('Y', strtotime('-1 year', time())).'</option>';
            }else{
                $htm .= '<option value="'.date('Y', strtotime('-1 year', time())).'">'.date('Y', strtotime('-1 year', time())).'</option>';
            }
            return $htm;            
        }
        
        private function build_left_menu($year, $month){
            $htm = '<ul class="unstyled full-width level-1">';
            
            for($i=date('Y'); $i>=2008; $i--){
                if($year == $i && $month == 0){
                    $li_class = ' class="active-li"';
                }else{
                    $li_class = '';
                }
                $htm .= '<li'.$li_class.'>';
                $htm .= '<a href="'.base_url().'media_and_events/news/'.$i.'/">'.$i.'</a>';
                
                if($year == $i){
                    $htm .= $this->attach_left_menu_months($i, $month);
                }
                
                $htm .= '</li>';
            }
            
            $htm .= '</ul>';
            return $htm;
        }
        
        private function attach_left_menu_months($year, $month){
            $lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
            
            $months_array = array(
                1 => array(
                        'en' => 'January',
                        'az' => 'Yanvar'
                    ),
                2 => array(
                        'en' => 'February',
                        'az' => 'Fevral'
                    ),
                3 => array(
                        'en' => 'March',
                        'az' => 'Mart'
                    ),
                4 => array(
                        'en' => 'April',
                        'az' => 'Aprel'
                    ),
                5 => array(
                        'en' => 'May',
                        'az' => 'May'
                    ),
                6 => array(
                        'en' => 'June',
                        'az' => 'Iyun'
                    ),
                7 => array(
                        'en' => 'July',
                        'az' => 'Iyul'
                    ),
                8 => array(
                        'en' => 'Auqust',
                        'az' => 'Avqust'
                    ),
                9 => array(
                        'en' => 'September',
                        'az' => 'Sentyabr'
                    ),
                10 => array(
                        'en' => 'October',
                        'az' => 'Oktyabr'
                    ),
                11 => array(
                        'en' => 'November',
                        'az' => 'Noyabr'
                    ),
                12 => array(
                        'en' => 'December',
                        'az' => 'Dekabr'
                    ),
            );
            
            $htm = '<ul class="unstyled active-ul level-2">';
            $i = 1;
            while($i <= 12){
                $month_name = ($lang == 'en')? $months_array[$i]['en'] : $months_array[$i]['az'];
                
                if($month == $i){
                    $htm .= '<li class="active-li"><a style="padding: 2px 0 2px 12px;background: url('.base_url().'images/sprites/li_arrow.jpg) no-repeat 0 4px;" href="'.base_url().'media_and_events/news/'.$year.'/'.$i.'">'.$month_name.'</a></li>';
                }else{
                    $htm .= '<li><a style="padding: 2px 0 2px 12px;" href="'.base_url().'media_and_events/news/'.$year.'/'.$i.'">'.$month_name.'</a></li>';
                }
                $i++;
            }
            $htm .= '</ul>';
            return $htm;
        }
	
	public function index()	{
	        #Header
            $this->header('popular', 7);
            #End
                        
            $details = $this->content_model->getArticleDetails(7);

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
            $this->parser->parse('media_and_events_view', $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
		}

    	public function news($year=0, $month=0, $page=0){
            #Header
            $this->header('popular', 100);
            #End
                        
            $details = $this->content_model->getArticleDetails(100);

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

            $featured_list = $this->news_model->get_featured_list();
            
			$search_list = $this->news_model->get_search_list(0, 0, $month, $year, $page);
			$count = $this->news_model->get_count(0, 0, $month, $year);
			
			$left_menu = $this->build_left_menu($year, $month);
            
			$config['base_url'] = base_url().'media_and_events/news/'.$year.'/'.$month.'/';
			$config['total_rows'] = $count;
			$config['per_page'] = 8;
			$config['uri_segment'] = 5;
			$config['prev_link'] = 'Previous'; 
			$config['next_link'] = 'Next';
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
			
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
			
			$featured_news = ($lang == 'en')? 'Featured news' : 'Yeni xəbərlər';
			$search_news = ($lang == 'en')? 'Search news' : 'Xəbərlər üzrə axtarış';
			$by_sector = ($lang == 'en')? 'By sector' : 'Sektor';
			$by_service = ($lang == 'en')? 'By service' : 'Xidmət';
			$by_month = ($lang == 'en')? 'By month' : 'Ay';
			$by_year = ($lang == 'en')? 'By year' : 'İl';
			$results = ($lang == 'en')? 'Results' : 'Nəticələr';
			$of = ($lang == 'en')? 'Of' : '-';
			
       
            #Body
            $data_body = array(
                'base_url' => base_url(),
                'display_inline_editor' => $display_inline_editor,
                'featured_list' => $featured_list,
				'search_list' => $search_list,
				'paging' => $paging,
                'count' => $count,
                'results_from' => $results_from,
                'results_to' => $results_to,
                'display_results' => $display_results,
                'left_menu' => $left_menu,
				
				'featured_news' => $featured_news,
				'search_news' => $search_news,
				'by_sector' => $by_sector,
				'by_service' => $by_service,
				'by_month' => $by_month,
				'by_year' => $by_year,
				'results' => $results,
				'of' => $of,
				
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
            $this->parser->parse('media_and_events_news_view', $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
	}
	public function news_details($id=0){
	    (integer) $id;
	
        #Header
        $this->header('popular', 100);
        #End
		
		$lang = get_cookie('lang', TRUE);
		if(!$lang){
			$lang = 'en';
		}
            
        $details_arr = $this->news_model->getNewsDetails($id);
        $title = ($lang == 'en')? $details_arr[0]['title_en'] : $details_arr[0]['title_az'];
		$details = ($lang == 'en')? $details_arr[0]['text_en'] : $details_arr[0]['text_az'];
		$date = date('d/m/Y', strtotime($details_arr[0]['date']));
                        
        #Body
        $data_body = array(
        	'base_url' => base_url(), 
			'date' => $date,
            'title' => $title,
            'details' => $details                                            
            );
        $this->parser->parse('media_and_events_news_details_view', $data_body);
        #End Body

        #Footer
        $this->footer();
        #End
	}
		
	public function events($page=0){
        #Header
        $this->header('popular', 101);
        #End
                        
        $search_list = $this->events_model->get_search_list($page);
		$count = $this->events_model->get_count();
            
		$config['base_url'] = base_url().'media_and_events/events/';
		$config['total_rows'] = $count;
		$config['per_page'] = 10;
		$config['uri_segment'] = 3;
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
		$results = ($lang == 'en')? 'Results' : 'Nəticələr';
		$of = ($lang == 'en')? 'Of' : '-';
       
        #Body
        $data_body = array(
        	'base_url' => base_url(),
            'search_list' => $search_list,
			'paging' => $paging,
            'count' => $count,
            'results_from' => $results_from,
            'results_to' => $results_to,
            'display_results' => $display_results,
			'results' => $results,
			'of' => $of
        );
        $this->parser->parse('media_and_events_events_view', $data_body);
        #End Body

        #Footer
        $this->footer();
        #End
	}
		
	public function events_details($id=0){
	    (integer) $id;
	
        #Header
        $this->header('popular', 101);
        #End
		
		$lang = get_cookie('lang', TRUE);
		if(!$lang){
			$lang = 'en';
		}
            
		$details_arr = $this->events_model->getDetails($id);
		$title = ($lang == 'en')? $details_arr[0]['title_en'] : $details_arr[0]['title_az'];
        $details = ($lang == 'en')? $details_arr[0]['text_en'] : $details_arr[0]['text_az'];
		$date = date('d/m/Y', strtotime($details_arr[0]['date']));
                        
        #Body
        $data_body = array(
        	'base_url' => base_url(), 
			'date' => $date,
            'title' => $title,
            'details' => $details                                            
            );
        $this->parser->parse('media_and_events_events_details_view', $data_body);
        #End Body

        #Footer
        $this->footer();
        #End
	}
		
    public function media_spokespeople(){
        #Header
        $this->header('popular', 102);
        #End
                        
        $details = $this->content_model->getArticleDetails(102);            
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
            $display_accordion = 'class="accordion_disabled"';
        }else{
            $display_inline_editor = '';
            $display_accordion = 'class="accordion"';
        }

            
        #Body
        $data_body = array(
            'base_url' => base_url(),            
                
            'display_inline_editor' => $display_inline_editor,
            'display_accordion' => $display_accordion, 

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
       	$this->parser->parse('media_and_events_media_spokespeople_view', $data_body);
        #End Body

        #Footer
        $this->footer();
        #End
	}
}

/* End of file media_and_events.php */
/* Location: ./application/controllers/media_and_events.php */