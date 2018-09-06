var booMainWindow = false;
var objCurrentUnit = null;
var objOpener;
var objOpenerTop;
var booContentLoaded = false;
var booNavLoaded = false;
var booDoFilter = false;
var strBaseURL = null;
var strCurrentCaseStudy = null;
var strImagePath = "../../images/"; // The path of the image directory relative to the page 
var popupClose_h = new Image();
var popupClose_n = new Image();
var popupBg = new Image();
var booFromQuickFind = false;
var intNumOfCS = 0;
var strVersion;
var strDocFolder;
var intPageType;
var objGenericText;

var objTitleFrame;
var objContentFrame;
var objNavFrame;
var objMenuFrame;

function initialise()
{
	strVersion = objOpenerTop.strVersion;
	
	objTitleFrame = window["titleF"];	
	objContentFrame = window["contentF"];	
	objNavFrame = window["nav"];	
	objMenuFrame = window["menuF"];	

	objGenericText = objOpenerTop.objGenericText;

	objTitleFrame.location = "../../generichtm/casestudytitle.htm";
	findBaseURL();
	preloadImages();
}

function findBaseURL()
{
	strBaseURL = new String(document.location);
	strBaseURL = strBaseURL.substring(0, strBaseURL.lastIndexOf("/",strBaseURL.length));
	strBaseURL = strBaseURL.substring(0, strBaseURL.lastIndexOf("/",strBaseURL.length) + 1);
}

function startCaseStudy()
{
	objMenuFrame.generateMenu();
	if (objOpenerTop.strCaseStudyID != null)
		objMenuFrame.goCaseStudy(objOpenerTop.strCourseID, objOpenerTop.strCaseStudyID);
	objOpenerTop.strCaseStudyID = null;
	booFromQuickFind = objOpenerTop.booFromQuickFind;
	objOpenerTop.booFromQuickFind = false;
	objOpenerTop.booFromKeyword = false;
}

function goCaseStudy(_strCourseID, _strCsID)
{
	strCurrentCaseStudy = _strCourseID + "_" + _strCsID;

	for (var i=0; i<objCaseStudy[_strCourseID].objChilds.length; i++)
	{
		if (_strCsID == objCaseStudy[_strCourseID].objChilds[i].strID)
		{
			objCurrentState.objUnit = objCaseStudy[_strCourseID].objChilds[i];
			break;
		}
	}
	strDocFolder = strBaseURL.replace('casestudies','units') + _strCourseID + "/documents/";

	if (objOpenerTop.strKeywordPage != null)
	{
		for (var i=0; i<objCurrentState.objUnit.objNavArray.length; i++)
		{
			if (objCurrentState.objUnit.objNavArray[i][0].indexOf(objOpenerTop.strKeywordPage,0) != -1)
			{
				objCurrentState.objUnit.intCurrentPage = i;
				break;
			}
		}
		objOpenerTop.strKeywordPage = null;
	}
	else
	{
		objCurrentState.objUnit.intCurrentPage = 0;
	}
	
	objCurrentState.objUnit.URL = "../casestudies/" + _strCourseID + "/" + _strCsID + "/content/";
	
	objContentFrame.location = objCurrentState.objUnit.URL + objCurrentState.objUnit.objNavArray[objCurrentState.objUnit.intCurrentPage][0];
}

function showHelp() {
	//display the help text for this screen
	c = contentF;
	if (c.popupShowing == "help") {
		hidePopupLayer();	
		c.popupShowing = "";
	} else {
		if (c.document.getElementById("popupContent")) {
			c.document.getElementById("popupContent").innerHTML = "";
			showPopupLayer();
			strHelp = popupTitle('help', 'left') + popupDiv(objOpenerTop.helpText(intPageType), 340, 220, true);
			c.document.getElementById("popupContent").innerHTML =  strHelp;
			c.popupShowing = "help";
		}
	}
}

function showPopupText() {
	//display the hidden popup div in the content frame and draw the popup text definition in it
	c = contentF;
	if (c.popupText) {
		if (c.popupShowing == "popup") {
			hidePopupLayer();	
			c.popupShowing = "";
		} else {
			if (c.document.getElementById("popupContent")) {
				c.document.getElementById("popupContent").innerHTML = "";
				showPopupLayer();
				strWord =  popupTitle('popup', 'left') + popupDiv(c.popupText, 340, 220, true);
				c.document.getElementById("popupContent").innerHTML =  strWord;
				c.popupShowing = "popup";
			}
		}
	}
}

function showGlossaryPopup(_strWord) {
	//display the hidden popup div in the content frame and draw the glossary definition in it
	if (_strWord != "") {
		c = contentF;
		if (c.popupShowing == "glossary") {
			hidePopupLayer();	
			c.popupShowing = "";
		} else {
			if (c.document.getElementById("popupContent")) {
				tCaseWord = "<b>" + _strWord.substring(0,1).toUpperCase() + _strWord.substring(1, _strWord.length) + "</b>";
				c.document.getElementById("popupContent").innerHTML = "";
				showPopupLayer();
				strGlossary = popupTitle('glossary', 'left') + popupDiv(tCaseWord + "<br /><br />" + getGlossary(_strWord), 340, 220, true);
				c.document.getElementById("popupContent").innerHTML =  strGlossary;
				c.popupShowing = "glossary";
			}
		}
	}
}


function getGlossary(_strWord) {
	return objOpenerTop.getGlossary(_strWord);
}

function popupTitle(_imgName, _strAlign) {
	return "<div align='" + _strAlign + "'><img src='" + objOpenerTop.strBaseURL + "images/content/popup_titles/" + _imgName + ".gif' alt='" + _imgName + "' /></div>"
}

function popupDiv(_strDivContent, _intW, _intH, _booScrollBars) {
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

	return "<div style='position:absolute; left:16px; top:55px; overflow: " + _strOverFlow + "; width:" + _intW + "; height:" + _intH + "'>" +
		"<span style='position:absolute; left:5px; top:5px; width:" + (_intW-_intOffset) + "; height:" + (_intH-10) + "'>" + _strDivContent + "</span></div>";
}

function showPopupLayer() {
	c = contentF;
	if (!c.popupVisible) {
		//show the popup layer
		if (c.document.getElementById("popupLayer")) {
			c.document.getElementById("popupLayer").style.visibility = "visible";
		}
		//show the mask over the page content
		if (c.document.getElementById("popupMask")) {
			c.document.getElementById("popupMask").style.visibility = "visible";
		}
		c.popupVisible = true;
		//make an array of the elements we're about to hide, so that they can be shown again later
		c.hiddenElements = new Array();
		nextElement = 0;
		//hide any select boxes, and blur any textareas and input boxes that are currently being shown
		for (n=0; n<c.document.forms.length; n++) {
			for (i=0; i<c.document.forms[n].elements.length; i++) {
				switch (c.document.forms[n].elements[i].type) {
					case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": case "10":
					case "select-one":
						if (c.document.getElementById(c.document.forms[n].elements[i].id).style.visibility != "hidden") {
							c.document.getElementById(c.document.forms[n].elements[i].id).style.visibility = "hidden";
							c.hiddenElements[nextElement] = c.document.forms[n].elements[i].id;
							nextElement += 1;
						}
						break;				
					case "textarea":
					case "input":
						c.document.getElementById(c.document.forms[n].elements[i].id).blur();
					default:
						break;
				}
			}
		}
	}
}

function hidePopupLayer() {
	c = contentF;
	if (c.popupVisible) {
		//hide the popup layer
		if (c.document.getElementById("popupLayer")) {
			c.document.getElementById("popupLayer").style.visibility = "hidden";
		}
		//hide the mask over the page content
		if (c.document.getElementById("popupMask")) {
			c.document.getElementById("popupMask").style.visibility = "hidden";
		}
		//show all the elements in the hiddenElements array
		for (n=0; n<c.hiddenElements.length; n++) {
			if (c.document.getElementById(c.hiddenElements[n])) {
				c.document.getElementById(c.hiddenElements[n]).style.visibility = "visible";
				c.hiddenElements[n] = null;
			}
		}
		c.popupVisible = false;
		c.popupShowing = "";
	}
}


function openDocument(_strFileName) {
	window.open(strDocFolder + _strFileName);
}

function openURL(_strURL) {
	window.open(_strURL);
}

function preloadImages() {
	//load images for the content popups
    popupClose_h.src = strImagePath + "content/close_btn_h.gif";
    popupClose_n.src = strImagePath + "content/close_btn_n.gif";
    popupBg.src = strImagePath + "content/popup_bg.gif";
}

function changeImage(_strState) {
	//change image for the close button in the content popup
	
	if (booContentLoaded)
		objContentFrame.document.getElementById(_strState.split("_")[0]+"Img").src = eval(_strState).src;
	
	return;
}

function printPage() {
	printWhichFrame = contentF;
	window["printF"].document.location = "print.htm";
}
