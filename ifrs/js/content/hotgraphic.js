///////////////////////////////////////////////////////////////////////
// EPIC Group PLC
//
// Project Name : 10014
//
// File Description : JavaScript file included with the Hot Graphic template.
//		
// Creation Date : Wai Lam Yau - 05/03/2001
//		
// Modification History :
//
///////////////////////////////////////////////////////////////////////

var intPreviousClickedHotspot = 0; // store the previous clicked hotspot.
var booAllClicked = false; // flag to indicate whether all the hotspot has been clicked or not.
var objHotspotClicked = new Array(); // an array to store the state of each hotspot.
var strPreviousImageState; // variable to store the previous hotspot image state
var objHotspotClickedImage = new Array(); // array to store the clicked images, use to preload the images
var booShowVisitedState = true; // Set to false if you don't want to use visited state images
var objHotspotVisitedImage = new Array(); // array to store the visited state images, use to preload the images

function initialise()
{
	if (parent.objNavFrame) {
		appTop.intPageType = appTop.HOTGRAPHIC;
		parent.objNavFrame.initPageType();
		if (appTop.booMainWindow)
			appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][1] = appTop.VISITED;
	}

	initialiseHotspotClickedArray();
	preloadImages();

	document.body.scroll = "no";	
	parent.booContentLoaded = true; // This is to tell the program that this page have been loaded.
}

function pageUnload()
{
	parent.booContentLoaded = false; // This is to tell the program that this page is being unloaded from the browser.
}

// Function to preload images
// change the .src paths to point to the right directory/file
function preloadImages()
{
	var _strClickedImage;

	for (var i=0; i<objHotspotClicked.length; i++)
	{
		objHotspotClickedImage[i] = new Image();
		objHotspotVisitedImage[i] = new Image();
		_strClickedImage = new String(document.getElementById("hotspot" + (i + 1) + "Image").src);

		if (_strClickedImage.indexOf(".jpg",0) != -1)
			objHotspotClickedImage[i].src = _strClickedImage.replace(/_n.jpg/,"_c.jpg");
		else
			objHotspotClickedImage[i].src = _strClickedImage.replace(/_n.gif/,"_c.gif");

		if (booShowVisitedState)
		{
			objHotspotVisitedImage[i].src = transparentImage;
		}
	}

}

// This function is used to calculate the number of hotspots in the document.
// Initialise all the elements in the hotspotClicked array to false.
function initialiseHotspotClickedArray()
{
	objHotspotClicked = null;
	objHotspotClicked = new Array();
	for (var i=1; i<=noOfDisplayTexts; i++)
	{
		objHotspotClicked[i-1] = false;
	}
}

// Function to actually change the hotspot image state.
function changeHotspotImage(_intHotspotNum)
{
	var _objHotspotImage;

	if ((_intHotspotNum == intPreviousClickedHotspot) && (displayTextOverwritesInitialText)) {
		
		//if they click again on the hotspot they just clicked on, show the initial text 
		document.getElementById("hotspot" + intPreviousClickedHotspot + "Image").src = strPreviousImageState;
		document.getElementById("initialTextLayer").style.visibility = "visible";	
		document.getElementById("displayTextArea").style.visibility = "hidden";
		document.getElementById("displayTextArea").innerHTML = "";
		displayTextOverwritesInitialText = true;
		intPreviousClickedHotspot = 0;
		
	} else {
		// If previous hotspot have been clicked, then change the state of that hotspot back to it's normal state
		if (intPreviousClickedHotspot != 0)
		{
			document.getElementById("hotspot" + intPreviousClickedHotspot + "Image").src = strPreviousImageState;
		}
		else
		{
			//first click
			if(displayTextOverwritesInitialText)
			{
				document.getElementById("initialTextLayer").style.visibility = "hidden";	
			}
			else
			{
				document.getElementById("initialInstructionText").style.visibility = "hidden";		
			}
		}
	
		_objHotspotImage = document.getElementById("hotspot" + _intHotspotNum + "Image");
	
		if(booShowVisitedState)
		{
			strPreviousImageState = objHotspotVisitedImage[(_intHotspotNum - 1)].src;
		}
		else
		{
			strPreviousImageState = _objHotspotImage.src;
		}
		
		_objHotspotImage.src = objHotspotClickedImage[(_intHotspotNum - 1)].src;
		checkHotspotClicked(_intHotspotNum)
		return;
	}
}

// This function is used to check whether all the hotspot has been clicked or not.
// Once all the hotspot has been clicked, the variable allClicked is set to true.
function checkHotspotClicked(_intHotspotNum)
{
	var _intCount = 0;

	objHotspotClicked[(_intHotspotNum-1)] = true;

	for (var i=0; i<objHotspotClicked.length; i++)
	{
		if (objHotspotClicked[i])
			_intCount++;
	}

	if (_intCount == objHotspotClicked.length)
	{
		booAllClicked = true;		
	}

	doShowText(_intHotspotNum);
}

// This function actually shows the text that's linked with the clicked hotspot.
// It hides the previous displayed text before showing the currently clicked hotspot.
function doShowText(_intHotspotNum)
{
	var _strInstruction = (booAllClicked) ? theInstructionText : theInitialInstructionText;
	var _strTextToDisplay = "";

	intPreviousClickedHotspot = _intHotspotNum;
	if(displayTextArray[_intHotspotNum][0])
	{
		_strTextToDisplay = displayTextArray[_intHotspotNum][0];
	}

	_strTextToDisplay += "<span class=\"instructionText\"> " + _strInstruction + "</span>";
	document.getElementById("displayTextArea").innerHTML = _strTextToDisplay;
	document.getElementById("displayTextArea").style.visibility = "visible";

	return;
}

