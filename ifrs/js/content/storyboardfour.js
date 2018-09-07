///////////////////////////////////////////////////////////////////////
// EPIC Group PLC
//
// Project Name : 10014
//
// File Description : JavaScript file included with the Story Board Four template.
//		
// Creation Date : Wai Lam Yau - 18/04/2001
//		
//	Joe Conlan 07/08/2002 - Upgrade to Construct V2
//
///////////////////////////////////////////////////////////////////////

var more_n = new Image(); // Confirm button normal/rollout state
var more_r = new Image(); // Confirm button highlight/rollover state
var imagePath = "";  	// This is the path of the above images and is set in the xslt 
			// only if the progressive reveal tag is set to yes in script
//var audioOnReveal = false; 	// only set to true if progressive reveal tag is set 
				// to yes in script and audio on reveal tag is set to true
				// again set in the xslt
var revealTime = 0;
var timedReveal = false;
var revealOnAudioEnd = false; // set to true in xslt template if flag set in script
var revealInterval="";
var revealtimeOut="";
var cellToReveal = 1;
// This function is called when the onload event for the document is triggered.
function initialise()
{
	if (parent.nav) {
		top.pageType = top.STORYBOARDFOUR;
		parent.nav.initPageType();
		if (top.mainWindow)
			top.currentState.unit.navArray[top.currentState.unit.currentPage][1] = top.VISITED;
	}
	if(imagePath){preloadImages();}
	if(timedReveal&&(!revealOnAudioEnd))
	{
		revealInterval = window.setInterval("timedRevealNextCell()",(revealTime*1000));
	}
	document.body.scroll = "no";	parent.contentLoaded = true; // This is to tell the program that this page have been loaded.
}

// Function to preload theimages
// change the .src paths to point to the right directory/file
function preloadImages()
{
	more_n.src = imagePath+"more_n.gif";
	more_r.src = imagePath+"more_r.gif";
}

// This function is called when the onunload event for the document is triggered.
function pageUnload()
{
	window.clearTimeout(revealtimeOut);
	window.clearInterval(revealInterval);
	parent.contentLoaded = false; // This is to tell the program that this page is being unloaded from the browser.
}

function timedRevealNextCell()
{
	revealNextCell(++cellToReveal);
	if(cellToReveal == noOfCells)
	{
		window.clearInterval(revealInterval);
	}
}

function revealNextCell(nextCellID)
{
	if(nextCellID > noOfCells){return;}

	document.all['storyBoardCell'+nextCellID].style.visibility = 'visible';
	if(typeof(document.all['storyBoardCellBg'+nextCellID])!="undefined")
	{
		document.all['storyBoardCellBg'+nextCellID].style.visibility = 'visible';
	}
	if(typeof(document.all['moreButton'+(--nextCellID)])!="undefined")
	{
		document.all['moreButton'+nextCellID].style.visibility = 'hidden';
	}
	if(typeof(document.all['buildInstructionText'+(nextCellID)])!="undefined")
	{
		document.all['buildInstructionText'+nextCellID].style.visibility = 'hidden';
	}
	return;	
}

// Function to change the more button image to it's various states.
// This is called when the mouse is rolled over/out of the more button,
// This will only be called if the progressive reveal tag is set to yes in script
function changeImage(imgState,colID)
{
	var imgObj;
	var img = imgState.split("_");
	imgObj = eval("document.images['moreImg"+colID+"']");
	imgObj.src = eval(imgState).src
}
