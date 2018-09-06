///////////////////////////////////////////////////////////////////////
// EPIC Group PLC
//
// Project Name : 10014
//
// File Description : JavaScript file included with the Select from list with Feedback, and Select from list with Feedback and Graphic.
//			(selectFromListWithFeedback.html, selectFromListWithFeedbackAndGraphic.html) 
//		
// Creation Date : Wai Lam Yau - 05/03/2001
//		
// Modification History :
//
///////////////////////////////////////////////////////////////////////

var intNumberOfOptions; // Variable to hold number of options.
var objOptionState = new Array(); // To hold the state of the options.
//var buttonState = 0; // currents stateof the confirm button 0 - confirm, 1 - model answer, 2 - my answer
var booAnswered = false; // Flag to indicate whether the question has been answered or not
var objCorrectAnswers = new Array(); // Store the correct answers
var booCorrectResponse; // To indicate whether the user have answered the question correctly or not (false/wrong - true/correct)
var objBlankImg = new Image(); // to cover Tick or Cross image (if required)
var booTickImg = new Image(); // Tick image (if required)
var booCrossImg = new Image(); // Cross image (if required)
var confirm_n = new Image(); // Confirm button normal/rollout state
var confirm_r = new Image(); // Confirm button highlight/rollover state
var selectbox_s = new Image(); // Selected select box button graphic
var selectbox_d = new Image(); // De-Selected select box button graphic
var moanswer_r = new Image(); // Model Answer button highlight/rollover state
var moanswer_n = new Image(); // Model Answer button normal/rollout state
var myanswer_r = new Image(); // My Answer button highlight/rollover state
var myanswer_n = new Image(); // My Answer button normal/rollout state
var intPartiallyCorrectFlag = 0; // Set to true if the user has got at least one of the correct options selected
var intNumOptionsSelected = 0;
var errCannotSelectAllOptions = appTop.objGenericText["maynotselectalloptions"]; // Not used?
var strGraphicHTML = "";
var intPageHeight= (appTop.booMainWindow) ? 442 : 368;

var booFirstTime = true;
var booDisabled = false;
var isScenario = false;
var isOpenInput = false;
var scoreWeight = 1;
var maxAttempts; // maximum number of attempts allowed, this value is retrieved from the word template and set inside the html page.
var attempts = 0; // number of attempts taken so far.
var taskQuestion = false;
var questionResponses = false;

// This function is called when the onload event for the document is triggered
function initialise()
{
	//fix put in for when run in refresh
	if (!appTop.booMainWindow)
	{
		if(isScenario)
		{
			intPageHeight= (isScenario) ? 442 : 368;
		}
		else
		{
			intPageHeight=368;
		}
	}

	intNumberOfOptions = getNumberOfOptions();
	initialiseOptionState();
	if (parent.objNavFrame) {
		appTop.intPageType = appTop.SLWITHFEEDBACK;
		parent.objNavFrame.initPageType();
		if (appTop.booMainWindow)
		{
			if (appTop.objCurrentState.objUnit.booAssessment)
				appTop.objCurrentState.objUnit.incMaxScore(appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][0], scoreWeight);
			appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][1] = appTop.VISITED;
		}

		if (isOpenInput) 
		{
			retrieveFormData();
		}
	}

	preloadImages();
	getAnswers();

	document.body.scroll = "no";	
	parent.booContentLoaded = true; // This is to tell the program that this page have been loaded.
}

// Function to preload theimages
// change the .src paths to point to the right directory/file
function preloadImages()
{
	objBlankImg.src = imagePath+"trans.gif";
	booTickImg.src = imagePath+"tick.gif";
	booCrossImg.src = imagePath+"cross.gif";
	selectbox_d.src = imagePath+"checkbox_d.gif";
	selectbox_s.src = imagePath+"checkbox_s.gif";

	if (new String(document.location).indexOf("_cm",0) == -1) 
	{ //typeof appTop.coachMe == "undefined") {
		confirm_n.src = imagePath+"cnfrm_btn_n.jpg";
		confirm_r.src = imagePath+"cnfrm_btn_h.jpg";
	} 
	else 
	{
		confirm_n.src = imagePath+"coach_cnfrm_btn_n.gif";
		confirm_r.src = imagePath+"coach_cnfrm_btn_h.gif";		
	}

}

function retrieveFormData()
{	
	var _strData = "";

	if (dataFromPage == "") 
	{
		_strData = appTop.objCurrentState.objUnit.retrieveOIData(appTop.OPENINPUTBUILD, "");
	}
	else 
	{
		_strData = appTop.objCurrentState.objUnit.retrieveOIData(appTop.OPENINPUTEND, dataFromPage);
	}

	if (_strData == "") 
	{
		_strData = appTop.objGenericText["openinputnotext"];
	}

	_strData = _strData.replace(/<br>/g,"\n");
	_strData = '<textarea wrap="ON" cols="7" rows="7" class="inputBox">' + _strData + '</textarea>';
	document.getElementById("feedbackText").innerHTML = _strData;
}

// This function is called when the onunload event for the document is triggered
function pageUnload()
{
	parent.booContentLoaded = false; // This is to tell the program that this page is being unloaded from the browser.
}

// This function attempts to find the feedbackAreaLayer.
function haveFeedbackBackground()
{
	var _booFound = false;

	if (document.getElementById("feedbackAreaBackground"))
	{
		_booFound = true;
	}

	return _booFound;
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

// This function find the number of options available for the question.
function getNumberOfOptions()
{
	var _intCount = 0;
	
	do 
	{
		_intCount++;
	} while (document.getElementById("option" + _intCount))

	_intCount--;	

	return _intCount;
}

// Function to initialise the objOptionState array
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
	var _intRefLength = new String(refNum).length;
	var _intDivNum = Math.pow(10,(_intRefLength-1));

	for (var i=0; i<_intRefLength; i++)
	{
		objCorrectAnswers[i] = Math.floor(refNum/_intDivNum);
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
	if ((!booAnswered) && (parent.booContentLoaded))
	{
		document.getElementById(_arrImg[0] + "Img").src = eval(_strImgState).src
	}
}

// Function to reset all the options
function resetOptions()
{
	var _objOptions;

	for (var i=1; i<=intNumberOfOptions; i++)
	{
		document.getElementById("option" + i).src = selectbox_d.src;
	}
}

function checkAnswer()
{
	if ((!booAnswered) && (parent.booContentLoaded)) 
	{
		doCheckAnswer();
	}

	return;
}

// Function to check the selected answers and see if it's correct or not.
// This is called when the confirm button is clicked.
// If no option has been selected, an alert message will appear telling the 
// user to select an option before clicking on the confirm button.
// If an option is selected, display the appropriate feedback
function doCheckAnswer()
{
	if (checkOptionSelected())
	{
		attempts++;

		// check to see if the user answered the question correctly or not
		booCorrectResponse = checkResponse();

		if (booCorrectResponse)
		{
			booAnswered = true;
		}
		else
		{
			if ((attempts == 1) && (taskQuestion))
			{
				disableQuestion();
			}
		}

		if ((attempts == maxAttempts) || (booAnswered))
		{
			document.getElementById("confirm").style.visibility = "hidden";
			booAnswered = true;

			if (highlightTheCorrectAnswer)
			{
				highlightCorrectAnswer();
			}
		}
		
		if ((booAnswered) && (appTop.booMainWindow))
		{
			if(taskQuestion)
			{
				if (!appTop.objCurrentState.objUnit.checkTaskQDone())
				{
					parent.objToolsFrame.checkComms();
				}
	
				if (parent.objNavFrame) 
				{
					appTop.objCurrentState.objUnit.setTaskQComplete();
					parent.objNavFrame.showNext();
				}
			}
			else
			{
				parent.objToolsFrame.checkComms();
			}
		}
		showFeedback();
	} 
	else 
	{
		alert(appTop.objGenericText["mustselectoptions"])
	}
	return;
}

function disableQuestion()
{
	// need to implement disable mechanism
	if ((parent.objToolsFrame) && (appTop.booDoDisableTask))
	{
		booDisabled = true;
		document.getElementById("confirm").style.visibility = "hidden"; // temporary disable mechanism
		appTop.objCurrentState.objUnit.booDoCoachMeCheck = true;
		parent.objToolsFrame.flashButton("coachMe");
	}
}

function enableQuestion()
{
	var _strTextToDisplay = document.getElementById("initialInstructionText").innerHTML;
	_strTextToDisplay = _strTextToDisplay.substring(0, _strTextToDisplay.length-1);
	_strTextToDisplay += appTop.objGenericText["secondattemptinstruction"];

	if (document.getElementById("feedbackImage"))
	{
		document.getElementById("feedbackImage").style.visibility = "hidden";
	}

	document.getElementById("feedbackText").innerHTML = "<span class='instructionText'>" + _strTextToDisplay + "</span>" + strGraphicHTML;	
	booDisabled = false;
	document.getElementById("confirm").style.visibility = "visible"; // temporary enable mechanism
}

// Function to highlight the correct answer
function highlightCorrectAnswer()
{
	for (var i=0; i<objCorrectAnswers.length; i++)
	{
		document.getElementById("option" + objCorrectAnswers[i] + "Text").style.backgroundColor = "#DDFFDD";
	}
}

// Function to check whether the user response is correct or not
function checkResponse()
{
	var _booAtLeastOneWrong = false;
	var _booCorrectAns = false;
	var _intCount = 0;
	var _intOptionClickedCount = 0;

	intPartiallyCorrectFlag = 0;

	for(var i=0; i<objCorrectAnswers.length; i++)
	{
		if (objOptionState[objCorrectAnswers[i]])
		{
			_intCount++;
			intPartiallyCorrectFlag = 1;
		}
	}

	if (markAnswersWithTickOrCross)
	{
		blankTicksAndCrosses();
	}

	for (var i=1; i<=objOptionState.length; i++)
	{
		if (objOptionState[i])
		{
			_intOptionClickedCount++;
		}
		
		_booCorrectAns = false;
		for(var j=0; j<objCorrectAnswers.length; j++)
		{
			if(objCorrectAnswers[j]==i)
			{
				_booCorrectAns = true;
				break;
			}
		}

		if (objOptionState[i] && (!_booCorrectAns))
		{
			_booAtLeastOneWrong = true;
		}

		if (markAnswersWithTickOrCross)
		{
			if (objOptionState[i] || ((attempts == maxAttempts) && tickTheCorrectAnswer && _booCorrectAns))//Only mark it if user has selected this option or its the last go
			// and we are ticking the correct options
			{
					markOption(i, _booCorrectAns);
			}
		}
	}

	if(_booAtLeastOneWrong && intPartiallyCorrectFlag) 
	{ 
		intPartiallyCorrectFlag = 2;
	}	

	if ((_intCount == objCorrectAnswers.length) && (_intOptionClickedCount == objCorrectAnswers.length)) 
	{
		appTop.booAnswerStatus = appTop.ALLRIGHT;
		return true;
	} 
	else 
	{
		if (intPartiallyCorrectFlag) 
		{
			if(intPartiallyCorrectFlag == 2)
			{
				appTop.booAnswerStatus = appTop.SOMERIGHTANDSOMEWRONG;
			}
			else
			{
				appTop.booAnswerStatus = appTop.SOMERIGHT;
			}
		} 
		else 
		{
			appTop.booAnswerStatus = appTop.NONERIGHT;
		}
		return false;
	}
}

// Function to check to see whether the user have selected an option or not.
function checkOptionSelected()
{
	var _booSelected = false;

	intNumOptionsSelected = 0;
	
	if (parent.booContentLoaded)
	{
		for (var i=1; i<=objOptionState.length; i++)
		{
			if (objOptionState[i])
			{
				_booSelected = true;
				intNumOptionsSelected ++;
			}
		}
	}

	if (intNumOptionsSelected <= intNumberOfOptions) 
	{
		return _booSelected;
	} 
	else 
	{
		return false;
	}
	
}

// Function to show the feedback.
function showFeedback()
{
	var _intSelectedOption = 1;
	var _strTextToDisplay = "";
	var _booShowImage = false;
	var intScrollyHeight = intPageHeight - (document.getElementById("feedbackText").offsetParent.offsetTop + document.getElementById("questionDiv").offsetTop) - 10;//10 padding at bottom of screen

//	if(appTop.booMainWindow && !taskQuestion && (attempts!=maxAttempts&&!booAnswered)) intScrollyHeight -=5 0;//The Submit button remains on a Scenario question that isnt a task Question
	if(appTop.booMainWindow && (attempts!=maxAttempts&&!booAnswered))
	{
		intScrollyHeight -= 50;//The Submit button remains on a Scenario question that isnt a task Question
	}

	document.getElementById("feedbackText").style.height = intScrollyHeight;

	if(booFirstTime)
	{
		strGraphicHTML = document.getElementById("feedbackText").innerHTML;
		booFirstTime = false;
	}

	document.getElementById("initialInstructionText").style.visibility = "hidden";
	if (booCorrectResponse) 
	{
		if (questionResponses) 
		{
			_strTextToDisplay += getResponse();
		}
		_strTextToDisplay += correctFeedbackText;
	} 
	else 
	{	
		_strTextToDisplay = "<p>You have not chosen any of the correct options.</p>";
		if (questionResponses) 
		{
			_strTextToDisplay = getResponse();
		} 
		else 
		{
			if (intPartiallyCorrectFlag == 1)
			{
				_strTextToDisplay = "<p>You have got some right answers, but not all of them.</p>";
			}
			
			if (intPartiallyCorrectFlag == 2)
			{
				_strTextToDisplay = "<p>You have got some right answers, but also some wrong ones.</p>";
			}
		}
		if (attempts == maxAttempts)
		{
			//_strTextToDisplay += "<p>"+finalIncorrectFeedback+"</p>";		
			_strTextToDisplay += finalIncorrectFeedback;		
		}
		else
		{
			//_strTextToDisplay += "<p>"+retryFeedbackOptional+"</p>";		
			_strTextToDisplay += retryFeedbackOptional;
		}
	}
	
	if (!booCorrectResponse)
	{
		_intSelectedOption = (attempts != maxAttempts) ? 2 : 3;	
	}

	if (booAnswered)
	{
		_strTextToDisplay += "<span class=\"instructionText\" id='finalInstruction'> ";

		if (appTop.booMainWindow) 
		{
			_strTextToDisplay += parent.objNavFrame.getInstruction(true) ;
		} 
		else 
		{
			_strTextToDisplay += instructionText;
		}

		_strTextToDisplay += "</span>";
	}
	else
	{
		_strTextToDisplay += "<span class=\"instructionText\" id='finalInstruction'> " + instructionOnIncorrectAttempt + "</span>";
	}	
	
	if ((graphicFileNameArray) && (graphicFileNameArray[_intSelectedOption]) && (graphicFileNameArray[_intSelectedOption] != "")) 
	{
		if (document.getElementById("optionsTop")) 
		{
			//_strTextToDisplay += "<div id='feedbackImage'><img border=\"0\" src=\"images/"+graphicFileNameArray[_intSelectedOption]+"\"></div>";
			document.getElementById("feedbackImage").innerHTML = "<img border=\"0\" src=\"images/" + graphicFileNameArray[_intSelectedOption] + "\">";
			_booShowImage = true;
		} 
		else 
		{
			_strTextToDisplay += "<p><img border=\"0\" src=\"images/" + graphicFileNameArray[_intSelectedOption] + "\"></p>";
		}
	}	
	
	if (haveFeedbackBackground())
	{
		document.getElementById("feedbackAreaBackground").style.visibility = "visible";
	}

	document.getElementById("feedbackText").innerHTML = _strTextToDisplay;

	if (document.getElementById("optionsTop")) 
	{
		if ((document.getElementById("feedbackImage")) && (_booShowImage))
		{
//			document.getElementById("feedbackText").innerHTML = document.getElementById("feedbackImage").innerHTML + "<br>" + _strTextToDisplay;
			document.getElementById("feedbackImage").style.top = document.getElementById("optionsTop").offsetTop + document.getElementById("questionDiv").offsetTop;
			document.getElementById("feedbackImage").style.visibility = 'visible';
		}
	}	

	document.getElementById("feedbackText").style.visibility = 'visible';
}

// Function to change the radio button state on the options when one of the option is clicked.
// This function is called when the user click on one of the radio button graphic.
// The function will not do anything if the question has already been answered.
function optionClicked(_intClickedOption)
{
	// if the question has not been answered, then actually do the click action.
	if ((!booAnswered) && (parent.booContentLoaded) && (!booDisabled))
	{
		doOptionClicked(_intClickedOption);
	}
}

// Function to actually change the radio button state, and to record the users response to the question.
function doOptionClicked(_intClickedOption)
{
	var _objImage = document.getElementById("option" + _intClickedOption);

	if (objOptionState[_intClickedOption])
	{
		_objImage.src = selectbox_d.src;
		objOptionState[_intClickedOption] = false;
	}
	else
	{
		_objImage.src = selectbox_s.src;
		objOptionState[_intClickedOption] = true;
	}

	// Show the image again if there is one and if it has been covered by the feedback
	if (feedbackOnRight && document.getElementById("graphicHolder"))
	{
		document.getElementById("graphicHolder").style.visibility = 'visible';
		document.getElementById("feedbackText").style.visibility = 'hidden';
		if (haveFeedbackBackground())
		{
			document.getElementById("feedbackAreaBackground").style.visibility = "hidden";
		}
	}		

	return;
}

var objLastImgs = new Array();

function markOption(_intOptionToMark, _booCorrect)
{
	var _objImg = document.getElementById("option" + tickOrCrossOnRight + _intOptionToMark );
	_objImg.src = (_booCorrect) ? booTickImg.src : booCrossImg.src;

	if (tickOrCrossOnRight)
	{
		objLastImgs[objLastImgs.length] = _objImg;
	}

	return;
}

function blankTicksAndCrosses()
{
	for (i=0; i<objLastImgs.length; i++)
	{
		if (objLastImgs[i])
		{
			objLastImgs[i].src = objBlankImg.src;
		}
	}	
}