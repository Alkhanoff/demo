var strImagePath = "../images/"; // The path of the image directory relative to the page 
var objOpener = null; // theOpener = null;
var objOpenerTop = null; //courseWin;
var objCourse;
var strCourseID;
var objCurrentUnit;
var strCurrentPage;
var booContentLoaded = false;
var booNavLoaded = false;
var objFilter;
var strCM;
var strCS;
var strScenario;
var strColor1 = "#FFFFFF";
var strColor2 = "#EDEDED";
var strCurrentColor;
var intAlternate = 1
var strCurrentFilter = null;
var strFilterScenario = null;
var intScenariosCompleted;
var objGenericText;
var intPageType;

var objContentFrame;

function initialise()
{
	intPageType = QUICKFIND;
	
	objContentFrame = window["contentF"];	

	objOpener = window.opener;
	objOpenerTop = objOpener.appTop;
	strCourseID = objOpenerTop.strCourseID;
	objCourse = objOpenerTop.objCourse;

	preloadPopupImages();
	objGenericText = objOpenerTop.objGenericText;
	strCurrentFilter = objOpenerTop.strCurrentFilter;
	strFilterScenario = objOpenerTop.strFilterScenario;
	objContentFrame.location = "../generichtm/quickfindmain.htm";
	intScenariosCompleted = 0;
	for (var i=0; i<objCourse[strCourseID].objChilds.length; i++)
	{
		if (objCourse[strCourseID].objChilds[i].intState == 2)
			intScenariosCompleted++;
	}

	generateScenarioString();
	generateCoachMeString();
	generateCaseStudyString();
}

function showSDes(_strID)
{
	objContentFrame.document.getElementById("desL").innerHTML = eval("objOpenerTop.str" + _strID.toLowerCase() + "Des");
}

function hideDes()
{
	objContentFrame.document.getElementById("desL").innerHTML = "<span class='instructionText'>" + objGenericText["quickfindinitialinstruction"] + "</span>";
}

function switchColor()
{
	if (intAlternate == 1)
		intAlternate = 2;
	else
		intAlternate = 1;

	strCurrentColor = eval("strColor" + intAlternate);
}

function generateScenarioString()
{
	strScenario = "";
	strCurrentColor = strColor1;
	intAlternate = 1;

	for (var i in objQuickFindData.objScenarios)
	{
		strScenario += "<div id=\"" + i + "L\" style=\"position:relative; left:0; top:0; width:315; padding:3; z-index:6; visibility:visible\">" +
		"<table width=\"315\" cellpadding=\"0\" style=\"font-family:Arial; font-size:10pt\" cellspacing=\"0\" border=\"0\">\n" +
		"<tr><td width=\"261\" align=\"left\" valign=\center\">\n" +
		"<a href=\"JavaScript:parent.showScenario('" + i + "')\" onFocus=\"this.blur()\" onMouseOver=\"parent.showSDes('" + i + "')\">" + objQuickFindData.objScenarios[i].strTitle + "</a>" +
		"</td><td width=\"54\" align=\"left\" valign=\"center\">\n" +
		"(" + objQuickFindData.objScenarios[i].strTiming + " mins)\n" +
		"</td></tr></table>\n</div>";
		switchColor();
	}
}

function generateCoachMeString()
{
	strCM = "";
	strCurrentColor = strColor1;
	intAlternate = 1;
	
	for (var i in objCourse[strCourseID].objCoachMeTitles)
	{
		strCM += "<div id=\"" + i + "L\" style=\"position:relative; left:0; top:0; width:315; padding:3; z-index:6; visibility:visible\">" +
		"<a href=\"JavaScript:parent.goCoachMe('" + i + "')\" onFocus=\"this.blur()\">" + objCourse[strCourseID].objCoachMeTitles[i] + "</a></div>";
		switchColor();
	}
}

function generateCaseStudyString()
{
	strCS = "";
	strCurrentColor = strColor1;
	intAlternate = 1;

	for (var i in objCourse[strCourseID].objCaseStudyTitles)
	{
		strCS += "<div id=\"" + i + "L\" style=\"position:relative; left:0; top:0; width:315; padding:3; z-index:6; visibility:visible\">" +
		"<a href=\"JavaScript:parent.goCaseStudy('" + i + "')\" onFocus=\"this.blur()\">" + objCourse[strCourseID].objCaseStudyTitles[i] + "</a></div>";
		switchColor();
	}
}

function resetScenarioFilter()
{
	objContentFrame.document.getElementById("routeL").innerHTML = "";
	objContentFrame.document.getElementById("routeB").style.visibility = "hidden";;
	objContentFrame.document.getElementById("routeT").style.visibility = "hidden";;
	objContentFrame.document.getElementById("routeL").style.visibility = "hidden";;
}

function showScenario(_strID)
{
	var _strData = "";
	var _objSplits;
	var _booEnabled = true;
	var _intTaskCount = 0;
	var _booPreviousCompleted = true;
	var _objScenario;
	var _intCounter = 1;
	var _strTaskTitle;
	var _booShow = false;
	var _intPreviousIndex;

	strCurrentColor = strColor1;
	intAlternate = 1;
	objOpenerTop.strFilterScenario = _strID;

	if (objQuickFindData.objScenarios[_strID].strBackground != null)
	{
		_strData += "<div id=\"t" + _intCounter + "L\" style=\"position:relative; left:0; top:0; width:326; padding:3; z-index:6; visibility:visible\">" +
		"<a href=\"JavaScript:parent.goBackground('" + objQuickFindData.objScenarios[_strID].strBackground + "')\" onFocus=\"this.blur()\"><b>" + objGenericText["background"] + "</b></a></div>";
		switchColor();
	}

	for (var i=0; i<objCourse[strCourseID].objChilds.length; i++)
	{
		if (objCourse[strCourseID].objChilds[i].strID == _strID)
		{
			if ((i!=0) && (objCourse[strCourseID].objChilds[i-1].intState != 2))
			{
				_booPreviousCompleted = false;
				_intPreviousIndex = i-1;
			}

			_objScenario = objCourse[strCourseID].objChilds[i];
			break;
		}
	}

	if (!_booPreviousCompleted)
	{
		if (_objScenario.booIsAssessment)
			alert(objGenericText["mustcompleteallbeforeassessment"]);
		else
			alert(objGenericText["mustcomplete"] + objQuickFindData.objScenarios[objCourse[strCourseID].objChilds[_intPreviousIndex].strID].strTitle + objGenericText["beforeattempt"] + objQuickFindData.objScenarios[_objScenario.strID].strTitle + ".");

		objOpenerTop.strFilterScenario = null;
		resetScenarioFilter();
		return;
	}

	for (var i in objQuickFindData.objScenarios[_strID].objTasks)
	{
		if ((_objScenario.objTaskStatusArray != null) && (_objScenario.objTaskStatusArray[_intTaskCount][1] == 1))
		{
			if ((_objScenario.objTaskQSArray != null) && (_objScenario.objTaskQSArray[i]))
			{
				if (_objScenario.objTaskQSArray[i][0] == 1)
				{
					_booPreviousCompleted = true;
					_booEnabled = true;
				}
				else
				{
					if (_booPreviousCompleted)
					{
						_booEnabled = true;
						_booPreviousCompleted = false;
					}
					else
					{
						_booEnabled = false;
					}
				}
			}
			else
			{
				_booPreviousCompleted = true;
				_booEnabled = true;
			}
		}
		else
		{
			if (_booPreviousCompleted)
			{
				_booEnabled = true;
				_booPreviousCompleted = false;
			}
			else
			{
				_booEnabled = false;
			}
		}

		if ((objQuickFindData.objScenarios[_strID].strTitle.toLowerCase() == objGenericText["overview"].toLowerCase()) || (objQuickFindData.objScenarios[_strID].strTitle.toLowerCase() == objGenericText["assessment"].toLowerCase()))
		{
			resetScenarioFilter();
			if ((_objScenario.booIsAssessment) && (intScenariosCompleted < (objCourse[strCourse].objChilds.length-1)))
				_booEnabled = false;

			if (_booEnabled)
				parent.goTask(_strID, i)
			else
				alert(objGenericText["mustcompleteallbeforeassessment"]);

			break;
		}
		else
		{
			if (objQuickFindData.objScenarios[_strID].objTasks[i].strCoachMes != null)
			{
				_objSplits = objQuickFindData.objScenarios[_strID].objTasks[i].strCoachMes.split(",");
				for (var j=0; j<_objSplits.length; j++)
				{
					_strData += "<div id=\"t" + _intCounter + "L\" style=\"position:relative; left:0; top:0; width:326; padding:3; z-index:6; visibility:visible\">";
					if (_booEnabled)
						_strData += "<a href=\"JavaScript:parent.goCoachMe('" + _objSplits[j] + "')\" onFocus=\"this.blur()\"><b>" + objGenericText["coach"] + ":</b> " + objCourse[strCourseID].objCoachMeTitles[_objSplits[j]] + "</a>";
					else
						_strData += "<font style=\"color:gray\"><b>" + objGenericText["coach"] + ":</b> " + objCourse[strCourseID].objCoachMeTitles[_objSplits[j]] + "</font>";
					_strData += "</div>";
					switchColor();
				}
			}
	
			if (objQuickFindData.objScenarios[_strID].objTasks[i].strCaseStudies != null)
			{
				_objSplits = objQuickFindData.objScenarios[_strID].objTasks[i].strCaseStudies.split(",");
				for (var j=0; j<_objSplits.length; j++)
				{
					_strData += "<div id=\"t" + _intCounter + "L\" style=\"position:relative; left:0; top:0; width:326; padding:3; z-index:6; visibility:visible\">";
					if (_booEnabled)
						_strData += "<a href=\"JavaScript:parent.goCaseStudy('"+_objSplits[j]+"')\" onFocus=\"this.blur()\"><b>" + objGenericText["example"] + ":</b> " + objCourse[strCourseID].objCaseStudyTitles[_objSplits[j]] + "</a>";
					else
						_strData += "<font style=\"color:gray\"><b>" + objGenericText["example"] + ":</b> " + objCourse[strCourseID].objCaseStudyTitles[_objSplits[j]] + "</font>";
					_strData += "</div>";
					switchColor();
				}
			}

			_strTaskTitle = "Attempt " + objQuickFindData.objScenarios[_strID].objTasks[i].strTitle;
			_strData += "<div id=\"t" + _intCounter + "L\" style=\"position:relative; left:0; top:0; width:326; padding:3; z-index:6; visibility:visible\">";
			if (_booEnabled)
				_strData += "<a href=\"JavaScript:parent.goTask('" + _strID + "','" + i + "')\" onFocus=\"this.blur()\"><b>" + _strTaskTitle + "</b></a>";
			else
				_strData += "<font style=\"color:gray\"><b>" + _strTaskTitle + "</b></font>";
			_strData += "</div>";
	
			switchColor();
			strCurrentColor = eval("strColor" + intAlternate);
			_intTaskCount++;
			_booShow = true;
		}
	}
	
	if (_booShow)
	{
		objContentFrame.document.getElementById("routeL").innerHTML = _strData;
		objContentFrame.document.getElementById("routeB").style.visibility = "visible";;
		objContentFrame.document.getElementById("routeT").style.visibility = "visible";;
		objContentFrame.document.getElementById("routeL").style.visibility = "visible";;
	}
	return;
}

function goTask(_strScenarioID, _strTaskID)
{
	objOpenerTop.strTaskToGoTo = _strTaskID;
	objOpenerTop.booFromQuickFind = true;
	objOpenerTop.booLinearRoute = true;
	objOpenerTop.goUnit(strCourseID + "_" + _strScenarioID);
	top.window.close();
	return;
}

function goBackground(_strID)
{
	objOpenerTop.strBackgroundID = _strID;
	objOpenerTop.booFromQuickFind = true;
	objOpenerTop.launchBackground();
	top.window.close();
	return;
}

function goCoachMe(_strID)
{
	objOpenerTop.strCoachMeID = _strID;
	objOpenerTop.booFromQuickFind = true;
	objOpenerTop.launchCoachMe();
	top.window.close();
	return;
}

function goCaseStudy(_strID)
{
	objOpenerTop.strCaseStudyID = _strID;
	objOpenerTop.booFromQuickFind = true;
	objOpenerTop.launchCaseStudy();
	top.window.close();
	return;
}

function initQuickFind()
{
	objFilter = objContentFrame.document.forms['filterForm'].elements['filters'];
	
	if (strCurrentFilter != null)
	{
		for (var i=0; i<objFilter.options.length; i++)
		{
			if (strCurrentFilter == objFilter.options[i].value)
			{
				objFilter.selectedIndex = i;
				break;
			}
		}

		doFilter();
		if ((strFilterScenario != null) && (objQuickFindData.objScenarios[strFilterScenario].strTitle.toLowerCase() != objGenericText["overview"].toLowerCase()) && (objQuickFindData.objScenarios[strFilterScenario].strTitle.toLowerCase() != objGenericText["assessment"].toLowerCase()))
			showScenario(strFilterScenario);
	}
	else
	{
		doFilter();
	}
}

function doFilter()
{
	objContentFrame.document.getElementById("routeB").style.visibility = "hidden";
	objContentFrame.document.getElementById("routeT").style.visibility = "hidden";
	objContentFrame.document.getElementById("routeL").style.visibility = "hidden";

	objOpenerTop.strCurrentFilter = objFilter.options[objFilter.selectedIndex].value;

	switch (objFilter.options[objFilter.selectedIndex].value)
	{
	case "s":
		filterScenarios();
		hideDes();
		break;
	case "c":
		filterCoachMes();
		objOpenerTop.strFilterScenario = null;
		objContentFrame.document.getElementById("desL").innerHTML = objGenericText["quickfindcoachmetext"];
		break;
	case "e":
		filterExamples();
		objOpenerTop.strFilterScenario = null;
		objContentFrame.document.getElementById("desL").innerHTML = objGenericText["quickfindcasestudytext"];
		break;
	default:
		break;
	}

	objContentFrame.document.getElementById("routeL").innerHTML = "";
}

function filterScenarios()
{
	objContentFrame.document.getElementById("resultsL").innerHTML = strScenario;
}

function filterCoachMes()
{
	objContentFrame.document.getElementById("resultsL").innerHTML = strCM;
}

function filterExamples()
{
	objContentFrame.document.getElementById("resultsL").innerHTML = strCS;
}

function showHelp() {
	var _objDoc = objContentFrame.document;
	if (_objDoc.getElementById("popupMask").style.visibility == "visible") {
		_objDoc.getElementById("popupLayer").style.visibility = "hidden";
		_objDoc.getElementById("popupMask").style.visibility = "hidden";
		_objDoc.getElementById("filters").style.visibility = "visible";
	} else {
		_objDoc.getElementById("popupLayer").style.visibility = "visible";
		_objDoc.getElementById("popupMask").style.visibility = "visible";
		_objDoc.getElementById("filters").style.visibility = "hidden";
	}
}

