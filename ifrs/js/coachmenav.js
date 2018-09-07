var strImagePath = "../images/popups/coachme/"; // The path of the image directory relative to the page
var exit_h = new Image();
var exit_n = new Image();
var back_h = new Image();
var back_n = new Image();
var next_h = new Image();
var next_n = new Image();
var print_h = new Image();
var print_n = new Image();
var help_h = new Image();
var help_n = new Image();
var return_h = new Image();
var return_n = new Image();
var return2_h = new Image();
var return2_n = new Image();

function initialise()
{
	preloadImages();
	if (parent.objOpenerTop.booFromQuickFind)
		document.getElementById("returnL").style.visibility = "visible";
	if (parent.objOpenerTop.booFromKeyword)
		document.getElementById("return2L").style.visibility = "visible";
	parent.startCoachme();
	parent.booNavLoaded = true;
}

function getInstruction()
{
	//returns a string of the text to be used in instruction.
	var _strInstruction = "";

	switch (parent.intPageType) {
	case parent.OPENINPUTSTART:
	case parent.OPENINPUTBUILD:
		_strInstruction = parent.objGenericText["openinputtextentered"];
		break;
	default:
		break;
	}
	return _strInstruction;
}

function preloadImages()
{
    exit_h.src = strImagePath + "close_h.gif";
    exit_n.src = strImagePath + "close_n.gif";
    back_h.src = strImagePath + "back_h.gif";
    back_n.src = strImagePath + "back_n.gif";
    next_h.src = strImagePath + "next_h.gif";
    next_n.src = strImagePath + "next_n.gif";
    print_h.src = strImagePath + "print_h.gif";
    print_n.src = strImagePath + "print_n.gif";
    help_h.src = strImagePath + "help_h.gif";
    help_n.src = strImagePath + "help_n.gif";
    return_h.src = strImagePath + "return_h.gif";
    return_n.src = strImagePath + "return_n.gif";
    return2_h.src = strImagePath + "return_keyword_h.gif";
    return2_n.src = strImagePath + "return_keyword_n.gif";
}

function changeImage(_strState)
{
    if (parent.booNavLoaded)
    {
        document.getElementById(_strState.split("_")[0] + "Img").src = eval(_strState).src;
    }
    return;
}

function returnToQuickFind()
{
	parent.objOpenerTop.launchQuickfind();
	parent.window.close();
}

function returnToKeyword()
{
	parent.objOpenerTop.keywordResult();
	parent.window.close();
}

function goBack()
{
	if (parent.booContentLoaded)
	{
    	if (parent.intPageType == parent.OPENINPUTSTART) {
    		if (parent.objContentFrame.booInitialInputRemoved) {
    			parent.objCurrentState.objUnit.saveOIData(parent.objContentFrame.document.forms[0].elements['userInputField'].value, parent.intPageType)
    		}
    	}
		parent.booContentLoaded = false;
		parent.objCurrentState.objUnit.intCurrentPage--;
		parent.objContentFrame.location = parent.objCurrentState.objUnit.URL + parent.objCurrentState.objUnit.objNavArray[parent.objCurrentState.objUnit.intCurrentPage][0];
	}
}

function goNext()
{
	if (parent.booContentLoaded)
	{
    	if (parent.intPageType == parent.OPENINPUTSTART) {
    		if (parent.objContentFrame.booInitialInputRemoved) {
      			parent.objCurrentState.objUnit.saveOIData(parent.objContentFrame.document.forms[0].elements['userInputField'].value, parent.intPageType)
    		}
    	}
		parent.booContentLoaded = false;
		parent.objCurrentState.objUnit.intCurrentPage++;
		parent.objContentFrame.location = parent.objCurrentState.objUnit.URL + parent.objCurrentState.objUnit.objNavArray[parent.objCurrentState.objUnit.intCurrentPage][0];
	}
}

function initPageType()
{
	checkInstruction();
	checkNav();
}

function checkInstruction()
{
	var _objFinalInstruction = parent.objContentFrame.document.getElementById("finalInstruction");
	var _strInstruction1 = parent.objGenericText["coachmereturntoquickfind"];
	var _strInstruction2 = parent.objGenericText["coachmeclose"];
	var _strInstruction;


	if (parent.booFromQuickFind)
		_strInstruction = _strInstruction1;
	else if (parent.intNumOfCM == 1)
		_strInstruction = _strInstruction2;

	if ((parent.booFromQuickFind) || (parent.intNumOfCM == 1))
	{
		switch (parent.intPageType)
		{
		case parent.HOTGRAPHIC:
		case parent.HOTTEXT:
		case parent.TABBEDSCREEN:
			if (parent.objCurrentState.objUnit.intCurrentPage == (parent.objCurrentState.objUnit.objNavArray.length - 1))
				parent.objContentFrame.theInstructionText = _strInstruction;
			break;
		case parent.SLWITHFEEDBACK:
		case parent.MCQWITHFEEDBACK:
			if (parent.objCurrentState.objUnit.intCurrentPage == (parent.objCurrentState.objUnit.objNavArray.length - 1))
				parent.objContentFrame.instructionText = _strInstruction;
			break;
		default:
			if ((parent.objCurrentState.objUnit.intCurrentPage == (parent.objCurrentState.objUnit.objNavArray.length - 1)) && (_objFinalInstruction))
				_objFinalInstruction.innerHTML = _strInstruction;
			break;
		}
	}
}

function checkNav()
{
	if (parent.objCurrentState.objUnit.objNavArray.length == 1)
	{
		buttonState("nextL","hidden");
		buttonState("backL","hidden");
	}
	else if (parent.objCurrentState.objUnit.intCurrentPage == 0)
	{
		buttonState("nextL","visible");
		buttonState("backL","hidden");
	}
	else if (parent.objCurrentState.objUnit.intCurrentPage == (parent.objCurrentState.objUnit.objNavArray.length - 1))
	{
		buttonState("nextL","hidden");
		buttonState("backL","visible");
	}
	else
	{
		buttonState("nextL","visible");
		buttonState("backL","visible");
	}

	parent.objCurrentState.objUnit.showPageNum(document.getElementById("pageNum"));
	if (parent.booDoCoachMeCheck)
	{
		checkCurrentProgress();
	}
}

function checkCurrentProgress()
{
	//alert("DEBUG::checkCurrentProgress()")
	var _intDoneCount = 0;

	if (parent.objCurrentUnit.objTaskQSArray[parent.objCurrentUnit.strCurrentTaskID][0] != 1)
	{
		//alert("DEBUG::checkCurrentProgress() 1")
		for (var i=1; i < parent.objCurrentUnit.objTaskQSArray[parent.objCurrentUnit.strCurrentTaskID].length; i++)
		{
			var _objCurrTaskArray = parent.objCurrentUnit.objTaskQSArray[parent.objCurrentUnit.strCurrentTaskID]
			//alert("parent.objCurrentUnit.strCurrentTaskID: " + parent.objCurrentUnit.strCurrentTaskID)
			//alert("_objCurrTaskArray[i][0]: " + _objCurrTaskArray[i][0] + "\nparent.strCurrentCoachMe: " + parent.strCurrentCoachMe)
			if (parent.strCurrentCoachMe == _objCurrTaskArray[i][0])
			{
				if (_objCurrTaskArray[i][2] != 1)
				{
					if (_objCurrTaskArray[i][1] != 0)
					{
						if ((parent.objCurrentState.objUnit.intCurrentPage + 1) == _objCurrTaskArray[i][1])
							_objCurrTaskArray[i][2] = 1;
					}
					else
					{
						//alert("DEBUG::checkCurrentProgress():\nparent.objCurrentState.objUnit.intCurrentPage: " + parent.objCurrentState.objUnit.intCurrentPage + "\nparent.objCurrentState.objUnit.objNavArray.length - 1: " + (parent.objCurrentState.objUnit.objNavArray.length - 1))
						if (parent.objCurrentState.objUnit.intCurrentPage == (parent.objCurrentState.objUnit.objNavArray.length - 1))
							_objCurrTaskArray[i][2] = 1;
					}
				}
			}

			if (_objCurrTaskArray[i][2] == 1)
				_intDoneCount++;
		}

		if (_intDoneCount == (_objCurrTaskArray.length - 1))
			parent.unlockQuestion();
	}
	else
	{
		//alert("DEBUG::checkCurrentProgress() 2")
		parent.unlockQuestion();
	}
}

function exit()
{
	parent.window.close();
}

function buttonState(_strBut, _strState)
{
	document.getElementById(_strBut).style.visibility = _strState;
}

function showHelp()
{
	parent.showHelp();
}

function doPrint() {
	parent.printPage();
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

			if(parent.objCurrentState.objUnit.objNavArray.length != parent.objCurrentState.objUnit.intCurrentPage+1)
			{
				goNext();
			}

		} else if (ieKey == 37) {

			if(parent.objCurrentState.objUnit.intCurrentPage && parent.objCurrentState.objUnit.intCurrentPage > 0)
			{
				goBack();
			}
		}
	}
}