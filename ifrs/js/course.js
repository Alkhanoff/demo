var imagePath = "../images/";
var objMonthArray = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
var booMainWindow = true;
var intPageType;
var booFlashInstalled = false;
var objOpener = null;
var objMainAreaFrame;
var objHiddenFrame;

var strBaseURL;
var strUnitDir;
var booWeb;

var strCurrentUnit = "";
var booLastPage = false;
var booInstructionChanged = false;
var strTaskToGoTo = null;
var booAnswerStatus = false;
var intPercentage = null;

var objRivisitArray = null;
var booFromRevisit = false;
var booLinearRoute = false;
var booFromQuickFind = false;
var booBackToRef = false;

var booQuestionPage = false;

var strCurrentFilter = null;
var strFilterScenario = null;

var objCourseStartTime;
var booLMSPresent = false;
var strTrackingData = null;
var strStartDate = null;
var strEndDate = null;
var strUserName = "";
var booNameEntered = false;
var booExitClicked = false;
var strTrackingStartDate = null;
var strTrackingEndDate = null;

var booShowIntroPage = false;	// Set to true in index.htm as required.

function initialise()
{
	objCourseStartTime = new Date().getTime();

	objOpener = window.opener;
	booFlashInstalled = flashInstalled();

	assignObjects();
	preloadPopupImages();
	findBaseURL();

	booLMSPresent = window.opener.booLMSPresent;
	if (booLMSPresent)
	{
		strTrackingData = window.opener.strTrackingData;
	}

	continueInit();
}

function assignObjects()
{
	objMainAreaFrame = window['mainArea'];
	objHiddenFrame = window['hidden'];
}

function findBaseURL()
{
	strBaseURL = new String(document.location);
	booWeb = ((strBaseURL.indexOf("http://",0) != -1) || (strBaseURL.indexOf("https://",0) != -1));
	strBaseURL = strBaseURL.substring(0,strBaseURL.lastIndexOf("/",strBaseURL.length));
	strBaseURL = strBaseURL.substring(0,strBaseURL.lastIndexOf("/",strBaseURL.length)+1);
}

function continueInit()
{
	retrieveTrackingData();

	if ((booWeb) || (booLMSPresent) || (iasPLUS))
	{
		continueNormal();
	}
	else
	{
		objMainAreaFrame.location = strBaseURL + "generichtm/offline/offline.htm";
	}
}

function continueNormal()
{
	if ((strCourseID == "ias3239") || (strCourseID == "ias32392") || (strCourseID == "ias32393") || (booShowIntroPage))
		objMainAreaFrame.location = strBaseURL + strCourseID + "/intro.htm";
	else
		loadMenu();
}

function loadMenu()
{
	objMainAreaFrame.location = strBaseURL + strCourseID + "/menu/menu.htm";
}

function unloadExit()
{
	if (!booExitClicked)
	{
		if (booLMSPresent)
			saveLMSData();
	}
}

function goUnit(_strUnitID)
{
	var _objUnit;
	var _arrUnitID = _strUnitID.split("_");

	strCurrentUnit = _strUnitID;
	strUnitDir = "";
	objRivisitArray = null;
	for (var i=0; i<objCourse[_arrUnitID[0]].objChilds.length; i++)
	{
		if (objCourse[_arrUnitID[0]].objChilds[i].strID == _arrUnitID[1])
		{
			_objUnit = objCourse[_arrUnitID[0]].objChilds[i];
			strUnitDir = "units/"+_arrUnitID[0];
			if (_objUnit.intType == BLOCK)
			{
				strUnitDir += "/"+_objUnit.strID;
				for (var j=0; j<_objUnit.objChilds.length; j++)
				{
					if (_objUnit.objChilds[j].strID == _arrUnitID[2])
					{
						_objUnit = _objUnit.objChilds[j];
						break;
					}
				}
			}
			strUnitDir += "/"+_objUnit.strID;
			break;
		}
	}

	objCurrentState.objUnit = _objUnit;
	objHiddenFrame.location = strBaseURL + strUnitDir + "/navigation.htm";
}

function startUnit()
{
	objMainAreaFrame.location = strBaseURL + "generichtm/unit/unit.htm";
}

function returnLast()
{
	findUnit(objCourse[strCourseID], strCourseID + "_" + objRivisitArray[0]);
	objUnitRef.intCurrentPage = objRivisitArray[1]*1;
	objRivisitArray = null;
	booFromRevisit = true;
	goUnit(strCourseID + "_" + objUnitRef.strID);
}

/***** START OF TRACKING FUNCTIONS *****/

function saveTrackingData()
{
	var _objExpireDate = new Date().getTime()+315360000000;
	_objExpireDate = new Date(_objExpireDate);
	generateTrackingData();
	if (!booLMSPresent)
		setCookie(strCourseID, strTrackingData,_objExpireDate);
}

function getDate()
{
	var _objCurrentDate = new Date();
	return _objCurrentDate.getDate() + "/"+ (_objCurrentDate.getMonth() + 1) + "/" + _objCurrentDate.getFullYear();
}

function generateTrackingData()
{
	var _strTaskSeperator = ";";
	var _strCurrentStartDate = getDate();
	var _strCurrentEndDate = getDate();
	var _strAssessmentDate;
	var _strPassed;
	var _objTemp1;
	var _objTemp2;

	objCourse[strCourseID].checkStatus();

	strTrackingData = "";

	// Generate the scenario,task, task question status tracking string
	for (var i=0; i<objCourse[strCourseID].objChilds.length; i++)
	{
		strTrackingData += objCourse[strCourseID].objChilds[i].strID+":"+objCourse[strCourseID].objChilds[i].intState+":";
		if (objCourse[strCourseID].objChilds[i].objNavArray != null)
		{
			for (var j=0; j<objCourse[strCourseID].objChilds[i].objNavArray.length; j++)
			{
				if (j == (objCourse[strCourseID].objChilds[i].objNavArray.length-1))
					strTrackingData += objCourse[strCourseID].objChilds[i].objNavArray[j][1];
				else
					strTrackingData += objCourse[strCourseID].objChilds[i].objNavArray[j][1]+",";
			}
		}
		else if (objCourse[strCourseID].objChilds[i].objPreviousNavStatus != null)
		{
			strTrackingData += objCourse[strCourseID].objChilds[i].objPreviousNavStatus;
		}
		strTrackingData += "|";

		if (objCourse[strCourseID].objChilds[i].objTaskStatusArray != null)
		{
			_strTaskSeperator = ";";
			for (var j=0; j<objCourse[strCourseID].objChilds[i].objTaskStatusArray.length; j++)
			{
				if (j == (objCourse[strCourseID].objChilds[i].objTaskStatusArray.length - 1))
					_strTaskSeperator = "";

				strTrackingData += objCourse[strCourseID].objChilds[i].objTaskStatusArray[j][0]+":"+objCourse[strCourseID].objChilds[i].objTaskStatusArray[j][1];
				if ((objCourse[strCourseID].objChilds[i].objTaskQSArray != null) && (objCourse[strCourseID].objChilds[i].objTaskQSArray[objCourse[strCourseID].objChilds[i].objTaskStatusArray[j][0]]))
					strTrackingData += ":"+objCourse[strCourseID].objChilds[i].objTaskQSArray[objCourse[strCourseID].objChilds[i].objTaskStatusArray[j][0]][0]

				strTrackingData += _strTaskSeperator;
			}

			if (objCourse[strCourseID].objChilds[i].booAssessment)
			{
				_strAssessmentDate = objCourse[strCourseID].objChilds[i].strAssessmentDate;
				if (_strAssessmentDate != null)
				{
					strTrackingData += ";"+_strAssessmentDate+":"+objCourse[strCourseID].objChilds[i].intScore+":"+objCourse[strCourseID].objChilds[i].intMaxScore;
					intPercentage = parseInt((objCourse[strCourseID].objChilds[i].intScore / objCourse[strCourseID].objChilds[i].intMaxScore) * 100);
					if (intPercentage >= objCourse[strCourseID].objChilds[i].intPassRate)
						_strPassed = "True";
					else
						_strPassed = "False";
				}
				else
				{
					strTrackingData += ";::";
				}
			}
		}

		if (i == (objCourse[strCourseID].objChilds.length - 1))
			strTrackingData += "*";
		else
			strTrackingData += "#";
	}

	// adding communication history
	if (objCourse[strCourseID].objEmailHistory != null)
	{
		strTrackingData += "1~";
		for (var i=0; i<objCourse[strCourseID].objEmailHistory.length; i++)
		{
			strTrackingData += objCourse[strCourseID].objEmailHistory[i][0].replace(/\.htm/,"")+"^"+objCourse[strCourseID].objEmailHistory[i][1]+"^"+objCourse[strCourseID].objEmailHistory[i][2]+"^"+objCourse[strCourseID].objEmailHistory[i][3];
			if (i == (objCourse[strCourseID].objEmailHistory.length - 1))
				strTrackingData += "#";
			else
				strTrackingData += "~";
		}
	}

	if (objCourse[strCourseID].objFaxHistory != null)
	{
		strTrackingData += "2~";
		for (var i=0; i<objCourse[strCourseID].objFaxHistory.length; i++)
		{
			strTrackingData += objCourse[strCourseID].objFaxHistory[i][0].replace(/\.htm/,"")+"^"+objCourse[strCourseID].objFaxHistory[i][1];
			if (i == (objCourse[strCourseID].objFaxHistory.length - 1))
				strTrackingData += "#";
			else
				strTrackingData += "~";
		}
	}

	if (objCourse[strCourseID].objPostHistory != null)
	{
		strTrackingData += "3~";
		for (var i=0; i<objCourse[strCourseID].objPostHistory.length; i++)
		{
			strTrackingData += objCourse[strCourseID].objPostHistory[i][0].replace(/\.htm/,"")+"^"+objCourse[strCourseID].objPostHistory[i][1];
			if (i == (objCourse[strCourseID].objPostHistory.length - 1))
				strTrackingData += "#";
			else
				strTrackingData += "~";
		}
	}

	if (objCourse[strCourseID].objMemoHistory != null)
	{
		strTrackingData += "4~";
		for (var i=0; i<objCourse[strCourseID].objMemoHistory.length; i++)
		{
			strTrackingData += objCourse[strCourseID].objMemoHistory[i][0].replace(/\.htm/,"")+"^"+objCourse[strCourseID].objMemoHistory[i][1];
			if (i == (objCourse[strCourseID].objMemoHistory.length - 1))
				strTrackingData += "#";
			else
				strTrackingData += "~";
		}
	}

	if (objCourse[strCourseID].objPhoneHistory != null)
	{
		strTrackingData += "5~";
		for (var i=0; i<objCourse[strCourseID].objPhoneHistory.length; i++)
		{
			strTrackingData += objCourse[strCourseID].objPhoneHistory[i][0].replace(/\.htm/,"")+"^"+objCourse[strCourseID].objPhoneHistory[i][1];
			if (i == (objCourse[strCourseID].objPhoneHistory.length - 1))
				strTrackingData += "#";
			else
				strTrackingData += "~";
		}
	}

	if (objCourse[strCourseID].objVoicemailHistory != null)
	{
		strTrackingData += "6~";
		for (var i=0; i<objCourse[strCourseID].objVoicemailHistory.length; i++)
		{
			strTrackingData += objCourse[strCourseID].objVoicemailHistory[i][0].replace(/\.htm/,"")+"^"+objCourse[strCourseID].objVoicemailHistory[i][1];
			if (i == (objCourse[strCourseID].objVoicemailHistory.length - 1))
				strTrackingData += "#";
			else
				strTrackingData += "~";
		}
	}

	if (objCourse[strCourseID].objInterruptionHistory != null)
	{
		strTrackingData += "7~";
		for (var i=0; i<objCourse[strCourseID].objInterruptionHistory.length; i++)
		{
			strTrackingData += objCourse[strCourseID].objInterruptionHistory[i][0].replace(/\.htm/,"")+"^"+objCourse[strCourseID].objInterruptionHistory[i][1];
			if (i == (objCourse[strCourseID].objInterruptionHistory.length - 1))
				strTrackingData += "#";
			else
				strTrackingData += "~";
		}
	}

	if (objCourse[strCourseID].objPostitHistory != null)
	{
		strTrackingData += "8~";
		for (var i=0; i<objCourse[strCourseID].objPostitHistory.length; i++)
		{
			strTrackingData += objCourse[strCourseID].objPostitHistory[i][0].replace(/\.htm/,"")+"^"+objCourse[strCourseID].objPostitHistory[i][1];
			if (i == (objCourse[strCourseID].objPostitHistory.length - 1))
				strTrackingData += "#";
			else
				strTrackingData += "~";
		}
	}

	if (objCourse[strCourseID].objMeetingHistory != null)
	{
		strTrackingData += "9~";
		for (var i=0; i<objCourse[strCourseID].objMeetingHistorylength; i++)
		{
			strTrackingData += objCourse[strCourseID].objMeetingHistory[i][0].replace(/\.htm/,"")+"^"+objCourse[strCourseID].objMeetingHistory[i][1];
			if (i == (objCourse[strCourseID].objMeetingHistory.length - 1))
				strTrackingData += "#";
			else
				strTrackingData += "~";
		}
	}

	if (objCourse[strCourseID].objWordHistory != null)
	{
		strTrackingData += "10~";
		for (var i=0; i<objCourse[strCourseID].objWordHistory.length; i++)
		{
			strTrackingData += objCourse[strCourseID].objWordHistory[i];
			if (i == (objCourse[strCourseID].objWordHistory.length - 1))
				strTrackingData += "#";
			else
				strTrackingData += "~";
		}
	}

	if (objCourse[strCourseID].objExcelHistory != null)
	{
		strTrackingData += "11~";
		for (var i=0; i<objCourse[strCourseID].objExcelHistory.length; i++)
		{
			strTrackingData += objCourse[strCourseID].objExcelHistory[i];
			if (i == (objCourse[strCourseID].objExcelHistory.length - 1))
				strTrackingData += "#";
			else
				strTrackingData += "~";
		}
	}

	if (objCourse[strCourseID].objPowerpointHistory != null)
	{
		strTrackingData += "12~";
		for (var i=0; i<objCourse[strCourseID].objPowerpointHistory.length; i++)
		{
			strTrackingData += objCourse[strCourseID].objPowerpointHistory[i];
			if (i == (objCourse[strCourseID].objPowerpointHistorylength - 1))
				strTrackingData += "#";
			else
				strTrackingData += "~";
		}
	}

	if (objCourse[strCourseID].objAccessHistory != null)
	{
		strTrackingData += "13~";
		for (var i=0; i<objCourse[strCourseID].objAccessHistory.length; i++)
		{
			strTrackingData += objCourse[strCourseID].objAccessHistory[i];
			if (i == (objCourse[strCourseID].objAccessHistory.length - 1))
				strTrackingData += "#";
			else
				strTrackingData += "~";
		}
	}

	strTrackingData += "*";

	// adding user bookmarks
	if (objCourse[strCourseID].objBookmarks != null)
	{
		for (var i in objCourse[strCourseID].objBookmarks)
		{
			if (objCourse[strCourseID].objBookmarks[i] != null)
				strTrackingData += i+"^"+objCourse[strCourseID].objBookmarks[i]+"#";
		}
	}

	strTrackingData += "*";

	// adding on exit bookmark
	if ((objCurrentState.objUnit != null) && (!objCurrentState.objUnit.booAssessment))
	{
		strTrackingData += objCurrentState.objUnit.strID+":"+objCurrentState.objUnit.intCurrentPage;
	}

	strTrackingData += "*";

	if ((objCourse[strCourseID].intState == COMPLETED) || (_strPassed == "True"))
	{
		if ((strStartDate == null) && (strEndDate == null))
		{
			strStartDate = _strCurrentStartDate;
			strEndDate = _strCurrentEndDate;
		}
		else if ((strStartDate != null) && (strEndDate == null))
		{
			strEndDate = _strCurrentEndDate;
		}
		else
		{
			_objTemp1 = strStartDate.split("/");
			_objTemp2 = strEndDate.split("/");
			if (new Date(_objTemp1[2],(_objTemp1[1]-1),_objTemp1[0]) < new Date(_objTemp2[2],(_objTemp2[1]-1),_objTemp2[0]))
				strStartDate = _strCurrentStartDate;

			if (_strAssessmentDate)
				_objTemp1 = _strAssessmentDate.split("/");
			if (new Date(_objTemp2[2],(_objTemp2[1]-1),_objTemp2[0]) < new Date(_objTemp1[2],(_objTemp1[1]-1),_objTemp1[0]))
				strEndDate = _strCurrentEndDate;
		}
	}
	else
	{
		if (strStartDate == null)
			strStartDate = _strCurrentStartDate;
	}

	if (strStartDate != null)
		formatTrackingStartDate();
	if (strEndDate != null)
		formatTrackingEndDate();

	strTrackingData += strStartDate+"^"+strEndDate+"^"+strUserName;
}

function formatTrackingStartDate()
{
	var _arrTimeSplit = strStartDate.split("/");
	var _objTemp = new Date(_arrTimeSplit[2],(_arrTimeSplit[1]-1),_arrTimeSplit[0]);

	strTrackingStartDate = _objTemp.getDate() + "-" + objMonthArray[_objTemp.getMonth()] + "-" + _objTemp.getFullYear();
}

function formatTrackingEndDate()
{
	var _arrTimeSplit = strEndDate.split("/");
	var _objTemp = new Date(_arrTimeSplit[2],(_arrTimeSplit[1]-1),_arrTimeSplit[0]);

	strTrackingEndDate = _objTemp.getDate() + "-" + objMonthArray[_objTemp.getMonth()] + "-" + _objTemp.getFullYear();
}

function saveLMSData()
{
	var _intTotalTimeSpent;
	var _strSessionTime;
	var _intHour = 0;
	var _intMins = 0;
	var _intSecs = 0;

	var _objCourseEndTime = new Date().getTime();
	_intTotalTimeSpent = _objCourseEndTime - objCourseStartTime;

	generateTrackingData();

//	_intTotalTimeSpent = 3600000;
	while (_intTotalTimeSpent >= 3600000)
	{
		_intTotalTimeSpent = _intTotalTimeSpent - 3600000;
		_intHour++;
	}

	while (_intTotalTimeSpent >= 60000)
	{
		_intTotalTimeSpent = _intTotalTimeSpent - 60000;
		_intMins++;
	}

	while (_intTotalTimeSpent >= 1000)
	{
		_intTotalTimeSpent = _intTotalTimeSpent - 1000;
		_intSecs++;
	}

	if (_intHour < 10)
		_intHour = new String("000"+_intHour);
	else if (_intHour < 100)
		_intHour = new String("00"+_intHour);
	else if (_intHour < 1000)
		_intHour = new String("0"+_intHour);

	if (_intMins < 10)
		_intMins = new String("0"+_intMins);

	if (_intSecs < 10)
		_intSecs = new String("0"+_intSecs)

	_strSessionTime = _intHour+":"+_intMins+":"+_intSecs;

	
	top.window.opener.setValue("cmi.core.session_time", _strSessionTime);
	top.window.opener.setValue("cmi.suspend_data", strTrackingData);

	for (var i=0; i<objCourse[strCourseID].objChilds.length; i++)
	{
		if (objCourse[strCourseID].objChilds[i].booAssessment)
		{
			
			if (objCourse[strCourseID].objChilds[i].intScore != null)
			{				
				window.opener.setValue("cmi.core.score.raw", parseInt((objCourse[strCourseID].objChilds[i].intScore/objCourse[strCourseID].objChilds[i].intMaxScore)*100));
			}
		}
	}

	if (objCourse[strCourseID].intState == COMPLETED)
	{
		window.opener.setValue("cmi.core.lesson_status","completed");
	}
	else
	{
		window.opener.setValue("cmi.core.lesson_status","incomplete");
	}
	
	window.opener.finishLMS();
}

function retrieveTrackingData()
{
	var _strStatusData;
	var _strCommsData;
	var _strBookmarkData;
	var _strRevisitData;
	var _objCurrentUnit;
	var _arrTemp;
	var _arrTemp2;

	if (!booLMSPresent)
		strTrackingData = unescape(getCookie(strCourseID));

	if ((strTrackingData != "null") && (strTrackingData != null))
	{
		strTrackingData = strTrackingData.split("*");
		_strStatusData = strTrackingData[0];
		_strStatusData = _strStatusData.split("#");
		for (var i=0; i<_strStatusData.length; i++)
		{
			_objCurrentUnit = objCourse[strCourseID].objChilds[i];
			_arrTemp = _strStatusData[i].split("|");
			if (_arrTemp[1].length > 0)
			{
				_arrTemp2 = _arrTemp[0].split(":");
				_objCurrentUnit.intState = _arrTemp2[1]*1;
				_objCurrentUnit.objPreviousNavStatus = _arrTemp2[2];
				_arrTemp = _arrTemp[1].split(";");

				_objCurrentUnit.objTaskStatusArray = new Array();
				if (!_objCurrentUnit.booAssessment)
				{
					for (var j=0; j<_arrTemp.length; j++)
					{
						_arrTemp2 = _arrTemp[j].split(":");
						_objCurrentUnit.objTaskStatusArray[j] = new Array();
						_objCurrentUnit.objTaskStatusArray[j][0] = _arrTemp2[0];
						_objCurrentUnit.objTaskStatusArray[j][1] = _arrTemp2[1]*1;
						if ((_objCurrentUnit.objTaskQSArray != null) && (_objCurrentUnit.objTaskQSArray[_arrTemp2[0]]))
							_objCurrentUnit.objTaskQSArray[_arrTemp2[0]][0] = _arrTemp2[2]*1;
					}
				}
				else
				{
					for (var j=0; j<(_arrTemp.length-1); j++)
					{
						_arrTemp2 = _arrTemp[j].split(":");
						_objCurrentUnit.objTaskStatusArray[j] = new Array();
						_objCurrentUnit.objTaskStatusArray[j][0] = _arrTemp2[0];
						_objCurrentUnit.objTaskStatusArray[j][1] = _arrTemp2[1]*1;
					}

					_arrTemp2 = _arrTemp[(_arrTemp.length-1)].split(":");
					if (_arrTemp2[0].length > 0)
					{
						_objCurrentUnit.strAssessmentDate = _arrTemp2[0];
						_objCurrentUnit.intScore = _arrTemp2[1]*1;
						_objCurrentUnit.intMaxScore = _arrTemp2[2]*1;
					}
				}
			}
		}

		_strCommsData = strTrackingData[1];
		if (_strCommsData.length > 0)
			retrieveComms(_strCommsData);

		_strBookmarkData = strTrackingData[2];
		if (_strBookmarkData.length > 0)
			retrieveBookmarks(_strBookmarkData);

		_strRevisitData = strTrackingData[3];
		if (_strRevisitData.length > 0)
			objRivisitArray = _strRevisitData.split(":");

		if (strTrackingData.length == 5)
		{
			_arrTemp = strTrackingData[4].split("^");
			if (_arrTemp[0] != "null")
				strStartDate = _arrTemp[0];
			if (_arrTemp[1] != "null")
				strEndDate = _arrTemp[1];

			if (_arrTemp.length == 3)
			{
				if ((_arrTemp[2] != null) && (_arrTemp[2] != "null") && (_arrTemp[2] != ""))
				{
					strUserName = _arrTemp[2];
					booNameEntered = true;
				}
			}
		}

		strTrackingData = "";
	}
}

function retrieveComms(_strCommString)
{

	_strCommString = _strCommString.split("#");
	for (var i=0; i<(_strCommString.length-1); i++)
	{
		_strTemp = _strCommString[i].split("~");
		for (var j=1; j<_strTemp.length; j++)
		{
			if (_strTemp[j].indexOf("^",0) != -1)
			{
				_strTemp2 = _strTemp[j].split("^");
				strCurrentCommPage = _strTemp2[0]+".htm";
			}
			else
			{
				_strTemp2 = _strTemp[j];
			}

			switch (_strTemp[0])
			{
			case "1": // Email
				insertEmailHistory(_strTemp2[1],_strTemp2[2],_strTemp2[3]);
				break;
			case "2": // Fax
				insertFaxHistory(_strTemp2[1]);
				break;
			case "3": // Post
				insertPostHistory(_strTemp2[1]);
				break;
			case "4": // Memo
				insertMemoHistory(_strTemp2[1]);
				break;
			case "5": // Phone
				insertPhoneHistory(_strTemp2[1]);
				break;
			case "6": // Voicemail
				insertVoicemailHistory(_strTemp2[1]);
				break;
			case "7": // Interruption
				insertInterruptionHistory(_strTemp2[1]);
				break;
			case "8": // Postit
				insertPostitHistory(_strTemp2[1]);
				break;
			case "9": // Meeting
				insertMeetingHistory(_strTemp2[1]);
				break;
			case "10": // word
				insertDocuments(_strTemp2+'.doc');
				break;
			case "11": // excel
				insertDocuments(_strTemp2+'.xls');
				break;
			case "12": // powerpoint
				insertDocuments(_strTemp2+'.ppt');
				break;
			case "13": // access
				insertDocuments(_strTemp2+'.mdb');
				break;
			default:
				break;
			}
		}
	}

	strCurrentCommPage = null;
}

function retrieveBookmarks(_strBookmark)
{
	_strBookmark = _strBookmark.split("#");
	objCourse[strCourseID].objBookmarks = new Array();
	for (var i=0; i<(_strBookmark.length-1); i++)
	{
		_strTemp = _strBookmark[i].split("^");
		objCourse[strCourseID].objBookmarks[_strTemp[0]] = _strTemp[1];
		objCourse[strCourseID].intBookmarksCount++;
	}
}

/***** END OF TRACKING FUNCTIONS *****/

/***** START OF UNIT TITLE FUNCTIONS *****/
var strKeyword = null;
var objKeywordWin = null;
var objBookmarkWin = null;
var objQuickfindWin = null;

function viewBookmarks()
{
	if (objBookmarkWin != null)
	{
		if (!objBookmarkWin.closed)
			objBookmarkWin.close();

		objBookmarkWin = null;
	}

	objBookmarkWin = window.open(strBaseURL + "generichtm/bookmarks.htm","bookmarksWin","width=630,height=485,left=" + ((screen.width - 630) / 2) + ",top="+ ((screen.height - 485) / 2) + ",toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no,fullscreen=no");

	setTimeout("objBookmarkWin.focus()",0);
}

function goBookmarkPage(strPageID)
{
	findUnit(objCourse[strCourseID], strPageID);
	objUnitRef.booFromBookmark = true;
	objUnitRef.strPageJump = strPageID;
	goUnit(strCourseID + "_" + objUnitRef.strID);
}

function launchQuickfind()
{
	if (objQuickfindWin != null)
	{
		if (!objQuickfindWin.closed)
			objQuickfindWin.close();

		objQuickfindWin = null;
	}

	objCourse[strCourseID].checkStatus();
	objQuickfindWin = window.open(strBaseURL + strCourseID + "/quickfind.htm","quickfindWindow","width=773,height=485,left=" + ((screen.width - 773) / 2) + ",top=" + (((screen.height - 485) / 2) + 25) + ",toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no,fullscreen=no");

	setTimeout("objQuickfindWin.focus()",0);
}

function retrieveKeywords()
{
	var _strHTML = "<form name=\"kwForm\" onsubmit=\"return false\">\n" +
				"<select name=\"kwOptions\" style=\"width:162\" onchange=\"keywordSelected()\">\n" +
				"<option value=\"\"></option>\n";

	for (var i in objKeywordData)
	{
		_strHTML += "<option value=\""+i+"\">"+i+"</option>\n";
	}

	_strHTML += "</select>\n</form>\n";

	return _strHTML;
}

function keywordSelected( _objFormOption )
{
	if (_objFormOption.options[_objFormOption.selectedIndex].value != "")
	{
		strKeyword = _objFormOption.options[_objFormOption.selectedIndex].value;
		keywordResult();
	}
	else
	{
		strKeyword = null;
	}
}

function keywordResult()
{
	if (objKeywordWin != null)
	{
		if (!objKeywordWin.closed)
			objKeywordWin.close();

		objKeywordWin = null;
	}

	objKeywordWin = window.open(strBaseURL + "generichtm/keyword.htm","keywordWin","width=630,height=485,left=" + ((screen.width - 630) / 2) + ",top=" + ((screen.height - 485) / 2) + ",toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no,fullscreen=no");

	setTimeout("objKeywordWin.focus()",0);
}
/***** END OF UNIT TITLE FUNCTIONS *****/

var objDownloadWin = null;
function downloadModule()
{
	if (objDownloadWin != null)
	{
		if (!objDownloadWin.closed)
			objDownloadWin.close();

		objDownloadWin = null;
	}

	objDownloadWin = window.open(strBaseURL + "generichtm/moduledownload.htm","downloadWin","width=600,height=450,left=" + ((screen.width - 600) / 2) + ",top=" + (((screen.height - 450) / 2) + 25) + ",toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no,fullscreen=no");
}


/***** START OF TOOLS AND COMMS FUNCTIONS *****/

var intCommsViewed = 0;
var intCommsTotal = 0;
var objCalcWin = null;
var strCoachMeID = null;
var objCoachMeWin = null;
var strCaseStudyID = null;
var objCaseStudyWin = null;
var strBackgroundID = null;
var objBackgroundWin = null;
var objRefWin = null;


function launchBackground()
{
	var strProperties = "width=630,height=485,left=" + ((screen.width - 630) / 2) + ",top=" + ((screen.height - 485) / 2) + ",toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no,fullscreen=no";

	if (objBackgroundWin != null)
	{
		if (!objBackgroundWin.closed)
			objBackgroundWin.close();

		objBackgroundWin = null;
	}

	if (booFromQuickFind)
		objBackgroundWin = window.open(strBaseURL + "background/" + strCourseID + "/" + strBackgroundID + "/index.htm","backgroundWindow",strProperties);
	else
		objBackgroundWin = window.open(strBaseURL + "background/" + objCurrentState.objUnit.strBackgroundID.replace(/_/,"/") + "/index.htm","backgroundWindow",strProperties);

	setTimeout("objBackgroundWin.focus()",0);
}

function launchIntoCoachMe(_strID)
{
	strCoachMeID = _strID;
	launchCoachMe();
}

function launchCoachMe()
{
	if (objCoachMeWin != null)
	{
		if (!objCoachMeWin.closed)
			objCoachMeWin.close();

		objCoachMeWin = null;
	}

	objCoachMeWin = window.open(strBaseURL + "coachme/" + strCourseID + "/index.htm","CoachMeWindow","width=773,height=485,left=" + ((screen.width - 773) / 2) + ",top=" + (((screen.height - 485) / 2) + 25) + ",toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no,fullscreen=no");

	setTimeout("objCoachMeWin.focus()",0);
}

function launchCaseStudy()
{
	if (objCaseStudyWin != null)
	{
		if (!objCaseStudyWin.closed)
			objCaseStudyWin.close();

		objCaseStudyWin = null;
	}

	objCaseStudyWin = window.open(strBaseURL + "casestudies/" + strCourseID + "/index.htm","CaseStudyWindow","width=773,height=485,left=" + ((screen.width - 773) / 2) + ",top=" + (((screen.height - 485) / 2) + 25) + ",toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no,fullscreen=no");

	setTimeout("objCaseStudyWin.focus()",0);
}

function launchRef()
{
	booBackToRef = false;
	if (objRefWin != null)
	{
		if (!objRefWin.closed)
			objRefWin.close();

		objRefWin = null;
	}

	objRefWin = window.open(strBaseURL + "generichtm/refindex.htm","refWindow","width=633,height=485,left="+ ((screen.width - 633) / 2) + ",top=" + ((screen.height - 485) / 2) + ",toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no,fullscreen=no");

	setTimeout("objRefWin.focus()",0);
}

function launchCalc()
{
	if (objCalcWin != null)
	{
		if (!objCalcWin.closed)
			objCalcWin.close();

		objCalcWin = null;
	}

	objCalcWin = window.open(strBaseURL + "generichtm/calculator.htm","calcWindow","width=176,height=201,left=" + ((screen.width - 176) / 2) + ",top=" + ((screen.height - 201) / 2) + ",toolbar=no,menubar=no,status=no,scrollbars=no,resizable=yes,fullscreen=no");

	setTimeout("objCalcWin.focus()",0);
}


function unlockQuestion()
{
	objMainAreaFrame.objContentFrame.enableQuestion();
}

/***** END OF TOOLS AND COMMS FUNCTIONS *****/

/***** START OF COMMS FUNCTIONS *****/

var objCommWin = null;
var strCurrentCommPage;

function jumpToComm(_strCommType, _strCommPage)
{
	strCurrentCommPage = _strCommPage;
	if (objCommWin != null)
	{
		if (!objCommWin.closed)
			objCommWin.close();

		objCommWin = null;
	}

	objCommWin = window.open(strBaseURL + "comms/" + _strCommType + "/index.htm","commWin","width=633,height=485,left=" + ((screen.width - 633) / 2) + ",top=" + ((screen.height - 485) / 2) + ",toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no,fullscreen=no");

	setTimeout("objCommWin.focus()",0);
}

function insertEmailHistory(_strFrom, _strSubject, _strAttachment)
{
	if (strCurrentCommPage.indexOf(strCourseID, 0) != -1)
	{
		if (objCourse[strCourseID].objEmailHistory == null)
			objCourse[strCourseID].objEmailHistory = new Array();

		objCourse[strCourseID].objEmailHistory[objCourse[strCourseID].objEmailHistory.length] = new Array(strCurrentCommPage, _strFrom, _strSubject, _strAttachment);
	}
}

function insertFaxHistory(_strSubject)
{
	if (strCurrentCommPage.indexOf(strCourseID, 0) != -1)
	{
		if (objCourse[strCourseID].objFaxHistory == null)
			objCourse[strCourseID].objFaxHistory = new Array();

		objCourse[strCourseID].objFaxHistory[objCourse[strCourseID].objFaxHistory.length] = new Array(strCurrentCommPage, _strSubject);
	}
}

function insertInterruptionHistory(_strSubject)
{
	if (strCurrentCommPage.indexOf(strCourseID, 0) != -1)
	{
		if (objCourse[strCourseID].objInterruptionHistory == null)
			objCourse[strCourseID].objInterruptionHistory = new Array();

		objCourse[strCourseID].objInterruptionHistory[objCourse[strCourseID].objInterruptionHistory.length] = new Array(strCurrentCommPage, _strSubject);
	}
}

function insertMeetingHistory(_strSubject)
{
	if (strCurrentCommPage.indexOf(strCourseID, 0) != -1)
	{
		if (objCourse[strCourseID].objMeetingHistory == null)
			objCourse[strCourseID].objMeetingHistory = new Array();

		objCourse[strCourseID].objMeetingHistory[objCourse[strCourseID].objMeetingHistory.length] = new Array(strCurrentCommPage, _strSubject);
	}
}

function insertMemoHistory(_strSubject)
{
	if (strCurrentCommPage.indexOf(strCourseID, 0) != -1)
	{
		if (objCourse[strCourseID].objMemoHistory == null)
			objCourse[strCourseID].objMemoHistory = new Array();

		objCourse[strCourseID].objMemoHistory[objCourse[strCourseID].objMemoHistory.length] = new Array(strCurrentCommPage, _strSubject);
	}
}

function insertPhoneHistory(_strSubject)
{
	if (strCurrentCommPage.indexOf(strCourseID, 0) != -1)
	{
		if (objCourse[strCourseID].objPhoneHistory == null)
			objCourse[strCourseID].objPhoneHistory = new Array();

		objCourse[strCourseID].objPhoneHistory[objCourse[strCourseID].objPhoneHistory.length] = new Array(strCurrentCommPage, _strSubject);
	}
}

function insertVoicemailHistory(_strSubject)
{
	if (strCurrentCommPage.indexOf(strCourseID, 0) != -1)
	{
		if (objCourse[strCourseID].objVoicemailHistory == null)
			objCourse[strCourseID].objVoicemailHistory = new Array();

		objCourse[strCourseID].objVoicemailHistory[objCourse[strCourseID].objVoicemailHistory.length] = new Array(strCurrentCommPage, _strSubject);
	}
}

function insertPostHistory(_strSubject)
{
	if (strCurrentCommPage.indexOf(strCourseID,0) != -1)
	{
		if (objCourse[strCourseID].objPostHistory == null)
			objCourse[strCourseID].objPostHistory = new Array();

		objCourse[strCourseID].objPostHistory[objCourse[strCourseID].objPostHistory.length] = new Array(strCurrentCommPage, _strSubject);
	}
}

function insertPostitHistory(_strSubject)
{
	if (strCurrentCommPage.indexOf(strCourseID,0) != -1)
	{
		if (objCourse[strCourseID].objPostitHistory == null)
			objCourse[strCourseID].objPostitHistory = new Array();

		objCourse[strCourseID].objPostitHistory[objCourse[strCourseID].objPostitHistory.length] = new Array(strCurrentCommPage, _strSubject);
	}
}

/***** END OF COMMS FUNCTIONS *****/

/***** START OF REFERENCE FUNCTIONS *****/

var strCurrentResource = null;
var objResourceWin = null;
var objGlossaryWin = null;
var strKeywordPage = null;


function launchResource(_strID)
{
	strCurrentResource = _strID;
	if (objResourceWin != null)
	{
		if (!objResourceWin.closed)
			objResourceWin.close();

		objResourceWin = null;
	}
	objResourceWin = window.open(strBaseURL + "resource/" + _strID.replace(/_/,"/") + "/index.htm","resourceWindow","width=633,height=485,left=" + ((screen.width - 633) / 2) + ",top=" + ((screen.height - 485) / 2) + ",toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no,fullscreen=no");

	setTimeout("objResourceWin.focus()",0);
}

function launchGlossary()
{
	if (objGlossaryWin != null)
	{
		if (!objGlossaryWin.closed)
			objGlossaryWin.close();

		objGlossaryWin = null;
	}
	objGlossaryWin = window.open(strBaseURL + strCourseID + "/glossary.htm","glossaryWindow","width=633,height=485,left=" + ((screen.width - 633) / 2) + ",top=" + ((screen.height - 485) / 2) + ",toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no,fullscreen=no");

	setTimeout("objGlossaryWin.focus()",0);
}

/***** END OF REFERENCE FUNCTIONS *****/

var intDocsTotal = 0;
var intDocsViewed = 0;

function openDocument(_strFileName)
{
	var _strDocLocation = strBaseURL + "units/" + strCourseID + "/documents/" + _strFileName;

	if (_strFileName.indexOf("blank.",0) == -1)
		insertDocuments(_strFileName);

	window.open(_strDocLocation, "docWin", "width=800,height=600,left=0,top=0,toolbar=yes,menubar=yes,status=yes,scrollbars=yes,resizable=yes,fullscreen=no");
}

function insertDocType(_objDocType, _strFileName)
{
	var _booFound = false;
	for (var i=0; i<_objDocType.length; i++)
	{
		if (_objDocType[i] == _strFileName)
		{
			_booFound = true;
			break;
		}
	}

	if (!_booFound)
		_objDocType[_objDocType.length] = _strFileName;

}

function insertDocuments(_strFileName)
{
	if (_strFileName.toLowerCase().indexOf(".doc",0) != -1)
	{
		if (objCourse[strCourseID].objWordHistory == null)
			objCourse[strCourseID].objWordHistory = new Array();
		_strFileName = _strFileName.replace(/\.doc/,"");
		insertDocType(objCourse[strCourseID].objWordHistory,_strFileName);
	}
	else if (_strFileName.toLowerCase().indexOf(".xls",0) != -1)
	{
		if (objCourse[strCourseID].objExcelHistory == null)
			objCourse[strCourseID].objExcelHistory = new Array();
		_strFileName = _strFileName.replace(/\.xls/,"");
		insertDocType(objCourse[strCourseID].objExcelHistory,_strFileName);
	}
	else if (_strFileName.toLowerCase().indexOf(".ppt",0) != -1)
	{
		if (objCourse[strCourseID].objPowerpointHistory == null)
			objCourse[strCourseID].objPowerpointHistory = new Array();
		_strFileName = _strFileName.replace(/\.ppt/,"");
		insertDocType(objCourse[strCourseID].objPowerpointHistory,_strFileName);
	}
	else if (_strFileName.toLowerCase().indexOf(".mdb",0) != -1)
	{
		if (objCourse[strCourseID].objAccessHistory == null)
			objCourse[strCourseID].objAccessHistory = new Array();
		_strFileName = _strFileName.replace(/\.mdb/,"");
		insertDocType(objCourse[strCourseID].objAccessHistory,_strFileName);
	}
}

function openURL(_strLinkURL) {
	window.open(_strLinkURL,"linkWin","width=800,height=600,left=0,top=0,toolbar=yes,menubar=yes,status=yes,scrollbars=yes,resizable=yes,fullscreen=no");
}

var objPrintWhichFrame;

function printPage()
{
	objPrintWhichFrame = window["mainArea"].window["content"];
	window["printFrame"].document.location = strBaseURL + "generichtm/print.htm";
}

function loadActionPlanner()
{
	var _strAppVersionDetails = navigator.appVersion.split(";");
	var _intOPVersionNum;
	var _intAppVersionNum;
	var _booVista = false;
	var _booCompatible = true;

	for (var i=0; i<_strAppVersionDetails.length; i++)
	{
		if (_strAppVersionDetails[i].toLowerCase().indexOf("windows nt",0) != -1)
		{
			_intOPVersionNum = _strAppVersionDetails[i].toLowerCase().split("windows nt")[1] * 1;
			if (_intOPVersionNum >= 6)
			{
				_booVista = true;
			}
		}

		if (_strAppVersionDetails[i].toLowerCase().indexOf("msie") != -1)
		{
			_intAppVersionNum = _strAppVersionDetails[i].toLowerCase().split("msie")[1].replace(/ /g,"") * 1;
			if (_intAppVersionNum > 6)
			{
				_booCompatible = false;
			}
		}
	}

	if (!_booCompatible)
	{
		objHiddenFrame.location = strBaseURL + "generichtm/actionplanner/notcompatibleactionplanner.htm";
	}
	else
	{
		//Check if IE
		if(navigator.appName == 'Microsoft Internet Explorer')
		{
			objHiddenFrame.location = strBaseURL + "generichtm/actionplanner/notcompatibleactionplanner.htm";
		}
		//Anything else
		else
		{
			objHiddenFrame.location = strBaseURL + "generichtm/actionplanner/actionplanner.htm";
		}
	}
}

function closePoupWindows()
{
	if ((objKeywordWin != null) && (!objKeywordWin.closed)) {
		objKeywordWin.close();
	}
	if ((objBookmarkWin != null) && (!objBookmarkWin.closed)) {
		objBookmarkWin.close();
	}
	if ((objQuickfindWin != null) && (!objQuickfindWin.closed)) {
		objQuickfindWin.close();
	}
	if ((objCoachMeWin != null) && (!objCoachMeWin.closed)) {
		objCoachMeWin.close();
	}
	if ((objCalcWin != null) && (!objCalcWin.closed)) {
		objCalcWin.close();
	}
	if ((objCaseStudyWin != null) && (!objCaseStudyWin.closed)) {
		objCaseStudyWin.close();
	}
	if ((objBackgroundWin != null) && (!objBackgroundWin.closed)) {
		objBackgroundWin.close();
	}
	if ((objRefWin != null) && (!objRefWin.closed)) {
		objRefWin.close();
	}
	if ((objCommWin != null) && (!objCommWin.closed)) {
		objCommWin.close();
	}
	if ((objResourceWin != null) && (!objResourceWin.closed)) {
		objResourceWin.close();
	}
	if ((objGlossaryWin != null) && (!objGlossaryWin.closed)) {
		objGlossaryWin.close();
	}
}

function exit()
{
	if (confirm(objGenericText["exitprompt"]))
	{
		closePoupWindows();
		//alert("DEBUG::exit(): 1")
		booExitClicked = true;
		if (!booLMSPresent)
		{
			//alert("DEBUG::exit(): 2")
			saveTrackingData();
			window.close();
		}
		else
		{
			//alert("DEBUG::exit(): 3")
			saveLMSData();
			setTimeout("window.close()",500);
		}
	}
}


function checkCertAtEnd()
{
	for (var i=0; i<objCourse[strCourseID].objChilds.length; i++)
	{
		if ((objCourse[strCourseID].objChilds[i].booAssessment) && (objCourse[strCourseID].objChilds[i].strAssessmentDate != null))
		{
			intPercentage = parseInt((objCourse[strCourseID].objChilds[i].intScore/objCourse[strCourseID].objChilds[i].intMaxScore) * 100);
			if ((intPercentage != null) && (intPercentage >= objCourse[strCourseID].objChilds[i].intPassRate))
				printCertificate();
			break;
		}
	}
}

function printCertificate()
{
	var _strAppVersionDetails = navigator.appVersion;
	var _booAllowPrint = false;
	if (!booNameEntered)
	{
		if (_strAppVersionDetails.toLowerCase().indexOf("msie") != -1)
		{
			strUserName = window.showModalDialog(strBaseURL + "generichtm/entername.htm",null,"center:yes; resizable:no; scroll:off; status:off; dialogHeight:120px; dialogWidth:320px");
			strUserName = String(strUserName);
			if ((strUserName != "undefined") && (strUserName.replace(/ /g,"") != ""))
			{
				if (strUserName != "cancelled")
				{
					booNameEntered = true;
				}
			}
			else
			{
				printCertificate();
			}
		}
		else
		{
			strUserName = window.prompt("Please enter your name.","");
			if ((strUserName == '') || (strUserName.replace(/ /g,"") == ""))
			{
				printCertificate();
			}
			else
			{
				booNameEntered = true;
			}
		}
	}

	if (booNameEntered)
		window["hidden"].document.location = strBaseURL + "generichtm/cert.htm";
}

function printCert()
{
	window["hidden"].focus();
	window["hidden"].print();
}
