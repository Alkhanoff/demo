<?php
    $lang = get_cookie('lang', TRUE);
?>

<section class="full-width main">
    <div class="container">
      <div class="row">
        <div class="span-12">
          <div class="span-16 text-right breadcrumb">You are here: <a href="{base_url}"><?=$this->section_model->getSectionName(1)?></a> > <a href="{base_url}about/"><?=$this->section_model->getSectionName(3)?></a> > <?=$this->section_model->getSectionName(25)?></div>
        </div>
      </div>
      <div class="row">
        <div class="side-1">
          <div id="quaternaryNavigation" class="full-width">
            {left_menu}
          </div>
        </div>
        <div class="span-17 content news detail">
          <h1 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(25)?></h1>
          <div style="height:255px;padding:0;margin:0;width:100%;"><img style="position:relative;" src="{base_url}images/services_inside/tax_and_legal_advisory.jpg" alt="" /></div>
          <div id="area_2" {display_inline_editor}>{area_2}</div>
        </div>
        
      </div>
      <div class="row"> </div>
    </div>
</section>