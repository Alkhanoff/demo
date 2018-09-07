///////////////////////////////////////////////////////////////////////
// EPIC Group PLC
//
// Project Name : 10014
//
// File Description : JavaScript file included with the Multiple Choice with Feedback, and Multiple Choice with Feedback and Graphic.
//			(multipleChoiceWithFeedback.html, multipleChoiceWithFeedbackAndGraphic.html) 
//		
// Creation Date : Wai Lam Yau - 26/02/2001
//		
// Modification History :
//	Wai Lam Yau - 27/02/2001
//		Changed the way the showFeedback function works.
//		Instead of dynamically writing to the feedback layer, the appropriate
//		  feedback layer is made visible instead
//		Added writePageNum function
//
//	Wai Lam Yau - 01/03/2001
//		Added pageType identifier
//
//	Wai Lam Yau - 05/03/2001
//		Removed the hiding of the instruction layer
//
///////////////////////////////////////////////////////////////////////

var intSelectedOption = 0; // To hold the current selected option. 0 = nothing selected
//var previousSelectedOption = 0; // To hold the previous attempt selected option. 0 = nothing selected
var booAnswered = false; // Flag to indicate whether the question has been answered or not
var intCorrectAnswer; // Store the correct answer
var booCorrectResponse; // To indicate whether the user have answered the question correctly or not (false/wrong - true/correct)
var maxAttempts; // maximum number of attempts allowed, this value is retrieved from the word template and set inside the html page.
var intAttempts = 0; // number of attempts taken so far.
var objBlankImg = new Image(); // to cover Tick or Cross image (if required)
var objTickImg = new Image(); // Tick image (if required)
var objCrossImg = new Image(); // Cross image (if required)
var confirm_n = new Image(); // Confirm button normal/rollout state
var confirm_r = new Image(); // Confirm button highlight/rollover state
var radio_s = new Image(); // Selected radio button graphic
var radio_d = new Image(); // De-Selected radio button graphic
var intScoreWeight = 1;
var strGraphicHTML = "";
var intPageHeight=(appTop.booMainWindow) ? 442 : 368;

var booFirstTime = true;
var booDisabled = false;
var isScenario = false;
var isOpenInput = false;
var questionResponses = false;

// This function is called when the onload event for the document is triggered
function initialise()
{
	//fix put in for when run in refresh
	if(!appTop.booMainWindow)
	{
		if(isScenario)
		{
			intPageHeight = (isScenario) ? 442 : 368;
		}
		else
		{
			intPageHeight = 368;
		}
	}

	if (parent.objNavFrame) {
		appTop.intPageType = appTop.MCQWITHFEEDBACK;
		parent.objNavFrame.initPageType();
		if (appTop.booMainWindow)
		{
			if (appTop.objCurrentState.objUnit.booAssessment)
				appTop.objCurrentState.objUnit.incMaxScore(appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][0], intScoreWeight);
			appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][1] = appTop.VISITED;
		}
		if (isOpenInput) {
			retrieveFormData();
		}
	}
	
	preloadImages();
	getAnswer();
	//if(initialAudioFile){playAudio(initialAudioFile);}
	document.body.scroll = "no";	
	parent.booContentLoaded = true; // This is to tell the program that this page have been loaded.
}

// Function to preload theimages
// change the .src paths to point to the right directory/file
function preloadImages()
{
	objBlankImg.src = imagePath + "trans.gif";
	objTickImg.src = imagePath + "tick.gif";
	objCrossImg.src = imagePath + "cross.gif";
	radio_d.src = imagePath + "radio_d.gif";
	radio_s.src = imagePath + "radio_s.gif";

	if (new String(document.location).indexOf("_cm",0) == -1) {
		confirm_n.src = imagePath + "cnfrm_btn_n.jpg";
		confirm_r.src = imagePath + "cnfrm_btn_h.jpg";		
	} else {
		confirm_n.src = imagePath + "coach_cnfrm_btn_n.gif";
		confirm_r.src = imagePath + "coach_cnfrm_btn_h.gif";		
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


// This function attempts to find the feedbackAreaLayer.
function findFeedbackBackground()
{
	var _booFound = false;

	if (document.getElementById("feedbackAreaBackground"))
	{
		_booFound = true;
	}

	return _booFound;
}

// This function retrieve the correct answer for the current question
// The correct answer is the number that's attached to the id/name of the spare layer
function getAnswer()
{
	var _intCount = 1;
	var _objOption = document.getElementById("spare" + _intCount);
	
	while (!_objOption)
	{
		_intCount++;
		_objOption = document.getElementById("spare" + _intCount);
	}

	intCorrectAnswer = _intCount;
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

// Function to check the for selected answer and see if it's correct or not.
// This is called when the confirm button is clicked.
// If no option has been selected, an alert message will appear telling the 
// user to select an option before clicking on the confirm button.
// If an option is selected, then display the appropriate feedback.
function checkAnswer()
{
	if ((!booAnswered) && (parent.booContentLoaded))
	{
		doCheckAnswer();
	}

	return;
}

function doCheckAnswer()
{
	if (intSelectedOption != 0)
	{
		intAttempts++;

		// check to see if the user booAnswered the question correctly or not
		if (intSelectedOption == intCorrectAnswer)
		{
			appTop.booAnswerStatus = appTop.ALLRIGHT;
			booCorrectResponse = true; // correct
			booAnswered = true;
		}
		else
		{
			appTop.booAnswerStatus = appTop.NONERIGHT;
			booCorrectResponse = false; // inCorrect

			if (appTop.booMainWindow)
			{
				if ((intAttempts == 1) && (taskQuestion))
					disableQuestion();
			}
		}

		
		if ((intAttempts == maxAttempts) || (booAnswered))
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
		alert(appTop.objGenericText["mustselectoption"]);
	}
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
	var _strTextToDisplay;
	
	// need to implement enable mechanism
	booDisabled = false;
	_strTextToDisplay = document.getElementById("initialInstructionText").innerHTML;
	_strTextToDisplay = _strTextToDisplay.substring(0, _strTextToDisplay.length-1);
	_strTextToDisplay += appTop.secondAttemptInstr;
	if (document.getElementById("feedbackImage"))
	{
		document.getElementById("feedbackImage").style.visibility = "hidden";
	}

	document.getElementById("feedbackText").innerHTML = "<span class='instructionText'>" + _strTextToDisplay + "</span>" + strGraphicHTML;	
	document.getElementById("confirm").style.visibility = "visible"; // temporary enable mechanism
	setFeedbackHeight();
}

// Function to highlight the correct answer
function highlightCorrectAnswer()
{
	document.getElementById("option" + intCorrectAnswer + "Text").style.backgroundColor = "#DDFFDD";
}

// Function to show the correct feedback.


function setFeedbackHeight(){
	var _intScrollyHeight = intPageHeight - (document.getElementById("feedbackText").offsetParent.offsetTop + document.getElementById("questionDiv").offsetTop) - 10;//10 padding at bottom of screen

	if (appTop.booMainWindow && (intAttempts != maxAttempts) && !booAnswered)
	{
		_intScrollyHeight = _intScrollyHeight-50;
	}
	
	document.getElementById("feedbackText").style.height = _intScrollyHeight;	
}

function showFeedback()
{
	setFeedbackHeight();

	var _booShowImage = false;
	var _strTextToDisplay = "";

	if(booFirstTime){
		strGraphicHTML = document.getElementById("feedbackText").innerHTML;
		booFirstTime = false;
	}

	document.getElementById("initialInstructionText").style.visibility = "hidden";

	if (findFeedbackBackground())
	{
		document.getElementById("feedbackAreaBackground").style.visibility = "visible";
	}

	if (questionResponses) 
	{
		_strTextToDisplay += getResponse();
	}

	if (!booCorrectResponse) 
	{
		if (intAttempts == maxAttempts) 
		{
			_strTextToDisplay += finalIncorrectFeedback;
		} 
		else 
		{
			 _strTextToDisplay += feedbackTextArray[intSelectedOption];
		}	
	} 
	else 
	{
		 _strTextToDisplay += feedbackTextArray[intSelectedOption];
	}
	
	if ((graphicFileNameArray) && (graphicFileNameArray[intSelectedOption]) && (graphicFileNameArray[intSelectedOption] != "")) 
	{
		if (document.getElementById("optionsTop")) 
		{
			document.getElementById("feedbackImage").innerHTML = "<img border=\"0\" src=\"images/" + graphicFileNameArray[intSelectedOption] + "\">";
			_booShowImage = true;
		} 
		else 
		{
			_strTextToDisplay += "<p><img border=\"0\" src=\"images/" + graphicFileNameArray[intSelectedOption] + "\"></p>";
		}
	}

	if (booAnswered) 
	{
		_strTextToDisplay += "<span class=\"instructionText\" id='finalInstruction'> ";
		if (appTop.booMainWindow) 
		{
			_strTextToDisplay += parent.objNavFrame.getInstruction(true);
		} 
		else 
		{
			_strTextToDisplay += instructionText;
		}
		_strTextToDisplay += "</span>";
	} 
	else 
	{
		_strTextToDisplay += "<span class=\"instructionText\"> " + instructionOnIncorrectAttempt + "</span>";
	}
	
	document.getElementById("feedbackText").innerHTML = _strTextToDisplay;

	if (document.getElementById("optionsTop")) 
	{
		if ((document.getElementById("feedbackImage")) && (_booShowImage)){
			document.getElementById("feedbackImage").style.top = document.getElementById("optionsTop").offsetTop + document.getElementById("questionDiv").offsetTop;
			document.getElementById("feedbackImage").style.visibility = 'visible';
		}
	}

	document.getElementById("feedbackText").style.visibility = 'visible';

	if (markAnswersWithTickOrCross)
	{
		markOption(intSelectedOption, booCorrectResponse);

		if((intAttempts == maxAttempts)&& tickTheCorrectAnswer)
		{
			markOption(intCorrectAnswer,'last');
		}
	}
}

// Function to change the radio button state on the options when one of the option is clicked.
// This function is called when the user click on one of the radio button graphic.
// The function will not do anything if the question has already been answered.
function optionClicked(_intClickedOption)
{
	// if the question has not been booAnswered, then actually do the click action.
	if ((!booAnswered) && (parent.booContentLoaded) && (!booDisabled))
	{
		doOptionClicked(_intClickedOption);
	}
}

// Function to actually change the radio button state, and to record the users response to the question.
function doOptionClicked(_intClickedOption)
{
	if (intSelectedOption != 0)
	{
		document.getElementById("option" + intSelectedOption).src = radio_d.src;
		intSelectedOption = 0;
	}

	document.getElementById("option" + _intClickedOption).src = radio_s.src;

	intSelectedOption = _intClickedOption; // set the intSelectedOption variable to the value of the currectly selected option

	return;
}

var objLastImg = false;
var intLastOneMarked = 0;

function markOption(_intOptionToMark, booCorrect)
{
	//alert(previousSelectedOption+"=="+ intSelectedOption)
	var _objImg = document.getElementById("option" + tickOrCrossOnRight + _intOptionToMark);

	if (intLastOneMarked != _intOptionToMark)
	{
		_objImg.src = (booCorrect) ? objTickImg.src : objCrossImg.src;
		if(booCorrect != 'last')
		{
			if (objLastImg)
			{
				objLastImg.src = objBlankImg.src;
			}

			if (tickOrCrossOnRight)
			{
				objLastImg = _objImg;
			}
		}
	}

	intLastOneMarked = _intOptionToMark;
	return;
}
