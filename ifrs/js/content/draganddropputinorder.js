///////////////////////////////////////////////////////////////////////
// EPIC Group PLC
//
// Project Name : 10014
//
// File Description : JavaScript file included with the Drag and Drop put in order and Drag and Drop put in order No Feedback.
//						(dragAndDropPutInOrder.html, dragAndDropPutInOrderNoFeedback.html) 
//		
// Creation Date : Wai Lam Yau - 01/03/2001
//		
// Modification History :
//	Wai Lam Yau - 05/03/2001
//		Removed the hiding of the instruction layer
//
///////////////////////////////////////////////////////////////////////

var maxAttempts; // maximum number of attempts allowed, this value is retrieved from the word template and set inside the html page.
var attempts = 0; // number of attempts taken so far.
var cqidArray = new Array(); // array to store the correct position of the drag objects
var answered = false; // flag to indicate whether the question has been answered or not.
var numberOfOptions; // number of drag objects, calculated from the values in the cqid field in the page
var targetHit = false; // flag to indicate whether the drag object hits any of the target when dropped
var dragArray = new Array(); // Array to store the drag objects
var targetArray = new Array(); // Array to store the target objects
var dragDroppedTargetArray = new Array();
var buttonState = 0; // currents stateof the confirm button 0 - confirm, 1 - model answer, 2 - my answer, 3 - reset
var correctPos = 0; // number of drag objects have been dropped into the correct position
var correctResponse; // To indicate whether the user have answered the question correctly or not (false/wrong - true/correct)
var feedbackBackground; // flag to indicate whether the feedbackAreaImage layer existed or not.
var modelAnswerSeen = false;
var correctColor = "#DDFFDD"; // the correct background color for the drag objects
var incorrectColor = "B7DBEC"; // the incorrect background color for the drag objects
var partiallyCorrectFlag = false; // Set to true if the user has got at least one of the correct options selected

var confirm_r = new Image(); // Confirm button highlight/rollover state
var confirm_n = new Image(); // Confirm button normal/rollout state
var reset_r = new Image(); // Reset button highlight/rollover state
var reset_n = new Image(); // Reset button normal/rollout state
var moanswer_r = new Image(); // Model Answer button highlight/rollover state
var moanswer_n = new Image(); // Model Answer button normal/rollout state
var myanswer_r = new Image(); // My Answer button highlight/rollover state
var myanswer_n = new Image(); // My Answer button normal/rollout state

var selectedAnswers = new Array();

// This function is called when the onload event for the document is triggered
function initialise()
{
	var cqidString;

	if (parent.nav) {
		top.pageType = top.DRAGDROPPIO;
		parent.nav.initPageType();
		if (top.mainWindow)
			top.currentState.unit.navArray[top.currentState.unit.currentPage][1] = top.VISITED;
	}

	preloadImages();

	feedbackBackground = findFeedbackBackground();

	cqidString = optionsForm.cqid.value+"";
	cqidArray = cqidString.split("_");
	numberOfOptions = cqidArray.length;
	for (i=0;i<=numberOfOptions;i++)
		dragDroppedTargetArray[i] = null;

	init();
	if(initialAudioFile){playAudio(initialAudioFile);}
	document.body.scroll = "no";	parent.contentLoaded = true; // This is to tell the program that this page have been loaded.
}

// Function to preload images
// change the .src paths to point to the right directory/file
function preloadImages()
{
	confirm_r.src = imagePath + "confirm_r.gif";
	confirm_n.src = imagePath + "confirm_n.gif";
	reset_r.src = imagePath + "reset_r.gif";
	reset_n.src = imagePath + "reset_n.gif";
	moanswer_r.src = imagePath + "model_ans_r.gif";
	moanswer_n.src = imagePath + "model_ans_n.gif";
	myanswer_r.src = imagePath + "my_ans_r.gif";
	myanswer_n.src = imagePath + "my_ans_n.gif";
}

function findFeedbackBackground()
{
	var found = false;

	for (var i=0; i<document.all.length; i++)
	{
		if (document.all[i].id)
		{
			if (document.all[i].id.indexOf("feedbackAreaBackground",0) != -1)
			{
				found = true;
				break;
			}
		}
	}
	return found;
}

// This function is called when the onunload event for the document is triggered
function pageUnload()
{
	if(typeof(audioIsPlaying)!="undefined")
	{
		clearAudio();
	}
	parent.contentLoaded = false; // This is to tell the program that this page is being unloaded from the browser.
}

function changeImage(imgState)
{
	var imgObj;
	var img = imgState.split("_");

	imgObj = eval("document.images['"+img[0]+"Img']");
	if (parent.contentLoaded)
	{
		switch (buttonState)
		{
		case 0:
			newImage = eval(imgState);
			break;
		case 1:
			newImage = eval("moanswer_"+img[1]);
			break;
		case 2:
			newImage = eval("myanswer_"+img[1]);
			break;
		case 3:
			newImage = eval("reset_"+img[1]);
			break;
		default:
			break;
		}
		
		imgObj.src = newImage.src;
	}
}

function showModelAnswer()
{
	modelAnswerSeen = true;
	doShowModelAnswer();
	switchToMyButton();
	showFeedback();
}

function showMyAnswer()
{
	modelAnswerSeen = false;
	doShowMyAnswer();
	switchToModelButton();
	showFeedback();
}

function doShowModelAnswer()
{
	var dragObjDivToMove;
	var moveToTarget;
	
	for (var i=1;i<=numberOfOptions;i++)
	{
		dragObjDivToMove = eval("document.all['drag"+i+"Div']");
		moveToTarget = eval("document.all['target"+parseInt(cqidArray[(i-1)])+"Div']");
		dragObjDivToMove.style.top = moveToTarget.style.top;
		if(highlightTheCorrectAnswer)
		{dragObjDivToMove.style.backgroundColor = correctColor;}
	}
	showModelTickNCrosses();
}

function doShowMyAnswer()
{
	var dragObjDivToMove;
	var moveToTarget;
	
	for (var i=1;i<=numberOfOptions;i++)
	{
		dragObjDivToMove = eval("document.all['"+dragDroppedTargetArray[i].id+"']");
		moveToTarget = eval("document.all['target"+i+"Div']");
		dragObjDivToMove.style.top = parseInt(moveToTarget.style.top);
		if(highlightTheCorrectAnswer)
		{
			if (dragDroppedTargetArray[i].dropTargetNum != parseInt(cqidArray[(dragDroppedTargetArray[i].dragOptionNum-1)]))
			{
				dragObjDivToMove.style.backgroundColor = incorrectColor;
			}
		}
	}
	showTickNCrosses(selectedAnswers)
}

function hideInstruction()
{
	document.all['questionWithoutInstructionLayer'].style.visibility = "visible";
	document.all['questionLayer'].style.visibility = "hidden";
}

function showInstruction()
{
	document.all['questionWithoutInstructionLayer'].style.visibility = "hidden";
	document.all['questionLayer'].style.visibility = "visible";
}

function resetObjects()
{
	hideFeedback();
	showTickNCrosses(0);//Hides the ticks and crosses
	doResetObjects();
	switchToConfirmButton();
	showInstruction();
}

function doResetObjects()
{
	var objDivName;
	var objDiv;
	var obj;

	for (var i=1; i<=numberOfOptions; i++)
	{
		objDivName = dragDroppedTargetArray[i].id;
		obj = eval(objDivName.replace(/Div/,""));	
		objDiv = eval(objDivName);
		objDiv.style.left = obj.originalX;
		objDiv.style.top = obj.originalY;
		obj.oldDropTargetNum = 0;
		obj.dropTargetNum = 0;
		obj.x = obj.originalX;	
		obj.y = obj.originalY;	
		dragDroppedTargetArray[i] = null;
	}
}

function checkAnswer()
{
	switch (buttonState)
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
	partiallyCorrectFlag = false;
	var allDropped = true;
	var divObj;
	var dragColorFilter = new Array();
	
	correctPos = 0;

	for (var i=1;i<=numberOfOptions;i++)
	{
		if (!dragDroppedTargetArray[i])
			allDropped = false;
	}

	if (allDropped)
	{
		attempts++;
		
		if (attempts == maxAttempts)
			answered = true;
		
		for (var j=0;j<numberOfOptions;j++)
		{
			if (dragDroppedTargetArray[(j+1)].dropTargetNum == parseInt(cqidArray[(dragDroppedTargetArray[(j+1)].dragOptionNum-1)]))
			{
				correctPos++;
				selectedAnswers[selectedAnswers.length] = 1;
				if(highlightTheCorrectAnswer)
				{dragColorFilter[dragColorFilter.length] = correctColor;}
				partiallyCorrectFlag = true;
			}
			else
			{
				selectedAnswers[selectedAnswers.length] = 0;
				if(highlightTheCorrectAnswer)
				{dragColorFilter[dragColorFilter.length] = incorrectColor;}
			}
		}

		if (correctPos == numberOfOptions)
		{
			document.all['confirm'].style.visibility = "hidden";
			correctResponse = true;
			answered = true;
		}		
		else if (answered)
		{
			correctResponse = false;
			switchToModelButton();
		}
		else
		{
			correctResponse = false;
			switchToResetButton();
		}

		if (answered)
		{
			for (var k=0; k<numberOfOptions; k++)
			{
				divObj = eval("document.all['"+dragDroppedTargetArray[(k+1)].id+"']");
				divObj.style.backgroundColor = dragColorFilter[k];
			}
		}
		showTickNCrosses(selectedAnswers);
		showFeedback();
		hideInstruction();
		if(attempts < maxAttempts){
			selectedAnswers = void null;
			selectedAnswers = new Array();
		}
		playAudioFeedback();
	}
	else
	{
		alert("You must drop all the objects into the targets before you can confirm your choice.");
	}
}

function playAudioFeedback()
{
	if(audioFeedback)
	{		
		if (correctResponse)
		{
			if(feedbackAudioFileNameArray[0])
			{
				playAudio(feedbackAudioFileNameArray[0]);
			}
		}
		else
		{
			var audioIndexToPlay = (partiallyCorrectFlag)?attempts:(attempts+2);
			if(feedbackAudioFileNameArray[audioIndexToPlay])
			{
				playAudio(feedbackAudioFileNameArray[audioIndexToPlay]);
			}
		}
	}	
}

function showFeedback()
{
	var currentInstruction = "";
	var textToDisplay = "";
	if (correctResponse)
	{
		textToDisplay = correctFeedbackText;
	}
	else
	{	
		var feedbackOnFail = eval("attempt"+attempts+"FailedFeedbackText");
		if(partiallyCorrectFlag)
		{
			feedbackOnFail = eval("attempt"+attempts+"PartiallyCorrectFeedbackText");
		}
		textToDisplay = feedbackOnFail;
	}

	if(answered)
	{
		if(correctResponse)
		{
			currentInstruction = instructionText;
		}
		else
		{
			if(modelAnswerSeen)
			{
				currentInstruction = afterModelAnswerInstruction;
			}
			else
			{
				currentInstruction = instructionOnFinalIncorrectAttempt;
			}
		}	
	}
	else
	{
		currentInstruction = instructionOnIncorrectAttempt;
	}	
	
	textToDisplay += "<span class=\"instructionText\">&nbsp;"+currentInstruction+"</span>";
	
	if (feedbackBackground)
		document.all['feedbackAreaBackground'].style.visibility = "visible";
	document.all['feedbackText'].innerHTML = textToDisplay;
	document.all['feedbackText'].style.visibility = 'visible';
}

function hideFeedback()
{
	if (feedbackBackground)
		document.all['feedbackAreaBackground'].style.visibility = "hidden";
	document.all['feedbackText'].style.visibility = 'hidden';
}

function switchToConfirmButton()
{
	buttonState = 0;
	changeImage("confirm_r");
}

function switchToModelButton()
{
	buttonState = 1;
	changeImage("confirm_r");
}

function switchToMyButton()
{
	buttonState = 2;
	changeImage("confirm_r");
}

function switchToResetButton()
{
	if(retryWithoutReset)
	{
		instructionOnIncorrectAttempt = initialInstructionText;
	}
	else
	{
		buttonState = 3;
		changeImage("confirm_r");
	}
}

//
// Drag and Drop stuff
//
function init() {
	DynLayerInit()
	for (i=0;i<numberOfOptions;i++)
	{
		dragArray[i] = eval("drag"+(i+1));
		targetArray[i] = eval("target"+(i+1));
	}
	drag.add(dragArray)
	drag.addTargets(targetArray)
	drag.onDragDrop = hitTarget
	drag.onDragEnd = dragEnded
	initMouseEvents()
}

function dragEnded()
{
	if (!targetHit)
	{	
		dragObj = eval(this.obj.id);
		dragObj.style.left = this.obj.originalX;
		dragObj.style.top = this.obj.originalY;
		dragDroppedTargetArray[this.obj.dropTargetNum] = null;
		this.obj.oldDropTargetNum = 0;
		this.obj.dropTargetNum = 0;
		this.obj.x = this.obj.originalX;	
		this.obj.y = this.obj.originalY;	
	}

	targetHit = false;
}

function hitTarget() {
	var swapped = false;
	targetHit = true;

	dragObj = eval(this.obj.id);
	targetObj = eval(this.targetHit.id);
	dragObj.style.left = parseInt(targetObj.style.left);
	dragObj.style.top = parseInt(targetObj.style.top);

	if (dragDroppedTargetArray[this.obj.dropTargetNum])
		swapped = swapObj(this.obj);

	if (!swapped)
		dragDroppedTargetArray[this.obj.oldDropTargetNum] = null;

	dragDroppedTargetArray[this.obj.dropTargetNum] = this.obj;
	this.obj.x = this.targetHit.x;
	this.obj.y = this.targetHit.y;
}

function swapObj(obj)
{
	var firstObjDiv = dragDroppedTargetArray[obj.dropTargetNum].id;
	var secondObjDiv = obj.id;
	var firstObj = eval(firstObjDiv.replace(/Div/,""));
	var secondObj = eval(secondObjDiv.replace(/Div/,""));
	var swapTarget;

	if (secondObj.oldDropTargetNum == 0)
	{
		firstObjDiv = eval(firstObjDiv);
		firstObjDiv.style.left = firstObj.originalX;
		firstObjDiv.style.top = firstObj.originalY;
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
		dragDroppedTargetArray[firstObj.dropTargetNum] = firstObj;
	}

	return true;
}

function showTickNCrosses(selectedAnswers){
	if(tickAndCross)
	{
		var alternativeImg =(selectedAnswers)?"cross.gif":"trans.gif";
		var placeHolder;
		for(var i=1;i<=numberOfOptions;i++){
			placeHolder = eval("mark"+i+"img");
			if(selectedAnswers[i-1]==1){
				placeHolder.src = imagePath + "tick.gif";
			}else{
				placeHolder.src = imagePath + alternativeImg;
			}
		}
	}
}

function showModelTickNCrosses(){
	if(tickAndCross)
	{
		var placeHolder;
		for(var i=1;i<=numberOfOptions;i++){
			placeHolder = eval("mark"+i+"img");
			placeHolder.src = imagePath + "tick.gif";
		}
	}
}