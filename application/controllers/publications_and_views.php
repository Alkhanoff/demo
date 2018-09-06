<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
    /**************************************
    *
    * Author   : Orkhan Huseynov
    * Contacts : orkhan.huseynov@live.com
    *
    **************************************/

    class Publications_and_views extends CI_Controller {
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
	
	private function build_left_menu($year, $month){
            $htm = '<ul class="unstyled full-width level-1">';
            
            for($i=date('Y'); $i>=2008; $i--){
                if($year == $i && $month == 0){
                    $li_class = ' class="active-li"';
                }else{
                    $li_class = '';
                }
                $htm .= '<li'.$li_class.'>';
                $htm .= '<a href="'.base_url().'publications_and_views/index/'.$i.'/">'.$i.'</a>';
                
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
                    $htm .= '<li class="active-li"><a style="padding: 2px 0 2px 12px;background: url('.base_url().'images/sprites/li_arrow.jpg) no-repeat 0 4px;" href="'.base_url().'publications_and_views/'.$year.'/'.$i.'">'.$month_name.'</a></li>';
                }else{
                    $htm .= '<li><a style="padding: 2px 0 2px 12px;" href="'.base_url().'publications_and_views/index/'.$year.'/'.$i.'">'.$month_name.'</a></li>';
                }
                $i++;
            }
            $htm .= '</ul>';
            return $htm;
        }
	
	public function index($year=0, $month=0, $page=0){	    
	
            #Header
            $this->header('popular', 6);
            #End
            
            if(!isset($_REQUEST['pagesize'])){
	    	$perpage = 10;
	    }else{
	        $perpage = (integer) $_REQUEST['pagesize'];
	    }

            $most_viewed = $this->publications_and_views_model->get_most_viewed();
            $sections_publications_labels_list = $this->section_model->get_publications_labels_list(3, $_REQUEST);
            $sectors_publications_labels_list = $this->section_model->get_publications_labels_list(4, $_REQUEST);
            $search_list = $this->publications_and_views_model->get_search_list(0, 0, $month, $year, $page);
            $featured_list = $this->publications_and_views_model->get_featured_list();
            $research_list = $this->publications_and_views_model->get_research_list('en');
            $count = $this->publications_and_views_model->get_count($_REQUEST);
            
            $left_menu = $this->build_left_menu($year, $month);
            
            $config['base_url'] = base_url().'publications_and_views/index/'.$year.'/'.$month.'/';
    	    $config['total_rows'] = $count;	    
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
	        $config['per_page'] = 8;
	    	    	    	    
	    $request_uri = substr($_SERVER["REQUEST_URI"], strpos($_SERVER["REQUEST_URI"], '?'), 100000);
	    $this->pagination->initialize($config); 
	    $paging = $this->pagination->create_links();
	    if(strpos($request_uri, 'checkbox') > 0 || strpos($request_uri, 'pagesize') > 0){
	        $paging = str_replace('/">', '/'.$request_uri.'">', $paging);
	        $paging = str_replace('0">', '0'.$request_uri.'">', $paging);
	        $paging = str_replace('5">', '5'.$request_uri.'">', $paging);
	        $paging = str_replace('=5?pagesize=5', '=5', $paging);
	    }else{
	        $request_uri = '';
	    }
	    
	    $perpage_values = $this->build_perpage_values($perpage, $request_uri);
	    
	    $results_from = $page + 1;
	    $results_to = $page + $perpage;
	    if($results_to > $count){
	    	$results_to = $count;
	    }
	    
	    ($count > 0)? $display_results = '' : $display_results = 'display:none;';
		
		$lang = get_cookie('lang', TRUE);
		if(!$lang){
			$lang = 'en';
		}
		
		$most_viewed_this_week = ($lang == 'en')? 'Most viewed this week' : 'Həftə ərzində ən çox baxılanlar';
		$find_publications = ($lang == 'en')? 'Find publications' : 'Nəşrlər üzrə axtarış';
		$enter_keyword = ($lang == 'en')? 'Enter keyword' : 'Sözü daxil edin';
		$main_research_publications = ($lang == 'en')? 'Main research publications' : 'Əsas tədqiqat nəşrləri';
		$all_articles = ($lang == 'en')? 'All articles' : 'Bütün məqalələr'; 
		$explore_publications_by_sector_and_service = ($lang == 'en')? 'Explore publications by sector and service' : 'Nəşrləri sektor və xidmət üzrə axtar';
        $choose_service = ($lang == 'en')? 'Choose service(s)' : 'Xidmətləri seçin'; 
		$choose_sector = ($lang == 'en')? 'Choose seector(s)' : 'Sektorları seçin'; 
		$cancel = ($lang == 'en')? 'Cancel' : 'Imtina';
		
            #Body
            $data_body = array(
                'base_url' => base_url(),
                'most_viewed' => $most_viewed,                
                'sections_publications_labels_list' => $sections_publications_labels_list,
                'sectors_publications_labels_list' => $sectors_publications_labels_list,
                'search_list' => $search_list,
                'featured_list' => $featured_list,
                'research_list' => $research_list,
                'paging' => $paging,
                'count' => $count,
                'results_from' => $results_from,
                'results_to' => $results_to,
                'display_results' => $display_results,
                'perpage_values' => $perpage_values,
				'most_viewed_this_week' => $most_viewed_this_week,
				'find_publications' => $find_publications,
				'enter_keyword' => $enter_keyword,
				'main_research_publications' => $main_research_publications,
				'all_articles' => $all_articles,
				'explore_publications_by_sector_and_service' => $explore_publications_by_sector_and_service,
				'choose_service' => $choose_service,
				'choose_sector' => $choose_sector,
				'cancel' => $cancel,
				'left_menu' => $left_menu,
                );
            $this->parser->parse('publications_and_views_view', $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
	}

        public function details($id=0){
	    (integer) $id;
	
            #Header
            $this->header('popular', 6);
            #End

            $this->publications_and_views_model->increase_times_viewed($id);
            
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
			
            $details_arr = $this->publications_and_views_model->getDetails($id);
            $title = ($lang == 'en')? $details_arr[0]['title_en'] : $details_arr[0]['title_az'];
        	$details = ($lang == 'en')? $details_arr[0]['text_en'] : $details_arr[0]['text_az'];
            $file = $details_arr[0]['file'];
            $date = date('d/m/Y', strtotime($details_arr[0]['date']));

            if($file != ''){
                $file = '<a target="_blank" href="'.base_url().'uploads/'.$file.'"><img alt="" class="ms-asset-icon" border="0" src="'.base_url().'images/pdficon_small.png">&nbsp;Download pdf information</a>';
            }else{
                $file = '';
            }
                
                        
            #Body
            $data_body = array(
                'base_url' => base_url(),                
                     'title' => $title,
                     'details' => $details,
                     'file' => $file,
                     'date' => $date
                );
            $this->parser->parse('publications_and_views_details_view', $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
	}

        public function search($page=0){
            #Header
            $this->header('popular', 6);
            #End

            $ss = url_title(trim(xss_clean(strip_tags(strtolower($this->input->get('ss'))))));
            $ss_list = $this->publications_and_views_model->get_ss_list($ss, $page);
            $count = $this->publications_and_views_model->get_ss_count($ss);
            
            $config['base_url'] = base_url().'publications_and_views/search/';
	    $config['total_rows'] = $count;	    
	    $config['uri_segment'] = 3;
	    $config['prev_link'] = 'Prev'; 
	    $config['next_link'] = 'Next';
	    $config['num_tag_open'] = '<li style="clear:none;background:none;padding:0;">';
	    $config['num_tag_close'] = '</li>';
	    $config['prev_tag_open'] = '<li style="clear:none;background:none;padding:0;">';
	    $config['prev_tag_close'] = '</li>';
	    $config['next_tag_open'] = '<li style="clear:none;background:none;padding:0;">';
	    $config['next_tag_close'] = '</li>';
	    $config['cur_tag_open'] = '<li style="clear:none;background:none;padding:0;"><a class="current">';
	    $config['cur_tag_close'] = '</a></li>';
	    $config['first_tag_open'] = '<li style="clear:none;background:none;padding:0;">'; 
	    $config['first_tag_close'] = '</li>';
	    $config['first_link'] = 'First';
	    $config['last_tag_open'] = '<li style="clear:none;background:none;padding:0;">';
	    $config['last_tag_close'] = '</li>'; 
	    $config['last_link'] = 'Last';      
	    $config['per_page'] = 10;

            $this->pagination->initialize($config); 
	    $paging = $this->pagination->create_links();

            $paging = str_replace('/">', '/?ss='.url_title($ss).'">', $paging);
            $paging = str_replace('0">', '0/?ss='.url_title($ss).'">', $paging);

            $results_from = $page + 1;
	    $results_to = $page + 10;
	    if($results_to > $count){
	    	$results_to = $count;
	    }

            #Body
            $data_body = array(
                'base_url' => base_url(),                
                'ss' => $ss,
                'ss_list' => $ss_list,
                'count' => $count,
                'results_from' => $results_from,
                'results_to' => $results_to,
                'paging' => $paging                              
                );
            $this->parser->parse('publications_and_views_search_view', $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
        }
	
	private function build_perpage_values($perpage, $request_uri){
	    if(strpos($request_uri, 'pagesize=50') == 0){
	        $request_uri = str_replace('?pagesize=5', '', $request_uri);
	        $request_uri = str_replace('&pagesize=5', '', $request_uri);
	    }
	    if(strpos($request_uri, 'pagesize=100') == 0){
	        $request_uri = str_replace('?pagesize=10', '', $request_uri);
	        $request_uri = str_replace('&pagesize=10', '', $request_uri);
	    }
	    $request_uri = str_replace('?pagesize=20', '', $request_uri);
	    $request_uri = str_replace('&pagesize=20', '', $request_uri);
	    $request_uri = str_replace('?pagesize=50', '', $request_uri);
	    $request_uri = str_replace('&pagesize=50', '', $request_uri);
	    $request_uri = str_replace('?pagesize=100', '', $request_uri);
	    $request_uri = str_replace('&pagesize=100', '', $request_uri);
	
	    if($request_uri != ''){	        
	        $link = base_url().'publications_and_views'.$request_uri.'&amp;pagesize=';
	    }else{
	        $link = base_url().'publications_and_views/?pagesize=';
	    }
	
	    $htm = 'Results per page';
	    if($perpage == 5) {
	        $htm .= '<a class="selected" href="'.$link.'5" style="margin-left: 10px; ">5</a>';
	    }else{
	        $htm .= '<a href="'.$link.'5" style="margin-left: 10px; ">5</a>';
	    }
	    if($perpage == 10) {
	        $htm .= '<a class="selected" href="'.$link.'10" style="margin-left: 10px; ">10</a>';
	    }else{
	        $htm .= '<a href="'.$link.'10" style="margin-left: 10px; ">10</a>';
	    }
	    if($perpage == 20) {
	        $htm .= '<a class="selected" href="'.$link.'20" style="margin-left: 10px; ">20</a>';
	    }else{
	        $htm .= '<a href="'.$link.'20" style="margin-left: 10px; ">20</a>';
	    }
	    if($perpage == 50) {
	        $htm .= '<a class="selected" href="'.$link.'50" style="margin-left: 10px; ">50</a>';
	    }else{
	        $htm .= '<a href="'.$link.'50" style="margin-left: 10px; ">50</a>';
	    }
	    if($perpage == 100) {
	        $htm .= '<a class="selected" href="'.$link.'100" style="margin-left: 10px; ">100</a>';
	    }else{
	        $htm .= '<a href="'.$link.'100" style="margin-left: 10px; ">100</a>';
	    }
	    
	    return $htm;	    
	}
}

/* End of file publications_and_views.php */
/* Location: ./application/controllers/publications_and_views.php */