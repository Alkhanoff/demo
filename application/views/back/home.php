<?php $this->load->view('back/include/header'); ?>
<div class="app-content content">
  <div class="content-wrapper">
    <div class="content-wrapper-before"></div>
    <div class="content-header row">
    </div>
    <div class="content-body"><!-- Revenue, Hit Rate & Deals -->


      <div class="row ">
              <div class="col-xl-4 col-lg-6 col-md-12">
                  <div class="card" style="height: 437.8px;">
                      <div class="card-header ">
                          <!-- <h4 class="card-title">New Customers</h4> -->
                          <a class="heading-elements-toggle">
                              <i class="la la-ellipsis-v font-medium-3"></i>
                          </a>
                          <div class="heading-elements">
                              <ul class="list-inline mb-0">
                                  <li>
                                      <a data-action="reload">
                                          <i class="ft-rotate-cw"></i>
                                      </a>
                                  </li>
                              </ul>
                          </div>
                      </div>
                      <div class="card-content">
                          <div class="card-body text-center">
                              <div class="card-header pt-0 pb-0">
                                  <p class="warning darken-2">Ümumi Xəbər Sayı</p>

                              </div>
                              <div class="card-content">
                  <div id="tasks-completed" class="height-150 tasksCompleteddonutShadow"><svg xmlns:ct="http://gionkunz.github.com/chartist-js/ct" width="100%" height="100%" class="ct-chart-donut" style="width: 100%; height: 100%;"><g class="ct-series ct-series-a"><path d="M211.919,5A70,70,0,1,0,211.931,5L211.931,15A60,60,0,1,1,211.921,15Z" class="ct-slice-donut-solid" ct:value="100"></path></g><g><text dx="211.93125915527344" dy="82.5" text-anchor="middle" class="ct-label" font-family="feather"></text></g><defs><linearGradient id="donutGradient7" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="rgba(253,185,1,1)"></stop><stop offset="95%" stop-color="rgba(253,185,1, 0.3)"></stop></linearGradient></defs></svg></div>
                                  <ul class="list-inline clearfix mt-2">
                                      <li>
                                          <h1 class="blue-grey lighten-1 text-bold-400">16</h1>
                                        <a>  <span class="warning darken-2">
                                              <i class="ft-user"></i> Yeni xəbər paylaş</span> </a>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-xl-4 col-lg-6 col-md-12">
                  <div class="card" style="height: 437.8px;">
                      <div class="card-header ">
                          <!-- <h4 class="card-title">New Projects</h4> -->
                          <a class="heading-elements-toggle">
                              <i class="la la-ellipsis-v font-medium-3"></i>
                          </a>
                          <div class="heading-elements">
                              <ul class="list-inline mb-0">
                                  <li>
                                      <a data-action="reload">
                                          <i class="ft-rotate-cw"></i>
                                      </a>
                                  </li>
                              </ul>
                          </div>
                      </div>
                      <div class="card-content">
                          <div class="card-body text-center">
                              <div class="card-header pt-0 pb-0">
                                  <p class="info darken-2">Ümumi Nəşr Sayı</p>

                              </div>
                              <div class="card-content">
                                  <div id="new-projects" class="height-150 newProjectsdonutShadow"><svg xmlns:ct="http://gionkunz.github.com/chartist-js/ct" width="100%" height="100%" class="ct-chart-donut" style="width: 100%; height: 100%;"><g class="ct-series ct-series-a"><path d="M211.919,5A70,70,0,1,0,211.931,5L211.931,15A60,60,0,1,1,211.921,15Z" class="ct-slice-donut-solid" ct:value="100"></path></g><g><text dx="211.93125915527344" dy="82.099609375" text-anchor="middle" class="ct-label" font-family="feather"></text></g><defs><linearGradient id="donutGradient6" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="rgba(40,175,208,1)"></stop><stop offset="95%" stop-color="rgba(40,175,208, 0.3)"></stop></linearGradient></defs></svg></div>
                                  <ul class="list-inline clearfix mt-2">
                                      <li>
                                          <h1 class="blue-grey lighten-1 text-bold-400">23</h1>
                                        <a>  <span class="info darken-2">
                                              <i class="ft-airplay"></i> Yeni Nəşr Dərc Et</span> </a>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>


              <div class="col-xl-4 col-lg-6 col-md-12">
           <div class="card bg-gradient-directional-success">
               <div class="card-content">
                   <div class="card-body">
                     <a>
                       <div class="media d-flex">
                           <div class="align-self-top">
                               <i class="ft-paperclip icon-opacity text-white font-large-4 float-left"></i>
                           </div>
                           <div class="media-body text-white text-right align-self-bottom mt-3">
                               <span class="d-block mb-1 font-medium-1">Yeni Online Müraciət</span>
                               <h1 class="text-white mb-0">0</h1>
                           </div>
                       </div>
                     </a>
                   </div>
               </div>
           </div>



           <div class="card bg-gradient-x-orange-yellow">
                <div class="card-content">
                    <div class="card-body">
                           <a href="<?php echo base_url("admin/messages"); ?>">
                        <div class="media d-flex">
                            <div class="align-self-top">
                                <i class="ft-mail icon-opacity text-white font-large-4 float-left"></i>
                            </div>
                            <div class="media-body text-white text-right align-self-bottom mt-3">
                                <span class="d-block mb-1 font-medium-1">Yeni Mesaj</span>
                                <h1 class="text-white mb-0"><?php echo $messagescount; ?></h1>
                            </div>
                        </div>
                      </a>
                    </div>
                </div>
       </div>

          </div>
  </div>
</div>
</div>
</div>
    <!-- ////////////////////////////////////////////////////////////////////////////-->
<?php $this->load->view('back/include/footer'); ?>
