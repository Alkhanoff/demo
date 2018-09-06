var pageCompleted = false;
var intAttempts = 0;
var intMaxAttempts = 0;
var objAnswerArray = new Array();
var objYourAnsArray = new Array();
var confirm_r = new Image(); // Confirm button highlight/rollover state
var confirm_n = new Image(); // Confirm button normal/rollout state
var moanswer_r = new Image(); // Model Answer button highlight/rollover state
var moanswer_n = new Image(); // Model Answer button normal/rollout state
var myanswer_r = new Image(); // My Answer button highlight/rollover state
var myanswer_n = new Image(); // My Answer button normal/rollout state
var objTick = new Image();
var objCross = new Image();
var intButtonState = 0; // 0 - confirm, 1 - model answer, 2 - my answer, 3 - reset
var objPositionArray = new Array();
var booInModelAnswer = false;
var isCorrect = false; //whether they got the answer right
var intPageHeight = (appTop.booMainWindow) ? 442 : 368;

var isScenario = false;
var booPageFound = false;

function initialise(){
	if (!appTop.booMainWindow)
	{
		if (isScenario)
		{
			intPageHeight = (isScenario) ? 442 : 368;
		}
		else
		{
			intPageHeight = 368;
		}
	}

	if (parent.objNavFrame) 
	{
		appTop.intPageType = appTop.WORDMATCH;
		parent.objNavFrame.initPageType();
		if (appTop.booMainWindow)
			appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][1] = appTop.VISITED;
	}
	

	preloadImages();
	intMaxAttempts = numOfAttemps;
	initialisePositionArray();
	document.body.scroll = "no";	
	parent.booContentLoaded = true; 
}

// Function to preload images
// change the .src paths to point to the right directory/file
function preloadImages()
{
	objTick.src = imagePath + "wm_tick.gif";
	objCross.src = imagePath + "wm_cross.gif";

	if (new String(document.location).indexOf("_cm",0) == -1) { //typeof top.coachMe == "undefined") {
		confirm_n.src = imagePath + "cnfrm_btn_n.jpg";
		confirm_r.src = imagePath + "cnfrm_btn_h.jpg";
		moanswer_r.src = imagePath + "model_ans_h.gif";
		moanswer_n.src = imagePath + "model_ans_n.gif";
		myanswer_r.src = imagePath + "my_ans_h.gif";
		myanswer_n.src = imagePath + "my_ans_n.gif";		
	} else {
		confirm_n.src = imagePath + "coach_cnfrm_btn_n.gif";
		confirm_r.src = imagePath + "coach_cnfrm_btn_h.gif";
		moanswer_r.src = imagePath + "coach_model_ans_h.gif";
		moanswer_n.src = imagePath + "coach_model_ans_n.gif";
		myanswer_r.src = imagePath + "coach_my_ans_h.gif";
		myanswer_n.src = imagePath + "coach_my_ans_n.gif";		
	}

	intPageHeight = intPageHeight - (intPageHeight - (document.getElementById("confirm").offsetParent.offsetTop + document.getElementById("confirm").offsetTop));	
	document.getElementById("feedbackText").style.height = intPageHeight - (document.getElementById("feedbackText").offsetTop + document.getElementById("mainContent").offsetTop) - 10;;	
}

// Function to change the confirm button image to it's varies states.
// This is called when the mouse is rolled over/out of the confirm button,
// and when the user clicked on the confirm button without selecting one of the options.
function changeImage(_strImgState)
{
	var _arrImg = _strImgState.split("_");
	var _objImageState;

	if (parent.booContentLoaded)
	{
		switch (intButtonState)
		{
		case 0:
			_objImageState = eval(_strImgState);
			break;
		case 1:
			_objImageState = eval("moanswer_" + _arrImg[1]);
			break;
		case 2:
			_objImageState = eval("myanswer_" + _arrImg[1]);
			break;
		default:
			break;
		}
		
		document.getElementById(_arrImg[0] + "Img").src = _objImageState.src;
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
function checkAnswer(selectedList,correctAnswer,listNum)
{
	switch (intButtonState)
	{
	case 0:
		doCheckAnswer();
		break;
	case 1:
		showModelAns();
		break;
	case 2:
		showYourAns();
		break;
	default:
		break;
	}

	return;
}

// Function to switch the confirm button to Model Answer button
function switchToModelButton()
{
	intButtonState = 1;

	changeImage("confirm_r");

	if (appTop.booMainWindow) 
	{
		parent.objNavFrame.checkInstruction();
	}
}

// Function to switch the confirm button to My Answer button
function switchToMyButton()
{
	intButtonState = 2;

	changeImage("confirm_r");

	if (appTop.booMainWindow) 
	{
		parent.objNavFrame.checkInstruction();
	}
}

function initialisePositionArray()
{
	var _intCount = 1;
	
	while (document.forms[0].elements["selectList_" + _intCount])
	{
		objPositionArray[objPositionArray.length] = parseInt(document.forms[0].elements["selectList_" + _intCount].style.zIndex);
		_intCount++;
	}
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
		showFeedback()
	}
}

function disableQuestion()
{
	if ((parent.objToolsFrame) && (appTop.booDoDisableTask))
	{
		disableLists();
		document.getElementById("confirm").style.visibility = "hidden"; // temporary disable mechanism
		appTop.objCurrentState.objUnit.booDoCoachMeCheck = true;
		parent.objToolsFrame.flashButton("coachMe");
	}
}

function enableQuestion()
{
	var _strInitialInstruction = document.getElementById("initialInstructionText").innerHTML;
	var _strTextToDisplay = _strInitialInstruction.substring(0, _strInitialInstruction.length-1) + appTop.objGenericText["secondattemptinstruction"];
	
	enableLists();

	document.getElementById("feedbackText").innerHTML = "<span class='instructionText'>" + _strTextToDisplay + "</span>";	
	document.getElementById("confirm").style.visibility = "visible"; // temporary enable mechanism
}

function showFeedback()
{
	var _booAllCorrect = true;
	var _booAnswered = false;
	var _strTextToDisplay = "";
	var _strInstructionText;
	var _strInsString;

//	document.getElementById("feedbackText").style.height = intPageHeight - (document.getElementById("feedbackText").offsetTop + document.getElementById("mainContent").offsetTop) - 10;;	

	if (intButtonState == 0)
	{
		intAttempts++;
	}

	appTop.booAnswerStatus = appTop.NONERIGHT;

	for (i=1; i<=numOfDropDowns; i++)
	{
		if (objAnswerArray[i] == 1)
		{
			appTop.booAnswerStatus = appTop.SOMERIGHT;
			if (intButtonState == 0)
			{
				document.getElementById("markImg_" + i).src = objTick.src;
			}
		}
		else
		{
			_booAllCorrect = false;
			if (intButtonState == 0)
			{
				document.getElementById("markImg_" + i).src = objCross.src;
			}
		}
	}
	
	if (_booAllCorrect)
	{
		appTop.booAnswerStatus = appTop.ALLRIGHT;
		isCorrect = true;
		_booAnswered = true;
		document.getElementById("confirm").style.visibility = "hidden";
		appTop.addToTotalScores++;

		if (!appTop.objCurrentState.objUnit.booAssessment)
		{
			if (appTop.booMainWindow)
			{
				if(taskQuestion)
				{
					if (!appTop.objCurrentState.objUnit.checkTaskQDone())
						parent.objToolsFrame.checkComms();
		
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

			if (questionResponses) 
			{
				_strTextToDisplay += getResponse();
			}
			
			_strTextToDisplay += correctFeedbackText;
			_strTextToDisplay += "<span class=\"instructionText\" id='finalInstruction'>"
			
			if (appTop.booMainWindow) 
			{
				_strTextToDisplay += parent.objNavFrame.getInstruction(true) 
			} 
			else 
			{
				if ((appTop.objCurrentState.objUnit.intCurrentPage == (appTop.objCurrentState.objUnit.objNavArray.length-1)) && appTop.booFromQuickFind)
				{
					_strInstructionText = "That completes this <b>Coach me</b>. Click <b>Return to quickfind</b> or <b>Close</b>.";
				}
				
				_strTextToDisplay += instructionText;
			}
			_strTextToDisplay += "</span>";
		}
		disableLists();

		if (!appTop.booMainWindow)
		{
			document.getElementById("feedbackText").style.height = parseInt(document.getElementById("feedbackText").style.height) + 50;
		}
	}
	else
	{
		if (questionResponses) 
		{
			_strTextToDisplay += getResponse();
		}

		if ((intAttempts == 1) && (taskQuestion))
		{
			disableQuestion();
		}
			
		if (((_booAnswered)||(intAttempts==intMaxAttempts)) && (appTop.booMainWindow))
		{
			if(taskQuestion)
			{
				if (!appTop.objCurrentState.objUnit.checkTaskQDone())
					parent.objToolsFrame.checkComms();
		
				if ((parent.objNavFrame) && (taskQuestion)) 
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
	
		if (intAttempts == intMaxAttempts) 
		{
			_strTextToDisplay += finalIncorrectFeedback;
			if (intButtonState == 0)
			{
				switchToModelButton();
			}
			
			if (appTop.booMainWindow) 
			{
				_strInsString = parent.objNavFrame.getInstruction(true);
				
			} 
			else 
			{
				_strInsString = (intButtonState == 1) ? instructionOnFinalIncorrectAttempt : afterModelAnswerInstruction;
				
				if ((appTop.objCurrentState.objUnit.intCurrentPage == (appTop.objCurrentState.objUnit.objNavArray.length-1)) && top.fromQuickFind)
				{
					_strInstructionText = "That completes this <b>Coach me</b>. Click <b>Return to quickfind</b> or <b>Close</b>.";
				}
				
				_strInsString = _strInsString.replace(/, or click <b>Next<\/b> to continue./gi,". " + _strInstructionText);
			}
			
			_strInsString = (intButtonState == 1) ? instructionOnFinalIncorrectAttempt : afterModelAnswerInstruction;
			
			_strTextToDisplay += "<span class=\"instructionText\" id='finalInstruction'> " + _strInsString + "</span>";
			_booAnswered = true;
			disableLists();
		} 
		else 
		{
			_strTextToDisplay += retryFeedbackOptional;
			_strTextToDisplay += "<font class=\"instructionText\"> " + instructionOnIncorrectAttempt + "</font>";
		}	

	}
	
	document.getElementById("feedbackText").innerHTML = _strTextToDisplay;
	document.getElementById("feedbackText").style.visibility = 'visible';	
}

function showModelAns()
{
	var _objList;
	
	inModelAnswer = true;

	switchToMyButton();

	for (i=1; i<=numOfDropDowns; i++)
	{
		_objList = document.forms[0].elements["selectList_" + i];
		objYourAnsArray[i] = _objList.options[_objList.selectedIndex].text;
		_objList.options[_objList.selectedIndex].text = _objList.options[objPositionArray[i-1]].text;
		document.getElementById("markImg_" + i).src = objTick.src;
	}

	showFeedback()
}

function showYourAns()
{
	var _objList;

	inModelAnswer = false;

	switchToModelButton();

	for (i=1; i<=numOfDropDowns; i++)
	{
		_objList = document.forms[0].elements["selectList_" + i];
		_objList.options[_objList.selectedIndex].text = objYourAnsArray[i];

		if( objAnswerArray[i] != 1)
		{
			document.getElementById("markImg_" + i).src = objCross.src;
		}
	}

	showFeedback()
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
