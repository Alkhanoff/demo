
function loadMessage()
{
	loadPage("email");
}

function checkHistory()
{
	if (objCourse[strCourseID].objEmailHistory != null)
	{
		for (var i=0; i<objCourse[strCourseID].objEmailHistory.length; i++)
		{
			if (strCurrentPage == objCourse[strCourseID].objEmailHistory[i][0])
			{
				booInHistory = true;
				break;
			}
		}
	}

	if (!booInHistory)
		objOpenerTop.insertEmailHistory(window["contentF"].from, window["contentF"].subject, window["contentF"].attachment);

	booInHistory = false;
}

function messageClicked(_strPage)
{
	strCurrentPage = _strPage;
	loadMessage();
}

function initialiseInbox()
{
	checkHistory();
	generateInbox();
}

function generateInbox()
{
	var _strInbox = "<table width=\"542\" cellpadding=\"0\" cellspacing=\"0\" style=\"font-family:Arial; font-size:9pt\">";
	if (objCourse[strCourseID].objEmailHistory != null)
	{
		for (var i=0; i<objCourse[strCourseID].objEmailHistory.length; i++)
		{
			if (strCurrentPage == objCourse[strCourseID].objEmailHistory[i][0])
			{
				_strInbox += "<tr><td width=\"17\" height=\"20\" bgcolor=\"#D6D6D6\" valign=\"center\" align=\"center\" style=\"cursor:default; border-top:1px solid #FFFFFF; border-right:1px solid #FFFFFF; border-left:1px solid #FFFFFF\">&nbsp;</td>";

				if (objCourse[strCourseID].objEmailHistory[i][3] == "n")
					_strInbox += "<td width=\"21\" height=\"20\" bgcolor=\"#D6D6D6\" valign=\"center\" align=\"center\" style=\"cursor:default; border-top:1px solid #FFFFFF; border-right:1px solid #FFFFFF; border-left:1px solid #FFFFFF\"><img src=\"../../images/trans.gif\" border=\"0\"></td>";
				else
					_strInbox += "<td width=\"21\" height=\"20\" bgcolor=\"#D6D6D6\" valign=\"center\" align=\"center\" style=\"cursor:default border-top:1px solid #FFFFFF; border-right:1px solid #FFFFFF; border-left:1px solid #FFFFFF\"><img src=\"../../images/popups/comms/email/attach_icon_small.gif\" border=\"0\"></td>";

				_strInbox += "<td width=\"210\" height=\"20\" bgcolor=\"#D6D6D6\" valign=\"center\" align=\"left\" style=\"cursor:default; border-top:1px solid #FFFFFF; border-right:1px solid #FFFFFF; border-left:1px solid #FFFFFF\">&nbsp;" + objCourse[strCourseID].objEmailHistory[i][1] + "</td>" +
							"<td width=\"294\" height=\"20\" bgcolor=\"#D6D6D6\" valign=\"center\" align=\"left\" style=\"cursor:default; border-top:1px solid #FFFFFF; border-right:1px solid #FFFFFF; border-left:1px solid #FFFFFF\">&nbsp;" + objCourse[strCourseID].objEmailHistory[i][2] + "</td></tr>";
			}
			else
			{
				_strInbox += "<tr><td width=\"17\" height=\"20\" bgcolor=\"white\" valign=\"center\" align=\"center\" style=\"cursor:default; border-top:1px solid #FFFFFF; border-right:1px solid #FFFFFF; border-left:1px solid #FFFFFF\">&nbsp;</td>";

				if (objCourse[strCourseID].objEmailHistory[i][3] == "n")
					_strInbox += "<td width=\"21\" height=\"20\" bgcolor=\"white\" valign=\"center\" align=\"center\" style=\"cursor:default; border-top:1px solid #FFFFFF; border-right:1px solid #FFFFFF; border-left:1px solid #FFFFFF\"><img src=\"../../images/trans.gif\" border=\"0\"></td>";
				else
					_strInbox += "<td width=\"21\" height=\"20\" bgcolor=\"white\" valign=\"center\" align=\"center\" style=\"cursor:default; border-top:1px solid #FFFFFF; border-right:1px solid #FFFFFF; border-left:1px solid #FFFFFF\"><img src=\"../../images/popups/comms/email/attach_icon_small.gif\" border=\"0\"></td>";

				_strInbox += "<td width=\"210\" height=\"20\" bgcolor=\"white\" valign=\"center\" align=\"left\" style=\"cursor:default; border-top:1px solid #FFFFFF; border-right:1px solid #FFFFFF; border-left:1px solid #FFFFFF\">&nbsp;<a href=\"#\" onclick=\"parent.messageClicked('" + objCourse[strCourseID].objEmailHistory[i][0] + "')\" onfocus=\"this.blur()\">" + objCourse[strCourseID].objEmailHistory[i][1] + "</a></td>" +
							"<td width=\"294\" height=\"20\" bgcolor=\"white\" valign=\"center\" align=\"left\" style=\"cursor:default; border-top:1px solid #FFFFFF; border-right:1px solid #FFFFFF; border-left:1px solid #FFFFFF\">&nbsp;<a href=\"#\" onclick=\"parent.messageClicked('" + objCourse[strCourseID].objEmailHistory[i][0] + "')\" onfocus=\"this.blur()\">" + objCourse[strCourseID].objEmailHistory[i][2] + "</a></td></tr>";
			}
		}
	}
	_strInbox += "</table>";

	window["inboxF"].document.getElementById("inboxL").innerHTML = _strInbox;
}

function showHelp() {
	doShowHelp("email", 7, 43, 482, 118);
}

var strPrintWhichFrame;
var strPrintType;
function doPrint() {
	strPrintWhichFrame = window["contentF"];
	strPrintType = "email";
	window["printF"].location = "../../generichtm/commsprint.htm";
}