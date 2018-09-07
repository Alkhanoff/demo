<section class="full-width main">
    <div class="container">
      <div class="row">
        <div class="span-12">
          <div class="span-16 text-right breadcrumb">You are here: <a href="{base_url}"><?=$this->section_model->getSectionName(1)?></a> > <a href="{base_url}careers/"><?=$this->section_model->getSectionName(8)?></a> › <?=$this->section_model->getSectionName(117)?></div>
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
				<table style="width:650px;">
					<tr>
						<td colspan="2" style="text-align:left;font-size:25px;">Contact with our Recruitment Team</td>
					</tr>
					<tr>
						<td colspan="2" style="text-align:left;padding-top:15px;">Please do not submit your CV by using this form
For all other enquiries please complete the form below</td>
					</tr>
						
					<tr>
						<td colspan="2" style="height:25px;"></td>
					</tr>					
					<tr>						
						<td style="width:50%;">Your name&nbsp;<?php echo form_error('name'); ?></td>
						<td style="width:50%;padding-top:5px;"><input style="width:98%;height:20px;font-size:15px;border: 1px solid #bbb;" value="<?php echo set_value('name'); ?>" type="text" name="name" required/></td>
					</tr>
					<tr>						
						<td style="width:50%;">Your email address:&nbsp;<?php echo form_error('email'); ?></td>
						<td style="width:50%;padding-top:5px;"><input style="width:98%;height:20px;font-size:15px;border: 1px solid #bbb;" value="<?php echo set_value('email'); ?>" type="email" name="email" required/></td>
					</tr>
					<tr>						
						<td style="width:50%;">Your phone number:&nbsp;<?php echo form_error('phone'); ?></td>
						<td style="width:50%;padding-top:5px;"><input style="width:98%;height:20px;font-size:15px;border: 1px solid #bbb;" value="<?php echo set_value('phone'); ?>" type="text" name="phone" /></td>
					</tr>
						<tr>						
						<td style="width:50%;">Security code:&nbsp;<span class="form_error">{captcha_error}</span></td>
						<td style="text-align: left;padding-top:5px;width:50%;">{recaptcha_html}</td>
					</tr>
					<tr>
						<td colspan="2" style="text-align: left;padding-top:8px;">
						Please type your message here:&nbsp;<?php echo form_error('message'); ?><br /><br />
						<textarea name="message" cols="123" rows="15"><?php echo set_value('message'); ?></textarea>
						</td>
					</tr>
					<tr>
						<td colspan="2" style="text-align:right;padding-top:10px;"><input style="width:150px;height:25px;" type="submit" value="Submit" /></td>
					</tr>						
				</table>
			</form>
        </div>
      <div class="row"> </div>
    </div>
</section>