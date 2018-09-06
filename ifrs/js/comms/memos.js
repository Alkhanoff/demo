
var intCurrentPageNo = 1;
var intNoOfPages = 1;

function loadMemo()
{
	loadPage("memo");
}

function checkHistory()
{
	if (objCourse[strCourseID].objMemoHistory != null)
	{
		for (var i=0; i<objCourse[strCourseID].objMemoHistory.length; i++)
		{
			if (strCurrentPage == objCourse[strCourseID].objMemoHistory[i][0])
			{
				booInHistory = true;
				break;
			}
		}
	}

	if (!booInHistory)
		objOpenerTop.insertMemoHistory(window["contentF"].subject);
}

function checkNav()
{
	if (intNoOfPages > 1)
	{
		parent.window["nav"].checkNav();
	}
}

function showHelp() {
	doShowHelp("memo", 16, 55, 340, 222);
}

var strPrintWhichFrame;
var strPrintType;
function doPrint() {
	strPrintWhichFrame = window["contentF"];
	strPrintType = "memo";
	window["printF"].location = "../../generichtm/commsprint.htm";
}