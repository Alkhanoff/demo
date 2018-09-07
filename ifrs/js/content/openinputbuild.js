var thisPageID = 0;
var realkey="";
//document.onkeydown = keyDown
var haveSelectedTextInInputBox = false;
var initialInput = "Type in here";
var booInitialInputRemoved = true;

function keyDown(e) 
{
	var alphabet = new String("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
	var ieKey;
	ieKey = event.keyCode
	realkey = String.fromCharCode(ieKey)
	//13 is the Enter key
	if((alphabet.indexOf(realkey) != -1)||(ieKey==13)) {hideInstruction();}
}


function initialise()
{
	if (parent.objNavFrame) {
		appTop.intPageType = appTop.OPENINPUTBUILD;
		parent.objNavFrame.initPageType();
		if (appTop.booMainWindow)
		{
			appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][1] = appTop.VISITED;
		}
		
		//alert(appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][1]);
		
		
		thisPageID = appTop.objCurrentState.objUnit.intCurrentPage;
		focusForm();
		retrieveFormData();
	}
	document.body.scroll = "no";	parent.booContentLoaded = true; // This is to tell the program that this page have been loaded.
}

// This function is called when the onunload event for the document is triggered.
function pageUnload()
{
	//storing of open input text is now performed in presnav.js in the goNext() function
	parent.booContentLoaded = false; // This is to tell the program that this page is being unloaded from the browser.
}

function focusForm()
{
	document.forms['userInputForm'].elements['userInputField'].focus();
}

function retrieveFormData()
{
	var data = "";
	
	if(!haveSelectedTextInInputBox){
		//next line replaced by mvc, 3/3/3
		//data = top.currentState.unit.navArray[thisPageID][3];
		data = appTop.objCurrentState.objUnit.retrieveOIData(appTop.pageType, "");
	}
	if (data == "") {
		data = initialInput;
		booInitialInputRemoved = false;
	}
	data+=realkey;
	
	
	document.forms['userInputForm'].elements['userInputField'].value = data;
}


function hideInitialInput() {
	if (parent.objNavFrame)
	{
		if (!booInitialInputRemoved) {
			fieldText = document.forms['userInputForm'].elements['userInputField'].value;
			if (fieldText.indexOf(initialInput) == 0) {
				document.forms['userInputForm'].elements['userInputField'].value = fieldText.substring(initialInput.length, fieldText.length);
			}	
			booInitialInputRemoved = true;
		}
		document.all.finalInstruction.innerHTML = parent.objNavFrame.getInstruction(true);
	}
}

var instructionStillToBeChanged = true;

function hideInstruction()
{
	if(instructionStillToBeChanged)
	{
		if(inputBoxIsOnRight)
		{
			document.all['userInputLayer'].innerHTML = new String(document.all['userInputLayer'].innerHTML)+"<span class=\"instructionText\"><p>"+instructionText+"</p></span>";
			focusForm();
			//retrieveFormData();
		}
		else
		{
			if(typeof(document.all['mainTextOrGraphic'])!="undefined")
			{
				if(document.all['mainTextOrGraphic'].innerHTML.indexOf("<img")!=-1)
				{
					document.all['mainTextOrGraphic'].innerHTML = new String(document.all['mainTextOrGraphic'].innerHTML)+"<span class=\"instructionText\"><p>"+instructionText+"</p></span>";
				}
				else
				{
					document.all['mainTextOrGraphic'].innerHTML = new String(document.all['mainTextOrGraphic'].innerHTML)+"<span class=\"instructionText\"> "+instructionText+"</span>";
				}
			}
		}	
		//document.all['initialTextLayerWithoutInstruction'].style.visibility = "visible";
		//document.all['initialTextLayer'].style.visibility = "hidden";
		if (document.all['initialInstructionText']) {
			document.all['initialInstructionText'].style.visibility = "hidden";
		}
		instructionStillToBeChanged=false;
	}
}