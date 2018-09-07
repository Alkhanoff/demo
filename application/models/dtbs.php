<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dtbs extends CI_Model {
  function getdatas($from){
    $result = $this->db->select('*')->from($from)
    ->order_by('id','desc')->get()->result_array();
  //result_array(); 1 den cox row gelecekse
    return $result;
  }
  function getdata($from){
    $result = $this->db->select('*')->from($from)
    ->order_by('id','desc')->get()->row_array();

    return $result;
  }

  function update($data=array() , $id , $where , $from){
  $result = $this->db->where($where,$id)->update($from , $data);
  return $result;
}

function add($from , $data=array()){
  $result = $this->db->insert($from , $data);
  return $result;
}

function getdatabyid($id,$from){
  $result = $this->db->select('*')->from($from)
  ->where('id',$id)->get()->row_array();
  //row_array(); 1 row gele biler
  return $result;
}

function delete($id, $where , $from){
  $result = $this->db->delete($from, array($where=>$id));
  return $result;
}
//
//HomePub
function homepub_az(){
  $result =$this->db->select('*')->from('cmspublicationsandviews')
  ->where('title_az is not null', null)
  ->order_by('ID','desc')->limit(3)->get()->result_array();
  return $result;
}
function homepub_en(){
  $result =$this->db->select('*')->from('cmspublicationsandviews')
  ->where('title_en is not null', null)
  ->order_by('ID','desc')->limit(3)->get()->result_array();
  return $result;
}

}
