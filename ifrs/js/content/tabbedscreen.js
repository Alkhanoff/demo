///////////////////////////////////////////////////////////////////////
// EPIC Group PLC
//
// Project Name : 10014
//
// File Description : JavaScript file included with the Tabbed screen template
//
// Creation Date : Joe 12/11/2002
//
///////////////////////////////////////////////////////////////////////

//Global tabbed screen specific variables

var tabsClickedArray = new Array();
var allTabsClicked = false;
var currentTab = 1;
var HOTTEXT = 1;
var HOTGRAPHIC = 2;
var TEXTONLYorTEXTWITHGRAPHIC = 0;

//Hot text global variables
var previousClickedText = 0; // store the previous clicked hot text.
var allHotTextClicked = false; // flag to indicate whether all the hot text has been clicked or not.
var hotTextClicked = new Array(); // an array to store the state of each hot text.
var higlightClass = "hotTextHighlight";
var normalClass = "hotText";
var visitedClass = "hotTextVisited";
var bullett_n = new Image(); // Normal Bullett graphic
var bullett_c = new Image(); // Selected bullett graphic
var bullett_v = new Image(); // Visited bullett graphic
var hotTextArray = new Array();

//Hot graphic global variables
var previousClickedHotspot = 0; // store the previous clicked hotspot.
var allHotGraphicsClicked = false; // flag to indicate whether all the hotspot has been clicked or not.
var hotspotClicked = new Array(); // an array to store the state of each hotspot.
var previousImageState; // variable to store the previous hotspot image state
var hotspotClickedImage = new Array(); // array to store the clicked images, use to preload the images
var showVisitedState = true; // Set to false if you don't want to use visited state images
var hotspotVisitedImage = new Array(); // array to store the visited state images, use to preload the images
var displayTextOverwritesInitialText = true;
var originalImageState = new Array();

// This function is called when the onload event for the document is triggered.
function initialise()
{
	if (parent.objNavFrame)
	{
		//alert(parent.objNavFrame.location)
		appTop.intPageType = appTop.TABBEDSCREEN;
		parent.objNavFrame.initPageType();
		if (appTop.booMainWindow)
			appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][1] = appTop.VISITED;
	}

	if(parent.objOpener)
	{
		theInitialInstructionText = appTop.objOpener.objGenericText["tabinitialinstruction"];
	}
	else {
		theInitialInstructionText = appTop.objGenericText["tabinitialinstruction"];
	}

	initTabsClickedArray();

	preloadImages();
	initialiseHotTextClickedArray();
	loadInstruction();
	initialiseHotspotClickedArray();
	document.body.scroll = "no";
	parent.booContentLoaded = true; // This is to tell the program that this page have been loaded.
}

// This function is called when the onunload event for the document is triggered.
function pageUnload()
{
	parent.booContentLoaded = false; // This is to tell the program that this page is being unloaded from the browser.
}

function selectTab(tabNum)
{
	if(parent.objOpener)
	{
		theInitialInstructionText = appTop.objOpener.objGenericText["tabnexttabinstruction"];
	}
	else {
		theInitialInstructionText = appTop.objGenericText["tabnexttabinstruction"];
	}

	if (document.getElementById("initialInstructionText"))
	{
		if (tabNum != 1)
		{
			document.getElementById("initialInstructionText").style.visibility = "hidden";
		}
	}

	currentTab = tabNum;
	allHotTextClicked = false;
	tabsClickedArray[tabNum]=true;
	hideOldshowNew(tabNum);
	initialiseHotTextClickedArray();

	if (allTabsHaveBeenClicked())
	{
		hideMainInstruction();
	}

	loadInstruction();
	initialiseHotspotClickedArray();
}

function hideOldshowNew(tabNum)
{
	for (i=0; i<document.all.length; i++)
	{
		for (j=1; j<=noOfTabs; j++)
		{
			if(document.all[i].id.indexOf("tab" + j) != -1)
			{
				visToSwitchTo = (j == tabNum) ? "visible" : "hidden";
				document.all[i].style.visibility = visToSwitchTo;
			}
		}
	}
}

function initTabsClickedArray()
{
	for (var i=1; i<=noOfTabs; i++)
	{
		tabsClickedArray[i] = false;
	}
	tabsClickedArray[1] = true;//Open when you enter the screen!
}

function allTabsHaveBeenClicked()
{
	allTabsClicked=true;
	for (var i=1; i<=noOfTabs && allTabsClicked; i++)
	{
		if(tabsClickedArray[i]==false){allTabsClicked=false;}
	}
	return allTabsClicked;
}

function hideMainInstruction()
{
	if (document.getElementById("initialTextLayer"))
	{
		document.getElementById("initialTextWithoutInstructionLayer").style.visibility = "visible";
		document.getElementById("initialTextLayer").style.visibility = "hidden";
	}
}
//Hot graphic code
// This function is used to calculate the number of hotspots in the document.
// Initialise all the elements in the hotspotClicked array to false.
function initialiseHotspotClickedArray()
{
	if (hotTypeOnThisTab[currentTab] == HOTGRAPHIC)
	{
		hotspotClicked = new Array();
		clearHotFeedbackDisplayArea();
		allHotGraphicsClicked = false;
		previousClickedHotspot = 0;
		displayTextArray = eval("tab"+currentTab+"displayTextArray");
		for (var i=1; i<displayTextArray.length; i++)
		{
			hotspotClicked[i-1] = false;
		}
		preloadHotGraphicImages();
	}
}

function preloadHotGraphicImages()
{
	var hotspotImageObj;
	var clickedImage;

	for (var i=0; i<hotspotClicked.length; i++)
	{
		hotspotClickedImage[i] = new Image();
		hotspotVisitedImage[i] = new Image();
		hotspotImageObj = document.getElementById("tab" + currentTab + "hotspot" + (i + 1) + "Image");
		if (!originalImageState[currentTab])
			originalImageState[currentTab] = new Array();

		if (originalImageState[currentTab].length != hotspotClicked.length)
			originalImageState[currentTab][i] = hotspotImageObj.src;
		else
			hotspotImageObj.src = originalImageState[currentTab][i];

		//First we need to reset the image to normal state if been to this tab before
		clickedImage = new String(hotspotImageObj.src);
		clickedImage = clickedImage.replace(/_c.gif/,"_n.gif");
		hotspotImageObj.src = clickedImage.replace(/_v.gif/,"_n.gif");
		//Then set up the other states: clicked and visited
		clickedImage = new String(hotspotImageObj.src);
		hotspotClickedImage[i].src = clickedImage.replace(/_n.gif/,"_c.gif");

		if(showVisitedState)
		{
			hotspotVisitedImage[i].src = transparentImage; //clickedImage.replace(/_n.gif/,"_v.gif");
		}
	}
}

// Function to actually change the hotspot image state.
function changeHotspotImage(hotspotNum)
{
	var hotspotImageObj;
	var previousHotspotImageObj;

	if ((hotspotNum == previousClickedHotspot) && (displayTextOverwritesInitialText)) {

		//if they click again on the hotspot they just clicked on, show the initial text
		previousHotspotImageObj = document.getElementById("tab" + currentTab + "hotspot" + previousClickedHotspot + "Image");
		previousHotspotImageObj.src = previousImageState;
		document.getElementById("tab" + currentTab + "initialTextLayer").style.visibility = "visible";
		document.getElementById("tab" + currentTab + "displayTextArea").innerHTML = "";
		displayTextOverwritesInitialText = true;
		previousClickedHotspot = 0;

	}
	else
	{
		// If previous hotspot have been clicked, then change the state of that hotspot back to it's normal state
		if (previousClickedHotspot != 0)
		{
			previousHotspotImageObj = document.getElementById("tab" + currentTab + "hotspot" + previousClickedHotspot + "Image");
			previousHotspotImageObj.src = previousImageState;
		}

		//first click
		if ((displayTextOverwritesInitialText) && (document.getElementById("tab" + currentTab + "initialTextLayer")))
		{
			document.getElementById("tab" + currentTab + "initialTextLayer").style.visibility = "hidden";
			document.getElementById("tab" + currentTab + "initialInstructionText").style.visibility = "hidden";
		}

		hotspotImageObj = document.getElementById("tab" + currentTab + "hotspot" + hotspotNum + "Image");

		if(showVisitedState)
		{
			previousImageState = hotspotVisitedImage[(hotspotNum-1)].src;
		}
		else
		{
			previousImageState = hotspotImageObj.src;
		}

		hotspotImageObj.src = hotspotClickedImage[(hotspotNum-1)].src;
		checkHotspotClicked(hotspotNum)
	}
	return;
}

// This function is used to check whether all the hotspot has been clicked or not.
// Once all the hotspot has been clicked, the variable allHotGraphicsClicked is set to true.
function checkHotspotClicked(hotspotNum)
{
	var count = 0;

	hotspotClicked[(hotspotNum-1)] = true;

	for (var i=0; i<hotspotClicked.length; i++)
	{
		if (hotspotClicked[i])
			count++;
	}

	if (count == hotspotClicked.length)
	{
		allHotGraphicsClicked = true;
	}
	doShowText(hotspotNum);
}


// Hot Text Code
function preloadImages()
{
	bullett_n.src = imagePath + "bullett_n.gif";
	bullett_c.src = imagePath + "bullett_c.gif";
	bullett_v.src = imagePath + "bullett_v.gif";
}

// This function is used to calculate the number of hot text in the document.
// Initialise all the elements in the hotTextClicked array to false.
function initialiseHotTextClickedArray()
{
	var hotTextNum;

	if (hotTypeOnThisTab[currentTab] == HOTTEXT)
	{
		clearHotFeedbackDisplayArea();
		numberOfHotTexts = eval("tab" + currentTab + "numberOfHotTexts");
		for (var i=1; i<=numberOfHotTexts; i++)
		{
			hotTextClicked[currentTab] = new Array();
			hotTextClicked[currentTab][i-1] = false;
		}
	}
	return;
}

// This function is called when the hot text is clicked.
// The hot text number is passed to this function.
// This function will not do anyting until the parent.contentLoaded varaible has been set to true.
function showText(textNum)
{
	if (parent.booContentLoaded)
	{
		checkHotTextClicked(textNum)
	}

	return;
}

function loadInstruction()
{
	if (hotTypeOnThisTab[currentTab] == TEXTONLYorTEXTWITHGRAPHIC)
	{
		if (document.getElementById("tab" + currentTab + "ieOnlyInstructionText"))
		{
			document.getElementById("tab" + currentTab + "ieOnlyInstructionText").innerHTML = " " + instructionToShowOnComplete();
		}
	}
}

function instructionToShowOnComplete()
{
	var insts = "";

	if (allTabsClicked)
	{
		if (appTop.booMainWindow)
			insts = parent.objNavFrame.getInstruction(true);
		else
			insts = theInstructionText;
	}
	else
	{
		insts = theInitialInstructionText;
	}

	return insts;
}

// This function actually shows the text that's linked with the clicked hot text.
// It hides the previous displayed text before showing the currently clicked hot text.
function doShowText(textNum)
{
	previousClickedHotspot = textNum;
	var allClicked = (hotTypeOnThisTab[currentTab] == HOTGRAPHIC) ? allHotGraphicsClicked : allHotTextClicked;
	var instruction = (allClicked) ? instructionToShowOnComplete() : eval("tab" + currentTab + "theInitialInstructionText");

	displayTextArray = eval("tab" + currentTab + "displayTextArray");
	var textToDisplay = displayTextArray[textNum];

	if (typeof textToDisplay == "undefined")
	{
		textToDisplay = "";
	}
	
	if (hotTypeOnThisTab[currentTab] == HOTTEXT)
	{		
		graphicsInFeedback = eval("tab" + currentTab + "GraphicsInFeedback");
		if (graphicsInFeedback)
		{
			graphicFileNameArray = eval("tab" + currentTab + "graphicFileNameArray");
			if(graphicFileNameArray[textNum])
			{
				textToDisplay = "<p><img border=\"0\" src=\"images/" + graphicFileNameArray[textNum] + "\"></p>" + textToDisplay;
				
			}
		}
		
	}

	if ((hotTypeOnThisTab[currentTab] == HOTGRAPHIC) && (!allClicked))
	{
		textToDisplay += "<span class=\"instructionText\" > " + instruction + "</span>";
	}

	if (allClicked)
	{
		textToDisplay += "<span class=\"instructionText\" > " + instruction + "</span>";
		document.getElementById("tab" + currentTab + "initialInstructionText").style.visibility = "hidden";

		if (document.getElementById("initialInstructionText"))
			document.getElementById("initialInstructionText").style.visibility = "hidden";
	}


	if (eval('tab' + currentTab + 'displayTextOverwritesInitialText'))
	{

		document.getElementById("tab" + currentTab + "initialTextLayer").style.visibility = "hidden";
		//document.getElementById("tab" + currentTab + "initialTextWithoutInstructionLayer").style.visibility = "visible";
		//document.getElementById("tab" + currentTab + "initialTextLayer").style.visibility = "hidden";
	}
	
	
	document.getElementById("tab" + currentTab + "displayTextArea").innerHTML = textToDisplay;

	if(hotTypeOnThisTab[currentTab] == HOTTEXT)
	{
		highlightHotText(textNum);
	}

	return;
}

function clearHotFeedbackDisplayArea()
{
	document.getElementById("tab" + currentTab + "displayTextArea").innerHTML = "";
}

// This function is used to check whether all the hot text has been clicked or not.
// Once all the hot text has been clicked, the variable allHotTextClicked is set to true.
function checkHotTextClicked(textNum)
{
	var count = 0;

	hotTextClicked[currentTab][(textNum-1)] = true;

	for (var i=0; i<hotTextClicked[currentTab].length; i++)
	{
		if (hotTextClicked[currentTab][i])
			count++;
	}

	allHotTextClicked = (count == hotTextClicked[currentTab].length);

	doShowText(textNum);
	return;
}

function display(str,hotTextNum)
{
	if (!lastOneClicked&&audioOnPage)
	{
		playAudio(initialAudioFile);
	}

	document.getElementById("tab" + currentTab + "hotTextArea").innerHTML = str; // "assign" to element

	if (hotTextNum&&audioOnPage)
	{
			tempHotTextArray = eval('tab' + currentTab + 'hotTextArray');
			if(tempHotTextArray[hotTextNum][1])// This hotText has audio so play it
			{
				audioFileToPlay = eval('tab' + currentTab + 'audioFileNameArray[' + hotTextNum + ']');
				playAudio(audioFileToPlay);
			}
	}
	return;
}

var lastOneClicked = 0;

function highlightHotText(_intHotTextNum)
{
	var _intCurrentHotText = 1;
	var _objHotText;

	_objHotText = document.getElementById("tab" + currentTab + "hotTextLink" + _intCurrentHotText);

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
		_objHotText = document.getElementById("tab" + currentTab + "hotTextLink" + _intCurrentHotText);
	}

	return;
}
