
var intCurrentPageNo = 1;
var intNoOfPages = 1;

function loadPostit()
{
	loadPage("postit");
}

function checkHistory()
{
	if (objCourse[strCourseID].objPostitHistory != null)
	{
		for (var i=0; i<objCourse[strCourseID].objPostitHistory.length; i++)
		{
			if (strCurrentPage == objCourse[strCourseID].objPostitHistory[i][0])
			{
				booInHistory = true;
				break;
			}
		}
	}

	if (!booInHistory)
		objOpenerTop.insertPostitHistory(window["contentF"].subject);
}

function showHelp() {
	doShowHelp("postit", 16, 55, 340, 222);
}

var strPrintWhichFrame;
var strPrintType;
function doPrint() {
	strPrintWhichFrame = window["contentF"];
	strPrintType = "postit";
	window["printF"].location = "../../generichtm/commsprint.htm";
}