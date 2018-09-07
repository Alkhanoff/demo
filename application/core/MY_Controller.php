<?php
class MY_Controller extends CI_Controller{

    function __construct(){
      parent:: __construct();
      $this->loadLang();

    }

    public function loadLang(){
      $lang = $this->lang->lang();
      $this->lang->load($lang,$lang);
    }

}

?>
