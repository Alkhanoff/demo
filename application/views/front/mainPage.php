
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<!-- Head -->
<head>
	<?php $this->load->view('front/include/meta'); ?>

<?php $this->load->view('front/include/style'); ?>

<link href="<?php echo base_url(); ?>images/img/favicon.html" rel="shortcut icon" />
<title>Baker Tilly Azerbaijan</title>



</head>
<body id="body">

		<div class="wrap sticky">
        <div class="full-width top">
            <div class="container header">
              <!--language  -->
              <?php $this->load->view('front/include/lang'); ?>

                <div class="row wave">
                    <?php $this->load->view('front/include/mainlogo'); ?>
                    <div class="span-12 pull-right">
                      <!-- Search -->
                      <?php $this->load->view('front/include/search'); ?>
                      <!-- Naviqation -->
                        <?php $this->load->view('front/include/nav'); ?>
                    </div>
                </div>
            </div>
        </div>


<section class="full-width main">
    <div class="container">
        <div class="row">
            <div class="span-12">
              <!-- Slider -->
              <?php $this->load->view('front/include/slider'); ?>
            </div>
        </div>
        <div class="row">
            <div class="span-12">
                <div class="callout-3-col">
                    <h2 ><?=label("main_sectors")?></h2>
                    <div class="inner">
                        <ul style="margin:0;" class="unstyled text-only-li">
													<?php foreach ($item as $item) {

                               $lang = getLang();
														?>
													<li style="margin-top:0;margin-bottom:10px;"><a href=""><?php echo $item['title_'.$lang]; ?></a></li>
											<?php		}  ?>

							</ul>
                    </div>
                </div>
                <div class="callout-3-col">
                    <h2 ><?=label("about_us")?></h2>
                    <div class="inner">

											<p id="area_1" ><?php echo  word_limiter($about["text_".$lang],70); ?></p>
											<a class="link" href="<?php echo site_url_lang('main/about'); ?>"><?=label("read_more") ?></a>

                    </div>
                </div>
                <div class="callout-3-col">
                    <h2 ><?=label("main_publications")?></h2>
                    <div class="inner">
													<?php foreach ($pub as $pub) {	?>
                        <div class="flexslider-2">

																<ul class="unstyled image-li slides">
		 	   <li>
			      <a href="#">
			         <img style="padding-right:10px;" height="68" width="90" src="<?php base_url(); ?><?php echo $pub['image']; ?>" alt="">
			         <div class="detail">
			            <h3><?php echo  word_limiter($pub['title_'.$lang],15);?>&#8230;</h3>
			            <div class="date"><?php echo  $pub['date']; ?></div>
			         </div>
			      </a>

			   </li>
			</ul>

												  </div>
														<?php } ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>



<!-- Footer -->
<?php $this->load->view('front/include/footer'); ?>


</div>
<div id="status"></div>
<button style="display:none;" id="save">Save changes</button>
<!--Script  -->
<?php $this->load->view('front/include/script');  ?>
</body>

</html>
