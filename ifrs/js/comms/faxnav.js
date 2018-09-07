var back_h = new Image();
var back_n = new Image();
var next_h = new Image();
var next_n = new Image();

function initialise()
{
	common_init();
	preloadExtraImages();
	parent.loadFax();
	parent.booNavLoaded = true;
}

function preloadExtraImages()
{
    back_h.src = strImagePath + "popups/comms/nav_buttons/back_h.gif";
    back_n.src = strImagePath + "popups/comms/nav_buttons/back_n.gif";
    next_h.src = strImagePath + "popups/comms/nav_buttons/next_h.gif";
    next_n.src = strImagePath + "popups/comms/nav_buttons/next_n.gif";
}

function goBack()
{
	if (parent.booContentLoaded)
	{
		parent.booContentLoaded = false;
		parent.hidePopupLayer();
		changeFax("hidden")
		parent.intCurrentPageNo--;
		changeFax("visible")
		checkNav();
	}
}

function goNext()
{
	if (parent.booContentLoaded)
	{
		parent.booContentLoaded = false;
		parent.hidePopupLayer();
		changeFax("hidden")
		parent.intCurrentPageNo++;
		changeFax("visible")
		checkNav();
	}
}

function changeFax(_strVis)
{	
	var _objContentDoc = parent.window["contentF"].document;
	
	if (parent.intCurrentPageNo == 1) {
		_objContentDoc.getElementById("faxPage1").style.visibility = _strVis;
		_objContentDoc.getElementById("faxPage1Text").style.visibility = _strVis;
		_objContentDoc.getElementById("faxPage1To").style.visibility = _strVis;
		_objContentDoc.getElementById("faxPage1From").style.visibility = _strVis;
		_objContentDoc.getElementById("faxPage1Subject").style.visibility = _strVis;
		_objContentDoc.getElementById("faxPage1Body").style.visibility = _strVis;
		if (_objContentDoc.getElementById("faxPage1Logo")) {
			_objContentDoc.getElementById("faxPage1Logo").style.visibility = _strVis;
		}
	} else {
		_objContentDoc.getElementById("faxPage2").style.visibility = _strVis;
		_objContentDoc.getElementById("faxPage2Text").style.visibility = _strVis;
	}
}

function checkNav()
{
	if (parent.intNoOfPages == 1)
	{
		buttonState("nextL","hidden");
		buttonState("backL","hidden");
	}
	else if (parent.intCurrentPageNo == 1)
	{
		buttonState("nextL","visible");
		buttonState("backL","hidden");
	}
	else if (parent.intCurrentPageNo == parent.intNoOfPages)
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
	parent.booContentLoaded = true;
}

function showPageNum()
{
	document.getElementById("pageNum").innerHTML = parent.intCurrentPageNo + "/" + parent.intNoOfPages;
}

function buttonState(_strButton, _strState)
{
	document.getElementById(_strButton).style.visibility = _strState;
}
