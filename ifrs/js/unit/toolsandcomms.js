var strImagePath = "../../images/"; // The path of the image directory relative to the page 
var strToolsImagePath = strImagePath + "toolsandcomms/"; // The path of the image directory relative to the page 
var strTickerPath = strToolsImagePath + "messages/tickers/";
var objTrans = new Image();
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
var booCoachMeFlashing = false;
var objTicker = new Array();
objTicker["email"] = new Image();
objTicker["fax"] = new Image();
objTicker["post"] = new Image();
objTicker["memo"] = new Image();
objTicker["phonecall"] = new Image();
objTicker["voicemail"] = new Image();
objTicker["interruption"] = new Image();
objTicker["meeting"] = new Image();
objTicker["postit"] = new Image();
var objTickerImg;
var objTickerLayer;

var intCurrentCommNum = 0;
var booCommsDone = false;
var intDocsToView = 0;
var strDocIcon1;
var strDocFile = Array();
var strDocState1;
var strDocIcon2;
//var strDocFile2;
var strDocState2;

var objCurrentUnit;
var objContentFrame;
var objNavFrame;

parent.booToolsLoaded = false;

function initialise()
{
	assignObjects();
	checkButtons();
	preloadImages();

	parent.booToolsLoaded = true;

	objNavFrame.location = "nav.htm";
}

function assignObjects()
{
	objTickerImg = document.getElementById("tickerImg");
	objTickerLayer = document.getElementById("ticker");
	objCurrentUnit = appTop.objCurrentState.objUnit;
	objContentFrame = parent.objContentFrame;
	objNavFrame = parent.objNavFrame;
}

function checkButtons()
{
	if (objCurrentUnit.strBackgroundID == null)
		document.getElementById("backgroundD").style.visibility = "visible";
	else
		document.getElementById("background").style.visibility = "visible";

	if (objCurrentUnit.objCoachMes == null)
		document.getElementById("coachMeD").style.visibility = "visible";
	else
		document.getElementById("coachMe").style.visibility = "visible";

	if (objCurrentUnit.objCaseStudies == null)
		document.getElementById("caseStudyD").style.visibility = "visible";
	else
		document.getElementById("caseStudy").style.visibility = "visible";

	if (objCurrentUnit.booAssessment) 
		document.getElementById("refD").style.visibility = "visible";
	else
		document.getElementById("ref").style.visibility = "visible";

	document.getElementById("calcD").style.visibility = "hidden";
	document.getElementById("calc").style.visibility = "visible";
}

function preloadImages()
{
	objTicker["email"].src = strTickerPath + "check_inbox.gif";
	objTicker["fax"].src = strTickerPath + "pickup_fax.gif";
	objTicker["post"].src = strTickerPath + "check_post.gif";
	objTicker["memo"].src = strTickerPath + "your_needed.gif";
	objTicker["phonecall"].src = strTickerPath + "theres_a_call.gif";
	objTicker["voicemail"].src = strTickerPath + "youhave_voicemail.gif";
	objTicker["interruption"].src = strTickerPath + "quick_question.gif";
	objTicker["meeting"].src = strTickerPath + "goto_meeting2.gif";
	objTicker["postit"].src = strTickerPath + "pickup_postit.gif";
	objTrans.src = strImagePath + "trans.gif";
	background_h.src = strToolsImagePath + "bgrnd_btn_h.gif";
	background_n.src = strToolsImagePath + "bgrnd_btn_n.gif";
	coachMe_h.src = strToolsImagePath + "coach_btn_h.gif";
	coachMe_n.src = strToolsImagePath + "coach_btn_n.gif";
	ref_h.src = strToolsImagePath + "ref_btn_h.gif";
	ref_n.src = strToolsImagePath + "ref_btn_n.gif";
	clue_h.src = strToolsImagePath + "clue_btn_h.gif";
	clue_n.src = strToolsImagePath + "clue_btn_n.gif";
	calc_h.src = strToolsImagePath + "calc_btn_h.gif";
	calc_n.src = strToolsImagePath + "calc_btn_n.gif"; 
	caseStudy_h.src = strToolsImagePath + "cases_btn_h.gif";
	caseStudy_n.src = strToolsImagePath + "cases_btn_n.gif";
	excel_h.src = strToolsImagePath + "excel_btn_h.gif";
	excel_n.src = strToolsImagePath + "excel_btn_n.gif";
	word_h.src = strToolsImagePath + "word_btn_h.gif";
	word_n.src = strToolsImagePath + "word_btn_n.gif";
	powerpoint_h.src = strToolsImagePath + "powerpoint_btn_h.gif";
	powerpoint_n.src = strToolsImagePath + "powerpoint_btn_n.gif";
	access_h.src = strToolsImagePath + "access_btn_h.gif";
	access_n.src = strToolsImagePath + "access_btn_n.gif";
	hlpMsg_h.src = strToolsImagePath + "hlp_h.gif";
	hlpMsg_n.src = strToolsImagePath + "hlp_n.gif";	
	hlpTool_h.src = strToolsImagePath + "hlp_h.gif";
	hlpTool_n.src = strToolsImagePath + "hlp_n.gif";
	hlpAccessories_h.src = strToolsImagePath + "hlp_h.gif";
	hlpAccessories_n.src = strToolsImagePath + "hlp_n.gif";
}

function changeImage(_strImgState)
{
    var _booRollOver = parent.booToolsLoaded;
    var _arrImg = _strImgState.split("_");

	if (_arrImg[0] == "coachMe")
	{
		if (booCoachMeFlashing)
			_booRollOver = false;
	} 
	
	if (_booRollOver)
	{
	    document.getElementById(_arrImg[0] + "Img").src = eval(_strImgState).src;
	}
	return;
}

function resetFlashingButtons()
{
	if (booCoachMeFlashing)
	{
		booCoachMeFlashing = false;
		stopButtonFlash("coachMe");
	}
}

function flashButton(_strBut)
{
	changeImage(_strBut + "_h");
	eval(_strBut + "Flashing = true;");
}

function stopButtonFlash(_strBut)
{
	changeImage(_strBut + "_n");
	eval(_strBut + "Flashing =false;");
}

function launchBackground()
{
	if (objCurrentUnit.strBackgroundID != null)
		appTop.launchBackground();
}

function launchCoachMe()
{
	if (objCurrentUnit.objCoachMes != null)
	{
		stopButtonFlash("coachMe");
		appTop.launchCoachMe();
	}
}

function launchCaseStudy()
{
	if (objCurrentUnit.objCaseStudies != null)
		appTop.launchCaseStudy();
}

function launchRef()
{
	appTop.launchRef();
}

function checkClue() {
	//check whether to light up the clue button
	if ((typeof objContentFrame.hintText != "undefined") && (objContentFrame.hintText != "")) 
	{
		document.getElementById("clueD").style.visibility = "hidden";
		document.getElementById("clue").style.visibility = "visible";
	}
	else 
	{
		document.getElementById("clueD").style.visibility = "visible";
	}
}

function showClue() {
	appTop.showClue();
}

function showCalc() {
	appTop.launchCalc();
}

function checkComms()
{
	appTop.intCommsViewed = 0;	
	if (objContentFrame.commsArray != null) 
	{
		intCurrentCommNum = 0;
		showCommType();
		appTop.intCommsTotal = objContentFrame.commsArray.length;
		if (objCurrentUnit.objNavArray[objCurrentUnit.intCurrentPage][1] != appTop.VISITED) 
		{
			booCommsDone = false;
			objNavFrame.buttonState("next","hidden");
		}
	} 
	else 
	{
		appTop.intCommsTotal = 0;
	}
	objNavFrame.checkInstruction();
}

function showCommType()
{
	var _strCommType = objContentFrame.commsArray[intCurrentCommNum];
	document.getElementById(_strCommType).style.visibility = "visible";
	objTickerImg.src = objTicker[_strCommType].src;
	objTickerLayer.style.visibility = "visible";
}

function showNextComm()
{
	intCurrentCommNum++;
	if (intCurrentCommNum < objContentFrame.commsArray.length) {
		showCommType();
	} else {
		booCommsDone = true;
		objNavFrame.showNext();
	}
}

function showComm(_strCommType)
{
	var _strPage;
	hideCommType();
	_strPage = objCurrentUnit.objNavArray[objCurrentUnit.intCurrentPage][0].replace(/.htm/,"_" + (intCurrentCommNum + 1) + ".htm");
	appTop.jumpToComm(_strCommType, _strPage);
	appTop.intCommsViewed++;
	showNextComm();
	objNavFrame.checkInstruction();
}

function hideCommType()
{
	var _strCommType = objContentFrame.commsArray[intCurrentCommNum];
	document.getElementById(_strCommType).style.visibility = "hidden";
	objTickerImg.src = objTrans.src;
	objTickerLayer.style.visibility = "hidden";
}

function disableTicker()
{
	objTickerLayer.style.visibility = "hidden";
	objTickerImg.src = objTrans.src;
}

function disableComms()
{
	if (objContentFrame.commsArray != null)
	{
		if (intCurrentCommNum < objContentFrame.commsArray.length)
			hideCommType();
	}
}

function checkDocs() 
{
	//check for documents to view
	strDocIcon1 = "word";
	strDocFile[1] = "blank.doc";
	strDocState1 = "n";
	strDocIcon2 = "excel";
	strDocFile[2] = "blank.xls";
	strDocState2 = "n";
	intDocsToView = 0;

	if ((objContentFrame.docsArray != null)) {
		//if there is a document, replace the word icon with it unless it's an excel doc, in which case replace that
		if (objContentFrame.docsArray.length>0) {
			if (objContentFrame.docsArray[0][0] == "excel") {
				strDocFile[2] = objContentFrame.docsArray[0][1];
				strDocState2 = "h";
			} else {
				strDocIcon1 = objContentFrame.docsArray[0][0];
				strDocFile[1] = objContentFrame.docsArray[0][1];
				strDocState1 = "h";
			}
			intDocsToView++;
		}
		//if there is a second document, replace the excel icon with it unless it's a word doc, in which case replace that
		if (objContentFrame.docsArray.length >1) {
			if (objContentFrame.docsArray[1][0] == "word") {
				strDocFile[1] = objContentFrame.docsArray[1][1];
				strDocState1 = "h";
			} else {
				strDocIcon2 = objContentFrame.docsArray[1][0];
				strDocFile[2] = objContentFrame.docsArray[1][1];
				strDocState2 = "h";
			}
			intDocsToView++;
		}
	}

	//show the appropriate icons
	document.getElementById("doc1Img").src = eval(strDocIcon1 + "_" + strDocState1 + ".src");
	document.getElementById("doc2Img").src = eval(strDocIcon2 + "_" + strDocState2 + ".src");

	//if there are docs to view, and they haven't seen them before, hide the next button
	if (intDocsToView > 0) 
	{
		if (!appTop.booQuestionPage) // isQPage
		{
			objNavFrame.buttonState("next","hidden");
		}
		appTop.intDocsTotal = intDocsToView;
		appTop.intDocsViewed = 0;
		objNavFrame.checkInstruction();
	} 
	else 
	{
		appTop.intDocsTotal = 0;	
		appTop.intDocsViewed = 0;
	}
}

function viewDocument(_intDocNum) 
{
	//view the relevant document and show next button if appropriate
	appTop.openDocument(strDocFile[_intDocNum]);

	if (eval("strDocState" + _intDocNum) == 'h') 
	{
		eval("strDocState" + _intDocNum + "= 'n'")
		intDocsToView--;
		appTop.intDocsViewed++;
	}

	if (!objCurrentUnit.booAssessment)
	{
		if (intDocsToView < 1) 
		{
			objNavFrame.showNext();
		}
		objNavFrame.checkInstruction();
	}
}

function changeIcon(_intDocNum, _strImgState) 
{
	//rollover function for the document icons
	if (eval("strDocState" + _intDocNum) == "n") 
	{
		if (parent.booToolsLoaded) 
		{
			document.getElementById("doc" + _intDocNum + "Img").src = eval(eval("strDocIcon" + _intDocNum) + "_" + _strImgState).src;
		}
	}
	return;
}
