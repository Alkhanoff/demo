<?php $this->load->view('back/include/header'); ?>
<div class="app-content content">
      <div class="content-wrapper">
        <div class="content-wrapper-before"></div>
        <div class="content-header row">
          <div class="content-header-left col-md-4 col-12 mb-2">
            <h3 class="content-header-title">Xidmət Bölmələri</h3>
          </div>
          <div class="content-header-right col-md-8 col-12">
            <div class="breadcrumbs-top float-md-right">
              <div class="breadcrumb-wrapper mr-1">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="index-2.html">Ana Səhifə</a>
                  </li>
                  <li class="breadcrumb-item"><a href="#">Xidmətlər</a>
                  </li>
                  <li class="breadcrumb-item active">Xidmət Bölmələr
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
					<h4 class="card-title">Xidmət Bölmələri Redaktə</h4>
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
            <form method="post" enctype="multipart/form-data" action="<?php echo base_url('Admin/update_service_group'); ?>">
              <input type="hidden" value="<?php echo $item['id']; ?>" name="id" >
              <div class="form-group mt-2">
                    <div class="row">
                          <div class="col-sm-6 ">
                              <label for="">Ad Azərbaycanca</label>
                            <input type="text" name="title_az" value="<?php echo $item['title_az']; ?>" class="form-control" >
                        </div>

                        <div class="col-sm-6 ">
                          <label for="">Ad İngiliscə</label>
                          <input type="text" value="<?php echo $item['title_en']; ?>" name="title_en" class="form-control" >
                      </div>
                    </div>
                  </div>

            <div class="form-group mt-2">

                        <div class="col-sm-4 ">
                          	<img width="700" height="230" src=" <?php echo base_url($item['picture']);  ?>"></img>
                          <label for="">Şəkil</label>
                          <input type="file" name="picture" class="form-control" id="picture">



                      </div>
          			<h2 class="editable mt-3">Azərbaycanca Mətn</h2>
            <textarea class="summernote" name="text_az" ><?php echo $item['text_az']; ?></textarea>

            <h2 class="editable mt-3">İngiliscə Mətn</h2>
        <textarea class="summernote2" name="text_en" ><?php echo $item['text_en']; ?></textarea>

          <button class="btn btn-primary mt-2" type="submit">Dəyiş</button>
            <a class="btn btn-info mt-2 ml-3" href="<?php echo base_url('Admin/servicegroups'); ?>" >Geri Qayıt</a>
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
