var strThisPageID = 0;
var strRealkey="";
var booInstructionStillToBeChanged = true;
var haveSelectedTextInInputBox = false;

function initialise()
{
	if (parent.objNavFrame) {
		appTop.intPageType = appTop.OPENINPUTEND;
		parent.objNavFrame.initPageType();
		if (appTop.booMainWindow)
			appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][1] = appTop.VISITED;

		strThisPageID = appTop.objCurrentState.objUnit.intCurrentPage;
		if (moreInput)
		{
			focusForm();
		}
		
		retrieveFormData();
	}
	document.body.scroll = "no";	
	parent.booContentLoaded = true; // This is to tell the program that this page have been loaded.
}

// This function is called when the onunload event for the document is triggered.
function pageUnload()
{
	if (parent.objNavFrame && moreInput) 
	{
		appTop.objCurrentState.objUnit.saveOIData(document.forms[0].elements['userInputField'].value, appTop.intPageType);
	}
	parent.booContentLoaded = false; // This is to tell the program that this page is being unloaded from the browser.
}

function focusForm()
{
	if (moreInput)
	{
		document.forms[0].elements['userInputField'].focus();
	}
}

function retrieveFormData()
{
	var _strData = "";
	
	
	if (dataFromPage != "") 
	{
	
		_strData = appTop.objCurrentState.objUnit.retrieveOIData(appTop.intPageType, dataFromPage);
		
	
	} 
	else 
	{
	
		_strData = appTop.objCurrentState.objUnit.retrieveOIData(appTop.OPENINPUTBUILD, "");
	}

	if (_strData == "") 
	{
		_strData = appTop.objGenericText["notextentered"];
	}

	document.getElementById("datafromOtherSceen").innerHTML = _strData;
}

function hideInstruction()
{
	if (booInstructionStillToBeChanged)
	{
		document.getElementById("initialTextLayerWithoutInstruction").style.visibility = "visible";
		document.getElementById("initialTextLayer").style.visibility = "hidden";

		if(document.getElementById("mainText"))
		{
			document.getElementById("mainText").innerHTML = new String(document.getElementById("mainText").innerHTML) + "<span class=\"instructionText\"> " + instructionText + "</span>";
		}
		else
		{
			document.getElementById("initialTextLayerWithoutInstruction").innerHTML = new String(document.getElementById("initialTextLayerWithoutInstruction").innerHTML) + "<span class=\"instructionText\"> " + instructionText + "</span>";
		}	

		booInstructionStillToBeChanged = false;
	}
}