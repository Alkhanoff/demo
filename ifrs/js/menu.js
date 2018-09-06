var strImagePath = "../../images/"; // The path of the image directory relative to the page 
var exit_h = new Image();
var exit_n = new Image();
var view_h = new Image();
var view_n = new Image();
var cert_h = new Image();
var cert_n = new Image();
var actionPlanner_h = new Image();
var actionPlanner_n = new Image();
var go_h = new Image();
var go_n = new Image();
var objCourse;
var objMainArea;
var objOptions;
var objArrow;
var arrArrowTop = new Array();
var objDescription;
var objDisplayImage;
var objStatusImages = new Array();
var intUnitsCompleted;
var booPageLoaded = false;

function initialise()
{
	assignObjects();

	parent.saveTrackingData();

	if (appTop.objCurrentState.objUnit != null)
		resetUnit();

	preloadImages();
	showPath();
	showText();

	if ((appTop.strCourseID != "mf" ) && (appTop.strCourseID != "help" ))
		showKeywords();

	showMenu();
	objCourse.checkStatus();

	if (appTop.objRivisitArray != null)
		checkRevisit();

	checkCert();
	booPageLoaded = true;
}

if(top.booEnableRightClick)
{
	if(document.all) //For IE
	{
		document.onmousedown = checkRightMouse;
	}
	else { //For Firefox
		document.onclick = 	checkRightMouse;
	}
}

if(top.booEnableCopy)
{
	if(document.all) //IE
	{
		document.onselectstart = doSelectStart;
	}
	else { // Firefox
		document.onmousedown = disableSelectFF;
	}
} 

function disableSelectFF(e)
{
	if(e.target.id == "userInputField")
	{
		haveSelectedTextInInputBox = true;
	}
	else {
		return false;	
	}	
} 

function doSelectStart(e) 
{ 
	if(window.event.srcElement.id=="userInputField")
	{
		haveSelectedTextInInputBox = true;
	}
	else
	{
		window.event.returnValue = false; 
		window.event.cancelBubble = true; 
	}
}

function checkRightMouse(e)
{
	if (document.all) // for IE
	{
		if(event.button == 2 || event.button == 3)
		{
			alert(appTop.strVersion);
			return false;
		}
	}
	else // for FF
	{
		if(e.button == 2 || e.button == 3)
		{
			alert(appTop.strVersion);
			return false;	
		} 
	}
}

function assignObjects()
{
	objCourse = appTop.objCourse[appTop.strCourseID];

	objMainArea = document.getElementById("mainAreaL");
	objOptions = document.getElementById("optionsL");
	objArrow = document.getElementById("arrowImg");
	objDescription = document.getElementById("descriptionL");
	objDisplayImage = document.getElementById("imageL");
}

function preloadImages()
{
    exit_h.src = strImagePath+ "exit_btn_h.gif";
    exit_n.src = strImagePath + "exit_btn_n.gif";
    view_h.src = strImagePath + "view_btn_h.gif";
    view_n.src = strImagePath + "view_btn_n.gif";
    actionPlanner_h.src = strImagePath + "atpln_btn_h.gif";
    actionPlanner_n.src = strImagePath + "atpln_btn_n.gif";
    go_h.src = strImagePath + "go_btn_h.gif";
    go_n.src = strImagePath + "go_btn_n.gif";
    cert_h.src = strImagePath + "menu/print_cert_h.gif";
    cert_n.src = strImagePath + "menu/print_cert_n.gif";

	objStatusImages[0] = new Array();
	objStatusImages[0][0] = new Image();
	objStatusImages[0][0].src = strImagePath+"menu/status_tracking_n.gif";
	objStatusImages[0][1] = "Not started.";
	objStatusImages[1] = new Array();
	objStatusImages[1][0] = new Image();
	objStatusImages[1][0].src = strImagePath+"menu/status_tracking_s.gif";
	objStatusImages[1][1] = "Started.";
	objStatusImages[2] = new Array();
	objStatusImages[2][0] = new Image();
	objStatusImages[2][0].src = strImagePath+"menu/status_tracking_c.gif";
	objStatusImages[2][1] = "Completed.";
}

function resetUnit()
{
	var _objUnit = appTop.objCurrentState.objUnit;
	
	_objUnit.booOnTaskQuestion = false;
	_objUnit.booDoCoachMeCheck = false;
	_objUnit.intCurrentPage = 0;
	_objUnit.intTaskStatusIndex = 0;
	_objUnit.strCurrentTaskID = null;
	_objUnit = null;
}

function showPath()
{
	var _strPath = "";
	var _strDownloadString = "<a href=\"#\" onclick=\"appTop.downloadModule()\">" + appTop.objGenericText["download"] + "</a>";

	_strPath += objCourse.strTitle;
	
	if (appTop.booWeb)
		_strPath += " > " + _strDownloadString;

	document.getElementById("pathL").innerHTML = _strPath;
}

function showText()
{
	document.getElementById("welcomeL").innerHTML = "Welcome to the " + objCourse.strTitle.replace(/ home/gi,'') + " e-learning module";
	showDefaultDescriptionImage();
}

function showDefaultDescriptionImage()
{
	objDescription.innerHTML = appTop.strModuleDes;
	//objDisplayImage.src = "images/main_graphic.jpg";
}

function showTopicDescriptionImage( _intTopic )
{
	var _strID = objCourse.objChilds[_intTopic].strID;

	objDescription.innerHTML = eval("top.str" + _strID + "Des");
	//objDisplayImage.src = "images/" + _strID + ".jpg";
}

function showKeywords()
{
	document.getElementById("keywords").innerHTML = appTop.retrieveKeywords();
}

function keywordSelected()
{
	appTop.keywordSelected(document.forms['kwForm'].elements['kwOptions']);
}

function showMenu()
{
	var _intOptionHeight = objOptions.offsetHeight / objCourse.objChilds.length;
	var _intLeft = objOptions.offsetLeft;
	var _intTop = objOptions.offsetTop;
	var _strOptions = "";
	var _strMouseOver = "";
	var _strMouseOut = "";
	var _strFocus = "";
	var _strBlur = "";
	var _strHref = "";
	var _strTitle = "";
	var _booAssessment;

	intUnitsCompleted = 0;

	for (var i=0; i<objCourse.objChilds.length; i++)
	{
		_booAssessment = objCourse.objChilds[i].booAssessment;

		_strMouseOver = "onmouseover=\"optionOver(" + i + ")\"";
		_strMouseOut = "onmouseout=\"optionOut(" + i + ")\"";
		_strFocus = "onfocus=\"optionOver(" + i + ")\"";
		_strBlur = "onblur=\"optionOut(" + i + ")\"";
		_strOnClick = "onClick=\"goUnit('"+objCourse.strID+"_"+objCourse.objChilds[i].strID+"',"+_booAssessment+")\"";
		_strHref = "href=\"JavaScript:goUnit('"+objCourse.strID+"_"+objCourse.objChilds[i].strID+"',"+_booAssessment+")\"";
		_strTitle = objCourse.objChilds[i].strTitle;
		if (_strTitle.indexOf(":",0) != -1)
		{
			_strTitle = _strTitle.split(":")[1];
		}

		_strOptions += "<div id=\"option" + i + "L\" class=\"optionNC\" style=\"top:" + (_intOptionHeight * i) + "px; height:" + _intOptionHeight + "px\" " + _strMouseOver + " " + _strMouseOut + " " + _strOnClick + ">" + 
			"<table height=\"" + _intOptionHeight + "\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">" +
			"<tr><td width=\"50\" align=\"center\" valign=\"center\"><img src=\"" + objStatusImages[objCourse.objChilds[i].intState][0].src + "\" alt=\"" + objStatusImages[objCourse.objChilds[i].intState][1] + "\"></td>" +
			"<td valign=\"center\">" +
			"<a " + _strHref + " " + _strFocus + " " + _strBlur + ">" + _strTitle + "</a>" +
			"</td></tr></table>" +
			"</div>";

		if (objCourse.objChilds[i].intState == appTop.COMPLETED)
		{
			intUnitsCompleted++;
		}

		arrArrowTop[i] = _intTop + (_intOptionHeight * i) + (_intOptionHeight / 2) - (objArrow.height / 2);
		objMainArea.style.height = _intOptionHeight * (i + 1);
	}

	if (appTop.booIE)
	{
		objMainArea.style.height = parseInt(objMainArea.style.height) + 2;
	}
	
	objOptions.innerHTML = _strOptions;
}

function optionOver( _intOption )
{
    if (booPageLoaded)
    {
		document.getElementById("option" + _intOption + "L").className = "optionHC";
		objArrow.style.top = arrArrowTop[_intOption];
		objArrow.style.visibility = "visible";
		showTopicDescriptionImage(_intOption);
	}
}

function optionOut( _intOption )
{
    if (booPageLoaded)
    {
		document.getElementById("option" + _intOption + "L").className = "optionNC";
		objArrow.style.visibility = "hidden";
		showDefaultDescriptionImage();
	}
}

function changeImage(_strImgState)
{
    var _objImgStateArray = _strImgState.split("_");
    if (booPageLoaded)
    {
    	document.getElementById(_objImgStateArray[0]+"Img").src = eval(_strImgState).src;
    }
    return;
}

function checkRevisit()
{
	if (confirm(appTop.objGenericText["revisit"]))
	{
		appTop.returnLast();
	}
}

function checkCert()
{
	for (var i=0; i<objCourse.objChilds.length; i++)
	{
		if ((objCourse.objChilds[i].booAssessment) && (objCourse.objChilds[i].strAssessmentDate != null))
		{
			parent.intPercentage = parseInt((objCourse.objChilds[i].intScore/objCourse.objChilds[i].intMaxScore) * 100);
			if ((parent.intPercentage != null) && (parent.intPercentage >= objCourse.objChilds[i].intPassRate))
			{
				document.getElementById("printCert").style.display = "block";
			}
			break;
		}
	}
}

function goUnit( _strUnitID, _booAssessment)
{
	if ((appTop.booLockAssessment) && (_booAssessment) && (intUnitsCompleted < (objCourse.childObjs.length-1)))
		alert(appTop.objGenericText["completeasessmentalert"]);
	else
		appTop.goUnit(_strUnitID);
}

function exit()
{
	appTop.exit();
}

function viewBookmark()
{
	appTop.viewBookmarks();
}

function launchQuickfind()
{
	appTop.launchQuickfind();
}

