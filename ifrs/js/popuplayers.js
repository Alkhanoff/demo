var popupClose_n = new Image();
var popupClose_h = new Image();
var popupBg = new Image();

function preloadPopupImages() 
{
    popupClose_h.src = imagePath + "content/close_btn_h.gif";
    popupClose_n.src = imagePath + "content/close_btn_n.gif";
    popupBg.src = imagePath + "content/popup_bg.gif";
}

function changeImage(_strImgState) 
{
	objMainAreaFrame.window["content"].document.getElementById(_strImgState.split("_")[0] + "Img").src = eval(_strImgState).src;
	return;
}

function popupTitle(_strImgName, strAlign) 
{
	return "<div align='" + strAlign + "'><img src='" + strBaseURL + "images/content/popup_titles/" + _strImgName + ".gif' alt='" + _strImgName + "' /></div>"
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
	var _objFrame = objMainAreaFrame.window["content"];
	var _objDoc = _objFrame.document;
	var _intNextElement = 0;
	
	if (!_objFrame.booPopupVisible) 
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
		_objFrame.booPopupVisible = true;
		//make an array of the elements we're about to hide, so that they can be shown again later
		_objFrame.objHiddenElements = new Array();
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
						_objFrame.objHiddenElements[_intNextElement] = _objDoc.forms[n].elements[i].id;
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
	var _objFrame = objMainAreaFrame.window["content"];
	var _objDoc = _objFrame.document;

	if (_objFrame.booPopupVisible) 
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
		for (n=0; n<_objFrame.objHiddenElements.length; n++) 
		{
			if (_objDoc.getElementById(_objFrame.objHiddenElements[n])) 
			{
				_objDoc.getElementById(_objFrame.objHiddenElements[n]).style.visibility = "visible";
				_objFrame.objHiddenElements[n] = null;
			}
		}
		
		_objFrame.booPopupVisible = false;
		_objFrame.strPopupShowing = "";
	}
}

function showHelp()
{
	var _objFrame = objMainAreaFrame.window["content"];
	var _objPopupContent = _objFrame.document.getElementById("popupContent");

	if (_objPopupContent) 
	{
		if (_objFrame.popupShowing == "help") 
		{
			hidePopupLayer();	
			_objFrame.strPopupShowing = "";
		} 
		else 
		{
			_objPopupContent.innerHTML = "";
			showPopupLayer();
			_objPopupContent.innerHTML = popupTitle('help','left') + popupDiv(helpText(intPageType), 340, 220);
			_objFrame.strPopupShowing = "help";
		}
	}
}

function toolsHelp(_strWhichHelp) 
{
	var _objFrame = objMainAreaFrame.window["content"];
	var _objPopupContent = _objFrame.document.getElementById("popupContent");
	var _strToolsHelpText;

	if (_objPopupContent) 
	{
		if (_strWhichHelp == "messages") 
		{
			_strToolsHelpText = strMessagesHelp;
		} 
		else if (_strWhichHelp == "toolkit")
		{
			_strToolsHelpText = strToolkitHelp;
		}
		else
		{
			_strToolsHelpText = strAccessoriesHelp;
		}

		if (_objFrame.strPopupShowing == _strWhichHelp) 
		{
			hidePopupLayer();	
			_objFrame.strPopupShowing = "";
		} 
		else 
		{
			_objPopupContent.innerHTML = "";
			showPopupLayer();
			_objFrame.strPopupShowing = _strWhichHelp;
			_objPopupContent.innerHTML = popupTitle('help', "left") + popupDiv(_strToolsHelpText, 340, 220, true);
		}
	}
}

function getGlossary(_strWord) 
{
	for (i=0; i<objGlossWords.length; i++) 
	{
		if (objGlossWords[i][0].toLowerCase() == _strWord.toLowerCase()) 
		{
			return objGlossWords[i][1];
		}
	}
	return objGenericText["wordnotinglossary"];
}

function showGlossaryPopup(_strWord) 
{
	var _objFrame = objMainAreaFrame.window["content"];
	var _objPopupContent = _objFrame.document.getElementById("popupContent");
	var _strCaseWord;

	if ((_strWord != "") && (_objPopupContent))
	{
		if (_objFrame.strPopupShowing == "glossary") 
		{
			hidePopupLayer();	
			_objFrame.strPopupShowing = "";
		} 
		else 
		{
			_strCaseWord = "<b>" + _strWord.substring(0,1).toUpperCase() + _strWord.substring(1, _strWord.length) + "</b>";
			_objPopupContent.innerHTML = "";
			showPopupLayer();
			_objPopupContent.innerHTML =  popupTitle('glossary', 'left') + popupDiv(_strCaseWord + "<br /><br />" + getGlossary(_strWord), 340, 220, true);
			_objFrame.strPopupShowing = "glossary";
		}
	}
}

function showClue() 
{
	var _objFrame = objMainAreaFrame.window["content"];
	var _objPopupContent = _objFrame.document.getElementById("popupContent");

	if ((_objFrame.hintText) && (_objPopupContent))
	{
		if (_objFrame.strPopupShowing == "clue") 
		{
			hidePopupLayer();	
			_objFrame.strPopupShowing = "";
		} 
		else 
		{
			_objPopupContent.innerHTML = "";
			showPopupLayer();
			_objPopupContent.innerHTML = popupTitle('hint', "left") + popupDiv(_objFrame.hintText, 340, 220, true);
			_objFrame.strPopupShowing = "clue";
		}
	}
}
