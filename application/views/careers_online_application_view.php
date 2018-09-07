<section class="full-width main">
    <div class="container">
      <div class="row">
        <div class="span-12">
          <div class="span-16 text-right breadcrumb">You are here: <a href="{base_url}"><?=$this->section_model->getSectionName(1)?></a> > <a href="{base_url}careers/"><?=$this->section_model->getSectionName(8)?></a> > <?=$this->section_model->getSectionName(104)?></div>
        </div>
      </div>
      <div class="row">
        <div class="side-1">
          <div id="quaternaryNavigation" class="full-width">
            <ul style="height:500px;">
	        	<li><a href="{base_url}careers/vacancies/"><?=$this->section_model->getSectionName(104)?></a></li>
	        	<li class="active-li"><a href="{base_url}careers/online_application/"><?=$this->section_model->getSectionName(115)?></a></li>
	        	<li><a href="{base_url}careers/selection_procedures/"><?=$this->section_model->getSectionName(113)?></a></li>
	        	<li><a href="{base_url}careers/track_application_status/"><?=$this->section_model->getSectionName(116)?></a></li>
	        	<li><a href="{base_url}careers/contact/"><?=$this->section_model->getSectionName(117)?></a></li>
        	</ul>
          </div>
        </div> 
        <div class="span-17 content news detail">
          <h1 id="area_1" {display_inline_editor}>Online Application Form</h1>
          <div class="modulecontainer">
		<?php echo form_open_multipart('{base_url}careers/online_application/save/');?>
			
			<div style="font-weight:bold;font-size:12pt;margin-top:25px;">INTRODUCTION</div> 
			<div>Fields marked with a * are mandatory and must be filled in for you to submit your form.</div>
            
            <table style="width:50%;border:none;margin-top:15px;">
    			<tr>
					<td>Vacancy:&nbsp;<?php echo form_error('vacancy_id'); ?></td>
					<td>
						<select name="vacancy_id">
							<option value="0">Please select</option>
							{vacancies_values}
						</select>
					</td>
				</tr>
            </table>
			
			<div style="font-weight:bold;font-size:12pt;margin-top:15px;">Section 1 - Basic Information</div>
			
			<table style="width:50%;border:none;margin-top:15px;">				
				<tr>
					<td>First name:*</td>
					<td><input type="text" name="firstname" required value="<?php echo set_value('firstname'); ?>" />&nbsp;<?php echo form_error('firstname'); ?></td>
				</tr>
				<tr>
					<td>Middle name:</td>
					<td><input type="text" name="middlename" value="<?php echo set_value('middlename'); ?>" />&nbsp;<?php echo form_error('middlename'); ?></td>
				</tr>
				<tr>
					<td>Last name:*</td>
					<td><input type="text" name="lastname" required value="<?php echo set_value('lastname'); ?>" />&nbsp;<?php echo form_error('lastname'); ?></td>
				</tr>
			</table>
			
			<div style="font-weight:bold;font-size:12pt;margin-top:15px;">Section 2 - Contact Information</div>
			
			<table style="width:50%;border:none;margin-top:15px;">
				<tr>
					<td>Email address:*</td>
					<td><input type="email" name="email" required value="<?php echo set_value('email'); ?>" />&nbsp;<?php echo form_error('email'); ?></td>
				</tr>
				<tr>
					<td>Confirm Email:</td>
					<td><input type="text" name="confirm_email" value="<?php echo set_value('confirm_email'); ?>" />&nbsp;<?php echo form_error('confirm_email'); ?></td>
				</tr>
				<tr>
					<td>Password:**</td>
					<td><input type="password" required name="password" /></td>
				</tr>
			</table>
			
			<div style="margin-top:25px;">We will usually keep in touch with you via email, so please ensure you add @bakertillyaz.az to your Safe Senders list so that our emails aren't delivered to your Junk Email folder or deleted.</div>
			<div style="margin-top:10px;">** You will need the e-mail and password you submitted in order to track your application status</div>
			
			<table style="width:50%;border:none;margin-top:15px;">
				<tr>
					<td>Mobile:*</td>
					<td><input type="text" required name="mobile" value="<?php echo set_value('mobile'); ?>" />&nbsp;<?php echo form_error('mobile'); ?></td>
				</tr>
			</table>
			
			<div style="margin-top:15px;">We may use this number for mobile text alerts.</div>
			
			<table style="width:50%;border:none;margin-top:15px;">
				<tr>
					<td>Home telephone:</td>
					<td><input type="text" name="home" value="<?php echo set_value('home'); ?>" />&nbsp;<?php echo form_error('home'); ?></td>
				</tr>
				<tr>
					<td>Home address:</td>
					<td><textarea cols="8" rows="5" name="address"><?php echo set_value('address'); ?></textarea>&nbsp;<?php echo form_error('address'); ?></td>
				</tr>
				<tr>
					<td>Home postcode:</td>
					<td><input type="text" name="post_code" value="<?php echo set_value('post_code'); ?>" />&nbsp;<?php echo form_error('post_code'); ?></td>
				</tr>
				<tr>
					<td>Contact preference:</td>
					<td>
						<select name="contact_preference">
							{contact_preference_values}
						</select>
					</td>
				</tr>
			</table>
			
			<div style="font-weight:bold;font-size:12pt;margin-top:15px;">Section 3 - Employment Details</div>
			
			<table style="width:50%;border:none;margin-top:15px;">
				<tr>
					<td>Current or most recent employer:*</td>
					<td><input type="text" name="current_employer" value="<?php echo set_value('current_employer'); ?>" />&nbsp;<?php echo form_error('current_employer'); ?></td>
				</tr>
				<tr>
					<td>Current or most recent job title:</td>
					<td><input type="text" name="current_job_title" value="<?php echo set_value('current_job_title'); ?>" />&nbsp;<?php echo form_error('current_job_title'); ?></td>
				</tr> 
				<tr>
					<td>Current or most recent base salary:*</td>
					<td>
						<select name="current_salary">
							{current_salary_values}
						</select> &nbsp;<?php echo form_error('current_salary'); ?>
					</td>
				</tr>
				<tr>
					<td>Salary expectation:*</td>
					<td>
						<select name="salary_expectation" required>
							{salary_expectation_values}
						</select>&nbsp;<?php echo form_error('salary_expectation'); ?>
					</td>
				</tr>				
				<tr>
					<td colspan="2">Profesional qualifications: &nbsp;<?php echo form_error('professional_qualifications'); ?></td>                
				</tr>
				<tr>
					<td>
						<input type="checkbox" name="professional_qualifications[]" value="AAT" <?php echo set_checkbox('professional_qualifications[]', 'AAT'); ?>>&nbsp;AAT<br />
						<input type="checkbox" name="professional_qualifications[]" value="ACA" <?php echo set_checkbox('professional_qualifications[]', 'ACA'); ?>>&nbsp;ACA<br />
						<input type="checkbox" name="professional_qualifications[]" value="ACCA" <?php echo set_checkbox('professional_qualifications[]', 'ACCA'); ?>>&nbsp;ACCA<br />
						<input type="checkbox" name="professional_qualifications[]" value="ATII" <?php echo set_checkbox('professional_qualifications[]', 'ATII'); ?>>&nbsp;ATII<br />
						<input type="checkbox" name="professional_qualifications[]" value="ATT" <?php echo set_checkbox('professional_qualifications[]', 'ATT'); ?>>&nbsp;ATT<br />
						<input type="checkbox" name="professional_qualifications[]" value="CIM" <?php echo set_checkbox('professional_qualifications[]', 'CIM'); ?>>&nbsp;CIM<br />
						<input type="checkbox" name="professional_qualifications[]" value="CIMA" <?php echo set_checkbox('professional_qualifications[]', 'CIMA'); ?>>&nbsp;CIMA<br />
						<input type="checkbox" name="professional_qualifications[]" value="CIPD" <?php echo set_checkbox('professional_qualifications[]', 'CIPD'); ?>>&nbsp;CIPD<br />
						<input type="checkbox" name="professional_qualifications[]" value="CIPFA" <?php echo set_checkbox('professional_qualifications[]', 'CIPFA'); ?>>&nbsp;CIPFA<br />
					</td><td>
						<input type="checkbox" name="professional_qualifications[]" value="CMI" <?php echo set_checkbox('professional_qualifications[]', 'CMI'); ?>>&nbsp;CMI<br />
						<input type="checkbox" name="professional_qualifications[]" value="CPI" <?php echo set_checkbox('professional_qualifications[]', 'CPI'); ?>>&nbsp;CPI<br />
						<input type="checkbox" name="professional_qualifications[]" value="CTA" <?php echo set_checkbox('professional_qualifications[]', 'CTA'); ?>>&nbsp;CTA<br />
						<input type="checkbox" name="professional_qualifications[]" value="JIEB" <?php echo set_checkbox('professional_qualifications[]', 'JIEB'); ?>>&nbsp;JIEB<br />
						<input type="checkbox" name="professional_qualifications[]" value="part_qualified_ACA" <?php echo set_checkbox('professional_qualifications[]', 'part_qualified_ACA'); ?>>&nbsp;part-qualified ACA<br />
						<input type="checkbox" name="professional_qualifications[]" value="part_qualified_ACCA" <?php echo set_checkbox('professional_qualifications[]', 'part_qualified_ACCA'); ?>>&nbsp;part-qualified ACCA<br />
						<input type="checkbox" name="professional_qualifications[]" value="SII" <?php echo set_checkbox('professional_qualifications[]', 'SII'); ?>>&nbsp;SII<br />
						<input type="checkbox" name="professional_qualifications[]" value="STEP" <?php echo set_checkbox('professional_qualifications[]', 'STEP'); ?>>&nbsp;STEP<br />
						
						
					</td>                
				</tr>
				<tr>
					<td><input type="checkbox" name="professional_qualifications[]" value="Other" <?php echo set_checkbox('professional_qualifications[]', 'Other'); ?>>&nbsp;Other - please specify<br /></td>
					<td><input type="text" name="other_professional_qualifications" value="<?php echo set_value('other_professional_qualifications'); ?>" />&nbsp;<?php echo form_error('other_professional_qualifications'); ?></td>                
				</tr>
			</table>
			
			<div style="margin-top:15px;">Further information in support of your application * <br />
				Please provide a brief summary of your motivation, key skills, strengths and experience to date (max. 500 words)
			</div>
			<textarea required cols="30" rows="8" name="info"><?php echo set_value('info'); ?></textarea>&nbsp;<?php echo form_error('info'); ?>
			
			<div style="font-weight:bold;font-size:12pt;margin-top:15px;">Section 4 - Upload Your CV*</div>
			<div style="margin-top:15px;">In order for us to assess your application you must attach your CV to this application. To attach your CV, please click on browse to find and select the file on your PC</div>
		
			<input required type="file" name="userfile" /> &nbsp;<?php echo form_error('userfile'); ?>
			
			<div style="font-weight:bold;font-size:12pt;margin-top:15px;">Section 5 - Equal Opportunities</div>
			<div style="margin-top:15px;">
				Baker Tilly Azerbaijan is committed to equality of opportunity in all aspects of employment. Our policy is to provide equal opportunities in recruitment, training and promotion whatever the race, religion, ethnic origin, nationality, age, gender, marital status, sexual orientation, gender reassignment or disability of an employee, considering only the individual's aptitudes and abilities and the requirements of the job.
	<br /><br />The information you provide below is optional. However, if provided, it will be used for monitoring purposes only. It is detached from your application prior to the short-listing process, with the exception of any 'special requirements' which will enable us to ensure that your visit to a Baker Tilly Azerbaijan office is an enjoyable one.
	
			</div>
			
			<table style="width:50%;border:none;margin-top:15px;">
				<tr>
					<td>Date of birth (dd/mm/yyyy):</td>
					<td><input type="text" id="datepicker" style="margin-right: 3px;" name="date_of_birth" value="<?php echo set_value('date_of_birth'); ?>" />&nbsp;<?php echo form_error('date_of_birth'); ?></td>
				</tr>
				<tr>
					<td>Gender:</td>
					<td>
						<select name="gender">
							{gender_values}
						</select>&nbsp;<?php echo form_error('gender'); ?>
					</td>
				</tr>
				<tr>
					<td>Nationality:</td>
					<td>
						<select name="nationality">
							{nationality_values}
						</select>&nbsp;<?php echo form_error('nationality'); ?>
					</td>
				</tr>
				<tr>
					<td>Ethnicity:</td>
					<td>
						<select name="ethnicity">
							{ethnicity_values}
						</select>&nbsp;<?php echo form_error('ethnicity'); ?>
					</td>
				</tr>
				<tr>
					<td>Registered disabled:</td>
					<td>
						<select name="registered_disabled">
							{registered_disabled_values}
						</select>&nbsp;<?php echo form_error('registered_disabled'); ?>
					</td>
				</tr>            
			</table>
			
			<div style="margin-top:15px;">Do you have any special requirements for our selection process or working with Baker Tilly? (Eg adjustments at interview or sponsorship for a work permit). If yes, please specify.</div>
			<input type="radio" name="special_requirements" value="yes" <?php echo set_radio('special_requirements', 'Yes'); ?>>&nbsp;Yes&nbsp;&nbsp;
			<input type="radio" name="special_requirements" value="no" <?php echo set_radio('special_requirements', 'No'); ?>>&nbsp;No &nbsp;<?php echo form_error('special_requirements'); ?>
			
			
			<div style="font-weight:bold;font-size:12pt;margin-top:15px;">Section 6 - Pre-employment Checks</div>
			<div style="margin-top:15px;">Any job offer with Baker Tilly Azerbaijan  will be subject to the following checks:</div>
			<ul>
				<li style="float:none;">References: You will be asked to provide details of two referees, one being your present or most recent employer. Where you have come from full time education, an academic referee can be provided as an alternative.</li>
				<li style="float:none;">Right to work in the Azerbaijan: You will need to show documentation to confirm that you are legally entitled to work in the Azerbaijan (eg a Azerbaijani national identity).</li>
				<li style="float:none;">Disclosure of criminal convictions: You will be asked to declare any criminal convictions. A criminal record will not necessarily make you ineligible for employment if it is declared fully. A decision will be based on the nature of the offence, the nature of the post, offence dates and any other relevant factors. Please note that admission to become an Accountant and membership of certain professional bodies (eg ACA, ACCA, ISCA, ATT, ATII, JIEB) are exempt from the Rehabilitation of Offenders Act (1974).</li>
				<li style="float:none;">Qualifications and memberships: You will be asked to provide proof of relevant academic and professional qualifications (eg certificates).</li>
				<li style="float:none;">Health: You will be asked to complete a pre-employment health questionnaire.</li>			
			</ul>
			
			<div style="font-weight:bold;font-size:12pt;margin-top:15px;">Section 7 - Acceptance of Terms *</div>
			<div style="margin-top:15px;"><strong>Declaration</strong><br />Baker Tilly holds certain job applicant and employee information on computerised databases and in personal manual files to assist with decision making and administration. We make sure that records remain secure, strictly confidential and that information is only used for the purpose intended, which will have been notified to you in advance.
				<br /><br />You shall also use all reasonable endeavours to keep the Firm informed of any changes to your personal data, i.e. your address, qualifications etc.
				<br /><br />The Firm will hold the information that you provide for:</div>
			<ul>
				<li style="float:none;">The duration of your employment if you are successful in your application, and for six years following your departure from the Firm</li>
				<li style="float:none;">For twelve months from the date of your application if you are unsuccessful in your application.
	Please click the 'Submit' button below to indicate your consent to the Firm processing your information as above before proceeding with your application.
	</li>						
			</ul>
		
			<div style="height:15px;"></div>
			<input type="submit" value="Submit" name="submit_btn" style="width:200px;height:25px;" />
		</form>
    </div>
        
      </div>
      <div class="row"> </div>
    </div>
</section>