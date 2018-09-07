
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta http-equiv="resource-type" content="text/html; charset=utf-8" />
    <meta http-equiv="imagetoolbar" content="no" />
    <meta http-equiv="reply-to" content="orkhan.huseynov@live.com" />
    <meta name="title" content="orkhan.huseynov@live.com" />
    <meta name="author" content="Orkhan Huseynov" />
    <meta name="description" content="iON Group" />
    <meta name="keywords" content="iON Group" />
    <meta name="revisit-after" content="7 days" />
    <meta name="copyright" content="&copy; Orkhan Huseynov" />
    <meta name="viewport" content="width=device-width">

    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

    <link rel="stylesheet" href="http://www.bakertilly.az/css/normalize.css">
    <link rel="stylesheet" href="http://www.bakertilly.az/css/main.css">
    <link rel="stylesheet" href="http://www.bakertilly.az/css/layout.css">
    <link rel="stylesheet" href="http://www.bakertilly.az/css/style.css">
    <link rel="stylesheet" href="http://www.bakertilly.az/css/print.css" media="print">
    <link href="http://www.bakertilly.az//images/img/favicon.png" rel="shortcut icon" />


    <script src="http://www.bakertilly.az/ckeditor/ckeditor.js" type="text/javascript"></script>
  	<script src="http://www.bakertilly.az/js/jquery-1.7.1.min.js" type="text/javascript"></script>
  	<script src="http://www.bakertilly.az/js/jquery.flexslider-min.js"></script>
  	<script src="http://www.bakertilly.az/js/scripts.js"></script>


    <!--[if lt IE 8]>
        <style type="text/css">
        li a {display:inline-block;}
        li a {display:block;}
        </style>
    <![endif]-->

    <title>Baker Tilly Azerbaijan</title>

    <!-- Begin Custom Scripts -->
    <script type="text/javascript">
       jQuery(function($) {
         $('#save').click(function(){
            var area_1 = $('#area_1').html();
            var area_2 = $('#area_2').html();
            var area_3 = $('#area_3').html();
            var area_4 = $('#area_4').html();
            var area_5 = $('#area_5').html();
            var area_6 = $('#area_6').html();
            var area_7 = $('#area_7').html();
            var area_8 = $('#area_8').html();
            var area_9 = $('#area_9').html();
            var area_10 = $('#area_10').html();
            var area_11 = $('#area_11').html();
            var area_12 = $('#area_12').html();
            var area_13 = $('#area_13').html();
            var area_14 = $('#area_14').html();
            var area_15 = $('#area_15').html();
            var area_16 = $('#area_16').html();
            var area_17 = $('#area_17').html();
            var area_18 = $('#area_18').html();
            var area_19 = $('#area_19').html();
            var area_20 = $('#area_20').html();
            var area_21 = $('#area_21').html();
            var area_22 = $('#area_22').html();
            var area_23 = $('#area_23').html();
            var area_24 = $('#area_24').html();
            var area_25 = $('#area_25').html();
            var area_26 = $('#area_26').html();
            var area_27 = $('#area_27').html();
            var area_28 = $('#area_28').html();
            var area_29 = $('#area_29').html();
            var area_30 = $('#area_30').html();
            var area_31 = $('#area_31').html();
            var area_32 = $('#area_32').html();
            var area_33 = $('#area_33').html();
            var area_34 = $('#area_34').html();
            var area_35 = $('#area_35').html();
            var area_36 = $('#area_36').html();
            var area_37 = $('#area_37').html();
            var area_38 = $('#area_38').html();
            var area_39 = $('#area_39').html();
            var area_40 = $('#area_40').html();
             $.ajax({
               url: 'http://www.bakertilly.az/index/update_area/3/',
               type: 'POST',
               data: {
                 content_1: area_1,
                 content_2: area_2,
                 content_3: area_3,
                 content_4: area_4,
                 content_5: area_5,
                 content_6: area_6,
                 content_7: area_7,
                 content_8: area_8,
                 content_9: area_9,
                 content_10: area_10,
                 content_11: area_11,
                 content_12: area_12,
                 content_13: area_13,
                 content_14: area_14,
                 content_15: area_15,
                 content_16: area_16,
                 content_17: area_17,
                 content_18: area_18,
                 content_19: area_19,
                 content_20: area_20,
                 content_21: area_21,
                 content_22: area_22,
                 content_23: area_23,
                 content_24: area_24,
                 content_25: area_25,
                 content_26: area_26,
                 content_27: area_27,
                 content_28: area_28,
                 content_29: area_29,
                 content_30: area_30,
                 content_31: area_31,
                 content_32: area_32,
                 content_33: area_33,
                 content_34: area_34,
                 content_35: area_35,
                 content_36: area_36,
                 content_37: area_37,
                 content_38: area_38,
                 content_39: area_39,
                 content_40: area_40
               },
				 beforeSend:function(){
					 $("#status")
					  .addClass("success")
                      .html("Loading, please wait..")
					  .fadeIn('slow');
				 },
                success:function (data) {
                   if (data == '1')
                   {
                      $("#status")
                      .addClass("success")
                      .html("Data saved successfully")
                      .fadeIn('slow')
                      .delay(3000)
                      .fadeOut('slow');
                   }
                   else
                   {
                       $("#status")
                       .addClass("error")
                       .html("Error, data could not be saved")
                       .fadeIn('slow')
                       .delay(3000)
                       .fadeOut('slow');
                   }
               }
             });
         });

			$.noConflict();
         });
    </script>
    <!-- End Custom Scripts -->
</head>

<body id="body">
    <!--[if lt IE 7]>
        <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
    <![endif]-->

    <!-- Add your site or application content here -->
		<div class="wrap sticky">
        <div class="full-width top">
            <div class="container header">
                <div class="languageDropdown">
                    <div class="dd-label">Location:</div>
                    <ul class="unstyled">
                        <li><a href="http://www.bakertilly.az/index/lang/en/services">Azerbaijan <span>ENG</span></a></li>
                                      <li><a href="http://www.bakertilly.az/index/lang/az/services">Azerbaijan <span>AZE</span></a></li>                    </ul>
                </div>
                <div class="row wave">
                    <div class="mainLogo"><a href="http://www.bakertilly.az/index/default_page/"><img src="http://www.bakertilly.az/images/logo.png" width="175" height="57" alt="Baker Tilly Azerbaijan"></a></div>
                    <div class="span-12 pull-right">
                        <div class="searchSurround pull-right">
                            <!-- <form method="post"> -->
                              <label for="search" class="searchInput inputBox box-1">
                                <input id="search" type="search" title="Search site..." value="Search site..." onkeydown="if(event.keyCode == 13){location.href='http://www.bakertilly.az/search/index/'+this.value+'/'};" onfocus="if(this.value=='Search site...')this.value='';">
                              </label>
                              <label for="searchSubmit" class="searchIcon">
                                <input id="searchSubmit" type="submit" value="Search" onclick="location.href='http://www.bakertilly.az/search/index/'+document.getElementById('search').value+'/';">
                              </label>
                            <!-- </form> -->
                        </div>
                        <div id="primaryNavigation" class="full-width pull-right">
                            <ul class="unstyled pull-left"><li onclick="javascript:gotolink('http://www.bakertilly.az/index/index/2');" class="first"><a href="http://www.bakertilly.az/about/">About&nbsp;Us</a></li><li onclick="javascript:gotolink('http://www.bakertilly.az/index/index/4');" class=""><a href="http://www.bakertilly.az/sectors/">Sectors</a></li><li onclick="javascript:gotolink('http://www.bakertilly.az/index/index/3');" class="active"><a href="http://www.bakertilly.az/services/">Services</a></li><li onclick="javascript:gotolink('http://www.bakertilly.az/index/index/8');" class=""><a href="http://www.bakertilly.az/careers/">Careers</a></li><li onclick="javascript:gotolink('http://www.bakertilly.az/index/index/7');" class=""><a href="http://www.bakertilly.az/media_and_events/news/">News</a></li><li onclick="javascript:gotolink('http://www.bakertilly.az/index/index/6');" class=""><a href="http://www.bakertilly.az/publications_and_views/">Publications</a></li><li onclick="javascript:gotolink('http://www.bakertilly.az/index/index/9');" class="last"><a href="http://www.bakertilly.az/contact_us/">Contact&nbsp;us</a></li></ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

<script type="text/javascript" language="javascript">
<!--
<!--Start of Tawk.to Script-->
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/589069625c773b09fb07f821/default';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
<!--End of Tawk.to Script-->
//-->
</script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-85901067-1', 'auto');
  ga('send', 'pageview');

</script>
<section class="full-width main">
    <div class="container">
      <div class="row">
        <div class="span-12">
          <div class="span-16 text-right breadcrumb">You are here: <a href="http://www.bakertilly.az/">Home page</a> > Services</div>
        </div>
      </div>

      <div class="row"><div class="span-12">
        <div class="side-1">
          <div id="quaternaryNavigation" class="full-width">
            <ul class="unstyled full-width level-1" style="height:500px;"><li class=""><a href="http://www.bakertilly.az/services/audit/">Audit, assurance and financial reporting</a></li><li class=""><a href="http://www.bakertilly.az/services/corporate_finance/">Corporate finance</a></li><li class=""><a href="http://www.bakertilly.az/services/financial_and_business_advisory/">Financial and business advisory </a></li><li class=""><a href="http://www.bakertilly.az/services/forensic_services/">Forensic services</a></li><li class=""><a href="http://www.bakertilly.az/services/growth_programme/">Growth programme</a></li><li class=""><a href="http://www.bakertilly.az/services/international_services/">International services</a></li><li class=""><a href="http://www.bakertilly.az/services/information_systems/">Information systems</a></li><li class=""><a href="http://www.bakertilly.az/services/online_outsourcing/">Outsourcing</a></li><li class=""><a href="http://www.bakertilly.az/services/payroll/">Payroll</a></li><li class=""><a href="http://www.bakertilly.az/services/management_accounting/">Management accounting</a></li><li class=""><a href="http://www.bakertilly.az/services/restructuring_and_recovery/">Restructuring and recovery</a></li><li class=""><a href="http://www.bakertilly.az/services/tax/">Tax and legal advisory</a></li></ul>
          </div>
        </div>
        <div class="span-17">
            <h1>Services</h1>
            <img src="http://www.bakertilly.az/images/Services.jpg" width="700" height="230" alt="banner"></div>
        <div class="span-15 content" style="width:70%;">
            <p id="area_2" >Baker Tilly Azerbaijan provides a range of accountancy and business advisory services to assist you with a full spectrum of advice from compliance to facilitating growth. <br><br>Our teams of specialists bring a wide range of experience in a variety of disciplines, with industry specific knowledge of the latest practices and emerging issues. <br><br>Whether serving public sector organizations, owner managed businesses, private individuals or listed companies with overseas operations, our goal is to help our clients achieve their ambitions.<br><br>We stay closely attuned to all our clients' varying needs and aspirations, working in partnership to help transform their vision into reality.</p>

            <div class="full-width offset-12">
              <?php foreach ($item as $item) { ?>
                <a href="http://www.bakertilly.az/services/tax/" class="panel-1 uniform-1" style="width:325px;">
                    <h4 ><?php echo $item['title_az']; ?></h4>
                    <p id="area_14" >​​When it comes to tax planning, clients need more than technical guidance from their service advisors. They need a firm that combines technical knowledge with a personal commitment to client service and a unique understanding of client needs.</p>
                </a>
          <?php    } ?>

            </div>

        </div>
      </div></div>
      <div class="row"> </div>
    </div>
  </section>


<!--

<div id="content-secondary" class="content">
    <div id="navigation-secondary" class="navigation">
	<div class="webpart">
            <ul class="unstyled full-width level-1" style="height:500px;"><li class=""><a href="http://www.bakertilly.az/services/audit/">Audit, assurance and financial reporting</a></li><li class=""><a href="http://www.bakertilly.az/services/corporate_finance/">Corporate finance</a></li><li class=""><a href="http://www.bakertilly.az/services/financial_and_business_advisory/">Financial and business advisory </a></li><li class=""><a href="http://www.bakertilly.az/services/forensic_services/">Forensic services</a></li><li class=""><a href="http://www.bakertilly.az/services/growth_programme/">Growth programme</a></li><li class=""><a href="http://www.bakertilly.az/services/international_services/">International services</a></li><li class=""><a href="http://www.bakertilly.az/services/information_systems/">Information systems</a></li><li class=""><a href="http://www.bakertilly.az/services/online_outsourcing/">Outsourcing</a></li><li class=""><a href="http://www.bakertilly.az/services/payroll/">Payroll</a></li><li class=""><a href="http://www.bakertilly.az/services/management_accounting/">Management accounting</a></li><li class=""><a href="http://www.bakertilly.az/services/restructuring_and_recovery/">Restructuring and recovery</a></li><li class=""><a href="http://www.bakertilly.az/services/tax/">Tax and legal advisory</a></li></ul>
        </div>
    </div>
    <div id="ctl00_ctl01_g_63e84855_081d_44dc_844b_59f54edc047b">
		<div class="module">
		</div>
    </div>
</div>
<div id="navigation-breadcrumb" class="navigation">
    <div id="ctl00_PlaceHolderMain_Breadcrumb1" class="webpart">
	<a href="http://www.bakertilly.az/">Home page</a> <span class="separator">›</span> <span class="current">Services</span>
    </div>
</div>
<div id="content-primary" class="content">
    <h1 id="area_1" >null</h1>
		<div class="paragraphContainer">
			<div>
                <div style="height:230px;padding:0;margin:0;width:100%;"><img style="position:relative;" src="http://www.bakertilly.az/images/Services.jpg" alt="" /></div>
				<div id="area_2"  class="col">
                                     Baker Tilly Azerbaijan provides a range of accountancy and business advisory services to assist you with a full spectrum of advice from compliance to facilitating growth. <br><br>Our teams of specialists bring a wide range of experience in a variety of disciplines, with industry specific knowledge of the latest practices and emerging issues. <br><br>Whether serving public sector organizations, owner managed businesses, private individuals or listed companies with overseas operations, our goal is to help our clients achieve their ambitions.<br><br>We stay closely attuned to all our clients' varying needs and aspirations, working in partnership to help transform their vision into reality.
				</div>
			</div>
		</div>
        <div style="height:40px;"></div>
        <table>
            <tr>
                <td style="vertical-align:top;">
                    <div style="width:300px;margin-right:22px;height:30px;border-top:1px solid #ccc;border-bottom:1px solid #ccc;margin-bottom:10px;vertical-align:middle;font-size:13px;line-height:30px;color:#07b;font-weight:bold;"><a href="http://www.bakertilly.az/services/audit/">Audit, assurance and financial reporting</a></div>
                    <a href="http://www.bakertilly.az/services/audit/"><img src="http://www.bakertilly.az/images/services_general/audit.jpg" alt="" /></a>
                    <div style="width:300px;text-align:justify;margin-top:15px;" id="area_3" >​An audit is more than a formality; it is a necessity to protect your business and encourage it to thrive. Early warnings, open communication and pragmatic resolution of issues are the essential features of our approach.</div>
                </td>
                <td style="vertical-align:top;">
                    <div style="width:300px;margin-right:5px;height:30px;border-top:1px solid #ccc;border-bottom:1px solid #ccc;margin-bottom:10px;vertical-align:middle;font-size:13px;line-height:30px;color:#07b;font-weight:bold;"><a href="http://www.bakertilly.az/services/corporate_finance/">Corporate finance</a></div>
                    <a href="http://www.bakertilly.az/services/corporate_finance/"><img src="http://www.bakertilly.az/images/services_general/corporate_finance.jpg" alt="" /></a>
                    <div style="width:300px;text-align:justify;margin-top:15px;" id="area_4" >​Baker Tilly Azerbaijan has an in-depth expertise in the fields of corporate finance. We do have specialized skills in multiple lines of service and industry. The team work and the sharing of knowledge assure our high quality standards and an increased value to our clients.</div>
                </td>
            </tr>
            <tr>
                <td style="vertical-align:top;">
                    <div style="width:300px;margin-right:22px;height:30px;border-top:1px solid #ccc;border-bottom:1px solid #ccc;margin-bottom:10px;vertical-align:middle;font-size:13px;line-height:30px;color:#07b;font-weight:bold;"><a href="http://www.bakertilly.az/services/financial_and_business_advisory/">Financial and business advisory </a></div>
                    <a href="http://www.bakertilly.az/services/financial_and_business_advisory/"><img src="http://www.bakertilly.az/images/services_general/financial_and_business_advisory.jpg" alt="" /></a>
                    <div style="width:300px;text-align:justify;margin-top:15px;" id="area_5" >​A Consultant of Baker Tilly Azerbaijan never gives advice, he/she transfers knowledge and does everything possible to keep the mutual competence, which we have gained as an integral part of your organization for years to come.</div>
               </td>
                <td style="vertical-align:top;">
                    <div style="width:300px;margin-right:5px;height:30px;border-top:1px solid #ccc;border-bottom:1px solid #ccc;margin-bottom:10px;vertical-align:middle;font-size:13px;line-height:30px;color:#07b;font-weight:bold;"><a href="http://www.bakertilly.az/services/forensic_services/">Forensic services</a></div>
                    <a href="http://www.bakertilly.az/services/forensic_services/"><img src="http://www.bakertilly.az/images/services_general/forensic_services.jpg" alt="" /></a>
                    <div style="width:300px;text-align:justify;margin-top:15px;" id="area_6" >​Baker Tilly Azerbaijan provides independent forensic services to businesses with exposures that include business disputes, investigations, asset tracing, embezzlement, and allegations of financial malfeasance.</div>
                </td>
            </tr>
            <tr>
                <td style="vertical-align:top;">
                    <div style="width:300px;margin-right:22px;height:30px;border-top:1px solid #ccc;border-bottom:1px solid #ccc;margin-bottom:10px;vertical-align:middle;font-size:13px;line-height:30px;color:#07b;font-weight:bold;"><a href="http://www.bakertilly.az/services/growth_programme/">Growth programme</a></div>
                    <a href="http://www.bakertilly.az/services/growth_programme/"><img src="http://www.bakertilly.az/images/services_general/growth_programme.jpg" alt="" /></a>
                    <div style="width:300px;text-align:justify;margin-top:15px;" id="area_7" >​'Profit improvement' is a key component in Baker Tilly Azerbaijan’s Growth Programme, a structured approach that looks at the fundamental business criteria used by banks, venture capitalists and other financiers to assess proposals.</div>
                </td>
                <td style="vertical-align:top;">
                    <div style="width:300px;margin-right:5px;height:30px;border-top:1px solid #ccc;border-bottom:1px solid #ccc;margin-bottom:10px;vertical-align:middle;font-size:13px;line-height:30px;color:#07b;font-weight:bold;"><a href="http://www.bakertilly.az/services/international_services/">International services</a></div>
                    <a href="http://www.bakertilly.az/services/international_services/"><img src="http://www.bakertilly.az/images/services_general/international_services.jpg" alt="" /></a>
                    <div style="width:300px;text-align:justify;margin-top:15px;" id="area_8" >During tough times operating profitably in diverse markets is essential to the success of businesses – not only for survival but in order to thrive and flourish. It’s important then, to be able to manage operations across international boundaries making the most of the opportunities available to you.</div>
                </td>
            </tr>
            <tr>
                <td style="vertical-align:top;">
                    <div style="width:300px;margin-right:22px;height:30px;border-top:1px solid #ccc;border-bottom:1px solid #ccc;margin-bottom:10px;vertical-align:middle;font-size:13px;line-height:30px;color:#07b;font-weight:bold;"><a href="http://www.bakertilly.az/services/information_systems/">Information systems</a></div>
                    <a href="http://www.bakertilly.az/services/information_systems/"><img src="http://www.bakertilly.az/images/services_general/information_systems.jpg" alt="" /></a>
                    <div style="width:300px;text-align:justify;margin-top:15px;" id="area_9" >​Many businesses are beginning to recognize that their information systems and financial processes have not kept pace with their growth. As a result, management and executives are not equipped with the critical business intelligence that is needed to make timely decisions in a complex regulatory environment.</div>
                </td>
                <td style="vertical-align:top;">
                    <div style="width:300px;margin-right:5px;height:30px;border-top:1px solid #ccc;border-bottom:1px solid #ccc;margin-bottom:10px;vertical-align:middle;font-size:13px;line-height:30px;color:#07b;font-weight:bold;"><a href="http://www.bakertilly.az/services/online_outsourcing/">Outsourcing</a></div>
                    <a href="http://www.bakertilly.az/services/online_outsourcing/"><img src="http://www.bakertilly.az/images/services_general/outsourcing.jpg" alt="" /></a>
                    <div style="width:300px;text-align:justify;margin-top:15px;" id="area_10" >​Outsourcing has long been a key to success in the corporate world. Outsourcing services offered by Baker Tilly Azerbaijan allows you to focus on the core strategic activities of your business, while our accounting professionals take care of the challenging task of running your accounting functions.</div>
                </td>
            </tr>
            <tr>
                <td style="vertical-align:top;">
                    <div style="width:300px;margin-right:22px;height:30px;border-top:1px solid #ccc;border-bottom:1px solid #ccc;margin-bottom:10px;vertical-align:middle;font-size:13px;line-height:30px;color:#07b;font-weight:bold;"><a href="http://www.bakertilly.az/services/payroll/">Payroll</a></div>
                    <a href="http://www.bakertilly.az/services/payroll/"><img src="http://www.bakertilly.az/images/services_general/payroll.jpg" alt="" /></a>
                    <div style="width:300px;text-align:justify;margin-top:15px;" id="area_11" >Baker Tilly Azerbaijan can offer a fully comprehensive payroll service unique to each client's individual needs. We assure all of our clients’ services with the greatest of care, continual development of knowledge of payroll processes and regulations, and with state-of-the-art IT tools tailored to varying customer needs.</div>
                </td>
                <td style="vertical-align:top;">
                    <div style="width:300px;margin-right:5px;height:30px;border-top:1px solid #ccc;border-bottom:1px solid #ccc;margin-bottom:10px;vertical-align:middle;font-size:13px;line-height:30px;color:#07b;font-weight:bold;"><a href="http://www.bakertilly.az/services/management_accounting/">Management accounting</a></div>
                    <a href="http://www.bakertilly.az/services/management_accounting/"><img src="http://www.bakertilly.az/images/services_general/management_accounting.jpg" alt="" /></a>
                    <div style="width:300px;text-align:justify;margin-top:15px;" id="area_12" >​At Baker Tilly Azerbaijan, we focus on your specific needs with a full range of accounting and advisory services. Our professionals connect with your specific targets and expectations to deliver the right solutions, consistently and proactively.</div>
                </td>
            </tr>
            <tr>
                <td style="vertical-align:top;">
                    <div style="width:300px;margin-right:22px;height:30px;border-top:1px solid #ccc;border-bottom:1px solid #ccc;margin-bottom:10px;vertical-align:middle;font-size:13px;line-height:30px;color:#07b;font-weight:bold;"><a href="http://www.bakertilly.az/services/restructuring_and_recovery/">Restructuring and recovery</a></div>
                    <a href="http://www.bakertilly.az/services/restructuring_and_recovery/"><img src="http://www.bakertilly.az/images/services_general/restructuring_and_recovery.jpg" alt="" /></a>
                    <div style="width:300px;text-align:justify;margin-top:15px;" id="area_13" >​For a commercial enterprise, or any other type of organization, surviving financial difficulty is a careful step-by-step process best negotiated with the help of specialist accountants and recovery experts.</div>
                </td>
                <td style="vertical-align:top;">
                    <div style="width:300px;margin-right:5px;height:30px;border-top:1px solid #ccc;border-bottom:1px solid #ccc;margin-bottom:10px;vertical-align:middle;font-size:13px;line-height:30px;color:#07b;font-weight:bold;"><a href="http://www.bakertilly.az/services/tax/">Tax and legal advisory</a></div>
                    <a href="http://www.bakertilly.az/services/tax/"><img src="http://www.bakertilly.az/images/services_general/tax_and_legal_advisory.jpg" alt="" /></a>
                    <div style="width:300px;text-align:justify;margin-top:15px;" id="area_14" >​​When it comes to tax planning, clients need more than technical guidance from their service advisors. They need a firm that combines technical knowledge with a personal commitment to client service and a unique understanding of client needs.</div>
                </td>
            </tr>
        </table>
</div>

-->
<div class="full-width footer white">
    <div class="container">
        <div class="row">
            <div class="span-12 border-top"></div>
        </div>
        <div class="row">
            <div class="span-12">
                <div class="span-13" style="width:145px;">
                    <h3>The firm</h3>
                    <ul class="unstyled"><li><a href="http://www.bakertilly.az/about/our_vision/">Our&nbsp;vision</a></li><li><a href="http://www.bakertilly.az/about/our_mission/">Our&nbsp;mission</a></li><li><a href="http://www.bakertilly.az/about/our_values/">Our&nbsp;values</a></li><li><a href="http://www.bakertilly.az/about/history/">Our&nbsp;history</a></li><li><a href="http://www.bakertilly.az/about/management/">Meet&nbsp;our&nbsp;management</a></li><li><a href="http://www.bakertilly.az/about/international/">Baker&nbsp;Tilly&nbsp;International</a></li></ul>
                </div>
                <div class="span-13" style="width:220px;">
                    <h3>Services</h3>
                    <ul class="unstyled"><li><a href="http://www.bakertilly.az/services/audit/">Audit,&nbsp;assurance&nbsp;and&nbsp;financial&nbsp;reporting</a></li><li><a href="http://www.bakertilly.az/services/corporate_finance/">Corporate&nbsp;finance</a></li><li><a href="http://www.bakertilly.az/services/financial_and_business_advisory/">Financial&nbsp;and&nbsp;business&nbsp;advisory&nbsp;</a></li><li><a href="http://www.bakertilly.az/services/forensic_services/">Forensic&nbsp;services</a></li><li><a href="http://www.bakertilly.az/services/growth_programme/">Growth&nbsp;programme</a></li><li><a href="http://www.bakertilly.az/services/international_services/">International&nbsp;services</a></li><li><a href="http://www.bakertilly.az/services/information_systems/">Information&nbsp;systems</a></li><li><a href="http://www.bakertilly.az/services/online_outsourcing/">Outsourcing</a></li><li><a href="http://www.bakertilly.az/services/payroll/">Payroll</a></li><li><a href="http://www.bakertilly.az/services/management_accounting/">Management&nbsp;accounting</a></li><li><a href="http://www.bakertilly.az/services/restructuring_and_recovery/">Restructuring&nbsp;and&nbsp;recovery</a></li><li><a href="http://www.bakertilly.az/services/tax/">Tax&nbsp;and&nbsp;legal&nbsp;advisory</a></li></ul>
                </div>
                <div class="span-13">
                    <h3>Sectors</h3>
                    <ul class="unstyled"><li><a href="http://www.bakertilly.az/sectors/agriculture/">Agriculture</a></li><li><a href="http://www.bakertilly.az/sectors/automative/">Automotive</a></li><li><a href="http://www.bakertilly.az/sectors/banking/">Banking</a></li><li><a href="http://www.bakertilly.az/sectors/energy_and_natural_resources/">Energy&nbsp;and&nbsp;natural&nbsp;resources</a></li><li><a href="http://www.bakertilly.az/sectors/financial_sector/">Financial&nbsp;sector</a></li><li><a href="http://www.bakertilly.az/sectors/food_and_drink/">Food&nbsp;and&nbsp;beverage</a></li><li><a href="http://www.bakertilly.az/sectors/manufacturing/">Manufacturing</a></li><li><a href="http://www.bakertilly.az/sectors/non_profits/">Non-profits</a></li><li><a href="http://www.bakertilly.az/sectors/real_estate_and_construction/">Real&nbsp;estate&nbsp;and&nbsp;construction</a></li><li><a href="http://www.bakertilly.az/sectors/retail/">Retail</a></li><li><a href="http://www.bakertilly.az/sectors/telecommunications_and_it/">Telecommunications&nbsp;and&nbsp;IT</a></li><li><a href="http://www.bakertilly.az/sectors/tourism_and_hospitality/">Tourism&nbsp;and&nbsp;hospitality</a></li></ul>
                </div>
                <div class="span-14">
                    <h3>Find a Baker Tilly International member firm: Interactive map</h3>
                    <div class="flashContent-1">
                        <a href="http://www.bakertillyinternational.com/web/worldwide-directory.aspx"><img src="http://www.bakertilly.az/images/map.png" alt="Worldwide Directory" title="Worldwide Directory"></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row footnote">
            <div class="span-12"><div class="span-6">  <?php foreach ($item as $item) { ?>

                    <h2 ><?php echo $item['title_az']; ?></h2>

          <?php    } ?></div>
                <ul class="inline unstyled pull-right">
                    <li><a href="http://www.bakertilly.az/index/sitemap/">Sitemap</a></li>
                    <li class="last"><a href="http://www.bakertilly.az/index/legal_disclaimer/">Legal Disclaimer</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
</div>
<div id="status"></div>
<button style="display:none;" id="save">Save changes</button>
</body>
</html>
