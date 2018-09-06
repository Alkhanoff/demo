<div id="content-secondary" class="content" style="width:0;">
    <div id="navigation-secondary" class="navigation">
	<div class="webpart">            
        </div>		
    </div>
    <div>
		<div class="module">			
		</div>
    </div>
</div>
<div id="navigation-breadcrumb" class="navigation">
    <div id="ctl00_PlaceHolderMain_Breadcrumb1" class="webpart">
	<a href="{base_url}"><?=$this->section_model->getSectionName(1)?></a> <span class="separator">›</span> <span class="current"><?=$this->section_model->getSectionName(5)?></span>
    </div>
</div>
<div id="content-primary" class="content">
	<h1 id="area_1" {display_inline_editor}>{area_1}</h1>		
		<div id="area_2" {display_inline_editor} class="paragraphContainer">			
	              {area_2}
		</div>
                <div class="modulecontainer">
                     <h2 id="area_3" {display_inline_editor} class="line"><span>{area_3}</span></h2>
                     {featured_case_studies}
                     <div class="clearance"></div>
                     <fieldset>
						 <legend style="display:block;">{search_case_studies}</legend>
                            <div>
								<label>{by_service}</label>
                                <select name="selectService"  id="selectService" onchange="window.location='{base_url}case_studies/index/'+this.options[this.selectedIndex].value+'/'+document.getElementById('selectSector').options[document.getElementById('selectSector').selectedIndex].value+'/';">
		                    {services_options}
	                        </select>
	                    </div>
                            <div>
								<label>{by_sector}</label>
                                 <select name="Sector" id="selectSector" onchange="window.location='{base_url}case_studies/index/'+document.getElementById('selectService').options[document.getElementById('selectService').selectedIndex].value+'/'+this.options[this.selectedIndex].value+'/';">
		                    {sectors_options}
	                         </select>
	                    </div>
                            <div class="search">
                                 <input type="image" name="btnFind" id="btnFind" value="search" src="http://www.bakertilly.co.uk/sitecollectionimages/presentation/button-search.gif" onClick="location.href='{base_url}case_studies/index/'+document.getElementById('selectService').options[document.getElementById('selectService').selectedIndex].value+'/'+document.getElementById('selectSector').options[document.getElementById('selectSector').selectedIndex].value+'/';" style="border-width:0px;">
                            </div>
                      </fieldset>
                      <div class="pagination" style="{display_results}">
						  <div class="results">{results} {results_from} - {results_to} {of} {count}</div>
                            <span id="pager">
                                 {paging}
                            </span>
                      </div>
                      
                      {search_list}
	              
	              <div class="pagination" style="{display_results}">
					  <div class="results">{results} {results_from} - {results_to} {of} {count}</div>
                            <span id="pager">
                                 {paging}
                            </span>
                      </div>
                </div>
</div>