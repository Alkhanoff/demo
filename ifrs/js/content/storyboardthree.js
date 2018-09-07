var more_n = new Image(); // more button normal/rollout state
var more_r = new Image(); // more button highlight/rollover state
var or_n = new Image(); // or button normal/rollout state
var or_r = new Image(); // or button highlight/rollover state
var plus_n = new Image(); // plus button normal/rollout state
var plus_r = new Image(); // plus button highlight/rollover state
var minus_n = new Image(); // minus button normal/rollout state
var minus_r = new Image(); // minus button highlight/rollover state
var equals_n = new Image(); // equals button normal/rollout state
var equals_r = new Image(); // equals button highlight/rollover state

var imagePath = "";  	// This is the path of the above images and is set in the xslt 
			// only if the progressive reveal tag is set to yes in script
//var audioOnReveal = false; 	// only set to true if progressive reveal tag is set 
				// to yes in script and audio on reveal tag is set to true
				// again set in the xslt
var revealTime = 0;
var timedReveal = false;
var revealOnAudioEnd = false; // set to true in xslt template if flag set in script
var objInterval = null;
var objTimeout = null;
var intCellToReveal = 1;

// This function is called when the onload event for the document is triggered.
function initialise()
{
	if (parent.objNavFrame) {
		appTop.intPageType = appTop.STORYBOARDFOUR;
		parent.objNavFrame.initPageType();
		if (appTop.booMainWindow)
			appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][1] = appTop.VISITED;
	}

	if(imagePath)
	{
		preloadImages(firstSymbol);
		preloadImages(secondSymbol);
	}
	if (timedReveal && (!revealOnAudioEnd))
	{
		objInterval = window.setInterval("timedRevealNextCell()", (revealTime*1000));
	}

	document.body.scroll = "no";	
	parent.booContentLoaded = true; // This is to tell the program that this page have been loaded.
}

// Function to preload theimages
// change the .src paths to point to the right directory/file
function preloadImages(_strSymbol)
{
	_strSymbol = _strSymbol.toLowerCase();
	eval(_strSymbol + "_n").src = imagePath + _strSymbol + "_n.gif";
	eval(_strSymbol + "_r").src = imagePath + _strSymbol + "_r.gif";
}

// This function is called when the onunload event for the document is triggered.
function pageUnload()
{
	window.clearTimeout(objTimeout);
	window.clearInterval(objInterval);

	parent.booContentLoaded = false; // This is to tell the program that this page is being unloaded from the browser.
}

function timedRevealNextCell()
{
	revealNextCell(++intCellToReveal);

	if (intCellToReveal == noOfCells)
	{
		window.clearInterval(objInterval);
	}
}

function revealNextCell(_intNextCellID)
{
	if (_intNextCellID > noOfCells)
	{
		return;
	}

	if (_intNextCellID == noOfCells) 
	{
		document.getElementById("finalInstruction").style.visibility = 'visible';
	}
	
	document.getElementById("storyBoardCell" + _intNextCellID).style.visibility = 'visible';
	if (document.getElementById("storyBoardCellBg" + _intNextCellID))
	{
		document.getElementById("storyBoardCellBg"+_intNextCellID).style.visibility = 'visible';
	}
	if (document.getElementById("moreButton" + _intNextCellID))
	{
		document.getElementById("moreButton" + _intNextCellID).style.visibility = 'visible';
	}
	if (document.getElementById("moreButton" + (--_intNextCellID)))
	{
		document.getElementById("moreButton" + _intNextCellID).style.visibility = 'hidden';
	}
	if (document.getElementById("buildInstructionText" + _intNextCellID))
	{
		document.getElementById("buildInstructionText" + _intNextCellID).style.visibility = 'hidden';
	}
	return;	
}

// Function to change the more button image to it's various states.
// This is called when the mouse is rolled over/out of the more button,
// This will only be called if the progressive reveal tag is set to yes in script
function changeImage(_strImgState, _intColID)
{
	if (parent.booContentLoaded)
	{
		document.getElementById("moreImg" + _intColID).src = eval(_strImgState).src
	}
}
