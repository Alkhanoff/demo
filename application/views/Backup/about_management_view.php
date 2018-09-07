<?php
    $lang = get_cookie('lang', TRUE);
?>

<section class="full-width main">
    <div class="container">
      <div class="row">
        <div class="span-12">
          <div class="span-16 text-right breadcrumb">You are here: <a href="{base_url}"><?=$this->section_model->getSectionName(1)?></a> > <a href="{base_url}about/"><?=$this->section_model->getSectionName(2)?></a> > <?=$this->section_model->getSectionName(10)?></div>
        </div>
      </div>
      <div class="row"><div class="span-12">
        <div class="side-1">
          <div id="quaternaryNavigation" class="full-width">
            {left_menu}
          </div>
        </div>
        <div class="span-17">
            <h1><?=$this->section_model->getSectionName(10)?></h1>
            <img src="{base_url}images/meet_our_management.jpg" width="700" height="339" alt="banner"></div>
        <div class="span-15 content" style="width:70%;">
            <p id="area_2" {display_inline_editor}>{area_2}</p>
          
            <div class="full-width offset-12">
                <a href="{base_url}about/management/samir_valiyev/" class="panel-1 odd uniform-2" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(106)?></h4>
                    <p id="area_3" {display_inline_editor}>{area_3}</p>
                    <img width="157" src="{base_url}images/management/samir_valiyev_small.jpg" alt="" />
                    <span class="link" href="{base_url}about/management/samir_valiyev/"><?php echo ($lang == 'en')? 'Read more' : 'Ətraflı oxu';?></span>
                </a>
                <a href="{base_url}about/management/ziya_ibrahimov/" class="panel-1 uniform-2" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(107)?></h4>
                    <p id="area_4" {display_inline_editor}>{area_4}</p>
                    <img width="160" src="{base_url}images/management/ziya_ibrahimov_small.jpg" alt="" />
                    <span class="link" href="{base_url}about/management/ziya_ibrahimov/"><?php echo ($lang == 'en')? 'Read more' : 'Ətraflı oxu';?></span>
                </a>
                <a href="{base_url}about/management/rustam_safaraliyev/" class="panel-1 odd uniform-2" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(110)?></h4>
                    <p id="area_5" {display_inline_editor}>{area_5}</p>
                    <img width="157" src="{base_url}images/management/rustam_safaraliyev_small.jpg" alt="" />
                    <span class="link" href="{base_url}about/management/rustam_safaraliyev/"><?php echo ($lang == 'en')? 'Read more' : 'Ətraflı oxu';?></span>
                </a>
                <a href="{base_url}about/management/azer_akbarov/" class="panel-1 uniform-2" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(111)?></h4>
                    <p id="area_6" {display_inline_editor}>{area_6}</p>
                    <img width="160" src="{base_url}images/management/azer_akbarov_small.jpg" alt="" />
                    <span class="link" href="{base_url}about/management/azer_akbarov/"><?php echo ($lang == 'en')? 'Read more' : 'Ətraflı oxu';?></span>
                </a>
                <a href="{base_url}about/management/rena_isayeva/" class="panel-1 odd uniform-1" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(108)?></h4>
                    <p id="area_7" {display_inline_editor}>{area_7}</p>
                    <img width="160" src="{base_url}images/management/rena_isayeva_small.jpg" alt="" />
                    <span class="link" href="{base_url}about/management/rena_isayeva/"><?php echo ($lang == 'en')? 'Read more' : 'Ətraflı oxu';?></span>
                </a>
                <a href="{base_url}about/management/vadim_abdullayev/" class="panel-1 uniform-1" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(109)?></h4>
                    <p id="area_8" {display_inline_editor}>{area_8}</p>
                    <img width="160" src="{base_url}images/management/vadim_abdullayev_small.jpg" alt="" />
                    <span class="link" href="{base_url}about/management/vadim_abdullayev/"><?php echo ($lang == 'en')? 'Read more' : 'Ətraflı oxu';?></span>
                </a><!--
                <a href="{base_url}about/management/nurana_quliyeva/" class="panel-1 uniform-2" style="width:325px;">
                    <h4><?=$this->section_model->getSectionName(118)?></h4>
                    <p id="area_9" {display_inline_editor}>{area_9}</p>
                    <img width="160" src="{base_url}images/management/nurana_guliyeva_small.jpg" alt="" />
                    <span class="link" href="{base_url}about/management/nurana_quliyeva/"><?php echo ($lang == 'en')? 'Read more' : 'Ətraflı oxu';?></span>
                </a> -->
                <a href="{base_url}about/management/ziya_nasirov/" class="panel-1 odd uniform-1" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(119)?></h4>
                    <p id="area_10" {display_inline_editor}>{area_10}</p>
                    <img width="160" src="{base_url}images/management/ziya_nasirov_small.jpg" alt="" />
                    <span class="link" href="{base_url}about/management/ziya_nasirov/"><?php echo ($lang == 'en')? 'Read more' : 'Ətraflı oxu';?></span>
                </a>
                <a href="{base_url}about/management/azad_huseynov/" class="panel-1 uniform-1" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(120)?></h4>
                    <p id="area_11" {display_inline_editor}>{area_11}</p>
                    <img width="160" src="{base_url}images/management/azad_huseynov_small.jpg" alt="" />
                    <span class="link" href="{base_url}about/management/azad_huseynov/"><?php echo ($lang == 'en')? 'Read more' : 'Ətraflı oxu';?></span>
                </a>
            </div>
          
        </div>
        
      </div></div>
      <div class="row"> </div>
    </div>
  </section>



<!--
<div id="content-secondary" class="content">
    <div id="navigation-secondary" class="navigation">
	<div class="webpart">
            {left_menu}
        </div>		
    </div>
</div>

<div id="navigation-breadcrumb" class="navigation">
    <div id="ctl00_PlaceHolderMain_Breadcrumb1" class="webpart">
	<a href="{base_url}"><?=$this->section_model->getSectionName(1)?></a> <span class="separator">›</span> <a href="{base_url}about/"><?=$this->section_model->getSectionName(2)?></a> <span class="separator">›</span> <span class="current"><?=$this->section_model->getSectionName(10)?></span>
    </div>
</div>
<div id="content-primary" class="content">
	<h1 id="area_1" {display_inline_editor}>{area_1}</h1>		
	
		<div style="height:339px;padding:0;margin:0;width:100%;"><img style="position:relative;" src="{base_url}images/meet_our_management.jpg" alt="" /></div>
		<div class="paragraphContainer" id="area_2" {display_inline_editor} style="width:640px;">		
			{area_2}
		</div>
	
	<table>
		<tr>			
			<td>
				<h2 class='line'>
					<a href="{base_url}about/management/samir_valiyev/">
						<?=$this->section_model->getSectionName(106)?>
					</a>
				</h2>
				<p style="padding:0;margin-bottom:15px;" class="paragraphContainer" id="area_3" {display_inline_editor}>
					{area_3}
				</p>
				<p> 
					<a href="{base_url}about/management/samir_valiyev/"><img width="157" src="{base_url}images/management/samir_valiyev_small.jpg" alt="" /></a>
				</p>
				<p style="padding:0;margin-top:15px;">
					<a style="background: url('{base_url}images/bullet.gif') no-repeat 0 0.5em;padding-left:10px;" href="{base_url}about/management/samir_valiyev/"><?php echo ($lang == 'en')? 'Read more' : 'Ətraflı oxu';?></a>
				</p>
			</td>
			<td>				
				<h2 class='line'>
					<a href="{base_url}about/management/ziya_ibrahimov/">
						<?=$this->section_model->getSectionName(107)?>
					</a>
				</h2>
				<p style="padding:0;margin-bottom:15px;" class="paragraphContainer" id="area_4" {display_inline_editor}>
					{area_4}
				</p>
				<p> 
					<a href="{base_url}about/management/ziya_ibrahimov/"><img width="160" src="{base_url}images/management/ziya_ibrahimov_small.jpg" alt="" /></a>
				</p>
				<p style="padding:0;margin-top:15px;">
					<a style="background: url('{base_url}images/bullet.gif') no-repeat 0 0.5em;padding-left:10px;" href="{base_url}about/management/ziya_ibrahimov/"><?php echo ($lang == 'en')? 'Read more' : 'Ətraflı oxu';?></a>
				</p>
			</td>			
		</tr>
		<tr>
			<td>
				<h2 class='line'>
					<a href="{base_url}about/management/rustam_safaraliyev/">
						<?=$this->section_model->getSectionName(110)?>
					</a>
				</h2>
				<p style="padding:0;margin-bottom:15px;" class="paragraphContainer" id="area_5" {display_inline_editor}>
					{area_5}
				</p>
				<p> 
					<a href="{base_url}about/management/rustam_safaraliyev/"><img width="157" src="{base_url}images/management/rustam_safaraliyev_small.jpg" alt="" /></a>
				</p>
				<p style="padding:0;margin-top:15px;">
					<a style="background: url('{base_url}images/bullet.gif') no-repeat 0 0.5em;padding-left:10px;" href="{base_url}about/management/rustam_safaraliyev/"><?php echo ($lang == 'en')? 'Read more' : 'Ətraflı oxu';?></a>
				</p>
			</td>
			<td>				
				<h2 class='line'>
					<a href="{base_url}about/management/azer_akbarov/">
						<?=$this->section_model->getSectionName(111)?>
					</a>
				</h2>
				<p style="padding:0;margin-bottom:15px;" class="paragraphContainer" id="area_6" {display_inline_editor}>
					{area_6}
				</p>
				<p> 
					<a href="{base_url}about/management/azer_akbarov/"><img width="160" src="{base_url}images/management/azer_akbarov_small.jpg" alt="" /></a>
				</p>
				<p style="padding:0;margin-top:15px;">
					<a style="background: url('{base_url}images/bullet.gif') no-repeat 0 0.5em;padding-left:10px;" href="{base_url}about/management/azer_akbarov/"><?php echo ($lang == 'en')? 'Read more' : 'Ətraflı oxu';?></a>
				</p>
			</td>
		</tr>
		<tr>
			<td>
				<h2 class='line'>
					<a href="{base_url}about/management/rena_isayeva/">
						<?=$this->section_model->getSectionName(108)?>
					</a>
				</h2>
				<p style="padding:0;margin-bottom:15px;" class="paragraphContainer" id="area_7" {display_inline_editor}>
					{area_7}
				</p>
				<p> 
					<a href="{base_url}about/management/rena_isayeva/"><img width="160" src="{base_url}images/management/rena_isayeva_small.jpg" alt="" /></a>
				</p>
				<p style="padding:0;margin-top:15px;">
					<a style="background: url('{base_url}images/bullet.gif') no-repeat 0 0.5em;padding-left:10px;" href="{base_url}about/management/rena_isayeva/"><?php echo ($lang == 'en')? 'Read more' : 'Ətraflı oxu';?></a>
				</p>
			</td>
			<td>				
				<h2 class='line'>
					<a href="{base_url}about/management/vadim_abdullayev/">
						<?=$this->section_model->getSectionName(109)?>
					</a>
				</h2>
				<p style="padding:0;margin-bottom:15px;" class="paragraphContainer" id="area_8" {display_inline_editor}>
					{area_8}
				</p>
				<p> 
					<a href="{base_url}about/management/vadim_abdullayev/"><img width="160" src="{base_url}images/management/vadim_abdullayev_small.jpg" alt="" /></a>
				</p>
				<p style="padding:0;margin-top:15px;">
					<a style="background: url('{base_url}images/bullet.gif') no-repeat 0 0.5em;padding-left:10px;" href="{base_url}about/management/vadim_abdullayev/"><?php echo ($lang == 'en')? 'Read more' : 'Ətraflı oxu';?></a>
				</p>
			</td>
		</tr>
		<tr>
			<td>
				<h2 class='line'>
					<a href="{base_url}about/management/nurana_quliyeva/">
						<?=$this->section_model->getSectionName(118)?>
					</a>
				</h2>
				<p style="padding:0;margin-bottom:15px;" class="paragraphContainer" id="area_9" {display_inline_editor}>
					{area_9}
				</p>
				<p> 
					<a href="{base_url}about/management/nurana_quliyeva/"><img width="158" src="{base_url}images/management/nurana_guliyeva_small.jpg" alt="" /></a>
				</p>
				<p style="padding:0;margin-top:15px;">
					<a style="background: url('{base_url}images/bullet.gif') no-repeat 0 0.5em;padding-left:10px;" href="{base_url}about/management/nurana_quliyeva/"><?php echo ($lang == 'en')? 'Read more' : 'Ətraflı oxu';?></a>
				</p>
			</td>
			<td>				
				<h2 class='line'>
					<a href="{base_url}about/management/ziya_nasirov/">
						<?=$this->section_model->getSectionName(119)?>
					</a>
				</h2>
				<p style="padding:0;margin-bottom:15px;" class="paragraphContainer" id="area_10" {display_inline_editor}>
					{area_10}
				</p>
				<p> 
					<a href="{base_url}about/management/ziya_nasirov/"><img width="160" src="{base_url}images/management/ziya_nasirov_small.jpg" alt="" /></a>
				</p>
				<p style="padding:0;margin-top:15px;">
					<a style="background: url('{base_url}images/bullet.gif') no-repeat 0 0.5em;padding-left:10px;" href="{base_url}about/management/ziya_nasirov/"><?php echo ($lang == 'en')? 'Read more' : 'Ətraflı oxu';?></a>
				</p>
			</td>
		</tr
		<tr>
			<td>
				<h2 class='line'>
					<a href="{base_url}about/management/azad_huseynov/">
						<?=$this->section_model->getSectionName(120)?>
					</a>
				</h2>
				<p style="padding:0;margin-bottom:15px;" class="paragraphContainer" id="area_11" {display_inline_editor}>
					{area_11}
				</p>
				<p> 
					<a href="{base_url}about/management/azad_huseynov/"><img width="158" src="{base_url}images/management/azad_huseynov_small.jpg" alt="" /></a>
				</p>
				<p style="padding:0;margin-top:15px;">
					<a style="background: url('{base_url}images/bullet.gif') no-repeat 0 0.5em;padding-left:10px;" href="{base_url}about/management/azad_huseynov/"><?php echo ($lang == 'en')? 'Read more' : 'Ətraflı oxu';?></a>
				</p>
			</td>
			<td>								
			</td>
		</tr>
	</table>		
</div>
-->