<?php
    $lang = get_cookie('lang', TRUE);
?>

<section class="full-width main">
    <div class="container">
      <div class="row">
        <div class="span-12">
          <div class="span-16 text-right breadcrumb">You are here: <a href="{base_url}"><?=$this->section_model->getSectionName(1)?></a> > <?=$this->section_model->getSectionName(3)?></div>
        </div>
      </div>
      <div class="row"><div class="span-12">
        <div class="side-1">
          <div id="quaternaryNavigation" class="full-width">
            {left_menu}
          </div>
        </div>
        <div class="span-17">
            <h1><?=$this->section_model->getSectionName(3)?></h1>
            <img src="{base_url}images/Services.jpg" width="700" height="230" alt="banner"></div>
        <div class="span-15 content" style="width:70%;">
            <p id="area_2" {display_inline_editor}>{area_2}</p>
          
            <div class="full-width offset-12">
                <a href="{base_url}services/audit/" class="panel-1 odd uniform-2" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(15)?></h4>
                    <p id="area_3" {display_inline_editor}>{area_3}</p>
                </a>
                <a href="{base_url}services/corporate_finance/" class="panel-1 uniform-2" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(18)?></h4>
                    <p id="area_4" {display_inline_editor}>{area_4}</p>
                </a>
                <a href="{base_url}services/financial_and_business_advisory/" class="panel-1 odd uniform-2" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(16)?></h4>
                    <p id="area_5" {display_inline_editor}>{area_5}</p>
                </a>
                <a href="{base_url}services/forensic_services/" class="panel-1 uniform-2" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(19)?></h4>
                    <p id="area_6" {display_inline_editor}>{area_6}</p>
                </a>
                <a href="{base_url}services/growth_programme/" class="panel-1 odd uniform-1" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(20)?></h4>
                    <p id="area_7" {display_inline_editor}>{area_7}</p>
                </a>
                <a href="{base_url}services/international_services/" class="panel-1 uniform-1" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(22)?></h4>
                    <p id="area_8" {display_inline_editor}>{area_8}</p>
                </a>
                <a href="{base_url}services/information_systems/" class="panel-1 odd uniform-1" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(17)?></h4>
                    <p id="area_9" {display_inline_editor}>{area_9}</p>
                </a>
                <a href="{base_url}services/online_outsourcing/" class="panel-1 uniform-1" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(23)?></h4>
                    <p id="area_10" {display_inline_editor}>{area_10}</p>
                </a>
                <a href="{base_url}services/payroll/" class="panel-1 odd uniform-1" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(21)?></h4>
                    <p id="area_11" {display_inline_editor}>{area_11}</p>
                </a>
                <a href="{base_url}services/management_accounting/" class="panel-1 uniform-1" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(112)?></h4>
                    <p id="area_12" {display_inline_editor}>{area_12}</p>
                </a>
                <a href="{base_url}services/restructuring_and_recovery/" class="panel-1 odd uniform-1" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(24)?></h4>
                    <p id="area_13" {display_inline_editor}>{area_13}</p>
                </a>
                <a href="{base_url}services/tax/" class="panel-1 uniform-1" style="width:325px;">
                    <h4 <?php echo ($lang == 'az' ? 'style="font-family:Tahoma;"' : '')?>><?=$this->section_model->getSectionName(25)?></h4>
                    <p id="area_14" {display_inline_editor}>{area_14}</p>
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
    <div id="ctl00_ctl01_g_63e84855_081d_44dc_844b_59f54edc047b">
		<div class="module">			
		</div>
    </div>
</div>
<div id="navigation-breadcrumb" class="navigation">
    <div id="ctl00_PlaceHolderMain_Breadcrumb1" class="webpart">
	<a href="{base_url}"><?=$this->section_model->getSectionName(1)?></a> <span class="separator">›</span> <span class="current"><?=$this->section_model->getSectionName(3)?></span>
    </div>
</div>
<div id="content-primary" class="content">
    <h1 id="area_1" {display_inline_editor}>{area_1}</h1>		
		<div class="paragraphContainer">			
			<div>
                <div style="height:230px;padding:0;margin:0;width:100%;"><img style="position:relative;" src="{base_url}images/Services.jpg" alt="" /></div>
				<div id="area_2" {display_inline_editor} class="col">
                                     {area_2}                                    
				</div>				
			</div>
		</div>
        <div style="height:40px;"></div> 
        <table>
            <tr>
                <td style="vertical-align:top;">
                    <div style="width:300px;margin-right:22px;height:30px;border-top:1px solid #ccc;border-bottom:1px solid #ccc;margin-bottom:10px;vertical-align:middle;font-size:13px;line-height:30px;color:#07b;font-weight:bold;"><a href="{base_url}services/audit/"><?=$this->section_model->getSectionName(15)?></a></div>
                    <a href="{base_url}services/audit/"><img src="{base_url}images/services_general/audit.jpg" alt="" /></a>
                    <div style="width:300px;text-align:justify;margin-top:15px;" id="area_3" {display_inline_editor}>{area_3}</div>
                </td>
                <td style="vertical-align:top;">
                    <div style="width:300px;margin-right:5px;height:30px;border-top:1px solid #ccc;border-bottom:1px solid #ccc;margin-bottom:10px;vertical-align:middle;font-size:13px;line-height:30px;color:#07b;font-weight:bold;"><a href="{base_url}services/corporate_finance/"><?=$this->section_model->getSectionName(18)?></a></div>
                    <a href="{base_url}services/corporate_finance/"><img src="{base_url}images/services_general/corporate_finance.jpg" alt="" /></a>
                    <div style="width:300px;text-align:justify;margin-top:15px;" id="area_4" {display_inline_editor}>{area_4}</div>
                </td>
            </tr>
            <tr>
                <td style="vertical-align:top;">
                    <div style="width:300px;margin-right:22px;height:30px;border-top:1px solid #ccc;border-bottom:1px solid #ccc;margin-bottom:10px;vertical-align:middle;font-size:13px;line-height:30px;color:#07b;font-weight:bold;"><a href="{base_url}services/financial_and_business_advisory/"><?=$this->section_model->getSectionName(16)?></a></div>
                    <a href="{base_url}services/financial_and_business_advisory/"><img src="{base_url}images/services_general/financial_and_business_advisory.jpg" alt="" /></a>
                    <div style="width:300px;text-align:justify;margin-top:15px;" id="area_5" {display_inline_editor}>{area_5}</div>
               </td>
                <td style="vertical-align:top;">
                    <div style="width:300px;margin-right:5px;height:30px;border-top:1px solid #ccc;border-bottom:1px solid #ccc;margin-bottom:10px;vertical-align:middle;font-size:13px;line-height:30px;color:#07b;font-weight:bold;"><a href="{base_url}services/forensic_services/"><?=$this->section_model->getSectionName(19)?></a></div>
                    <a href="{base_url}services/forensic_services/"><img src="{base_url}images/services_general/forensic_services.jpg" alt="" /></a>
                    <div style="width:300px;text-align:justify;margin-top:15px;" id="area_6" {display_inline_editor}>{area_6}</div>
                </td>
            </tr>
            <tr>
                <td style="vertical-align:top;">
                    <div style="width:300px;margin-right:22px;height:30px;border-top:1px solid #ccc;border-bottom:1px solid #ccc;margin-bottom:10px;vertical-align:middle;font-size:13px;line-height:30px;color:#07b;font-weight:bold;"><a href="{base_url}services/growth_programme/"><?=$this->section_model->getSectionName(20)?></a></div>
                    <a href="{base_url}services/growth_programme/"><img src="{base_url}images/services_general/growth_programme.jpg" alt="" /></a>
                    <div style="width:300px;text-align:justify;margin-top:15px;" id="area_7" {display_inline_editor}>{area_7}</div>
                </td>
                <td style="vertical-align:top;">
                    <div style="width:300px;margin-right:5px;height:30px;border-top:1px solid #ccc;border-bottom:1px solid #ccc;margin-bottom:10px;vertical-align:middle;font-size:13px;line-height:30px;color:#07b;font-weight:bold;"><a href="{base_url}services/international_services/"><?=$this->section_model->getSectionName(22)?></a></div>
                    <a href="{base_url}services/international_services/"><img src="{base_url}images/services_general/international_services.jpg" alt="" /></a>
                    <div style="width:300px;text-align:justify;margin-top:15px;" id="area_8" {display_inline_editor}>{area_8}</div>
                </td>
            </tr>
            <tr>
                <td style="vertical-align:top;">
                    <div style="width:300px;margin-right:22px;height:30px;border-top:1px solid #ccc;border-bottom:1px solid #ccc;margin-bottom:10px;vertical-align:middle;font-size:13px;line-height:30px;color:#07b;font-weight:bold;"><a href="{base_url}services/information_systems/"><?=$this->section_model->getSectionName(17)?></a></div>
                    <a href="{base_url}services/information_systems/"><img src="{base_url}images/services_general/information_systems.jpg" alt="" /></a>
                    <div style="width:300px;text-align:justify;margin-top:15px;" id="area_9" {display_inline_editor}>{area_9}</div>
                </td>
                <td style="vertical-align:top;">
                    <div style="width:300px;margin-right:5px;height:30px;border-top:1px solid #ccc;border-bottom:1px solid #ccc;margin-bottom:10px;vertical-align:middle;font-size:13px;line-height:30px;color:#07b;font-weight:bold;"><a href="{base_url}services/online_outsourcing/"><?=$this->section_model->getSectionName(23)?></a></div>
                    <a href="{base_url}services/online_outsourcing/"><img src="{base_url}images/services_general/outsourcing.jpg" alt="" /></a>
                    <div style="width:300px;text-align:justify;margin-top:15px;" id="area_10" {display_inline_editor}>{area_10}</div>
                </td>
            </tr>
            <tr>
                <td style="vertical-align:top;">
                    <div style="width:300px;margin-right:22px;height:30px;border-top:1px solid #ccc;border-bottom:1px solid #ccc;margin-bottom:10px;vertical-align:middle;font-size:13px;line-height:30px;color:#07b;font-weight:bold;"><a href="{base_url}services/payroll/"><?=$this->section_model->getSectionName(21)?></a></div>
                    <a href="{base_url}services/payroll/"><img src="{base_url}images/services_general/payroll.jpg" alt="" /></a>
                    <div style="width:300px;text-align:justify;margin-top:15px;" id="area_11" {display_inline_editor}>{area_11}</div>
                </td>
                <td style="vertical-align:top;">
                    <div style="width:300px;margin-right:5px;height:30px;border-top:1px solid #ccc;border-bottom:1px solid #ccc;margin-bottom:10px;vertical-align:middle;font-size:13px;line-height:30px;color:#07b;font-weight:bold;"><a href="{base_url}services/management_accounting/"><?=$this->section_model->getSectionName(112)?></a></div>
                    <a href="{base_url}services/management_accounting/"><img src="{base_url}images/services_general/management_accounting.jpg" alt="" /></a>
                    <div style="width:300px;text-align:justify;margin-top:15px;" id="area_12" {display_inline_editor}>{area_12}</div>
                </td>
            </tr>
            <tr>
                <td style="vertical-align:top;">
                    <div style="width:300px;margin-right:22px;height:30px;border-top:1px solid #ccc;border-bottom:1px solid #ccc;margin-bottom:10px;vertical-align:middle;font-size:13px;line-height:30px;color:#07b;font-weight:bold;"><a href="{base_url}services/restructuring_and_recovery/"><?=$this->section_model->getSectionName(24)?></a></div>
                    <a href="{base_url}services/restructuring_and_recovery/"><img src="{base_url}images/services_general/restructuring_and_recovery.jpg" alt="" /></a>
                    <div style="width:300px;text-align:justify;margin-top:15px;" id="area_13" {display_inline_editor}>{area_13}</div>
                </td>
                <td style="vertical-align:top;">
                    <div style="width:300px;margin-right:5px;height:30px;border-top:1px solid #ccc;border-bottom:1px solid #ccc;margin-bottom:10px;vertical-align:middle;font-size:13px;line-height:30px;color:#07b;font-weight:bold;"><a href="{base_url}services/tax/"><?=$this->section_model->getSectionName(25)?></a></div>
                    <a href="{base_url}services/tax/"><img src="{base_url}images/services_general/tax_and_legal_advisory.jpg" alt="" /></a>
                    <div style="width:300px;text-align:justify;margin-top:15px;" id="area_14" {display_inline_editor}>{area_14}</div>
                </td>
            </tr>
        </table> 
</div>

-->