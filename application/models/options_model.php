<?php
    /**************************************
    *
    * Author   : Orkhan Huseynov
    * Contacts : orkhan.huseynov@live.com
    *
    **************************************/
    class Options_model extends CI_Model {

            function __construct(){
                    parent::__construct();
                    $this->load->database();
            }

            function get($key){
                    $sql = 'SELECT `value` FROM cmsoptions WHERE `key` = "'.$key.'" LIMIT 1';
                    $query = $this->db->query($sql);
                    $row = $query->row_array();

                    return $row['value'];
            }

    function set($key, $value){
        $old_value = $this->get($key);
        if($old_value){
            $sql = 'UPDATE cmsoptions SET `value` = "'.$value.'" WHERE `key` = "'.$key.'" LIMIT 1';
        }else{
            $sql = 'INSERT INTO cmsoptions(`key`, `value`) VALUES("'.$key.'", "'.$value.'")';
        }
        $query = $this->db->query($sql);
        return true;
    }
    }