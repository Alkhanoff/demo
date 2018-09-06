
var intCurrentPageNo = 1;
var intNoOfPages = 1;

function loadPost()
{
	loadPage("post");
}

function checkHistory()
{
	if (objCourse[strCourseID].objPostHistory != null)
	{
		for (var i=0; i<objCourse[strCourseID].objPostHistory.length; i++)
		{
			if (strCurrentPage == objCourse[strCourseID].objPostHistory[i][0])
			{
				booInHistory = true;
				break;
			}
		}
	}

	if (!booInHistory)
		objOpenerTop.insertPostHistory(window["contentF"].subject);
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
	doShowHelp("post", 16, 55, 340, 222);
}

var strPrintWhichFrame;
var strPrintType;
function doPrint() {
	strPrintWhichFrame = window["contentF"];
	strPrintType = "post";
	window["printF"].location = "../../generichtm/commsprint.htm";
}