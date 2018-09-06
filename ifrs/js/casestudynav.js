var strImagePath = "../images/popups/examples/"; // The path of the image directory relative to the page 
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

	parent.startCaseStudy();
	parent.booNavLoaded = true;
}

function getInstruction( _booForceInstruction) {
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
    var _arrImg = _strState.split("_");
    
    if (parent.booNavLoaded)
    {
    	document.getElementById(_arrImg[0] + "Img").src = eval(_strState).src;
    }
    return;
}

function returnToQuickFind()
{
	parent.objOpenerTop.launchQuickfind();
	top.window.close();
}

function returnToKeyword()
{
	parent.objOpenerTop.keywordResult();
	top.window.close();
}

function goBack()
{
	if (parent.booContentLoaded)
	{
    	if (parent.intPageType == parent.OPENINPUTSTART) {
    		if (parent.objContentFrame.booInitialInputRemoved) {
    			parent.objCurrentState.objUnit.saveOIData(parent.objContentFrame.document.forms['userInputForm'].elements['userInputField'].value, parent.intPageType)	
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
    			parent.objCurrentState.objUnit.saveOIData(parent.objContentFrame.document.forms['userInputForm'].elements['userInputField'].value, parent.intPageType)	
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
	var _strInstruction1 = parent.objGenericText["examplereturntoquickfind"];
	var _strInstruction2 = parent.objGenericText["exampleclose"];
	var _strInstruction;
	
	if (parent.booFromQuickFind)
		_strInstruction = _strInstruction1;
	else if (parent.intNumOfCS == 1)
		_strInstruction = _strInstruction2;
	
	if ((parent.booFromQuickFind) || (parent.intNumOfCS == 1))
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
			if (parent.objCurrentState.objUnit.intCurrentPage == (parent.objCurrentState.objUnit.objNavArray.length-1))
				parent.objContentFrame.instructionText = _strInstruction;
			break;
		default:
			if ((parent.objCurrentState.objUnit.intCurrentPage == (parent.objCurrentState.objUnit.objNavArray.length-1)) && (_objFinalInstruction))
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
	else if (parent.objCurrentState.objUnit.intCurrentPage == (parent.objCurrentState.objUnit.objNavArray.length-1))
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
}

function exit()
{
	top.window.close();
}

function buttonState(_strButton, _strState)
{
	document.getElementById(_strButton).style.visibility = _strState;
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