<?php
    $lang = get_cookie('lang', TRUE);
?>


<section class="full-width main">
    <div class="container">
      <div class="row">
        <div class="span-12">
          <div class="span-16 text-right breadcrumb">You are here: <a href="{base_url}"><?=$this->section_model->getSectionName(1)?></a> > <?=$this->section_model->getSectionName(114)?></div>
        </div>
      </div>
      <div class="row">
        <div class="side-1">
          <div id="quaternaryNavigation" class="full-width">
            <ul style="height:500px;">
	        	<li><a href="{base_url}about/"><?=$this->section_model->getSectionName(1)?></a></li>
                    <ul class="unstyled active-ul level-2">
                        <li class="active-li"><a href="{base_url}index/legal_disclaimer/"><?=$this->section_model->getSectionName(114)?></a></li> 
                        <li><a href="{base_url}index/sitemap/"><?=$this->section_model->getSectionName(121)?></a></li>    
                    </ul>
                <li><a href="{base_url}about/"><?=$this->section_model->getSectionName(2)?></a></li>
                <li><a href="{base_url}sectors/"><?=$this->section_model->getSectionName(4)?></a></li>
                <li><a href="{base_url}services/"><?=$this->section_model->getSectionName(3)?></a></li>
                <li><a href="{base_url}careers/"><?=$this->section_model->getSectionName(8)?></a></li>
                <li><a href="{base_url}news/"><?=$this->section_model->getSectionName(7)?></a></li>
                <li><a href="{base_url}publications/"><?=$this->section_model->getSectionName(6)?></a></li>
	        	<li><a href="{base_url}publications_and_views/"><?=$this->section_model->getSectionName(9)?></a></li>
        	</ul>
          </div>
        </div>
        <div class="span-17 content news detail">
          <h2><?=$this->section_model->getSectionName(114)?></h2>
        	<div id="area_1" {display_inline_editor}>
                {area_1}
            </div>
        </div>
      <div class="row"> </div>
    </div>
</section>