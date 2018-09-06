<div id="content-secondary" class="content">
    <div id="navigation-secondary" class="navigation">
	<div class="webpart">
            <ul>
	        <li class="first"><a href="{base_url}media_and_events/news/"><?=$this->section_model->getSectionName(100)?></a></li>
	        <li><span><?=$this->section_model->getSectionName(101)?></span></li>
	        
	        
            </ul>
        </div>		
    </div>    
</div>


<div id="navigation-breadcrumb" class="navigation">
    <div id="ctl00_PlaceHolderMain_Breadcrumb1" class="webpart">
	<a href="{base_url}"><?=$this->section_model->getSectionName(1)?></a> <span class="separator">›</span> <a href="{base_url}media_and_events/"><?=$this->section_model->getSectionName(7)?></a> <span class="separator">›</span> <span class="current"><?=$this->section_model->getSectionName(101)?></span>
    </div>
</div>

<div id="content-primary" class="content">
    <h1 id="area_1" {display_inline_editor}><?=$this->section_model->getSectionName(101)?></h1>		
    <div class="modulecontainer">
		<div class="pagination" style="{display_results}">
			<div class="results">{results} {results_from} - {results_to} {of} {count}</div>
			<span id="pager">
				{paging}
			</span>
		</div>
		
		<div>
			{search_list}
		</div>
		
		<div class="pagination" style="{display_results}">
			<div class="results">{results} {results_from} - {results_to} {of} {count}</div>
			<span id="pager">
				{paging}
			</span>
		</div>
	</div>
</div>