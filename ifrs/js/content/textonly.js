///////////////////////////////////////////////////////////////////////
// EPIC Group PLC
//
// Project Name : 10014
//
// File Description : JavaScript file included with the Double Column Text template.
//		
// Creation Date : Wai Lam Yau - 05/03/2001
//		
// Modification History : Joe Conlan 29/07/2002 - Upgrade to Construct V2
//
///////////////////////////////////////////////////////////////////////
var more_n = new Image(); // Confirm button normal/rollout state
var more_r = new Image(); // Confirm button highlight/rollover state
var imagePath = "";  	// This is the path of the above images and is set in the xslt 
			// only if the progressive reveal tag is set to yes in script
// This function is called when the onload event for the document is triggered.
function initialise()
{
	if (parent.objNavFrame) {
		appTop.intPageType = appTop.TEXTONLY;
		parent.objNavFrame.initPageType();
		if (appTop.booMainWindow)
			appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][1] = appTop.VISITED;
	}

	if(imagePath)
	{
		preloadImages();
	}
	
	document.body.scroll = "no";	
	parent.booContentLoaded = true; // This is to tell the program that this page have been loaded.
}

function pageUnload()
{
	parent.booContentLoaded = false; // This is to tell the program that this page is being unloaded from the browser.
}

function preloadImages()
{
	more_n.src = imagePath+"more_n.gif";
	more_r.src = imagePath+"more_r.gif";
}

// Function to change the more button image to it's various states.
// This is called when the mouse is rolled over/out of the more button,
// This will only be called if the progressive reveal tag is set to yes in script
function changeImage(_strImgState, _strCellID)
{
	if (parent.booContentLoaded)
	{
		document.getElementById("moreImg" + _strCellID).src = eval(_strImgState).src;
	}
}

function revealNextColumn(_strNextCellID)
{
	document.getElementById("textColumn" + _strNextCellID).style.visibility = 'visible';

	if(document.getElementById("moreButton" + _strNextCellID))
	{
		document.getElementById("moreButton" + _strNextCellID).style.visibility = 'visible';
	}

	document.getElementById("moreButton" + (--_strNextCellID)).style.visibility = 'hidden';

	if(document.getElementById("buildInstructionText" + _strNextCellID))
	{
		document.getElementById("buildInstructionText" + _strNextCellID).style.visibility = 'hidden';
	}
	return;	
}