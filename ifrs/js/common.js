///////////////////////////////////////////////////////////////////////
// EPIC Group PLC
//
// Project Name : 10014
//
// File Description : JavaScript file to be included in all tempates
//	Doesn't check for browsers as this is IE only, but is used to 
// stop the user highlighting text or using the right mouse button 
//		
// Creation Date : Joe 09/01/2003
//
///////////////////////////////////////////////////////////////////////


var commsArray = null;
var taskQuestion = false;
var homeAnchorBlink = 0;


//comment next lines to allow select and right click


if(top.booEnableRightClick)
{
	if(document.all) //For IE
	{
		document.onmousedown = checkRightMouse;
	}
	else { //For Firefox
		document.onclick = 	checkRightMouse;
	}
}

if(top.booEnableCopy)
{
	if(document.all) //IE
	{
		document.onselectstart = doSelectStart;
	}
	else { // Firefox
		document.onmousedown = disableSelectFF;
	}
} 

function disableSelectFF(e)
{
	if(e.target.id == "userInputField")
	{
		haveSelectedTextInInputBox = true;
	}
	else {
		return false;	
	}	
}

function doSelectStart(e) 
{ 

	if(window.event.srcElement.id=="userInputField")
	{
		haveSelectedTextInInputBox = true;
	}
	else
	{
		window.event.returnValue = false; 
		window.event.cancelBubble = true; 
	}
}

function checkRightMouse(e)
{
	if (document.all) // for IE
	{
		if(event.button == 2 || event.button == 3)
		{
			alert(appTop.strVersion);
			return false;
		}
	}
	else // for FF
	{
		if(e.button == 2 || e.button == 3)
		{
			alert(appTop.strVersion);
			return false;	
		} 
	}
}

function showGlossaryPopup() 
{
	alert("Function not available within Refresh");
}

function openDocument() 
{
	alert("Function not available within Refresh");
}

function showPopupText() 
{
	alert("Function not available within Refresh");
}
