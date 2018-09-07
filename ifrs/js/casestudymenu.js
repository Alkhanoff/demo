var strImagePath = "../images/"
var strMenuString = "";
var arrow_n = new Image();
var arrow_s = new Image();
var menuborder_n = new Image();
var menuborder_h = new Image();
var strPreviousCS = null;

function initialise()
{
	preloadImages()
	parent.objNavFrame.location = "casestudynav.htm";
}

function preloadImages()
{
	arrow_n.src = strImagePath + "popups/examples/menu_item_arrow.gif";
	arrow_s.src = strImagePath + "popups/examples/menu_item_arrow.gif";
	menuborder_n.src = strImagePath + "trans.gif";
	menuborder_h.src = strImagePath + "popups/examples/menu_border.gif";
}

function generateMenu()
{
	parent.intNumOfCS = 0;
	if ((parent.objOpenerTop.booFromQuickFind) || (parent.objOpenerTop.booFromKeyword))
		generateAlternativeMenu();
	else
		generateMenuFromCaseStudy();
}

function generateAlternativeMenu()
{
	var _strCurrentID;
	var _booShowUnit = true;
	strMenuString = "";

	for (var i in parent.objCaseStudy)
	{
		for (var j=0; j<parent.objCaseStudy[i].objChilds.length; j++)
		{
			_booShowUnit = false;
			_strCurrentID = parent.objCaseStudy[i].objChilds[j].strID;
			if (_strCurrentID == parent.objOpenerTop.strCaseStudyID)
				_booShowUnit = true;

			if (_booShowUnit) {
				strMenuString += drawMenu(i, j);
			}
		}
	}

	document.getElementById("menu").innerHTML = strMenuString;
}

function generateMenuFromCaseStudy()
{
	var _strCurrentID;
	var _booShowUnit = true;
	strMenuString = "";

	for (var i in parent.objCaseStudy)
	{
		for (var j=0; j<parent.objCaseStudy[i].objChilds.length; j++)
		{
			if (parent.booDoFilter)
			{
				_booShowUnit = false;
				_strCurrentID = parent.objCaseStudy[i].objChilds[j].strID;
				for (var k=1; k<parent.objCurrentUnit.objCaseStudies.length; k++)
				{
					if (_strCurrentID == parent.objCurrentUnit.objCaseStudies[k])
					{
						_booShowUnit = true;
						break;
					}
				}
			}

			if (_booShowUnit) {
				strMenuString += drawMenu(i, j);
			}
		}
	}

	document.getElementById("menu").innerHTML = strMenuString;
	parent.objContentFrame.location = "casestudyswfs/casestudysting.htm";
}

function drawMenu(i, j) {
	var _strMenuString = "";
	parent.intNumOfCS++;
	parent.objCaseStudy[i].objChilds[j].objNavArray = eval("parent." + parent.objCaseStudy[i].objChilds[j].strID + "NavArray");
	
	_strMenuString += "<table id=\"" + parent.objCaseStudy[i].objChilds[j].strID + "L\" width=\"132\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"item\" onclick=\"goCaseStudy('" + i + "','" + parent.objCaseStudy[i].objChilds[j].strID + "')\">" +
	"<tr><td colspan='3'>" +
	"<img src='../images/trans.gif' name='" + parent.objCaseStudy[i].objChilds[j].strID + "_top' width='132' height='1'border='0' />" +
	"</td></tr><tr><td width=\"15\" align=\"center\" valign=\"top\">" +
	"</td><td width=\"117\" align=\"left\" valign=\"top\">" +
	"<a href='#' id='link" + parent.objCaseStudy[i].objChilds[j].strID + "' class='normal' onfocus=\"this.blur()\">" + parent.objCaseStudy[i].objChilds[j].strTitle + "</a>" +
	"</td><td width=\"10\" align=\"left\" valign=\"top\">" +
	"<img src='../images/trans.gif' width='10' border='0' height='4' />" +
	"</td></tr><tr><td colspan='3'>" +
	"<img src='../images/trans.gif' name='" + parent.objCaseStudy[i].objChilds[j].strID + "_bottom' width='132' height='1' border='0' />" +
	"</td></tr></table><img src='../images/trans.gif' border='0' height='6'>";	

	return _strMenuString;
}

function goCaseStudy(_strCourseID, _strCsID)
{
	if (strPreviousCS != null)
	{
		document.getElementById('link' + strPreviousCS).className = "normal";
	}

	document.getElementById('link' + _strCsID).className = "selected";
	strPreviousCS = _strCsID;
	parent.goCaseStudy(_strCourseID, _strCsID);
}