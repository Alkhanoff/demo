///////////////////////////////////////////////////////////////////////
// EPIC Group PLC
//
// Project Name : 10014
//
// File Description : JavaScript file included with the Flash Screen. (flashScreen.html)
//		
// Creation Date : Wai Lam Yau - 11/03/2001
//		
// Modification History :
//
///////////////////////////////////////////////////////////////////////

var timerID = null; // timer variable for setTimeout function
var controlMode; // three control modes - PLAYPAUSE = 0, INTERACTION = 1, PLAYONENTER = 2
var flashReady = false; // flag to indicate whether the flash player is ready or not
var finishedFlash = false; // flag to indicate whether the flash has finished or not

var imagePath = "../images/"; // The path of the image directory relative to the page 
var play_r = new Image(); // Play button highlight/rollover state
var play_n = new Image(); // Play button normal/rollout state
var rewind_r = new Image(); // Rewind button highlight/rollover state
var rewind_n = new Image(); // Rewind button normal/rollout state
var pause_r = new Image(); // Pause button highlight/rollover state
var pause_n = new Image(); // Pause button normal/rollout state


// This function is called when the onload event for the document is triggered
function initialise()
{
	if (displayPageNum)
		writePageNum();

	preloadImages();
	checkFlash();

	parent.pageType = FLASHSCREEN;
	parent.pageLoaded = true; // This is to tell the program that this page have been loaded.
}

// Function to preload images
// change the .src paths to point to the right directory/file
function preloadImages()
{
	play_r.src = imagePath + "buttons/play_r.gif";
	play_n.src = imagePath + "buttons/play_n.gif";
	rewind_r.src = imagePath + "buttons/rewind_r.gif";
	rewind_n.src = imagePath + "buttons/rewind_n.gif";
	pause_r.src = imagePath + "buttons/pause_r.gif";
	pause_n.src = imagePath + "buttons/pause_n.gif";
}

// This function is called when the onunload event for the document is triggered
function pageUnload()
{
	parent.pageLoaded = false; // This is to tell the program that this page is being unloaded from the browser.
}

// Function to change the done button image to it's varies states.
// This is called when the mouse is rolled over/out of the done button,
// and when the user clicked on the done button without selecting one of the options.
function changeImage(imgState)
{
	var imgObj;
	var img = imgState.split("_");

	imgObj = eval("document.images['"+img[0]+"Img']");
	imgObj.src = eval(imgState).src
}

// Function to check whether the flash movie has been completely loaded or not.
// Set the flashReady variable to true and call the initialise ControlMode function when
// the flash movie has completed loaded.
function checkFlash()
{
	var flashObj;

	flashObj = flashObject;

	if (timerID != null)
		clearTimeout(timerID);
		
	if (flashObj.PercentLoaded() != 100)
	{
		timerID = setTimeout("checkFlash()",500);
	}
	else
	{
		flashReady = true;
		initialiseControlMode();
	}
}

// Function to initialise the flash control mode
function initialiseControlMode()
{
	switch (controlMode)
	{
	case PLAYPAUSE:
		pauseFlash();
		break;
	case INTERACTION:
		playFlash();
		break;
	case PLAYONENTER:
		playFlash();
		break;
	default:
		break;
	}
}

// This function is called from the flash movie when it gets to the end of the movie
// the flash movie need a getURL action.
function flashFinish()
{
	finishedFlash = true;

	flashObject.StopPlay();
	document.all['play'].style.visibility = "visible";
	document.all['pause'].style.visibility = "hidden";
	document.all['rewind'].style.visibility = "visible";
}

// Function to play the flash movie.
function playFlash()
{
	if (finishedFlash)
		flashObject.Rewind();
	flashObject.Play();
	document.all['play'].style.visibility = "hidden";
	document.all['pause'].style.visibility = "visible";
	document.all['rewind'].style.visibility = "visible";
	finishedFlash = false;
}

// Function to pause the flash movie
function pauseFlash()
{
	flashObject.StopPlay();
	document.all['play'].style.visibility = "visible";
	document.all['pause'].style.visibility = "hidden";
	document.all['rewind'].style.visibility = "visible";
}

// Function to rewind the flash movie
function rewindFlash()
{
	flashObject.StopPlay();
	flashObject.Rewind();
	document.all['play'].style.visibility = "visible";
	document.all['pause'].style.visibility = "hidden";
}

// This function is called from the flash movie to display the text points.
// the flash movie need a getURL action.
function displayPoint(point)
{
	var pointObj;
	pointObj = eval("document.all['point"+point+"']");
	pointObj.style.visibility = "visible";
}


