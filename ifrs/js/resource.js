var booMainWindow = false;
var intCurrentPage = 0;
var booContentLoaded = false;
var booNavLoaded = false;
var objOpener;
var objOpenerTop;
var strResourceURL;
var strBaseURL = null;
var strImagePath = "../../../images/"; // The path of the image directory relative to the page 
var strCourseID;
var strDocFolder;
var intPageType;

var objTitleFrame;
var objContentFrame;
var objNavFrame;

function initialise()
{
	objTitleFrame = window["titleF"];	
	objContentFrame = window["contentF"];	
	objNavFrame = window["nav"];	

	preloadPopupImages();
	findBaseURL();
	objOpener = window.opener;
	objOpenerTop = objOpener.appTop;
	strCourseID = objOpenerTop.strCourseID;
	strResourceURL = objOpenerTop.strBaseURL + "resource/" + objOpenerTop.strCurrentResource.replace(/_/,"/") + "/content/";
	objTitleFrame.location = "../../../generichtm/resourcetitle.htm";
}

function findBaseURL()
{
	strBaseURL = new String(document.location);
	strBaseURL = strBaseURL.substring(0,strBaseURL.lastIndexOf("/",strBaseURL.length));
	strBaseURL = strBaseURL.substring(0,strBaseURL.lastIndexOf("/",strBaseURL.length));
}

function startResource()
{
	if (objOpenerTop.booFromKeyword)
	{
		for (var i=0; i<navArray.length; i++)
		{
			if (navArray[i].indexOf(objOpenerTop.strKeywordPage,0) != -1)
			{
				intCurrentPage = i;
				break;
			}
		}

		objOpenerTop.booFromKeyword = false;
		objOpenerTop.strKeywordPage = null;
	}

	objContentFrame.location = strResourceURL + navArray[intCurrentPage];
	if (navArray.length > 1)
		objNavFrame.showNav();
}

function openDocument(_strFileName) {
//	window.open(strDocFolder + _strFileName);
}

function openURL(_strURL) {
	window.open(_strURL);
}

function printPage() {
	top.printWhichFrame = top.contentF;
	printF.location = "../generichtm/print.htm";
}