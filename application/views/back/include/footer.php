
    <footer class="footer footer-static footer-light navbar-shadow">
      <div class="clearfix blue-grey lighten-2 text-sm-center mb-0 px-2"><span class="float-md-left d-block d-md-inline-block">2018  &copy; Copyright <a class="text-bold-800 grey darken-2" href="https://themeselection.com/" target="_blank">ThemeSelection</a></span>
        <ul class="list-inline float-md-right d-block d-md-inline-blockd-none d-lg-block mb-0">
          <li class="list-inline-item"><a class="my-1" href="https://themeselection.com/" target="_blank"> More themes</a></li>
          <li class="list-inline-item"><a class="my-1" href="https://themeselection.com/support" target="_blank"> Support</a></li>
          <li class="list-inline-item"><a class="my-1" href="https://themeselection.com/products/chameleon-admin-modern-bootstrap-webapp-dashboard-html-template-ui-kit/" target="_blank"> Purchase</a></li>
        </ul>
      </div>
    </footer>

    <!-- BEGIN VENDOR JS-->
    <script src="<?php echo base_url('backpublic'); ?>/app-assets/vendors/js/vendors.min.js" type="text/javascript"></script>
    <script src="<?php echo base_url('backpublic'); ?>/app-assets/vendors/js/forms/toggle/switchery.min.js" type="text/javascript"></script>
    <script src="<?php echo base_url('backpublic'); ?>/app-assets/js/scripts/forms/switch.min.js" type="text/javascript"></script>
    <!-- BEGIN VENDOR JS-->
    <!-- BEGIN PAGE VENDOR JS-->
    <script type="text/javascript" src="<?php echo base_url('backpublic'); ?>/app-assets/vendors/js/ui/jquery.sticky.js"></script>
    <script src="<?php echo base_url('backpublic'); ?>/app-assets/vendors/js/forms/tags/tagging.min.js" type="text/javascript"></script>
    <script src="<?php echo base_url('backpublic'); ?>/app-assets/vendors/js/ui/prism.min.js" type="text/javascript"></script>
    <!-- END PAGE VENDOR JS-->
    <!-- BEGIN CHAMELEON  JS-->
    <script src="<?php echo base_url('backpublic'); ?>/app-assets/js/core/app-menu.min.js" type="text/javascript"></script>
    <script src="<?php echo base_url('backpublic'); ?>/app-assets/js/core/app.min.js" type="text/javascript"></script>
    <script src="<?php echo base_url('backpublic'); ?>/app-assets/js/scripts/customizer.min.js" type="text/javascript"></script>
    <script src="<?php echo base_url('backpublic'); ?>/app-assets/vendors/js/jquery.sharrre.js" type="text/javascript"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.9/summernote.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.18/datatables.min.js"></script>

    <!-- END CHAMELEON  JS-->
    <!-- BEGIN PAGE LEVEL JS-->
    <script src="<?php echo base_url('backpublic'); ?>/app-assets/vendors/js/charts/chartist.min.js" type="text/javascript"></script>
   <script src="<?php echo base_url('backpublic'); ?>/app-assets/vendors/js/charts/chartist-plugin-tooltip.min.js" type="text/javascript"></script>
     <script src="<?php echo base_url('backpublic'); ?>/app-assets/js/scripts/pages/dashboard-analytics.min.js" type="text/javascript"></script>
    <script src="<?php echo base_url('backpublic'); ?>/app-assets/js/scripts/forms/tags/tagging.min.js" type="text/javascript"></script>
    <!-- END PAGE LEVEL JS-->
    <script>
    $(document).ready(function() {
      $('.summernote').summernote({
       height: 250, // set editor height
       minHeight: null, // set minimum height of editor
       maxHeight: null, // set maximum height of editor
       focus: false // set focus to editable area after initializing summernote
   });


   $('.summernote2').summernote({
    height: 250, // set editor height
    minHeight: null, // set minimum height of editor
    maxHeight: null, // set maximum height of editor
    focus: false // set focus to editable area after initializing summernote
});



  });

  </script>

  <script>
  $(document).ready(function() {
      $('#newstable').DataTable();
  } );
</script>

  </body>

</html>
