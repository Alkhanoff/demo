var imagePath = "../images/"; // The path of the image directory relative to the page 
var trans = new Image();
var background_h = new Image();
var background_n = new Image();
var coachMe_h = new Image();
var coachMe_n = new Image();
var ref_h = new Image();
var ref_n = new Image();
var clue_h = new Image();
var clue_n = new Image();
var calc_h = new Image();
var calc_n = new Image();
var caseStudy_h = new Image();
var caseStudy_n = new Image();
var word_h = new Image();
var word_n = new Image();
var excel_h = new Image();
var excel_n = new Image();
var powerpoint_h = new Image();
var powerpoint_n = new Image();
var access_h = new Image();
var access_n = new Image();
var hlpMsg_h = new Image();
var hlpMsg_n = new Image();
var hlpTool_h = new Image();
var hlpTool_n = new Image();
var hlpAccessories_h = new Image();
var hlpAccessories_n = new Image();
var coachMeFlashing = false;
var caseStudyFlashing = false;
var emailFlashing = false;
var faxFlashing = false;
var currentCommNum = 0;
var ticker = new Array();
var docsToView = 0;
ticker["email"] = new Image();
ticker["fax"] = new Image();
ticker["post"] = new Image();
ticker["memo"] = new Image();
ticker["phonecall"] = new Image();
ticker["voicemail"] = new Image();
ticker["interruption"] = new Image();
ticker["meeting"] = new Image();
ticker["postit"] = new Image();
top.titleLoaded = false;
var docIcon1 = "";
var docIcon2 = "";

document.onselectstart = killSelection;
document.onmousedown = checkRightMouse;

document.onkeypress = keyPressed;
document.onkeydown = keyDown;
document.onkeyup = keyUp;

function keyPressed(e)
{
	var ieKey;
	ieKey = event.keyCode;
	if (ieKey == 8)
		window.event.keyCode = 32;
}

function keyDown(e)
{
	var ieKey;
	ieKey = event.keyCode;
	if (ieKey == 8)
		window.event.keyCode = 32;
}

function keyUp(e)
{
	var ieKey;
	ieKey = event.keyCode;
	if (ieKey == 8)
		window.event.keyCode = 32;
}

function checkRightMouse(e)
{
	if (window.event.button == 2)alert(top.version);
}

function killSelection()
{
	window.event.returnValue = false;
	window.event.cancelBubble = true;
}

function initialise()
{
	checkButtons();
	preloadImages();
	parent.toolsLoaded = true;
	parent.nav.location = "presnav.htm";
}

function checkButtons()
{
	if (top.currentState.unit.background == null)
		document.all['backgroundD'].style.visibility = "visible";
	else
		document.all['background'].style.visibility = "visible";

	if (top.currentState.unit.coachMe == null)
		document.all['coachMeD'].style.visibility = "visible";
	else
		document.all['coachMe'].style.visibility = "visible";

	if (top.currentState.unit.caseStudy == null)
		document.all['caseStudyD'].style.visibility = "visible";
	else
		document.all['caseStudy'].style.visibility = "visible";


	if (top.currentState.unit.isAssessment) {
		document.all['refD'].style.visibility = "visible";
		//document.all['calcD'].style.visibility = "visible";
	} else {
		document.all['ref'].style.visibility = "visible";
		//document.all['calc'].style.visibility = "visible";
	}
	//joe 17 sept 2004 - client request
	document.all['calcD'].style.visibility = "hidden";
	document.all['calc'].style.visibility = "visible";
}

function preloadImages()
{
	ticker["email"].src = imagePath + "tickers/check_inbox.gif";
	ticker["fax"].src = imagePath + "tickers/pickup_fax.gif";
	ticker["post"].src = imagePath + "tickers/check_post.gif";
	ticker["memo"].src = imagePath + "tickers/your_needed.gif";
	ticker["phonecall"].src = imagePath + "tickers/theres_a_call.gif";
	ticker["voicemail"].src = imagePath + "tickers/youhave_voicemail.gif";
	ticker["interruption"].src = imagePath + "tickers/quick_question.gif";
	ticker["meeting"].src = imagePath + "tickers/goto_meeting2.gif";
	ticker["postit"].src = imagePath + "tickers/pickup_postit.gif";
	trans.src = imagePath + "trans.gif";
	background_h.src = imagePath + "bgrnd_btn_h.gif";
	background_n.src = imagePath + "bgrnd_btn_n.gif";
	coachMe_h.src = imagePath + "coach_btn_h.gif";
	coachMe_n.src = imagePath + "coach_btn_n.gif";
	ref_h.src = imagePath + "ref_btn_h.gif";
	ref_n.src = imagePath + "ref_btn_n.gif";
	clue_h.src = imagePath + "clue_btn_h.gif";
	clue_n.src = imagePath + "clue_btn_n.gif";
	calc_h.src = imagePath + "calc_btn_h.gif";
	calc_n.src = imagePath + "calc_btn_n.gif"; 
	caseStudy_h.src = imagePath + "cases_btn_h.gif";
	caseStudy_n.src = imagePath + "cases_btn_n.gif";
	excel_h.src = imagePath + "excel_btn_h.gif";
	excel_n.src = imagePath + "excel_btn_n.gif";
	word_h.src = imagePath + "word_btn_h.gif";
	word_n.src = imagePath + "word_btn_n.gif";
	powerpoint_h.src = imagePath + "powerpoint_btn_h.gif";
	powerpoint_n.src = imagePath + "powerpoint_btn_n.gif";
	access_h.src = imagePath + "access_btn_h.gif";
	access_n.src = imagePath + "access_btn_n.gif";
	hlpMsg_h.src = imagePath + "hlp_h.gif";
	hlpMsg_n.src = imagePath + "hlp_n.gif";	
	hlpTool_h.src = imagePath + "hlp_h.gif";
	hlpTool_n.src = imagePath + "hlp_n.gif";
	hlpAccessories_h.src = imagePath + "hlp_h.gif";
	hlpAccessories_n.src = imagePath + "hlp_n.gif";
}

function changeImage(imgState)
{
    var imgObj;
    var doRollOver = true;
    var img = imgState.split("_");

	if (img[0] == "coachMe")
	{
		if (coachMeFlashing)
			doRollOver = false;
	} 
	
	if (doRollOver)
	{
	    imgObj = eval("document.images['"+img[0]+"Img']");
	    
	    if (parent.toolsLoaded)
	    {
	        newImage = eval(imgState);
	        imgObj.src = newImage.src;
	    }
	}
	return;
}

function resetFlashingButtons()
{
	if (coachMeFlashing)
	{
		coachMeFlashing = false;
		stopButtonFlash("coachMe");
	}
}

function flashButton(but)
{
	changeImage(but+"_h");
	eval(but+"Flashing=true;");
}

function stopButtonFlash(but)
{
	changeImage(but+"_n");
	eval(but+"Flashing=false;");
}

function launchBackground()
{
	if (top.currentState.unit.background != null)
		top.launchBackground();
}

function launchCoachMe()
{
	if (top.currentState.unit.coachMe != null)
	{
		stopButtonFlash("coachMe");
		top.launchCoachMe();
	}
}

function launchCaseStudy()
{
	if (top.currentState.unit.caseStudy != null)
		top.launchCaseStudy();
}

function launchRef()
{
	top.launchRef();
}

function checkClue() {
	//check whether to light up the clue button
	if ((typeof parent.content.hintText != "undefined")&&(parent.content.hintText != "")&&(document.all['clueD'])) {
		document.all['clueD'].style.visibility = "hidden";
		document.all['clue'].style.visibility = "visible";
	} else {
		document.all['clueD'].style.visibility = "visible";
	}
}

function showClue() {
	//show/hide the clue in the content window
	if (top.mainArea.frameType.content.popupShowing == "clue") {
		top.hidePopupLayer();	
		top.mainArea.frameType.content.popupShowing = "";
	} else {
		top.showClue();
		top.mainArea.frameType.content.popupShowing = "clue";
	}
}

function showCalc() {
	top.launchCalc();
}

function checkComms()
{
	top.commsViewed = 0;	
	if (parent.content.commsArray != null) {
		currentCommNum = 0;
		showCommType();
		top.commsTotal = parent.content.commsArray.length;
		if (top.currentState.unit.navArray[top.currentState.unit.currentPage][1] != top.VISITED) {
			commsDone = false;
			parent.nav.buttonState("next","hidden");
		}
	} else {
		top.commsTotal = 0;
	}
	parent.nav.checkInstruction();
}

function showCommType()
{
	var commType = parent.content.commsArray[currentCommNum];
	document.all[commType].style.visibility = "visible";
	document.images['tickerImg'].src = ticker[commType].src;
	document.all['ticker'].style.visibility = "visible";
}

function showNextComm()
{
	currentCommNum++;
	if (currentCommNum < parent.content.commsArray.length) {
		showCommType();
	} else {
		commsDone = true;
		parent.nav.showNext();
	}
}

function showComm(commType)
{
	var page;
	hideCommType();
	page = top.currentState.unit.navArray[top.currentState.unit.currentPage][0].replace(/.htm/,"_"+(currentCommNum+1)+".htm");
	top.jumpToComm(commType,page);
	top.commsViewed++;
	showNextComm();
	parent.nav.checkInstruction();
}

function hideCommType()
{
	var commType = parent.content.commsArray[currentCommNum];
	document.all[commType].style.visibility = "hidden";
	document.images['tickerImg'].src = trans.src;
	document.all['ticker'].style.visibility = "hidden";
}

function disableComms()
{
	if (parent.content.commsArray != null)
	{
		if (currentCommNum < parent.content.commsArray.length)
			hideCommType();
	}
}

function disableTicker()
{
	document.all['ticker'].style.visibility = "hidden";
	document.images['tickerImg'].src = trans.src;
}

function checkDocs() {
	//check for documents to view
	docIcon1 = "word";
	docFile1 = "blank.doc";
	docState1 = "n";
	docIcon2 = "excel";
	docFile2 = "blank.xls";
	docState2 = "n";
	docsToView = 0;
	if ((parent.content.docsArray != null)) {
		//if there is a document, replace the word icon with it unless it's an excel doc, in which case replace that
		if (parent.content.docsArray.length>0) {
			if (parent.content.docsArray[0][0] == "excel") {
				docFile2 = parent.content.docsArray[0][1];
				docState2 = "h";
			} else {
				docIcon1 = parent.content.docsArray[0][0];
				docFile1 = parent.content.docsArray[0][1];
				docState1 = "h";
			}
			docsToView++;
		}
		//if there is a second document, replace the excel icon with it unless it's a word doc, in which case replace that
		if (parent.content.docsArray.length >1) {
			if (parent.content.docsArray[1][0] == "word") {
				docFile1 = parent.content.docsArray[1][1];
				docState1 = "h";
			} else {
				docIcon2 = parent.content.docsArray[1][0];
				docFile2 = parent.content.docsArray[1][1];
				docState2 = "h";
			}
			docsToView++;
		}
	}
	//show the appropriate icons
	document.all.doc1Img.src = eval(docIcon1 + "_" + docState1 + ".src");
	document.all.doc2Img.src = eval(docIcon2 + "_" + docState2 + ".src");
	//if there are docs to view, and they haven't seen them before, hide the next button
	if (docsToView>0) {
		if (!top.isQPage) {
			parent.nav.buttonState("next","hidden");
		}
		top.docsTotal = docsToView;
		top.docsViewed = 0;
		parent.nav.checkInstruction();
	} else {
		top.docsTotal = 0;	
		top.docsViewed = 0;
	}
}

function viewDocument(docNum) {
	//view the relevant document and show next button if appropriate
	eval("top.openDocument(docFile" + docNum + ")");
	if (eval("docState" + docNum) == 'h') {
		eval("docState" + docNum + "= 'n'")
		docsToView--;
		top.docsViewed ++;
	}

	if (!top.currentState.unit.isAssessment)
	{
		if (docsToView<1) {
			parent.nav.showNext();
		}
		parent.nav.checkInstruction();
	}
}

function changeIcon(docNum, imgState) {
	//rollover function for the document icons
	docState = eval("docState" + docNum);
	if (docState == "n") {
		var imgObj;
		var doRollOver = true;
		imgObj = eval("document.images['doc"+ docNum +"Img']");
		if (parent.toolsLoaded) {
			newImage = eval("docIcon" + docNum);
			newImage = eval(newImage + "_" + imgState);
			imgObj.src = newImage.src;
		}
	}
	return;
}


//***alpha only  - remove in final version
if (top.useArrowNav)
{
	document.onkeydown = function keyDown2(e) {
		var ieKey;
		ieKey = event.keyCode;
		if (ieKey == 8) {
			window.event.keyCode = 32;
		} else if (ieKey == 39) {
			parent.nav.goNext();
		} else if (ieKey == 37) {
			parent.nav.goBack();
		}
	}
}