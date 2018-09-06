<?php
    $lang = get_cookie('lang', TRUE);
?>

<section class="full-width main">
    <div class="container">
      <div class="row">
        <div class="span-12">
          <div class="span-16 text-right breadcrumb">You are here: <a href="{base_url}"><?=$this->section_model->getSectionName(1)?></a> > <?php echo ($lang == 'en' ? 'Search Results' : 'Axtarış nəticələri')?></div>
        </div>
      </div>
      <div class="row">
        <div class="side-1">
          <div id="quaternaryNavigation" class="full-width">
            <ul class="unstyled full-width level-1">
              <li><a href="{base_url}about/"><?=$this->section_model->getSectionName(2)?></a></li>
                <li><a href="{base_url}sectors/"><?=$this->section_model->getSectionName(4)?></a></li>
                <li><a href="{base_url}services/"><?=$this->section_model->getSectionName(3)?></a></li>
                <li><a href="{base_url}careers/"><?=$this->section_model->getSectionName(8)?></a></li>
                <li><a href="{base_url}news/"><?=$this->section_model->getSectionName(7)?></a></li>
                <li><a href="{base_url}publications/"><?=$this->section_model->getSectionName(6)?></a></li>
	        	<li><a href="{base_url}publications_and_views/"><?=$this->section_model->getSectionName(9)?></a></li>
	        	<li class="active-li"><a href="{base_url}search/"><?php echo ($lang == 'en' ? 'Search' : 'Axtarış')?></a></li>
            </ul>
          </div>
        </div>
        <div class="span-17 content search">
          <h1>Search results for "{ss}"</h1>
          <div class="sub">{count} results found for "{ss}"</div>
          <p>Not found what you are looking for? Refine your search by searching again with a new keyword.</p>
          <!-- <form method="get" action="{base_url}search/index/"> -->
            <label for="keywordSearch" class="searchInput inputBox box-1">
              <input id="keywordSearch" type="search" title="Keyword search" value="{ss}" onkeydown="if(event.keyCode == 13){location.href='{base_url}search/index/'+this.value+'/'};">
            </label>
            <label for="keywordSearchSubmit" class="searchIcon">
              <input id="keywordSearchSubmit" type="submit" value="Search" onclick="location.href='{base_url}search/index/'+document.getElementById('keywordSearch').value+'/';">
            </label>
          <!-- </form> -->
          <!-- <div class="results pull-left"> View: <a href="#">20</a> | <a class="active" href="#">100</a> per page</div> -->
          <div class="pagination">
            {paging}
          </div>
            {search_list}
          <div class="pagination">
            {paging}
          </div>
        </div>
      </div>
      <div class="row"> </div>
    </div>
  </section>





<!--
<div id="content-primary" class="content wide">             
	<h1>Search results</h1> 
           
	<div class="results-summary" style="{display_results}">
		<div id="SRST" class="srch-WPBody"> <div class="srch-stats">Results <b>{results_from}-{results_to}</b> of about {count}.</div></div>
    </div>
    <div class="pagination">
        <div id="SRP" class="srch-WPBody ">
			<div class="srch-Page srch-Page-bg">
				{paging}
			</div>
		</div>
	</div>

	<div class="results">
		<div class="bestbets">           
			<table toplevel="" border="0" cellpadding="0" cellspacing="0" width="100%">
				<tbody><tr>
					<td valign="top"><div haspers="true" id="WebPartWPQ1" width="100%" class="ms-WPBody" onlyformepart="true" allowdelete="false" style=""><div id="HCR" class="srch-WPBody"><span class="srch-BB-SpecialTerm" style="display:none;"></span></div></div></td>
				</tr>
			</tbody></table>
        </div>
        <div id="CSR" class="srch-WPBody">			
			{search_list}
		</div>
		<div id="SRP" class="srch-WPBody ">
			<div class="srch-Page srch-Page-bg">
				{paging}
			</div>
		</div>              
   </div> 
</div>
-->