
/*
The comms have changed to display a single link to each type, with the number of comms in brackets
*/

var objCurrentUnit = null;
var objOpener;
var objOpenerTop;
var strCourseID;
var strBaseURL;
var objCourse;
var booNavLoaded = false;
var booContentLoaded = false;
var strComms = "";
var strResource = "";
var strColor1 = "#FFFFFF";
var strColor2 = "#EDEDED";
var strCurrentColor;
var intAlternate = 1;
var intCommCount = 1;
var intResourceCount = 1;
var strImagePath = "../images/";
var strIconPath = strImagePath + "popups/reference/";
var intPageType;

var objTitleFrame;
var objContentFrame;
var objNavFrame;

function initialise()
{
	objTitleFrame = window["titleF"];	
	objContentFrame = window["contentF"];	
	objNavFrame = window["nav"];	

	objOpener = window.opener;
	objOpenerTop = objOpener.appTop;
	strBaseURL = objOpenerTop.strBaseURL;
	strCourseID = objOpenerTop.strCourseID;
	objCourse = objOpenerTop.objCourse[strCourseID];
	objCurrentUnit = objOpenerTop.objCurrentState.objUnit;
	preloadPopupImages();
	intPageType = REFERENCE;

	objTitleFrame.location = "reftitle.htm";
}

function switchColor()
{
	if (intAlternate == 1)
		intAlternate = 2;
	else
		intAlternate = 1;

	strCurrentColor = eval("strColor"+intAlternate);
}

function loadRef()
{
	objContentFrame.location = "reference.htm";
}

function initialiseComms()
{
	strCurrentColor = strColor1;
	if (objCourse.objEmailHistory != null)
		checkEmails();
	if (objCourse.objFaxHistory != null)
		checkFaxes();
	if (objCourse.objPostHistory != null)
		checkPosts();
	if (objCourse.objMemoHistory != null)
		checkMemos();
	if (objCourse.objPhoneHistory != null)
		checkPhones();
	if (objCourse.objVoicemailHistory != null)
		checkVoicemail();
	if (objCourse.objInterruptionHistory != null)
		checkInterruption();
	if (objCourse.objPostitHistory != null)
		checkPostit();	
	if (objCourse.objMeetingHistory != null)
		checkMeetings();		

	objContentFrame.document.getElementById("commsL").innerHTML = strComms;
}

function checkEmails()
{
	if (objCourse.objEmailHistory.length >0){
		strComms += "<div id=\"" + intCommCount + "L\" style=\"position:relative; left:0; top:0; width:253; z-index:6; visibility:visible\">" +
		"<table width=\"253\" border=\"0\" cellpadding=\"2\" cellspacing=\"0\"><tr>" +
		"<td valign=\"center\" align=\"center\" width=\"20\"><a href=\"#\" onclick=\"parent.showComms('email','" + objCourse.objEmailHistory[0][0] + "')\"><img src=\"" + strIconPath + "ref_email_icon.gif\" border=\"0\"></a></td>" +
		"<td valign=\"center\" align=\"left\" width=\"233\"><a href=\"#\" onclick=\"parent.showComms('email','" + objCourse.objEmailHistory[0][0] + "')\">Emails (" + objCourse.objEmailHistory.length + ")</a></td>" +
		"</tr></table>\n</div>\n";
		intCommCount++;
		switchColor();
	}
}

function checkFaxes()
{
	for (var i=0; i<objCourse.objFaxHistory.length; i++)
	{
		strComms += "<div id=\"" + intCommCount + "L\" style=\"position:relative; left:0; top:0; width:253; z-index:6; visibility:visible\">" +
		"<table width=\"253\" border=\"0\" cellpadding=\"2\" cellspacing=\"0\"><tr>" +
		"<td valign=\"center\" align=\"center\" width=\"20\"><a href=\"#\" onclick=\"parent.showComms('fax','" + objCourse.objFaxHistory[i][0] + "')\"><img src=\"" + strIconPath + "ref_fax_icon.gif\" border=\"0\"></a></td>" +
		"<td valign=\"center\" align=\"left\" width=\"233\"><a href=\"#\" onclick=\"parent.showComms('fax','" + objCourse.objFaxHistory[i][0] + "')\">" + objCourse.objFaxHistory[i][1] + "</a></td>" +
		"</tr></table>\n</div>\n";
		intCommCount++;
		switchColor();
	}
}

function checkPosts()
{
	for (var i=0; i<objCourse.objPostHistory.length; i++)
	{
		strComms += "<div id=\"" + intCommCount + "L\" style=\"position:relative; left:0; top:0; width:253; z-index:6; visibility:visible\">" +
		"<table width=\"253\" border=\"0\" cellpadding=\"2\" cellspacing=\"0\"><tr>" +
		"<td valign=\"center\" align=\"center\" width=\"20\"><a href=\"#\" onclick=\"parent.showComms('post','" + objCourse.objPostHistory[i][0] + "')\"><img src=\"" + strIconPath + "ref_post_icon.gif\" border=\"0\"></a></td>" +
		"<td valign=\"center\" align=\"left\" width=\"233\"><a href=\"#\" onclick=\"parent.showComms('post','" + objCourse.objPostHistory[i][0] + "')\">" + objCourse.objPostHistory[i][1] + "</a></td>" +
		"</tr></table>\n</div>\n";
		intCommCount++;
		switchColor();
	}

}

function checkMemos()
{
	for (var i=0; i<objCourse.objMemoHistory.length; i++)
	{
		strComms += "<div id=\"" + intCommCount + "L\" style=\"position:relative; left:0; top:0; width:253; z-index:6; visibility:visible\">" +
		"<table width=\"253\" border=\"0\" cellpadding=\"2\" cellspacing=\"0\"><tr>" +
		"<td valign=\"center\" align=\"center\" width=\"20\"><a href=\"#\" onclick=\"parent.showComms('memo','" + objCourse.objMemoHistory[i][0] + "')\"><img src=\"" + strIconPath + "ref_memo_icon.gif\" border=\"0\"></a></td>" +
		"<td valign=\"center\" align=\"left\" width=\"233\"><a href=\"#\" onclick=\"parent.showComms('memo','" + objCourse.objMemoHistory[i][0] + "')\">" + objCourse.objMemoHistory[i][1] + "</a></td>" +
		"</tr></table>\n</div>\n";
		intCommCount++;
		switchColor();
	}
}

function checkPhones()
{
	for (var i=0; i<objCourse.objPhoneHistory.length; i++)
	{
		strComms += "<div id=\"" + intCommCount + "L\" style=\"position:relative; left:0; top:0; width:253; z-index:6; visibility:visible\">" +
		"<table width=\"253\" border=\"0\" cellpadding=\"2\" cellspacing=\"0\"><tr>" +
		"<td valign=\"center\" align=\"center\" width=\"20\"><a href=\"#\" onclick=\"parent.showComms('phonecall','" + objCourse.objPhoneHistory[i][0] + "')\"><img src=\"" + strIconPath + "ref_phone_icon.gif\" border=\"0\"></a></td>" +
		"<td valign=\"center\" align=\"left\" width=\"233\"><a href=\"#\" onclick=\"parent.showComms('phonecall','" + objCourse.objPhoneHistory[i][0] + "')\">" + objCourse.objPhoneHistory[i][1] + "</a></td>" +
		"</tr></table>\n</div>\n";
		intCommCount++;
		switchColor();
	}

}

function checkVoicemail()
{
	if (objCourse.objVoicemailHistory.length > 0)
	{
		strComms += "<div id=\"" + intCommCount + "L\" style=\"position:relative; left:0; top:0; width:253; z-index:6; visibility:visible\">" +
		"<table width=\"253\" border=\"0\" cellpadding=\"2\" cellspacing=\"0\"><tr>" +
		"<td valign=\"center\" align=\"center\" width=\"20\"><a href=\"#\"  onclick=\"parent.showComms('voicemail','" + objCourse.objVoicemailHistory[0][0] + "')\"><img src=\"" + strIconPath + "ref_voicemail_icon.gif\" border=\"0\"></a></td>" +
		"<td valign=\"center\" align=\"left\" width=\"233\"><a href=\"#\"  onclick=\"parent.showComms('voicemail','" + objCourse.objVoicemailHistory[0][0] + "')\">Voicemails (" + objCourse.objVoicemailHistory.length + ")</a></td>" +
		"</tr></table>\n</div>\n";
		intCommCount++;
		switchColor();
	}
}

function checkInterruption()
{

	for (var i=0; i<objCourse.objInterruptionHistory.length; i++)
	{
		strComms += "<div id=\"" + intCommCount + "L\" style=\"position:relative; left:0; top:0; width:253; z-index:6; visibility:visible\">" +
		"<table width=\"253\" border=\"0\" cellpadding=\"2\" cellspacing=\"0\"><tr>" +
		"<td valign=\"center\" align=\"center\" width=\"20\"><a href=\"#\" onclick=\"parent.showComms('interruption','" + objCourse.objInterruptionHistory[i][0] + "')\"><img src=\"" + strIconPath + "ref_face2face_icon.gif\" border=\"0\"></a></td>" +
		"<td valign=\"center\" align=\"left\" width=\"233\"><a href=\"#\" onclick=\"parent.showComms('interruption','" + objCourse.objInterruptionHistory[i][0] + "')\">" + objCourse.objInterruptionHistory[i][1] + "</a></td>" +
		"</tr></table>\n</div>\n";
		intCommCount++;
		switchColor();
	}
}

function checkPostit()
{

	for (var i=0; i<objCourse.objPostitHistory.length; i++)
	{
		strComms += "<div id=\"" + intCommCount + "L\" style=\"position:relative; left:0; top:0; width:253; z-index:6; visibility:visible\">" +
		"<table width=\"253\" border=\"0\" cellpadding=\"2\" cellspacing=\"0\"><tr>" +
		"<td valign=\"center\" align=\"center\" width=\"20\"><a href=\"#\" onclick=\"parent.showComms('postit','" + objCourse.objPostitHistory[i][0] + "')\"><img src=\"" + strIconPath + "ref_postit_icon.gif\" border=\"0\"></a></td>" +
		"<td valign=\"center\" align=\"left\" width=\"233\"><a href=\"#\" onclick=\"parent.showComms('postit','" + objCourse.objPostitHistory[i][0] + "')\">" + objCourse.objPostitHistory[i][1] + "</a></td>" +
		"</tr></table>\n</div>\n";
		intCommCount++;
		switchColor();
	}
}

function checkMeetings()
{
	for (var i=0; i<objCourse.objMeetingHistory.length; i++)
	{
		strComms += "<div id=\"" + intCommCount + "L\" style=\"position:relative; left:0; top:0; width:253; z-index:6; visibility:visible\">" +
		"<table width=\"253\" border=\"0\" cellpadding=\"2\" cellspacing=\"0\"><tr>" +
		"<td valign=\"center\" align=\"center\" width=\"20\"><a href=\"#\" onclick=\"parent.showComms('meeting','" + objCourse.objMeetingHistory[i][0] + "')\"><img src=\"" + strIconPath + "ref_meeting_icon.gif\" border=\"0\"></a></td>" +
		"<td valign=\"center\" align=\"left\" width=\"233\"><a href=\"#\" onclick=\"parent.showComms('meeting','" + objCourse.objMeetingHistory[i][0] + "')\">" + objCourse.objMeetingHistory[i][1] + "</a></td>" +
		"</tr></table>\n</div>\n";
		switchColor();
	}
}

function showDoc(_strFileName)
{
	objOpenerTop.openDocument(_strFileName);
	top.window.close();
}

function showComms(_strCommType, _strCommPage)
{
	objOpenerTop.booBackToRef = true;
	objOpenerTop.jumpToComm(_strCommType,_strCommPage);
	top.window.close();
}

function initialiseResource()
{
	//glossary
	intAlternate = 1;
	strCurrentColor = strColor1;

	if ((strCourseID != "mf") && (strCourseID != "help"))
	{
		strResource += "<div id=\"" + intResourceCount + "L\" style=\"position:relative; left:0; top:0; width:253; z-index:6; visibility:visible\">" +
		"<table width=\"253\" border=\"0\" cellpadding=\"2\" cellspacing=\"0\"><tr>" +
		"<td valign=\"center\" align=\"center\" width=\"20\"><a href=\"#\" onclick=\"parent.launchGlossary()\"><img src=\"" + strIconPath + "ref_glossary_icon.gif\" border=\"0\"></a></td>" +
		"<td valign=\"center\" align=\"left\" width=\"233\"><a href=\"#\" onclick=\"parent.launchGlossary()\">Glossary</a></td>" +
		"</tr></table>\n</div>\n";
	}

	if (strCourseID == "ias34")
	{
		switchColor();
		strResource += "<div id=\"" + intResourceCount + "L\" style=\"position:relative; left:0; top:0; width:253; z-index:6; visibility:visible\">" +
		"<table width=\"253\" border=\"0\" cellpadding=\"2\" cellspacing=\"0\"><tr>" +
		"<td valign=\"center\" align=\"center\" width=\"20\"><a href=\"../resource/ias34/ias34_r15_Standards.pdf\" target=\"pdfWin\"><img src=\"" + strIconPath + "ref_resource_icon.gif\" border=\"0\"></a></td>" +
		"<td valign=\"center\" align=\"left\" width=\"233\"><a href=\"../resource/ias34/ias34_r15_Standards.pdf\" target=\"pdfWin\">IAS 34 standards</a></td>" +
		"</tr></table>\n</div>\n";
	}
	if (objOpenerTop.booWeb)
	{
		switchColor();
		strResource += "<div id=\"" + intResourceCount + "L\" style=\"position:relative; left:0; top:0; width:253; z-index:6; visibility:visible\">" +
		"<table width=\"253\" border=\"0\" cellpadding=\"2\" cellspacing=\"0\"><tr>" +
		"<td valign=\"center\" align=\"center\" width=\"20\"><a href=\"https://techlibrary/nxt/gateway.dll?f=templates&fn=default.htm&vid=global_tech:global\" target=\"infoBase\"><img src=\"" + strIconPath + "ref_webpage_icon.gif\" border=\"0\"></a></td>" +
		"<td valign=\"center\" align=\"left\" width=\"233\"><a href=\"https://techlibrary/nxt/gateway.dll?f=templates&fn=default.htm&vid=global_tech:global\" target=\"infoBase\">DTT Global Technical Library</a></td>" +
		"</tr></table>\n</div>\n";
	}
	// need to include generic resources here
	if (objCurrentUnit.objResources != null)
	{
		for (var i=0; i<objCurrentUnit.objResources.length; i++)
		{
			intResourceCount++;
			switchColor();
			strResource += "<div id=\"" + intResourceCount + "L\" style=\"position:relative; left:0; top:0; width:253; z-index:6; visibility:visible\">" +
			"<table width=\"253\" border=\"0\" cellpadding=\"2\" cellspacing=\"0\"><tr>" +
			"<td valign=\"center\" align=\"center\" width=\"20\"><a href=\"#\" onclick=\"parent.launchResource('" + objCurrentUnit.objResources[i][0] + "')\"><img src=\"" + strIconPath + "ref_resource_icon.gif\" border=\"0\"></a></td>" +
			"<td valign=\"center\" align=\"left\" width=\"233\"><a href=\"#\" onclick=\"parent.launchResource('" + objCurrentUnit.objResources[i][0] + "')\">" + objCurrentUnit.objResources[i][1] + "</a></td>" +
			"</tr></table>\n</div>\n";
		}
	}

	if (objCourse.objWordHistory != null)
		checkWord();		
	if (objCourse.objExcelHistory != null)
		checkExcel();		
	if (objCourse.objPowerpointHistory != null)
		checkPowerpoint();		
	if (objCourse.objAccessHistory != null)
		checkAccess();		

	switchColor();
	strResource += "<div id=\"" + intResourceCount + "L\" style=\"position:relative; left:0; top:0; width:253; z-index:6; visibility:visible\">" +
	"<table width=\"253\" border=\"0\" cellpadding=\"2\" cellspacing=\"0\"><tr>" +
	"<td valign=\"center\" align=\"center\" width=\"20\"><a href=\"#\" onclick=\"parent.launchCopyright()\"><img src=\"" + strIconPath + "ref_resource_icon.gif\" border=\"0\"></a></td>" +
	"<td valign=\"center\" align=\"left\" width=\"233\"><a href=\"#\" onclick=\"parent.launchCopyright()\">Copyright</a></td>" +
	"</tr></table>\n</div>\n";

	objContentFrame.document.getElementById("resourceL").innerHTML = strResource;
}

function launchCopyright() 
{
	window.open("copyright.htm","copyrightWin","width=400,height=260,left=" + ((screen.width / 2) - 200) + ",top=" + ((screen.height / 2) - 130) + ",toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=no,fullscreen=no");
}

function checkWord()
{
	for (var i=0; i<objCourse.objWordHistory.length; i++)
	{
		intResourceCount++;
		switchColor();
		strResource += "<div id=\"" + intResourceCount + "L\" style=\"position:relative; left:0; top:0; width:253; z-index:6; visibility:visible\">" +
		"<table width=\"253\" border=\"0\" cellpadding=\"2\" cellspacing=\"0\"><tr>" +
		"<td valign=\"center\" align=\"center\" width=\"20\"><a href=\"#\" onclick=\"parent.showDoc('" + objCourse.objWordHistory[i] + ".doc')\"><img src=\"" + strIconPath + "ref_word_icon.gif\" border=\"0\"></a></td>" +
		"<td valign=\"center\" align=\"left\" width=\"233\"><a href=\"#\" onclick=\"parent.showDoc('" + objCourse.objWordHistory[i] + ".doc')\">" + objCourse.objWordHistory[i].replace(/_/g," ") + "</a></td>" +
		"</tr></table>\n</div>\n";
	}
}

function checkExcel()
{
	for (var i=0; i<objCourse.objExcelHistory.length; i++)
	{
		intResourceCount++;
		switchColor();
		strResource += "<div id=\"" + intResourceCount + "L\" style=\"position:relative; left:0; top:0; width:253; z-index:6; visibility:visible\">" +
		"<table width=\"253\" border=\"0\" cellpadding=\"2\" cellspacing=\"0\"><tr>" +
		"<td valign=\"center\" align=\"center\" width=\"20\"><a href=\"#\" onclick=\"parent.showDoc('" + objCourse.objExcelHistory[i] + ".xls')\"><img src=\"" + strIconPath + "ref_excel_icon.gif\" border=\"0\"></a></td>" +
		"<td valign=\"center\" align=\"left\" width=\"233\"><a href=\"#\" onclick=\"parent.showDoc('" + objCourse.objExcelHistory[i] + ".xls')\">" + objCourse.objExcelHistory[i].replace(/_/g," ") + "</a></td>" +
		"</tr></table>\n</div>\n";
	}
}

function checkPowerpoint()
{
	for (var i=0; i<objCourse.objPowerpointHistory.length; i++)
	{
		intResourceCount++;
		switchColor();
		strResource += "<div id=\"" + intResourceCount + "L\" style=\"position:relative; left:0; top:0; width:253; z-index:6; visibility:visible\">" +
		"<table width=\"253\" border=\"0\" cellpadding=\"2\" cellspacing=\"0\"><tr>" +
		"<td valign=\"center\" align=\"center\" width=\"20\"><a href=\"#\" onclick=\"parent.showDoc('" + objCourse.objPowerpointHistory[i] + ".ppt')\"><img src=\"" + strIconPath + "ref_pwrpnt_icon.gif\" border=\"0\"></a></td>" +
		"<td valign=\"center\" align=\"left\" width=\"233\"><a href=\"#\" onclick=\"parent.showDoc('" + objCourse.objPowerpointHistory[i] + ".ppt')\">" + objCourse.objPowerpointHistory[i].replace(/_/g," ") + "</a></td>" +
		"</tr></table>\n</div>\n";
	}
}

function checkAccess()
{
	for (var i=0; i<objCourse.objAccessHistory.length; i++)
	{
		intResourceCount++;
		switchColor();
		strResource += "<div id=\"" + intResourceCount + "L\" style=\"position:relative; left:0; top:0; width:253; z-index:6; visibility:visible\">" +
		"<table width=\"253\" border=\"0\" cellpadding=\"2\" cellspacing=\"0\"><tr>" +
		"<td valign=\"center\" align=\"center\" width=\"20\"><a href=\"#\" onclick=\"parent.showDoc('" + objCourse.objAccessHistory[i] + ".mdb')\"><img src=\"" + strIconPath + "ref_database_icon.gif\" border=\"0\"></a></td>" +
		"<td valign=\"center\" align=\"left\" width=\"233\"><a href=\"#\" onclick=\"parent.showDoc('" + objCourse.objAccessHistory[i] + ".mdb')\">" + objCourse.objAccessHistory[i].replace(/_/g," ") + "</a></td>" +
		"</tr></table>\n</div>\n";
	}
}

function launchResource(_strID)
{
	objOpenerTop.booBackToRef = true;
	objOpenerTop.launchResource(_strID);
	top.window.close();
}

function launchGlossary()
{
	objOpenerTop.launchGlossary();
	top.window.close();
}