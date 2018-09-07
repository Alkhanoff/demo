var booMainWindow = false;
var objCurrentUnit = null;
var intTaskStatusIndex;
var booDoFilter = false;
var booDoCoachMeCheck = false;
var objOpener;
var objOpenerTop;
var strCurrentCoachMe = null;
var booQuestionUnlocked = false;
var booContentLoaded = false;
var booNavLoaded = false;
var strBaseURL = null;
var strImagePath = "../../images/"; // The path of the image directory relative to the page
var popupClose_h = new Image();
var popupClose_n = new Image();
var popupBg = new Image();
var booFromQuickFind = false;
var intNumOfCM = 0;
var strVersion;
var strCoachMeID = null;
var strDocFolder = "";
var strCourseID;
var intPageType;
var objGenericText;

var objTitleFrame;
var objContentFrame;
var objNavFrame;
var objMenuFrame;

function initialise()
{
	strCourseID = objOpenerTop.strCourseID;
	strVersion = objOpenerTop.strVersion;
	if (objOpenerTop.strCoachMeID != null)
	{
		strCoachMeID = objOpenerTop.strCoachMeID;
	}

	objTitleFrame = window["titleF"];
	objContentFrame = window["contentF"];
	objNavFrame = window["nav"];
	objMenuFrame = window["menuF"];

	objGenericText = objOpenerTop.objGenericText;

	objTitleFrame.location = "../../generichtm/coachmetitle.htm";

	findBaseURL();
	preloadPopupImages();
}

function findBaseURL()
{
	strBaseURL = new String(document.location);
	strBaseURL = strBaseURL.substring(0, strBaseURL.lastIndexOf("/",strBaseURL.length));
	strBaseURL = strBaseURL.substring(0, strBaseURL.lastIndexOf("/",strBaseURL.length) + 1);
}

function startCoachme()
{
	objMenuFrame.generateMenu();
	if (strCoachMeID != null)
		objMenuFrame.goCoachMe(strCoachMeID);
	strCoachMeID = null;
	objOpenerTop.strCoachMeID = null;
	booFromQuickFind = objOpenerTop.booFromQuickFind;
	objOpenerTop.booFromQuickFind = false;
	objOpenerTop.booFromKeyword = false;
}

function goCoachMe(_strID)
{
	strCurrentCoachMe = strCourseID + "_" + _strID;
	//alert("DEBUG::goCoachMe(_strID): " + strCurrentCoachMe)
	strDocFolder = objOpenerTop.strBaseURL + "units/" + strCourseID + "/documents/";

	for (var i=0; i<objCoachMe[strCourseID].objChilds.length; i++)
	{
		if (_strID == objCoachMe[strCourseID].objChilds[i].strID)
		{
			objCurrentState.objUnit = objCoachMe[strCourseID].objChilds[i];
			break;
		}
	}

	if (objOpener.strKeywordPage != null)
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

	objCurrentState.objUnit.URL = strBaseURL + strCourseID + "/" + _strID + "/content/";
	objContentFrame.location = objCurrentState.objUnit.URL + objCurrentState.objUnit.objNavArray[objCurrentState.objUnit.intCurrentPage][0];
}

function unlockQuestion()
{
	//alert("DEBUG::unlockQuestion()");
	if (!booQuestionUnlocked)
		objOpenerTop.unlockQuestion();

	booQuestionUnlocked = true;
}

function openDocument(_strFileName) {
	window.open(strDocFolder + _strFileName);
}

function openURL(_strURL) {
	window.open(_strURL);
}

function printPage() {
	printWhichFrame = contentF;
	window["printF"].document.location = "print.htm";
}
