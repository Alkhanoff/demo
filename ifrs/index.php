<?php
	$ifrs_user = $_COOKIE['ifrs_user'];
	if($ifrs_user == ''){
		header('Location: http://bt.huseynov.us/check_login/index/ifrs/');
        exit();
	}
	
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 transitional//EN">
<html lang="en">
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<script language="javascript" src="js/launcher.js"></script>
<script language="javascript">
var strCourseID = "ifrs1";
var booLMSPresent = false;

function init()
{
	setTimeout("initialise()",100);			
}

function closeMe(){
	top.close();
	if (window.opener)
	{
		window.opener.focus();
	}
}
</script>
</head>
<body onload="init()">
<div style="font-family:Arial; font-size:12pt; padding:5px; width:100%;">
	<div style="position:absolute;z-index:1000;top:0;right:0;padding-top:5px;padding-right:4px;">
		<a href="http://bt.huseynov.us/check_login/logout/ifrs/">Log out</a>
	</div>
<b>Enabling pop-up blockers</b>
<p>Some security software (e.g. pop-up blockers) may prevent the programme running because they open in a separate browser window. Pop-up blockers (like those used in Win XP SP2) should be disabled before running the course. To do this:</p>
<ul>
<li>Click 'Tools' on your browser toolbar </li>
<li>Click 'Internet Options' </li>
<li>Click the 'Security' tab </li>
<li>Ensure the 'Internet' icon is selected </li>
<li>Click 'Custom Level' </li>
<li>Scroll down to 'Miscellaneous' </li>
<li>Under 'Allow script-initiated windows without size or position constraints' select the 'Enable' radio button</li>
</ul>
</div>
</body>
</html>