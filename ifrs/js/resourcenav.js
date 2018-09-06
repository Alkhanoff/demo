var strImagePath = "../images/"; // The path of the image directory relative to the page 
var exit_h = new Image();
var exit_n = new Image();
var back_h = new Image();
var back_n = new Image();
var next_h = new Image();
var next_n = new Image();
var refReturn_h = new Image();
var refReturn_n = new Image();
var help_h = new Image();
var help_n = new Image();
var print_h = new Image();
var print_n = new Image();
var return_h = new Image();
var return_n = new Image();

function initialise()
{
	preloadImages();
	if (parent.objOpenerTop.booBackToRef) { // if a back to refs button is needed
		document.getElementById("refReturnL").style.visibility = "visible";
		parent.objOpenerTop.booBackToRef = false;
	}
	if (parent.objOpenerTop.booFromKeyword)
		document.getElementById("returnL").style.visibility = "visible";

	parent.startResource();
	parent.booNavLoaded = true;
}

function preloadImages()
{
    exit_h.src = strImagePath + "popups/resource/close_h.gif";
    exit_n.src = strImagePath + "popups/resource/close_n.gif";
    back_h.src = strImagePath + "popups/resource/back_h.gif";
    back_n.src = strImagePath + "popups/resource/back_n.gif";
    next_h.src = strImagePath + "popups/resource/next_h.gif";
    next_n.src = strImagePath + "popups/resource/next_n.gif";
    refReturn_h.src = strImagePath + "popups/resource/return_h.gif";
    refReturn_n.src = strImagePath + "popups/resource/return_n.gif";
    print_h.src = strImagePath + "popups/resource/print_h.gif";
    print_n.src = strImagePath + "popups/resource/print_n.gif";
    help_h.src = strImagePath + "popups/resource/help_h.gif";
    help_n.src = strImagePath + "popups/resource/help_n.gif"; 
    return_h.src = strImagePath + "popups/resource/return_keyword_h.gif";
    return_n.src = strImagePath + "popups/resource/return_keyword_n.gif";
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

function showNav()
{
	document.getElementById("navBackL").style.visibility = "visible";
}

function goBack()
{
	if (parent.booContentLoaded)
	{
		parent.booContentLoaded = false;
		parent.intCurrentPage--;
		parent.objContentFrame.location = parent.strResourceURL + parent.navArray[parent.intCurrentPage];
	}
}

function goNext()
{
	if (parent.booContentLoaded)
	{
		parent.contentLoaded = false;
		parent.intCurrentPage++;
		parent.objContentFrame.location = parent.strResourceURL + parent.navArray[parent.intCurrentPage];
	}
}

function initPageType()
{
	// need pageType check coded
	checkNav();
}

function checkNav()
{
	if (parent.navArray.length > 1)
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
	document.getElementById("pageNum").innerHTML = (parent.intCurrentPage + 1) + " of " + parent.navArray.length;
}

function exit()
{
	top.window.close();
}

function buttonState(_strButton, _strState)
{
	document.getElementById(_strButton).style.visibility = _strState;
}

function refReturn() {
	parent.objOpenerTop.launchRef();
	top.window.close();
}

function returnToKeyword()
{
	parent.objOpenerTop.keywordResult();
	top.window.close();
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
			
			if(parent.navArray.length != parent.intCurrentPage+1)
			{
				goNext();
			}
			
		} else if (ieKey == 37) {
			
			if(parent.intCurrentPage && parent.intCurrentPage > 0)
			{
				goBack();
			}
		}
	}
}
