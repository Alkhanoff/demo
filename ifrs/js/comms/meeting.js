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

var objTimerID = null; // timer variable for setTimeout function
var intControlMode; // three control modes - PLAYPAUSE = 0, INTERACTION = 1, PLAYONENTER = 2
var booFlashReady = false; // flag to indicate whether the flash player is ready or not
var booFinishedFlash = false; // flag to indicate whether the flash has finished or not

var strImagePath = "../images/"; // The path of the image directory relative to the page 
var play_h = new Image(); // Play button highlight/rollover state
var play_n = new Image(); // Play button normal/rollout state
var rewind_h = new Image(); // Rewind button highlight/rollover state
var rewind_n = new Image(); // Rewind button normal/rollout state
var pause_h = new Image(); // Pause button highlight/rollover state
var pause_n = new Image(); // Pause button normal/rollout state
var objFlash;


// This function is called when the onload event for the document is triggered
function initialise()
{
	var _strExpressInstall = parent.objOpenerTop.strBaseURL + "js/comms/swfobject/expressInstall.swf";
	var _strFilename = parent.objUnit.URL + "audio/" + filename;

	var flashvars = {};
	var params = {};
	params.allowscriptaccess = "always";
	params.swliveconnect = "true";
	var attributes = {};
	attributes.id = "flashObject";
	attributes.name = "flashObject";

	swfobject.embedSWF(_strFilename, "flashL", "580", "300", "9.0.0", _strExpressInstall, flashvars, params, attributes);

	preloadImages();
	parent.checkHistory();
	checkFlash();
	parent.booContentLoaded = true;
}

// Function to preload images
// change the .src paths to point to the right directory/file
function preloadImages()
{
	play_h.src = strImagePath + "buttons/play_h.gif";
	play_n.src = strImagePath + "buttons/play_n.gif";
	rewind_h.src = strImagePath + "buttons/rewind_h.gif";
	rewind_n.src = strImagePath + "buttons/rewind_n.gif";
	pause_h.src = strImagePath + "buttons/pause_h.gif";
	pause_n.src = strImagePath + "buttons/pause_n.gif";
}

// This function is called when the onunload event for the document is triggered
function pageUnload()
{
	parent.booContentLoaded = false; // This is to tell the program that this page is being unloaded from the browser.
}

// Function to change the done button image to it's varies states.
// This is called when the mouse is rolled over/out of the done button,
// and when the user clicked on the done button without selecting one of the options.
function changeImage(_strImgState)
{
	var _strImgSplit = _strImgState.split("_");

	document.images(_strImgSplit[0] + "Img").src = eval(_strImgState).src;
}

// Function to check whether the flash movie has been completely loaded or not.
// Set the flashReady variable to true and call the initialise ControlMode function when
// the flash movie has completed loaded.
function checkFlash()
{

	objFlash = swfobject.getObjectById("flashObject");
	
	if (objTimerID != null)
		clearTimeout(objTimerID);
		
	if (objFlash.PercentLoaded() != 100)
	{
		objTimerID = setTimeout("checkFlash()",500);
	}
	else
	{
		booFlashReady = true;
		initialiseControlMode();
	}
}

// Function to initialise the flash control mode
function initialiseControlMode()
{
	switch (controlMode)
	{
	case parent.PLAYPAUSE:
		pauseFlash();
		break;
	case parent.INTERACTION:
		playFlash();
		break;
	case parent.PLAYONENTER:
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
	booFinishedFlash = true;
	objFlash.StopPlay();
	/*
	document.all['play'].style.visibility = "visible";
	document.all['pause'].style.visibility = "hidden";
	document.all['rewind'].style.visibility = "visible";
	*/
}

// Function to play the flash movie.
function playFlash()
{
	if (booFinishedFlash)
		objFlash.Rewind();
	objFlash.Play();
	/*
	document.all['play'].style.visibility = "hidden";
	document.all['pause'].style.visibility = "visible";
	document.all['rewind'].style.visibility = "visible";
	*/
	booFinishedFlash = false;
}

// Function to pause the flash movie
function pauseFlash()
{
	objFlash.StopPlay();
	/*
	document.all['play'].style.visibility = "visible";
	document.all['pause'].style.visibility = "hidden";
	document.all['rewind'].style.visibility = "visible";
	*/
}

// Function to rewind the flash movie
function rewindFlash()
{
	objFlash.StopPlay();
	objFlash.Rewind();
	/*
	document.all['play'].style.visibility = "visible";
	document.all['pause'].style.visibility = "hidden";
	*/
}

// This function is called from the flash movie to display the text points.
// the flash movie need a getURL action.
function displayPoint(point)
{
	/*
	var pointObj;
	pointObj = eval("document.all['point"+point+"']");
	pointObj.style.visibility = "visible";
	*/
}


