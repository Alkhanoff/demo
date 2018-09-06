

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
          <div class="span-16 text-right breadcrumb">You are here: <a href="http://www.bakertilly.az/">Home page</a> > Selection procedures</div>
        </div>
      </div>
      <div class="row">
        <div class="side-1">
          <div id="quaternaryNavigation" class="full-width">
            <ul style="height:500px;">
	        	<li><a href="http://www.bakertilly.az/careers/vacancies/">Vacancies</a></li>
	        	<li><a href="http://www.bakertilly.az/careers/online_application/">Online application</a></li>
	        	<li class="active-li"><a href="http://www.bakertilly.az/careers/selection_procedures/">Selection procedures</a></li>
	        	<li><a href="http://www.bakertilly.az/careers/track_application_status/">Track application status</a></li>
	        	<li><a href="http://www.bakertilly.az/careers/contact/">Contact with our Recruitment Team</a></li>
        	</ul>
          </div>
        </div>
        <div class="span-17 content news detail">
          <h1>Selection procedures</h1>
          <div id="area_2" ><p>If you are certain that you want to work for us, have found an advertisement corresponding to your professional interests in the Vacancies and also fulfil all requirements we expect from the candidates, the first step you have to make is completing the application form, which can be found under the job offer in which you are interested. Your selection process will look as follows: <br></p><p><strong>1. Evaluation of job application by our Recruitment </strong><br></p><p>Team Each application we receive is screened by our recruitment team and experienced professionals from the service line to which the candidate is applying.<br></p><p> <strong>2. Interview phase</strong> <br></p><p>Depending on vacancy, for all positions we conduct two or three interviews. The first interview is usually organized by our recruitment team, who discusses the application with the candidate, verifies the information, and fills in any missing data. The successful candidates from the first round are invited to following interviews with related department directors, senior managers and partners from the appropriate service line. <br></p><p><strong>3. Offer </strong><br></p><p>We will make an offer to all those we think are best suited to fill a vacant position and pursue a career with Baker Tilly Azerbaijan.<br></p></div>
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
