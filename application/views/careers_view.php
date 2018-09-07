<section class="full-width main">
    <div class="container">
      <div class="row">
        <div class="span-12">
          <div class="span-16 text-right breadcrumb">You are here: <a href="{base_url}"><?=$this->section_model->getSectionName(1)?></a> > <?=$this->section_model->getSectionName(8)?></div>
        </div>
      </div>
      <div class="row">
        <div class="side-1">
          <div id="quaternaryNavigation" class="full-width">
            <ul style="height:500px;">
	        	<li><a href="{base_url}careers/vacancies/"><?=$this->section_model->getSectionName(104)?></a></li>
	        	<li><a href="{base_url}careers/online_application/"><?=$this->section_model->getSectionName(115)?></a></li>
	        	<li><a href="{base_url}careers/selection_procedures/"><?=$this->section_model->getSectionName(113)?></a></li>
	        	<li><a href="{base_url}careers/track_application_status/"><?=$this->section_model->getSectionName(116)?></a></li>
	        	<li><a href="{base_url}careers/contact/"><?=$this->section_model->getSectionName(117)?></a></li>
        	</ul>
          </div>
        </div>
        <div class="span-17 content news detail">
          <h1><?=$this->section_model->getSectionName(8)?></h1>
          <div style="height:395px;padding:0;margin:0;width:100%;"><img style="position:relative;" src="{base_url}images/careers.jpg" alt="" /></div>
          <div id="area_2" {display_inline_editor}>{area_2}</div>
        </div>
        
      </div>
      <div class="row"> </div>
    </div>
</section>