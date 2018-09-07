<section class="full-width main">
    <div class="container">
      <div class="row">
        <div class="span-12">
          <div class="span-16 text-right breadcrumb">You are here: <a href="{base_url}"><?=$this->section_model->getSectionName(1)?></a> > <a href="{base_url}about/"><?=$this->section_model->getSectionName(2)?></a> > <?=$this->section_model->getSectionName(10)?></div>
        </div>
      </div>
      <div class="row">
        <div class="side-1">
          <div id="quaternaryNavigation" class="full-width">
            {left_menu}
          </div>
        </div>
        <div class="span-17 content news detail">
          <h1><?=$this->section_model->getSectionName(107)?></h1>
            <table style="width:100%;border:none;">
                <tr>
                    <td style="width:25%;text-align:center;vertical-align:top;">
                        <img src="{base_url}images/management/ziya_ibrahimov.jpg" alt="" />                
                    </td>
                    <td style="width:75%;vertical-align:top;padding-top:15px;">
                        <p style="font-weight:bold;" class="paragraphContainer" id="area_1" {display_inline_editor}>{area_1}</p><br /><br />
            	        <div class="paragraphContainer" id="area_2" {display_inline_editor}>
                            {area_2}    		        
            	        </div>
                    </td>
                </tr>
            </table>
        </div>
        
      </div>
      <div class="row"> </div>
    </div>
  </section>