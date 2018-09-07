var strImagePath = "../images/"; // The path of the image directory relative to the page
var objCourse;
var booContentLoaded = false;
var strCourseID;
var objOpener;
var objOpenerTop;
var strCurrentWord;
var objKeywordData;
var intAlternate;
var intPageType;
var objGenericText;

var objContentFrame;

function initialise()
{
	intPageType = KEYWORD;

	objOpener = window.opener;
	objOpenerTop = objOpener.appTop;
	strCourseID = objOpenerTop.strCourseID;
	objCourse = objOpenerTop.objCourse;
	strCurrentWord = objOpenerTop.strKeyword;
	objKeywordData = objOpenerTop.objKeywordData;
	objGenericText = objOpenerTop.objGenericText;

	preloadPopupImages();

	objContentFrame = window["contentF"];

	objContentFrame.location = "keywordmain.htm";
}

function showResults()
{
	var _strKeywords = "";
	var _intCounter = 1;
	intAlternate = 1;

	objContentFrame.document.getElementById("currentWordL").innerHTML = "<span style=\"font-family:Arial; font-size:12pt; font-weight:800; color:#333333\">Keyword: </span>" + strCurrentWord;
	for (var i=0; i<objKeywordData[strCurrentWord].length; i++)
	{
		_strKeywords += "<div id=\"item" + _intCounter + "\" style=\"position:relative; left:0px; top:0px; width:549; z-index:8; visibility:visible\">\n" +
		"<table width=\"541\" style=\"font-family:Arial; font-size:10pt\" border=\"0\">\n" +
		"<tr>\n<td width=\"541\" align=\"left\" valign=\"center\">\n" +
		"<a href=\"JavaScript:parent.goPage('" + objKeywordData[strCurrentWord][i][0] + "')\" border=\"0\">" + getPageTitle(objKeywordData[strCurrentWord][i][0], objKeywordData[strCurrentWord][i][1]) + "</a>" +
		"</td>\n</tr></table></div>";
		if (intAlternate == 1)
			intAlternate = 2;
		else
			intAlternate = 1;
		_intCounter++;
	}

	objContentFrame.document.getElementById("resultsL").innerHTML = _strKeywords;
}

function getPageTitle(_strPage, _strTitle)
{
	//alert("_strPage: " + _strPage + "\n_strTitle: " + _strTitle)
	var _strParentTitle = null;
	var _arrPage = _strPage.split("_");

	if (_arrPage[1].indexOf("cm",0) != -1)
	{
		_strParentTitle = objGenericText["coachme"] + " > " + objCourse[strCourseID].objCoachMeTitles[_arrPage[1]];
	}
	else if (_arrPage[1].indexOf("cs",0) != -1)
	{
		_strParentTitle = objGenericText["example"] + " > " + objCourse[strCourseID].objCaseStudyTitles[_arrPage[1]];
	}
	else
	{
		for (var i=0; i<objCourse[strCourseID].objChilds.length; i++)
		{
			if (objCourse[strCourseID].objChilds[i].objResources != null)
			{
				for (var j=0; j<objCourse[strCourseID].objChilds[i].objResources.length; j++)
				{
					if (_strPage.indexOf(objCourse[strCourseID].objChilds[i].objResources[j][0],0) != -1)
					{
						_strParentTitle = objGenericText["resource"] + " > " + objCourse[strCourseID].objChilds[i].objResources[j][1];
						break;
					}
				}
			}

			if (_strParentTitle != null)
				break;
		}
	}

	if (_strTitle == "")
		return _strParentTitle;
	else
		return _strParentTitle+" > " + _strTitle;
}

function goPage(_strPage)
{
	var _arrPage = _strPage.split("_");

	objOpenerTop.booFromKeyword = true;
	objOpenerTop.strKeywordPage = _strPage;
	if (_arrPage[1].indexOf("cm",0) != -1)
	{
		objOpenerTop.strCoachMeID = _arrPage[1];
		objOpenerTop.launchCoachMe();
	}
	else if (_arrPage[1].indexOf("cs",0) != -1)
	{
		objOpenerTop.strCaseStudyID = _arrPage[1];
		objOpenerTop.launchCaseStudy();
	}
	else if (_arrPage[1].indexOf("r",0) != -1)
	{
		objOpenerTop.launchResource(_arrPage[0] + "_" + _arrPage[1]);
	}

	top.window.close();
}
