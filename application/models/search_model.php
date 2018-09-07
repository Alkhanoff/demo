<?php
    /**************************************
    *
    * Author   : Orkhan Huseynov
    * Contacts : orkhan.huseynov@live.com
    *
    **************************************/
    class Search_model extends CI_Model {       
        function __construct(){
            parent::__construct();
            $this->load->database();
            $this->load->library('session');
            $this->load->helper('url');
            $this->load->helper('text');            
        }                

        function get_search_list($ss, $page){
			$ss = xss_clean(mysql_real_escape_string($ss));			
            (integer) $page;
			
			if($ss != ''){
				if(count(explode(' ', $ss)) > 1){
					$sql = '';
					$ss_arr = explode(' ', $ss);
					$i = 1;
					foreach($ss_arr as $s){
						$sql .= '(SELECT `ID`, `date`, `title_en` AS title, `text_en` AS text, `tagline_en` AS tagline, "news" AS `type` FROM `cmsnews` WHERE `title_en` LIKE "%'.$s.'%" OR `tagline_en` LIKE "%'.$s.'%" OR `text_en` LIKE "%'.$s.'%")
								UNION
								(SELECT `ID`, `date`, `title_en` AS title, `text_en` AS text, `tagline_en` AS tagline, "publications_and_views" AS `type` FROM `cmspublicationsandviews` WHERE `title_en` LIKE "%'.$s.'%" OR `tagline_en` LIKE "%'.$s.'%" OR `text_en` LIKE "%'.$ss.'%")
								UNION
								(SELECT `ID`, `date`, `title_en` AS title, `text_en` AS text, `tagline_en` AS tagline, "vacancies" AS `type` FROM `cmsvacancies` WHERE `title_en` LIKE "%'.$s.'%" OR `tagline_en` LIKE "%'.$s.'%" OR `text_en` LIKE "%'.$s.'%")';  
						if($i != count($ss_arr)){
							$sql .= ' UNION ';
						}
						$i++;
					}
					if($page == 0){
						$sql .= 'LIMIT 10';
					}else{
						$sql .= 'LIMIT '.$page.', 10';					
					}
				}else{
					if($page == 0){           
						$sql = '(SELECT `ID`, `date`, `title_en` AS title, `text_en` AS text, `tagline_en` AS tagline, "news" AS `type` FROM `cmsnews` WHERE `title_en` LIKE "%'.$ss.'%" OR `tagline_en` LIKE "%'.$ss.'%" OR `text_en` LIKE "%'.$ss.'%")
								UNION
								(SELECT `ID`, `date`, `title_en` AS title, `text_en` AS text, `tagline_en` AS tagline, "publications_and_views" AS `type` FROM `cmspublicationsandviews` WHERE `title_en` LIKE "%'.$ss.'%" OR `tagline_en` LIKE "%'.$ss.'%" OR `text_en` LIKE "%'.$ss.'%")
								UNION
								(SELECT `ID`, `date`, `title_en` AS title, `text_en` AS text, `tagline_en` AS tagline, "vacancies" AS `type` FROM `cmsvacancies` WHERE `title_en` LIKE "%'.$ss.'%" OR `tagline_en` LIKE "%'.$ss.'%" OR `text_en` LIKE "%'.$ss.'%")
								LIMIT 10';               
					}else{                
						$sql = '(SELECT `ID`, `date`, `title_en` AS title, `text_en` AS text, `tagline_en` AS tagline, "news" AS `type` FROM `cmsnews` WHERE `title_en` LIKE "%'.$ss.'%" OR `tagline_en` LIKE "%'.$ss.'%" OR `text_en` LIKE "%'.$ss.'%")
								UNION
								(SELECT `ID`, `date`, `title_en` AS title, `text_en` AS text, `tagline_en` AS tagline, "publications_and_views" AS `type` FROM `cmspublicationsandviews` WHERE `title_en` LIKE "%'.$ss.'%" OR `tagline_en` LIKE "%'.$ss.'%" OR `text_en` LIKE "%'.$ss.'%")
								UNION
								(SELECT `ID`, `date`, `title_en` AS title, `text_en` AS text, `tagline_en` AS tagline, "vacancies" AS `type` FROM `cmsvacancies` WHERE `title_en` LIKE "%'.$ss.'%" OR `tagline_en` LIKE "%'.$ss.'%" OR `text_en` LIKE "%'.$ss.'%")
								LIMIT '.$page.', 10';               
					
					}
				}
													
				$query = $this->db->query($sql);
				$htm = '<div class="resultsContainer">';		
				
				if($query->num_rows > 0){
					foreach($query->result() as $row){                    
						$id = $row->ID;                    
						$title_en = $row->title;					
						//$title_az = $row->title_az;					                  
						//$name_en = $row->name;					
						$text_en = $row->text;
						//$text_az = $row->text_az;
						$tagline_en = $row->tagline;
						$tagline_az = $row->tagline;
						$type = $row->type;
						$date = date('d/m/Y', strtotime($row->date));
						
						switch($type){
							case 'case_studies' : $href = base_url().'case_studies/details/'.$id.'/'; break;
							case 'events' : $href = base_url().'media_and_events/events_details/'.$id.'/'; break;
							case 'news' : $href = base_url().'media_and_events/news_details/'.$id.'/'; break;
							case 'publications_and_views' : $href = base_url().'publications_and_views/details/'.$id.'/'; break;
							case 'vacancies' : $href = base_url().'careers/vacancies_details/'.$id.'/'; break;
						}
						
						$htm .= '<a class="result" href="'.$href.'">';
						$htm .= '<h2>'.$this->search_highlight($title_en, $ss).'</h2>';
						//$htm .= '<h2><a href="'.$href.'" title="">'.$this->search_highlight($title_en, $ss).'</a></h2>';
						$htm .= '<p>'.$this->search_extract(strip_tags($text_en), $ss).'</p>';			
						$htm .= '</a>';
					}
				}else{
					$htm .= '<a href="#">Sorry, your search returned no results.</a>';
				}
				
				$htm .= '</div>';
			}else{
				$htm = '<div class="resultsContainer"><a href="#">Please enter something to search.</a></div>';
			}
			return $htm;
        }       
		
		function get_count($ss, $page){ 
			$ss = xss_clean(mysql_real_escape_string($ss));	
			if($ss == ''){
				return 0;
			}				
			
            if(count(explode(' ', $ss)) > 1){
				$sql = '';
				$ss_arr = explode(' ', $ss);
				$i = 1;
				foreach($ss_arr as $s){
					$sql .= '(SELECT `ID` FROM `cmsnews` WHERE `title_en` LIKE "%'.$s.'%" OR `tagline_en` LIKE "%'.$s.'%" OR `text_en` LIKE "%'.$s.'%")
							UNION
							(SELECT `ID` FROM `cmspublicationsandviews` WHERE `title_en` LIKE "%'.$s.'%" OR `tagline_en` LIKE "%'.$s.'%" OR `text_en` LIKE "%'.$ss.'%")
							UNION
							(SELECT `ID` FROM `cmsvacancies` WHERE `title_en` LIKE "%'.$s.'%" OR `tagline_en` LIKE "%'.$s.'%" OR `text_en` LIKE "%'.$s.'%")';  
					if($i != count($ss_arr)){
						$sql .= ' UNION ';
					}
					$i++;
				}				
			}else{
				$sql = '(SELECT `ID` FROM `cmsnews` WHERE `title_en` LIKE "%'.$ss.'%" OR `tagline_en` LIKE "%'.$ss.'%" OR `text_en` LIKE "%'.$ss.'%")
						UNION
						(SELECT `ID` FROM `cmspublicationsandviews` WHERE `title_en` LIKE "%'.$ss.'%" OR `tagline_en` LIKE "%'.$ss.'%" OR `text_en` LIKE "%'.$ss.'%")
						UNION
						(SELECT `ID` FROM `cmsvacancies` WHERE `title_en` LIKE "%'.$ss.'%" OR `tagline_en` LIKE "%'.$ss.'%" OR `text_en` LIKE "%'.$ss.'%")';               
				
			}
            $query = $this->db->query($sql);
			return $query->num_rows;
        } 
		
		private function search_highlight($text, $search_terms, $hl_class = 'form_error'){
			if ( ! is_array($search_terms))
			{
				$search_terms = explode(' ', $search_terms);
			}
			
			// Highlight each of the terms
			foreach ($search_terms as $term)
			{
				//$text = preg_replace('/\b(' . preg_quote($term) . ')\b/i', '<span class="' . $hl_class . '">\1</span>', $text);
				$text = highlight_phrase($text, $term, '<span style="color:#990000">', '</span>');
			}
			
			return $text;
		}
		
		private function search_extract($content, $search_terms, $number_of_snippets = 3, $snippet_length = 60){
			if ( ! is_array($search_terms))
			{
				$search_terms = explode(' ', $search_terms);
			}
			
			// This is going to be our collection of snippets
			$snippets = array();
			
			// Start at the beginning of the string
			$next_start = 0;
			
			// Do this for each snippet
			foreach (range(0, $number_of_snippets) as $count)
			{
				// If we run out of content, then just give up
				if ($next_start > strlen($content))
				{
					break;
				}
				
				// Find the first occurance of any of the search terms
				$start = strlen($content);
				foreach ($search_terms as $term)
				{
					$start = min($start, stripos($content, $term, $next_start));
				}
				
				// Try and include the word before this one
				$start = strrpos(substr($content, 0, $start-1), ' ');
				
				// Next time round, we'll start looking at the end of this snippet
				$next_start = $start + $snippet_length;
				
				// At the snippet to the extract and highlight the terms
				$extract[$count] = $this->search_highlight(trim(substr($content, $start, $snippet_length)), $search_terms);
			}
			
			// Stick all of the snippets together to make up the extract
			return implode(' &hellip; ', $extract) . '&hellip;';
		}
    }