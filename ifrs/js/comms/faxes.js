
var intCurrentPageNo = 1;
var intNoOfPages = 1;

function loadFax()
{
	loadPage("fax");
}

function checkHistory()
{
	if (objCourse[strCourseID].objFaxHistory != null)
	{
		for (var i=0; i<objCourse[strCourseID].objFaxHistory.length; i++)
		{
			if (strCurrentPage == objCourse[strCourseID].objFaxHistory[i][0])
			{
				booInHistory = true;
				break;
			}
		}
	}

	if (!booInHistory)
		objOpenerTop.insertFaxHistory(window["contentF"].subject);
}

function checkNav()
{
	if (intNoOfPages > 1)
	{
		window["nav"].checkNav();
	}
}

function showHelp() {
	doShowHelp("fax", 16, 55, 340, 222);
}

var strPrintWhichFrame;
var strPrintType;

function doPrint() {
	strPrintWhichFrame = window["contentF"];
	strPrintType = "fax";
	window["printF"].location = "../../generichtm/commsprint.htm";
}