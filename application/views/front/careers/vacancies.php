
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
          <h1>Vacancies</h1>
          <div class="modulecontainer">
        		<div class="pagination" style="display:none;">
        			<div class="results">Results 1 - 0 of 0</div>
        			<span id="pager">

        			</span>
        		</div>

        		<div>
        			<ul class="vacancies"></ul>


              <h2>Salam</h2>
              <div class="col-md-12">

                        <ul style="margin:0;" class="unstyled ">
																										<li style="margin-top:0;margin-bottom:10px;"><h3 style="display: inline">Vəzifə:    saassa</h3></li>
                                                  	<li style="margin-top:0;margin-bottom:10px;"><h3 style="display: inline">Sektor:    saassa</h3></li>
                                                  	<li style="margin-top:0;margin-bottom:10px;"><h3 style="display: inline">Əməkhaqqı:    saassa</h3></li>

                                              </div>
                                              <div class="col-md-6" style="width: 50%;">
                                <p style="font-size: 14px;">saaaaaaaaaaaaaaaaaaaaaaaaa
                          
                     </p>
                                                                              </div>

							</ul>

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
