///////////////////////////////////////////////////////////////////////
// EPIC Group PLC
//
// Project Name : 10014
//
// File Description : JavaScript file included with the Hot Text template.
//		
// Creation Date : Wai Lam Yau - 05/03/2001
//		
// Modification History :
//
///////////////////////////////////////////////////////////////////////

var previousClickedText = 0; // store the previous clicked hot text.
var allClicked = false; // flag to indicate whether all the hot text has been clicked or not.
var hotTextClicked = new Array(); // an array to store the state of each hot text.
var higlightClass="hotTextHighlight";
var normalClass="hotText";
var visitedClass="hotTextVisited";
var bullett_n = new Image(); // Normal Bullett graphic
var bullett_c = new Image(); // Selected bullett graphic
var bullett_v = new Image(); // Visited bullett graphic

// This function is called when the onload event for the document is triggered.
function initialise()
{
	if (parent.objNavFrame) {
		appTop.intPageType = appTop.HOTTEXT;
		parent.objNavFrame.initPageType();
		if (appTop.booMainWindow)
			appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][1] = appTop.VISITED;
	}

	preloadImages();
	initialiseHotTextClickedArray();
	
	document.body.scroll = "no";	
	parent.booContentLoaded = true; // This is to tell the program that this page have been loaded.
}

function preloadImages()
{
	bullett_n.src = imagePath+"bullett_n.gif";
	bullett_c.src = imagePath+"bullett_c.gif";
	bullett_v.src = imagePath+"bullett_v.gif";
}

// This function is called when the onunload event for the document is triggered.
function pageUnload()
{
	if (audioOnPage)
	{
		clearAudio();	
	}

	parent.booContentLoaded = false; // This is to tell the program that this page is being unloaded from the browser.
}

// This function is used to calculate the number of hot text in the document.
// Initialise all the elements in the hotTextClicked array to false.
function initialiseHotTextClickedArray()
{
	for (var i=1; i<=numberOfHotTexts; i++)
	{
		hotTextClicked[i-1] = false;
	}
	return;
}

// This function is called when the hot text is clicked.
// The hot text number is passed to this function.
// This function will not do anyting until the parent.booContentLoaded varaible has been set to true.
function showText(textNum)
{
	if (parent.booContentLoaded)
	{
		//doShowText(textNum);
		checkHotTextClicked(textNum)
	}

	return;
}

// This function actually shows the text that's linked with the clicked hot text.
// It hides the previous displayed text before showing the currently clicked hot text.
function doShowText(textNum)
{
	var textToDisplay = displayTextArray[textNum];
	if (typeof(graphicFileNameArray) != "undefined")
	{
		if (graphicFileNameArray[textNum])
		{
			if (textToDisplay == "")
				textToDisplay = textToDisplay + "<img border=\"0\" src=\"images/" + graphicFileNameArray[textNum] + "\">";
			else
				textToDisplay = textToDisplay + "<br><img border=\"0\" src=\"images/" + graphicFileNameArray[textNum] + "\">";
		}
	}
	if (allClicked) 
	{
		textToDisplay += "<span class=\"instructionText\"> " + theInstructionText + "</span>";
		document.all['initialInstructionText'].style.visibility = "hidden";		
	}
	document.all['displayTextArea'].innerHTML = textToDisplay;
	highlightHotText(textNum);

	return;
}

// This function is used to check whether all the hot text has been clicked or not.
// Once all the hot text has been clicked, the variable allClicked is set to true.
function checkHotTextClicked(textNum)
{	
	var count = 0;

	hotTextClicked[(textNum-1)] = true;

	for (var i=0; i<hotTextClicked.length; i++)
	{
		if (hotTextClicked[i])
			count++;
	}

	if (count == hotTextClicked.length)
	{
		allClicked = true;
	}

	doShowText(textNum);
	return;
}

function display(str,hotTextNum) 
{
	if (!lastOneClicked&&audioOnPage)
	{
		playAudio(initialAudioFile);
	}

	document.all['hotTextArea'].innerHTML = str; // "assign" to element
	
	if (hotTextNum&&audioOnPage)
	{
		if (hotTextArray[hotTextNum][1])// This hotText has audio so play it 
		{
			playAudio(audioFileNameArray[hotTextNum]);
		}
	}
	return;
}

var lastOneClicked = 0;

function highlightHotText(_intHotTextNum)
{
	var _intCurrentHotText = 1;
	var _objHotText;
	
	_objHotText = document.getElementById("hotText" + _intCurrentHotText);

	while (_objHotText)
	{
		if ((_objHotText.className == "hotTextHighlight") && (_intCurrentHotText != _intHotTextNum))
		{
			_objHotText.className = "hotTextVisited";
		}
		else if( _intCurrentHotText == _intHotTextNum)
		{
			_objHotText.className = "hotTextHighlight";
		}

		_intCurrentHotText++;
		_objHotText = document.getElementById("hotText" + _intCurrentHotText);
	}

	return;
}
