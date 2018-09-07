<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
if ( ! function_exists('fcke')){
    function fcke($value='',$name='FCKeditor1',$width='100%',$height='400px',$fckbasePath='fckeditor/'){
       include_once("fckeditor/fckeditor.php") ;
        $oFCKeditor = new FCKeditor($name) ;
        $oFCKeditor->BasePath = base_url().$fckbasePath;
        $oFCKeditor->Value = $value;
        $oFCKeditor->Width = $width;
        $oFCKeditor->Height = $height;
        return $oFCKeditor->CreateHtml();
    }
}
?>
