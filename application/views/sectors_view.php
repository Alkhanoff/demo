<?php
    $lang = get_cookie('lang', TRUE);
?>

<section class="full-width main">
    <div class="container">
      <div class="row">
        <div class="span-12">
          <div class="span-16 text-right breadcrumb">You are here: <a href="{base_url}"><?=$this->section_model->getSectionName(1)?></a> > <?=$this->section_model->getSectionName(4)?></div>
        </div>
      </div>
      <div class="row"><div class="span-12">
        <div class="side-1">
          <div id="quaternaryNavigation" class="full-width">
            {left_menu}
          </div>
        </div>
        <div class="span-17">
            <h1><?=$this->section_model->getSectionName(4)?></h1>
            <img src="{base_url}images/sectors_main.jpg" width="700" height="230" alt="banner"></div>
        <div class="span-15 content" style="width:70%;">
            <p id="area_2" {display_inline_editor}>{area_2}</p>
          
            <div class="full-width offset-12">
                <a href="{base_url}sectors/agriculture/" class="panel-1 odd uniform-2" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(74)?></h4>
                    <!-- <img src="{base_url}images/sectors_general/agriculture.jpg" alt="" /> -->
                    <p id="area_3" {display_inline_editor}>{area_3}</p>
                    <!-- <span class="link" href="{base_url}sectors/agriculture/"><?php echo ($lang == 'en')? 'Read more' : 'Ətraflı oxu';?></span> -->
                </a>
                <a href="{base_url}sectors/automative/" class="panel-1 uniform-2" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(75)?></h4>
                    <!-- <img src="{base_url}images/sectors_general/automative .jpg" alt="" /> -->
                    <p id="area_4" {display_inline_editor}>{area_4}</p>
                    <!-- <span class="link" href="{base_url}sectors/automative/"><?php echo ($lang == 'en')? 'Read more' : 'Ətraflı oxu';?></span> -->
                </a>
                <a href="{base_url}sectors/banking/" class="panel-1 odd uniform-2" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(95)?></h4>
                    <!-- <img src="{base_url}images/sectors_general/banking.jpg" alt="" /> -->
                    <p id="area_5" {display_inline_editor}>{area_5}</p>
                    <!-- <span class="link" href="{base_url}sectors/banking/"><?php echo ($lang == 'en')? 'Read more' : 'Ətraflı oxu';?></span> -->
                </a>
                <a href="{base_url}sectors/energy_and_natural_resources/" class="panel-1 uniform-2" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(78)?></h4>
                    <!-- <img src="{base_url}images/sectors_general/energy_and_natural_resources.jpg" alt="" /> -->
                    <p id="area_6" {display_inline_editor}>{area_6}</p>
                    <!-- <span class="link" href="{base_url}sectors/energy_and_natural_resources/"><?php echo ($lang == 'en')? 'Read more' : 'Ətraflı oxu';?></span> -->
                </a>
                <a href="{base_url}sectors/financial_sector/" class="panel-1 odd uniform-1" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(82)?></h4>
                    <!-- <img src="{base_url}images/sectors_general/financial_sector.jpg" alt="" /> -->
                    <p id="area_7" {display_inline_editor}>{area_7}</p>
                    <!-- <span class="link" href="{base_url}sectors/financial_sector/"><?php echo ($lang == 'en')? 'Read more' : 'Ətraflı oxu';?></span> -->
                </a>
                <a href="{base_url}sectors/food_and_drink/" class="panel-1 uniform-1" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(83)?></h4>
                    <!-- <img src="{base_url}images/sectors_general/food_and_beverage.jpg" alt="" /> -->
                    <p id="area_8" {display_inline_editor}>{area_8}</p>
                    <!-- <span class="link" href="{base_url}sectors/food_and_drink/"><?php echo ($lang == 'en')? 'Read more' : 'Ətraflı oxu';?></span> -->
                </a>
                <a href="{base_url}sectors/manufacturing/" class="panel-1 odd uniform-1" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(85)?></h4>
                    <!-- <img src="{base_url}images/sectors_general/manufacturing.jpg" alt="" /> -->
                    <p id="area_9" {display_inline_editor}>{area_9}</p>
                    <!-- <span class="link" href="{base_url}sectors/manufacturing/"><?php echo ($lang == 'en')? 'Read more' : 'Ətraflı oxu';?></span> -->
                </a>
                <a href="{base_url}sectors/non_profits/" class="panel-1 uniform-1" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(88)?></h4>
                    <!-- <img src="{base_url}images/sectors_general/non-profits.jpg" alt="" /> -->
                    <p id="area_10" {display_inline_editor}>{area_10}</p>
                    <!-- <span class="link" href="{base_url}sectors/non_profits/"><?php echo ($lang == 'en')? 'Read more' : 'Ətraflı oxu';?></span> -->
                </a>
                <a href="{base_url}sectors/real_estate_and_construction/" class="panel-1 odd uniform-1" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(98)?></h4>
                    <!-- <img src="{base_url}images/sectors_general/real_estate_and_construction.jpg" alt="" /> -->
                    <p id="area_11" {display_inline_editor}>{area_11}</p>
                    <!-- <span class="link" href="{base_url}sectors/real_estate_and_construction/"><?php echo ($lang == 'en')? 'Read more' : 'Ətraflı oxu';?></span> -->
                </a>
                <a href="{base_url}sectors/retail/" class="panel-1 uniform-1" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(99)?></h4>
                    <!-- <img src="{base_url}images/sectors_general/retail.jpg" alt="" /> -->
                    <p id="area_12" {display_inline_editor}>{area_12}</p>
                    <!-- <span class="link" href="{base_url}sectors/retail/"><?php echo ($lang == 'en')? 'Read more' : 'Ətraflı oxu';?></span> -->
                </a>
                <a href="{base_url}sectors/telecommunications_and_it/" class="panel-1 odd uniform-1" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(86)?></h4>
                    <!-- <img src="{base_url}images/sectors_general/telecommunications_and_it.jpg" alt="" /> -->
                    <p id="area_13" {display_inline_editor}>{area_13}</p>
                    <!-- <span class="link" href="{base_url}sectors/telecommunications_and_it/"><?php echo ($lang == 'en')? 'Read more' : 'Ətraflı oxu';?></span> -->
                </a>
                <a href="{base_url}sectors/tourism_and_hospitality/" class="panel-1 uniform-1" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(84)?></h4>
                    <!-- <img src="{base_url}images/sectors_general/tourism_and_hospitality.jpg" alt="" /> -->
                    <p id="area_14" {display_inline_editor}>{area_14}</p>
                    <!-- <span class="link" href="{base_url}sectors/tourism_and_hospitality/"><?php echo ($lang == 'en')? 'Read more' : 'Ətraflı oxu';?></span> -->
                </a>
            </div>
          
        </div>
      </div></div>
      <div class="row"> </div>
    </div>
  </section>