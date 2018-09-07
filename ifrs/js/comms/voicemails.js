
var booMachineLoaded = false;
var intCurrentMessage = 0;
var intLastMessage = 0;

function loadMessage()
{
	loadPage("voicemail");
}

function checkHistory()
{
	if (objCourse[strCourseID].objVoicemailHistory != null)
	{
		for (var i=0; i<objCourse[strCourseID].objVoicemailHistory.length; i++)
		{
			if (strCurrentPage == objCourse[strCourseID].objVoicemailHistory[i][0])
			{
				booInHistory = true;
				break;
			}
		}
	}

	if (!booInHistory)
	{
		objOpenerTop.insertVoicemailHistory(window["contentF"].subject);
		window["voicemailF"].changeImage("light_h");
	}

	booInHistory = false;
}

/*
function messageClicked(page)
{
	currentPage = page;
	loadMessage();
}
*/

function loadPrevMessage()
{
	intCurrentMessage--;
	strCurrentPage = objCourse[strCourseID].objVoicemailHistory[intCurrentMessage][0];
	loadMessage();
}

function loadNextMessage()
{
	intCurrentMessage++;
	strCurrentPage = objCourse[strCourseID].objVoicemailHistory[intCurrentMessage][0];
	loadMessage();
}

function initialiseVoicemail()
{
	var _strExpressInstall = parent.objOpenerTop.strBaseURL + "js/comms/swfobject/expressInstall.swf";
	var _arrFilenameSplit = window["contentF"].filename.split("_");
	//var _strFilename = parent.objUnit.URL + "audio/" + window["contentF"].filename;
	var _strFilename = parent.objOpenerTop.strBaseURL + "units/" + _arrFilenameSplit[1] + "/" + _arrFilenameSplit[2] + "/content/audio/" + window["contentF"].filename;

	var flashvars = {};
	var params = {};
	params.allowscriptaccess = "always";
	params.swliveconnect = "true";
	params.play = "false";
	var attributes = {};
	attributes.id = "flashObject";
	attributes.name = "flashObject";

	window["contentF"].swfobject.embedSWF(_strFilename, "flashL", "1", "1", "9.0.0", _strExpressInstall, flashvars, params, attributes);

	
	checkHistory();
	generateMessageBox();
//	if (voicemailF.document.images['lightImg'].src.indexOf("_h.jpg",0) == -1)
//		contentF.loadAudio();
}

function generateMessageBox()
{
	var _strBullet = "&nbsp;&bull;&nbsp;";
	var _arrMessage = new Array();
	var _strMessage = "";
	var _intStartCount;
	var _intEndCount;
	var _strSubject;

	if (objCourse[strCourseID].objVoicemailHistory != null)
	{
		intLastMessage = objCourse[strCourseID].objVoicemailHistory.length - 1;
		for (var i=0; i<objCourse[strCourseID].objVoicemailHistory.length; i++)
		{
			if (strCurrentPage == objCourse[strCourseID].objVoicemailHistory[i][0])
				intCurrentMessage = i;

			_strSubject = objCourse[strCourseID].objVoicemailHistory[i][1];
			if (_strSubject.length >24)
				_strSubject = _strSubject.slice(0,21) + "...";
			_arrMessage[_arrMessage.length] = "&nbsp;" + (i + 1) + ".&nbsp;" + _strSubject + "<br>";
		}
	}

	if (intCurrentMessage < 4)
	{
		_intStartCount = 0;
		if (_arrMessage.length < 4)
			_intEndCount = _arrMessage.length;
		else
			_intEndCount = 4;
	}
	else
	{
		_intStartCount = intCurrentMessage - 3;
		_intEndCount = intCurrentMessage + 1;
	}

	for (var i=_intStartCount; i<_intEndCount; i++)
	{
		if (intCurrentMessage == i)
			_strMessage += "<span color=\"#FFFFFF\">" + _arrMessage[i] + "</span>";
		else
			_strMessage += _arrMessage[i];
	}

	window["voicemailF"].document.getElementById("messageL").innerHTML = _strMessage;
}

function showHelp() {
	doShowHelp("voicemail", 7, 48, 250, 254);
}

function popupTitle(_strImgName, _strAlign) {
	return "<div style='position:absolute; left:-5px; top:4px;'><img src='../../../../images/content/popup_titles/" + _strImgName + ".gif' alt='" + _strImgName + "' /></div>"
}

var strPrintWhichFrame;
var strPrintType;
function doPrint() {
	strPrintWhichFrame = window["contentF"];
	strPrintType = "voicemail";
	window["printF"].location = "../../generichtm/commsprint.htm";
}