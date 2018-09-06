///////////////////////////////////////////////////////////////////////
// EPIC Group PLC
//
// Project Name : 20039
//
// File Description : JavaScript file included with the Drag and Drop put in order and Drag and Drop put in order No Feedback.
//						(dragAndDropPutInOrder.html, dragAndDropPutInOrderNoFeedback.html)
//
// Creation Date : Wai Lam Yau - 01/03/2001
//
// Modification History :
//	Wai Lam Yau - 05/03/2001
//		Removed the hiding of the instruction layer
//	Maria Garcia Pastor -  July-August 2002
//		Addition of some extra feedback and instruction texts for questions with 2 attempts.
//
//
///////////////////////////////////////////////////////////////////////

var maxAttempts; // maximum number of attempts allowed, this value is retrieved from the word template and set inside the html page.
var intAttempts = 0; // number of attempts taken so far.
var objCQIDArray = new Array(); // array to store the correct position of the drag objects
var booAnswered = false; // flag to indicate whether the question has been answered or not.
var intNumberOfOptions; // number of drag objects, calculated from the values in the cqid field in the page
var booTargetHit = false; // flag to indicate whether the drag object hits any of the target when dropped
var objDragArray = new Array(); // Array to store the drag objects
var objTargetArray = new Array(); // Array to store the target objects
var objDragDroppedTargetArray = new Array();
var intButtonState = 0; // currents stateof the confirm button 0 - confirm, 1 - model answer, 2 - my answer, 3 - reset
var intCorrectPos = 0; // number of drag objects have been dropped into the correct position
var booCorrectResponse; // To indicate whether the user have answered the question correctly or not (false/wrong - true/correct)
var booModelAnswerSeen = false;
var confirm_r = new Image(); // Confirm button highlight/rollover state
var confirm_n = new Image(); // Confirm button normal/rollout state
var reset_r = new Image(); // Reset button highlight/rollover state
var reset_n = new Image(); // Reset button normal/rollout state
var moanswer_r = new Image(); // Model Answer button highlight/rollover state
var moanswer_n = new Image(); // Model Answer button normal/rollout state
var myanswer_r = new Image(); // My Answer button highlight/rollover state
var myanswer_n = new Image(); // My Answer button normal/rollout state
var booPartiallyCorrectFlag = false; // Set to true if the user has got at least one of the correct options selected
var objSelectedAnswers = new Array();
var objStyleDivs = new Array("target1Div","target2Div","target3Div","target4Div","target5Div","target6Div","mark1Div","mark2Div","mark3Div","mark4Div","mark5Div","mark6Div");
var isCorrect = false; //whether they got the answer right
var intPageHeight = (appTop.booMainWindow) ? 442 : 368;

var isScenario = false;
var questionResponses = false;

// This function is called when the onload event for the document is triggered
function initialise()
{
	var _strCQID;
	if (parent.objNavFrame) {
		appTop.intPageType = appTop.MATCHINGPAIRS;
		parent.objNavFrame.initPageType();
		if (appTop.booMainWindow)
			appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][1] = appTop.VISITED;
	}

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

	preloadImages();
	writeStyle();
	_strCQID = document.forms[0].elements["cqid"].value;
	objCQIDArray = _strCQID.split("_");
	intNumberOfOptions = objCQIDArray.length;

	for (i=0;i<=intNumberOfOptions;i++)
	{
		objDragDroppedTargetArray[i] = null;
	}

	init();
	document.body.scroll = "no";	
	parent.booContentLoaded = true; 
	intPageHeight = intPageHeight - (intPageHeight - document.getElementById("confirm").offsetTop);	
}

// Function to preload images
// change the .src paths to point to the right directory/file
function preloadImages()
{
	reset_r.src = imagePath + "reset_n.gif";
	reset_n.src = imagePath + "reset_r.gif";	

	if (new String(document.location).indexOf("_cm",0) == -1) {
		confirm_r.src = imagePath + "cnfrm_btn_h.jpg";
		confirm_n.src = imagePath + "cnfrm_btn_n.jpg";
		moanswer_r.src = imagePath + "model_ans_h.gif";
		moanswer_n.src = imagePath + "model_ans_n.gif";
		myanswer_r.src = imagePath + "my_ans_h.gif";
		myanswer_n.src = imagePath + "my_ans_n.gif";
	} else {
		confirm_r.src = imagePath + "coach_cnfrm_btn_h.gif";
		confirm_n.src = imagePath + "coach_cnfrm_btn_n.gif";
		moanswer_r.src = imagePath + "coach_model_ans_h.gif";
		moanswer_n.src = imagePath + "coach_model_ans_n.gif";
		myanswer_r.src = imagePath + "coach_my_ans_h.gif";
		myanswer_n.src = imagePath + "coach_my_ans_n.gif";
	}
}

// This function is called when the onunload event for the document is triggered
function pageUnload()
{
	parent.booContentLoaded = false; // This is to tell the program that this page is being unloaded from the browser.
}

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

function showModelAnswer()
{
	booModelAnswerSeen = true;
	doShowModelAnswer();
	switchToMyButton();
	showFeedback();
}

function showMyAnswer()
{
	booModelAnswerSeen = false;
	doShowMyAnswer();
	switchToModelButton();
	showFeedback();
}

function doShowModelAnswer()
{
	for (var i=1; i<=intNumberOfOptions; i++)
	{
		document.getElementById("drag" + i + "Div").style.top = document.getElementById("target" + parseInt(objCQIDArray[(i-1)]) + "Div").style.top;
	}

	showModelTickNCrosses();
}

function doShowMyAnswer()
{
	for (var i=1; i<=intNumberOfOptions; i++)
	{
		document.getElementById(objDragDroppedTargetArray[i].id).style.top = parseInt(document.getElementById("target" + i + "Div").style.top);
	}
	showTickNCrosses(objSelectedAnswers)
}

function hideInstruction()
{
	document.getElementById("initialInstructionText").style.visibility = "hidden";
}

function showInstruction()
{
	document.getElementById("initialInstructionText").style.visibility = "visible";
}

function resetObjects()
{
	hideFeedback();//hides feedback
	showTickNCrosses(false);//Hides the ticks and crosses
	doResetObjects();
	switchToConfirmButton();
	showInstruction();
}

function doResetObjects()
{
	var _strDivName;
	var _objDiv;
	var _obj;

	for (var i=1; i<=intNumberOfOptions; i++)
	{
		_strDivName = objDragDroppedTargetArray[i].id;
		_obj = eval(_strDivName.replace(/Div/,""));
		_objDiv = document.getElementById(_strDivName);
		_objDiv.style.left = _obj.originalX;
		_objDiv.style.top = _obj.originalY;
		_obj.oldDropTargetNum = 0;
		_obj.dropTargetNum = 0;
		_obj.x = _obj.originalX;
		_obj.y = _obj.originalY;

		objDragDroppedTargetArray[i] = null;
	}
}

function checkAnswer()
{
	switch (intButtonState)
	{
	case 0:
		doCheckAnswer();
		break;
	case 1:
		showModelAnswer();
		break;
	case 2:
		showMyAnswer();
		break;
	case 3:
		resetObjects();
		break;
	default:
		break;
	}

	return;
}

function doCheckAnswer()
{
	var _booAllDropped = true;

	booPartiallyCorrectFlag = false;
	appTop.booAnswerStatus = appTop.NONERIGHT;
	intCorrectPos = 0;

	for (var i=1; i<=intNumberOfOptions; i++)
	{
		if (!objDragDroppedTargetArray[i])
			_booAllDropped = false;
	}

	if (_booAllDropped)
	{
		intAttempts++;

		if (intAttempts == maxAttempts){
			booAnswered = true;
		}
		
		for (var j=0; j<intNumberOfOptions; j++)
		{
			if (objDragDroppedTargetArray[(j+1)].dropTargetNum == parseInt(objCQIDArray[(objDragDroppedTargetArray[(j+1)].dragOptionNum-1)]))
			{
				appTop.booAnswerStatus = appTop.SOMERIGHT;
				intCorrectPos++;
				objSelectedAnswers[objSelectedAnswers.length] = 1;
				booPartiallyCorrectFlag = true;
			}
			else
			{
				objSelectedAnswers[objSelectedAnswers.length] = 0;
			}
		}

		if (intCorrectPos == intNumberOfOptions)
		{
			appTop.booAnswerStatus = appTop.ALLRIGHT;
			document.getElementById("confirm").style.visibility = "hidden";
			booCorrectResponse = true;
			booAnswered = true;
		}
		else if (booAnswered)
		{
			booCorrectResponse = false;
			switchToModelButton();
		}
		else
		{
			booCorrectResponse = false;
			switchToResetButton();
		}

		showFeedback();
		hideInstruction();
		showTickNCrosses(objSelectedAnswers);

		if (intAttempts < maxAttempts)
		{
			objSelectedAnswers = null;
			objSelectedAnswers = new Array();
		}
	}
	else
	{
		alert(appTop.objGenericText["mustdropallobject"]);
	}
}


//var rightCounter = 0;
// Function to display the appropriate feedback layer
function showFeedback()
{
	var _strTextToDisplay = "";
	var _strInsString;

	document.getElementById("feedbackText").style.height = intPageHeight - (document.getElementById("feedbackText").offsetTop) - 10;	

	if (intCorrectPos == intNumberOfOptions) 
	{
		isCorrect = true;
		booAnswered = true;
		document.getElementById("confirm").style.visibility = "hidden";
		appTop.addToTotalScores++;

		if (!appTop.objCurrentState.objUnit.booAssessment)
		{
			if (appTop.booMainWindow && parent.objNavFrame)
			{
				if (!appTop.objCurrentState.objUnit.checkTaskQDone())
					parent.objToolsFrame.checkComms();
	
				if (taskQuestion) 
				{
					appTop.objCurrentState.objUnit.setTaskQComplete();
					parent.objNavFrame.showNext();
				}
			}

			if (questionResponses) 
			{
				_strTextToDisplay += getResponse();
			}

			_strTextToDisplay += correctFeedback;
			_strTextToDisplay += "<span class=\"instructionText\" id='finalInstruction'>"

			if (appTop.booMainWindow) 
			{
				_strTextToDisplay += parent.objNavFrame.getInstruction(true) 
			} 
			else 
			{
				if ((appTop.objCurrentState.objUnit.intCurrentPage == (appTop.objCurrentState.objUnit.objNavArray.length-1)) && appTop.booFromQuickFind)
				{
					finalInstruction = "That completes this <b>Coach me</b>. Click <b>Return to quickfind</b> or <b>Close</b>.";
				}
				
				_strTextToDisplay += finalInstruction;
			}

			_strTextToDisplay += "</span>";
		}

		if ((parent.objNavFrame) && (taskQuestion))
			parent.objNavFrame.showNext();
	} 
	else 
	{
// WAI - temporary so that designer can check second wrong feedback without doing the coachme
		if ((intAttempts == 1) && (taskQuestion))
			disableQuestion();
			
		if ((booAnswered) && (parent.objNavFrame) && (appTop.booMainWindow))
		{
			if (!appTop.objCurrentState.objUnit.checkTaskQDone())
				parent.objToolsFrame.checkComms();

			if (taskQuestion)
				appTop.objCurrentState.objUnit.setTaskQComplete();
		}
		
		if (questionResponses) 
		{
			_strTextToDisplay += getResponse();
		}		

		if (intAttempts == maxAttempts)
		{
			if ((parent.objNavFrame) && (taskQuestion))
				parent.objNavFrame.showNext();

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
				_strInsString = (intButtonState==1)?instructionOnFinalIncorrectAttempt:afterModelAnswerInstruction;
				if ((appTop.objCurrentState.objUnit.intCurrentPage == (appTop.objCurrentState.objUnit.objNavArray.length-1)) && appTop.booFromQuickFind)
				{
					finalInstruction = "That completes this <b>Coach me</b>. Click <b>Return to quickfind</b> or <b>Close</b>.";
				}

				_strInsString = _strInsString.replace(/, or click <b>Next<\/b> to continue./gi,". " + finalInstruction);
			}

			_strTextToDisplay += finalIncorrectFeedback;
			_strTextToDisplay += "<span class=\"instructionText\" id='finalInstruction'> " + _strInsString + "</span>";
			booAnswered = true;
		} 
		else 
		{
			_strTextToDisplay += retryFeedbackOptional;
			_strTextToDisplay += "<p class=\"instructionText\"> " + instructionOnIncorrectAttempt + "</p>";
		}	

	}

	document.getElementById("feedbackText").innerHTML = _strTextToDisplay;
	document.getElementById("feedbackText").style.visibility = 'visible';	
}

function disableQuestion()
{
	if ((parent.objToolsFrame) && (appTop.booDoDisableTask))
	{
		booDisableDragDrop = true;
		document.getElementById("confirm").style.visibility = "hidden";
		appTop.objCurrentState.objUnit.booDoCoachMeCheck = true;
		parent.objToolsFrame.flashButton("coachMe");
	}
}

function enableQuestion()
{
	booDisableDragDrop = false;
	document.getElementById("feedbackText").innerHTML = "<span class='instructionText'>" + initialInstruction.substring(0, initialInstruction.length-1) + appTop.objGenericText["secondattemptinstruction"] + "</span>";	
	document.getElementById("confirm").style.visibility = "visible";
}

function hideFeedback()
{
	if (document.getElementById("feedbackAreaBackground"))
		document.getElementById("feedbackAreaBackground").style.visibility = "hidden";
	document.getElementById("feedbackText").style.visibility = 'hidden';
}

function switchToConfirmButton()
{
	intButtonState = 0;
	changeImage("confirm_r");
}

function switchToModelButton()
{
	intButtonState = 1;
	changeImage("confirm_r");
	if (parent.objNavFrame)
		parent.objNavFrame.checkInstruction();
}

function switchToMyButton()
{
	intButtonState = 2;
	changeImage("confirm_r");
	if (parent.objNavFrame)
		parent.objNavFrame.checkInstruction();
}

function switchToResetButton()
{
	if(retryWithoutReset)
	{
		instructionOnIncorrectAttempt = instructionOnIncorrectAttempt;
	}
	else
	{
		intButtonState = 3;
		changeImage("confirm_r");
	}
}

function writeStyle() 
{
	var _objDiv;
	
	for (n=0; n<objStyleDivs.length; n++) 
	{
		_objDiv = document.getElementById(objStyleDivs[n]);
	
		if (_objDiv) 
		{
			_objDiv.style.left = _objDiv.offsetLeft;
			_objDiv.style.top = _objDiv.offsetTop;
		}
	}
}

//
// Drag and Drop stuff
//
function init() {
	DynLayerInit()
	for (i=0;i<intNumberOfOptions;i++)
	{
		objDragArray[i] = eval("drag"+(i+1));
		objTargetArray[i] = eval("target"+(i+1));
	}
	drag.add(objDragArray)
	drag.addTargets(objTargetArray)
	drag.onDragDrop = hitTarget
	drag.onDragEnd = dragEnded
	initMouseEvents()
}

function dragEnded()
{
	if (!booTargetHit)
	{
		dragObj = eval(this.obj.id);
		dragObj.style.left = this.obj.originalX;
		dragObj.style.top = this.obj.originalY;
		objDragDroppedTargetArray[this.obj.dropTargetNum] = null;
		this.obj.oldDropTargetNum = 0;
		this.obj.dropTargetNum = 0;
		this.obj.x = this.obj.originalX;
		this.obj.y = this.obj.originalY;
	}

	booTargetHit = false;
}

function hitTarget() {
	var swapped = false;
	booTargetHit = true;

	dragObj = eval(this.obj.id);
	targetObj = eval(this.targetHit.id);
	dragObj.style.left = parseInt(targetObj.style.left);
	dragObj.style.top = parseInt(targetObj.style.top);

	if (objDragDroppedTargetArray[this.obj.dropTargetNum])
		swapped = swapObj(this.obj);

	if (!swapped)
		objDragDroppedTargetArray[this.obj.oldDropTargetNum] = null;

	objDragDroppedTargetArray[this.obj.dropTargetNum] = this.obj;
	this.obj.x = this.targetHit.x;
	this.obj.y = this.targetHit.y;
}

function swapObj(obj)
{
	var firstObjDiv = objDragDroppedTargetArray[obj.dropTargetNum].id;
	var secondObjDiv = obj.id;
	var firstObj = eval(firstObjDiv.replace(/Div/,""));
	var secondObj = eval(secondObjDiv.replace(/Div/,""));
	var swapTarget;

	if (secondObj.oldDropTargetNum == 0)
	{
		firstObjDiv = eval(firstObjDiv);
		firstObjDiv.style.left = firstObj.originalX;
		firstObjDiv.style.top = firstObj.originalY;// +5;
		firstObj.oldDropTargetNum = 0;
		firstObj.dropTargetNum = 0;
		firstObj.x = firstObj.originalX;
		firstObj.y = firstObj.originalY;
	}
	else
	{
		firstObjDiv = eval(firstObjDiv);
		secondObjDiv = eval(secondObjDiv);
		swapTarget = eval("target"+secondObj.oldDropTargetNum);
		firstObjDiv.style.left = swapTarget.x;
		firstObjDiv.style.top = swapTarget.y;
		firstObj.x = parseInt(firstObjDiv.style.left);
		firstObj.y = parseInt(firstObjDiv.style.top);
		firstObj.oldDropTargetNum = firstObj.dropTargetNum;
		firstObj.dropTargetNum = secondObj.oldDropTargetNum;
		objDragDroppedTargetArray[firstObj.dropTargetNum] = firstObj;
	}

	return true;
}


function showTickNCrosses(objSelectedAnswers){
	var alternativeImg =(objSelectedAnswers)?"cross.gif":"trans.gif";
	var placeHolder;
	for(var i=1;i<=intNumberOfOptions;i++){
		placeHolder = eval("mark"+i+"img");
		if(objSelectedAnswers[i-1]==1){
			placeHolder.src = imagePath + "tick.gif";
		}else{
			placeHolder.src = imagePath + alternativeImg;
		}
	}
}

function showModelTickNCrosses(){
	var placeHolder;
	for(var i=1;i<=intNumberOfOptions;i++){
		placeHolder = eval("mark"+i+"img");
		placeHolder.src = imagePath + "tick.gif";
	}
}