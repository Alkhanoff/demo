var imagePath; // The path of the image directory relative to the page
var intSelectedOption = 0; // To hold the current selected option. 0 = nothing selected
var intCorrectAnswer; // Store the correctAnswer
var confirm_n = new Image(); // Confirm button normal/rollout state
var confirm_r = new Image(); // Confirm button highlight/rollover state
var radio_s = new Image(); // Selected radio button graphic
var radio_d = new Image(); // De-Selected radio button graphic
var scoreWeight = 1;

// This function is called when the onload event for the document is triggered
function initialise()
{
	if (parent.objNavFrame) {
		appTop.intPageType = appTop.MCQNOFEEDBACK;
		parent.objNavFrame.initPageType();
		if (appTop.booMainWindow)
		{
			if (appTop.objCurrentState.objUnit.booAssessment)
				appTop.objCurrentState.objUnit.incMaxScore(appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][0],scoreWeight);
			appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][1] = appTop.VISITED;
		}
	}

	preloadImages();
	getAnswer();

	document.body.scroll = "no";
	parent.booContentLoaded = true; // This is to tell the program that this page have been loaded.
}

// Function to preload theimages
// change the .src paths to point to the right directory/file
function preloadImages()
{
	if (new String(document.location).indexOf("_cm",0) == -1) { //typeof top.coachMe == "undefined") {
		confirm_n.src = imagePath + "cnfrm_btn_n.jpg";
		confirm_r.src = imagePath + "cnfrm_btn_h.jpg";
	} else {
		confirm_n.src = imagePath + "coach_cnfrm_btn_n.gif";
		confirm_r.src = imagePath + "coach_cnfrm_btn_h.gif";
	}

	radio_s.src = imagePath + "radio_s.gif";
	radio_d.src = imagePath + "radio_d.gif";
}

// This function is called when the onunload event for the document is triggered
function pageUnload()
{
	parent.booContentLoaded = false; // This is to tell the program that this page is being unloaded from the browser.
}

// This function retrieve the correct answer for the current question
// The correct answer is the number that's attached to the id/name of the spare layer
function getAnswer()
{
	var _intCount = 1;
	var _objOption = document.getElementById("spare" + _intCount);

	while (!_objOption)
	{
		_intCount++;
		_objOption = document.getElementById("spare" + _intCount);
	}

	intCorrectAnswer = _intCount;

	if (appTop.booAlertQuestions)
	{
		alert("Correct option: " + intCorrectAnswer)
	}
}

function optionOver( _intNum )
{
	document.getElementById("optionTD_" + _intNum + "_img").style.backgroundColor = "#D6D6D6";
	document.getElementById("optionTD_" + _intNum + "_main").style.backgroundColor = "#D6D6D6";
}

function optionOut( _intNum )
{
	document.getElementById("optionTD_" + _intNum + "_img").style.backgroundColor = "#FFFFFF";
	document.getElementById("optionTD_" + _intNum + "_main").style.backgroundColor = "#FFFFFF";
}

// Function to change the confirm button image to it's varies states.
// This is called when the mouse is rolled over/out of the confirm button,
// and when the user clicked on the confirm button without selecting one of the options.
function changeImage(_strImgState)
{
	var _arrImg = _strImgState.split("_");
	if (parent.booContentLoaded)
	{
		document.getElementById(_arrImg[0] + "Img").src = eval(_strImgState).src
	}
}

// Function to check the for selected answer and see if it's correct or not.
// This is called when the confirm button is clicked.
// If no option has been selected, an alert message will appear telling the
// user to select an option before clicking on the confirm button.
// If an option is selected, then display the appropriate feedback.
function checkAnswer()
{
	if (parent.booContentLoaded)
		doCheckAnswer();

	return;
}

function doCheckAnswer()
{
	var _strUserAnswer;
	var _strCorrectAnswer;

	if (intSelectedOption != 0)
	{
		document.getElementById("confirm").style.visibility = "hidden";
		// check to see if the user answered the question correctly or not
		if ((parent.objNavFrame) && (appTop.objCurrentState.objUnit.booAssessment))
		{
			_strUserAnswer = "<br><ul><li>" + document.getElementById("optionTD_" + intSelectedOption + "_main").innerHTML + "</li></ul>";
			_strCorrectAnswer = "<br><ul><li>" + document.getElementById("optionTD_" + intCorrectAnswer + "_main").innerHTML + "</li></ul>";
			if (intSelectedOption == intCorrectAnswer)
				appTop.objCurrentState.objUnit.addScore(appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][0],relatedUnit,scoreWeight,document.all['question'].innerHTML,_strUserAnswer,_strCorrectAnswer);
			else
				appTop.objCurrentState.objUnit.addScore(appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][0],relatedUnit,0,document.all['question'].innerHTML,_strUserAnswer,_strCorrectAnswer);
			parent.objNavFrame.goNext();
		}
	}
	else
	{
		alert(appTop.objGenericText["mustselectoption"]);
	}
}

// Function to change the radio button state on the options when one of the option is clicked.
// This function is called when the user click on one of the radio button graphic.
// The function will not do anything if the question has already been answered.
function optionClicked(_intClickedOption)
{
	// if the question has not been answered, then actually do the click action.
	if (parent.booContentLoaded)
		doOptionClicked(_intClickedOption);
}

// Function to actually change the radio button state, and to record the users response to the question.
function doOptionClicked(_intClickedOption)
{
	// If previous option selected, then de-select that option by change the graphic state to a de-selected state
	// and reset the selectedOption variable to 0
	if (intSelectedOption != 0)
	{
		document.getElementById("option" + intSelectedOption).src = radio_d.src;
	}

	// change the selected option radio button state to a selected state
	document.getElementById("option" + _intClickedOption).src = radio_s.src;
	intSelectedOption = _intClickedOption; // set the selectedOption variable to the value of the currectly selected option
	return;
}

