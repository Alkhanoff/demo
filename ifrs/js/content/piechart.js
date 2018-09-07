///////////////////////////////////////////////////////////////////////
// EPIC Group PLC
//
// Project Name : 10014
//
// File Description : JavaScript file included with the Select from list with Feedback, and Select from list with Feedback and Graphic.
//			(selectFromListWithFeedback.html, selectFromListWithFeedbackAndGraphic.html) 
//		
// Creation Date : Wai Lam Yau - 05/03/2001
//		
// Modification History :
//
///////////////////////////////////////////////////////////////////////

var numberOfOptions; // Variable to hold number of options.
var optionState = new Array(); // To hold the state of the options.
var buttonState = 0; // currents stateof the confirm button 0 - confirm, 1 - model answer, 2 - my answer
var answered = false; // Flag to indicate whether the question has been answered or not
var correctAnswers = new Array(); // Store the correct answers
var correctResponse; // To indicate whether the user have answered the question correctly or not (false/wrong - true/correct)
var feedbackBackground; // flag to indicate whether the feedbackAreaImage layer existed or not.
var maxAttempts; // maximum number of attempts allowed, this value is retrieved from the word template and set inside the html page.
var attempts = 0; // number of attempts taken so far.
var blankImg = new Image(); // to cover Tick or Cross image (if required)
var tickImg = new Image(); // Tick image (if required)
var crossImg = new Image(); // Cross image (if required)
var confirm_n = new Image(); // Confirm button normal/rollout state
var confirm_r = new Image(); // Confirm button highlight/rollover state
var selectbox_s = new Image(); // Selected select box button graphic
var selectbox_d = new Image(); // De-Selected select box button graphic
var moanswer_r = new Image(); // Model Answer button highlight/rollover state
var moanswer_n = new Image(); // Model Answer button normal/rollout state
var myanswer_r = new Image(); // My Answer button highlight/rollover state
var myanswer_n = new Image(); // My Answer button normal/rollout state
var partiallyCorrectFlag = 0; // Set to true if the user has got at least one of the correct options selected
var selectedColor="#d0d0f0";
var deselectedColor="#f0f0ff";
var numOptionsSelected = 0;
var errSelectAnAnswer = "You must select some options before you can check your answer."
var errCannotSelectAllOptions = "You may not select all of the options."
var graphicHTML = "";
var thisPageHeight=(top.mainWindow)?442:368;
var questionAttempted = false;
// This function is called when the onload event for the document is triggered
function initialise()
{
	//fix put in for when run in refresh
	if(!top.mainWindow)
	{
		if(typeof(isScenario)!="undefined")
		{
			thisPageHeight=(isScenario)?442:368;
		}
		else{thisPageHeight=368;}
	}

	if (parent.nav) {
		top.pageType = top.PIECHART;
		parent.nav.initPageType();
		if (top.mainWindow)
		{
			if (top.currentState.unit.isAssessment)
				top.currentState.unit.incMaxScore(top.currentState.unit.navArray[top.currentState.unit.currentPage][0],scoreWeight);
			top.currentState.unit.navArray[top.currentState.unit.currentPage][1] = top.VISITED;
		}
	}
	preloadImages();
	feedbackBackground = findFeedbackBackground();
	getAnswers();
	//if(initialAudioFile){playAudio(initialAudioFile);}
	document.body.scroll = "no";	parent.contentLoaded = true; // This is to tell the program that this page have been loaded.
}

//Flash stuff
function retreivePercentages(anglesArrayStr)
{
	var anglesArray = anglesArrayStr.split(",");
	
	if(questionAttempted)//its called on load for some reason by the flash, so only do if question attempted
	{
		correctResponse = true;
		// check to see if the user answered the question correctly or not
		for(i=1; i<correctPercentages.length; i++)
		{
			if(parseInt(anglesArray[i])==parseInt(correctPercentages[i]))
			{
				partiallyCorrectFlag=1;
				correctPercentageObtained[i] = true;
			}
			else{
				correctResponse = false;
				correctPercentageObtained[i] = false;
			}
		}
		attempts++;

		if (correctResponse)
		{
				answered = true;
		}
		else
		{
// WAI - temporary so that designer can check second wrong feedback without doing the coachme
//			if ((attempts == 1) && (taskQuestion))
//				disableQuestion();
		}

		if ((attempts == maxAttempts) || (answered))
		{
			document.all['confirm'].style.visibility = "hidden";
			answered = true;
		}
		
		if ((answered) && (top.mainWindow))
		{
			if(taskQuestion){
				if (!top.currentState.unit.checkTaskQDone())
					parent.tools.checkComms();
	
				if (parent.nav) {
					top.currentState.unit.setTaskQComplete();
					parent.nav.showNext();
				}
			}
			else
			{parent.tools.checkComms();}
		}
		showFeedback();
		//playAudioFeedback();
	}
	return;
}


// Function to preload theimages
// change the .src paths to point to the right directory/file
function preloadImages()
{
	blankImg.src = imagePath+"mcq_checkbox_n.gif";
	tickImg.src = imagePath+"mcq_checkbox_r.gif";
	crossImg.src = imagePath+"mcq_checkbox_w.gif";
	if (typeof top.coachMe == "undefined") {
		confirm_n.src = imagePath+"cnfrm_btn_n.jpg";
		confirm_r.src = imagePath+"cnfrm_btn_h.jpg";
	} else {
		confirm_n.src = imagePath+"coach_cnfrm_btn_n.gif";
		confirm_r.src = imagePath+"coach_cnfrm_btn_h.gif";		
	}

}


// This function is called when the onunload event for the document is triggered
function pageUnload()
{
	parent.contentLoaded = false; // This is to tell the program that this page is being unloaded from the browser.
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


// This function retrieve the correct answers for the current question
// The correct answers is the refNum variable at the end of the html page.
function getAnswers()
{
	for (var i=0; i<correctPercentages.length; i++)
	{
		correctAnswers[i] = correctPercentages[i];
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
	if ((!answered) && (parent.contentLoaded))
		imgObj.src = eval(imgState).src
}


// Function to reset all the options
function resetOptions()
{
	var optionObj;

	for (var i=1; i<=numberOfOptions; i++)
	{
		optionObj = eval("document.images['option"+i+"']");
		optionObj.src = selectbox_d.src;
	}
}

function checkAnswer()
{
	if ((!answered) && (parent.contentLoaded)) 
		doCheckAnswer();

	return;
}

// Function to check the selected answers and see if it's correct or not.
// This is called when the confirm button is clicked.
// If no option has been selected, an alert message will appear telling the 
// user to select an option before clicking on the confirm button.
// If an option is selected, display the appropriate feedback
function doCheckAnswer()
{
	flashObject.GotoFrame(1);
	questionAttempted = true;
	return;
}

var imDisabled = false;
function disableQuestion()
{
	// need to implement disable mechanism
	if ((parent.tools) && (top.doDisableTask))
	{
		imDisabled=true;
		document.all['confirm'].style.visibility = "hidden"; // temporary disable mechanism
		top.currentState.unit.doCoachMeCheck = true;
		parent.tools.flashButton("coachMe");
	}
}

function enableQuestion()
{
	// need to implement enable mechanism
	textToDisplay = document.all['initialInstructionText'].innerHTML;
	textToDisplay = textToDisplay.substring(0, textToDisplay.length-1);
	textToDisplay += top.secondAttemptInstr;
	if (document.all['feedbackImage'])
		document.all['feedbackImage'].style.visibility = "hidden";
	document.all['feedbackText'].innerHTML = "<span class='instructionText'>" + textToDisplay + "</span>" + graphicHTML;	
	imDisabled=false;
	document.all['confirm'].style.visibility = "visible"; // temporary enable mechanism
}

var firstTime = true;
// Function to show the feedback.
function showFeedback()
{
	var scrollyHeight = thisPageHeight-(document.all['feedbackText'].offsetParent.offsetTop + document.all['questionDiv'].offsetTop)-10;//10 padding at bottom of screen
	if(top.mainWindow && !taskQuestion && (attempts!=maxAttempts&&!answered))scrollyHeight-=50;//The Submit button remains on a Scenario question that isnt a task Question
	var showImage = false;
	document.all['feedbackText'].style.height = scrollyHeight;
	if(firstTime){
		graphicHTML=document.all['feedbackText'].innerHTML;
		firstTime=false;
	}
	document.all['initialInstructionText'].style.visibility = "hidden";
	var textToDisplay = "";
	if (correctResponse) {
		textToDisplay += correctFeedbackText;
	} else {	

		textToDisplay = "<p>You have not entered any of the correct percentages.</p>";

		if(partiallyCorrectFlag==1){textToDisplay = "<p>You have got some of the percentages correct, but not all of them.</p>";}

		if(attempts == maxAttempts)
		{
			var answerString = '<p>The correct percentages are: ';
			for(i=1; i<correctPercentages.length; i++)
			{
				answerString += wedgeTitles[i]+' ';
				if(!correctPercentageObtained[i]){answerString +='<span style="color:red;">';}
				answerString += correctPercentages[i]+'%';
				if(!correctPercentageObtained[i]){answerString +='</span>';}
				if(i<(correctPercentages.length-1))
				{
					answerString += (i<(correctPercentages.length-2))?', ':' and ';
				}
				else{answerString += '.</p>';}
			}
			textToDisplay += finalIncorrectFeedback;
			textToDisplay += answerString;		
		}
		else
		{	
			textToDisplay += retryFeedbackOptional;
		}
	}
	
	if(answered)
	{
		textToDisplay += "<span class=\"instructionText\" id='finalInstruction'> ";
		if (top.mainWindow) {
			textToDisplay += parent.nav.getInstruction(true) 
		} else {
			textToDisplay += instructionText
		}
		textToDisplay += "</span>";
	}
	else
	{
		textToDisplay += "<span class=\"instructionText\" id='finalInstruction'> "+instructionOnIncorrectAttempt +"</span>";
	}	
		
	
	if (feedbackBackground)
		document.all['feedbackAreaBackground'].style.visibility = "visible";
	document.all['feedbackText'].innerHTML = textToDisplay;
	if (document.all['optionsTop']) {
		if ((document.all['feedbackImage']) && (showImage)){
			imgTop = document.all['optionsTop'].offsetTop;
			imgTop += document.all['questionDiv'].offsetTop;
			document.all['feedbackImage'].style.top = imgTop;
			document.all['feedbackImage'].style.visibility = 'visible';
		}
	}	
/*	if(feedbackOnRight && typeof(document.all['graphicHolder'])!="undefined")
	{
		document.all['graphicHolder'].style.visibility = 'hidden';
	}*/
	document.all['feedbackText'].style.visibility = 'visible';

}

// Function to change the radio button state on the options when one of the option is clicked.
// This function is called when the user click on one of the radio button graphic.
// The function will not do anything if the question has already been answered.
function optionClicked(clickedOption)
{
	// if the question has not been answered, then actually do the click action.
	if ((!answered) && (parent.contentLoaded) && (!imDisabled))
		doOptionClicked(clickedOption)
}

// Function to actually change the radio button state, and to record the users response to the question.
function doOptionClicked(clickedOption)
{
	var imgObj;
	imgObj = eval("document.images['option"+clickedOption+"']");
	if (optionState[clickedOption])
	{
		//imgObj.src = selectbox_d.src;
		optionState[clickedOption] = false;
	}
	else
	{
		//imgObj.src = selectbox_s.src;
		optionState[clickedOption] = true;
	}
	
	for (var i=0; i<document.all.length; i++)
	{
		if (document.all[i].id)
		{
			if (document.all[i].id.indexOf("optionTD_") != -1)
			{	
				optNum = document.all[i].id.split("_")[1];
				if(optNum==clickedOption)
				{
					document.all[i].bgColor=(document.all[i].bgColor==deselectedColor)? selectedColor:deselectedColor;
				}
			}
		}
	}
	// Show the image again if there is one and if it has been covered by the feedback
	if(feedbackOnRight && typeof(document.all['graphicHolder'])!="undefined")
	{
		document.all['graphicHolder'].style.visibility = 'visible';
		document.all['feedbackText'].style.visibility = 'hidden';
		if (feedbackBackground){document.all['feedbackAreaBackground'].style.visibility = "hidden";}
	}		

	return;
}

var lastImgs = new Array();

function markOption(optionToMark,isCorrect)
{
	var imgObj;
	imgObj = eval("document.images['option"+tickOrCrossOnRight+optionToMark+"']");
	imgObj.src = (isCorrect)?tickImg.src:crossImg.src;
	if(tickOrCrossOnRight){lastImgs[lastImgs.length]=imgObj;}
	return;
}

function blankTicksAndCrosses()
{
	for(i=0; i < lastImgs.length; i++)
	{
		if(typeof(lastImgs[i].src)!="undefined")
		{
			lastImgs[i].src = blankImg.src;
		}
	}	
}