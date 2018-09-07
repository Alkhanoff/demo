<?php
    $lang = get_cookie('lang', TRUE);
?>

<section class="full-width main">
    <div class="container">
      <div class="row">
        <div class="span-12">
          <div class="span-16 text-right breadcrumb">You are here: <a href="{base_url}"><?=$this->section_model->getSectionName(1)?></a> > <?=$this->section_model->getSectionName(2)?></div>
        </div>
      </div>
      <div class="row"><div class="span-12">
        <div class="side-1">
          <div id="quaternaryNavigation" class="full-width">
            {left_menu}
          </div>
        </div>
        <div class="span-17">
            <h1><?=$this->section_model->getSectionName(2)?></h1>
            <img src="{base_url}images/about_us.jpg" width="700" height="249" alt="banner"></div>
        <div class="span-15 content">
            <p id="area_3" {display_inline_editor}>{area_3}</p>
          
            <div class="full-width offset-12">
                <a href="{base_url}about/our_vision/" class="panel-1 odd uniform-2">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(12)?></h4>
                    <p id="area_5" {display_inline_editor}>{area_5}</p>
                </a>
                <a href="{base_url}about/our_mission/" class="panel-1 uniform-2">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(105)?></h4>
                    <p id="area_6" {display_inline_editor}>{area_6}</p>
                </a>
                <a href="{base_url}about/our_values/" class="panel-1 odd uniform-2">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(13)?></h4>
                    <p id="area_8" {display_inline_editor}>{area_8}</p>
                </a>
                <a href="{base_url}about/history/" class="panel-1 uniform-2">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(11)?></h4>
                    <p id="area_10" {display_inline_editor}>{area_10}</p>
                </a>
                <a href="{base_url}about/management/" class="panel-1 odd uniform-1">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(10)?></h4>
                    <p id="area_7" {display_inline_editor}>{area_7}</p>
                </a>
                <a href="{base_url}about/international/" class="panel-1 uniform-1">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(14)?></h4>
                    <p id="area_9" {display_inline_editor}>{area_9}</p>
                </a>
            </div>
          
        </div>
        <div class="side-1 pull-right img-col">
          <div class="callout">
            <h2 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>>{latestnews_text}</h2>
            {default_page_list}
          </div>
          <div class="callout" style="margin-top:15px;text-align: center;">			
			<div class="inner" style="text-align: center;width:100%;">
				<a align="center" style="text-align: center;" target="_blank" href="http://www.accaglobal.com/en/employer/products-services/approved-employer.html"><img src="{base_url}images/ACCA.png" width="120" /></a>
		    	<div id="area_11" {display_inline_editor} style="text-align:justify;width:100%;margin-top:10px;">
		    		{area_11}
		    	</div>
		    </div>
	    </div>
        </div>
      </div></div>
      <div class="row"> </div>
    </div>
  </section>