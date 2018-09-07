<?php $this->load->view('back/include/header'); ?>
<div class="app-content content">
      <div class="content-wrapper">
        <div class="content-wrapper-before"></div>
        <div class="content-header row">
          <div class="content-header-left col-md-4 col-12 mb-2">
            <h3 class="content-header-title">Mesajlar</h3>
          </div>
          <div class="content-header-right col-md-8 col-12">
            <div class="breadcrumbs-top float-md-right">
              <div class="breadcrumb-wrapper mr-1">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="index-2.html">Ana Səhifə</a>
                  </li>

                  <li class="breadcrumb-item active">Mesajlar
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
					<h4 class="card-title">Mesaj Ətraflı</h4>
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
            <form class="form-horizontal" >
            <div class="box-body">
              <!-- Input -->
              <div class="form-group">
                <label for="inputTitle" class="col-sm-2 control-label">Mesaj göndərən</label>

                <div class="col-sm-6">
                  <input type="text" disabled value="<?php echo $item['name']; ?>" class="form-control" id="inputTitle">

                </div>
              </div>
              <!-- Input -->
              <div class="form-group">
                <label for="inputTlf" class="col-sm-2 control-label">E-Poçt Ünvanı</label>

                <div class="col-sm-6">
                <input type="text"   disabled  value="<?php echo $item['mail']; ?>" class="form-control" id="inputTitle">
                </div>
              </div>
                 <!-- Input -->

                    <!-- Input -->
                    <div class="form-group">
                      <label for="inputTlf" class="col-sm-2 control-label">Göndərdiyi Tarix</label>

                      <div class="col-sm-6">
                       <input type="text"  disabled  value="<?php echo $item['date']; ?>" class="form-control" id="inputTitle">
                      </div>
                    </div>
                  
                          <!-- Input -->
                          <div class="form-group">
                            <label for="inputTlf" class="col-sm-2 control-label">Mesaj</label>

                            <div class="col-sm-6">
                            <textarea id="editor1"  disabled name="description" rows="8" cols="80"><?php echo $item['message']; ?></textarea>
                            </div>
                          </div>
                             <!-- Input -->

            </div>

            <div class="box-footer ">


              <a href="<?php echo base_url('admin/messages'); ?>"  class="btn btn-primary">Geri Qayıt</a>



            </div>

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
