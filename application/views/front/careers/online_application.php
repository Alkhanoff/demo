
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->

<head>
  <?php $this->load->view('front/include/meta'); ?>
  <?php $this->load->view('front/include/style'); ?>

    <title>Baker Tilly Azerbaijan</title>


</head>

<body id="body">

		<div class="wrap sticky">
        <div class="full-width top">
            <div class="container header">
              <?php $this->load->view('front/include/lang'); ?>

                <div class="row wave">
                    <div class="mainLogo"><a href="http://www.bakertilly.az/index/default_page/"><img src="http://www.bakertilly.az/images/logo.png" width="175" height="57" alt="Baker Tilly Azerbaijan"></a></div>
                    <div class="span-12 pull-right">
                      <?php $this->load->view('front/include/search'); ?>

                      <?php $this->load->view('front/include/nav'); ?>

                    </div>
                </div>
            </div>
        </div>
<section class="full-width main">
    <div class="container">
      <div class="row">
        <div class="span-12">
          <div class="span-16 text-right breadcrumb">You are here: <a href="http://www.bakertilly.az/">Home page</a> > <a href="http://www.bakertilly.az/careers/">Careers</a> > Vacancies</div>
        </div>
      </div>
      <div class="row">
        <div class="side-1">
          <div id="quaternaryNavigation" class="full-width">
            <ul style="height:500px;">
            <li><a href="<?php echo site_url_lang('main/vacancies'); ?>">Vacancies</a></li>
            <li><a href="<?php echo site_url_lang('main/online_application'); ?>">Online application</a></li>
            <li><a href="<?php echo site_url_lang('main/selection_procedures'); ?>">Selection procedures</a></li>
            <li><a href="<?php echo site_url_lang('main/contact_us'); ?>">Contact with our Recruitment Team</a></li>
          </ul>
          </div>
        </div>
        <div class="span-17 content news detail">
          <h1 id="area_1" {display_inline_editor}>Online Application Form</h1>
          <div class="modulecontainer">
		<form action="http://www.bakertilly.az/http://www.bakertilly.az/careers/online_application/save" method="post" accept-charset="utf-8" enctype="multipart/form-data">
			<div style="font-weight:bold;font-size:12pt;margin-top:25px;">INTRODUCTION</div>
			<div>Fields marked with a * are mandatory and must be filled in for you to submit your form.</div>

            <table style="width:50%;border:none;margin-top:15px;">
    			<tr>
					<td>Vacancy:&nbsp;</td>
					<td>
						<select name="vacancy_id">
							<option value="0">Please select</option>

						</select>
					</td>
				</tr>
            </table>

			<div style="font-weight:bold;font-size:12pt;margin-top:15px;">Section 1 - Basic Information</div>

			<table style="width:50%;border:none;margin-top:15px;">
				<tr>
					<td>First name:*</td>
					<td><input type="text" name="firstname" required value="" />&nbsp;</td>
				</tr>
				<tr>
					<td>Middle name:</td>
					<td><input type="text" name="middlename" value="" />&nbsp;</td>
				</tr>
				<tr>
					<td>Last name:*</td>
					<td><input type="text" name="lastname" required value="" />&nbsp;</td>
				</tr>
			</table>

			<div style="font-weight:bold;font-size:12pt;margin-top:15px;">Section 2 - Contact Information</div>

			<table style="width:50%;border:none;margin-top:15px;">
				<tr>
					<td>Email address:*</td>
					<td><input type="email" name="email" required value="" />&nbsp;</td>
				</tr>
				<tr>
					<td>Confirm Email:</td>
					<td><input type="text" name="confirm_email" value="" />&nbsp;</td>
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
					<td><input type="text" required name="mobile" value="" />&nbsp;</td>
				</tr>
			</table>

			<div style="margin-top:15px;">We may use this number for mobile text alerts.</div>

			<table style="width:50%;border:none;margin-top:15px;">
				<tr>
					<td>Home telephone:</td>
					<td><input type="text" name="home" value="" />&nbsp;</td>
				</tr>
				<tr>
					<td>Home address:</td>
					<td><textarea cols="8" rows="5" name="address"></textarea>&nbsp;</td>
				</tr>
				<tr>
					<td>Home postcode:</td>
					<td><input type="text" name="post_code" value="" />&nbsp;</td>
				</tr>
				<tr>
					<td>Contact preference:</td>
					<td>
						<select name="contact_preference">
							<option selected="selected" value="none">Please select</option><option value="email">Email (Preferred)</option><option value="letter">Letter</option><option value="text">Text message</option><option value="mobile_anytime">Call to mobile phone anytime</option><option value="mobile_eve">Call to mobile (EVE)</option><option value="home">Call to home tel</option>
						</select>
					</td>
				</tr>
			</table>

			<div style="font-weight:bold;font-size:12pt;margin-top:15px;">Section 3 - Employment Details</div>

			<table style="width:50%;border:none;margin-top:15px;">
				<tr>
					<td>Current or most recent employer:*</td>
					<td><input type="text" name="current_employer" value="" />&nbsp;</td>
				</tr>
				<tr>
					<td>Current or most recent job title:</td>
					<td><input type="text" name="current_job_title" value="" />&nbsp;</td>
				</tr>
				<tr>
					<td>Current or most recent base salary:*</td>
					<td>
						<select name="current_salary">
							<option selected="selected" value="none">Please select</option><option value="lt_6000">Less than AZN 6,000</option><option value="azn_6_10000">AZN 6-10,000</option><option value="azn_11_15000">AZN 11-15,000</option><option value="azn_16_20000">AZN 16-20,000</option><option value="azn_21_25000">AZN 21-25,000</option><option value="azn_26_30000">AZN 26-30,000</option><option value="azn_31_35000">AZN 31-35,000</option><option value="azn_36_40000">AZN 36-40,000</option><option value="azn_41_45000">AZN 41-45,000</option><option value="azn_46_50000">AZN 46-50,000</option><option value="azn_51_55000">AZN 51-55,000</option><option value="azn_56_60000">AZN 56-60,000</option><option value="azn_61_65000">AZN 61-65,000</option><option value="azn_66_70000">AZN 66-70,000</option><option value="azn_71_75000">AZN 71-75,000</option><option value="azn_76_80000">AZN 76-80,000</option><option value="azn_81_85000">AZN 81-85,000</option><option value="azn_86_90000">AZN 86-90,000</option><option value="azn_91_100000">AZN 91-100,000</option>
						</select> &nbsp;					</td>
				</tr>
				<tr>
					<td>Salary expectation:*</td>
					<td>
						<select name="salary_expectation" required>
							<option selected="selected" value="none">Please select</option><option value="lt_6000">Less than AZN 6,000</option><option value="azn_6_10000">AZN 6-10,000</option><option value="azn_11_15000">AZN 11-15,000</option><option value="azn_16_20000">AZN 16-20,000</option><option value="azn_21_25000">AZN 21-25,000</option><option value="azn_26_30000">AZN 26-30,000</option><option value="azn_31_35000">AZN 31-35,000</option><option value="azn_36_40000">AZN 36-40,000</option><option value="azn_41_45000">AZN 41-45,000</option><option value="azn_46_50000">AZN 46-50,000</option><option value="azn_51_55000">AZN 51-55,000</option><option value="azn_56_60000">AZN 56-60,000</option><option value="azn_61_65000">AZN 61-65,000</option><option value="azn_66_70000">AZN 66-70,000</option><option value="azn_71_75000">AZN 71-75,000</option><option value="azn_76_80000">AZN 76-80,000</option><option value="azn_81_85000">AZN 81-85,000</option><option value="azn_86_90000">AZN 86-90,000</option><option value="azn_91_100000">AZN 91-100,000</option>
						</select>&nbsp;					</td>
				</tr>
				<tr>
					<td colspan="2">Profesional qualifications: &nbsp;</td>
				</tr>
				<tr>
					<td>
						<input type="checkbox" name="professional_qualifications[]" value="AAT" >&nbsp;AAT<br />
						<input type="checkbox" name="professional_qualifications[]" value="ACA" >&nbsp;ACA<br />
						<input type="checkbox" name="professional_qualifications[]" value="ACCA" >&nbsp;ACCA<br />
						<input type="checkbox" name="professional_qualifications[]" value="ATII" >&nbsp;ATII<br />
						<input type="checkbox" name="professional_qualifications[]" value="ATT" >&nbsp;ATT<br />
						<input type="checkbox" name="professional_qualifications[]" value="CIM" >&nbsp;CIM<br />
						<input type="checkbox" name="professional_qualifications[]" value="CIMA" >&nbsp;CIMA<br />
						<input type="checkbox" name="professional_qualifications[]" value="CIPD" >&nbsp;CIPD<br />
						<input type="checkbox" name="professional_qualifications[]" value="CIPFA" >&nbsp;CIPFA<br />
					</td><td>
						<input type="checkbox" name="professional_qualifications[]" value="CMI" >&nbsp;CMI<br />
						<input type="checkbox" name="professional_qualifications[]" value="CPI" >&nbsp;CPI<br />
						<input type="checkbox" name="professional_qualifications[]" value="CTA" >&nbsp;CTA<br />
						<input type="checkbox" name="professional_qualifications[]" value="JIEB" >&nbsp;JIEB<br />
						<input type="checkbox" name="professional_qualifications[]" value="part_qualified_ACA" >&nbsp;part-qualified ACA<br />
						<input type="checkbox" name="professional_qualifications[]" value="part_qualified_ACCA" >&nbsp;part-qualified ACCA<br />
						<input type="checkbox" name="professional_qualifications[]" value="SII" >&nbsp;SII<br />
						<input type="checkbox" name="professional_qualifications[]" value="STEP" >&nbsp;STEP<br />


					</td>
				</tr>
				<tr>
					<td><input type="checkbox" name="professional_qualifications[]" value="Other" >&nbsp;Other - please specify<br /></td>
					<td><input type="text" name="other_professional_qualifications" value="" />&nbsp;</td>
				</tr>
			</table>

			<div style="margin-top:15px;">Further information in support of your application * <br />
				Please provide a brief summary of your motivation, key skills, strengths and experience to date (max. 500 words)
			</div>
			<textarea required cols="30" rows="8" name="info"></textarea>&nbsp;
			<div style="font-weight:bold;font-size:12pt;margin-top:15px;">Section 4 - Upload Your CV*</div>
			<div style="margin-top:15px;">In order for us to assess your application you must attach your CV to this application. To attach your CV, please click on browse to find and select the file on your PC</div>

			<input required type="file" name="userfile" /> &nbsp;
			<div style="font-weight:bold;font-size:12pt;margin-top:15px;">Section 5 - Equal Opportunities</div>
			<div style="margin-top:15px;">
				Baker Tilly Azerbaijan is committed to equality of opportunity in all aspects of employment. Our policy is to provide equal opportunities in recruitment, training and promotion whatever the race, religion, ethnic origin, nationality, age, gender, marital status, sexual orientation, gender reassignment or disability of an employee, considering only the individual's aptitudes and abilities and the requirements of the job.
	<br /><br />The information you provide below is optional. However, if provided, it will be used for monitoring purposes only. It is detached from your application prior to the short-listing process, with the exception of any 'special requirements' which will enable us to ensure that your visit to a Baker Tilly Azerbaijan office is an enjoyable one.

			</div>

			<table style="width:50%;border:none;margin-top:15px;">
				<tr>
					<td>Date of birth (dd/mm/yyyy):</td>
					<td><input type="text" id="datepicker" style="margin-right: 3px;" name="date_of_birth" value="" />&nbsp;</td>
				</tr>
				<tr>
					<td>Gender:</td>
					<td>
						<select name="gender">
							<option selected="selected" value="none">Please select</option><option value="male">Male</option><option value="female">Female</option><option value="not_disclosure">I do not wish to disclosure</option>
						</select>&nbsp;					</td>
				</tr>
				<tr>
					<td>Nationality:</td>
					<td>
						<select name="nationality">
							<option selected="selected" value="none">Please select</option><option value="British">British</option><option value="Albanian">Albanian</option><option value="Algerian">Algerian</option><option value="American">American</option><option value="Angolan">Angolan</option><option value="Anguillan">Anguillan</option><option value="Antiguan">Antiguan</option><option value="Argentinian">Argentinian</option><option value="Armenian">Armenian</option><option value="Australian">Australian</option><option value="Austrian">Austrian</option><option value="Azerbaijan">Azerbaijan</option><option value="Bahraini">Bahraini</option><option value="Bangladeshi">Bangladeshi</option><option value="Barbadian">Barbadian</option><option value="Belgian">Belgian</option><option value="Benin">Benin</option><option value="Bermudian">Bermudian</option><option value="Bhutan">Bhutan</option><option value="Bolivian">Bolivian</option><option value="Botswana">Botswana</option><option value="Brazilian">Brazilian</option><option value="Brunei">Brunei</option><option value="Bulgarian">Bulgarian</option><option value="Burkina_Faso">Burkina Faso</option><option value="Cameroon">Cameroon</option><option value="Canadian">Canadian</option><option value="Cape_Verde">Cape Verde</option><option value="Caribbean">Caribbean</option><option value="Channel_Islander">Channel Islander</option><option value="Chinese">Chinese</option><option value="Central_African">Central African</option><option value="Colombian">Colombian</option><option value="Comoro_Islander">Comoro Islander</option><option value="Congo">Congo</option><option value="Costa_Rican">Costa Rican</option><option value="Croatian">Croatian</option><option value="Cuban">Cuban</option><option value="Cypriot">Cypriot</option><option value="Czech">Czech</option><option value="Danish">Danish</option><option value="Djibouti">Djibouti</option><option value="Dominican_Rep">Dominican Rep</option><option value="Dutch">Dutch</option><option value="Ecuadorean">Ecuadorean</option><option value="Egyptian">Egyptian</option><option value="Estonian">Estonian</option><option value="Ethiopian">Ethiopian</option><option value="Fijian">Fijian</option><option value="Filipino">Filipino</option><option value="Finnish">Finnish</option><option value="French">French</option><option value="Gabon">Gabon</option><option value="Gambian">Gambian</option><option value="German">German</option><option value="Ghanaian">Ghanaian</option><option value="Gibraltarian">Gibraltarian</option><option value="Greek">Greek</option><option value="Grenadian">Grenadian</option><option value="Guatamalan">Guatamalan</option><option value="Guinea-bissau">Guinea-bissau</option><option value="Guinean">Guinean</option><option value="Guyana">Guyana</option><option value="Haitian">Haitian</option><option value="Honduran">Honduran</option><option value="Hong_Kong">Hong Kong</option><option value="Hungarian">Hungarian</option><option value="Icelander">Icelander</option><option value="Indian">Indian</option><option value="Indonesian">Indonesian</option><option value="Iranian">Iranian</option><option value="Iraqi">Iraqi</option><option value="Irish">Irish</option><option value="Israeli">Israeli</option><option value="Italian">Italian</option><option value="Ivory_Coast">Ivory Coast</option><option value="Jamaican">Jamaican</option><option value="Japanese">Japanese</option><option value="Jordanian">Jordanian</option><option value="Kampuchean">Kampuchean</option><option value="Kazakh">Kazakh</option><option value="Kenyan">Kenyan</option><option value="Kiribati">Kiribati</option><option value="Korean">Korean</option><option value="Kuwaiti">Kuwaiti</option><option value="Laotian">Laotian</option><option value="Latvian">Latvian</option><option value="Lebanese">Lebanese</option><option value="Lesotho">Lesotho</option><option value="Liberian">Liberian</option><option value="Libyan">Libyan</option><option value="Lithuanian">Lithuanian</option><option value="Luxemburger">Luxemburger</option><option value="Macedonian">Macedonian</option><option value="Malagasy">Malagasy</option><option value="Malawian">Malawian</option><option value="Malaysian">Malaysian</option><option value="Maldives">Maldives</option><option value="Mali">Mali</option><option value="Maltese">Maltese</option><option value="Mauritania">Mauritania</option><option value="Mauritian">Mauritian</option><option value="Mexican">Mexican</option><option value="Mongolian">Mongolian</option><option value="Montserrat">Montserrat</option><option value="Moroccan">Moroccan</option><option value="Mozambican">Mozambican</option><option value="Namibia">Namibia</option><option value="Nepalese">Nepalese</option><option value="Nevis">Nevis</option><option value="New_Zealander">New Zealander</option><option value="Nicaraguan">Nicaraguan</option><option value="Niger">Niger</option><option value="Nigerian">Nigerian</option><option value="Norwegian">Norwegian</option><option value="Oman">Oman</option><option value="Pakistani">Pakistani</option><option value="Panamanian">Panamanian</option><option value="Papua_New_Gunea">Papua New Gunea</option><option value="Paraguayan">Paraguayan</option><option value="Peruvian">Peruvian</option><option value="Pole">Pole</option><option value="Portuguese">Portuguese</option><option value="Qatar">Qatar</option><option value="Romanian">Romanian</option><option value="Russian">Russian</option><option value="Rwandan">Rwandan</option><option value="Salvadorean">Salvadorean</option><option value="Sao_Tome_Principality">Sao Tome & Principality</option><option value="Saudi_Arabian">Saudi Arabian</option><option value="Senegal">Senegal</option><option value="Seychellois">Seychellois</option><option value="Sierra_Leonean">Sierra Leonean</option><option value="Singaporean">Singaporean</option><option value="Slovak">Slovak</option><option value="Slovenian">Slovenian</option><option value="Solomon_Islander">Solomon Islander</option><option value="Somalian">Somalian</option><option value="South_African">South African</option><option value="Spaniard">Spaniard</option><option value="Sri_Lankan">Sri Lankan</option><option value="St_Helenan">St Helenan</option><option value="St_Kitts">St Kitts</option><option value="St_Lucian">St Lucian</option><option value="St_Vincent">St Vincent</option><option value="Sudanese">Sudanese</option><option value="Surinamese">Surinamese</option><option value="Swaziland">Swaziland</option><option value="Swedish">Swedish</option><option value="Swiss">Swiss</option><option value="Syrian">Syrian</option><option value="Taiwanese">Taiwanese</option><option value="Tanzanian">Tanzanian</option><option value="Thai">Thai</option><option value="Togolese">Togolese</option><option value="Tongan">Tongan</option><option value="Trinidad_Tobago">Trinidad & Tobago</option><option value="Tunisian">Tunisian</option><option value="Turkish">Turkish</option><option value="Turks_Caicos">Turks & Caicos</option><option value="Ugandan">Ugandan</option><option value="Ukrainian">Ukrainian</option><option value="United_Arab_Emirates">United Arab Emirates</option><option value="Uruguayan">Uruguayan</option><option value="Uzbekistan">Uzbekistan</option><option value="Vanuatu">Vanuatu</option><option value="Venezuelan">Venezuelan</option><option value="Vietnamese">Vietnamese</option><option value="Virgin_Islander">Virgin Islander</option><option value="West_German">West German</option><option value="Western_Samoan">Western Samoan</option><option value="Yemen_Arab_Republic">Yemen Arab Republic</option><option value="Yugoslavian">Yugoslavian</option><option value="Zairean">Zairean</option><option value="Zambian">Zambian</option><option value="Zimbabwean">Zimbabwean</option><option value="Not_disclosed">Not disclosed</option>
						</select>&nbsp;					</td>
				</tr>
				<tr>
					<td>Ethnicity:</td>
					<td>
						<select name="ethnicity">
							<option selected="selected" value="none">Please select</option><option value="White">White</option><option value="White_-_British">White - British</option><option value="White_-_Irish">White - Irish</option><option value="White_-_Other">White - Other</option><option value="Mixed">Mixed</option><option value="Mixed_-_White_and_Black_Caribbean">Mixed - White and Black Caribbean</option><option value="Mixed_-_White_and_Black_African">Mixed - White and Black African</option><option value="Mixed_-_White_and_Asian">Mixed - White and Asian</option><option value="Mixed_-_Other">Mixed - Other</option><option value="Asian_or_Asian_British">Asian or Asian British</option><option value="Asian_or_Asian_British_-_Indian">Asian or Asian British - Indian</option><option value="Asian_or_Asian_British_-_Pakistani">Asian or Asian British - Pakistani</option><option value="Asian_or_Asian_British_-_Bangladeshi">Asian or Asian British - Bangladeshi</option><option value="Asian_or_Asian_British_-_Other">Asian or Asian British - Other</option><option value="Black_or_Black_British">Black or Black British</option><option value="Black_or_Black_British_-_Caribbean">Black or Black British - Caribbean</option><option value="Black_or_Black_British_-_African">Black or Black British - African</option><option value="Black_or_Black_British_-_Other">Black or Black British - Other</option><option value="Chinese_or_other_ethnic_group">Chinese or other ethnic group</option><option value="Not_disclosed">Not disclosed</option>
						</select>&nbsp;					</td>
				</tr>
				<tr>
					<td>Registered disabled:</td>
					<td>
						<select name="registered_disabled">
							<option selected="selected" value="none">Please select</option><option value="Yes">Yes</option><option value="No">No</option><option value="Not_disclosed">I do not wish to disclosure</option>
						</select>&nbsp;					</td>
				</tr>
			</table>

			<div style="margin-top:15px;">Do you have any special requirements for our selection process or working with Baker Tilly? (Eg adjustments at interview or sponsorship for a work permit). If yes, please specify.</div>
			<input type="radio" name="special_requirements" value="yes" >&nbsp;Yes&nbsp;&nbsp;
			<input type="radio" name="special_requirements" value="no" >&nbsp;No &nbsp;

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
<?php $this->load->view('front/include/footer'); ?>
</div>
<div id="status"></div>
<button style="display:none;" id="save">Save changes</button>
<?php $this->load->view('front/include/script'); ?>
</body>
</html>
