<?php
    $lang = get_cookie('lang', TRUE);
?>

<div id="main_content">		
	<h2><?php echo ($lang == 'en')? 'Register for email updates' : 'Yenilikləri E-mail ünvanına almaq üçün qeydiyyat';?></h2>
	<div>
		<?php echo ($lang == 'en')? 'Register your details to receive the latest Baker Tilly Azerbaijan news, views, publications and invitations by email.' : '“Baker Tilly Azərbaycan” şirkəti haqqında -  ən son xəbərləri, nəşrləri,dəvətlər, tədbirlər,  haqqında məlumatı və s. e-mailinizə almaq üçün qeydiyyatdan keçin.';?><br /><br />
	</div>
	
	<form name="reg_for_upd" method="post" action="{base_url}register_for_updates/index/save/">	
	
	<table style="width:100%;">
		<tr>
			<td style="width:50px;"><?php echo ($lang == 'en')? 'Name, Last name:' : 'Adınız, Soyadınız:';?></td> 
			<td style="width:470px;"><input type="text" name="name_lastname" value="<?php echo set_value('name_lastname'); ?>" /> <?php echo form_error('name_lastname'); ?></td>
		</tr>
		<tr>
			<td style="width:50px;"><?php echo ($lang == 'en')? 'E-mail:' : 'E-mail ünvanınız:';?></td>
			<td style="width:470px;height:25px;"><input type="text" name="email" value="<?php echo set_value('email'); ?>" /> <?php echo form_error('email'); ?></td>
		</tr>
		<tr>
			<td style="width:190px;"><?php echo ($lang == 'en')? 'Re-confirm e-mail:' : 'E-mail ünvanınızı yenidən yazaraq təsdiqləyin:';?></td>
			<td style="width:470px;height:30px;"><input type="text" name="confirm_email" value="<?php echo set_value('confirm_email'); ?>" /> <?php echo form_error('confirm_email'); ?></td>
		</tr>
		<tr>
			<td style="width:50px;height:30px;"><input type="submit" name="submit" value="<?php echo ($lang == 'en')? 'Submit' : 'Təsdiqləmək';?>" style="width:80px;" /></td>
			<td style="width:470px;"></td>
		</tr>
	</table>		
			
	</form>
	
	<div><br />
		<strong><?php echo ($lang == 'en')? 'Privacy' : 'Məxfilik';?></strong>
		<div>
			<br /><?php echo ($lang == 'en')? 'Your email address will be included in our database solely for the purpose of sending our publications and are not available to any other party nor be used for any other purpose.' : 'E-mail ünvanınız yalnız şirkət haqqında yenilikləri sizə yollamaq üçün istifadə ediləcəkdir və başqa tərəflərlə hər hansı digər məqsədlər üçün bölüşülməyəcəkdir.';?>
		</div>
	</div>
</div>