var booMainWindow = false;
var intCurrentPage = 0;
var booContentLoaded = false;
var booNavLoaded = false;
var objOpener;
var objOpenerTop;
var objCurrentUnit;
var strCourseID;
var strBackgroundURL;
var strDocFolder;
var strImagePath = "../../../images/"; // The path of the image directory relative to the page 
var booFromQuickFind = false;
var strVersion;
var intPageType;
var objGenericText;

var objTitleFrame;
var objContentFrame;
var objNavFrame;

function initialise()
{
	objTitleFrame = window.frames[0]; //TitleF 			//OLD -> window["titleF"];	
	objContentFrame = window.frames[1]; //ContentF //OLD -> window["contentF"];	
	objNavFrame = window.frames[3]; //Nav //OLD -> window["nav"];	
	preloadPopupImages();
	objOpener = window.opener;
	objOpenerTop = objOpener.appTop;
	
	objGenericText = objOpenerTop.objGenericText;
	strVersion = objOpenerTop.strVersion;
	strCourseID = objOpenerTop.strCourseID;
	strDocFolder = objOpenerTop.strBaseURL + "units/" + strCourseID + "/documents/";
	booFromQuickFind = objOpenerTop.booFromQuickFind;

	if (booFromQuickFind)
	{
		strBackgroundURL = objOpenerTop.strBaseURL + "background/" + strCourseID + "/" + objOpenerTop.strBackgroundID + "/content/";
	}
	else
	{
		objCurrentUnit = objOpenerTop.objCurrentState.objUnit;
		strBackgroundURL = objOpenerTop.strBaseURL + "background/" + objCurrentUnit.strBackgroundID.replace(/_/,"/") + "/content/";
	}

	objTitleFrame.location = "../../../generichtm/backgroundtitle.htm";
}

function startBackground()
{
	objOpenerTop.strBackgroundID = null;
	objOpenerTop.booFromQuickFind = false;
	objContentFrame.location = strBackgroundURL + navArray[intCurrentPage];
}

function openDocument(_strFileName) {
	window.open(strDocFolder + _strFileName);
}

function openURL(_strURL) {
	window.open(_strURL);
}

function printPage() {
	printWhichFrame = objContentFrame;
	window["printF"].document.location = "print.htm";
}