<?php

function image($id){
  $ci =& get_instance();
  $result = $ci->db->select('picture')->from('sectors')->where('id' , $id)->get()->row();
  return $result->image;
}

function imagesectorgroup($id){
  $ci =& get_instance();
  $result = $ci->db->select('picture')->from('sector_groups')->where('id' , $id)->get()->row();
  return $result->image;
}

function imageforservice($id){
  $ci =& get_instance();
  $result = $ci->db->select('picture')->from('services')->where('id' , $id)->get()->row();
  return $result->image;
}

function getLang(){
    $ci =& get_instance();
    return $ci->lang->lang();
}
function label($key){
    $ci =& get_instance();
    $rs = $ci->lang->line($key);
    if($rs){
      return $rs;
    }

    return $key;
}
?>
