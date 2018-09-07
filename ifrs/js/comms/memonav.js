var back_h = new Image();
var back_n = new Image();
var next_h = new Image();
var next_n = new Image();

function initialise()
{
	common_init();
	preloadExtraImages();
	parent.loadMemo();
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
		changeMemo("hidden")
		parent.intCurrentPageNo--;
		changeMemo("visible")
		checkNav();
	}
}

function goNext()
{
	if (parent.booContentLoaded)
	{
		parent.booContentLoaded = false;
		parent.hidePopupLayer();
		changeMemo("hidden")
		parent.intCurrentPageNo++;
		changeMemo("visible")
		checkNav();
	}
}

function changeMemo(_strVis)
{
	parent.window["contentF"].document.getElementById("memoPage" + parent.intCurrentPageNo + "Text").style.visibility = _strVis;
	parent.window["contentF"].document.getElementById("memoPage" + parent.intCurrentPageNo + "Background").style.visibility = _strVis;
}

function checkNav() {
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
