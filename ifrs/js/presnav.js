var imagePath = "../images/"; // The path of the image directory relative to the page 
var exit_h = new Image();
var exit_n = new Image();
var back_h = new Image();
var back_n = new Image();
var next_h = new Image();
var next_n = new Image();
var help_h = new Image();
var help_n = new Image();
var print_h = new Image();
var print_n = new Image();
var actionPlanner_h = new Image();
var actionPlanner_n = new Image();
var buttonsArray = new Array();
var timerID = null;
var backObj;
var nextObj;
var exitObj;
top.docsTotal = 0;
top.docsViewed = 0;
top.commsTotal = 0;
top.commsViewed = 0;
top.isLastPage = false;
top.instructionChanged = false;
top.isQPage = false;

top.docInstr = "Click the highlighted item in the <b>Toolkit</b>. ";
top.firstCommNoDocInstr = "Click the <b>Messages</b> panel to pick up the message. ";
top.firstCommAfterDocInstr = "Now click the <b>Messages</b> panel to pick up the message. ";
top.subsCommInstr = "Click the <b>Messages</b> panel to pick up the next message. ";
top.nextPageInstr = "Click <b>Next</b> to continue.";
top.nextPageOIInstr = "Having typed in all that you need, click <b>Next</b> to continue.";
top.lastPageInstr = "That completes this XXX, now click the highlighted link. ";
top.secondAttemptInstr = " to make your second and final attempt. ";
top.yourAnswerInstr = "Click <b>My answer</b> to see what you chose";
top.showMeInstr = "Click <b>Show me</b> to see the correct answer";
top.yourAnswerNextInstr = top.yourAnswerInstr + ", or click <b>Next</b> to continue. ";
top.showMeNextInstr = top.showMeInstr + ", or click <b>Next</b> to continue. ";
top.yourAnswerLastInstr = top.yourAnswerInstr + ". " + top.lastPageInstr;
top.showMeLastInstr = top.showMeInstr + ". " + top.lastPageInstr;
top.printCertificateInstr = "Click <b>print</b> at the bottom of the screen to print your certificate. ";
top.mfLastPageInstr = "That completes this <b>Section</b>, now click the highlighted link. ";
top.mfYourAnswerLastInstr = top.yourAnswerInstr + ". " + top.mfLastPageInstr;
top.mfShowMeLastInstr = top.showMeInstr + ". " + top.mfLastPageInstr;

parent.navLoaded = false;

document.onkeypress = keyPressed;
document.onkeydown = keyDown;
document.onkeyup = keyUp;

function keyPressed(e)
{
	var ieKey;
	ieKey = event.keyCode;
	if (ieKey == 8)
		window.event.keyCode = 32;
}

function keyDown(e)
{
	var ieKey;
	ieKey = event.keyCode;
	if (ieKey == 8)
		window.event.keyCode = 32;
}

function keyUp(e)
{
	var ieKey;
	ieKey = event.keyCode;
	if (ieKey == 8)
		window.event.keyCode = 32;
}

document.onselectstart = killSelection;
document.onmousedown = checkRightMouse;

function checkRightMouse(e)
{
	if (window.event.button == 2)alert(top.version);
}

function killSelection()
{
    window.event.returnValue = false;
    window.event.cancelBubble = true;
}

function initialise()
{
    preloadImages();
    assignObjects();
	loadFirstPage();
            
    parent.navLoaded = true;
}

function assignObjects()
{
    backObj = eval("document.all['back'].style");
    nextObj = eval("document.all['next'].style");
    exitObj = eval("document.all['exit'].style");

    buttonsArray["back"] = backObj;
    buttonsArray["next"] = nextObj;
    buttonsArray["exit"] = exitObj;
}

function preloadImages()
{
    exit_h.src = imagePath + "exit_btn_h.gif";
    exit_n.src = imagePath + "exit_btn_n.gif";
    back_h.src = imagePath + "back_btn_h.gif";
    back_n.src = imagePath + "back_btn_n.gif";
    next_h.src = imagePath + "next_btn_h.gif";
    next_n.src = imagePath + "next_btn_n.gif";
    help_h.src = imagePath + "help_btn_h.gif";
    help_n.src = imagePath + "help_btn_n.gif";
    print_h.src = imagePath + "prnt_btn_h.gif";
    print_n.src = imagePath + "prnt_btn_n.gif"; 
    actionPlanner_h.src = imagePath + "atpln_btn_h.gif";
    actionPlanner_n.src = imagePath + "atpln_btn_n.gif";
}

function changeImage(imgState)
{
    var imgObj;
    var img = imgState.split("_");
  
    imgObj = eval("document.images['"+img[0]+"Img']");
    
    if (parent.navLoaded)
    {
        newImage = eval(imgState);
        imgObj.src = newImage.src;
    }
    return;
}

function loadFirstPage()
{
    top.currentState.unit.setupUnit(top.baseURL+top.unitDir+"/content/");
    if (top.currentState.unit.fromBookmark)
    {
    	for (var i=0; i<top.currentState.unit.navArray.length; i++)
    	{
    		if (top.currentState.unit.navArray[i][0].indexOf(top.currentState.unit.pageJump,0) != -1)
    		{
    			top.currentState.unit.currentPage = i;
    			break;
    		}
    	}

    	top.currentState.unit.pageJump = null;
    	top.currentState.unit.fromBookmark = false;
	}
	else if (top.fromQuickFind)
	{
    	for (var i=0; i<top.currentState.unit.navArray.length; i++)
    	{
    		if (top.currentState.unit.navArray[i][0].indexOf(top.taskToGoTo,0) != -1)
    		{
    			top.currentState.unit.currentPage = i;
    			break;
    		}
    	}
		top.taskToGoTo = null;
		top.fromQuickFind = false;
	}
	else if (!top.fromRevisit)
	{
		top.currentState.unit.currentPage = 0;
	}

	top.fromRevisit = false;
   	parent.content.location = top.baseURL + top.unitDir + "/content/"+top.currentState.unit.navArray[top.currentState.unit.currentPage][0];
    top.currentState.unit.checkNav(buttonsArray);
}

function initPageType()
{
	
	if (top.currentState.unit.isAssessment)
	{
		if (top.currentState.unit.currentPage==0)
		{
	    		// If it is the first page of the assessment randomise the order of the pages
	    		// Re-order nav array apart from the first intro page 
	    		// and the last screen which is the results screen.
	    		cnt=0;
	    		while (cnt<250)// swap pages over 250 times that should ensure a good random order
	    		{
	    			cnt++
	    			seed1 = 1 + Math.floor( (top.currentState.unit.navArray.length-2) * Math.random() );
	    			seed2 = 1 + Math.floor( (top.currentState.unit.navArray.length-2) * Math.random() );	
	    			if(seed1!=0&&seed2!=0)
	    			{
	    				tempArray = new Array();
						for (var j=0; j<top.currentState.unit.navArray[seed1].length; j++)
			    		{
			    			tempArray[j] = top.currentState.unit.navArray[seed1][j];
			    		}
						for (var j=0; j<top.currentState.unit.navArray[seed2].length; j++)
			    		{
			    			top.currentState.unit.navArray[seed1][j] = top.currentState.unit.navArray[seed2][j];
			    		}
						for (var j=0; j<tempArray.length; j++)
			    		{
			    			top.currentState.unit.navArray[seed2][j] = tempArray[j];
			    		}
	    			}
	    		}	
		}
		else if(top.currentState.unit.currentPage!=(top.currentState.unit.navArray.length-1))
		{
			//if it is not the results page re-name the Question screen to reflect the new order
			parent.content.document.all['titleLayer'].innerHTML = "Question "+top.currentState.unit.currentPage;	
		}
	}
	
	top.isQPage = false;
	top.currentState.unit.setTaskID();
	top.currentState.unit.checkNav(buttonsArray,top.pageType);
	top.currentState.unit.onTaskQuestion = false;
	top.currentState.unit.doCoachMeCheck = false;
	top.answerStatus = false;
	parent.tools.checkClue();
	parent.content.popupShowing = "";
	parent.content.popupVisible = false;
	parent.tools.commsDone = true;
	if (top.currentState.unit.currentPage+1 == top.currentState.unit.navArray.length) {
		top.isLastPage = true;
	} else {
		top.isLastPage = false;
	}
	top.docsTotal = 0;
	top.commsTotal = 0;
	top.docsViewed = 0;
	top.commsViewed = 0;
	top.instructionChanged = false;
	switch (top.pageType)
	{
	case top.MCQWITHFEEDBACK:
	case top.SLWITHFEEDBACK:
	case top.DRAGDROPPIO:
	case top.DRAGDROPBYCOLUMN:
	case top.DRAGDROPBYTHREECOLUMN:
	case top.MATCHINGPAIRS:
	case top.WORDMATCH:
	case top.WORDMATCHGRAPHIC:
	case top.MCQWITHFEEDBACK:
	case top.WORDMATCHGRAPHICLANDSCAPE:
		if (!top.currentState.unit.isAssessment)
		{
			top.isQPage = true;
			if ((parent.content.taskQuestion) && (!top.currentState.unit.checkTaskQDone())) {
				top.currentState.unit.onTaskQuestion = true;
				//comment next line to disable next button hiding
		    		buttonState("next","hidden");
		    	} else {
		    		parent.tools.checkComms();
		    	}
		}
		break;
    default:
		top.currentState.unit.setTaskStatus();
		parent.tools.checkComms();
        break;
    }
	parent.tools.checkDocs();
    if (top.displayPageNum)
        top.currentState.unit.showPageNum(parent.nav.document.all['pageNum']);
	if ((top.isLastPage) && (!top.isQPage) && (top.docsTotal == 0) && (top.commsTotal ==0)) {
		parent.titleF.flashHomeLink();
	}
}

// called from the goPage() function in bookmarkframe.htm before jumping to a page.
// this is to ensure that anything that the content page need saving is saved.
function unloadContentPage()
{
    parent.content.pageUnload();
}

function showHelp() {
	top.showHelp();
}

function doPrint() {
	top.printPage();
}
	
function showNext()
{
	doShowNext = false;
	if (top.currentState.unit.currentPage != (top.currentState.unit.navArray.length - 1)) {
		if ((parent.tools.docsToView<1)||(top.isQPage)) {
			if (top.commsViewed == top.commsTotal) {
				if (parent.content.taskQuestion) {
					if (top.currentState.unit.checkTaskQDone())
						doShowNext = true;
				} else {
					doShowNext = true;
				}
			}
		}
	}
	if (doShowNext)
		buttonState("next","visible");
}

function buttonState(but,state)
{
	buttonsArray[but].visibility = state;
}

function goBack()
{
    if (parent.contentLoaded)
    {
    	//save open input data now, added by mvc 3/3/3
    	if ((top.pageType == top.OPENINPUTSTART)||(top.pageType == top.OPENINPUTBUILD)) {
    		if (parent.content.initialInputRemoved) {
    			top.currentState.unit.saveOIData(parent.content.document.forms['userInputForm'].elements['userInputField'].value, top.pageType)	
    		}
    	}
    	parent.tools.resetFlashingButtons();
    	parent.tools.disableComms();
        parent.contentLoaded = false;
        top.currentState.unit.back(parent.frames['content']);
    }

    return;
}

function goNext()
{
    if (parent.contentLoaded)
    {
    	//save open input data now, added by mvc 3/3/3
    	if ((top.pageType == top.OPENINPUTSTART)||(top.pageType == top.OPENINPUTBUILD)) {
    		if (parent.content.initialInputRemoved) {
    			top.currentState.unit.saveOIData(parent.content.document.forms['userInputForm'].elements['userInputField'].value, top.pageType)	
    		}
    	}
    	parent.tools.resetFlashingButtons();
    	parent.tools.disableComms();
        parent.contentLoaded = false;
        top.currentState.unit.next(parent.frames['content']);
    }

    return;

}

function exitProgram()
{
	if (top.runAsModule)
    	top.exit();
    else
    	top.window.close();
    return;
}

function checkInstruction() {
	instructionText = getInstruction(false);
	if (instructionText != "") {
		if (parent.content.document.all['finalInstruction']) {
			parent.content.document.all['finalInstruction'].innerHTML = instructionText
		}
	}
}

function getInstruction(forceInstruction) {
	//returns a string of the text to be used in instruction. 
	strInstruction = "";
	switch (top.pageType) {
		case top.OPENINPUTSTART:
		case top.OPENINPUTBUILD:
		case top.TEXTANDGRAPHIC:
		case top.OPENINPUTEND:
		case top.ASSESSMENTRESULT:
		case top.STORYBOARDFOUR:
		case top.TEXTONLY:
		case top.TABBEDSCREEN:
			//alert("prog testing: \n" + top.docsTotal + " " + top.docsViewed);
			if(top.docsTotal>top.docsViewed) { //if there are documents to view, tell the user to click them
				strInstruction += top.docInstr;
			} else if(top.commsTotal>top.commsViewed) { //if there are comms to pick up, tell the user
				if (top.commsViewed==0) {// if this is the first comm displayed
					if (top.docsViewed ==0) {//if the user has not seen any docs
						strInstruction += top.firstCommNoDocInstr;
					} else {//if the user has already seen docs
						strInstruction += top.firstCommAfterDocInstr;
					}
				} else {//if this is a subsequent comm
					strInstruction += top.subsCommInstr; 
				}
			} else if((forceInstruction)||(top.instructionChanged)) { //no docs or comms to view - only return if forced to or needs to
				if (top.isLastPage) {//show last page text
					screenType = screenTypeCheck(top.currentState.unit.navArray[top.currentState.unit.currentPage][0])
					if (top.standard == "mf")
						strInstruction += top.mfLastPageInstr;
					else
						strInstruction += top.lastPageInstr.replace(/XXX/g, screenType);
					parent.titleF.flashHomeLink();
				} else {
					if ((top.pageType == top.OPENINPUTSTART)||(top.pageType == top.OPENINPUTBUILD)) { //show next page text
						strInstruction += top.nextPageOIInstr; 
					} else {
						strInstruction += top.nextPageInstr; 
					}
					showNext();
				}
			}
			break;
			
		case top.MCQWITHFEEDBACK:
		case top.SLWITHFEEDBACK:
		case top.MCQGRAPHICSWITHFEEDBACK:
			if(top.commsTotal>top.commsViewed) { //if there are comms to pick up, tell the user
				if (top.commsViewed==0) {// if this is the first comm displayed
					strInstruction += top.firstCommAfterDocInstr;
				} else {//if this is a subsequent comm
					strInstruction += top.subsCommInstr; 
				}
			} else if((forceInstruction)||(top.instructionChanged)) { //no docs or comms to view - only return if forced to or needs to
				if (top.isLastPage) {//show last page text
					screenType = screenTypeCheck(top.currentState.unit.navArray[top.currentState.unit.currentPage][0])
					if (top.standard == "mf")
						strInstruction += top.mfLastPageInstr;
					else
						strInstruction += top.lastPageInstr.replace(/XXX/g, screenType);
					parent.titleF.flashHomeLink();
				} else {//show next page text
					strInstruction += top.nextPageInstr; 
					showNext();
				}
			}
			break;
			
		case top.DRAGDROPBYCOLUMN:
		case top.DRAGDROPBYTHREECOLUMN:
		case top.MATCHINGPAIRS:
		case top.WORDMATCH:
		case top.WORDMATCHGRAPHIC:
		case top.WORDMATCHGRAPHICLANDSCAPE:
			if(top.commsTotal>top.commsViewed) { //if there are comms to pick up, tell the user
				if (top.commsViewed==0) {// if this is the first comm displayed
					strInstruction += top.firstCommAfterDocInstr;
				} else {//if this is a subsequent comm
					strInstruction += top.subsCommInstr; 
				}
			} else if((forceInstruction)||(top.instructionChanged)) { //no docs or comms to view - only return if forced to or needs to
				screenType = screenTypeCheck(top.currentState.unit.navArray[top.currentState.unit.currentPage][0]);
				if (parent.content.isCorrect) {
					if (top.isLastPage) {//show last page text
						if (top.standard == "mf")
							strInstruction += top.mfLastPageInstr;
						else
							strInstruction += top.lastPageInstr.replace(/XXX/g, screenType);
						parent.titleF.flashHomeLink();
					} else {//show next page text
						strInstruction += top.nextPageInstr; 
						showNext();
					}
				} else {
					if (parent.content.buttonState == 1) {
						if (top.isLastPage) {//show last page text
							if (top.standard == "mf")
								strInstruction += top.mfShowMeLastInstr;
							else
								strInstruction += top.showMeLastInstr.replace(/XXX/g, screenType); 
							parent.titleF.flashHomeLink();
						} else {//show next page text
							strInstruction += top.showMeNextInstr; 
						}						
					} else {
						if (top.isLastPage) {//show last page text
							if (top.standard == "mf")
								strInstruction += top.mfYourAnswerLastInstr;
							else
								strInstruction += top.yourAnswerLastInstr.replace(/XXX/g, screenType); 
							parent.titleF.flashHomeLink();
						} else {//show next page text
							strInstruction += top.yourAnswerNextInstr; 
							showNext();
						}
					}
				}
			}
			break;
		case top.QUIZRESULTS:
			screenType = screenTypeCheck(top.currentState.unit.navArray[top.currentState.unit.currentPage][0]);
			strInstruction += top.lastPageInstr.replace(/XXX/g, "<b>Assessment</b> section"); 
			if (parent.content.scoreAcheived >= top.currentState.unit.passRate) {
				strInstruction += top.printCertificateInstr;
			}
			parent.titleF.flashHomeLink();
			break;	
			
		case top.HOTGRAPHIC:
		case top.HOTTEXT:
			//do nothing - these types do not feature in scenarios
			break;
	}
	if (strInstruction != "") {
		top.instructionChanged = true;	
	}
	return strInstruction;
}

function screenTypeCheck(pageName) {
	screenType = "";
	pageName= pageName.toLowerCase();	
	pageName= pageName.split("_");
	if (pageName[1].substring(0,3) == "s01") {
		screenType = "<b>Overview</b> section";
	} else if (pageName[1].charAt(0) == "s") {
		screenType = "<b>Scenario</b>";
	} else if (pageName[1].charAt(0) == "r") {
		screenType = "<b>resource</b>";
	} else if (pageName[1].charAt(0) == "b") {
		screenType = "<b>background</b>";	
	} else {
		if (pageName[1].substring(0,2) == "cm") {
			screenType = "<b>coach me</b>";
		} else if (pageName[1].substring(0,2) == "cs") {
			screenType = "<b>example</b>";
		}
	}
	return screenType ;	
}
	

//***alpha only  - remove in final version
if (top.useArrowNav)
{
	document.onkeydown = function keyDown2(e) {
		var ieKey;
		ieKey = event.keyCode;
		if (ieKey == 8) {
			window.event.keyCode = 32;
		} else if (ieKey == 39) {
			parent.nav.goNext();
		} else if (ieKey == 37) {
			parent.nav.goBack();
		}
	}
}