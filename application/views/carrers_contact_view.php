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
	        	<li><a href="{base_url}careers/track_application_status/"><?=$this->section_model->getSectionName(116)?></a></li>
	        	<li class="active-li"><a href="{base_url}careers/contact/"><?=$this->section_model->getSectionName(117)?></a></li>
        	</ul>
          </div>
        </div>
        <div class="span-17 content news detail">
          <form method="post" action="{site_url}careers/contact/">
				<table style="width:100%;">
					<tr>
						<td style="text-align:left;font-size:25px;">Contact with our Recruitment Team</td>
					</tr>
					<tr>
						<td style="text-align:left;font-size:25px;">Please do not submit your CV by using this form
For all other enquiries please complete the form below</td>
					</tr>

					<tr>
						<td style="text-align:left;font-size:15px;font-weight:bold;">Login</td>
					</tr>
					<tr>
						<td style="color:#444;text-align:left;padding-top:20px;">Please fill in the fields below. <span class="{both_required}">Both are required.</span></td>
					</tr>	
					<tr>
						<td style="height:25px;"></td>
					</tr>					
					<tr>						
						<td style="width:100%;">E-mail address <input style="width:98%;height:25px;font-size:15px;border: 1px solid #bbb;" type="text" name="login"/></td>
					</tr>
					<tr>						
						<td style="width:100%;">Password: <input style="width:98%;height:25px;font-size:15px;border: 1px solid #bbb;" type="password" name="password"/></td>
					</tr>
					<tr>
						<td style="text-align:left;padding-top:10px;"><input style="width:100px;height:25px;" type="submit" value="Log In" /></td>
					</tr>
					<tr>
						<td style="padding-top:20px;color:#444;text-align:left;">Forgot password?&nbsp;<a href="{site_url}careers/reminder/">Recover.</a></td>
					</tr>	
				</table>
			</form>
        </div>
      <div class="row"> </div>
    </div>
</section>