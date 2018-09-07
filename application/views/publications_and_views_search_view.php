<div id="navigation-breadcrumb" class="navigation">
    <div id="ctl00_PlaceHolderMain_Breadcrumb1" class="webpart">
	<a href="{base_url}"><?=$this->section_model->getSectionName(1)?></a> <span class="separator">›</span> <a href="{base_url}publications_and_views/"><?=$this->section_model->getSectionName(6)?></a> <span class="separator">›</span> <span class="current"> Publications Search Results</span>
    </div>
</div>
<h2 class="headline-new-width" style="bottom: 0; font-weight: normal; font-size: 2.5em;">
    Publications Search Results
</h2>
<p class="search-results-text">
    Showing results for <a href="{base_url}publications_and_views/search/?ss={ss}">"{ss}"</a>
</p>
<div id="content-primary" class="content">
    <div id="main_content" style="width:934px;">
	<div class="col-1">					
            <a name="results"></a>
            <div class="publications-results clear">
            <span id="ctl00_PlaceHolderMain_AllArticles_DataPager1">
                <p style="width:631px;" class="number-of-results clear"><strong>{results_from}-{results_to}</strong> of <strong>{count}</strong> results.</p>
            </span>
    
            {ss_list}
        
            <span id="ctl00_PlaceHolderMain_AllArticles_DataPager2">
                <ul class="pagination clear" style="margin:0 auto;">
                    {paging}
                </ul></span>
        </div>
    </div>
    <div class="col-2">					
        <section class="main-publications clear">
	      <h2>Search again?</h2>		 
                  <form name="search_form" method="get" action="{base_url}publications_and_views/search/">  
		    <input name="ss" type="text" value="{ss}" id="txtKeywords" class="text clear float-left" placeholder="Enter keyword" />		    
                    <input type="image" name="FindPublicationsimgGo" id="FindPublicationsimgGo" class="go float-right" src="{base_url}images/button-go.gif" onclick="javascript:document.search_form.submit();" style="border-width:0px;" />
                  </form>
	</section>
    </div>
  </div>
</div>