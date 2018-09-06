var intThisPageID = 0;
var strRealkey = "";
var haveSelectedTextInInputBox = false;
var strInitialInput = appTop.objGenericText["initialinputtext"];
var booInitialInputRemoved = false;

var booInstructionStillToBeChanged = true;

function initialise()
{
	
	if (parent.objNavFrame) {
		appTop.intPageType = appTop.OPENINPUTSTART;
		parent.objNavFrame.initPageType();
		if (appTop.booMainWindow)
			appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][1] = appTop.VISITED;

		intThisPageID = appTop.objCurrentState.objUnit.intCurrentPage;
		focusForm();
		retrieveFormData();
	}

	document.body.scroll = "no";	
	parent.booContentLoaded = true; // This is to tell the program that this page have been loaded.
}

// This function is called when the onunload event for the document is triggered.
function pageUnload()
{
	//storing of open input text is now performed in presnav.js in the goNext() function
	parent.booContentLoaded = false; // This is to tell the program that this page is being unloaded from the browser.
}

function focusForm()
{
	document.forms[0].elements['userInputField'].focus();
}

function retrieveFormData()
{
	var _strData = "";
	
	if (!haveSelectedTextInInputBox)
	{
		_strData = appTop.objCurrentState.objUnit.retrieveOIData(appTop.intPageType, intThisPageID);
		
	}

	if (_strData == "") 
	{
		_strData = strInitialInput;
		booInitialInputRemoved = false;
	}
	_strData += strRealkey;
	document.forms[0].elements['userInputField'].value = _strData;
}

function hideInitialInput() 
{
	var _objField;
	if (parent.objNavFrame)
	{
		if (!booInitialInputRemoved) 
		{
			booInitialInputRemoved = true;
			_objField = document.forms[0].elements['userInputField'];
			
			if (_objField.value.indexOf(strInitialInput) == 0) 
			{
				_objField.value = _objField.value.substring(strInitialInput.length, _objField.value.length);
			}
		}
		document.getElementById("finalInstruction").innerHTML = parent.objNavFrame.getInstruction(true);
	}
}

function hideInstruction()
{
	if (booInstructionStillToBeChanged)
	{
		booInstructionStillToBeChanged = false;

		if (!inputBoxIsOnRight)
		{
			document.getElementById("userInputLayer").innerHTML = new String(document.getElementById("userInputLayer").innerHTML) + "<span class=\"instructionText\"><p>" + instructionText + "</p></span>";
			focusForm();
		}
		else
		{
			if (document.getElementById("mainTextOrGraphic"))
			{
				if(document.getElementById("mainTextOrGraphic").innerHTML.indexOf("<img")!=-1)
				{
					document.getElementById("mainTextOrGraphic").innerHTML = new String(document.getElementById("mainTextOrGraphic").innerHTML) + "<span class=\"instructionText\"><p>" + instructionText + "</p></span>";
				}
				else
				{
					document.getElementById("mainTextOrGraphic").innerHTML = new String(document.getElementById("mainTextOrGraphic").innerHTML) + "<span class=\"instructionText\"> " + instructionText + "</span>";
				}
			}
		}	

		if (document.getElementById("initialInstructionText")) 
		{
			document.getElementById("initialInstructionText").style.visibility = "hidden";
		}
		
	}
}