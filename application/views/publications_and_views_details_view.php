<section class="full-width main">
    <div class="container">
      <div class="row">
        <div class="span-12">
          <div class="span-16 text-right breadcrumb">You are here: <a href="{base_url}"><?=$this->section_model->getSectionName(1)?></a> > <a href="{base_url}publications_and_views/"><?=$this->section_model->getSectionName(6)?></a> > {title}</div>
        </div>
      </div>
      <div class="row">
        <div class="side-1">
          <div id="quaternaryNavigation" class="full-width">
            <ul style="height:500px;">
	        	<li class="active-li"><a href="{base_url}publications_and_views/"><?=$this->section_model->getSectionName(6)?></a></li>
	        </ul>
          </div>
        </div>
        <div class="span-17 content news detail">
          <h1>{title}</h1>
          <p><b>{date}</b></p>
          <div>{details}</div>
          <p>{file}</p>
        </div>
        
      </div>
      <div class="row"> </div>
    </div>
</section>