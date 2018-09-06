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
	<h1><?=$this->section_model->getSectionName(109)?></h1>	
    <table style="width:100%;border:none;">
        <tr>
            <td style="width:25%;text-align:center;">
                <img src="{base_url}images/management/6.jpg" alt="" />                
            </td>
            <td style="width:75%;vertical-align:top;">
                <p style="font-weight:bold;" class="paragraphContainer" id="area_1" {display_inline_editor}>{area_1}</p><br /><br />
                <div class="paragraphContainer" id="area_2" {display_inline_editor}>
                    {area_2}    		        
    	        </div>
            </td>
        </tr>
    </table>    			
</div>