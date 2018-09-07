<section class="full-width main">
    <div class="container">
      <div class="row">
        <div class="span-12">
          <div class="span-16 text-right breadcrumb">You are here: <a href="{base_url}"><?=$this->section_model->getSectionName(1)?></a> > <a href="{base_url}careers/"><?=$this->section_model->getSectionName(8)?></a> › <?=$this->section_model->getSectionName(116)?></div>
        </div>
      </div>
      <div class="row">
        <div class="side-1">
          <div id="quaternaryNavigation" class="full-width">
            <ul style="height:500px;">
	        	<li><a href="{base_url}careers/vacancies/"><?=$this->section_model->getSectionName(104)?></a></li>
	        	<li><a href="{base_url}careers/online_application/"><?=$this->section_model->getSectionName(115)?></a></li>
	        	<li><a href="{base_url}careers/selection_procedures/"><?=$this->section_model->getSectionName(113)?></a></li>
	        	<li class="active-li"><a href="{base_url}careers/track_application_status/"><?=$this->section_model->getSectionName(116)?></a></li>
	        	<li><a href="{base_url}careers/contact/"><?=$this->section_model->getSectionName(117)?></a></li>
        	</ul>
          </div>
        </div>
        <div class="span-17 content news detail">
          <form method="post" action="{site_url}careers/reminder/">
				<table style="width:95%;height:170px;">
					<tr>
						<td colspan="3" style="text-align:left;font-size:25px;">Forgotten your Password?</td>
					</tr>
					<tr>
						<td colspan="3" style="color:#444;text-align:left;padding-top:20px;">Please enter your e-mail address and we will send your password. <br /><br /><span style="color: #f00;">* Required to fulfill</span></td>
					</tr>	
					<tr>
						<td colspan="3" style="height:15px;"></td>
					</tr>
					<tr>
						<td colspan="3" style="color:#f00;text-align:left;">{login_fail}</td>
					</tr>				
					<tr>
						<td style="width:25%;">Email address <span style="color: #f00;">*</span></td>
						<td style="width:50%;"><input style="width:98%;height:21px;font-size:15px;border: 1px solid #bbb;" type="text" name="email" /></td>
						<td style="width:25%;"><input style="width:90px;height:25px;" type="submit" value="Email me" /></td>
					</tr>
					<tr>
						<td colspan="3" style="text-align:left;padding-top:10px;vertical-align:bottom;"><a href="{site_url}careers/track_application_status/">Cancel</a></td>
					</tr>	
				</table>
			</form>
        </div>
        
      </div>
      <div class="row"> </div>
    </div>
</section>