<div id="content-secondary" class="content">
	<div>
		{left_sidebar}			
	</div>
</div>
<div id="navigation-breadcrumb" class="navigation">
    <div id="ctl00_PlaceHolderMain_Breadcrumb1" class="webpart">
	<a href="{base_url}"><?=$this->section_model->getSectionName(1)?></a> <span class="separator">›</span> <a href="{base_url}case_studies/"><?=$this->section_model->getSectionName(5)?></a> <span class="separator">›</span> <span class="current">{title}</span>
    </div>
</div>
<div id="content-primary" class="content">
	<h1>{title}</h1>		
	<div class="paragraphContainer">			
	     {details}
	</div>
        <div class="modulecontainer">                     
        </div>
</div>