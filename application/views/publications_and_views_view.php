<?php
    $lang = get_cookie('lang', TRUE);
?>


<section class="full-width main">
    <div class="container">
      <div class="row">
        <div class="span-12">
          <div class="span-16 text-right breadcrumb">You are here: <a href="{base_url}"><?=$this->section_model->getSectionName(1)?></a> > <?=$this->section_model->getSectionName(6)?></div>
        </div>
      </div>
      <div class="row">
        <div class="side-1">
          <div id="quaternaryNavigation" class="full-width">
            {left_menu}
          </div>
        </div>
        <div class="span-17 content news">
          <h1 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(6)?></h1>
          {featured_list}
          {search_list}
          <div class="pagination">{paging}</div>
        </div>
      </div>
      <div class="row"> </div>
    </div>
  </section>