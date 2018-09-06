var intCurrentPageNo = 1;
var intNoOfPages = 1;

var PLAYPAUSE = 0;
var INTERACTION = 1;
var PLAYONENTER = 2;

function loadMeeting()
{
	loadPage("meeting");
}

function checkHistory()
{
	if (objCourse[strCourseID].objMeetingHistory != null)
	{
		for (var i=0; i<objCourse[strCourseID].objMeetingHistory.length; i++)
		{
			if (strCurrentPage == objCourse[strCourseID].objMeetingHistory[i][0])
			{
				booInHistory = true;
				break;
			}
		}
	}

	if (!booInHistory)
		objOpenerTop.insertMeetingHistory(window["contentF"].subject);
}

function showHelp() {
	doShowHelp("meeting", 16, 55, 340, 222);
}

var strPrintWhichFrame;
var strPrintType;
function doPrint() {
	strPrintWhichFrame = window["contentF"];
	strPrintType = "meeting";
	window["printF"].location = "../../generichtm/commsprint.htm";
}