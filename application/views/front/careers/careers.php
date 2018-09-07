
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->

<head>
  <?php $this->load->view('front/include/meta'); ?>
    <?php $this->load->view('front/include/style'); ?>
    <title>Baker Tilly Azerbaijan</title>

    <
</head>

<body id="body">

		<div class="wrap sticky">
        <div class="full-width top">
            <div class="container header">
                <?php $this->load->view('front/include/lang'); ?>
                <div class="row wave">
                      <?php $this->load->view('front/include/mainlogo'); ?>
                        <?php $this->load->view('front/include/search'); ?>
                        <?php $this->load->view('front/include/nav'); ?>
                    </div>
                </div>
            </div>
        </div>

<<section class="full-width main">
    <div class="container">
      <div class="row">
        <div class="span-12">
          <div class="span-16 text-right breadcrumb">You are here: <a href="http://www.bakertilly.az/">Home page</a> > Careers</div>
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
          <h1>Careers</h1>
          <div style="height:395px;padding:0;margin:0;width:100%;"><img style="position:relative;" src="http://www.bakertilly.az/images/careers.jpg" alt="" /></div>
          <div id="area_2" ><p>Baker Tilly Azerbaijan has always been known for its dynamic and discerning HR policies. We believe that having the right people on board is the best strategy for sustainable corporate success, and have invested accordingly in developing one of the brightest and most capable teams in the business. Our innovative team-building strategy comprises three simple steps:&nbsp;<br></p><ul><li>Finding the right people with the required levels of competence – people for whom “just doing the job” won’t suffice <br></li><li>Growing them into first-rate professionals through our program of training and international apprenticeship, as well as extensive fieldwork on diverse projects<br></li><li>Providing our staff with sufficient professional and emotional motivation with advancement, and our system of corporate benefits to ensure the professional capital we helped develop stays with the company and contributes to our overall professional growth <br></li></ul><p>Formal requirements to our job applicants include: <br></p><ul><li>Higher education (or last-year students) that would satisfy the requirements of chosen position <br></li><li>Appropriate level of Azerbaijani and English language skills, adequate level of Russian language skills are appreciated <br></li><li>Ability to meet deadlines <br></li><li>Dynamic team player<br></li><li>Great communication skills <br></li></ul><p>If you recognize yourself in the frame described above, and are anxious to become part of one of the best professional companies in Azerbaijan, you fill in the application form from <a data-cke-saved-href="http://www.bakertilly.az/careers/online_application/" href="http://www.bakertilly.az/careers/online_application/">here</a> or&nbsp;send your Application to e-mail address - <a data-cke-saved-href="mailto:careers@bakertilly.az" href="mailto:careers@bakertilly.az">careers@bakertilly.az</a>&nbsp;<br></p></div>
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
