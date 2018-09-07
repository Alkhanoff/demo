
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
                <?php $this->load->view('front/include/mainlogo'); ?>
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
          <div class="span-16 text-right breadcrumb">You are here: <a href="http://www.bakertilly.az/">Home page</a> > <a href="http://www.bakertilly.az/careers/">Careers</a> › Contact with our Recruitment Team</div>
        </div>
      </div>
      <div class="row">
        <div class="side-1">
          <div id="quaternaryNavigation" class="full-width">
            <ul style="height:500px;">
	        	<li><a href="http://www.bakertilly.az/careers/vacancies/">Vacancies</a></li>
	        	<li><a href="http://www.bakertilly.az/careers/online_application/">Online application</a></li>
	        	<li><a href="http://www.bakertilly.az/careers/selection_procedures/">Selection procedures</a></li>
	        	<li><a href="http://www.bakertilly.az/careers/track_application_status/">Track application status</a></li>
	        	<li class="active-li"><a href="http://www.bakertilly.az/careers/contact/">Contact with our Recruitment Team</a></li>
        	</ul>
          </div>
        </div>
        <div class="span-17 content news detail">
          <form method="post" action="<?php echo site_url_lang('main/message'); ?>">
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
						<td style="width:50%;">Your name&nbsp;</td>
						<td style="width:50%;padding-top:5px;"><input style="width:97%;height:20px;font-size:15px;border: 1px solid #bbb;" value="" type="text" name="name" required/></td>
					</tr>
					<tr>
						<td style="width:50%;">Your email address:&nbsp;</td>
						<td style="width:50%;padding-top:5px;"><input style="width:97%;height:20px;font-size:15px;border: 1px solid #bbb;" value="" type="email" name="mail" required/></td>
					</tr>
					<tr>
						<td style="width:50%;">Your phone number:&nbsp;</td>
						<td style="width:50%;padding-top:5px;"><input style="width:97%;height:20px;font-size:15px;border: 1px solid #bbb;" value="" type="text" name="phone" /></td>
					</tr>

					<tr>
						<td colspan="2" style="text-align: left;padding-top:8px;">
						Please type your message here:&nbsp;<br /><br />
						<textarea name="message" cols="100" rows="15"></textarea>
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
<?php $this->load->view('front/include/footer'); ?>

</div>
<div id="status"></div>
<button style="display:none;" id="save">Save changes</button>
<?php $this->load->view('front/include/script'); ?>

</body>
</html>
