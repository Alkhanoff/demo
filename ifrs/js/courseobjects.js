// constant to define whether the object is a BLOCK or a UNIT
var BLOCK = 0;
var UNIT = 1;

// constant to define the BLOCK and UNIT status
var NOTSTARTED = 0;
var STARTED = 1;
var COMPLETED = 2;

// constant to define the type of unit
var PRESENTATION = 0;
var ASSESSMENT = 1;

var strCourseID = null;
var objCourse = null; // reference to the course object (blockObj)
var objCurrentState = null; // reference to the currentStateObj
var objUnitRef = null; // used in the findUnit function to reference the unit that's searching for

//
// Start of object definition
//

function blockObj(_strID, _objParent, _strTitle)
{
	this.strID = _strID;
	this.objParent = _objParent;
	this.strTitle = _strTitle;
	this.intType = BLOCK;
	this.intState = NOTSTARTED;
	this.strOpenInputData = null;
	this.objCoachMeTitles = new Array();
	this.objCaseStudyTitles = new Array();
	this.objBookmarks = null;
	this.intBookmarksCount = 0;

	this.objEmailHistory = null;
	this.objFaxHistory = null;
	this.objPostHistory = null;
	this.objMemoHistory = null;
	this.objPhoneHistory = null;
	this.objVoicemailHistory = null;
	this.objInterruptionHistory = null;
	this.objPostitHistory = null;
	this.objMeetingHistory = null;
	this.objWordHistory = null;
	this.objExcelHistory = null;
	this.objPowerpointHistory = null;
	this.objAccessHistory = null;

	this.objChilds = null;

	this.removeBookmark = _removeBookmark;
	this.checkStatus = _checkBlockStatus;
}

function unitObj(_strID, _objParent, _strTitle)
{
	this.strID = _strID;
	this.objParent = _objParent;
	this.strTitle = _strTitle;
	this.intType = UNIT;
	this.intState = NOTSTARTED;
	this.URL;
	this.booFromBookmark = false;
	this.strPageJump = null;

	this.strInputBuildData = null;
	this.booOnTaskQuestion = false;
	this.booDoCoachMeCheck = false;
	this.intCurrentPage = 0;

	this.intTaskStatusIndex = 0;
	this.strCurrentTaskID = null;

	this.booAssessment = false;
	this.strAssessmentDate = null;
	this.objScoreArray = null;
	this.intMaxScore = null;
	this.intScore = null;
	this.intPercentage = null;
	this.booPassed = false;
	this.intPassRate;

	this.intUnitType = PRESENTATION;
	this.intCurrentType = PRESENTATION;

	this.objNavArray = null;
	this.objTaskQSArray = null;
	this.objTaskStatusArray = null;
	this.objPreviousNavStatus = null;
//	this.statusArray = null;

	this.strBackgroundID = null;
	this.objResources = null;
	this.objCoachMes = null;
	this.objCaseStudies = null;

	// unit functions
	this.setupUnit = _setupUnit;
	this.checkStatus = _checkUnitStatus;
	this.endOfTask = _endOfTask;
	this.setTaskStatus = _setTaskStatus;

	this.checkNav = _checkNav;
	this.menu = _goMenu;
	this.back = _goBack;
	this.next = _goNext;

	this.setTaskID = _setTaskID;
	this.checkTaskQDone = _checkTaskQDone;
	this.setTaskQComplete = _setTaskQComplete;
	this.setTaskStatusArray = _setTaskStatusArray;

	this.startAssessment = _startAssessment;
	this.endAssessment = _endAssessment;
	this.incMaxScore = _incMaxScore;
	this.calcMaxScore = _calcMaxScore;
	this.getMaxScore = _getMaxScore;
	this.addScore = _addScore;
	this.getScore = _getScore;
	this.getPercentage = _getPercentage;
	this.getFeedback = _getFeedback;

	this.retrieveOIData = _retrieveOIData;
	this.saveOIData = _saveOIData;

	this.bookmarkPage = _bookmarkPage;

	this.showPageNum = _showPageNum;
}

function currentStateObj()
{
	this.objUnit = null;
}

//
// Start of object functions
//

function _checkBlockStatus()
{
	var _intBlocksStarted = 0;
	var _intBlocksCompleted = 0;

	if (this.objChilds != null)
	{
		for (var i=0; i<this.objChilds.length; i++)
		{
			this.objChilds[i].checkStatus();

			if (this.objChilds[i].intState == STARTED)
				_intBlocksStarted++;
	
			if (this.objChilds[i].intState == COMPLETED)
				_intBlocksCompleted++;
		}

		if ((_intBlocksStarted == 0) && (_intBlocksCompleted == 0))
			this.intState = NOTSTARTED;
		else if (_intBlocksCompleted == this.objChilds.length)
			this.intState = COMPLETED;
		else
			this.intState = STARTED;
	}
}

function _checkUnitStatus()
{
	var _intStateCounter = 0;

	if ((this.objNavArray != null) && (this.intState != COMPLETED))
	{
		for (var i=0; i<this.objNavArray.length; i++)
		{
			if (this.objNavArray[i][1] == VISITED)
				_intStateCounter++;
		}

		if (this.intUnitType == PRESENTATION)
		{
			if (_intStateCounter == this.objNavArray.length)
				this.intState = COMPLETED;
			else if (_intStateCounter > 0)
				this.intState = STARTED;
		}
	}
}

function _startAssessment()
{
}

function _endAssessment()
{
	var _objDate = new Date();

	if (this.getPercentage() >= this.intPassRate)
	{
		this.booPassed = true;
	}
	else
	{
		this.booPassed = false;
	}
	this.strAssessmentDate = _objDate.getDate()+"/"+(_objDate.getMonth()+1)+"/"+_objDate.getFullYear();
	
}

function _getFeedback()
{
	var _objTempArray = new Array();
	var _booDoInclude;
	var _strCoachMes = "";
	var _strNonCoachMes = "";

	if (this.booPassed)
	{
		for (i in this.objScoreArray)
		{
			if (this.objScoreArray[i][0] == 0)
			{
				if (this.objScoreArray[i][5],this.objScoreArray[i][2].indexOf("*") != -1)
					_objTempArray[_objTempArray.length] = new Array("<b>Question</b>: "+this.objScoreArray[i][3]+"<br><br><b>Your answer</b>: "+this.objScoreArray[i][4]+"<br><b>Correct answer</b>: "+this.objScoreArray[i][5],this.objScoreArray[i][2]);
				else
					_objTempArray[_objTempArray.length] = new Array("<b>Question</b>: "+this.objScoreArray[i][3]+"<br><br><b>Your answer</b>: "+this.objScoreArray[i][4]+"<br><b>Correct answer</b>: "+this.objScoreArray[i][5],this.objScoreArray[i][2].split(":")[0]);
			}
		}

		for (var i=0; i<_objTempArray.length; i++)
		{
			_strCoachMes += _objTempArray[i][0];
			if (_objTempArray[i][1].indexOf("*") != -1)
			{
				if (i == (_objTempArray.length - 1))
					_strCoachMes += "<br><b>Scenario</b>: " + _objTempArray[i][1].split("*")[1];
				else
					_strCoachMes += "<br><b>Scenario</b>: " + _objTempArray[i][1].split("*")[1] + "\n";
			}
			else
			{
				_objTempArray[i][1] = _objTempArray[i][1].toLowerCase();
				if(this.objParent.objCoachMeTitles[_objTempArray[i][1]])
				{
					if (i == (_objTempArray.length - 1))
						_strCoachMes += "<br><b>Coach me</b>: <a href=\"javascript:launchCoachMe('"+_objTempArray[i][1]+"')\">"+this.objParent.objCoachMeTitles[_objTempArray[i][1]]+"</a>";
					else
						_strCoachMes += "<br><b>Coach me</b>: <a href=\"javascript:launchCoachMe('"+_objTempArray[i][1]+"')\">"+this.objParent.objCoachMeTitles[_objTempArray[i][1]]+"</a>\n";
				}
			}
		}
	}
	else
	{
		for (i in this.objScoreArray)
		{
			if (this.objScoreArray[i][0] == 0)
			{
				_booDoInclude = true;
	
				for (var j=0; j<_objTempArray.length; j++)
				{
					if (this.objScoreArray[i][2].indexOf("*") != -1)
					{
						if (_objTempArray[j] == this.objScoreArray[i][2].split("*")[0])
						{
							_booDoInclude = false;
							break;
						}
					}
					else if (_objTempArray[j].toLowerCase() == this.objScoreArray[i][2].split(":")[0].toLowerCase())
					{
						_booDoInclude = false;
						break;
					}
				}
	
				if (_booDoInclude)
					_objTempArray[_objTempArray.length] = this.objScoreArray[i][2].split(":")[0].toLowerCase();
			}
		}
	
		for (var i=0; i<_objTempArray.length; i++)
		{
			if (_objTempArray[i].indexOf("*") != -1)
			{
				if (i == (_objTempArray.length - 1))
					_strNonCoachMes += _objTempArray[i].split("*")[1];
				else
					_strNonCoachMes += _objTempArray[i].split("*")[1] + "\n";
			}
			else if(typeof(this.objParent.objCoachMeTitles[_objTempArray[i]])!="undefined")
			{
				if (i == (_objTempArray.length - 1))
					_strCoachMes += "<a href=\"javascript:launchCoachMe('" + _objTempArray[i] + "')\">" + this.objParent.objCoachMeTitles[_objTempArray[i]] + "</a>";
				else
					_strCoachMes += "<a href=\"javascript:launchCoachMe('" + _objTempArray[i] + "')\">" + this.objParent.objCoachMeTitles[_objTempArray[i]] + "</a>\n";
			}
		}

		_strCoachMes = _strNonCoachMes + "***" + _strCoachMes;
	}

	return _strCoachMes;
}

function _incMaxScore( _strPageID, _intMaxScore)
{
	if (this.objScoreArray == null)
		this.objScoreArray = new Array();

	if (!this.objScoreArray[_strPageID])
		this.objScoreArray[_strPageID] = new Array(0,_intMaxScore,"","","","");
}

function _calcMaxScore()
{
	this.intMaxScore = 0;
	for (var i in this.objScoreArray)
	{
		this.intMaxScore += parseInt(this.objScoreArray[i][1]);
	}
}

function _getMaxScore()
{
	this.calcMaxScore();
	return this.intMaxScore;
}

function _addScore( _strPageID, _strRelatedCoachMe, _intScore, _strQuestionText, _strUserAnswer, _strCorrectAnswer)
{
	
	//alert("pageID: " + _strPageID + "\n" + "relatedCoachMe: " + _strRelatedCoachMe + "\n" + "_intScore: " + _intScore + "\n" + "_strQuestionText: " + _strQuestionText + "\n" + "_strUserAnswer: " + _strUserAnswer + "\n" + "_strCorrectAnswer: " + _strCorrectAnswer + "\n");
	
	this.objScoreArray[_strPageID][0] = _intScore;
	this.objScoreArray[_strPageID][2] = _strRelatedCoachMe;
//	this.objScoreArray[_strPageID][3] = _strQuestionText.replace(/<SPAN/,"<span").split("<span")[0].replace(/<BR>/gi,"").replace(/<\/BR>/gi,"").replace(/<P>/gi,"").replace(/<\/P>/gi,"");
	this.objScoreArray[_strPageID][3] = _strQuestionText.replace(/<SPAN/,"<span").split("<span")[0].replace(/<P>/gi,"").replace(/<\/P>/gi,"");
	this.objScoreArray[_strPageID][4] = _strUserAnswer.replace(/<P>/gi,"").replace(/<\/P>/gi,"");
	this.objScoreArray[_strPageID][5] = _strCorrectAnswer.replace(/<P>/gi,"").replace(/<\/P>/gi,"");
}

function _getScore()
{
	this.intScore = 0;
	for (var i in this.objScoreArray)
	{
		this.intScore += this.objScoreArray[i][0];
	}

	return this.intScore;
}

function _getPercentage()
{
	this.percentage = (this.getScore() / this.getMaxScore()) * 100;
	return this.percentage;
}

function _setTaskID()
{
	this.strCurrentTaskID = this.objNavArray[this.intCurrentPage][0].split("_")[2];
	for (var i=0; i<this.objTaskStatusArray.length; i++)
	{
		if (this.strCurrentTaskID == this.objTaskStatusArray[i][0])
		{
			this.intTaskStatusIndex = i;
			break;
		}
	}
}

function _setTaskQComplete()
{
	this.objTaskQSArray[this.strCurrentTaskID][0] = 1;
}

function _checkTaskQDone()
{	
	if (this.objTaskQSArray[this.strCurrentTaskID][0] == 1)
	{
		this.setTaskStatus();
		return true;
	}
	else
	{
		return false;
	}
}

function _setTaskStatus()
{
	if (this.objTaskStatusArray[this.intTaskStatusIndex][1] != 1)
	{
		if (this.endOfTask())
			this.objTaskStatusArray[this.intTaskStatusIndex][1] = 1;
	}
}

function _endOfTask()
{
	var _strNextPageTaskID;

	if (this.intCurrentPage == (this.objNavArray.length - 1))
	{
		return true;
	}
	else
	{
		_strNextPageTaskID = this.objNavArray[(this.intCurrentPage+1)][0].split("_")[2];
		if (this.strCurrentTaskID != _strNextPageTaskID)
			return true;
	}

	return false;
}

function _setTaskStatusArray()
{
	var _strID;
	var _booInsertID;

	this.objTaskStatusArray = new Array();
	for (var i=0; i<this.objNavArray.length; i++)
	{
		_booInsertID = true;
		_strID = this.objNavArray[i][0].split("_")[2];
		for (var j=0; j<this.objTaskStatusArray.length; j++)
		{
			if (_strID == this.objTaskStatusArray[j][0])
			{
				_booInsertID = false;
				break;
			}
		}

		if (_booInsertID)
		{
			this.objTaskStatusArray[this.objTaskStatusArray.length] = new Array(_strID,0);
		}
	}
}

function _goMenu( _objFrame, _strMenuURL )
{
	_objFrame.location = _strMenuURL;
}

function _goBack( _objFrame )
{
	this.intCurrentPage--;
	_objFrame.location = this.URL + this.objNavArray[this.intCurrentPage][0];		
}

function _goNext( _objFrame )
{
	this.intCurrentPage++;
	
		_objFrame.location = this.URL + this.objNavArray[this.intCurrentPage][0];
}

function _setupUnit( _strUnitPath )
{
	this.URL = _strUnitPath;
}

function _showPageNum( _objPageNum )
{
	switch (this.intCurrentType)
	{
	case 0: // PRESENTATION - need to use the actual number because netscape does not seem to support constants in case statements within a function in an object
			_objPageNum.innerHTML = (this.intCurrentPage+1)+"/"+this.objNavArray.length;
		break;
	default:
		break;
	}
}

function _checkNav(_objButtonsArray, _intPageType)
{
	var _booContinueCheck = true;

	_objButtonsArray["exit"].visibility = "visible";
	if (this.booAssessment)
	{
		if ((_intPageType == MCQNOFEEDBACK) || 
			(_intPageType == SLNOFEEDBACK) || 
			(_intPageType == QUIZWORDMATCH) || 
			(_intPageType == QUIZWORDMATCHGRAPHIC) ||
			(_intPageType == ASSESSMENTRESULT) ||
			(_intPageType == QUIZRESULTS))
		{
			_objButtonsArray["next"].visibility = "hidden";
			_objButtonsArray["back"].visibility = "hidden";
			_booContinueCheck = false;
		}
	}

	switch (this.intCurrentType)
	{
	case PRESENTATION:
		if (_booContinueCheck)
		{
			if (this.objNavArray.length == 1)
			{
				_objButtonsArray["next"].visibility = "hidden";
				_objButtonsArray["back"].visibility = "hidden";
			}
			else if (this.intCurrentPage == 0)
			{
				_objButtonsArray["next"].visibility = "visible";
				_objButtonsArray["back"].visibility = "hidden";
			}
			else if (this.intCurrentPage == (this.objNavArray.length - 1))
			{
				_objButtonsArray["next"].visibility = "hidden";
				_objButtonsArray["back"].visibility = "visible";
			}
			else
			{
				_objButtonsArray["next"].visibility = "visible";
				_objButtonsArray["back"].visibility = "visible";
			}
		}
		break;
	default:
		break;
	}
}
function _retrieveOIData(_intPageType, _strScreenID)
{
	
	var _strPageID = this.objNavArray[this.intCurrentPage][0].split(".")[0];
	var _strData = "";

	if (_intPageType == OPENINPUTSTART)
	{
		if ((this.objParent.strOpenInputData != null) && (this.objParent.strOpenInputData[_strPageID]))
			_strData = this.objParent.strOpenInputData[_strPageID];
	}
	else if (_intPageType == OPENINPUTBUILD)
	{
		if (this.strInputBuildData != null)
			_strData = this.strInputBuildData;
	}
	else if (_intPageType == OPENINPUTEND)
	{
		if ((this.objParent.strOpenInputData != null) && (this.objParent.strOpenInputData[_strScreenID]))
			_strData = this.objParent.strOpenInputData[_strScreenID].replace(/\n/g,"<br>");
	}
	else
	{
		if (this.strInputBuildData != null)
			_strData = this.strInputBuildData.replace(/\n/g,"\n");
	}

	return _strData;
}

function _saveOIData(_strOIData, _intPageType)
{
	
	var _strPageID = this.objNavArray[this.intCurrentPage][0].split(".")[0];
	if (_intPageType == OPENINPUTSTART)
	{
		if (this.objParent.strOpenInputData == null)
		{
			this.objParent.strOpenInputData = new Array();
		}
		
		
		this.objParent.strOpenInputData[_strPageID] = _strOIData;
		
	}
	else
	{
		this.strInputBuildData = _strOIData;
	}
}

function _bookmarkPage()
{
	var _objRoot;
	var _strPageID = this.objNavArray[this.intCurrentPage][0].replace(/\.htm/,"");
	var _strPageTitle = this.objNavArray[this.intCurrentPage][2];

	_objRoot = this.objParent;
	while (_objRoot.objParent != null)
	{
		_objRoot = _objRoot.objParent;
	}

	if (_objRoot.objBookmarks == null)
		_objRoot.objBookmarks = new Array();

	if (!_objRoot.objBookmarks[_strPageID])
	{
		_objRoot.objBookmarks[_strPageID] = this.strTitle + " - " + _strPageTitle;
		_objRoot.intBookmarksCount++;
	}
}

function _removeBookmark(_strPpageID)
{
	this.objBookmarks[_strPpageID] = null;
	this.intBookmarksCount--;
}

//
// Start of generic function definition
//

function findUnit(_objBase, _strUnitID)
{
	_strUnitID = _strUnitID.split("_")[1];
	objUnitRef = null;

	for (var j=0; j<_objBase.objChilds.length; j++)
	{
		if (_objBase.objChilds[j].strID == _strUnitID)
		{
			objUnitRef = _objBase.objChilds[j];
			break;
		}
	}
}
