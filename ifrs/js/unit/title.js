var strImagePath = "../../images/"; // The path of the image directory relative to the page 
var add_h = new Image();
var add_n = new Image();
var view_h = new Image();
var view_n = new Image();
var go_h = new Image();
var go_n = new Image();
var objCurrentUnit;

parent.booTitleLoaded = false;

function initialise()
{
	objCurrentUnit = appTop.objCurrentState.objUnit;

	preloadImages();
	showPath();
	if ((appTop.strCourseID != "mf") && (appTop.strCourseID != "help"))
	{
		document.getElementById("keyword").style.visibility = "visible";
		document.getElementById("keywords").style.visibility = "visible";
		showKeywords();
	}

	parent.booTitleLoaded = true;

	parent.objToolsFrame.location = "toolsandcomms.htm";
}

function showKeywords()
{
	document.getElementById("keywords").innerHTML = appTop.retrieveKeywords();
}

function keywordSelected()
{
	appTop.keywordSelected(document.forms['kwForm'].elements['kwOptions']);
}

function preloadImages()
{
    add_h.src = strImagePath + "add_btn_h.gif";
    add_n.src = strImagePath + "add_btn_n.gif";
    view_h.src = strImagePath + "view_btn_h.gif";
    view_n.src = strImagePath + "view_btn_n.gif";
    go_h.src = strImagePath + "go_btn_h.gif";
    go_n.src = strImagePath + "go_btn_n.gif";
}

function changeImage(_strImgState)
{
    var _objImgStateArray = _strImgState.split("_");
    
    if (parent.booTitleLoaded)
    {
    	document.getElementById(_objImgStateArray[0]+"Img").src = eval(_strImgState).src;
    }

    return;
}

function showPath()
{
	var _strPath = "";
	var _objTitle = objCurrentUnit.strTitle.split(":");

	_strPath += "<a href=\"javascript:returnToMenu()\" id='homeLink'>" + appTop.objCourse[appTop.strCourseID].strTitle + "</a> &gt; " + _objTitle[0];
	document.getElementById("pathL").innerHTML = _strPath;
}

function returnToMenu()
{
	appTop.booLinearRoute = false;
	appTop.booFromQuickFind = false;
    objCurrentUnit.menu(appTop.objMainAreaFrame, appTop.strBaseURL + appTop.strCourseID + "/menu/menu.htm");
}

function launchQuickfind()
{
	document.getElementById("goImg").src = go_n.src;
	appTop.booLinearRoute = false;
	appTop.launchQuickfind();
}

function viewBookmarks()
{
	appTop.viewBookmarks();
}

function addBookmark()
{
	if (!objCurrentUnit.booAssessment)
	{
		objCurrentUnit.bookmarkPage();
		alert(appTop.objGenericText["bookmarkadded"]);
	}
	else
	{
		alert(appTop.objGenericText["bookmarkdisabled"]);
	}
}
