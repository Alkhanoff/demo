
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
                    <div class="mainLogo"><a href="index.html"><img src="<?php echo base_url(); ?>images/logo.png" width="175" height="57" alt="Baker Tilly Azerbaijan"></a></div>
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
                    <h2 >Əsas sektorlar</h2>
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
                    <h2 >Haqqımızda</h2>
                    <div class="inner">
                        <p id="area_1" >Baker Tilly Azerbaijan is a member of Baker Tilly International (link to BT International), a global network of 125 independent firms in 147 countries providing audit and consulting services.&nbsp;<br>​<br>We're a national firm operating since April 2007 with around 70 employees generating a fee income of 3,5 million AZN annually. Today we are among TOP 5 largest accounting and business advisory firms in Azerbaijan by combined revenue and contract amounts.&nbsp;With a network of more than 100 companies across Azerbaijan, we are your local firm with global capacity.<br></p>
                        <a class="link" href="http://www.bakertilly.az/about/">Read more</a>
                    </div>
                </div>
                <div class="callout-3-col">
                    <h2 >Yeni nəşrlər</h2>
                    <div class="inner">
                        <div class="flexslider-2">
                            <ul class="unstyled image-li slides"><li><a href="http://www.bakertilly.az/publications_and_views/details/40/"><img style="padding-right:10px;" height="68" width="90" src="<?php base_url(); ?>uploads/IMG_1194_new1.jpg" alt="Baker Tilly Azerbaijan held a meeting with graduates who earned 700 points at the entrance exams this year."><div class="detail"><h3>Baker Tilly Azerbaijan held a meeting with&#8230;</h3><div class="date">21.06.2018</div></div></a><a href="http://www.bakertilly.az/publications_and_views/details/39/"><img style="padding-right:10px;" height="68" width="90" src="../../uploads/download.jpg" alt="Baker Tilly Azerbaijan invites you to the seminar on recent amendments to the Tax Code of Azerbaijan Republic"><div class="detail"><h3>Baker Tilly Azerbaijan invites you to the&#8230;</h3><div class="date">03.02.2018</div></div></a><a href="http://www.bakertilly.az/publications_and_views/details/38/"><img style="padding-right:10px;" height="68" width="90" src="../../uploads/tax.jpg" alt="Baker Tilly Azerbaijan's Tax & Legal Newsletter, Dec'15"><div class="detail"><h3>Baker Tilly Azerbaijan's Tax & Legal Newsletter,&#8230;</h3><div class="date">18.12.2015</div></div></a></li></ul>
                        </div>
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
