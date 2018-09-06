
var objOpener
var objOpenerTop;
var strCourseID;
var objCourse;
var ObjUnit;
var strCurrentPage;

var booInHistory = false;
var booContentLoaded = false;
var booNavLoaded = false;
var booFlashInstalled = false;

var popupClose_h = new Image();
var popupClose_n = new Image();
var popupBg = new Image();
var strImagePath = "../../images/";

function initialise()
{
	preloadImages();
	objOpener = window.opener;
	objOpenerTop = objOpener.appTop;
	strCourseID = objOpenerTop.strCourseID;
	objCourse = objOpenerTop.objCourse;
	objUnit = objOpenerTop.objCurrentState.objUnit;
	strCurrentPage = objOpenerTop.strCurrentCommPage;
	booFlashInstalled = objOpenerTop.booFlashInstalled;
	window["titleF"].location = "title.htm";
}

function loadPage(_strType)
{
	var _strPageSplit = strCurrentPage.split("_");
	window["contentF"].location = objOpenerTop.strBaseURL + "units/" + _strPageSplit[0] + "/" + _strPageSplit[1] + "/content/" + _strType + "_" + strCurrentPage;
}

function doShowHelp(_strType, _intX, _intY, _intW, _intH) {
	//display the help text for this screen
	var _objContentFrame = window["contentF"];
	if (_objContentFrame.popupShowing == "help") {
		hidePopupLayer();	
		_objContentFrame.popupShowing = "";
	} else {
		if (_objContentFrame.document.getElementById("popupContent")) {
			_objContentFrame.document.getElementById("popupContent").innerHTML = "";
			showPopupLayer();
			strHelp = popupTitle('help', 'left') + popupDiv(objOpenerTop.helpText("comm_" + _strType), _intX, _intY, _intW, _intH, true);
			_objContentFrame.document.getElementById("popupContent").innerHTML =  strHelp;
			_objContentFrame.popupShowing = "help";
		}
	}
}

function popupDiv(_strDivContent, _intX, _intY, _intW, _intH, _booScrollBars) {
	var _strOverFlow;
	var _intOffset = 25;
	
	if (_booScrollBars) 
	{
		_strOverFlow = "auto";
	}
	else 
	{
		_strOverFlow = "hidden";
		_intOffset = 5;
	}

	return "<div style='position:absolute; left:" + _intX + "px; top:" + _intY + "px; overflow: " + _strOverFlow + "; width:" + _intW + "; height:" + _intH + "'>" +
		"<span style='position:absolute; left:5px; top:5px; width:" + (_intW-_intOffset) + "; height:" + (_intH-10) + "'>" + _strDivContent + "</span></div>";
}

function popupTitle(_strImgName, _strAlign) {
	return "<div align='" + _strAlign + "'><img src='../../../../images/content/popup_titles/" + _strImgName + ".gif' alt='" + _strImgName + "' /></div>"
}

function showPopupLayer() {
	var _objContentFrame = window["contentF"];
	if (!_objContentFrame.popupVisible) {
		if (_objContentFrame.document.getElementById("flashLayer"))
			_objContentFrame.document.getElementById("flashLayer").style.display = "none";
		//show the popup layer
		if (_objContentFrame.document.getElementById("popupLayer")) {
			_objContentFrame.document.getElementById("popupLayer").style.visibility = "visible";
		}
		//show the mask over the page content
		if (_objContentFrame.document.getElementById("popupMask")) {
			_objContentFrame.document.getElementById("popupMask").style.visibility = "visible";
		}
		_objContentFrame.popupVisible = true;
	}
}

function hidePopupLayer() {
	var _objContentFrame = window["contentF"];
	if (_objContentFrame.popupVisible) {
		if (_objContentFrame.document.getElementById("flashLayer"))
			_objContentFrame.document.getElementById("flashLayer").style.display = "block";
		//hide the popup layer
		if (_objContentFrame.document.getElementById("popupLayer")) {
			_objContentFrame.document.getElementById("popupLayer").style.visibility = "hidden";
		}
		//hide the mask over the page content
		if (_objContentFrame.document.getElementById("popupMask")) {
			_objContentFrame.document.getElementById("popupMask").style.visibility = "hidden";
		}
		_objContentFrame.popupVisible = false;
		_objContentFrame.popupShowing = "";
	}
}

function preloadImages() {
	//load images for the content popups
    popupClose_h.src = strImagePath + "popups/comms/close_btn_h.gif";
    popupClose_n.src = strImagePath + "popups/comms/close_btn_n.gif";
    popupBg.src = strImagePath + "content/popup_bg.gif";
}

function changeImage(_strImgState) {
	//change image for the close button in the content popup
	var _strImgSplit = _strImgState.split("_");	
	
	window["contentF"].document.images[_strImgSplit[0] + "Img"].src = eval(_strImgState).src;
	
	return;
}
