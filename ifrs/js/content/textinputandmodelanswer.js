//IE Only
var moanswer_r = new Image(); // Model Answer button highlight/rollover state
var moanswer_n = new Image(); // Model Answer button normal/rollout state
var thisPageID = 0;
var haveSelectedTextInInputBox = false;
// This function is called when the onload event for the document is triggered.
function initialise()
{
	if (parent.nav) {
		top.pageType = top.TEXTINPUT;
		parent.nav.initPageType();
		if (top.mainWindow)
			top.currentState.unit.navArray[top.currentState.unit.currentPage][1] = top.VISITED;

		thisPageID = top.currentState.unit.currentPage
		focusForm();
		loadInputData();
	}
	preloadImages();
	document.body.scroll = "no";	parent.contentLoaded = true; // This is to tell the program that this page have been loaded.
}

// This function is called when the onunload event for the document is triggered
function pageUnload()
{
	if (parent.nav) 
		top.currentState.unit.navArray[thisPageID][3] = document.forms['userInputForm'].elements['userInputField'].value;
	parent.contentLoaded = false; // This is to tell the program that this page is being unloaded from the browser.
}

function loadInputData()
{
	var data = top.currentState.unit.navArray[thisPageID][3];
	document.forms['userInputForm'].elements['userInputField'].value = data;
}

function preloadImages()
{
	moanswer_r.src = imagePath + "model_ans_r.gif";
	moanswer_n.src = imagePath + "model_ans_n.gif";
}

// Function to change the confirm button image to it's varies states.
// This is called when the mouse is rolled over/out of the confirm button,
// and when the user clicked on the confirm button without selecting one of the options.
function changeImage(imgState)
{
	var imgObj;
	var img = imgState.split("_");
	imgObj = eval("document.images['"+img[0]+"Img']");
	if (parent.contentLoaded)
		imgObj.src = eval(imgState).src;
}

function modelAnswer()
{
	document.all['modelAnswerL'].innerHTML = new String(document.all['modelAnswerL'].innerHTML)+"<span class=\"instructionText\"> "+instructionText+"</span>";
	document.all['modelAnswerL'].style.visibility = "visible";
	document.all['moanswer'].style.visibility = "hidden";
	hideInstruction();
}

function focusForm()
{
	document.forms['userInputForm'].elements['userInputField'].focus();
}

function hideInstruction()
{
	document.all['initialTextLayerWithoutInstruction'].style.visibility = "visible";
	document.all['initialTextLayer'].style.visibility = "hidden";
}