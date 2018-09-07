var strImagePath = "../images/";
var strMenuString = "";
var strPreviousCM = null;

function initialise()
{
	parent.objNavFrame.location = "coachmenav.htm";
}

function generateMenu()
{
	parent.intNumOfCM = 0;

	if ((parent.objOpenerTop.booFromQuickFind) || (parent.objOpenerTop.booFromKeyword))
		generateAlternativeMenu();
	else
		generateMenuFromCoachMe();
}

function generateAlternativeMenu()
{
	var _strCurrentID;
	var _booShowUnit = true;

	strMenuString = "";

	for (var j=0; j<parent.objCoachMe[parent.strCourseID].objChilds.length; j++)
	{
		_booShowUnit = false;
		_strCurrentID = parent.objCoachMe[parent.strCourseID].objChilds[j].strID;
		if (_strCurrentID == parent.objOpenerTop.strCoachMeID)
		{
			_booShowUnit = true;
		}

		if (_booShowUnit) 
		{
			strMenuString += drawMenu(j);
		}
	}

	showMenu(false);
}

function generateMenuFromCoachMe()
{
	var _strCurrentID;
	var _booShowUnit = true;

	strMenuString = "";

	for (var j=0; j<parent.objCoachMe[parent.strCourseID].objChilds.length; j++)
	{
		if ((parent.booDoFilter) && (parent.objCurrentUnit.objCoachMes))
		{
			_booShowUnit = false;
			_strCurrentID = parent.objCoachMe[parent.strCourseID].objChilds[j].strID;
			for (var k=1; k<parent.objCurrentUnit.objCoachMes.length; k++)
			{
				if (_strCurrentID == parent.objCurrentUnit.objCoachMes[k])
				{
					_booShowUnit = true;
					break;
				}
			}
		}
		else if (parent.strCoachMeID != null)
		{
			if (parent.strCoachMeID == parent.objCoachMe[parent.strCourseID].objChilds[j].strID)
				_booShowUnit = true;
			else
				_booShowUnit = false;
		}

		if (_booShowUnit) 
		{
			strMenuString += drawMenu(j);
		}
	}
	
	showMenu(true);
}

function showMenu(_booSting)
{
	document.getElementById("menu").innerHTML = strMenuString;
	document.getElementById("menuImg").innerHTML = "<img src='../coachme/" + parent.objCoachMe[parent.strCourseID].strID + "/images/menu.gif' />";

	if (_booSting)
	{
		parent.objContentFrame.location = "coachmesting/coachmesting.htm";
	}
}


function drawMenu(j) {
	var _strHTML;
	var _strID = parent.objCoachMe[parent.strCourseID].objChilds[j].strID;

	parent.intNumOfCM++;

	parent.objCoachMe[parent.strCourseID].objChilds[j].objNavArray = eval("parent." + _strID + "NavArray");
	_strHTML = "<table id=\"" + _strID + "L\" width=\"132\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"item\" onclick=\"goCoachMe('" + _strID + "')\">" +
				"<tr><td colspan='3'>" +
				"<img src='../images/trans.gif' id='" + _strID + "_top' name='" + _strID + "_top' width='132' height='1' border='0' />" +
				"</td></tr><tr><td width=\"15px\" align=\"center\" valign=\"top\">" +
				"</td><td width=\"107\" align=\"left\" valign=\"top\">" +
				"<a href='#' id='link" + _strID + "' class='normal' onfocus=\"this.blur()\">" + parent.objCoachMe[parent.strCourseID].objChilds[j].strTitle + "</a>" +
				"</td><td width=\"10\" align=\"left\" valign=\"top\">" +
				"<img src='../images/trans.gif' width='10' border='0' height='6' />" +
				"</td></tr><tr><td colspan='3'>" +
				"<img src='../images/trans.gif' id='" + _strID + "_bottom' name='" + _strID + "_bottom' width='132' height='1' border='0' />" + 
				"</td></tr></table><img src='../images/trans.gif' border='0' height='6'>";

	return _strHTML;
}

function goCoachMe(_strID)
{
	if (strPreviousCM != null)
	{
		document.getElementById('link' + strPreviousCM).className = "normal";
	}
	document.getElementById('link' + _strID).className = "selected";
	strPreviousCM = _strID;
	parent.goCoachMe(_strID);
}