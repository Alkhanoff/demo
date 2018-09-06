<section class="full-width main">
    <div class="container">
      <div class="row">
        <div class="span-12">
          <div class="span-16 text-right breadcrumb">You are here: <a href="{base_url}"><?=$this->section_model->getSectionName(1)?></a> > <a href="{base_url}about/"><?=$this->section_model->getSectionName(2)?></a> > <?=$this->section_model->getSectionName(105)?></div>
        </div>
      </div>
      <div class="row">
        <div class="side-1">
          <div id="quaternaryNavigation" class="full-width">
            {left_menu}
          </div>
        </div>
        <div class="span-17 content news detail">
          <h1><?=$this->section_model->getSectionName(105)?></h1>
          <p id="area_2" {display_inline_editor}>{area_2}</p>
        </div>
        
      </div>
      <div class="row"> </div>
    </div>
  </section>