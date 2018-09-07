///////////////////////////////////////////////////////////////////////
// EPIC Group PLC
//
// Project Name : 10014
//
// File Description : JavaScript file included with the Select from list No Feedback, and Select from list No Feedback and Graphic.
//			(selectFromListNoFeedback.html, selectFromListNoFeedbackAndGraphic.html)
//
// Creation Date : Wai Lam Yau - 06/03/2001
//
// Modification History :
//
///////////////////////////////////////////////////////////////////////

var intNumberOfOptions; // Variable to hold number of options.
var objOptionState = new Array(); // To hold the state of the options.
var booCorrectAnswers = new Array(); // Store the correct answers
var booCorrectResponse; // To indicate whether the user have answered the question correctly or not (false/wrong - true/correct)

var scoreWeight = 1;
var confirm_n = new Image(); // Confirm button normal/rollout state
var confirm_r = new Image(); // Confirm button highlight/rollover state
var selectbox_s = new Image(); // Selected select box button graphic
var selectbox_d = new Image(); // De-Selected select box button graphic

// This function is called when the onload event for the document is triggered
function initialise()
{
	if (parent.objNavFrame) {
		appTop.intPageType = appTop.SLNOFEEDBACK;
		parent.objNavFrame.initPageType();
		if (appTop.booMainWindow)
		{
			if (appTop.objCurrentState.objUnit.booAssessment)
				appTop.objCurrentState.objUnit.incMaxScore(appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][0],scoreWeight);
			appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][1] = appTop.VISITED;
		}
	}

	preloadImages();

	intNumberOfOptions = getNumberOfOptions();
	initialiseOptionState();

	getAnswers();
	document.body.scroll = "no";
	parent.booContentLoaded = true; // This is to tell the program that this page have been loaded.
}

// Function to preload theimages
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

	selectbox_s.src = imagePath + "checkbox_s.gif";
	selectbox_d.src = imagePath + "checkbox_d.gif";
}


// This function is called when the onunload event for the document is triggered
function pageUnload()
{
	parent.booContentLoaded = false; // This is to tell the program that this page is being unloaded from the browser.
}

// This function find the number of options available for the question.
function getNumberOfOptions()
{
	var _intCount = 0;

	while (document.getElementById("option" + ++_intCount)) {}

	_intCount--;

	return _intCount;
}

// Function to initialise the optionState array
function initialiseOptionState()
{
	for (var i=0; i<=intNumberOfOptions; i++)
	{
		objOptionState[i] = false;
	}
}

// This function retrieve the correct answers for the current question
// The correct answers is the refNum variable at the end of the html page.
function getAnswers()
{
	if (appTop.booAlertQuestions)
	{
		alert("Correct options: " + refNum.toString().split(""))
	}
	var _intLength = new String(refNum).length;
	var _intDivNum = Math.pow(10,(_intLength-1));

	for (var i=0; i<_intLength; i++)
	{
		booCorrectAnswers[i] = Math.floor(refNum/_intDivNum);
		refNum = refNum % _intDivNum;
		_intDivNum = _intDivNum / 10;
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

// This function check thet state of the button and call the appropriate function to deal with the button state
function checkAnswer()
{
	if (parent.booContentLoaded)
		doCheckAnswer();

	return;
}

// Function to check the selected answers and see if it's correct or not.
// This is called when the confirm button is clicked.
// If no option has been selected, an alert message will appear telling the
// user to select an option before clicking on the confirm button.
// If an option is selected, display the appropriate feedback
function doCheckAnswer()
{
	var _strUserAnswer;
	var _strCorrectAnswer;

	if (checkOptionSelected())
	{
		// check to see if the user answered the question correctly or not
		booCorrectResponse = checkResponse();
		document.getElementById("confirm").style.visibility = "hidden";

		if ((parent.objNavFrame) && (appTop.objCurrentState.objUnit.booAssessment))
		{
			_strUserAnswer = getUserAnswer();
			_strCorrectAnswer = getCorrectAnswer();
			if (booCorrectResponse)
				appTop.objCurrentState.objUnit.addScore(appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][0], relatedUnit, scoreWeight, document.all['question'].innerHTML, _strUserAnswer, _strCorrectAnswer);
			else
				appTop.objCurrentState.objUnit.addScore(appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][0], relatedUnit, 0, document.all['question'].innerHTML, _strUserAnswer, _strCorrectAnswer);
			parent.objNavFrame.goNext();
		}
	}
	else
	{
		alert(appTop.objGenericText["mustselectoptions"]);
	}

	return;
}

function getUserAnswer()
{
	var _strHTML;

	_strHTML = "<br><ul>";
	for (var i=1; i<=objOptionState.length; i++)
	{
		if (objOptionState[i])
			_strHTML += "<li>" + document.getElementById("optionTD_" + i + "_main").innerHTML + "</li>";
	}
	_strHTML += "</ul>";
	return _strHTML;
}

function getCorrectAnswer()
{
	var _strHTML;

	_strHTML = "<br><ul>";
	for (var i=0; i<booCorrectAnswers.length; i++)
	{
		_strHTML += "<li>" + document.getElementById("optionTD_" + booCorrectAnswers[i] + "_main").innerHTML + "</li>";
	}
	_strHTML += "</ul>";
	return _strHTML;
}

// Function to check whether the user response is correct or not
function checkResponse()
{
	var _intCount = 0;
	var _intOptionClickedCount = 0;

	for(var i=0; i<booCorrectAnswers.length; i++)
	{
		if (objOptionState[booCorrectAnswers[i]])
			_intCount ++;
	}

	for (var i=1; i<=objOptionState.length; i++)
	{
		if (objOptionState[i])
			_intOptionClickedCount++;
	}

	return ((_intCount == booCorrectAnswers.length) && (_intOptionClickedCount == booCorrectAnswers.length));
}

// Function to check to see whether the user have selected an option or not.
function checkOptionSelected()
{
	var _booSelected = false;

	if (parent.booContentLoaded)
	{
		for (var i=1; i<=objOptionState.length; i++)
		{
			if (objOptionState[i])
			{
				_booSelected = true;
				break;
			}
		}
	}

	return _booSelected;
}

// Function to change the radio button state on the options when one of the option is clicked.
// This function is called when the user click on one of the radio button graphic.
// The function will not do anything if the question has already been answered.
function optionClicked(_intClickedOption)
{
	// if the question has not been answered, then actually do the click action.
	if (parent.booContentLoaded)
		doOptionClicked(_intClickedOption)
}

function optionOver( _intNum )
{
	document.getElementById("optionTD_" + _intNum + "_img").style.backgroundColor = "#D6D6D6";
	document.getElementById("optionTD_" + _intNum + "_main").style.backgroundColor = "#D6D6D6";
}

function optionOut( _intNum )
{
	document.getElementById("optionTD_" + _intNum + "_img").style.backgroundColor = "#FFFFFF";
	document.getElementById("optionTD_" + _intNum + "_main").style.backgroundColor = "#FFFFFF";
}

// Function to actually change the radio button state, and to record the users response to the question.
function doOptionClicked(_intClickedOption)
{
	var _objImg;

	_objImg = document.getElementById("option" + _intClickedOption);

	if (objOptionState[_intClickedOption])
	{
		_objImg.src = selectbox_d.src;
		objOptionState[_intClickedOption] = false;
	}
	else
	{
		_objImg.src = selectbox_s.src;
		objOptionState[_intClickedOption] = true;
	}

	return;
}

