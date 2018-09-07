///////////////////////////////////////////////////////////////////////
// EPIC Group PLC
//
// Project Name : 10014
//
// File Description : JavaScript file included with the Multiple Choice 2 & 4 Graphics
//
// Creation Date : Joe - 17/06/2003
//
// Modification History :
//
//
///////////////////////////////////////////////////////////////////////

var selectedOption = 0; // To hold the current selected option. 0 = nothing selected
//var previousSelectedOption = 0; // To hold the previous attempt selected option. 0 = nothing selected
var booAnswered = false; // Flag to indicate whether the question has been answered or not
var correctAnswer; // Store the correctAnswer
var correctResponse; // To indicate whether the user have answered the question correctly or not (false/wrong - true/correct)
var feedbackBackground; // flag to indicate whether the feedbackAreaImage layer existed or not.
var maxAttempts; // maximum number of attempts allowed, this value is retrieved from the word template and set inside the html page.
var attempts = 0; // number of attempts taken so far.
var blankImg = new Image(); // to cover Tick or Cross image (if required)
var tickImg = new Image(); // Tick image (if required)
var crossImg = new Image(); // Cross image (if required)
var confirm_n = new Image(); // Confirm button normal/rollout state
var confirm_r = new Image(); // Confirm button highlight/rollover state
var radio_s = new Image(); // Selected radio button graphic
var radio_d = new Image(); // De-Selected radio button graphic
var scoreWeight = 1;
var graphicHTML = "";
var thisPageHeight=(appTop.booMainWindow)?442:368;
// This function is called when the onload event for the document is triggered
function initialise()
{
	//fix put in for when run in refresh
	if(!appTop.booMainWindow)
	{
		if(typeof(isScenario)!="undefined")
		{
			thisPageHeight=(isScenario)?442:368;
		}
		else{thisPageHeight=368;}
	}

	if (parent.objNavFrame) {
		appTop.intPageType = appTop.MCQGRAPHICSWITHFEEDBACK;
		parent.objNavFrame.initPageType();
		if (appTop.booMainWindow)
		{
			if (appTop.objCurrentState.objUnit.isAssessment)
			{
				appTop.objCurrentState.objUnit.incMaxScore(appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.currentPage][0],scoreWeight);
			}
			appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][1] = appTop.VISITED;
		}
	}


	preloadImages();
	if ((typeof(isOpenInput)!="undefined")&&(isOpenInput)) {
		retrieveFormData();
	}
	feedbackBackground = findFeedbackBackground();
	getAnswer();
	//if(initialAudioFile){playAudio(initialAudioFile);}
	document.body.scroll = "no";
	parent.contentLoaded = true; // This is to tell the program that this page have been loaded.
	parent.booContentLoaded = true;
}

// Function to preload theimages
// change the .src paths to point to the right directory/file
function preloadImages()
{
	blankImg.src = imagePath+"trans.gif";
	tickImg.src = imagePath+"tick.gif";
	crossImg.src = imagePath+"cross.gif";
	if (typeof top.coachMe == "undefined") {
		confirm_n.src = imagePath+"cnfrm_btn_n.jpg";
		confirm_r.src = imagePath+"cnfrm_btn_h.jpg";
	} else {
		confirm_n.src = imagePath+"coach_cnfrm_btn_n.gif";
		confirm_r.src = imagePath+"coach_cnfrm_btn_h.gif";
	}
//	radio_s.src = imagePath+"radio_s.gif";
//	radio_d.src = imagePath+"radio_d.gif";
}


function retrieveFormData()
{
	var data = "";
	if (dataFromPage == "") {
		data = appTop.objCurrentState.objUnit.retrieveOIData(appTop.OPENINPUTBUILD, "");
	} else {
		data = appTop.objCurrentState.objUnit.retrieveOIData(appTop.OPENINPUTEND, dataFromPage);
	}
	if (data == "") {
		data = "You did not enter any text.";
	}
	data = data.replace(/<br>/g,"\n");
	data = '<textarea wrap="ON" cols="7" rows="7" class="inputBox">'+data+'</textarea>';
	document.all['feedbackText'].innerHTML = data;
}


// This function is called when the onunload event for the document is triggered
function pageUnload()
{
	if(typeof(audioIsPlaying)!="undefined")
	{
		clearAudio();
	}
	parent.booContentLoaded = false; // This is to tell the program that this page is being unloaded from the browser.
}


// This function attempts to find the feedbackAreaLayer.
function findFeedbackBackground()
{
	var found = false;

	for (var i=0; i<document.all.length; i++)
	{
		if (document.all[i].id)
		{
			if (document.all[i].id.indexOf("feedbackAreaBackground",0) != -1)
			{
				found = true;
				break;
			}
		}
	}
	return found;
}

// This function retrieve the correct answer for the current question
// The correct answer is the number that's attached to the id/name of the spare layer
function getAnswer()
{
	for (var i=0; i<document.all.length;i++)
	{
		if (document.all[i].id)
		{
			if (document.all[i].id.indexOf("spare",0) != -1)
			{
				correctAnswer = parseInt(document.all[i].id.replace(/spare/,""));
				break;
			}
		}
	}
}

// Function to change the confirm button image to it's varies states.
// This is called when the mouse is rolled over/out of the confirm button,
// and when the user clicked on the confirm button without selecting one of the options.
function changeImage(imgState)
{
	var imgObj;
	var img = imgState.split("_");
	imgObj = eval("document.images['"+img[0]+"Img']");
	if ((!booAnswered) && (parent.booContentLoaded))
		imgObj.src = eval(imgState).src
}

// Function to check the for selected answer and see if it's correct or not.
// This is called when the confirm button is clicked.
// If no option has been selected, an alert message will appear telling the
// user to select an option before clicking on the confirm button.
// If an option is selected, then display the appropriate feedback.
function checkAnswer()
{
	if ((!booAnswered) && (parent.booContentLoaded))
		doCheckAnswer();

	return;
}

function doCheckAnswer()
{
	var imgObj;

	if (selectedOption != 0)
	{
		attempts++;

		// check to see if the user answered the question correctly or not
		if (selectedOption == correctAnswer)
		{
			appTop.booAnswerStatus = appTop.ALLRIGHT;
			correctResponse = true; // correct
			booAnswered = true;
		}
		else
		{
			appTop.booAnswerStatus = appTop.NONERIGHT;
			correctResponse = false; // inCorrect
// WAI - temporary so that designer can check second wrong feedback without doing the coachme
			if (appTop.booMainWindow)
			{
				if ((attempts == 1) && (taskQuestion))
					disableQuestion();
			}
		}


		if ((attempts == maxAttempts) || (booAnswered))
		{
			//if (top.mainWindow)
			//{
				document.all['confirm'].style.visibility = "hidden";
			//}
			booAnswered = true;
			if(highlightTheCorrectAnswer){highlightCorrectAnswer();}
		}

		if ((booAnswered) && (appTop.booMainWindow))
		{
			if(taskQuestion){
				if (!appTop.objCurrentState.objUnit.checkTaskQDone())
					parent.tools.checkComms();

				if (parent.objNavFrame)
				{
					//alert("Fish?")
					appTop.objCurrentState.objUnit.setTaskQComplete();
					parent.objNavFrame.showNext();
				}
			}
			else
			{parent.tools.checkComms();}
		}
		showFeedback();
	}
	else
	{
		alert("You must select an option before you check your answer.");
	}
}
var imDisabled = false;
function disableQuestion()
{
	// need to implement disable mechanism
	if ((parent.tools) && (appTop.booDoDisableTask))
	{
		imDisabled = true;
		document.all['confirm'].style.visibility = "hidden"; // temporary disable mechanism
		appTop.objCurrentState.objUnit.doCoachMeCheck = true;
		appTop.objCurrentState.objUnit.booDoCoachMeCheck = true;
		parent.tools.flashButton("coachMe");
	}
}

function enableQuestion()
{
	//alert("enableQuestion()");
	// need to implement enable mechanism
	imDisabled = false;
	textToDisplay = document.all['initialInstructionText'].innerHTML;
	textToDisplay = textToDisplay.substring(0, textToDisplay.length-1);
	textToDisplay += top.secondAttemptInstr;
	if (document.all['feedbackImage'])
		document.all['feedbackImage'].style.visibility = "hidden";
	document.all['feedbackText'].innerHTML = "<span class='instructionText'>" + textToDisplay + "</span>" + graphicHTML;
	document.all['confirm'].style.visibility = "visible"; // temporary enable mechanism
}

// Function to highlight the correct answer
function highlightCorrectAnswer()
{
	var correctAnswerObj;
	var correctAnswerLink;

	correctAnswerObj = eval("document.all['option"+correctAnswer+"Text']");
	correctAnswerObj.style.backgroundColor = "#DDFFDD";
}

var firstTime = true;
// Function to show the correct feedback.
function showFeedback()
{
	var scrollyHeight = thisPageHeight-(document.all['feedbackText'].offsetParent.offsetTop + document.all['questionDiv'].offsetTop)-10;//10 padding at bottom of screen
	if(top.mainWindow && !taskQuestion && (attempts!=maxAttempts))scrollyHeight-=50;//The Submit button remains on a Scenario question that isnt a task Question
	var showImage = false;
	document.all['feedbackText'].style.height = scrollyHeight;
	if(firstTime){
		graphicHTML=document.all['feedbackText'].innerHTML;
		firstTime=false;
	}
	//document.all['questionWithoutInstructionLayer'].style.visibility = "visible";
	document.all['initialInstructionText'].style.visibility = "hidden";

	if (feedbackBackground)
	{
		document.all['feedbackAreaBackground'].style.visibility = "visible";
	}
	var textToDisplay = "";
	if (typeof questionResponses != "undefined") {
		//textToDisplay += "<p>" + getResponse() + "</p>";
		textToDisplay += getResponse();
	}
	if (!correctResponse) {
		if (attempts == maxAttempts) {
			textToDisplay+=finalIncorrectFeedback;
		} else {
			 textToDisplay += feedbackTextArray[selectedOption];
		}
	} else {
		 textToDisplay += feedbackTextArray[selectedOption];
	}

	if ((graphicFileNameArray) && (graphicFileNameArray[selectedOption]) && (graphicFileNameArray[selectedOption] != "")) {
		if (document.all['optionsTop']) {
			//textToDisplay += "<div id='feedbackImage'><img border=\"0\" src=\"images/"+graphicFileNameArray[selectedOption]+"\"></div>";
			document.all['feedbackImage'].innerHTML = "<img border=\"0\" src=\"images/"+graphicFileNameArray[selectedOption]+"\">";
			showImage = true;
		} else {
			textToDisplay += "<p><img border=\"0\" src=\"images/"+graphicFileNameArray[selectedOption]+"\"></p>";
		}
	}
	if(booAnswered) {
		textToDisplay += "<span class=\"instructionText\" id='finalInstruction'> ";
		if (appTop.booMainWindow) {
			textToDisplay += parent.objNavFrame.getInstruction(true);
		} else {
			textToDisplay += instructionText;
		}
		textToDisplay += "</span>";
	} else {
		textToDisplay += "<span class=\"instructionText\"> "+instructionOnIncorrectAttempt +"</span>";
	}
	document.all['feedbackText'].innerHTML = textToDisplay;
	if (document.all['optionsTop']) {
		if ((document.all['feedbackImage']) && (showImage)){
			imgTop = document.all['optionsTop'].offsetTop;
			imgTop += document.all['questionDiv'].offsetTop;
			document.all['feedbackImage'].style.top = imgTop;
			document.all['feedbackImage'].style.visibility = 'visible';
		}
	}
//	if(feedbackOnRight && typeof(document.all['graphicHolder'])!="undefined")
//	{
//		document.all['graphicHolder'].style.visibility = 'hidden';
//	}
	document.all['feedbackText'].style.visibility = 'visible';

/*	if(audioFeedback)
	{
		if(feedbackAudioFileNameArray[selectedOption])
		{
			playAudio(feedbackAudioFileNameArray[selectedOption]);
		}
	}*/
	if(markAnswersWithTickOrCross)
	{
		markOption(selectedOption,correctResponse);
		if((attempts == maxAttempts)&& tickTheCorrectAnswer)
		{
			markOption(correctAnswer,'last');
		}
	}
}

// Function to change the radio button state on the options when one of the option is clicked.
// This function is called when the user click on one of the radio button graphic.
// The function will not do anything if the question has already been answered.
function optionClicked(clickedOption)
{
	// if the question has not been answered, then actually do the click action.
	if ((!booAnswered) && (parent.booContentLoaded) && (!imDisabled))
		doOptionClicked(clickedOption)
}

// Function to actually change the radio button state, and to record the users response to the question.
function doOptionClicked(clickedOption)
{
//	var imgObj;

	// If previous option selected, then de-select that option by change the graphic state to a de-selected state
	// and reset the selectedOption variable to 0
/*	if (selectedOption != 0)
	{
		imgObj = eval("document.images['option"+selectedOption+"']");
		imgObj.src = radio_d.src;
		selectedOption = 0;
	}*/

//	imgObj = eval("document.images['option"+clickedOption+"']");
	// change the selected option radio button state to a selected state
//	imgObj.src = radio_s.src;

	for (var i=0; i<document.all.length; i++)
	{
		if (document.all[i].id)
		{
			if (document.all[i].id.indexOf("optionTD_") != -1)
			{
				optNum = document.all[i].id.split("_")[1];
				document.all[i].bgColor=(optNum==clickedOption)? "#CCCCCC":"#ffffff";
			}
		}
	}

	selectedOption = clickedOption; // set the selectedOption variable to the value of the currectly selected option
	// Show the image again if there is one and if it has been covered by the feedback
//	if(feedbackOnRight && typeof(document.all['graphicHolder'])!="undefined")
//	{
		//document.all['graphicHolder'].style.visibility = 'visible';
		//document.all['feedbackText'].style.visibility = 'hidden';
//		if(graphicHTML){document.all['feedbackText'].innerHTML = graphicHTML;}
//		if (feedbackBackground){document.all['feedbackAreaBackground'].style.visibility = "hidden";}
//	}
	return;
}

var lastImg = "";
var lastOneMarked = 0;

function markOption(optionToMark,isCorrect)
{
	//alert(previousSelectedOption+"=="+ selectedOption)
	var imgObj;
	imgObj = eval("document.images['option"+tickOrCrossOnRight+optionToMark+"']");
	if(lastOneMarked != optionToMark)
	{
		imgObj.src = (isCorrect)?tickImg.src:crossImg.src;
		if(isCorrect != 'last')
		{
			if(lastImg){lastImg.src=blankImg.src}
			if(tickOrCrossOnRight){lastImg=imgObj;}
		}
	}
	lastOneMarked = optionToMark;
	return;
}
