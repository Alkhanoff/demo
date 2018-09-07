
function loadInterruption()
{
	loadPage("interruption");
}

function checkHistory()
{
	if (objCourse[strCourseID].objInterruptionHistory != null)
	{
		for (var i=0; i<objCourse[strCourseID].objInterruptionHistory.length; i++)
		{
			if (strCurrentPage == objCourse[strCourseID].objInterruptionHistory[i][0])
			{
				booInHistory = true;
				break;
			}
		}
	}

	if (!booInHistory)
		objOpenerTop.insertInterruptionHistory(window["contentF"].subject);
}

function showHelp() {
	doShowHelp("interruption", 16, 55, 340, 222);
}

var strPrintWhichFrame;
var strPrintType;
function doPrint() {
	strPrintWhichFrame = window["contentF"];
	strPrintType = "interruption";
	window["printF"].location = "../../generichtm/commsprint.htm";
}