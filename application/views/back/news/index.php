<?php $this->load->view('back/include/header'); ?>
<div class="app-content content">
      <div class="content-wrapper">
        <div class="content-wrapper-before"></div>
        <div class="content-header row">
          <div class="content-header-left col-md-4 col-12 mb-2">
            <h3 class="content-header-title">Xəbərlər</h3>
          </div>
          <div class="content-header-right col-md-8 col-12">
            <div class="breadcrumbs-top float-md-right">
              <div class="breadcrumb-wrapper mr-1">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="index-2.html">Ana Səhifə</a>
                  </li>
                  <li class="breadcrumb-item"><a href="#">Paylaşımlar</a>
                  </li>
                  <li class="breadcrumb-item active">Xəbərlər
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
					<h4 class="card-title">Xəbərlər</h4>
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
            <a href="<?php echo base_url('Admin/news_create'); ?>" class="btn btn-success mb-2" >Yenisini Yarat</a>

            <table id="newstable" class="display" style="width:100%">
             <thead class="bg-primary white">
                 <tr>
                     <th style="width: 35%;">Başlıq AZ</th>
                     <th style="width: 35%;">Başlıq EN</th>
                     <th style="width: 10%;">Tarix</th>
                     <th style="width: 20%;">Tənzimləmələr</th>

                 </tr>
             </thead>
             <tbody>
    <?php  foreach ($item as $item) { ?>
                 <tr>
                     <td><?php echo $item['title_az']; ?></td>
                     <td><?php echo $item['title_en']; ?></td>
                     <td><?php echo $item['date']; ?></td>
                     <td><a href="<?php echo base_url('admin/news_edit/'.$item['ID'].''); ?>"><button type="button" name="button" class="btn btn-primary">Dəyiş</button></a>
                      <a  onclick="return confirm('Silməyə əminsinizmi?');" href="<?php echo base_url('admin/news_delete/'.$item['ID'].'/ID/cmsnews'); ?>"><button type="button" name="button" class="btn btn-danger">Sil</button></a>
                     </td>

                 </tr>
  <?php } ?>

             </tbody>
             <tfoot  class="bg-primary white">
                 <tr>
                   <th>Başlıq AZ</th>
                   <th>Başlıq EN</th>
                   <th>Tarix</th>
                   <th>Tənzimləmələr</th>

                 </tr>
             </tfoot>
         </table>


        </div>
      </div>
    </div>
<?php $this->load->view('back/include/footer'); ?>
