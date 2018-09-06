var popupClose_n = new Image();
var popupClose_h = new Image();
var popupBg = new Image();

function preloadPopupImages() 
{
    popupClose_h.src = strImagePath + "content/close_btn_h.gif";
    popupClose_n.src = strImagePath + "content/close_btn_n.gif";
    popupBg.src = strImagePath + "content/popup_bg.gif";
}

function changeImage(_strImgState) 
{
	if (booContentLoaded) {
		objContentFrame.document.getElementById(_strImgState.split("_")[0] + "Img").src = eval(_strImgState).src;
	}
	return;
}

function popupTitle(_strImgName, strAlign) 
{
	return "<div align='" + strAlign + "'><img src='" + objOpenerTop.strBaseURL + "images/content/popup_titles/" + _strImgName + ".gif' alt='" + _strImgName + "' /></div>"
}

function popupDiv(_strDivContent, _intW, _intH, _booScrollBars) 
{
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
	var _objDoc = objContentFrame.document;
	var _intNextElement = 0;
	
	if (!objContentFrame.booPopupVisible) 
	{
		//show the popup layer
		if (_objDoc.getElementById("popupLayer")) 
		{
			_objDoc.getElementById("popupLayer").style.visibility = "visible";
		}
		//show the mask over the page content
		if (_objDoc.getElementById("popupMask")) 
		{
			_objDoc.getElementById("popupMask").style.visibility = "visible";
		}
		objContentFrame.booPopupVisible = true;
		//make an array of the elements we're about to hide, so that they can be shown again later
		objContentFrame.objHiddenElements = new Array();
		//hide any select boxes, and blur any textareas and input boxes that are currently being shown
		for (n=0; n<_objDoc.forms.length; n++) 
		{
			for (i=0; i<_objDoc.forms[n].elements.length; i++) 
			{
				switch (_objDoc.forms[n].elements[i].type) 
				{
				case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": case "10":
				case "select-one":
					if (_objDoc.getElementById(_objDoc.forms[n].elements[i].id).style.visibility != "hidden") 
					{
						_objDoc.getElementById(_objDoc.forms[n].elements[i].id).style.visibility = "hidden";
						objContentFrame.objHiddenElements[_intNextElement] = _objDoc.forms[n].elements[i].id;
						_intNextElement++;
					}
					break;				
				case "textarea":
				case "input":
					_objDoc.getElementById(_objDoc.forms[n].elements[i].id).blur();
				default:
					break;
				}
			}
		}
	}
}

function hidePopupLayer() {
	var _objDoc = objContentFrame.document;

	if (objContentFrame.booPopupVisible) 
	{
		//hide the popup layer
		if (_objDoc.getElementById("popupLayer")) 
		{
			_objDoc.getElementById("popupLayer").style.visibility = "hidden";
		}
		//hide the mask over the page content
		if (_objDoc.getElementById("popupMask")) 
		{
			_objDoc.getElementById("popupMask").style.visibility = "hidden";
		}
		//show all the elements in the hiddenElements array
		for (n=0; n<objContentFrame.objHiddenElements.length; n++) 
		{
			if (_objDoc.getElementById(objContentFrame.objHiddenElements[n])) 
			{
				_objDoc.getElementById(objContentFrame.objHiddenElements[n]).style.visibility = "visible";
				objContentFrame.objHiddenElements[n] = null;
			}
		}
		
		objContentFrame.booPopupVisible = false;
		objContentFrame.strPopupShowing = "";
	}
}

function showHelp()
{
	var _objPopupContent = objContentFrame.document.getElementById("popupContent");

	if (_objPopupContent) 
	{
		if (objContentFrame.popupShowing == "help") 
		{
			hidePopupLayer();	
			objContentFrame.strPopupShowing = "";
		} 
		else 
		{
			_objPopupContent.innerHTML = "";
			showPopupLayer();
			_objPopupContent.innerHTML = popupTitle('help','left') + popupDiv(objOpenerTop.helpText(intPageType), 340, 220, true);
			objContentFrame.strPopupShowing = "help";
		}
	}
}

function getGlossary(_strWord) 
{
	for (i=0; i<objOpenerTop.objGlossWords.length; i++) 
	{
		if (objOpenerTop.objGlossWords[i][0].toLowerCase() == _strWord.toLowerCase()) 
		{
			return objOpenerTop.objGlossWords[i][1];
		}
	}
	return objGenericText["wordnotinglossary"];
}

function showGlossaryPopup(_strWord) 
{
	var _objPopupContent = objContentFrame.document.getElementById("popupContent");
	var _strCaseWord;

	if ((_strWord != "") && (_objPopupContent))
	{
		if (objContentFrame.strPopupShowing == "glossary") 
		{
			hidePopupLayer();	
			objContentFrame.strPopupShowing = "";
		} 
		else 
		{
			_strCaseWord = "<b>" + _strWord.substring(0,1).toUpperCase() + _strWord.substring(1, _strWord.length) + "</b>";
			_objPopupContent.innerHTML = "";
			showPopupLayer();
			_objPopupContent.innerHTML =  popupTitle('glossary', 'left') + popupDiv(_strCaseWord + "<br /><br />" + getGlossary(_strWord), 340, 220, true);
			objContentFrame.strPopupShowing = "glossary";
		}
	}
}

