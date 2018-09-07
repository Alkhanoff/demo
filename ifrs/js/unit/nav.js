var strImagePath = "../../images/"; // The path of the image directory relative to the page
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
var objButtons = new Array();
var objTimerID = null;

var objCurrentUnit;
var objTitleFrame;
var objContentFrame;
var objToolsFrame;

appTop.intDocsTotal = 0;
appTop.intDocsViewed = 0;
appTop.intCommsTotal = 0;
appTop.intCommsViewed = 0;
appTop.booLastPage = false;
appTop.booInstructionChanged = false;
appTop.booQuestionPage = false;

parent.booNavLoaded = false;

function initialise()
{
    preloadImages();
    assignObjects();
	loadFirstPage();

    parent.booNavLoaded = true;
}

function assignObjects()
{
    objCurrentUnit = appTop.objCurrentState.objUnit;
	objTitleFrame = parent.objTitleFrame;
    objContentFrame = parent.objContentFrame;
    objToolsFrame = parent.objToolsFrame;

    objButtons["back"] = document.getElementById("back").style;
    objButtons["next"] = document.getElementById("next").style;
    objButtons["exit"] = document.getElementById("exit").style;
}

function preloadImages()
{
    exit_h.src = strImagePath + "exit_btn_h.gif";
    exit_n.src = strImagePath + "exit_btn_n.gif";
    back_h.src = strImagePath + "back_btn_h.gif";
    back_n.src = strImagePath + "back_btn_n.gif";
    next_h.src = strImagePath + "next_btn_h.gif";
    next_n.src = strImagePath + "next_btn_n.gif";
    help_h.src = strImagePath + "help_btn_h.gif";
    help_n.src = strImagePath + "help_btn_n.gif";
    print_h.src = strImagePath + "prnt_btn_h.gif";
    print_n.src = strImagePath + "prnt_btn_n.gif";
    actionPlanner_h.src = strImagePath + "atpln_btn_h.gif";
    actionPlanner_n.src = strImagePath + "atpln_btn_n.gif";
}

function changeImage(_strImgState)
{
    var _objImgStateArray = _strImgState.split("_");
    if (parent.booNavLoaded)
    {
	    document.getElementById(_objImgStateArray[0]+"Img").src = eval(_strImgState).src;
	}
    return;
}

function loadFirstPage()
{
    objCurrentUnit.setupUnit(appTop.strBaseURL + appTop.strUnitDir + "/content/");

    if (objCurrentUnit.booFromBookmark)
    {
    	for (var i=0; i<objCurrentUnit.objNavArray.length; i++)
    	{
    		if (objCurrentUnit.objNavArray[i][0].indexOf(objCurrentUnit.strPageJump,0) != -1)
    		{
    			objCurrentUnit.intCurrentPage = i;
    			break;
    		}
    	}

    	objCurrentUnit.strPageJump = null;
    	objCurrentUnit.booFromBookmark = false;
	}
	else if (appTop.booFromQuickFind)
	{
    	for (var i=0; i<objCurrentUnit.objNavArray.length; i++)
    	{
    		if (objCurrentUnit.objNavArray[i][0].indexOf(appTop.strTaskToGoTo,0) != -1)
    		{
    			objCurrentUnit.intCurrentPage = i;
    			break;
    		}
    	}
		appTop.strTaskToGoTo = null;
		appTop.booFromQuickFind = false;
	}
	else if (!appTop.booFromRevisit)
	{
		objCurrentUnit.intCurrentPage = 0;
	}

	appTop.booFromRevisit = false;
   	objContentFrame.location = appTop.strBaseURL + appTop.strUnitDir + "/content/" + objCurrentUnit.objNavArray[objCurrentUnit.intCurrentPage][0];
    objCurrentUnit.checkNav(objButtons);
}

function initPageType()
{
	var _intCount = 0;
	var _intSeed1;
	var _intSeed2;
	var _objTemp;
	if (objCurrentUnit.booAssessment)
	{
		if (objCurrentUnit.intCurrentPage == 0)
		{
			if (appTop.booShuffleAssessmentQuestions)
			{
	    		// If it is the first page of the assessment randomise the order of the pages
	    		// Re-order nav array apart from the first intro page
	    		// and the last screen which is the results screen.
	    		while (_intCount < 250)// swap pages over 250 times that should ensure a good random order
	    		{
	    			_intCount++
	    			_intSeed1 = 1 + Math.floor((objCurrentUnit.objNavArray.length-2) * Math.random());
	    			_intSeed2 = 1 + Math.floor((objCurrentUnit.objNavArray.length-2) * Math.random());
	    			if ((_intSeed1 != 0) && (_intSeed2 != 0))
	    			{
	    				_objTemp = new Array();
						for (var j=0; j<objCurrentUnit.objNavArray[_intSeed1].length; j++)
			    		{
			    			_objTemp[j] = objCurrentUnit.objNavArray[_intSeed1][j];
			    		}

						for (var j=0; j<objCurrentUnit.objNavArray[_intSeed2].length; j++)
			    		{
			    			objCurrentUnit.objNavArray[_intSeed1][j] = objCurrentUnit.objNavArray[_intSeed2][j];
			    		}

						for (var j=0; j<_objTemp.length; j++)
			    		{
			    			objCurrentUnit.objNavArray[_intSeed2][j] = _objTemp[j];
			    		}
	    			}
	    		}
	    	}
		}
		else if (objCurrentUnit.intCurrentPage != (objCurrentUnit.objNavArray.length-1))
		{
			//if it is not the results page re-name the Question screen to reflect the new order
			objContentFrame.document.getElementById("titleLayer").innerHTML = "Question " + objCurrentUnit.intCurrentPage;
		}
	}

	appTop.booQuestionPage = false;
	objCurrentUnit.setTaskID();
	objCurrentUnit.checkNav(objButtons,appTop.intPageType);
	objCurrentUnit.booOnTaskQuestion = false;
	objCurrentUnit.booDoCoachMeCheck = false;
	appTop.booAnswerStatus = false;
	objToolsFrame.checkClue();
	objContentFrame.popupShowing = "";
	objContentFrame.popupVisible = false;
	objToolsFrame.booCommsDone = true;
	if (objCurrentUnit.intCurrentPage+1 == objCurrentUnit.objNavArray.length) {
		appTop.booLastPage = true;

		appTop.homeAnchorBlink = setInterval('toggleAnchor()',appTop.intHomeLinkBlinkInterval);
	} else {
		appTop.booLastPage = false;
	}
	appTop.intDocsTotal = 0;
	appTop.intCommsTotal = 0;
	appTop.intDocsViewed = 0;
	appTop.intCommsViewed = 0;
	appTop.booInstructionChanged = false;
	switch (appTop.intPageType)
	{
	case appTop.MCQWITHFEEDBACK:
	case appTop.SLWITHFEEDBACK:
	case appTop.DRAGDROPPIO:
	case appTop.DRAGDROPBYCOLUMN:
	case appTop.DRAGDROPBYTHREECOLUMN:
	case appTop.MATCHINGPAIRS:
	case appTop.WORDMATCH:
	case appTop.WORDMATCHGRAPHIC:
	case appTop.MCQWITHFEEDBACK:
	case appTop.WORDMATCHGRAPHICLANDSCAPE:
	case appTop.MCQGRAPHICSWITHFEEDBACK:
		if (!objCurrentUnit.booAssessment)
		{
			appTop.booQuestionPage = true;
			//alert("objContentFrame.taskQuestion: " + objContentFrame.taskQuestion + "\n!objCurrentUnit.checkTaskQDone(): " + (!objCurrentUnit.checkTaskQDone()))
			if ((objContentFrame.taskQuestion) && (!objCurrentUnit.checkTaskQDone()))
			{
				objCurrentUnit.booOnTaskQuestion = true;
				//comment next line to disable next button hiding
	    		buttonState("next","hidden");
	    	}
	    	else
	    	{
	    		objToolsFrame.checkComms();
	    	}
		}
		break;
    default:
		objCurrentUnit.setTaskStatus();
		objToolsFrame.checkComms();
        break;
    }

	objToolsFrame.checkDocs();

    if (appTop.booDisplayPageNum)
        objCurrentUnit.showPageNum(document.getElementById("pageNum"));

//	if ((appTop.booLastPage) && (!appTop.booQuestionPage) && (appTop.intDocsTotal == 0) && (appTop.intCommsTotal ==0))
//		objTitleFrame.flashHomeLink();
}

function toggleAnchor()
{
	var objAnchor = parent.frames['titleF'].document.getElementById('homeLink');
	if(appTop.booLastPage)
	{
		if(objAnchor.className=='homelinkBgOn')
		{

			objAnchor.className = '';
		}
		else {
			objAnchor.className = 'homelinkBgOn';
		}
	}
	else {
		objAnchor.className = '';
		clearInterval(appTop.homeAnchorBlink);
	}
}

// called from the goPage() function in bookmarkframe.htm before jumping to a page.
// this is to ensure that anything that the content page need saving is saved.
function unloadContentPage()
{
    objContentFrame.pageUnload();
}

function showHelp()
{
	appTop.showHelp();
}

function doPrint()
{
	appTop.printPage();
}

function showNext()
{
	//alert("DEBUG::showNext()");
	var _booShowNext = false;

	if (objCurrentUnit.intCurrentPage != (objCurrentUnit.objNavArray.length - 1))
	{
		if ((objToolsFrame.intDocsToView < 1) || (appTop.booQuestionPage))
		{
			if (appTop.intCommsViewed == appTop.intCommsTotal)
			{
				if (objContentFrame.taskQuestion)
				{
					_booShowNext = objCurrentUnit.checkTaskQDone();
				}
				else
				{
					_booShowNext = true;
				}
			}
		}
	}

	//alert("DEBUG::showNext():_booShowNext: " + _booShowNext);

	if (_booShowNext)
		buttonState("next","visible");
}

function buttonState(_strBut, _strState)
{
	objButtons[_strBut].visibility = _strState;
}

function goBack()
{
    if (parent.booContentLoaded)
    {
    	//save open input data now, added by mvc 3/3/3
    	if ((appTop.intPageType == appTop.OPENINPUTSTART) || (appTop.intPageType == appTop.OPENINPUTBUILD))
    	{
    		if (objContentFrame.booInitialInputRemoved)
    		{
    			objCurrentUnit.saveOIData(objContentFrame.document.forms[0].elements['userInputField'].value, appTop.intPageType);
    		}
    	}

    	objToolsFrame.resetFlashingButtons();
    	objToolsFrame.disableComms();
        parent.booContentLoaded = false;
        objCurrentUnit.back(objContentFrame);
    }

    return;
}

function goNext()
{
	//alert("DEBUG::goNext():parent.booContentLoaded: " + parent.booContentLoaded)
    if (parent.booContentLoaded)
    {
    	//save open input data now, added by mvc 3/3/3
    	if ((appTop.intPageType == appTop.OPENINPUTSTART) || (appTop.intPageType == appTop.OPENINPUTBUILD))
    	{
    		if (objContentFrame.booInitialInputRemoved)
    		{

    			objCurrentUnit.saveOIData(objContentFrame.document.forms[0].elements['userInputField'].value, appTop.intPageType);


    		}
    	}

    	objToolsFrame.resetFlashingButtons();
    	objToolsFrame.disableComms();
        parent.booContentLoaded = false;
        objCurrentUnit.next(objContentFrame);
    }
    return;
}

function exitProgram()
{
	appTop.exit();
    return;
}

function checkInstruction()
{
	var _strInstructionText = getInstruction(false);

	if (_strInstructionText != "")
	{
		if (objContentFrame.document.getElementById("finalInstruction"))
		{
			objContentFrame.document.getElementById("finalInstruction").innerHTML = _strInstructionText;
		}
	}
}

function getInstruction(_booForceInstruction)
{
	//returns a string of the text to be used in instruction.
	var _strInstruction = "";
	var _strScreenType;

	switch (appTop.intPageType)
	{
	case appTop.OPENINPUTSTART:
	case appTop.OPENINPUTBUILD:
	case appTop.TEXTANDGRAPHIC:
	case appTop.OPENINPUTEND:
	case appTop.ASSESSMENTRESULT:
	case appTop.STORYBOARDFOUR:
	case appTop.TEXTONLY:
	case appTop.TABBEDSCREEN:
		//alert("prog testing: \n" + appTop.intDocsTotal + " " + appTop.intDocsViewed);
		if (appTop.intDocsTotal > appTop.intDocsViewed)
		{ //if there are documents to view, tell the user to click them
			_strInstruction += appTop.docInstr;
		}
		else if(appTop.intCommsTotal > appTop.intCommsViewed)
		{ //if there are comms to pick up, tell the user
			if (appTop.intCommsViewed == 0)
			{// if this is the first comm displayed
				if (appTop.intDocsViewed == 0)
				{//if the user has not seen any docs
					_strInstruction += appTop.firstCommNoDocInstr;
				}
				else
				{//if the user has already seen docs
					_strInstruction += appTop.firstCommAfterDocInstr;
				}
			}
			else
			{//if this is a subsequent comm
				_strInstruction += appTop.subsCommInstr;
			}
		}
		else if ((_booForceInstruction) || (appTop.booInstructionChanged))
		{ //no docs or comms to view - only return if forced to or needs to
			if (appTop.booLastPage)
			{//show last page text
				_strScreenType = screenTypeCheck(objCurrentUnit.objNavArray[objCurrentUnit.intCurrentPage][0]);
				if (appTop.strCourseID == "mf")
					_strInstruction += appTop.mfLastPageInstr;
				else
					_strInstruction += appTop.lastPageInstr.replace(/XXX/g, _strScreenType);

//				objTitleFrame.flashHomeLink();
			}
			else
			{
				if ((appTop.intPageType == appTop.OPENINPUTSTART) || (appTop.intPageType == appTop.OPENINPUTBUILD))
				{ //show next page text
					_strInstruction += appTop.nextPageOIInstr;
				}
				else
				{
					_strInstruction += appTop.nextPageInstr;
				}
				showNext();
			}
		}
		break;

	case appTop.MCQWITHFEEDBACK:
	case appTop.SLWITHFEEDBACK:
	case appTop.MCQGRAPHICSWITHFEEDBACK:
		if (appTop.intCommsTotal > appTop.intCommsViewed)
		{ //if there are comms to pick up, tell the user
			if (appTop.intCommsViewed == 0)
			{// if this is the first comm displayed
				_strInstruction += appTop.firstCommAfterDocInstr;
			}
			else
			{//if this is a subsequent comm
				_strInstruction += appTop.subsCommInstr;
			}
		}
		else if ((_booForceInstruction) || (appTop.booInstructionChanged))
		{ //no docs or comms to view - only return if forced to or needs to
			if (appTop.booLastPage)
			{//show last page text
				_strScreenType = screenTypeCheck(objCurrentUnit.objNavArray[objCurrentUnit.intCurrentPage][0])

				if (appTop.strCourseID == "mf")
					_strInstruction += appTop.mfLastPageInstr;
				else
					_strInstruction += appTop.lastPageInstr.replace(/XXX/g, _strScreenType);

//				objTitleFrame.flashHomeLink();
			}
			else
			{//show next page text
				_strInstruction += appTop.nextPageInstr;
				showNext();
			}
		}

		break;

	case appTop.DRAGDROPBYCOLUMN:
	case appTop.DRAGDROPBYTHREECOLUMN:
	case appTop.MATCHINGPAIRS:
	case appTop.WORDMATCH:
	case appTop.WORDMATCHGRAPHIC:
	case appTop.WORDMATCHGRAPHICLANDSCAPE:
		if (appTop.intCommsTotal > appTop.intCommsViewed)
		{ //if there are comms to pick up, tell the user
			if (appTop.intCommsViewed == 0)
			{// if this is the first comm displayed
				_strInstruction += appTop.firstCommAfterDocInstr;
			}
			else
			{//if this is a subsequent comm
				_strInstruction += appTop.subsCommInstr;
			}
		}
		else if ((_booForceInstruction) || (appTop.booInstructionChanged))
		{ //no docs or comms to view - only return if forced to or needs to
			_strScreenType = screenTypeCheck(objCurrentUnit.objNavArray[objCurrentUnit.intCurrentPage][0]);

			if (objContentFrame.isCorrect)
			{
				if (appTop.booLastPage)
				{//show last page text
					if (appTop.strCourseID == "mf")
						_strInstruction += appTop.mfLastPageInstr;
					else
						_strInstruction += appTop.lastPageInstr.replace(/XXX/g, _strScreenType);

//					objTitleFrame.flashHomeLink();
				}
				else
				{//show next page text
					_strInstruction += appTop.nextPageInstr;
					showNext();
				}
			}
			else
			{
				if (objContentFrame.buttonState == 1)
				{
					if (appTop.booLastPage)
					{//show last page text
						if (appTop.strCourseID == "mf")
							_strInstruction += appTop.mfShowMeLastInstr;
						else
							_strInstruction += appTop.showMeLastInstr.replace(/XXX/g, _strScreenType);

//						objTitleFrame.flashHomeLink();
					}
					else
					{//show next page text
						_strInstruction += appTop.showMeNextInstr;
					}
				}
				else
				{
					if (appTop.booLastPage)
					{//show last page text
						if (appTop.strCourseID == "mf")
							_strInstruction += appTop.mfYourAnswerLastInstr;
						else
							_strInstruction += appTop.yourAnswerLastInstr.replace(/XXX/g, _strScreenType);

//						objTitleFrame.flashHomeLink();
					} else {//show next page text

						_strInstruction += appTop.showMeNextInstr;
						showNext();
					}
				}
			}
		}

		break;
	case appTop.QUIZRESULTS:
		_strScreenType = screenTypeCheck(objCurrentUnit.objNavArray[objCurrentUnit.intCurrentPage][0]);
		_strInstruction += appTop.lastPageInstr.replace(/XXX/g, "<b>Assessment</b> section");

		if (objContentFrame.scoreAcheived >= objCurrentUnit.passRate)
		{
			_strInstruction += appTop.printCertificateInstr;
		}

//		objTitleFrame.flashHomeLink();

		break;

	case appTop.HOTGRAPHIC:
	case appTop.HOTTEXT:
		//do nothing - these types do not feature in scenarios
		break;
	}

	if (_strInstruction != "")
	{

		appTop.booInstructionChanged = true;
	}

	return _strInstruction;
}

function screenTypeCheck(_strPageName) {
	var _strScreenType = "";

	_strPageName = _strPageName.toLowerCase();
	_strPageName = _strPageName.split("_");

	if (_strPageName[1].substring(0,3) == "s01")
	{
		_strScreenType = "<b>Overview</b> section";
	}
	else if (_strPageName[1].charAt(0) == "s")
	{
		_strScreenType = "<b>Scenario</b>";
	}
	else if (_strPageName[1].charAt(0) == "r")
	{
		_strScreenType = "<b>resource</b>";
	}
	else if (_strPageName[1].charAt(0) == "b")
	{
		_strScreenType = "<b>background</b>";
	}
	else
	{
		if (_strPageName[1].substring(0,2) == "cm")
		{
			_strScreenType = "<b>coach me</b>";
		}
		else if (_strPageName[1].substring(0,2) == "cs")
		{
			_strScreenType = "<b>example</b>";
		}
	}
	return _strScreenType ;
}


//***alpha only  - remove in final version
if (top.booUseArrowNav)
{
	document.onkeydown = function keyDown2(e) {
		var ieKey;

		ieKey = event.keyCode;
		if (ieKey == 8) {
			window.event.keyCode = 32;
		} else if (ieKey == 39) {

			if(objCurrentUnit.objNavArray.length != objCurrentUnit.intCurrentPage+1)
			{
				parent.objNavFrame.goNext();
			}

		} else if (ieKey == 37) {

			if(objCurrentUnit.intCurrentPage && objCurrentUnit.intCurrentPage > 0)
			{
				parent.objNavFrame.goBack();
			}
		}
	}
}