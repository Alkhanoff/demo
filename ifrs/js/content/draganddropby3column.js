var maxAttempts; // maximum number of attempts allowed, this value is retrieved from the word template and set inside the html page.
var attempts = 0; // number of attempts taken so far.
var cqidArray = new Array(); // array to store the correct position of the drag objects
var answered = false; // flag to indicate whether the question has been answered or not.
var numberOfOptions; // number of drag objects, calculated from the values in the cqid field in the page
var targetHit = false; // flag to indicate whether the drag object hits any of the target when dropped
var dragArray = new Array(); // Array to store the drag objects
var targetArray = new Array(); // Array to store the target objects
var column1DroppedObjArray = new Array(); // Store the objects dropped into the first column
var column2DroppedObjArray = new Array(); // Store the objects dropped into the second column
var column3DroppedObjArray = new Array(); // Store the objects dropped into the third column
var orginalColumn1Y; // Store the original Y coordinate of the first column
var orginalColumn2Y; // Store the original Y coordinate of the second column
var orginalColumn3Y; // Store the original Y coordinate of the third column
var column1Y; // Current Y coordinate of the first column
var column2Y; // Current Y coordinate of the second column
var column3Y; // Current Y coordinate of the third column
var dragHeight; // Store the height of the drag objects
var buttonState = 0; // 0 - confirm, 1 - model answer, 2 - my answer, 3 - reset
var correctPos = 0; // number of drag objects have been dropped into the correct position
var correctResponse; // To indicate whether the user have answered the question correctly or not (false/wrong - true/correct)
var styleDivs = new Array("target1Div","target2Div","target3Div");
var isCorrect = false; //whether the got the answer right
var correctColor = "#DEC4F1"; // the correct background color for the drag objects
var incorrectColor = "#E4E9FB"; // the incorrect background color for the drag objects
var modelSeen=false;
var yourSeen=false;
var thisPageHeight=(appTop.booMainWindow)?442:368; //top.mainWindow
var DROPSPACER = 2;

selectedAnswers = new Array();
selectedAnswers[1] = new Array();
selectedAnswers[2] = new Array();
selectedAnswers[3] = new Array();
var tickAndCross  = true;
var noOfCorrectsInCol1 = 0;
var noOfCorrectsInCol2 = 0;
var noOfCorrectsInCol3 = 0;

var confirm_r = new Image(); // Confirm button highlight/rollover state
var confirm_n = new Image(); // Confirm button normal/rollout state
var moanswer_r = new Image(); // Model Answer button highlight/rollover state
var moanswer_n = new Image(); // Model Answer button normal/rollout state
var myanswer_r = new Image(); // My Answer button highlight/rollover state
var myanswer_n = new Image(); // My Answer button normal/rollout state
var dragTop1;
var dragTop2;
var dragTop3;

function initialise()
{
	var cqidString;

	if (parent.objNavFrame) {
		appTop.pageType = appTop.DRAGDROPBYTHREECOLUMN;
		parent.objNavFrame.initPageType();
		appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][1] = appTop.VISITED;
	}

	preloadImages();
	writeStyle();
	cqidString = optionsForm.cqid.value+"";

	//work out the longest title
	var highestTitle = (parseInt(document.all['col1Heading'].offsetHeight)> parseInt(document.all['col2Heading'].offsetHeight))?parseInt(document.all['col1Heading'].offsetHeight):parseInt(document.all['col2Heading'].offsetHeight);

	//set the top of the target area tyo be just below the title area
	document.all['target1Div'].style.top = parseInt(document.all['col1Heading'].offsetTop) + highestTitle + DROPSPACER;
	document.all['target2Div'].style.top = parseInt(document.all['col2Heading'].offsetTop) + highestTitle + DROPSPACER;
	document.all['target3Div'].style.top = parseInt(document.all['col3Heading'].offsetTop) + highestTitle + DROPSPACER;

	//set the titles to be the height of the longest title
	document.all['col1Heading'].style.height = highestTitle;
	document.all['col2Heading'].style.height = highestTitle;
	document.all['col3Heading'].style.height = highestTitle;

	orginalColumn1Y = parseInt(document.all['target1Div'].style.top);
	orginalColumn2Y = parseInt(document.all['target2Div'].style.top);
	orginalColumn3Y = parseInt(document.all['target3Div'].style.top);

	column1Y = orginalColumn1Y;
	column2Y = orginalColumn2Y;
	column3Y = orginalColumn3Y;
	cqidArray = cqidString.split("_");
	numberOfOptions = cqidArray.length;

	dragTop1 = document.all['questionArea'].offsetHeight+document.all['questionArea'].offsetTop+5;
	if (numberOfOptions > 3)
	dragTop2 = dragTop1+document.all['drag1Div'].offsetHeight+2;
	if (numberOfOptions > 6)
		dragTop3 = dragTop2+document.all['drag4Div'].offsetHeight+2;

	init();
	document.body.scroll = "no";
	parent.contentLoaded = true; // This is to tell the program that this page have been loaded.
	parent.booContentLoaded = true;
}

// Function to preload images
// change the .src paths to point to the right directory/file
function preloadImages()
{
	if (typeof top.coachMe == "undefined") {
		confirm_n.src = imagePath+"cnfrm_btn_n.jpg";
		confirm_r.src = imagePath+"cnfrm_btn_h.jpg";
		moanswer_r.src = imagePath + "model_ans_r.gif";
		moanswer_n.src = imagePath + "model_ans_n.gif";
		myanswer_r.src = imagePath + "my_ans_r.gif";
		myanswer_n.src = imagePath + "my_ans_n.gif";
	} else {
		confirm_n.src = imagePath+"coach_cnfrm_btn_n.gif";
		confirm_r.src = imagePath+"coach_cnfrm_btn_h.gif";
		moanswer_r.src = imagePath + "coach_model_ans_r.gif";
		moanswer_n.src = imagePath + "coach_model_ans_n.gif";
		myanswer_r.src = imagePath + "coach_my_ans_r.gif";
		myanswer_n.src = imagePath + "coach_my_ans_n.gif";
	}
}

// This function is called when the onunload event for the document is triggered
function pageUnload()
{
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
		default:
			break;
		}

		imgObj.src = newImage.src;
	}
}

function showModelAnswer()
{
	switchToMyButton();
	doShowModelAnswer();
}

function doShowModelAnswer()
{
	var dragObjDivToMove;
	var moveToTarget;
	var columnY;
	column1Y = orginalColumn1Y;
	column2Y = orginalColumn2Y;
	column3Y = orginalColumn3Y;
	noOfCorrectsInCol1 = 0;
	noOfCorrectsInCol2 = 0;
	noOfCorrectsInCol3 = 0;

	for (var i=0;i<numberOfOptions;i++)
	{
		dragObjDivToMove = eval("document.all['drag"+(i+1)+"Div']");
		moveToTarget = eval("document.all['target"+parseInt(cqidArray[i])+"Div']");
		if (parseInt(cqidArray[i]) == 1)
		{
			columnY = column1Y;
			column1Y += dragHeight;
			noOfCorrectsInCol1++;
		}
		else if (parseInt(cqidArray[i]) == 2)
		{
			columnY = column2Y;
			column2Y += dragHeight;
			noOfCorrectsInCol2++;
		}
		else if (parseInt(cqidArray[i]) == 3)
		{
			columnY = column3Y;
			column3Y += dragHeight;
			noOfCorrectsInCol3++;
		}

		dragObjDivToMove.style.top = columnY;
		dragObjDivToMove.style.left = moveToTarget.style.left;
		dragObjDivToMove.style.backgroundColor = correctColor;
	}
	showModelTickNCrosses();
}

function showMyAnswer()
{
	switchToModelButton();
	doShowMyAnswer();
}

function doShowMyAnswer()
{
	var dragObjDivToMove;
	var moveToTarget;

	for (var i=0;i<column1DroppedObjArray.length;i++)
	{
		if (column1DroppedObjArray[i])
		{
			dragObjDivToMove = eval("document.all['"+column1DroppedObjArray[i].id+"']");
			dragObjDivToMove.style.top = column1DroppedObjArray[i].y;
			dragObjDivToMove.style.left = column1DroppedObjArray[i].x;

			if (parseInt(cqidArray[(column1DroppedObjArray[i].dragOptionNum-1)]) != 1)
				dragObjDivToMove.style.backgroundColor = incorrectColor;
		}
	}

	for (var i=0;i<column2DroppedObjArray.length;i++)
	{
		if (column2DroppedObjArray[i])
		{
			dragObjDivToMove = eval("document.all['"+column2DroppedObjArray[i].id+"']");
			dragObjDivToMove.style.top = column2DroppedObjArray[i].y;
			dragObjDivToMove.style.left = column2DroppedObjArray[i].x;

			if (parseInt(cqidArray[(column2DroppedObjArray[i].dragOptionNum-1)]) != 2)
				dragObjDivToMove.style.backgroundColor = incorrectColor;

		}
	}

	for (var i=0;i<column3DroppedObjArray.length;i++)
	{
		if (column3DroppedObjArray[i])
		{
			dragObjDivToMove = eval("document.all['"+column3DroppedObjArray[i].id+"']");
			dragObjDivToMove.style.top = column3DroppedObjArray[i].y;
			dragObjDivToMove.style.left = column3DroppedObjArray[i].x;

			if (parseInt(cqidArray[(column3DroppedObjArray[i].dragOptionNum-1)]) != 3)
				dragObjDivToMove.style.backgroundColor = incorrectColor;
		}
	}
	showTickNCrosses(selectedAnswers);
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
	default:
		break;
	}

	return;
}

function doCheckAnswer()
{
//RB: need to change this function so that what?
//prob stores score and jumps to next page in sequence?
	var allDropped = true;
	var col1Count = 0;
	var col2Count = 0;
	var col3Count = 0;
	var dragColorFilter = new Array();
	appTop.answerStatus = appTop.NONERIGHT;
	correctPos = 0;

	for (var i=0;i<4;i++)
	{
		if (column1DroppedObjArray[i] != null)
			col1Count++;
		if (column2DroppedObjArray[i] != null)
			col2Count++;
		if (column3DroppedObjArray[i] != null)
			col3Count++;
	}

	if ((col1Count + col2Count + col3Count) != numberOfOptions)
		allDropped = false;

	if (allDropped)
	{
		attempts++;

		if (attempts == maxAttempts)
			answered = true;

		for (var j=0; j<numberOfOptions; j++)
		{
			if (column1DroppedObjArray[j] != null)
			{
				if (parseInt(cqidArray[(column1DroppedObjArray[j].dragOptionNum-1)]) == 1)
				{
					appTop.answerStatus = appTop.SOMERIGHT;
					correctPos++;
					selectedAnswers[1][selectedAnswers[1].length]=1;
					dragColorFilter[column1DroppedObjArray[j].id] = correctColor;
				}
				else
				{
					selectedAnswers[1][selectedAnswers[1].length]=0;
					dragColorFilter[column1DroppedObjArray[j].id] = incorrectColor;
				}
			}

			if (column2DroppedObjArray[j] != null)
			{
				if (parseInt(cqidArray[(column2DroppedObjArray[j].dragOptionNum-1)]) == 2)
				{
					correctPos++;
					selectedAnswers[2][selectedAnswers[2].length]=1;
					dragColorFilter[column2DroppedObjArray[j].id] = correctColor;
				}
				else
				{
					selectedAnswers[2][selectedAnswers[2].length]=0;
					dragColorFilter[column2DroppedObjArray[j].id] = incorrectColor;
				}
			}
			if (column3DroppedObjArray[j] != null)
			{
				if (parseInt(cqidArray[(column3DroppedObjArray[j].dragOptionNum-1)]) == 3)
				{
					correctPos++;
					selectedAnswers[3][selectedAnswers[3].length]=1;
					dragColorFilter[column3DroppedObjArray[j].id] = correctColor;
				}
				else
				{
					selectedAnswers[3][selectedAnswers[3].length]=0;
					dragColorFilter[column3DroppedObjArray[j].id] = incorrectColor;
				}
			}
		}

		if (correctPos == numberOfOptions)
		{
			document.all['confirm'].style.visibility = "hidden";
			correctResponse = 2;
			answered = true;
		}
		else
		{
			if (correctPos > 0)
				correctResponse = 1;
			else
				correctResponse = 0;
			if (attempts == maxAttempts) {
				switchToModelButton();
				answered = true;
			}
		}

		if (answered)
		{
			for (var k=0; k<numberOfOptions; k++)
			{
				if (column1DroppedObjArray[k] != null)
				{
					divObj = eval("document.all['"+column1DroppedObjArray[k].id+"']");
					divObj.style.backgroundColor = dragColorFilter[column1DroppedObjArray[k].id];
				}
			}

			for (var k=0; k<numberOfOptions; k++)
			{
				if (column2DroppedObjArray[k] != null)
				{
					divObj = eval("document.all['"+column2DroppedObjArray[k].id+"']");
					divObj.style.backgroundColor = dragColorFilter[column2DroppedObjArray[k].id];
				}
			}
			for (var k=0; k<numberOfOptions; k++)
			{
				if (column3DroppedObjArray[k] != null)
				{
					divObj = eval("document.all['"+column3DroppedObjArray[k].id+"']");
					divObj.style.backgroundColor = dragColorFilter[column3DroppedObjArray[k].id];
				}
			}
		}
		showTickNCrosses(selectedAnswers);
		showFeedback();
		if(attempts < maxAttempts){
			selectedAnswers = void null;
			selectedAnswers = new Array();
			selectedAnswers[1] = new Array();
			selectedAnswers[2] = new Array();
			selectedAnswers[3] = new Array();
		}
	}
	else
	{
		alert("You must drop all the objects into the targets before you check your answer.");
	}
}

function showFeedback()
{
	initialInstructionText.style.display = "none";
	textToDisplay = "";
	if(correctPos == numberOfOptions) {
		isCorrect = true;
		appTop.answerStatus = appTop.ALLRIGHT;
		answered = true;

		document.all.confirm.style.visibility = "hidden";
		appTop.addToTotalScores++;

		if (!appTop.inAssessment){
			if ((appTop.booMainWindow)&&(!appTop.objCurrentState.objUnit.checkTaskQDone()))
				parent.tools.checkComms();

			if ((parent.objNavFrame) && (taskQuestion)) {
				appTop.objCurrentState.objUnit.setTaskQComplete();
				parent.objNavFrame.showNext();
			}
			if (typeof questionResponses != "undefined") {
				textToDisplay += getResponse();
			}
			textToDisplay += correctFeedback;
			textToDisplay += "<span class=\"instructionText\" id='finalInstruction'>"
			if (appTop.booMainWindow) {
				textToDisplay += parent.objNavFrame.getInstruction(true)
			} else {
				textToDisplay += finalInstruction
			}
			textToDisplay += "</span>";
		}
		/*if ((parent.nav) && (taskQuestion))
			parent.nav.showNext();*/
	} else {
// WAI - temporary so that designer can check second wrong feedback without doing the coachme
		if ((attempts == 1) && (taskQuestion))
			disableQuestion();
		if (typeof questionResponses != "undefined") {
			textToDisplay += getResponse();
		}
		textToDisplay += retryFeedbackOptional;

		if ((answered)||(attempts == maxAttempts)) {
			if ((appTop.booMainWindow)&&(!appTop.objCurrentState.objUnit.checkTaskQDone()))
				parent.tools.checkComms();

			if ((parent.objNavFrame) && (taskQuestion)) {
				appTop.objCurrentState.objUnit.setTaskQComplete();
				parent.objNavFram.showNext();
			}
		}

		if(attempts==maxAttempts) {
			textToDisplay += finalIncorrectFeedback;
			if(buttonState==0){switchToModelButton();}
			if (appTop.booMainWindow) {
				insString = parent.objNavFram.getInstruction(true);
			} else {
				insString = (buttonState==1)?instructionOnFinalIncorrectAttempt:afterModelAnswerInstruction;
			}
			textToDisplay += "<span class=\"instructionText\" id='finalInstruction'>&nbsp;"+insString+"</span>";
			answered = true;
		} else {
			textToDisplay += "<span class=\"instructionText\"> "+instructionOnIncorrectAttempt +"</span>";
		}

	}
	//alert(textToDisplay)
	document.all['feedbackText'].innerHTML = textToDisplay;
	document.all['feedbackText'].style.visibility = 'visible';
}


function disableQuestion()
{
	// need to implement disable mechanism
	if ((parent.tools) && (appTop.booDoDisableTask))
	{
		disableDragDrop = true;
		document.all['confirm'].style.visibility = "hidden"; // temporary disable mechanism
		appTop.objCurrentState.objUnit.doCoachMeCheck = true;
		appTop.objCurrentState.objUnit.booDoCoachMeCheck = true;	// Unsure as to which is used, think this one but leaving the other just in case.
		parent.tools.flashButton("coachMe");
	}
}

function enableQuestion()
{
	//alert("DEBUG::enableQuestion()")
	// need to implement enable mechanism
	disableDragDrop = false;
	textToDisplay = initialInstruction.substring(0, initialInstruction.length-1) + appTop.secondAttemptInstr;
	document.all['feedbackText'].innerHTML = "<span class='instructionText'>" + textToDisplay + "</span>";
	document.all['confirm'].style.visibility = "visible"; // temporary enable mechanism
}


function hideFeedback()
{
	if (feedbackBackground)
		document.all['feedbackAreaBackground'].style.visibility = "hidden";
	document.all['feedbackText'].style.visibility = 'hidden';
}

function switchToModelButton()
{
	modelSeen=true;
	buttonState = 1;
	changeImage("confirm_r");
	if (appTop.booMainWindow) {
		parent.objNavFrame.checkInstruction();
	}
}

function switchToMyButton()
{
	yourSeen=true;
	buttonState = 2;
	changeImage("confirm_r");
	if (appTop.booMainWindow) {
		parent.objNavFrame.checkInstruction();
	}
}


function writeStyle() {
	for (n=0; n<styleDivs.length; n++) {
		thisDiv = document.all[styleDivs[n]];
		thisDiv.style.left = thisDiv.offsetLeft;
		thisDiv.style.top = thisDiv.offsetTop;
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
		if (i<3)
		{
			dragArray[i].elm.style.top = dragTop1;
			dragArray[i].y = dragTop1;
		}
		else if (i<6)
		{
			dragArray[i].elm.style.top = dragTop2;
			dragArray[i].y = dragTop2;
		}
		else
		{
			dragArray[i].elm.style.top = dragTop3;
			dragArray[i].y = dragTop3;
		}

		dragArray[i].elm.style.visibility = "visible";
		column1DroppedObjArray[i] = null;
		column2DroppedObjArray[i] = null;
		column3DroppedObjArray[i] = null;
	}

	targetArray[0] = eval("target1");
	targetArray[1] = eval("target2");
	targetArray[2] = eval("target3");
	drag.add(dragArray);
	drag.addTargets(targetArray);
	drag.onDragDrop = hitTarget;
	drag.onDragEnd = dragEnded;
	initMouseEvents();
	dragHeight = dragArray[0].h+2;
}

function dragEnded()
{
	if (!targetHit)
	{
		this.obj.oldDropTargetNum = this.obj.dropTargetNum;
		this.obj.dropTargetNum = 0;
		if (attempts < 1)
			removeObj(this.obj);

		var heightOfAllDragItems = 0;
		for (var i=0; i<numberOfOptions; i++)
		{
			if (column1DroppedObjArray[i] == null)
			{
				column1Y = orginalColumn1Y + heightOfAllDragItems;
				break;
			}
			else
			{
				heightOfAllDragItems+= (column1DroppedObjArray[i].h + DROPSPACER);
			}
		}

		heightOfAllDragItems = 0;
		for (var i=0; i<numberOfOptions; i++)
		{
			if (column2DroppedObjArray[i] == null)
			{
				column2Y = orginalColumn2Y + heightOfAllDragItems;
				break;
			}
			else
			{
				heightOfAllDragItems+= (column2DroppedObjArray[i].h + DROPSPACER);
			}
		}

		heightOfAllDragItems = 0;
		for (var i=0; i<numberOfOptions; i++)
		{
			if (column3DroppedObjArray[i] == null)
			{
				column3Y = orginalColumn3Y + heightOfAllDragItems;
				break;
			}
			else
			{
				heightOfAllDragItems+= (column3DroppedObjArray[i].h + DROPSPACER);
			}
		}

		if (attempts < 1)
		{
			dragObj = eval(this.obj.id);
			dragObj.style.left = this.obj.originalX;
			dragObj.style.top = this.obj.originalY;
			this.obj.oldDropTargetNum = 0;
			this.obj.dropTargetNum = 0;
			this.obj.x = this.obj.originalX;
			this.obj.y = this.obj.originalY;
		}
		else
		{
			this.obj.dropTargetNum = this.obj.oldDropTargetNum;
			this.targetHit = this.dropTargets[(this.obj.dropTargetNum-1)];
			this.onDragDrop();
			//shuffleObjs(this.obj);
		}
	}

	targetHit = false;
}

function hitTarget() {
	targetHit = true;

	dragObj = eval(this.obj.id);
	targetObj = eval(this.targetHit.id);
	dragObj.style.left = parseInt(targetObj.style.left);
	if (this.obj.dropTargetNum == 1)
		dragObj.style.top = column1Y;
	else if (this.obj.dropTargetNum == 2)
		dragObj.style.top = column2Y;
	else if (this.obj.dropTargetNum == 3)
		dragObj.style.top = column3Y;

	this.obj.x = this.targetHit.x;

	if (this.obj.dropTargetNum == 1)
	{
		this.obj.y = column1Y;
		column1Y += (this.obj.h + DROPSPACER);
	}
	else if (this.obj.dropTargetNum == 2)
	{
		this.obj.y = column2Y;
		column2Y += (this.obj.h + DROPSPACER);
	}
	else if (this.obj.dropTargetNum == 3)
	{
		this.obj.y = column3Y;
		column3Y += (this.obj.h + DROPSPACER);
	}

	if (this.obj.oldDropTargetNum == 1)
		column1Y -= (this.obj.h + DROPSPACER);
	else if (this.obj.oldDropTargetNum == 2)
		column2Y -= (this.obj.h + DROPSPACER);
	else if (this.obj.oldDropTargetNum == 3)
		column3Y -= (this.obj.h + DROPSPACER);

	if (this.obj.oldDropTargetNum != this.obj.dropTargetNum)
	{
		removeObj(this.obj)
		addObj(this.obj);
	}
	else
	{
		shuffleObjs(this.obj);
	}
}

function shuffleObjs(droppedObj)
{
	var count = 0;
	var droppedObjDiv;
	removeObj(droppedObj);
	for (var i=0; i<numberOfOptions; i++)
	{
		if (droppedObj.dropTargetNum == 1)
		{
			if (column1DroppedObjArray[i] != null)
				count+=column1DroppedObjArray[i].h+DROPSPACER;
			else
				break;
		}
		else if (droppedObj.dropTargetNum == 2)
		{
			if (column2DroppedObjArray[i] != null)
				count+=column2DroppedObjArray[i].h+DROPSPACER;
			else
				break;
		}
		else if (droppedObj.dropTargetNum == 3)
		{
			if (column3DroppedObjArray[i] != null)
				count+=column3DroppedObjArray[i].h+DROPSPACER;
			else
				break;
		}
	}
	droppedObjDiv = document.all[droppedObj.id];
	droppedObj.y = eval("orginalColumn"+droppedObj.dropTargetNum+"Y + count");
	droppedObjDiv.style.top = droppedObj.y;

	addObj(droppedObj);
}

function addObj(droppedObj)
{
	switch (droppedObj.dropTargetNum)
	{
	case 1:
		for (var i=0; i<numberOfOptions;i++)
		{
			if (column1DroppedObjArray[i] == null)
			{
				column1DroppedObjArray[i] = droppedObj;
				break;
			}
		}
		break;
	case 2:
		for (var i=0; i<numberOfOptions;i++)
		{
			if (column2DroppedObjArray[i] == null)
			{
				column2DroppedObjArray[i] = droppedObj;
				break;
			}
		}
		break;
	case 3:
		for (var i=0; i<numberOfOptions;i++)
		{
			if (column3DroppedObjArray[i] == null)
			{
				column3DroppedObjArray[i] = droppedObj;
				break;
			}
		}
		break;
	default:
		break;
	}
}

function removeObj(droppedObj)
{
	if(droppedObj.oldDropTargetNum)
	{
		var col = droppedObj.oldDropTargetNum;
		var noDroppedInCol = eval("column"+col+"DroppedObjArray.length")
		var newColArray = new Array();
		for(var i=0; i<noDroppedInCol; i++)
		{
			var colDragItem = eval("column"+col+"DroppedObjArray[i]");
			if(colDragItem!=null)
			{
				if(colDragItem.id != droppedObj.id)
				{
					newColArray[newColArray.length] = colDragItem;
				}
			}
			eval("column"+col+"DroppedObjArray[i] = null");
		}

		var runningTotal = 0;
		for(var i=0; i<newColArray.length; i++)
		{
			newColArray[i].y  = eval("orginalColumn"+col+"Y + runningTotal;");
			newColArray[i].elm.style.top = newColArray[i].y;
			runningTotal += parseInt(newColArray[i].elm.offsetHeight) + DROPSPACER;
		}

		for(var i=0; i<newColArray.length; i++)
		{
			newColArray[i].dropTargetNum = col;
			addObj(newColArray[i]);
		}

	}
}

function showTickNCrosses(selectedAnswers){
	if(tickAndCross)
	{
		var placeHolder;
		clearTickNCrosses();
		if(selectedAnswers)
		{
			var col1sa = 0;
			var col2sa = 0;
			var col3sa = 0;
			for(var j=1;j<=3;j++)
			{
				for(var i=1;i<=selectedAnswers[j].length;i++)
				{
					if(selectedAnswers[j][i-1])
					{eval("col"+j+"sa++");}
				}
			}
			for(var j=1;j<=3;j++){
				var tickCnt = eval("col"+j+"sa");
				for(var i=1;i<=selectedAnswers[j].length;i++){
					placeHolder = eval("markCol"+j+''+i+"img");
					if(i<=tickCnt){
						placeHolder.src = imagePath + "tick.gif";
					}else{
						placeHolder.src = imagePath + "cross.gif";
					}
				}
			}
		}
	}
}

function showModelTickNCrosses(){
	if(tickAndCross)
	{
		var placeHolder;
		clearTickNCrosses();
		for(var j=1;j<=3;j++){
			var tickHowMany = eval("noOfCorrectsInCol"+j)
			for(var i=1;i<=tickHowMany;i++){
				placeHolder = eval("markCol"+j+''+i+"img");
				placeHolder.src = imagePath + "tick.gif";
			}
		}
	}
}

function clearTickNCrosses()
{
	for(var j=1;j<=3;j++){
		for(var i=1;i<=numberOfOptions;i++){
			placeHolder = eval("markCol"+j+''+i+"img");
			placeHolder.src = imagePath + "trans.gif";
		}
	}
}
