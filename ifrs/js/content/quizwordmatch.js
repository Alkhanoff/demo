var pageCompleted = false;
var pageFound = false;
var intAttempts = 0;
var intMaxAttempts = 0;
var objAnswerArray = new Array();
var confirm_r = new Image(); // Confirm button highlight/rollover state
var confirm_n = new Image(); // Confirm button normal/rollout state
var moanswer_r = new Image(); // Model Answer button highlight/rollover state
var moanswer_n = new Image(); // Model Answer button normal/rollout state
var myanswer_r = new Image(); // My Answer button highlight/rollover state
var myanswer_n = new Image(); // My Answer button normal/rollout state
var objPositionArray = new Array();
var scoreWeight = 1;

function initialise(){
	if (parent.objNavFrame) {
		appTop.intPageType = appTop.QUIZWORDMATCH;
		parent.objNavFrame.initPageType();
		if (appTop.booMainWindow)
		{
			if (appTop.objCurrentState.objUnit.booAssessment)
				appTop.objCurrentState.objUnit.incMaxScore(appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][0], scoreWeight);
			appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][1] = appTop.VISITED;
		}
	}

	preloadImages();
	intMaxAttempts = numOfAttemps;
	document.body.scroll = "no";

	parent.booContentLoaded = true;

	getAnswers();
}


// Function to preload images
// change the .src paths to point to the right directory/file
function preloadImages()
{
	if (new String(document.location).indexOf("_cm",0) == -1) { //typeof appTop.coachMe == "undefined") {
		confirm_n.src = imagePath + "cnfrm_btn_n.jpg";
		confirm_r.src = imagePath + "cnfrm_btn_h.jpg";
	} else {
		confirm_n.src = imagePath + "coach_cnfrm_btn_n.gif";
		confirm_r.src = imagePath + "coach_cnfrm_btn_h.gif";
	}
}

// Function to change the confirm button image to it's varies states.
// This is called when the mouse is rolled over/out of the confirm button,
// and when the user clicked on the confirm button without selecting one of the options.
function changeImage(_strImgState)
{
	var _arrImg = _strImgState.split("_");
	if (parent.booContentLoaded)
	{
		document.getElementById(_arrImg[0] + "Img").src = eval(_strImgState).src
	}
}

function getAnswers()
{
	if (appTop.booAlertQuestions)
	{
		var _arrDropdownElements = document.getElementsByTagName("select");
		var count = 0;
		var _strAlertText = "Correct options:\n";
		while (count < _arrDropdownElements.length)
		{
			var _domCurrDropdown = _arrDropdownElements[count];

			/*
function anonymous()\n{\nupdateAnswerArray(this,'W2',1)
}


			*/

			_strAlertText += _domCurrDropdown.onchange.toString().replace("function anonymous()\n{\nupdateAnswerArray(this,'W", "").replace(/',\d\)\n}/g,"") + "\n";
			//alert(_domCurrDropdown.onchange)
			count++;
		}
		alert(_strAlertText)
	}
}

function updateAnswerArray(_objSelectedList, _strCorrectAnswer, _intListNum)
{
	var _strSelectedValue = _objSelectedList.options[_objSelectedList.selectedIndex].value;
	var _intSelectedValue = parseInt(_strSelectedValue.split("_")[1]);

	if (("W" + _intSelectedValue) == _strCorrectAnswer)
	{
		objAnswerArray[_intListNum] = 1;
	}
	else
	{
		objAnswerArray[_intListNum] = 0;
	}
}

// This function check thet state of the button and call the appropriate function to deal with the button state
function checkAnswer()
{
	if (parent.booContentLoaded)
		doCheckAnswer();
	return;
}

function doCheckAnswer()
{
	var _booAllSelected = true;
	var _objList;

	for(i=1; i<=numOfDropDowns; i++)
	{
		_objList = document.forms[0].elements["selectList_" + i];
		if (_objList.options[_objList.selectedIndex].text == "")
		{
			_booAllSelected = false;
		}
	}

	if (!_booAllSelected)
	{
		alert(appTop.objGenericText["mustselectalldropdownoption"]);
	}
	else
	{
		document.getElementById("initialInstructionText").style.visibility = "hidden";
		markQuestion()
	}
}

function markQuestion()
{
	var _booAllCorrect = true;
	var _strUserAnswer;
	var _strCorrectAnswer;

	intAttempts++;

	for(i=1; i<=numOfDropDowns; i++)
	{
		if(objAnswerArray[i] != 1)
		{
			_booAllCorrect = false;
		}
	}

	if ((parent.objNavFrame) && (appTop.objCurrentState.objUnit.booAssessment))
	{
		_strUserAnswer = getUserAnswer();
		_strCorrectAnswer = getCorrectAnswer();
		if (_booAllCorrect)
			appTop.objCurrentState.objUnit.addScore(appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][0],relatedUnit,scoreWeight,document.all['question'].innerHTML,_strUserAnswer,_strCorrectAnswer);
		else
			appTop.objCurrentState.objUnit.addScore(appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][0],relatedUnit,0,document.all['question'].innerHTML,_strUserAnswer,_strCorrectAnswer);
		parent.objNavFrame.goNext();
	}
}

var strCorrectColor = "<span style=\"color:#008000\">";
var strInCorrectColor = "<span style=\"color:#FF0000\">";
var strEndSpan = "</span>";

function getUserAnswer()
{
	var _strHTML;
	var _strMyValue;
	var _strFind;
	var _objForm;

	_objForm = document.forms[0];
	_strHTML = _objForm.innerHTML;
	_strHTML = _strHTML.replace(/\<IMG([^\>]*)\>/g,"");
    _strFind = /<OPTION([^>]*)>([^>]*)<\/OPTION>/gi;
    _strHTML = _strHTML.replace(_strFind, "");
    // replace all select tags with a number
    _strFind = /<SELECT([^>]*)>([^>]*)<\/SELECT>/gi;
	_strHTML = _strHTML.replace(_strFind,"%%%");
	for (var i=1; i<=numOfDropDowns; i++)
	{
		_strMyValue = _objForm.elements['selectList_' + i].options[_objForm.elements['selectList_' + i].selectedIndex].innerHTML;
		if (_objForm.elements['selectList_' + i].selectedIndex == (_objForm.elements['selectList_' + i].style.zIndex * 1))
			_strHTML = _strHTML.replace(/%%%/,strCorrectColor + _strMyValue + strEndSpan);
		else
			_strHTML = _strHTML.replace(/%%%/,strInCorrectColor + _strMyValue + strEndSpan);
	}

	_strHTML = "<br>" + _strHTML.replace(/\n/g,"");
	return _strHTML;
}

function getCorrectAnswer()
{
	var _strHTML;
	var _strMyValue;
	var _strFind;
	var _objForm;

	_objForm = document.forms[0];
	_strHTML = _objForm.innerHTML;
	_strHTML = _strHTML.replace(/\<IMG([^\>]*)\>/g,"");
    _strFind = /<OPTION([^>]*)>([^>]*)<\/OPTION>/gi;
    _strHTML = _strHTML.replace(_strFind, "");
    _strFind = /<SELECT([^>]*)>([^>]*)<\/SELECT>/gi;
	_strHTML = _strHTML.replace(_strFind,"%%%");
	for (var i=1; i<=numOfDropDowns; i++)
	{
		_strMyValue = _objForm.elements['selectList_' + i].options[(_objForm.elements['selectList_' + i].style.zIndex * 1)].innerHTML;
		_strHTML = _strHTML.replace(/%%%/, strCorrectColor + _strMyValue + strEndSpan);
	}

	_strHTML = "<br>"+_strHTML.replace(/\n/g,"");
	return _strHTML;
}

function disableLists()
{
	for (i=1; i<=numOfDropDowns; i++)
	{
		document.forms[0].elements["selectList_" + i].disabled = true;
	}
}

function enableLists()
{
	for(i=1; i<=numOfDropDowns; i++)
	{
		document.forms[0].elements["selectList_" + i].disabled = false;
	}
}

// This function is called when the onunload event for the document is triggered.
function pageUnload()
{
	parent.booContentLoaded = false; // This is to tell the program that this page is being unloaded from the browser.
}
