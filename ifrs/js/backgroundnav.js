var strImagePath = "../images/popups/background/"; // The path of the image directory relative to the page 
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
var return_h = new Image();
var return_n = new Image();

function initialise()
{
	preloadImages();
	if (parent.booFromQuickFind)
		document.getElementById("returnL").style.visibility = "visible";

	parent.startBackground();
	parent.booNavLoaded = true;
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
}

function returnToQuickFind()
{
	parent.objOpenerTop.launchQuickfind();
	top.window.close();
}

function changeImage(_strState)
{
    var arrImg = _strState.split("_");
    
    if (parent.booNavLoaded)
    {
    	document.getElementById(arrImg[0] + "Img").src = eval(_strState).src;
    }

    return;
}

function goBack()
{
	if (parent.booContentLoaded)
	{
		parent.booContentLoaded = false;
		parent.intCurrentPage--;
		parent.objContentFrame.location = parent.strBackgroundURL + parent.navArray[parent.intCurrentPage];
	}
}

function goNext()
{
	if (parent.booContentLoaded)
	{
		parent.booContentLoaded = false;
		parent.intCurrentPage++;
		parent.objContentFrame.location = parent.strBackgroundURL + parent.navArray[parent.intCurrentPage];
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
	var _strInstruction = parent.objGenericText["backgroundclose"];
	
	switch (parent.intPageType)
	{
	case parent.HOTGRAPHIC:
	case parent.HOTTEXT:
	case parent.TABBEDSCREEN:
		if ((parent.intCurrentPage == (parent.navArray.length - 1)) && (parent.booFromQuickFind))
			parent.objContentFrame.theInstructionText = _strInstruction;
		break;
	case parent.SLWITHFEEDBACK:
	case parent.MCQWITHFEEDBACK:
		if ((parent.objCurrentState.objUnit.intCurrentPage == (parent.objCurrentState.objUnit.navArray.length - 1)) && (parent.booFromQuickFind))
			parent.objContentFrame.instructionText = _strInstruction;
		break;
	default:
		if ((parent.intCurrentPage == (parent.navArray.length - 1)) && (parent.booFromQuickFind) && (_objFinalInstruction))
			_objFinalInstruction.innerHTML = _strInstruction;
		break;
	}
}

function checkNav()
{
	doCheckNav();
}

function doCheckNav()
{
	if (parent.navArray.length == 1)
	{
		buttonState("nextL","hidden");
		buttonState("backL","hidden");
	}
	else if (parent.intCurrentPage == 0)
	{
		buttonState("nextL","visible");
		buttonState("backL","hidden");
	}
	else if (parent.intCurrentPage == (parent.navArray.length-1))
	{
		buttonState("nextL","hidden");
		buttonState("backL","visible");
	}
	else
	{
		buttonState("nextL","visible");
		buttonState("backL","visible");
	}

	showPageNum();
}

function showPageNum()
{
	document.getElementById("pageNum").innerHTML = (parent.intCurrentPage + 1) + "/" + parent.navArray.length;
}

function exit()
{
	top.window.close();
}

function buttonState(_strButton, _strState)
{
	document.getElementById(_strButton).style.visibility = _strState;
}

function showHelp() {
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