
var strOptions = "toolbar=no,menubar=no,status=yes,scrollbars=no,resizable=no,top=0,left=0";
var intScreenWidth = screen.availWidth;
var intScreenHeight = screen.availHeight;
var booAllowOpen = true;
var strScreenWarning = "IFRS\n\nSorry, this programme requires a screen resolution of at least 800x600 to run. The programme will not launch at this time.";
var objWin;

function initialise() {
/*
	if (intScreenWidth > 800) {
		strOptions += ", width=" + (intScreenWidth-11) + ", height=" + (intScreenHeight-30) + ", resizable=yes, status=no";
	} else if (intScreenWidth == 800) {
		strOptions += ", width=800, height=600, fullscreen=yes";
	} else {
		booAllowOpen = false;
	}
*/
	strOptions += ", width=900, height=700, fullscreen=no";

	if (booAllowOpen) {
		objWin = window.open(strCourseID + "/index.htm", strCourseID+"Window",strOptions);

		if (objWin)
		{
			objWin.moveTo(0,0);
			objWin.focus();
		}
	} else {
		alert(strScreenWarning);
	}
}