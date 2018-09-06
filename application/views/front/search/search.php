
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
          <div class="span-16 text-right breadcrumb">You are here: <a href="http://www.bakertilly.az/">Home page</a> > Search Results</div>
        </div>
      </div>
      <div class="row">
        <div class="side-1">
          <div id="quaternaryNavigation" class="full-width">
            <ul class="unstyled full-width level-1">
              <li><a href="http://www.bakertilly.az/about/">About Us</a></li>
                <li><a href="http://www.bakertilly.az/sectors/">Sectors</a></li>
                <li><a href="http://www.bakertilly.az/services/">Services</a></li>
                <li><a href="http://www.bakertilly.az/careers/">Careers</a></li>
                <li><a href="http://www.bakertilly.az/news/">News</a></li>
                <li><a href="http://www.bakertilly.az/publications/">Publications</a></li>
	        	<li><a href="http://www.bakertilly.az/publications_and_views/">Contact us</a></li>
	        	<li class="active-li"><a href="http://www.bakertilly.az/search/">Search</a></li>
            </ul>
          </div>
        </div>
        <div class="span-17 content search">
          <h1>Search results for "Baker"</h1>
          <div class="sub">18 results found for "Baker"</div>
          <p>Not found what you are looking for? Refine your search by searching again with a new keyword.</p>
          <!-- <form method="get" action="http://www.bakertilly.az/search/index/"> -->
            <label for="keywordSearch" class="searchInput inputBox box-1">
              <input id="keywordSearch" type="search" title="Keyword search" value="Baker" onkeydown="if(event.keyCode == 13){location.href='http://www.bakertilly.az/search/index/'+this.value+'/'};">
            </label>
            <label for="keywordSearchSubmit" class="searchIcon">
              <input id="keywordSearchSubmit" type="submit" value="Search" onclick="location.href='http://www.bakertilly.az/search/index/'+document.getElementById('keywordSearch').value+'/';">
            </label>
          <!-- </form> -->
          <!-- <div class="results pull-left"> View: <a href="#">20</a> | <a class="active" href="#">100</a> per page</div> -->
        
            <div class="resultsContainer">
            </div>
          <div class="pagination">
            <a class="active">1</a>&nbsp;<a href="http://www.bakertilly.az/search/index/Baker/10">2</a><a class="next"><a href="http://www.bakertilly.az/search/index/Baker/10">Next</a></a><a class="singleArrowR" href="#">Single Arrow Right</a>
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
