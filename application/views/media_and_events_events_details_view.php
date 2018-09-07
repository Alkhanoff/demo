<div id="content-secondary" class="content">
    <div id="navigation-secondary" class="navigation">
	<div class="webpart">
            <ul>
				<li class="first"><a href="{base_url}media_and_events/news/"><?=$this->section_model->getSectionName(100)?></a></li>
	        	<li><span><a href="{base_url}media_and_events/events/"><?=$this->section_model->getSectionName(101)?></a></span></li>
	        	
	        	
            </ul>
        </div>		
    </div>    
</div>

<div id="navigation-breadcrumb" class="navigation">
    <div id="ctl00_PlaceHolderMain_Breadcrumb1" class="webpart">
		<a href="{base_url}"><?=$this->section_model->getSectionName(1)?></a> <span class="separator">›</span> <a href="{base_url}media_and_events/"><?=$this->section_model->getSectionName(7)?></a> <span class="separator">›</span> <a href="{base_url}media_and_events/events/"><?=$this->section_model->getSectionName(101)?></a> <span class="separator">›</span> <span class="current">{title}</span>
    </div>
</div>
<div id="content-primary" class="content">
	<h1>{title}</h1>
	<p><b>{date}</b></p>
	<div class="paragraphContainer">			
	     {details}
	</div>
        <div class="modulecontainer">                     
        </div>
</div>