<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
if(!function_exists('format_date')){
    function format_date($mysql_date=''){
        if($mysql_date == ''){
            return '';
        }
        $arr = explode('-', $mysql_date);
        $year = $arr[0];
        $month = $arr[1];
        $day = $arr[2];

        $month_array = array(1 => 'января', 2 => 'февраля', 3 => 'марта', 4 => 'апреля', 5 => 'мая', 6 => 'июня', 7 => 'июля', 8 => 'августа', 9 => 'сентября', 10 => 'октября', 11 => 'ноября', 12 => 'декабря');        
        $month_str = $month_array[str_replace('0', '', $month)];

        return $day.'&nbsp;'.$month_str.'&nbsp;'.$year;
    }
}
if(!function_exists('format_date_without_year')){
    function format_date_without_year($mysql_date=''){
        if($mysql_date == ''){
            return '';
        }
        $arr = explode('-', $mysql_date);        
        $month = $arr[1];
        $day = $arr[2];

        $month_array = array(1 => 'января', 2 => 'февраля', 3 => 'марта', 4 => 'апреля', 5 => 'мая', 6 => 'июня', 7 => 'июля', 8 => 'августа', 9 => 'сентября', 10 => 'октября', 11 => 'ноября', 12 => 'декабря');
        $month_str = $month_array[str_replace('0', '', $month)];

        return $day.'&nbsp;'.$month_str;
    }
}
if(!function_exists('format_datetime')){
    function format_datetime($mysql_date=''){
        if($mysql_date == ''){
            return '';
        }
        $arr = explode(' ', $mysql_date);
        $date = format_date($arr[0]);

        $arr2 = $arr[1];
        $time = substr($arr2, 0, 5);

        return $date.'&nbsp;'.$time;
    }
}