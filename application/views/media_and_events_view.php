<section class="full-width main">
    <div class="container">
      <div class="row">
        <div class="span-12">
          <div class="span-16 text-right breadcrumb">You are here: <a href="{base_url}"><?=$this->section_model->getSectionName(1)?></a> > <?=$this->section_model->getSectionName(7)?></div>
        </div>
      </div>
      <div class="row">
        <div class="side-1">
          <div id="quaternaryNavigation" class="full-width">
            <ul style="height:500px;">
	        	<li><a href="{base_url}media_and_events/news/"><?=$this->section_model->getSectionName(100)?></a></li>
	        	<li><a href="{base_url}media_and_events/events/"><?=$this->section_model->getSectionName(101)?></a></li>
        	</ul>
          </div>
        </div>
        <div class="span-17 content news detail">
          <h1><?=$this->section_model->getSectionName(7)?></h1>
          <div style="height:205px;padding:0;margin:0;width:100%;"><img style="position:relative;" src="{base_url}images/news_and_events.jpg" alt="" /></div>
          <div id="area_2" {display_inline_editor}>{area_2}</div>
        
          <div class="full-width offset-12">
                <a href="{base_url}media_and_events/news/" class="panel-1 odd uniform-2" style="width:325px;">
                    <h4><?=$this->section_model->getSectionName(100)?></h4>                    
                    <p id="area_4" {display_inline_editor}>{area_4}</p>                   
                </a>
                <a href="{base_url}media_and_events/events/" class="panel-1 uniform-2" style="width:325px;">
                    <h4><?=$this->section_model->getSectionName(101)?></h4>                    
                    <p id="area_5" {display_inline_editor}>{area_5}</p>                    
                </a>
          </div
        
        </div>
        
        
        
      </div>
      <div class="row"> </div>
    </div>
</section>