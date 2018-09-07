
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
          <div class="span-16 text-right breadcrumb">You are here: <a href="http://www.bakertilly.az/">Home page</a> > Contact us</div>
        </div>
      </div>
      <div class="row">
        <div class="side-1">
          <div id="quaternaryNavigation" class="full-width">
            <ul style="height:500px;">
                <li><a href="http://www.bakertilly.az/about/">About Us</a></li>
                <li><a href="http://www.bakertilly.az/sectors/">Sectors</a></li>
                <li><a href="http://www.bakertilly.az/services/">Services</a></li>
                <li><a href="http://www.bakertilly.az/careers/">Careers</a></li>
                <li><a href="http://www.bakertilly.az/news/">News</a></li>
                <li><a href="http://www.bakertilly.az/publications/">Publications</a></li>
	        	<li class="active-li"><a href="http://www.bakertilly.az/publications_and_views/">Contact us</a></li>
	        </ul>
          </div>
        </div>
        <div class="span-17 content news detail">
          <h1 >Contact us</h1>
          <div style="height:20px;"></div>

<style type="text/css">
#area_1 p {
    padding:2px;
    margin:0;
}
</style>

<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
    <script>
var map;
function initialize() {
    var myLatlng = new google.maps.LatLng(40.386934, 49.829199);
  var mapOptions = {
    zoom: 18,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var marker = new google.maps.Marker({
    position: myLatlng,
    title:"Hello World!"
});

// To add the marker to the map, call setMap();
marker.setMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);

    </script>


                <div id="area_1" style="margin-bottom:20px;" ><p>Demirchi Tower</p><p>37 Khojaly&nbsp;Avenue, Baku AZ1025&nbsp;Azerbaijan</p><p>T. +994 (12) 404 7 666</p><p>F. +994 (12) 404 7 667</p><p>E. office@bakertilly.az</p></div>


               <!-- <div style="width:695px;height:400px"><iframe width="695" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q=Demirchi+Tower&ie=UTF8&z=16&t=m&iwloc=addr&output=embed"></iframe><br><table width="695" cellpadding="0" cellspacing="0" border="0"><tr><td align="left"><small><a href="http://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q=Demirchi+Tower&ie=UTF8&z=16&t=m&iwloc=addr">View Larger Map</a></small></td><td align="right"><small><a href="http://www.embedgooglemap.com">embed google map</a></small></td></tr></table></div> -->

<div style="height:400px;width:695px;overflow:hidden;"><style type="text/css" media="screen">.gm-style img{max-width: none; !important; background:none !important;}.gm-style-iw{height:auto !important; color:#000000; display:block; white-space:nowrap; width:auto !important; line-height:18px; overflow:hidden !important;}</style><script type="text/javascript" src="http://maps.google.com/maps/api/js?v=3&sensor=false"></script><div style="height:400px;width:695px;overflow:hidden;"><div id="gmap_canvas" style="height:400px; width:695px;"></div><a href="http://www.nuckelino.de/kinderwagen/bugaboo/" class="map-data">http://www.nuckelino.de/kinderwagen/bugaboo/</a></div><script type="text/javascript">function init_map(){var myOptions = {zoom:15,center:new google.maps.LatLng(40.3831986801745,49.8713970513428),mapTypeId: google.maps.MapTypeId.ROADMAP};map = new google.maps.Map(document.getElementById("gmap_canvas"), myOptions);marker = new google.maps.Marker({map: map,position: new google.maps.LatLng(40.3831986801745, 49.8713970513428)}); infowindow = new google.maps.InfoWindow({content:"<span style='height:auto !important; display:block; white-space:nowrap; overflow:hidden !important;'><strong style='font-weight:400;'>Demirchi Tower</strong><br>37 Khojali Avenue<br> baku</span>" }); google.maps.event.addListener(marker, "click", function(){infowindow.open(map,marker);}); infowindow.open(map,marker);}google.maps.event.addDomListener (window, "load", init_map);</script></div>



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
