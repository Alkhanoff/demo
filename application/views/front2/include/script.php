<script src="<?php base_url(); ?>ckeditor/ckeditor.js" type="text/javascript"></script>
<script src="<?php base_url(); ?>js/jquery-1.7.1.min.js" type="text/javascript"></script>
<script src="<?php base_url(); ?>js/jquery.flexslider-min.js"></script>
<script src="<?php base_url(); ?>js/scripts.js"></script>
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
           url: '{base_url}index/update_area/{section_id}/',
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
  })(window,document,'script','../../../www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-85901067-1', 'auto');
  ga('send', 'pageview');

</script>
