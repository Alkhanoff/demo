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
var orginalColumn1Y; // Store the original Y coordinate of the first column
var orginalColumn2Y; // Store the original Y coordinate of the second column
var column1Y; // Current Y coordinate of the first column
var column2Y; // Current Y coordinate of the second column
var buttonState = 0; // 0 - confirm, 1 - model answer, 2 - my answer, 3 - reset
var correctPos = 0; // number of drag objects have been dropped into the correct position
var correctResponse; // To indicate whether the user have answered the question correctly or not (false/wrong - true/correct)
var styleDivs = new Array("target1Div","target2Div");
var isCorrect = false; //whether they got the answer right
var correctColor = "#DEC4F1"; // the correct background color for the drag objects
var incorrectColor = "#E4E9FB"; // the incorrect background color for the drag objects
var modelSeen=false;
var yourSeen=false;
var DRAGSPACER = 1;
var DROPSPACER = 2;
var TOPOFDROPSPACER = 10;
var topOfDragItem = -1;
var topOfDragArea = -1;

selectedAnswers = new Array();
selectedAnswers[1] = new Array();
selectedAnswers[2] = new Array();
var tickAndCross  = true;
var noOfCorrectsInCol1 = 0;
var noOfCorrectsInCol2 = 0;

var confirm_r = new Image(); // Confirm button highlight/rollover state
var confirm_n = new Image(); // Confirm button normal/rollout state
var moanswer_r = new Image(); // Model Answer button highlight/rollover state
var moanswer_n = new Image(); // Model Answer button normal/rollout state
var myanswer_r = new Image(); // My Answer button highlight/rollover state
var myanswer_n = new Image(); // My Answer button normal/rollout state
var thisPageHeight=(appTop.booMainWindow)?442:368;

function initialise()
{
	//fix put in for when run in refresh
	if(!appTop.booMainWindow)
	{
		if(typeof(isScenario)!="undefined")
		{
			thisPageHeight=(isScenario)?442:368;
		}
		else
		{
			thisPageHeight=368;
		}
	}
	
	var cqidString;
	if (parent.objNavFrame) {
		appTop.intPageType = appTop.DRAGDROPBYCOLUMN;
		parent.objNavFrame.initPageType();
		if (appTop.booMainWindow)
		{
			if (appTop.objCurrentState.objUnit.isAssessment)
			{
				appTop.objCurrentState.objUnit.incMaxScore(appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.currentPage][0],scoreWeight);
			}
			appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][1] = appTop.VISITED;
		}
	}
	
	//set the column headings to be just below the intro text and the feedback;
	var baseOfQuestionArea = parseInt(document.getElementById('questionArea').offsetTop) + parseInt(document.getElementById('questionArea').offsetHeight);	
	
	topOfDragArea = baseOfQuestionArea + TOPOFDROPSPACER;	
	document.getElementById('col1Heading').style.top = topOfDragArea + "px";
	document.getElementById('col2Heading').style.top = topOfDragArea + "px";
	document.getElementById('feedbackText').style.top = topOfDragArea + "px";
		
	//work out the longest title
	var highestTitle = (parseInt(document.getElementById('col1Heading').offsetHeight)> parseInt(document.getElementById('col2Heading').offsetHeight))?parseInt(document.getElementById('col1Heading').offsetHeight):parseInt(document.getElementById('col2Heading').offsetHeight);
	
	//set the top of the target area tyo be just below the title area
	document.getElementById('target1Div').style.top = parseInt(document.getElementById('col1Heading').offsetTop) + highestTitle + DROPSPACER + "px";
	document.getElementById('target2Div').style.top = parseInt(document.getElementById('col2Heading').offsetTop) + highestTitle + DROPSPACER + "px";
	
	//set the titles to be the height of the longest title
	document.getElementById('col1Heading').style.height = highestTitle + "px";
	document.getElementById('col2Heading').style.height = highestTitle + "px";
	
	// set the drop area height
	document.getElementById('target1Div').style.height = thisPageHeight-highestTitle-topOfDragArea-(thisPageHeight-document.getElementById('markCol1').offsetTop) + "px";
	document.getElementById('target2Div').style.height = thisPageHeight-highestTitle-topOfDragArea-(thisPageHeight-document.getElementById('markCol1').offsetTop) + "px";
	
	preloadImages();
	writeStyle();
	cqidString = optionsForm.cqid.value+"";
	orginalColumn1Y = parseInt(document.getElementById('target1Div').style.top);
	orginalColumn2Y = parseInt(document.getElementById('target2Div').style.top);

	column1Y = orginalColumn1Y;
	column2Y = orginalColumn2Y;

	cqidArray = cqidString.split("_");
	numberOfOptions = cqidArray.length;

	init();
	document.body.scroll = "no";	parent.booContentLoaded = true; // This is to tell the program that this page have been loaded.
	thisPageHeight = thisPageHeight - (thisPageHeight-document.getElementById('confirm').offsetTop);
	
	parent.booContentLoaded = true;	
}

// Function to preload images
// change the .src paths to point to the right directory/file
function preloadImages()
{
	if (new String(document.location).indexOf("_cm",0) == -1) { //typeof appTop.coachMe == "undefined") {
		confirm_n.src = imagePath+"cnfrm_btn_n.jpg";
		confirm_r.src = imagePath+"cnfrm_btn_h.jpg";	
		moanswer_r.src = imagePath + "model_ans_h.gif";
		moanswer_n.src = imagePath + "model_ans_n.gif";
		myanswer_r.src = imagePath + "my_ans_h.gif";
		myanswer_n.src = imagePath + "my_ans_n.gif";			
	} else {
		confirm_n.src = imagePath+"coach_cnfrm_btn_n.gif";
		confirm_r.src = imagePath+"coach_cnfrm_btn_h.gif";	
		moanswer_r.src = imagePath + "coach_model_ans_h.gif";
		moanswer_n.src = imagePath + "coach_model_ans_n.gif";
		myanswer_r.src = imagePath + "coach_my_ans_h.gif";
		myanswer_n.src = imagePath + "coach_my_ans_n.gif";			
	}
}

// This function is called when the onunload event for the document is triggered
function pageUnload()
{
	parent.booContentLoaded = false;  // This is to tell the program that this page is being unloaded from the browser.
}

function changeImage(imgState)
{
	var imgObj;
	var img = imgState.split("_");

	imgObj = eval("document.images['"+img[0]+"Img']");
	
	
	if (parent.booContentLoaded)
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
	noOfCorrectsInCol1 = 0;
	noOfCorrectsInCol2 = 0;	
	for (var i=0;i<numberOfOptions;i++)
	{
		dragObjDivToMove = eval("document.all['drag"+(i+1)+"Div']");
		moveToTarget = eval("document.all['target"+parseInt(cqidArray[i])+"Div']");
		if (parseInt(cqidArray[i]) == 1)
		{
			columnY = column1Y;
			column1Y += dragObjDivToMove.offsetHeight + DROPSPACER;
			noOfCorrectsInCol1++;
		}
		else if (parseInt(cqidArray[i]) == 2)
		{
			columnY = column2Y;
			column2Y += dragObjDivToMove.offsetHeight + DROPSPACER;
			noOfCorrectsInCol2++;
		}
			
		dragObjDivToMove.style.top = columnY + "px";
		dragObjDivToMove.style.left = moveToTarget.style.left;
		dragObjDivToMove.style.backgroundColor = correctColor;
	}
	showModelTickNCrosses();
	showFeedback();
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
			dragObjDivToMove = eval("document.getElementById('"+column1DroppedObjArray[i].id+"')");
			dragObjDivToMove.style.top = column1DroppedObjArray[i].y + "px";
			dragObjDivToMove.style.left = column1DroppedObjArray[i].x + "px";

			if (parseInt(cqidArray[(column1DroppedObjArray[i].dragOptionNum-1)]) != 1)
				dragObjDivToMove.style.backgroundColor = incorrectColor;
		}
	}

	for (var i=0;i<column2DroppedObjArray.length;i++)
	{
		if (column2DroppedObjArray[i])
		{
			dragObjDivToMove = eval("document.all['"+column2DroppedObjArray[i].id+"']");
			dragObjDivToMove.style.top = column2DroppedObjArray[i].y + "px";
			dragObjDivToMove.style.left = column2DroppedObjArray[i].x + "px"

			if (parseInt(cqidArray[(column2DroppedObjArray[i].dragOptionNum-1)]) != 2)
				dragObjDivToMove.style.backgroundColor = incorrectColor;
		}
	}
	showTickNCrosses(selectedAnswers);
	showFeedback()
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
	var allDropped = true;
	var col1Count = 0;
	var col2Count = 0;
	var dragColorFilter = new Array();
	appTop.booAnswerStatus = appTop.NONERIGHT;
	correctPos = 0;

	for (var i=0;i<numberOfOptions;i++)
	{
		if (column1DroppedObjArray[i] != null)
			col1Count++;

		if (column2DroppedObjArray[i] != null)
			col2Count++;
	}

	if ((col1Count + col2Count) != numberOfOptions)
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
					appTop.booAnswerStatus = appTop.SOMERIGHT;
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
		}

		if (correctPos == numberOfOptions)
		{
			document.getElementById('confirm').style.visibility = "hidden";
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
					divObj = eval("document.getElementById('"+column1DroppedObjArray[k].id+"')");
					divObj.style.backgroundColor = dragColorFilter[column1DroppedObjArray[k].id];
				}
			}

			for (var k=0; k<numberOfOptions; k++)
			{
				if (column2DroppedObjArray[k] != null)
				{
					divObj = eval("document.getElementById('"+column2DroppedObjArray[k].id+"')");
					divObj.style.backgroundColor = dragColorFilter[column2DroppedObjArray[k].id];
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
		}
	}
	else
	{
		alert("You must drop all the objects into the targets before you can check your answer.");
	}
}

function showFeedback()
{
	var scrollyHeight = thisPageHeight-(document.getElementById('feedbackText').offsetTop)-10;//10 padding at bottom of screen
	document.all['feedbackText'].style.height = scrollyHeight + "px";	
	textToDisplay = "";
	if(correctPos == numberOfOptions) {
		isCorrect = true;
		appTop.booAnswerStatus = appTop.ALLRIGHT;
		answered = true;

		document.all.confirm.style.visibility = "hidden";
		appTop.addToTotalScores++;
		if (!appTop.inAssessment){
			if ((appTop.mainWindow)&&(!appTop.objCurrentState.objUnit.checkTaskQDone()))
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
			if (appTop.mainWindow) {
				textToDisplay += parent.objNavFrame.getInstruction(true) 
			} else {
				
				if ((appTop.objCurrentState.objUnit.currentPage == (appTop.objCurrentState.objUnit.objNavArray.length-1))&&appTop.fromQuickFind)
				{finalInstruction = "That completes this <b>Coach me</b>. Click <b>Return to quickfind</b> or <b>Close</b>.";}
				textToDisplay += finalInstruction
			}
			textToDisplay += "</span>";
		}
		
		/*if ((parent.objNavFrame) && (taskQuestion))
			parent.objNavFrame.showNext();*/
	} else {
// WAI - temporary so that designer can check second wrong feedback without doing the coachme
		if ((attempts == 1) && (taskQuestion)) {
			disableQuestion();
			textToDisplay += retryFeedbackOptional;
		}
		if (typeof questionResponses != "undefined") {
			textToDisplay += getResponse();
		}

		if ((answered)||(attempts == maxAttempts)) {
			if ((appTop.mainWindow)&&(!appTop.objCurrentState.objUnit.checkTaskQDone()))
				parent.tools.checkComms();

			if ((parent.objNavFrame) && (taskQuestion)) {
				appTop.objCurrentState.objUnit.setTaskQComplete();
				parent.objNavFrame.showNext();
			}
		}		
		
		if(attempts==maxAttempts) {
			textToDisplay += finalIncorrectFeedback;
			if(buttonState==0){switchToModelButton();}
			if (appTop.mainWindow) {
				insString = parent.objNavFrame.getInstruction(true);
			} else {
				insString = (buttonState==1)?instructionOnFinalIncorrectAttempt:afterModelAnswerInstruction;
				if ((appTop.objCurrentState.objUnit.currentPage == (appTop.objCurrentState.objUnit.objNavArray.length-1))&&appTop.fromQuickFind)
				{finalInstruction = "That completes this <b>Coach me</b>. Click <b>Return to quickfind</b> or <b>Close</b>.";}
				insString = insString.replace(/, or click <b>Close<\/b> to continue./gi,". "+finalInstruction);
				insString = insString.replace(/, or click <b>Next<\/b> to continue./gi,". "+finalInstruction);
			}
			textToDisplay += "<span class=\"instructionText\" id='finalInstruction'> "+insString+"</span>";
			answered = true;
		} else {
			textToDisplay += "<span class=\"instructionText\"> "+instructionOnIncorrectAttempt +"</span>";
		}	
		
	}
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
		appTop.objCurrentState.objUnit.booDoCoachMeCheck = true;
		parent.objToolsFrame.flashButton("coachMe");
	}
}

function enableQuestion()
{
	// need to implement enable mechanism;
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
	if (appTop.mainWindow) {
		parent.objNavFrame.checkInstruction();
	}
}

function switchToMyButton()
{
	yourSeen=true;
	buttonState = 2;
	changeImage("confirm_r");
	if (appTop.mainWindow) {
		parent.objNavFrame.checkInstruction();
	}
}

function writeStyle() {
	for (n=0; n<styleDivs.length; n++) {
		thisDiv = document.getElementById(styleDivs[n]);
		thisDiv.style.left = thisDiv.offsetLeft + "px";
		thisDiv.style.top = thisDiv.offsetTop + "px";
	}
}

//
// Drag and Drop stuff
//

function init() {
	DynLayerInit()
	//var topOfDragItem = -1;
	topOfDragItem = topOfDragArea;
	
	for (i=0;i<numberOfOptions;i++)
	{
		dragArray[i] = eval("drag"+(i+1));
		column1DroppedObjArray[i] = null;
		column2DroppedObjArray[i] = null;
		//if(topOfDragItem==-1){topOfDragItem=dragArray[i].elm.offsetTop;}
		dragArray[i].elm.style.top = topOfDragItem;
		dragArray[i].y = topOfDragItem;
		dragArray[i].h  = dragArray[i].elm.offsetHeight;
		dragArray[i].elm.style.visibility = "visible";
		topOfDragItem+=(dragArray[i].h)+DRAGSPACER;

	}

	targetArray[0] = eval("target1");
	targetArray[1] = eval("target2");

	drag.add(dragArray);
	drag.addTargets(targetArray);
	drag.onDragDrop = hitTarget;
	drag.onDragEnd = dragEnded;
	initMouseEvents();
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
	
		if (attempts < 1)
		{
			dragObj = eval(this.obj.id);
			dragObj.style.left = this.obj.originalX + "px";
			dragObj.style.top = this.obj.originalY + "px";
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
	dragObj.style.left = parseInt(targetObj.style.left) + "px";
	if (this.obj.dropTargetNum == 1)
		dragObj.style.top = column1Y + "px";
	else
		dragObj.style.top = column2Y + "px";

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

	if (this.obj.oldDropTargetNum == 1)
		column1Y -= (this.obj.h + DROPSPACER);

	else if (this.obj.oldDropTargetNum == 2)
		column2Y -= (this.obj.h + DROPSPACER);

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
		else
		{
			if (column2DroppedObjArray[i] != null)
				count+=column2DroppedObjArray[i].h+DROPSPACER;
			else
				break;
		}
	}
	droppedObjDiv = document.getElementById(droppedObj.id);
	droppedObj.y = eval("orginalColumn"+droppedObj.dropTargetNum+"Y + count");
	droppedObjDiv.style.top = droppedObj.y + "px";
	
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
			newColArray[i].elm.style.top = newColArray[i].y + "px";
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
			for(var j=1;j<=2;j++)
			{
				for(var i=1;i<=selectedAnswers[j].length;i++)
				{
					if(selectedAnswers[j][i-1])
					{eval("col"+j+"sa++");}
				}
			}
			for(var j=1;j<=2;j++){
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
		for(var j=1;j<=2;j++){
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
	for(var j=1;j<=2;j++){
		for(var i=1;i<=numberOfOptions;i++){
			placeHolder = eval("markCol"+j+''+i+"img");
			placeHolder.src = imagePath + "trans.gif";
		}
	}		
}
