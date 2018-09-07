var pageCompleted = false;
var attempts=0;
var maxAttempts =0;
var answerArray = new Array();
var listDIVReference="";
var yourAnsArray = new Array();
var confirm_r = new Image(); // Confirm button highlight/rollover state
var confirm_n = new Image(); // Confirm button normal/rollout state
var moanswer_r = new Image(); // Model Answer button highlight/rollover state
var moanswer_n = new Image(); // Model Answer button normal/rollout state
var myanswer_r = new Image(); // My Answer button highlight/rollover state
var myanswer_n = new Image(); // My Answer button normal/rollout state
var buttonState = 0; // 0 - confirm, 1 - model answer, 2 - my answer, 3 - reset
var positionArray = new Array();
var inModelAnswer = false;
var positionArray = new Array();

function initialise(){
	if (parent.objNavFrame) {
		appTop.intPageType = appTop.QUIZWORDMATCHGRAPHIC;
		parent.objNavFrame.initPageType();
		if (appTop.booMainWindow)
		{
			if (appTop.objCurrentState.objUnit.booAssessment)
			{
				appTop.objCurrentState.objUnit.incMaxScore(appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][0],scoreWeight);
			}
			appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][1] = appTop.VISITED;
		}
	}
	preloadImages();
	maxAttempts = numOfAttemps;
	document.body.scroll = "no";
	
	document.getElementById('feedbackText').style.display = 'none'; //Hide Feedback Text layer
	
	parent.booContentLoaded = true;
}


// Function to preload images
// change the .src paths to point to the right directory/file
function preloadImages()
{
	if (typeof appTop.coachMe == "undefined") {
		confirm_n.src = imagePath+"cnfrm_btn_n.jpg";
		confirm_r.src = imagePath+"cnfrm_btn_h.jpg";
	} else {
		confirm_n.src = imagePath+"coach_cnfrm_btn_n.gif";
		confirm_r.src = imagePath+"coach_cnfrm_btn_h.gif";
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
	if (parent.booContentLoaded)
	{
		newImage = eval(imgState);
		imgObj.src = newImage.src;
	}
}


function updateAnswerArray(selectedList,correctAnswer,listNum){
	selectedValue = selectedList.options[selectedList.selectedIndex].value;

	positionArray[positionArray.length] = correctAnswer;

	v = parseInt(selectedValue.split("_")[1]);
	if(("W"+v) == correctAnswer)
	{
		answerArray[listNum] = 1;
	}
	else
	{
		answerArray[listNum] = 0;
	}


}

// This function check thet state of the button and call the appropriate function to deal with the button state
function checkAnswer(selectedList,correctAnswer,listNum)
{
		doCheckAnswer();
	return;
}


var pageFound = false;

function doCheckAnswer(){
	var textToDisplay = "";
	
	var yourSelectionArray = new Array();
	var yourFeedbackArray = new Array();
	var yourScoresArray = new Array();
	var tempQuestionArray = new Array();
	var tempFbArray =  new Array();

	allSelected = true;
	for(i=1; i<=numOfDropDowns; i++){
		eval("var list = "+listDIVReference+"document.forms[0].selectList_"+i);
		if (list.options[list.selectedIndex].text == "") {
			allSelected = false;	
		}
	}
	
	if (!allSelected) {
		alert("Please select an option from every drop down list before you check your answer.");

	} else{
		//document.all['questionWithoutInstructionLayer'].style.visibility = "visible";
		//document.all['questionLayer'].style.visibility = "hidden";
		document.all['initialInstructionText'].style.visibility = "hidden";
		markQuestion()
	}
}

function disableQuestion()
{
	// need to implement disable mechanism
	if (parent.tools)
	{
		disableLists();
		document.all['confirm'].style.visibility = "hidden"; // temporary disable mechanism
		appTop.objCurrentState.objUnit.doCoachMeCheck = true;
		parent.tools.flashButton("coachMe");
	}
}

function enableQuestion()
{
	// need to implement enable mechanism
	enableLists();
	document.all['confirm'].style.visibility = "visible"; // temporary enable mechanism
}

function markQuestion()
{
	attempts++
	var someCorrect=false;
	var allCorrect=true;
	var answered = false;
	var userAnswerString;
	var correctAnswerString;
	
	for(i=1; i<=numOfDropDowns; i++)
	{
		if(answerArray[i] == 1)
		{
			someCorrect=true;
		}
		else
		{
			allCorrect=false;
		}
	}
	
	if ((parent.objNavFrame) && (appTop.objCurrentState.objUnit.booAssessment))
	{
		userAnswerString = getUserAnswer();
		correctAnswerString = getCorrectAnswer();
		if (allCorrect)
		{
			appTop.objCurrentState.objUnit.addScore(appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][0],relatedUnit,scoreWeight,document.all['questionText'].innerHTML,userAnswerString,correctAnswerString);
		}
		else
		{
			appTop.objCurrentState.objUnit.addScore(appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][0],relatedUnit,0,document.all['questionText'].innerHTML,userAnswerString,correctAnswerString);
		}
		parent.objNavFrame.goNext();
	}
}

var correctColor = "<span style=\"color:#008000\">";
var inCorrectColor = "<span style=\"color:#FF0000\">";
var endSpan = "</span>";

var waiTest = "";
function getUserAnswer()
{
	var returnText;
	var temp;
	var temp2 = document.all['mainGraphicArea'].innerHTML;
	var graphicFilename = document.all['mainGraphic'].src;
	var graphicWidth = document.all['mainGraphic'].offsetWidth;
	var graphicHeight = document.all['mainGraphic'].offsetHeight;
	var pageID = appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][0].split(".")[0];

	temp = document.forms['mainForm'].innerHTML;
	temp = temp.replace(/\<IMG([^\>]*)\>/g,"");
    reFind = /<OPTION([^>]*)>([^>]*)<\/OPTION>/gi;
    temp = temp.replace(reFind, "");        
    // replace all select tags with a number
    reFind = /<SELECT([^>]*)>([^>]*)<\/SELECT>/gi;
	temp = temp.replace(reFind,"%%%");
	for (var i=1; i<=numOfDropDowns; i++)
	{
		myValue = document.forms['mainForm'].elements['selectList_'+i].options[document.forms['mainForm'].elements['selectList_'+i].selectedIndex].innerHTML;
		if (document.forms['mainForm'].elements['selectList_'+i].selectedIndex == document.forms['mainForm'].elements['selectList_'+i].type)
			temp = temp.replace(/%%%/,correctColor+myValue+endSpan);
		else
			temp = temp.replace(/%%%/,inCorrectColor+myValue+endSpan);
	}

	returnText = "<table width=\"90%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td align=\"left\" valing=\"top\">";
	returnText += "<div id=\""+pageID+"T\" style=\"position:relative; font-family: Verdana; font-size: 8pt; left:0px; top:0px; width:" + graphicWidth + "px; height:" + graphicHeight + "px; background-image:url(" + graphicFilename + "); background-repeat:none; z-index:2\">"+temp+"</div>";
//	returnText += "<div id=\""+pageID+"G\" style=\"position:relative; left:0px; top:0px; width:400px; z-index:1\">"+temp2+"</div>";
//	returnText += "<div id=\""+pageID+"T\" style=\"position:relative; font-family: Verdana; font-size: 8pt; left:0px; top:-"+document.images['mainGraphic'].height+"px; width:400px; z-index:2\">"+temp+"</div>";
	returnText += "</td></tr></table>";

//	waiTest = returnText;
//	win = window.open("../../../../waitest.htm","testWin","width=700,height=500,x=150,y=150,fullscreen=no");

	return returnText;
}

function getCorrectAnswer()
{
	var returnText;
	var temp;
	var temp2 = document.all['mainGraphicArea'].innerHTML;
	var graphicFilename = document.all['mainGraphic'].src;
	var graphicWidth = document.all['mainGraphic'].offsetWidth;
	var graphicHeight = document.all['mainGraphic'].offsetHeight;
	var pageID = appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][0].split(".")[0];

	temp = document.forms['mainForm'].innerHTML;
	temp = temp.replace(/\<IMG([^\>]*)\>/g,"");
    reFind = /<OPTION([^>]*)>([^>]*)<\/OPTION>/gi;
    temp = temp.replace(reFind, "");        
    reFind = /<SELECT([^>]*)>([^>]*)<\/SELECT>/gi;
	temp = temp.replace(reFind,"%%%");
	for (var i=1; i<=numOfDropDowns; i++)
	{
		myValue = document.forms['mainForm'].elements['selectList_'+i].options[document.forms['mainForm'].elements['selectList_'+i].selectedIndex].innerHTML;
		temp = temp.replace(/%%%/,correctColor+myValue+endSpan);
		
	}

	returnText = "<table width=\"90%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td align=\"left\" valing=\"top\">";
	returnText += "<div id=\""+pageID+"T\" style=\"position:relative; font-family: Verdana; font-size: 8pt; left:0px; top:0px; width:" + graphicWidth + "px; height:" + graphicHeight + "px; background-image:url(" + graphicFilename + "); background-repeat:none; z-index:2\">"+temp+"</div>";
//	returnText += "<div id=\""+pageID+"G\" style=\"position:relative; left:0px; top:0px; width:400px; z-index:1\">"+temp2+"</div>";
//	returnText += "<div id=\""+pageID+"T\" style=\"position:relative; font-family: Verdana; font-size: 8pt; left:0px; top:-"+document.images['mainGraphic'].height+"px; width:400px; z-index:2\">"+temp+"</div>";
	returnText += "</td></tr></table>";

//	waiTest2 = returnText;
//	win = window.open("../../../../waitest2.htm","testWin2","width=700,height=500,x=150,y=150,fullscreen=no");

	return returnText;
}

function disableLists(){
	for(i=1; i<=numOfDropDowns; i++)
	{
		eval("var list = "+listDIVReference+"document.forms[0].selectList_"+i);
		list.disabled = true;
	}
}

function enableLists(){
	for(i=1; i<=numOfDropDowns; i++)
	{
		eval("var list = "+listDIVReference+"document.forms[0].selectList_"+i);
		list.disabled = false;
	}
}

// This function is called when the onunload event for the document is triggered.
function pageUnload(){
	parent.booContentLoaded = false; // This is to tell the program that this page is being unloaded from the browser.
}
