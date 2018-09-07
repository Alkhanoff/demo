<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Controller {
  public function index()
	{
    $data['messagescount'] = $this->dtbs->messagescount();
		$this->load->view('back/home' ,$data);
	}
//////////////////////////////////Xidmətlər Start///////////////////////////////////////////////
  public function services()
	{
    $result = $this->dtbs->getdatas('services');
		$data['item'] =$result;
		$this->load->view('back/services/index' , $data);
	}

  public function servicesAbout(){
    		if(strlen($_FILES['picture']['name']) > 0){

     $config['upload_path']          = FCPATH.'images/services_general';
     $config['allowed_types']        = 'gif|jpg|jpeg|png';
     $config['encrypt_name']         = TRUE;
     $this->load->library('upload', $config);
      $this->upload->do_upload('picture');
       $image = $this->upload->data();
       $imagepath  = $image['file_name'];
       $imagesave  = 'images/services_general/'.$imagepath.'';


       $config['image_library']  = 'gd2';
       $config['source_image']   = 'images/services_general/'.$imagepath.'';
       $config['new_image']      = 'images/services_general/'.	$imagepath.'';
       $config['create_thumb']   = false;
       $config['maintain_ratio'] = false;
       $config['quality']        = '85%';


       $this->load->library('image_lib',$config);
       $this->image_lib->initialize($config);
       $this->image_lib->resize();
       $this->image_lib->clear();

        $data = array(
          'id'           => $id = $this->input->post('id'),
          'text_az'   => $text_az = $this->input->post('text_az'),
          'text_en'     => $text_en = $this->input->post('text_en'),
          'picture'     => $imagesave

        );



        $result = $this->dtbs->update($data , $id , 'id', 'services');
        	redirect('admin/services');

}else{
  $data = array(
    'id'           => $id = $this->input->post('id'),
    'text_az'   => $text_az = $this->input->post('text_az'),
    'text_en'     => $text_en = $this->input->post('text_en')


  );



  $result = $this->dtbs->update($data , $id , 'id', 'services');
    redirect('admin/services');

}
  }

  public function servicegroups(){
    $result = $this->dtbs->getdatas('service_groups');
    $data['item'] =$result;
    $this->load->view('back/services/servicegroups' , $data);
  }

  public function service_groups_create(){
      $this->load->view('back/services/create' );
  }

  public function create_service_group(){
    		if(strlen($_FILES['picture']['name']) > 0){
          $config['upload_path']          = FCPATH.'images/services_general';
      							$config['allowed_types']        = 'gif|jpg|jpeg|png';
      							$config['encrypt_name']         = TRUE;
      							$this->load->library('upload', $config);
      							 $this->upload->do_upload('picture');
      								$image = $this->upload->data();
      								$imagepath  = $image['file_name'];
      								$imagesave  = 'images/services_general/'.$imagepath.'';

      								$config['image_library']  = 'gd2';
      								$config['source_image']   = 'images/services_general/'.$imagepath.'';

      								$config['create_thumb']   = false;
      								$config['maintain_ratio'] = false;
      								$config['quality']        = '80%';


      								$this->load->library('image_lib',$config);
      								$this->image_lib->initialize($config);
      								$this->image_lib->resize();
      								$this->image_lib->clear();

       $data = array(
         'title_az'    => $title_az = $this->input->post('title_az'),
         'title_en'    => $title_en = $this->input->post('title_en'),
         'text_az'     =>  $text_az = $this->input->post('text_az'),
         'text_en'     => $text_en = $this->input->post('text_en'),
         'picture'     => $imagesave

       );


      	 $result = $this->dtbs->add('service_groups' ,$data);
         redirect('admin/servicegroups');
       } else{

         $data = array(
           'title_az'   => $title_az = $this->input->post('title_az'),
           'title_en'   => $title_en = $this->input->post('title_en'),
           'text_az'   => $text_az = $this->input->post('text_az'),
           'text_en'     => $text_en = $this->input->post('text_en')


         );


          $result = $this->dtbs->add('service_groups' ,$data);
           redirect('admin/servicegroups');
       }
  }

  public function service_groups_edit($id){
          $result = $this->dtbs->getdatabyid($id,'service_groups');
          $data['item'] = $result;
          $this->load->view('back/services/edit', $data);

  }

  public function update_service_group(){
    		if(strlen($_FILES['picture']['name']) > 0){
    $config['upload_path']          = FCPATH.'images/services_inside';
    $config['allowed_types']        = 'gif|jpg|jpeg|png';
    $config['encrypt_name']         = TRUE;
    $this->load->library('upload', $config);
     $this->upload->do_upload('picture');
      $image = $this->upload->data();
      $imagepath  = $image['file_name'];
      $imagesave  = 'images/services_inside/'.$imagepath.'';


      $config['image_library']  = 'gd2';
      $config['source_image']   = 'images/services_inside/'.$imagepath.'';
      $config['new_image']      = 'images/services_inside/'.	$imagepath.'';
      $config['create_thumb']   = false;
      $config['maintain_ratio'] = false;
      $config['quality']        = '85%';


      $this->load->library('image_lib',$config);
      $this->image_lib->initialize($config);
      $this->image_lib->resize();
      $this->image_lib->clear();

       $data = array(
         'id'         => $id = $this->input->post('id'),
         'title_az'   => $title_az = $this->input->post('title_az'),
         'title_en'   => $title_en = $this->input->post('title_en'),
         'text_az'    => $text_az = $this->input->post('text_az'),
         'text_en'    => $text_en = $this->input->post('text_en'),
         'picture'    => $imagesave

       );

        $result = $this->dtbs->update($data , $id , 'id' , 'service_groups');

         redirect('admin/servicegroups');
       }
       else{
         $data = array(
           'id'         => $id = $this->input->post('id'),
           'title_az'   => $title_az = $this->input->post('title_az'),
           'title_en'   => $title_en = $this->input->post('title_en'),
           'text_az'    => $text_az = $this->input->post('text_az'),
           'text_en'    => $text_en = $this->input->post('text_en'),


         );

          $result = $this->dtbs->update($data , $id , 'id' , 'service_groups');

           redirect('admin/servicegroups');

       }

  }

  public function servicegroups_delete($id , $where , $from){

            $delete = $this->dtbs->delete($id , $where , $from);
          	redirect('admin/servicegroups');

  }

//////////////////////////////////Xidmətlər End///////////////////////////////////////////////




/////////////////////////////////Sektorlar Start////////////////////////////////////////////////

public function sectors()
{
  $result = $this->dtbs->getdatas('sectors');
  $data['item'] =$result;
  $this->load->view('back/sectors/index' , $data);
}

public function sectorsAbout(){
      if(strlen($_FILES['picture']['name']) > 0){

   $config['upload_path']          = FCPATH.'images/sectors_general';
   $config['allowed_types']        = 'gif|jpg|jpeg|png';
   $config['encrypt_name']         = TRUE;
   $this->load->library('upload', $config);
    $this->upload->do_upload('picture');
     $image = $this->upload->data();
     $imagepath  = $image['file_name'];
     $imagesave  = 'images/sectors_general/'.$imagepath.'';


     $config['image_library']  = 'gd2';
     $config['source_image']   = 'images/sectors_general/'.$imagepath.'';
     $config['new_image']      = 'images/sectors_general/'.	$imagepath.'';
     $config['create_thumb']   = false;
     $config['maintain_ratio'] = false;
     $config['quality']        = '85%';


     $this->load->library('image_lib',$config);
     $this->image_lib->initialize($config);
     $this->image_lib->resize();
     $this->image_lib->clear();

      $data = array(
        'id'           => $id = $this->input->post('id'),
        'text_az'   => $text_az = $this->input->post('text_az'),
        'text_en'     => $text_en = $this->input->post('text_en'),
        'picture'     => $imagesave

      );

      $path   = image($id);

      unlink($path);

      $result = $this->dtbs->update($data , $id , 'id', 'sectors');
        redirect('admin/sectors');

}else{
$data = array(
  'id'           => $id = $this->input->post('id'),
  'text_az'   => $text_az = $this->input->post('text_az'),
  'text_en'     => $text_en = $this->input->post('text_en')


);



$result = $this->dtbs->update($data , $id , 'id', 'sectors');
  redirect('admin/sectors');

}
}

public function sectorgroups(){
  $result = $this->dtbs->getdatas('sector_groups');
  $data['item'] =$result;
  $this->load->view('back/sectors/sectorgroups' , $data);
}

public function sector_groups_create(){
    $this->load->view('back/sectors/create' );
}

public function create_sector_group(){
      if(strlen($_FILES['picture']['name']) > 0){
        $config['upload_path']          = FCPATH.'images/sectors_general';
                  $config['allowed_types']        = 'gif|jpg|jpeg|png';
                  $config['encrypt_name']         = TRUE;
                  $this->load->library('upload', $config);
                   $this->upload->do_upload('picture');
                    $image = $this->upload->data();
                    $imagepath  = $image['file_name'];
                    $imagesave  = 'images/sectors_general/'.$imagepath.'';

                    $config['image_library']  = 'gd2';
                    $config['source_image']   = 'images/sectors_general/'.$imagepath.'';

                    $config['create_thumb']   = false;
                    $config['maintain_ratio'] = false;
                    $config['quality']        = '80%';


                    $this->load->library('image_lib',$config);
                    $this->image_lib->initialize($config);
                    $this->image_lib->resize();
                    $this->image_lib->clear();

     $data = array(
       'title_az'    => $title_az = $this->input->post('title_az'),
       'title_en'    => $title_en = $this->input->post('title_en'),
       'text_az'     =>  $text_az = $this->input->post('text_az'),
       'text_en'     => $text_en = $this->input->post('text_en'),
       'picture'     => $imagesave

     );


       $result = $this->dtbs->add('sector_groups' ,$data);
       redirect('admin/sectorgroups');
     } else{

       $data = array(
         'title_az'   => $title_az = $this->input->post('title_az'),
         'title_en'   => $title_en = $this->input->post('title_en'),
         'text_az'   => $text_az = $this->input->post('text_az'),
         'text_en'     => $text_en = $this->input->post('text_en')


       );


        $result = $this->dtbs->add('sector_groups' ,$data);
         redirect('admin/sectorgroups');
     }
}

public function sector_groups_edit($id){
        $result = $this->dtbs->getdatabyid($id,'sector_groups');
        $data['item'] = $result;
        $this->load->view('back/sectors/edit', $data);

}

public function update_sector_group(){
      if(strlen($_FILES['picture']['name']) > 0){
  $config['upload_path']          = FCPATH.'images/sectors_inside';
  $config['allowed_types']        = 'gif|jpg|jpeg|png';
  $config['encrypt_name']         = TRUE;
  $this->load->library('upload', $config);
   $this->upload->do_upload('picture');
    $image = $this->upload->data();
    $imagepath  = $image['file_name'];
    $imagesave  = 'images/sectors_inside/'.$imagepath.'';


    $config['image_library']  = 'gd2';
    $config['source_image']   = 'images/sectors_inside/'.$imagepath.'';
    $config['new_image']      = 'images/sectors_inside/'.	$imagepath.'';
    $config['create_thumb']   = false;
    $config['maintain_ratio'] = false;
    $config['quality']        = '85%';


    $this->load->library('image_lib',$config);
    $this->image_lib->initialize($config);
    $this->image_lib->resize();
    $this->image_lib->clear();

     $data = array(
       'id'         => $id = $this->input->post('id'),
       'title_az'   => $title_az = $this->input->post('title_az'),
       'title_en'   => $title_en = $this->input->post('title_en'),
       'text_az'    => $text_az = $this->input->post('text_az'),
       'text_en'    => $text_en = $this->input->post('text_en'),
       'picture'    => $imagesave

     );

      $result = $this->dtbs->update($data , $id , 'id' , 'sector_groups');

       redirect('admin/sectorgroups');
     }
     else{
       $data = array(
         'id'         => $id = $this->input->post('id'),
         'title_az'   => $title_az = $this->input->post('title_az'),
         'title_en'   => $title_en = $this->input->post('title_en'),
         'text_az'    => $text_az = $this->input->post('text_az'),
         'text_en'    => $text_en = $this->input->post('text_en'),


       );

        $result = $this->dtbs->update($data , $id , 'id' , 'sector_groups');

         redirect('admin/sectorgroups');

     }

}

public function sectorgroups_delete($id , $where , $from){

          $delete = $this->dtbs->delete($id , $where , $from);
          redirect('admin/sectorgroups');

}






///////////////////////////////////Sektorlar End/////////////////////////////////////////////////////


/////////////////////////////////Xəbərlər Start//////////////////////////////////////////////////////
public function news(){
  $result = $this->dtbs->getdatas('cmsnews');
  $data['item'] =$result;
  $this->load->view('back/news/index' , $data);
}

public function news_create(){
  $this->load->view('back/news/create');
}

public function create_news(){

    $config['upload_path']          = FCPATH.'images/news';
              $config['allowed_types']        = 'gif|jpg|jpeg|png';
              $config['encrypt_name']         = TRUE;
              $this->load->library('upload', $config);
               $this->upload->do_upload('picture');
                $image = $this->upload->data();
                $imagepath  = $image['file_name'];
                $imagesave  = 'images/news/'.$imagepath.'';

                $config['image_library']  = 'gd2';
                $config['source_image']   = 'images/news/'.$imagepath.'';
                $config['new_image']      = 'images/news/'.	$imagepath.'';
                $config['create_thumb']   = false;
                $config['maintain_ratio'] = false;
                $config['quality']        = '80%';



                $this->load->library('image_lib',$config);
                $this->image_lib->initialize($config);
                $this->image_lib->resize();
                $this->image_lib->clear();
$now = date('Y-m-d H:i:s');
 $data = array(
   'title_az'    => $title_az = $this->input->post('title_az'),
   'title_en'    => $title_en = $this->input->post('title_en'),
   'text_az'     =>  $text_az = $this->input->post('text_az'),
   'text_en'     => $text_en = $this->input->post('text_en'),
   'picture'     => $imagesave,
   'tagline_az'    => $title_az = $this->input->post('text_az'),
   'tagline_en'    => $title_az = $this->input->post('text_en'),
   'date'    => $now


 );


   $result = $this->dtbs->add('cmsnews' ,$data);
   redirect('admin/news');

}

public function news_edit($id){
  $result = $this->dtbs->getdatabyid($id,'cmsnews');
  $data['item'] = $result;
  $this->load->view('back/news/edit', $data);
}

public function update_news(){
  if(strlen($_FILES['picture']['name']) > 0){
               $config['upload_path']          = FCPATH.'images/news';
                $config['allowed_types']        = 'gif|jpg|jpeg|png';
                $config['encrypt_name']         = TRUE;
                $this->load->library('upload', $config);
                 $this->upload->do_upload('picture');
                  $image = $this->upload->data();
                  $imagepath  = $image['file_name'];
                  $imagesave  = 'images/news/'.$imagepath.'';

                  $config['image_library']  = 'gd2';
                  $config['source_image']   = 'images/news/'.$imagepath.'';
                  $config['new_image']      = 'images/news/'.	$imagepath.'';
                  $config['create_thumb']   = false;
                  $config['maintain_ratio'] = false;
                  $config['quality']        = '80%';



                  $this->load->library('image_lib',$config);
                  $this->image_lib->initialize($config);
                  $this->image_lib->resize();
                  $this->image_lib->clear();
  $now = date('Y-m-d H:i:s');

  $data = array(
    'title_az'    => $title_az = $this->input->post('title_az'),
    'title_en'    => $title_en = $this->input->post('title_en'),
    'text_az'     =>  $text_az = $this->input->post('text_az'),
    'text_en'     => $text_en = $this->input->post('text_en'),
    'picture'     => $imagesave,
    'tagline_az'    => $title_az = $this->input->post('text_az'),
    'tagline_en'    => $title_az = $this->input->post('text_en'),
    'date'    => $now


  );

  $result = $this->dtbs->update($data , $id , 'ID' , 'cmsnews');

   redirect('admin/news');
 }
 else{
    $now = date('Y-m-d H:i:s');
   $data = array(
     'ID'         => $id = $this->input->post('ID'),
     'title_az'    => $title_az = $this->input->post('title_az'),
     'title_en'    => $title_en = $this->input->post('title_en'),
     'text_az'     =>  $text_az = $this->input->post('text_az'),
     'text_en'     => $text_en = $this->input->post('text_en'),

     'tagline_az'    => $title_az = $this->input->post('text_az'),
     'tagline_en'    => $title_az = $this->input->post('text_en'),
     'date'    => $now


   );

    $result = $this->dtbs->update($data , $id , 'ID' , 'cmsnews');

     redirect('admin/news');

 }
}

public function news_delete($id , $where , $from){

          $delete = $this->dtbs->delete($id , $where , $from);
          redirect('admin/news');

}


////////////////////////////Xəbərlər End//////////////////////////////////////////////////////////////


////////////////////////////////////Nəşrlər Start/////////////////////////////////////////////////////
public function publications(){
  $result = $this->dtbs->getdatas('cmspublicationsandviews');
  $data['item'] =$result;
  $this->load->view('back/publications/index' , $data);
}

public function publications_create(){
  $this->load->view('back/publications/create');
}

public function create_publications(){
  if(strlen($_FILES['file']['name']) > 0){
    $config1['upload_path']          = FCPATH.'images/news';
              $config1['allowed_types']        = '*';
              $config1['encrypt_name']         = TRUE;
              $config1['max_size']             = 5000;
              $this->load->library('upload', $config1);
               $this->upload->do_upload('file');
                $file = $this->upload->data();
                $filepath  = $file['file_name'];
                $filesave  = 'images/news/'.$filepath.'';







    $config['upload_path']          = FCPATH.'images/news';
              $config['allowed_types']        = 'gif|jpg|jpeg|png';
              $config['encrypt_name']         = TRUE;
              $this->load->library('upload', $config);
               $this->upload->do_upload('image');
                $image = $this->upload->data();
                $imagepath  = $image['file_name'];
                $imagesave  = 'images/news/'.$imagepath.'';

                $config['image_library']  = 'gd2';
                $config['source_image']   = 'images/news/'.$imagepath.'';
                $config['new_image']      = 'images/news/'.	$imagepath.'';
                $config['create_thumb']   = false;
                $config['maintain_ratio'] = false;
                $config['quality']        = '80%';



                $this->load->library('image_lib',$config);
                $this->image_lib->initialize($config);
                $this->image_lib->resize();
                $this->image_lib->clear();
$now = date('Y-m-d H:i:s');
 $data = array(
   'title_az'    => $title_az = $this->input->post('title_az'),
   'title_en'    => $title_en = $this->input->post('title_en'),
   'text_az'     =>  $text_az = $this->input->post('text_az'),
   'text_en'     => $text_en = $this->input->post('text_en'),
   'image'     => $imagesave,
   'tagline_az'    => $title_az = $this->input->post('text_az'),
   'tagline_en'    => $title_az = $this->input->post('text_en'),
   'date'    => $now,
   'file'    => $filesave,



 );


   $result = $this->dtbs->add('cmspublicationsandviews' ,$data);
   redirect('admin/publications');
}
   else{





         $config['upload_path']          = FCPATH.'images/news';
                   $config['allowed_types']        = 'gif|jpg|jpeg|png';
                   $config['encrypt_name']         = TRUE;
                   $this->load->library('upload', $config);
                    $this->upload->do_upload('image');
                     $image = $this->upload->data();
                     $imagepath  = $image['file_name'];
                     $imagesave  = 'images/news/'.$imagepath.'';

                     $config['image_library']  = 'gd2';
                     $config['source_image']   = 'images/news/'.$imagepath.'';
                     $config['new_image']      = 'images/news/'.	$imagepath.'';
                     $config['create_thumb']   = false;
                     $config['maintain_ratio'] = false;
                     $config['quality']        = '80%';



                     $this->load->library('image_lib',$config);
                     $this->image_lib->initialize($config);
                     $this->image_lib->resize();
                     $this->image_lib->clear();
     $now = date('Y-m-d H:i:s');
      $data = array(
        'title_az'    => $title_az = $this->input->post('title_az'),
        'title_en'    => $title_en = $this->input->post('title_en'),
        'text_az'     =>  $text_az = $this->input->post('text_az'),
        'text_en'     => $text_en = $this->input->post('text_en'),
        'image'     => $imagesave,
        'tagline_az'    => $title_az = $this->input->post('text_az'),
        'tagline_en'    => $title_az = $this->input->post('text_en'),
        'date'    => $now,




      );


        $result = $this->dtbs->add('cmspublicationsandviews' ,$data);
        redirect('admin/publications');


     }

}

public function publications_edit($id){
  $result = $this->dtbs->getdatabyid($id,'cmspublicationsandviews');
  $data['item'] = $result;
  $this->load->view('back/publications/edit', $data);
}

public function update_publications(){
  if(strlen($_FILES['image']['name']) > 0){
               $config['upload_path']          = FCPATH.'images/news';
                $config['allowed_types']        = 'gif|jpg|jpeg|png';
                $config['encrypt_name']         = TRUE;
                $this->load->library('upload', $config);
                 $this->upload->do_upload('image');
                  $image = $this->upload->data();
                  $imagepath  = $image['file_name'];
                  $imagesave  = 'images/news/'.$imagepath.'';

                  $config['image_library']  = 'gd2';
                  $config['source_image']   = 'images/news/'.$imagepath.'';
                  $config['new_image']      = 'images/news/'.	$imagepath.'';
                  $config['create_thumb']   = false;
                  $config['maintain_ratio'] = false;
                  $config['quality']        = '80%';



                  $this->load->library('image_lib',$config);
                  $this->image_lib->initialize($config);
                  $this->image_lib->resize();
                  $this->image_lib->clear();
  $now = date('Y-m-d H:i:s');

  $data = array(
    'title_az'    => $title_az = $this->input->post('title_az'),
    'title_en'    => $title_en = $this->input->post('title_en'),
    'text_az'     =>  $text_az = $this->input->post('text_az'),
    'text_en'     => $text_en = $this->input->post('text_en'),
    'image'     => $imagesave,
    'tagline_az'    => $title_az = $this->input->post('text_az'),
    'tagline_en'    => $title_az = $this->input->post('text_en'),
    'date'    => $now


  );

  $result = $this->dtbs->update($data , $id , 'ID' , 'cmspublicationsandviews');

   redirect('admin/publications');
 }
 else{
    $now = date('Y-m-d H:i:s');
   $data = array(
     'ID'         => $id = $this->input->post('ID'),
     'title_az'    => $title_az = $this->input->post('title_az'),
     'title_en'    => $title_en = $this->input->post('title_en'),
     'text_az'     =>  $text_az = $this->input->post('text_az'),
     'text_en'     => $text_en = $this->input->post('text_en'),

     'tagline_az'    => $title_az = $this->input->post('text_az'),
     'tagline_en'    => $title_az = $this->input->post('text_en'),
     'date'    => $now


   );

    $result = $this->dtbs->update($data , $id , 'ID' , 'cmspublicationsandviews');

     redirect('admin/publications');

 }
}

public function publications_delete($id , $where , $from){

          $delete = $this->dtbs->delete($id , $where , $from);
          redirect('admin/publications');

}

public function del_file($id){
    $data = array('file' =>  'null');
    $this->dtbs->del_file($id , $data);
    redirect($_SERVER['HTTP_REFERER']);

}






////////////////////////////////////Nəşrlər End/////////////////////////////////////////////////////

/////////////////////////////////////Haqqımızda Start///////////////////////////////////////////////

public function about()
{
  $result = $this->dtbs->getdatas('about');
  $data['item'] =$result;
  $this->load->view('back/about/index' , $data);
}

public function abouthome(){
      if(strlen($_FILES['picture']['name']) > 0){

   $config['upload_path']          = FCPATH.'images/about';
   $config['allowed_types']        = 'gif|jpg|jpeg|png';
   $config['encrypt_name']         = TRUE;
   $this->load->library('upload', $config);
    $this->upload->do_upload('picture');
     $image = $this->upload->data();
     $imagepath  = $image['file_name'];
     $imagesave  = 'images/about/'.$imagepath.'';


     $config['image_library']  = 'gd2';
     $config['source_image']   = 'images/abot/'.$imagepath.'';
     $config['new_image']      = 'images/about/'.	$imagepath.'';
     $config['create_thumb']   = false;
     $config['maintain_ratio'] = false;
     $config['quality']        = '85%';


     $this->load->library('image_lib',$config);
     $this->image_lib->initialize($config);
     $this->image_lib->resize();
     $this->image_lib->clear();

      $data = array(
        'id'           => $id = $this->input->post('id'),
        'text_az'   => $text_az = $this->input->post('text_az'),
        'text_en'     => $text_en = $this->input->post('text_en'),
        'picture'     => $imagesave

      );



      $result = $this->dtbs->update($data , $id , 'id', 'about');
        redirect('admin/about');

}else{
$data = array(
  'id'           => $id = $this->input->post('id'),
  'text_az'   => $text_az = $this->input->post('text_az'),
  'text_en'     => $text_en = $this->input->post('text_en')


);



$result = $this->dtbs->update($data , $id , 'id', 'about');
  redirect('admin/about');

}
}

public function aboutgroups(){
  $result = $this->dtbs->getdatas('about_groups');
  $data['item'] =$result;
  $this->load->view('back/about/aboutgroups' , $data);
}

public function about_groups_create(){
    $this->load->view('back/about/create' );
}

public function create_about_group(){
      if(strlen($_FILES['picture']['name']) > 0){
        $config['upload_path']          = FCPATH.'images/about';
                  $config['allowed_types']        = 'gif|jpg|jpeg|png';
                  $config['encrypt_name']         = TRUE;
                  $this->load->library('upload', $config);
                   $this->upload->do_upload('picture');
                    $image = $this->upload->data();
                    $imagepath  = $image['file_name'];
                    $imagesave  = 'images/about/'.$imagepath.'';

                    $config['image_library']  = 'gd2';
                    $config['source_image']   = 'images/about/'.$imagepath.'';

                    $config['create_thumb']   = false;
                    $config['maintain_ratio'] = false;
                    $config['quality']        = '80%';


                    $this->load->library('image_lib',$config);
                    $this->image_lib->initialize($config);
                    $this->image_lib->resize();
                    $this->image_lib->clear();

     $data = array(
       'title_az'    => $title_az = $this->input->post('title_az'),
       'title_en'    => $title_en = $this->input->post('title_en'),
       'text_az'     =>  $text_az = $this->input->post('text_az'),
       'text_en'     => $text_en = $this->input->post('text_en'),
       'picture'     => $imagesave

     );


       $result = $this->dtbs->add('about_groups' ,$data);
       redirect('admin/aboutgroups');
     } else{

       $data = array(
         'title_az'   => $title_az = $this->input->post('title_az'),
         'title_en'   => $title_en = $this->input->post('title_en'),
         'text_az'   => $text_az = $this->input->post('text_az'),
         'text_en'     => $text_en = $this->input->post('text_en')


       );


        $result = $this->dtbs->add('about_groups' ,$data);
         redirect('admin/aboutgroups');
     }
}

public function about_groups_edit($id){
        $result = $this->dtbs->getdatabyid($id,'about_groups');
        $data['item'] = $result;
        $this->load->view('back/about/edit', $data);

}

public function update_about_group(){
      if(strlen($_FILES['picture']['name']) > 0){
  $config['upload_path']          = FCPATH.'images/about';
  $config['allowed_types']        = 'gif|jpg|jpeg|png';
  $config['encrypt_name']         = TRUE;
  $this->load->library('upload', $config);
   $this->upload->do_upload('picture');
    $image = $this->upload->data();
    $imagepath  = $image['file_name'];
    $imagesave  = 'images/about/'.$imagepath.'';


    $config['image_library']  = 'gd2';
    $config['source_image']   = 'images/about/'.$imagepath.'';
    $config['new_image']      = 'images/about/'.	$imagepath.'';
    $config['create_thumb']   = false;
    $config['maintain_ratio'] = false;
    $config['quality']        = '85%';


    $this->load->library('image_lib',$config);
    $this->image_lib->initialize($config);
    $this->image_lib->resize();
    $this->image_lib->clear();

     $data = array(
       'id'         => $id = $this->input->post('id'),
       'title_az'   => $title_az = $this->input->post('title_az'),
       'title_en'   => $title_en = $this->input->post('title_en'),
       'text_az'    => $text_az = $this->input->post('text_az'),
       'text_en'    => $text_en = $this->input->post('text_en'),
       'picture'    => $imagesave

     );

      $result = $this->dtbs->update($data , $id , 'id' , 'about_groups');

       redirect('admin/aboutgroups');
     }
     else{
       $data = array(
         'id'         => $id = $this->input->post('id'),
         'title_az'   => $title_az = $this->input->post('title_az'),
         'title_en'   => $title_en = $this->input->post('title_en'),
         'text_az'    => $text_az = $this->input->post('text_az'),
         'text_en'    => $text_en = $this->input->post('text_en'),


       );

        $result = $this->dtbs->update($data , $id , 'id' , 'about_groups');

         redirect('admin/aboutgroups');

     }

}

public function aboutgroups_delete($id , $where , $from){

          $delete = $this->dtbs->delete($id , $where , $from);
          redirect('admin/aboutgroups');

}




/////////////////////////////////////Haqqımızda End///////////////////////////////////////////////




////////////////////////////////////Mesajlar Start////////////////////////////////////////////////

public function messages(){

  $result = $this->dtbs->getdatas('messages');
  $data['item'] = $result;
  $this->load->view('back/messages/home', $data);
}

public function message_edit($id){

$result =	$this->dtbs->getdatabyid($id , 'messages');
  if($result){
    $data['item'] =$result;
    $this->load->view('back/messages/edit', $data);
    $data = array('status' => 1);
    $this->dtbs->messageupdate($result['id'] , $data);

  }
}

public function message_delete($id, $where , $from){

    $delete = $this->dtbs->delete($id , $where , $from);
    if ($delete) {

             $this->session->set_flashdata('update_datatable','<div class="alert alert-success text-center alert-dismissible">
                       <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                       <h4><i class="icon fa fa-check"></i>Mesaj Silindi!</h4>
                       </div>');
             redirect('admin/messages');
                 }
             else{
             $this->session->set_flashdata('update_datatable','<div class="alert alert-danger text-center alert-dismissible">
                       <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                       <h4><i class="icon fa fa-ban"></i> Xəta baş verdi!</h4>
                           Silmə uğursuz oldu.	</div>');
             redirect('admin/messages');
               }
}






////////////////////////////////////Mesajlar End////////////////////////////////////////////////

}
