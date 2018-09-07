<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
    /**************************************
    *
    * Author   : Orkhan Huseynov
    * Contacts : orkhan.huseynov@live.com
    *
    **************************************/

    class Careers extends CI_Controller {
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
			$this->load->model('vacancies_model');
			$this->load->model('applications_model');
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
	
		public function index(){
            #Header
            $this->header('popular', 8);
            #End
            
            $details = $this->content_model->getArticleDetails(8);

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
            $this->parser->parse('careers_view', $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
		}
		
		public function vacancies($page=0){
            #Header
            $this->header('popular', 104);
            #End
                        
            $details = $this->content_model->getArticleDetails(104);

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
            
			$search_list = $this->vacancies_model->get_search_list($page);
			$count = $this->vacancies_model->get_count();
            
			$config['base_url'] = base_url().'careers/vacancies/';
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
       
            #Body
            $data_body = array(
                'base_url' => base_url(),
                'display_inline_editor' => $display_inline_editor,                
				'search_list' => $search_list,
				'paging' => $paging,
                'count' => $count,
                'results_from' => $results_from,
                'results_to' => $results_to,
                'display_results' => $display_results,
				
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
            $this->parser->parse('careers_vacancies_view', $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
		}
    	public function vacancies_details($id=0){
	    	(integer) $id;
	
			#Header
			$this->header('popular', 104);
			#End
			
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
			
			$details_arr = $this->vacancies_model->getDetails($id);
			$title = ($lang == 'en')? $details_arr[0]['title_en'] : $details_arr[0]['title_az'];
			$details = ($lang == 'en')? $details_arr[0]['text_en'] : $details_arr[0]['text_az'];			
							
			#Body
			$data_body = array(
				'base_url' => base_url(), 				
				'title' => $title,
				'details' => $details                                            
				);
			$this->parser->parse('careers_vacancies_details_view', $data_body);
			#End Body
	
			#Footer
			$this->footer();
			#End
		}
		
		public function success(){
			#Header
			$this->header('popular', 104);
			#End
			
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
			
			#Body
			$data_body = array(
				'base_url' => base_url()		                                           
				);
			$this->parser->parse('careers_success_view', $data_body);
			#End Body
	
			#Footer
			$this->footer();
			#End
		}
        
        public function online_application($save=''){
        		
			#Header
			$this->header('popular', 104);
			#End
			
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
			
			$this->form_validation->set_error_delimiters('<span class="form_error">', '</span>');
			
			#Body
			if($save == ''){
				$data_body = array(
                	'base_url' => base_url(),
					'contact_preference_values' => $this->build_contact_preference_values(),
					'current_salary_values' => $this->build_current_salary_values(),
					'salary_expectation_values' => $this->build_salary_expectation_values(),
					'gender_values' => $this->build_gender_values(),
					'nationality_values' => $this->build_nationality_values(),
					'ethnicity_values' => $this->build_ethnicity_values(),
					'registered_disabled_values' => $this->build_registered_disabled_values(),
					'vacancies_values' => $this->vacancies_model->get_form_values()
				);
				$this->parser->parse('careers_online_application_view', $data_body);
			
			}else{
				$this->form_validation->set_rules('firstname', 'First name', 'trim|required|xss_clean|min_length[2]|max_length[150]');
				$this->form_validation->set_rules('middlename', 'Middle name', 'trim|xss_clean|min_length[2]|max_length[150]');
				$this->form_validation->set_rules('lastname', 'Last name', 'trim|required|xss_clean|min_length[2]|max_length[150]');
				
				$this->form_validation->set_rules('email', 'Email', 'trim|required|xss_clean|valid_email|min_length[2]|max_length[150]|matches[confirm_email]');
				$this->form_validation->set_rules('confirm_email', 'Confirm email', 'trim|required|xss_clean|valid_email|min_length[2]|max_length[150]');
				$this->form_validation->set_rules('password', 'Password', 'trim|required|xss_clean|alpha_dash|min_length[2]|max_length[150]');
				
				$this->form_validation->set_rules('mobile', 'Mobile', 'trim|required|xss_clean|min_length[7]|max_length[15]');
				
				$this->form_validation->set_rules('home', 'Home telephone', 'trim|xss_clean|min_length[7]|max_length[15]');
				$this->form_validation->set_rules('address', 'Home address', 'trim|xss_clean|min_length[2]|max_length[500]');
				$this->form_validation->set_rules('post_code', 'Post code', 'trim|xss_clean|min_length[4]|max_length[15]');						
				$this->form_validation->set_rules('contact_preference', 'Contact preference', 'trim|required|xss_clean|min_length[2]|max_length[150]');
				
				$this->form_validation->set_rules('current_employer', 'Current employer', 'trim|required|xss_clean|min_length[2]|max_length[150]');
				$this->form_validation->set_rules('current_job_title', 'Current job title', 'trim|required|xss_clean|min_length[2]|max_length[150]');
				$this->form_validation->set_rules('current_salary', 'Current salary', 'trim|required|xss_clean|min_length[2]|max_length[150]');
				$this->form_validation->set_rules('salary_expectation', 'Salary expectation', 'trim|required|xss_clean|min_length[2]|max_length[150]');
				
				$this->form_validation->set_rules('professional_qualifications[]', 'Professional qualifications', 'trim|xss_clean|min_length[2]|max_length[150]');
				$this->form_validation->set_rules('other_professional_qualifications', 'Other professional qualifications', 'trim|xss_clean|min_length[2]|max_length[150]');
				
				$this->form_validation->set_rules('info', 'Further information', 'trim|required|xss_clean|min_length[2]|max_length[1000]');
				
				$this->form_validation->set_rules('date_of_birth', 'Date of birth', 'trim|xss_clean|min_length[2]|max_length[15]');			
				$this->form_validation->set_rules('gender', 'Gender', 'trim|xss_clean|min_length[2]|max_length[150]');				
				$this->form_validation->set_rules('nationality', 'Nationality', 'trim|xss_clean|min_length[2]|max_length[150]');
				$this->form_validation->set_rules('ethnicity', 'Ethnicity', 'trim|xss_clean|min_length[2]|max_length[150]');
				$this->form_validation->set_rules('registered_disabled', 'Registered disabled', 'trim|xss_clean|min_length[2]|max_length[150]');
				
				$this->form_validation->set_rules('special_requirements', 'Special requirements', 'trim|xss_clean|min_length[2]|max_length[150]');
				
				$this->form_validation->set_rules('vacancy_id', 'Vacancy', 'trim|xss_clean|max_length[150]|greater_than[0]');
				
				
				$firstname = $this->input->post(xss_clean(trim(strip_tags('firstname'))));
				$middlename = $this->input->post(xss_clean(trim(strip_tags('middlename'))));
				$lastname = $this->input->post(xss_clean(trim(strip_tags('lastname'))));
				
				$email = $this->input->post(xss_clean(trim(strip_tags('email'))));
				$confirm_email = $this->input->post(xss_clean(trim(strip_tags('confirm_email'))));
				$password = $this->input->post(xss_clean(trim(strip_tags('password'))));
				
				$mobile = $this->input->post(xss_clean(trim(strip_tags('mobile'))));
				
				$home = $this->input->post(xss_clean(trim(strip_tags('home'))));
				$address = $this->input->post(xss_clean(trim(strip_tags('address'))));
				$post_code = $this->input->post(xss_clean(trim(strip_tags('post_code'))));
				$contact_preference = $this->input->post(xss_clean(trim(strip_tags('contact_preference'))));
				
				$current_employer = $this->input->post(xss_clean(trim(strip_tags('current_employer'))));
				$current_job_title = $this->input->post(xss_clean(trim(strip_tags('current_job_title'))));
				$current_salary = $this->input->post(xss_clean(trim(strip_tags('current_salary'))));
				$salary_expectation = $this->input->post(xss_clean(trim(strip_tags('salary_expectation'))));
				
				$professional_qualifications = $this->input->post(xss_clean(trim(strip_tags('professional_qualifications'))));
				$other_professional_qualifications = $this->input->post(xss_clean(trim(strip_tags('other_professional_qualifications'))));
				
				$info = $this->input->post(xss_clean(trim(strip_tags('info'))));
				
				$date_of_birth = $this->input->post(xss_clean(trim(strip_tags('date_of_birth'))));
				$gender = $this->input->post(xss_clean(trim(strip_tags('gender'))));
				$nationality = $this->input->post(xss_clean(trim(strip_tags('nationality'))));
				$ethnicity = $this->input->post(xss_clean(trim(strip_tags('ethnicity'))));
				$registered_disabled = $this->input->post(xss_clean(trim(strip_tags('registered_disabled'))));
				
				$special_requirements = $this->input->post(xss_clean(trim(strip_tags('special_requirements'))));
				
				$vacancy_id = $this->input->post(xss_clean(trim(strip_tags('vacancy_id'))));
				
				$config['upload_path'] = './uploads/';
		    	$config['allowed_types'] = 'pdf|doc|docx';
		    	$config['max_size']	= '10000';
		    	$this->load->library('upload', $config);
														
				if ($this->form_validation->run() == FALSE || !$this->upload->do_upload()){
					$upload_error = $this->upload->display_errors();
					
					$data_body = array(
                		'base_url' => base_url(),
						'contact_preference_values' => $this->build_contact_preference_values($contact_preference),
						'current_salary_values' => $this->build_current_salary_values($current_salary),
						'salary_expectation_values' => $this->build_salary_expectation_values($salary_expectation),
						'gender_values' => $this->build_gender_values($gender),
						'nationality_values' => $this->build_nationality_values($nationality),
						'ethnicity_values' => $this->build_ethnicity_values($ethnicity),
						'registered_disabled_values' => $this->build_registered_disabled_values($registered_disabled),
						'vacancies_values' => $this->vacancies_model->get_form_values($vacancy_id),
						'upload_error' => $upload_error
					);
					$this->parser->parse('careers_online_application_view', $data_body);
				}else{
					$data = $this->upload->data();
                    $cv = $data['full_path'];
                    
                    #TODO: register user [done]
                    $user_id = $this->user_model->add($email, $password, 10, $firstname, $lastname, $email);
                    #
                    
                    $professional_qualifications = implode(", ", $professional_qualifications);
                    
					$this->applications_model->add($vacancy_id, $firstname, $middlename, $lastname, $user_id, $mobile, $home, $address, $post_code, $contact_preference,
        				$current_employer, $current_job_title, $current_salary, $salary_expectation, $professional_qualifications,
        				$other_professional_qualifications, $cv, $date_of_birth, $gender, $nationality, $ethnicity, $registered_disabled, $special_requirements,
        				$info);
        				
					#TODO: add email sending [done]
					$this->applications_model->notify_by_mail_after_submit($user_id);
					#
					
					header('Location:'.site_url('careers/success'));
					exit;
				}
			}			
			#End Body
	
			#Footer
			$this->footer();
			#End
		}
		
		public function track_application_status(){	
			//echo $this->session->userdata('login');
				
			if($this->logged_in != TRUE){
				redirect(site_url('careers/login/'));
				exit();
            }
            
            #Header
			$this->header('popular', 104);
			#End
			
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
			
			$data_body = array(
                	'base_url' => base_url(),
					'applications_list' => $this->applications_model->get_list_by_current_user()
				);
				$this->parser->parse('careers_track_application_status_view', $data_body);
			
			#Footer
			$this->footer();
			#End
		}
		
		public function login(){
			#Header
			$this->header('popular', 104);
			#End
			
			$lang = get_cookie('lang', TRUE);
			if(!$lang){
				$lang = 'en';
			}
			
			$required_group = 10;
			$back_url='careers/track_application_status/';
			$both_required_class = '';
			$error_message = '';
 			
			if(($this->input->post('login') != '') && ($this->input->post('password') != '')){
				if(($this->input->post('login') != 'Login') && ($this->input->post('password') != 'password')){
					$login = addslashes(strip_tags(trim($this->input->post('login'))));
					$password = strip_tags(trim($this->input->post('password')));
									
					if(!isset($back_url) || $back_url == '{back_url}' || $back_url == '' ){
						$back_url = 'careers/';
					}
									
					$this->user_model->checkLogin($login, $password, $required_group, site_url($back_url), site_url('careers/fail'));
				}else{
					$both_required_class = 'both_required';
				}
			}	
			
			$data_login = array(
								'site_url' => site_url(),
								'base_url' => base_url(),
								'both_required' => $both_required_class,
								'login_fail' => $error_message,
								'required_group' => $required_group,
								'back_url' => $back_url
								);
			$this->parser->parse('/login_view', $data_login);
			
			#Footer
			$this->footer();
			#End
		}
		
		public function fail(){
			#Header
			$this->header('popular', 104);
			#End
			
			$both_required_class = '';
			
			$error_message = 'Your credentials are not valid.';
			$data_login = array(
								'site_url' => site_url(),
								'base_url' => base_url(),
								'both_required' => $both_required_class,
								'login_fail' => $error_message,
								'required_group' => '',
								'back_url' => ''
								);
			$this->parser->parse('/login_view', $data_login);
			
			#Footer
			$this->footer();
			#End
		}
		
		public function reminder(){
			#Header
			$this->header('popular', 104);
			#End
			
			$this->load->library('email');
			$this->load->helper('email');
			
			$new_password = substr(md5(rand(0, 100000000)), 0, 6);
			$meta_email = "info@bakertillyaz.az";			
			$view_file_name = '/reminder_view';
			$error_message = '';
			$both_required_class = '';
			
			$message = '{unwrap}Dear Sir/Madam,{/unwrap}
			
{unwrap}Thank you for your enquiry asking to be reminded of your password for Your Account.{/unwrap}

{unwrap}Your password is '.$new_password.'{/unwrap}

{unwrap}Best Regards,{/unwrap}
{unwrap}Baker Tilly Azerbaijan Recruitment Team{/unwrap}



{unwrap}This is an automatically generated email.  Please do not reply to the address above.{/unwrap}

{unwrap}This email is sent from an outgoing mail address which does not receive incoming messages. Please do not reply to this email. If you need to contact us, telephone numbers and/or email addresses for our Recruitment teams are available on the careers pages of our country websites.
{/unwrap}
';
						
			if(($this->input->post('email') != '')){ 
				if(($this->input->post('email') != 'Email')){
					if(valid_email($this->input->post('email'))){
						if($this->user_model->checkUsername($this->input->post('email'))){
							$user_id = $this->user_model->checkUsername($this->input->post('email'));
							#Send new password
							$this->email->from($meta_email);
							$this->email->to($this->input->post('email'));
							$this->email->subject('Password – Baker Tilly Recruitment Section');
							$this->email->message($message);
							$this->email->send();
								
							#End							
							$this->user_model->update($user_id, $new_password);
							$error_message = '';
							$view_file_name = '/reminder_successful_view';
						}else{
							$error_message = 'The username wasn\'t found in the database.';
						}
					}else{
						$error_message = 'Please, enter the correct email.';
					}
				}else{
					$both_required_class = 'both_required';
				}
			}

			$data_reminder = array(
								'site_url' => site_url(),
								'base_url' => base_url(),
								'both_required' => $both_required_class,
								'login_fail' => $error_message		
								);
			$this->parser->parse($view_file_name, $data_reminder);
			
			#Footer
			$this->footer();
			#End
		}
		
		public function contact(){
			#Header
			$this->header('popular', 104);
			#End
							
			$this->form_validation->set_error_delimiters('<span class="form_error">', '</span>');
			
			$this->form_validation->set_rules('name', 'Name', 'trim|required|xss_clean|min_length[2]|max_length[150]');
			$this->form_validation->set_rules('email', 'Email', 'trim|xss_clean|valid_email|min_length[2]|max_length[150]');
			$this->form_validation->set_rules('phone', 'Phone', 'trim|xss_clean|min_length[2]|max_length[150]');
			$this->form_validation->set_rules('message', 'Message', 'trim|required|xss_clean|min_length[2]|max_length[15000]');
			
			$name = $this->input->post(xss_clean(trim(strip_tags('name'))));
			$email = $this->input->post(xss_clean(trim(strip_tags('email'))));
			$phone = $this->input->post(xss_clean(trim(strip_tags('phone'))));
			$message = $this->input->post(xss_clean(trim(strip_tags('message'))));
			
			
            $this->load->library('recaptcha');            
            	
			if($this->form_validation->run() == FALSE){              
				$data_body = array(
                	'base_url' => base_url(),
                	'site_url' => site_url(),
                    'recaptcha_html' => $this->recaptcha->recaptcha_get_html(),
                    'captcha_error' => ''
				);
				$this->parser->parse('careers_contact_view', $data_body);
			}else{
                $this->recaptcha->recaptcha_check_answer($_SERVER['REMOTE_ADDR'],$this->input->post('recaptcha_challenge_field'),$this->input->post('recaptcha_response_field'));
    	
                if(!$this->recaptcha->getIsValid()){
                   $data_body = array(
                        'base_url' => base_url(),
                	    'site_url' => site_url(),
                        'recaptcha_html' => $this->recaptcha->recaptcha_get_html(),
                        'captcha_error' => 'Incorrect security code'
				    );
				    $this->parser->parse('careers_contact_view', $data_body); 
                }else{
                
			    	#TODO: process data [done]
				
				    $this->load->model('options_model');
				    $this->load->library('email');		
				
				    $message = 'From: '.$name.'
Email: '.$email.'
Phone: '.$phone.'
						
Message: "'.
							
$message.'"

Best Regards,
Baker Tilly Azerbaijan Recruitment Team

{unwrap}This is an automatically generated email.  Please do not reply to the address above.{/unwrap}
';

    				$feedback_mail = $this->options_model->get('feedback_mail');
    				$this->email->from('info@bakertillyaz.az');
    				$this->email->to($feedback_mail);
    				$this->email->subject('Feedback – Baker Tilly Recruitment Section');
    				$this->email->message($message);
    				$this->email->send();
                        
                    # 
                    
                    $data_body = array(
                    	'base_url' => base_url(),
                    	'site_url' => site_url(),
    				);
    					
    				$this->parser->parse('careers_contact_success_view', $data_body);
                }
			}
			
			#Footer
			$this->footer();
			#End
		}
		
		public function selection_procedures(){
			#Header
            $this->header('popular', 113);
            #End
            
            $details = $this->content_model->getArticleDetails(113);

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
            $this->parser->parse('careers_selection_procedures_view', $data_body);
            #End Body

            #Footer
            $this->footer();
            #End
		}
						
		private function build_contact_preference_values($cur_value='none'){
			$values = array("none" => "Please select",
						   	"email" => "Email (Preferred)",
						   	"letter" => "Letter",
						   	"text" => "Text message",
						   	"mobile_anytime" => "Call to mobile phone anytime",
						   	"mobile_eve" => "Call to mobile (EVE)",
						   	"home" => "Call to home tel");
			$list = '';
			
			foreach ($values as $key => $value){
				if ($key == $cur_value) {
					$list .= '<option selected="selected" value="'.$key.'">'.$value.'</option>';
				}else{
					$list .= '<option value="'.$key.'">'.$value.'</option>';
				}
			}
			
			return $list;
		}
		
		private function build_current_salary_values($cur_value='none'){
			$values = array("none" => "Please select",
						   	"lt_6000" => "Less than AZN 6,000",
						   	"azn_6_10000" => "AZN 6-10,000",
							"azn_11_15000" => "AZN 11-15,000",
						   	"azn_16_20000" => "AZN 16-20,000",
							"azn_21_25000" => "AZN 21-25,000",
						   	"azn_26_30000" => "AZN 26-30,000",
							"azn_31_35000" => "AZN 31-35,000",
							"azn_36_40000" => "AZN 36-40,000",
							"azn_41_45000" => "AZN 41-45,000",
							"azn_46_50000" => "AZN 46-50,000",
							"azn_51_55000" => "AZN 51-55,000",
							"azn_56_60000" => "AZN 56-60,000",
							"azn_61_65000" => "AZN 61-65,000",
							"azn_66_70000" => "AZN 66-70,000",
							"azn_71_75000" => "AZN 71-75,000",
							"azn_76_80000" => "AZN 76-80,000",
							"azn_81_85000" => "AZN 81-85,000",
							"azn_86_90000" => "AZN 86-90,000",
							"azn_91_100000" => "AZN 91-100,000");
			$list = '';
			
			foreach ($values as $key => $value){
				if ($key == $cur_value) {
					$list .= '<option selected="selected" value="'.$key.'">'.$value.'</option>';
				}else{
					$list .= '<option value="'.$key.'">'.$value.'</option>';
				}
			}
			
			return $list;
		}
		
		private function build_salary_expectation_values($cur_value='none'){
			$values = array("none" => "Please select",
						   	"lt_6000" => "Less than AZN 6,000",
						   	"azn_6_10000" => "AZN 6-10,000",
							"azn_11_15000" => "AZN 11-15,000",
						   	"azn_16_20000" => "AZN 16-20,000",
							"azn_21_25000" => "AZN 21-25,000",
						   	"azn_26_30000" => "AZN 26-30,000",
							"azn_31_35000" => "AZN 31-35,000",
							"azn_36_40000" => "AZN 36-40,000",
							"azn_41_45000" => "AZN 41-45,000",
							"azn_46_50000" => "AZN 46-50,000",
							"azn_51_55000" => "AZN 51-55,000",
							"azn_56_60000" => "AZN 56-60,000",
							"azn_61_65000" => "AZN 61-65,000",
							"azn_66_70000" => "AZN 66-70,000",
							"azn_71_75000" => "AZN 71-75,000",
							"azn_76_80000" => "AZN 76-80,000",
							"azn_81_85000" => "AZN 81-85,000",
							"azn_86_90000" => "AZN 86-90,000",
							"azn_91_100000" => "AZN 91-100,000");
			$list = '';
			
			foreach ($values as $key => $value){
				if ($key == $cur_value) {
					$list .= '<option selected="selected" value="'.$key.'">'.$value.'</option>';
				}else{
					$list .= '<option value="'.$key.'">'.$value.'</option>';
				}
			}
			
			return $list;
		}
		
		private function build_gender_values($cur_value='none'){
			$values = array("none" => "Please select",
						   	"male" => "Male",
						   	"female" => "Female",
						   	"not_disclosure" => "I do not wish to disclosure");
			$list = '';
			
			foreach ($values as $key => $value){
				if ($key == $cur_value) {
					$list .= '<option selected="selected" value="'.$key.'">'.$value.'</option>';
				}else{
					$list .= '<option value="'.$key.'">'.$value.'</option>';
				}
			}
			
			return $list;
		}
		
		private function build_nationality_values($cur_value='none'){
			$values = array("none" => "Please select",
						   	"British" => "British",
						   	"Albanian" => "Albanian",
						   	"Algerian" => "Algerian",
						   	"American" => "American",
						   	"Angolan" => "Angolan",
						   	"Anguillan" => "Anguillan",
						   	"Antiguan" => "Antiguan",
						   	"Argentinian" => "Argentinian",
						   	"Armenian" => "Armenian",
						   	"Australian" => "Australian",
						   	"Austrian" => "Austrian",
						   	"Azerbaijan" => "Azerbaijan",
						   	"Bahraini" => "Bahraini",
						   	"Bangladeshi" => "Bangladeshi",
						   	"Barbadian" => "Barbadian",
						   	"Belgian" => "Belgian",
						   	"Benin" => "Benin",
						   	"Bermudian" => "Bermudian",
						   	"Bhutan" => "Bhutan",
						   	"Bolivian" => "Bolivian",
						   	"Botswana" => "Botswana",
						   	"Brazilian" => "Brazilian",
						   	"Brunei" => "Brunei",
						   	"Bulgarian" => "Bulgarian",
						   	"Burkina_Faso" => "Burkina Faso",
						   	"Cameroon" => "Cameroon",
						   	"Canadian" => "Canadian",
						   	"Cape_Verde" => "Cape Verde",
						   	"Caribbean" => "Caribbean",
						   	"Channel_Islander" => "Channel Islander",
						   	"Chinese" => "Chinese",
						   	"Central_African" => "Central African",
						   	"Colombian" => "Colombian",
						   	"Comoro_Islander" => "Comoro Islander",
						   	"Congo" => "Congo",
						   	"Costa_Rican" => "Costa Rican",
						   	"Croatian" => "Croatian",
						   	"Cuban" => "Cuban",
						   	"Cypriot" => "Cypriot",
						   	"Czech" => "Czech",
						   	"Danish" => "Danish",
						   	"Djibouti" => "Djibouti",
						   	"Dominican_Rep" => "Dominican Rep",
						   	"Dutch" => "Dutch",
						   	"Ecuadorean" => "Ecuadorean",
						   	"Egyptian" => "Egyptian",
						   	"Estonian" => "Estonian",
						   	"Ethiopian" => "Ethiopian",
						   	"Fijian" => "Fijian",
						   	"Filipino" => "Filipino",
						   	"Finnish" => "Finnish",
						   	"French" => "French",
						   	"Gabon" => "Gabon",
						   	"Gambian" => "Gambian",
						   	"German" => "German",
						   	"Ghanaian" => "Ghanaian",
						   	"Gibraltarian" => "Gibraltarian",
						   	"Greek" => "Greek",						   	
						   	"Grenadian" => "Grenadian",
						   	"Guatamalan" => "Guatamalan",
						   	"Guinea-bissau" => "Guinea-bissau",
						   	"Guinean" => "Guinean",
						   	"Guyana" => "Guyana",
						   	"Haitian" => "Haitian",
						   	"Honduran" => "Honduran",
						   	"Hong_Kong" => "Hong Kong",
						   	"Hungarian" => "Hungarian",
						   	"Icelander" => "Icelander",
						   	"Indian" => "Indian",
						   	"Indonesian" => "Indonesian",
						   	"Iranian" => "Iranian",
						   	"Iraqi" => "Iraqi",
						   	"Irish" => "Irish",
						   	"Israeli" => "Israeli",
						   	"Italian" => "Italian",
						   	"Ivory_Coast" => "Ivory Coast",
						   	"Jamaican" => "Jamaican",
						   	"Japanese" => "Japanese",
						   	"Jordanian" => "Jordanian",
						   	"Kampuchean" => "Kampuchean",
						   	"Kazakh" => "Kazakh",
						   	"Kenyan" => "Kenyan",
						   	"Kiribati" => "Kiribati",
						   	"Korean" => "Korean",
						   	"Kuwaiti" => "Kuwaiti",
						   	"Laotian" => "Laotian",
						   	"Latvian" => "Latvian",
						   	"Lebanese" => "Lebanese",
						   	"Lesotho" => "Lesotho",
						   	"Liberian" => "Liberian",
						   	"Libyan" => "Libyan",
						   	"Lithuanian" => "Lithuanian",
						   	"Luxemburger" => "Luxemburger",
						   	"Macedonian" => "Macedonian",
						   	"Malagasy" => "Malagasy",
						   	"Malawian" => "Malawian",
						   	"Malaysian" => "Malaysian",
						   	"Maldives" => "Maldives",
						   	"Mali" => "Mali",
						   	"Maltese" => "Maltese",
						   	"Mauritania" => "Mauritania",
						   	"Mauritian" => "Mauritian",
						   	"Mexican" => "Mexican",
						   	"Mongolian" => "Mongolian",
						   	"Montserrat" => "Montserrat",
						   	"Moroccan" => "Moroccan",
						   	"Mozambican" => "Mozambican",
						   	"Namibia" => "Namibia",
						   	"Nepalese" => "Nepalese",
						   	"Nevis" => "Nevis",
						   	"New_Zealander" => "New Zealander",
						   	"Nicaraguan" => "Nicaraguan",
						   	"Niger" => "Niger",
						   	"Nigerian" => "Nigerian",
						   	"Norwegian" => "Norwegian",
						   	"Oman" => "Oman",
						   	"Pakistani" => "Pakistani",
						   	"Panamanian" => "Panamanian",
						   	"Papua_New_Gunea" => "Papua New Gunea",
						   	"Paraguayan" => "Paraguayan",
						   	"Peruvian" => "Peruvian",
						   	"Pole" => "Pole",
						   	"Portuguese" => "Portuguese",
						   	"Qatar" => "Qatar",
						   	"Romanian" => "Romanian",
						   	"Russian" => "Russian",
						   	"Rwandan" => "Rwandan",
						   	"Salvadorean" => "Salvadorean",
						   	"Sao_Tome_Principality" => "Sao Tome & Principality",
						   	"Saudi_Arabian" => "Saudi Arabian",
						   	"Senegal" => "Senegal",
						   	"Seychellois" => "Seychellois",
						   	"Sierra_Leonean" => "Sierra Leonean",
						   	"Singaporean" => "Singaporean",
						   	"Slovak" => "Slovak",
						   	"Slovenian" => "Slovenian",
						   	"Solomon_Islander" => "Solomon Islander",
						   	"Somalian" => "Somalian",
						   	"South_African" => "South African",
						   	"Spaniard" => "Spaniard",
						   	"Sri_Lankan" => "Sri Lankan",
						   	"St_Helenan" => "St Helenan",
						   	"St_Kitts" => "St Kitts",
						   	"St_Lucian" => "St Lucian",
						   	"St_Vincent" => "St Vincent",
						   	"Sudanese" => "Sudanese",
						   	"Surinamese" => "Surinamese",
						   	"Swaziland" => "Swaziland",
						   	"Swedish" => "Swedish",
						   	"Swiss" => "Swiss",
						   	"Syrian" => "Syrian",
						   	"Taiwanese" => "Taiwanese",
						   	"Tanzanian" => "Tanzanian",
						   	"Thai" => "Thai",
						   	"Togolese" => "Togolese",
						   	"Tongan" => "Tongan",
						   	"Trinidad_Tobago" => "Trinidad & Tobago",
						   	"Tunisian" => "Tunisian",
						   	"Turkish" => "Turkish",
						   	"Turks_Caicos" => "Turks & Caicos",
						   	"Ugandan" => "Ugandan",
						   	"Ukrainian" => "Ukrainian",
						   	"United_Arab_Emirates" => "United Arab Emirates",
						   	"Uruguayan" => "Uruguayan",
						   	"Uzbekistan" => "Uzbekistan",
						   	"Vanuatu" => "Vanuatu",
						   	"Venezuelan" => "Venezuelan",
						   	"Vietnamese" => "Vietnamese",
						   	"Virgin_Islander" => "Virgin Islander",
						   	"West_German" => "West German",
						   	"Western_Samoan" => "Western Samoan",
						   	"Yemen_Arab_Republic" => "Yemen Arab Republic",
						   	"Yugoslavian" => "Yugoslavian",
						   	"Zairean" => "Zairean",
						   	"Zambian" => "Zambian",
						   	"Zimbabwean" => "Zimbabwean",
						   	"Not_disclosed" => "Not disclosed");
						   					
			$list = '';
			
			foreach ($values as $key => $value){
				if ($key == $cur_value) {
					$list .= '<option selected="selected" value="'.$key.'">'.$value.'</option>';
				}else{
					$list .= '<option value="'.$key.'">'.$value.'</option>';
				}
			}
			
			return $list;
		}
		
		private function build_ethnicity_values($cur_value='none'){
			$values = array("none" => "Please select",
						   	"White" => "White",
						   	"White_-_British" => "White - British",
							"White_-_Irish" => "White - Irish",
						   	"White_-_Other" => "White - Other",
							"Mixed" => "Mixed",
						   	"Mixed_-_White_and_Black_Caribbean" => "Mixed - White and Black Caribbean",
							"Mixed_-_White_and_Black_African" => "Mixed - White and Black African",
							"Mixed_-_White_and_Asian" => "Mixed - White and Asian",
							"Mixed_-_Other" => "Mixed - Other",
							"Asian_or_Asian_British" => "Asian or Asian British",
							"Asian_or_Asian_British_-_Indian" => "Asian or Asian British - Indian",
							"Asian_or_Asian_British_-_Pakistani" => "Asian or Asian British - Pakistani",
							"Asian_or_Asian_British_-_Bangladeshi" => "Asian or Asian British - Bangladeshi",
							"Asian_or_Asian_British_-_Other" => "Asian or Asian British - Other",
							"Black_or_Black_British" => "Black or Black British",
							"Black_or_Black_British_-_Caribbean" => "Black or Black British - Caribbean",
							"Black_or_Black_British_-_African" => "Black or Black British - African",
							"Black_or_Black_British_-_Other" => "Black or Black British - Other",
							"Chinese_or_other_ethnic_group" => "Chinese or other ethnic group",
							"Not_disclosed" => "Not disclosed");
			$list = '';
			
			foreach ($values as $key => $value){
				if ($key == $cur_value) {
					$list .= '<option selected="selected" value="'.$key.'">'.$value.'</option>';
				}else{
					$list .= '<option value="'.$key.'">'.$value.'</option>';
				}
			}
			
			return $list;
		}
		
		private function build_registered_disabled_values($cur_value='none'){
			$values = array("none" => "Please select",
						   	"Yes" => "Yes",
						   	"No" => "No",
							"Not_disclosed" => "I do not wish to disclosure");
			$list = '';
			
			foreach ($values as $key => $value){
				if ($key == $cur_value) {
					$list .= '<option selected="selected" value="'.$key.'">'.$value.'</option>';
				}else{
					$list .= '<option value="'.$key.'">'.$value.'</option>';
				}
			}
			
			return $list;
		}
					
	}

/* End of file careers.php */
/* Location: ./application/controllers/careers.php */