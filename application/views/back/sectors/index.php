<?php $this->load->view('back/include/header'); ?>
<div class="app-content content">
      <div class="content-wrapper">
        <div class="content-wrapper-before"></div>
        <div class="content-header row">
          <div class="content-header-left col-md-4 col-12 mb-2">
            <h3 class="content-header-title">Sektorlar</h3>
          </div>
          <div class="content-header-right col-md-8 col-12">
            <div class="breadcrumbs-top float-md-right">
              <div class="breadcrumb-wrapper mr-1">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="index-2.html">Ana Səhifə</a>
                  </li>
                  <li class="breadcrumb-item"><a href="#">Sektorlar</a>
                  </li>
                  <li class="breadcrumb-item active">Ana Səhifə
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div class="content-body"><!-- Basic Editor start -->


<!-- Inline Editor start -->
<section id="inline">
	<div class="row">
		<div class="col-12">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">Sektorlar ana səhifə</h4>
					<a class="heading-elements-toggle"><i class="la la-ellipsis-h font-medium-3"></i></a>
        			<div class="heading-elements">
						<ul class="list-inline mb-0">
							<li><a data-action="collapse"><i class="ft-minus"></i></a></li>
							<li><a data-action="reload"><i class="ft-rotate-cw"></i></a></li>
							<li><a data-action="expand"><i class="ft-maximize"></i></a></li>
							<li><a data-action="close"><i class="ft-x"></i></a></li>
						</ul>
					</div>
				</div>
				<div class="card-content collapse show">
					<div class="card-body">
            <form method="post" enctype="multipart/form-data" action="<?php echo base_url('Admin/sectorsAbout'); ?>">
        <?php  foreach ($item as $item) { ?>
          <input type="hidden" name="id" value="<?php echo $item['id']; ?>" >
						<img width="700" height="230" src=" <?php echo base_url($item['picture']);  ?>"></img>
            <div class="form-group mt-2">

                        <div class="col-sm-4 ">
                          <input type="file" name="picture" class="form-control" id="picture">
                          <div class="col-sm-12 row">

                          <div class="col-sm-8">  <p class="text-muted">Dəyişlik etmək istəmirsinizsə seçməyin</p></div></div>
                        </div>


                      </div>
          			<h2 class="editable mt-3">Azərbaycanca Mətn</h2>
            <textarea class="summernote" name="text_az" ><?php echo $item['text_az']; ?></textarea>

            <h2 class="editable mt-3">İngiliscə Mətn</h2>
        <textarea class="summernote2" name="text_en"><?php echo $item['text_en']; ?></textarea>
          <?php } ?>
          <button class="btn btn-primary mt-2" type="submit">Dəyiş</button>
        </form>

					</div>
				</div>
			</div>
		</div>
	</div>
</section>

        </div>
      </div>
    </div>
<?php $this->load->view('back/include/footer'); ?>
