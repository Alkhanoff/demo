
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
	        	<li class="active-li"><a href="http://www.bakertilly.az/careers/vacancies/">Vacancies</a></li>
	        	<li><a href="http://www.bakertilly.az/careers/online_application/">Online application</a></li>
	        	<li><a href="http://www.bakertilly.az/careers/selection_procedures/">Selection procedures</a></li>
	        	<li><a href="http://www.bakertilly.az/careers/track_application_status/">Track application status</a></li>
	        	<li><a href="http://www.bakertilly.az/careers/contact/">Contact with our Recruitment Team</a></li>
        	</ul>
          </div>
        </div>
        <div class="span-17 content news detail">
          <h1>Vacancies</h1>
          <div class="modulecontainer">
        		<div class="pagination" style="display:none;">
        			<div class="results">Results 1 - 0 of 0</div>
        			<span id="pager">

        			</span>
        		</div>

        		<div>
        			<ul class="vacancies"></ul>
        		</div>

        		<div class="pagination" style="display:none;">
        			<div class="results">Results 1 - 0 of 0</div>
        			<span id="pager">

        			</span>
        		</div>
        	</div>

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
