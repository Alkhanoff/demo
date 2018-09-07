
function loadPhonecall()
{
	loadPage("phonecall");
}

function checkHistory()
{
	if (objCourse[strCourseID].objPhoneHistory != null)
	{
		for (var i=0; i<objCourse[strCourseID].objPhoneHistory.length; i++)
		{
			if (strCurrentPage == objCourse[strCourseID].objPhoneHistory[i][0])
			{
				booInHistory = true;
				break;
			}
		}
	}

	if (!booInHistory)
		objOpenerTop.insertPhoneHistory(window["contentF"].subject);
}

function checkNav()
{
	if (intNoOfPages > 1)
	{
		window["nav"].document.getElementById("navBackL").style.visibility = "visible";
		window["nav"].checkNav();
	}
}

function showHelp() {
	doShowHelp("phonecall", 16, 55, 340, 222);
}

var strPrintWhichFrame;
var strPrintType;
function doPrint() {
	strPrintWhichFrame = window["contentF"];
	strPrintType = "phonecall";
	window["printF"].location = "../../generichtm/commsprint.htm";
}