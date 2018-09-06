var monthArray = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
var web = false;
var dbTracking = false;
var mainWindow = true;
var runAsModule = true;
var pageType;
var currentUnit = null;
var unitDir = null;
var baseURL = null;
var imagePath = "../images/"; // The path of the image directory relative to the page 
var backgroundWin = null;
var resourceWin = null;
var bookmarksWin = null;
var glossaryWin = null;
var coachMeWin = null;
var refWin = null;
var calcWin = null;
var caseStudyWin = null;
var commWin = null;
var docWin = null;
var quickfindWin = null;
var keywordWin = null;
var downloadWin = null;
var standard;
var currentCommPage;
var popupClose_h = new Image();
var popupClose_n = new Image();
var popupBg = new Image();
var backToRef = false; // flag for whether to show back to refs button on comms window
var trackingData = null;
var revisitString = null;
var temp;
var temp2;
var coachMeID = null;
var caseStudyID = null;
var backgroundID = null;
var taskToGoTo = null;
var fromQuickFind = false;
var userName = null;
var currentFilter = null;
var filterScenario = null;
var keyword = null; // to store the selected keyword
var fromKeyword = false;
var keywordPage = null;
var currentResource = null;
var linearRoute = false;
var courseID = null; 
var startDate = null;
var endDate = null;
var trackingStartDate = null;
var trackingEndDate = null;
var percentage = null;
var passed = null;
var loginName = null;
var fromRevisit = false;
var version = "";
var flashInstalled = false;
var nameEntered = false;
var LMSPresent = false;
var courseStartTime = null;
var courseEndTime = null;
var exitClicked = false;

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

function initialise()
{
	courseStartTime = new Date().getTime();

	if (top.window.opener.flashInstalled == 1)
		flashInstalled = true;

	LMSPresent = top.window.opener.LMSPresent;
	preloadImages();
	findBaseURL();
	if (web)
	{
		if (!LMSPresent)
		{
			dbTracking = top.window.opener.dbTracking;
			loginName = top.window.opener.loginName;
		}
		else
		{
			trackingData = top.window.opener.trackingData;
		}
	}

	continueInit()
}

function continueInit()
{
	retrieveTrackingData();
	if ((courseID == "ias3239") || (courseID == "ias32392") || (courseID == "ias32393"))
		document.frames['mainArea'].location = "intro.htm";
	else
		loadMenu();
}

function saveInterimTracking()
{
	if (!LMSPresent)
	{
		saveTrackingData();
		hidden.location = baseURL+"/generichtm/interimtrackingform.htm";
	}
}

function findBaseURL()
{
	baseURL = new String(document.location);
	if ((baseURL.indexOf("http://",0) != -1) || (baseURL.indexOf("https://",0) != -1))
		web = true;
	baseURL = baseURL.substring(0,baseURL.lastIndexOf("/",baseURL.length));
	standard = baseURL.substring(baseURL.lastIndexOf("/",baseURL.length)+1,baseURL.length);
	baseURL = baseURL.substring(0,baseURL.lastIndexOf("/",baseURL.length));
}

function loadMenu()
{
	if (dbTracking)
		saveInterimTracking();

	mainArea.location = baseURL+"/"+standard+"/menu/menu.htm";
}

function unloadExit()
{
	if (!exitClicked)
	{
		if (LMSPresent)
			saveLMSData();
	}
}

function exit()
{
	if (confirm("Are you sure you want to exit the program?"))
	{
		exitClicked = true;
		if (!LMSPresent)
			saveTrackingData();
		if (dbTracking)
		{
			hidden.location = baseURL+"/generichtm/trackingform.htm";
		}
		else
		{
			if (!LMSPresent)
				top.window.close();
			else
			{
				saveLMSData();
				setTimeout("top.window.close()",500);
			}
		}
	}
}

function downloadModule()
{
	var x = (screen.width - 600) / 2;
	var y = (screen.height - 450) / 2;
	if (downloadWin != null)
	{
		if (!downloadWin.closed)
			downloadWin.close();

		downloadWin = null;
	}

	downloadWin = window.open(baseURL+"/generichtm/moduledownload.htm","downloadWin","width=600,height=450,left="+x+",top="+y+",toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no,fullscreen=no");
}

function goBookmarkPage(pageID)
{
	findUnit(top.course[standard],pageID);
	unitObjRef.fromBookmark = true;
	unitObjRef.pageJump = pageID;
	goUnit(standard+"_"+unitObjRef.id);
}

function returnLast()
{
	findUnit(top.course[standard],standard+"_"+revisitString[0]);
	unitObjRef.currentPage = revisitString[1]*1;
	revisitString = null;
	fromRevisit = true;
	goUnit(standard+"_"+unitObjRef.id);
}

function goUnit(unitID)
{
	var obj;
	
	top.currentUnit = unitID;
	top.unitDir = "";
	revisitString = null;
	unitID = unitID.split("_");
	standard = unitID[0];
	for (var i=0; i<top.course[unitID[0]].childObjs.length; i++)
	{
		if (top.course[unitID[0]].childObjs[i].id == unitID[1])
		{
			obj = top.course[unitID[0]].childObjs[i];
			top.unitDir = "/units/"+unitID[0];
			if (obj.type == parent.BLOCK)
			{
				top.unitDir += "/"+obj.id;
				for (var j=0; j<obj.childObjs.length; j++)
				{
					if (obj.childObjs[j].id == unitID[2])
					{
						obj = obj.childObjs[j];
						break;
					}
				}
			}
			top.unitDir += "/"+obj.id;
			break;
		}
	}

	top.currentState.unit = obj;
	mainArea.location = top.baseURL + top.unitDir + "/index.htm";
}

function unlockQuestion()
{
	mainArea.frameType.content.enableQuestion();
}

function insertEmailHistory(from,subject,attachment)
{
	if (currentCommPage.indexOf(standard,0) != -1)
	{
		if (top.course[standard].emailHistory == null)
			top.course[standard].emailHistory = new Array();

		top.course[standard].emailHistory[top.course[standard].emailHistory.length] = new Array(currentCommPage,from,subject,attachment);
	}
}

function insertFaxHistory(subject)
{
	if (currentCommPage.indexOf(standard,0) != -1)
	{
		if (top.course[standard].faxHistory == null)
			top.course[standard].faxHistory = new Array();

		top.course[standard].faxHistory[top.course[standard].faxHistory.length] = new Array(currentCommPage,subject);
	}
}

function insertPostHistory(subject)
{
	if (currentCommPage.indexOf(standard,0) != -1)
	{
		if (top.course[standard].postHistory == null)
			top.course[standard].postHistory = new Array();

		top.course[standard].postHistory[top.course[standard].postHistory.length] = new Array(currentCommPage,subject);
	}
}

function insertVoicemailHistory(subject)
{
	if (currentCommPage.indexOf(standard,0) != -1)
	{
		if (top.course[standard].voicemailHistory == null)
			top.course[standard].voicemailHistory = new Array();

		top.course[standard].voicemailHistory[top.course[standard].voicemailHistory.length] = new Array(currentCommPage,subject);
	}
}

function insertMemoHistory(subject)
{
	if (currentCommPage.indexOf(standard,0) != -1)
	{
		if (top.course[standard].memoHistory == null)
			top.course[standard].memoHistory = new Array();

		top.course[standard].memoHistory[top.course[standard].memoHistory.length] = new Array(currentCommPage,subject);
	}
}

function insertPhoneHistory(subject)
{
	if (currentCommPage.indexOf(standard,0) != -1)
	{
		if (top.course[standard].phoneHistory == null)
			top.course[standard].phoneHistory = new Array();

		top.course[standard].phoneHistory[top.course[standard].phoneHistory.length] = new Array(currentCommPage,subject);
	}
}

function insertInterruptionHistory(subject)
{
	if (currentCommPage.indexOf(standard,0) != -1)
	{
		if (top.course[standard].interruptionHistory == null)
			top.course[standard].interruptionHistory = new Array();

		top.course[standard].interruptionHistory[top.course[standard].interruptionHistory.length] = new Array(currentCommPage,subject);
	}
}

function insertPostitHistory(subject)
{
	if (currentCommPage.indexOf(standard,0) != -1)
	{
		if (top.course[standard].postitHistory == null)
			top.course[standard].postitHistory = new Array();

		top.course[standard].postitHistory[top.course[standard].postitHistory.length] = new Array(currentCommPage,subject);
	}
}

function insertMeetingHistory(subject)
{
	if (currentCommPage.indexOf(standard,0) != -1)
	{
		if (top.course[standard].meetingHistory == null)
			top.course[standard].meetingHistory = new Array();

		top.course[standard].meetingHistory[top.course[standard].meetingHistory.length] = new Array(currentCommPage,subject);
	}
}

function insertDocType(docType,fileName)
{
	var found = false;
	for (var i=0; i<docType.length; i++)
	{
		if (docType[i] == fileName)
		{
			found = true;
			break;
		}
	}

	if (!found)
		docType[docType.length] = fileName;

}

function insertDocuments(fileName)
{
	if (fileName.toLowerCase().indexOf(".doc",0) != -1)
	{
		if (top.course[standard].wordHistory == null)
			top.course[standard].wordHistory = new Array();
		fileName = fileName.replace(/\.doc/,"");
		insertDocType(top.course[standard].wordHistory,fileName);
	}
	else if (fileName.toLowerCase().indexOf(".xls",0) != -1)
	{
		if (top.course[standard].excelHistory == null)
			top.course[standard].excelHistory = new Array();
		fileName = fileName.replace(/\.xls/,"");
		insertDocType(top.course[standard].excelHistory,fileName);
	}
	else if (fileName.toLowerCase().indexOf(".ppt",0) != -1)
	{
		if (top.course[standard].powerpointHistory == null)
			top.course[standard].powerpointHistory = new Array();
		fileName = fileName.replace(/\.ppt/,"");
		insertDocType(top.course[standard].powerpointHistory,fileName);
	}
	else if (fileName.toLowerCase().indexOf(".mdb",0) != -1)
	{
		if (top.course[standard].accessHistory == null)
			top.course[standard].accessHistory = new Array();
		fileName = fileName.replace(/\.mdb/,"");
		insertDocType(top.course[standard].accessHistory,fileName);
	}
}

function launchRef()
{
	var x = (screen.width - 633) / 2;
	var y = (screen.height - 485) / 2;
	backToRef = false;
	if (refWin != null)
	{
		if (!refWin.closed)
			refWin.close();

		refWin = null;
	}

	refWin = window.open(top.baseURL+"/generichtm/refindex.htm","refWindow","width=633,height=485,left="+x+",top="+y+",toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no,fullscreen=no");
}


function launchCalc()
{
	var x = (screen.width - 176) / 2;
	var y = (screen.height - 201) / 2;
	if (calcWin != null)
	{
		if (!calcWin.closed)
			calcWin.close();

		calcWin = null;
	}

	calcWin = window.open(top.baseURL+"/generichtm/calculator.htm","calcWindow","width=176,height=201,left="+x+",top="+y+",toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no,fullscreen=no");
}

function showClue() {
	//display the hidden popup div in the content frame and draw the clue in it
	c = top.mainArea.frameType.content;
	if (c.hintText) {
		if (c.document.all.popupContent) {
			c.document.all.popupContent.innerHTML = "";
			showPopupLayer();
			c.document.all.popupContent.innerHTML = popupTitle('hint', "right") + "<br /><br />" + popupDiv(c.hintText, 333, 206, true);
		}
	}
}

function toolsHelp(whichHelp) {
	//show the toolkit help
	if (whichHelp == "messages") {
		toolsHelpText = messagesHelp;
	} else {
		toolsHelpText = toolkitHelp;
	}
	c = top.mainArea.frameType.content;
	if (c.popupShowing == whichHelp) {
			top.hidePopupLayer();	
			c.popupShowing = "";
	} else {
		c.document.all.popupContent.innerHTML = "";
		showPopupLayer();
		c.popupShowing = whichHelp;
		c.document.all.popupContent.innerHTML = popupTitle('help', "right") + "<br /><br />" + popupDiv(toolsHelpText, 333, 206, true);
	}
}

function showGlossaryPopup(strWord) {
	//display the hidden popup div in the content frame and draw the glossary definition in it
	if (strWord != "") {
		c = top.mainArea.frameType.content;
		if (c.popupShowing == "glossary") {
			top.hidePopupLayer();	
			c.popupShowing = "";
		} else {
			if (c.document.all.popupContent) {
				tCaseWord = "<b>" + strWord.substring(0,1).toUpperCase() + strWord.substring(1, strWord.length) + "</b>";
				c.document.all.popupContent.innerHTML = "";
				showPopupLayer();
				strGlossary = popupTitle('glossary', 'right') + "<br />" + popupDiv(tCaseWord + "<br /><br />" + getGlossary(strWord), 333, 206, true);
				c.document.all.popupContent.innerHTML =  strGlossary;
				c.popupShowing = "glossary";
			}
		}
	}
}

function showPopupText() {
	//display the hidden popup div in the content frame and draw the popup text definition in it
	c = top.mainArea.frameType.content;
	if (c.popupText) {
		if (c.popupShowing == "popup") {
			top.hidePopupLayer();	
			c.popupShowing = "";
		} else {
			if (c.document.all.popupContent) {
				c.document.all.popupContent.innerHTML = "";
				showPopupLayer();
				strWord =  popupTitle('popup', 'right') + "<br /><br />" + popupDiv(c.popupText, 333, 206, true);
				c.document.all.popupContent.innerHTML =  strWord;
				c.popupShowing = "popup";
			}
		}
	}
}

function getGlossary(strWord) {
	for (n=0; n<glossWords.length; n++) {
		if (glossWords[n][0].toLowerCase() == strWord.toLowerCase()) {
			return glossWords[n][1];
		}
	}
	return "Sorry, that word could not be found in the glossary.";
}

function popupTitle(imgName, align) {
	return "<div align='" + align + "'><img src='" + top.baseURL + "/images/content/popup_titles/" + imgName + ".gif' alt='" + imgName + "' /></div>"
}

function popupDiv(divContent, divW, divH, scrollBars) {
	if (scrollBars) {
		overflowType = "auto";
	} else {
		overflowType = "hidden";
	}
	return "<div style='border: 1px #000000 solid; overflow: " + overflowType + "; padding:5px; background-color:#ffffff; width:" + divW + "; height:" + divH + "'>" + divContent + "</div>";
}

function showPopupLayer() {
	c = top.mainArea.frameType.content
	if (!c.popupVisible) {
		//show the popup layer
		if (c.document.all.popupLayer) {
			c.document.all.popupLayer.style.visibility = "visible";
		}
		//show the mask over the page content
		if (c.document.all.popupMask) {
			c.document.all.popupMask.style.visibility = "visible";
		}
		c.popupVisible = true;
		//make an array of the elements we're about to hide, so that they can be shown again later
		c.hiddenElements = new Array();
		nextElement = 0;
		//hide any select boxes, and blur any textareas and input boxes that are currently being shown
		for (n=0; n<c.document.forms.length; n++) {
			for (i=0; i<c.document.forms[n].elements.length; i++) {
				switch (c.document.forms[n].elements[i].type) {
					case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": case "10":
					case "select-one":
						if (c.document.all[c.document.forms[n].elements[i].id].style.visibility != "hidden") {
							c.document.all[c.document.forms[n].elements[i].id].style.visibility = "hidden";
							c.hiddenElements[nextElement] = c.document.forms[n].elements[i].id;
							nextElement += 1;
						}
						break;				
					case "textarea":
					case "input":
						c.document.all[c.document.forms[n].elements[i].id].blur();
					default:
						break;
				}
			}
		}
	}
}

function hidePopupLayer() {
	c = top.mainArea.frameType.content;
	if (c.popupVisible) {
		//hide the popup layer
		if (c.document.all.popupLayer) {
			c.document.all.popupLayer.style.visibility = "hidden";
		}
		//hide the mask over the page content
		if (c.document.all.popupMask) {
			c.document.all.popupMask.style.visibility = "hidden";
		}
		//show all the elements in the hiddenElements array
		for (n=0; n<c.hiddenElements.length; n++) {
			if (c.document.all[c.hiddenElements[n]]) {
				c.document.all[c.hiddenElements[n]].style.visibility = "visible";
				c.hiddenElements[n] = null;
			}
		}
		c.popupVisible = false;
		c.popupShowing = "";
	}
}

function launchBackground()
{
	var x = (screen.width - 630) / 2;
	var y = (screen.height - 485) / 2;
	if (backgroundWin != null)
	{
		if (!backgroundWin.closed)
			backgroundWin.close();

		backgroundWin = null;
	}

	if (fromQuickFind)
		backgroundWin = window.open(top.baseURL+"/background/"+standard+"/"+backgroundID+"/index.htm","backgroundWindow","width=630,height=485,left="+x+",top="+y+",toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no,fullscreen=no");
	else
		backgroundWin = window.open(top.baseURL+"/background/"+top.currentState.unit.background.replace(/_/,"/")+"/index.htm","backgroundWindow","width=630,height=485,left="+x+",top="+y+",toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no,fullscreen=no");
}

function launchResource(resourceID)
{
	var x = (screen.width - 633) / 2;
	var y = (screen.height - 485) / 2;
	currentResource = resourceID;
	if (resourceWin != null)
	{
		if (!resourceWin.closed)
			resourceWin.close();

		resourceWin = null;
	}
	resourceWin = window.open(top.baseURL+"/resource/"+resourceID.replace(/_/,"/")+"/index.htm","resourceWindow","width=633,height=485,left="+x+",top="+y+",toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no,fullscreen=no");
}

function launchGlossary()
{
	var x = (screen.width - 633) / 2;
	var y = (screen.height - 485) / 2;
	if (glossaryWin != null)
	{
		if (!glossaryWin.closed)
			glossaryWin.close();

		glossaryWin = null;
	}
	glossaryWin = window.open(top.baseURL+"/"+standard+"/glossary.htm","glossaryWindow","width=633,height=485,left="+x+",top="+y+",toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no,fullscreen=no");
}

function launchIntoCoachMe(id)
{
	top.coachMeID = id;
	top.launchCoachMe();
}

function launchCoachMe()
{
	var x = (screen.width - 773) / 2;
	var y = ((screen.height - 485) / 2) + 25;
	if (coachMeWin != null)
	{
		if (!coachMeWin.closed)
			coachMeWin.close();

		coachMeWin = null;
	}

	coachMeWin = window.open(top.baseURL+"/coachme/"+standard+"/index.htm","CoachMeWindow","width=773,height=485,left="+x+",top="+y+",toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no,fullscreen=no");
}

function launchCaseStudy()
{
	var x = (screen.width - 773) / 2;
	var y = ((screen.height - 485) / 2) + 25;
	if (caseStudyWin != null)
	{
		if (!caseStudyWin.closed)
			caseStudyWin.close();

		caseStudyWin = null;
	}

	caseStudyWin = window.open(top.baseURL+"/casestudies/"+standard+"/index.htm","CaseStudyWindow","width=773,height=485,left="+x+",top="+y+",toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no,fullscreen=no");
}

function jumpToComm(commType,commPage)
{
	var x = (screen.width - 633) / 2;
	var y = (screen.height - 485) / 2;
	currentCommPage = commPage;
	if (commWin != null)
	{
		if (!commWin.closed)
			commWin.close();

		commWin = null;
	}
	commWin = window.open(top.baseURL+"/comms/"+commType+"/index.htm","commWin","width=633,height=485,left="+x+",top="+y+",toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no,fullscreen=no");
}

function viewBookmarks()
{
	var x = (screen.width - 630) / 2;
	var y = (screen.height - 485) / 2;
	if (bookmarksWin != null)
	{
		if (!bookmarksWin.closed)
			bookmarksWin.close();

		bookmarksWin = null;
	}
	bookmarksWin = window.open(top.baseURL+"/generichtm/bookmarks.htm","bookmarksWin","width=630,height=485,left="+x+",top="+y+",toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no,fullscreen=no");
}

function keywordResult()
{
	var x = (screen.width - 630) / 2;
	var y = (screen.height - 485) / 2;
	if (keywordWin != null)
	{
		if (!keywordWin.closed)
			keywordWin.close();

		keywordWin = null;
	}
	keywordWin = window.open(top.baseURL+"/generichtm/keyword.htm","keywordWin","width=630,height=485,left="+x+",top="+y+",toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no,fullscreen=no");
}

function launchQuickfind()
{
	var x = (screen.width - 773) / 2;
	var y = ((screen.height - 485) / 2) + 25;
	if (quickfindWin != null)
	{
		if (!quickfindWin.closed)
			quickfindWin.close();

		quickfindWin = null;
	}

	top.course[top.standard].checkStatus();
	quickfindWin = window.open(top.baseURL+"/"+standard+"/quickfind.htm","quickfindWindow","width=773,height=485,left="+x+",top="+y+",toolbar=no,menubar=no,status=no,scrollbars=no,resizable=no,fullscreen=no");
}

function openDocument(fileName) {
	if (fileName.indexOf("blank.",0) == -1)
		insertDocuments(fileName);
	docLocation = top.baseURL+top.unitDir+"/../documents/"+fileName;
	window.open(docLocation,"docWin","width=800,height=600,left=0,top=0,toolbar=yes,menubar=yes,status=yes,scrollbars=yes,resizable=yes,fullscreen=no");
}

function openURL(linkURL) {
	window.open(linkURL,"linkWin","width=800,height=600,left=0,top=0,toolbar=yes,menubar=yes,status=yes,scrollbars=yes,resizable=yes,fullscreen=no");
}

function preloadImages() {
	//load images for the content popups
    popupClose_h.src = imagePath + "content/close_btn_h.gif";
    popupClose_n.src = imagePath + "content/close_btn_n.gif";
    popupBg.src = imagePath + "content/popup_bg.gif";
}

function changeImage(imgState) {
	//change image for the close button in the content popup
	var imgObj;
	var img = imgState.split("_");	
	imgObj = eval("top.mainArea.frameType.content.document.images['"+img[0]+"Img']");
	
	newImage = eval(imgState);
	imgObj.src = newImage.src;
	
	return;
}

function printPage() {
	//alert("Sorry, print functionality is currently disabled.");
//	if (top.pageType != top.QUIZRESULTS)
//	{
		top.printWhichFrame = top.mainArea.frameType.content;
		top.printFrame.document.location = "print.htm";
//	}
//	else
//	{
//		checkCertAtEnd()
//	}
}

function loadActionPlanner()
{
	hidden.document.location = top.baseURL+"/generichtm/actionplanner.htm"
}

function checkCertAtEnd()
{
	for (var i=0; i<top.course[top.standard].childObjs.length; i++)
	{
		if ((top.course[top.standard].childObjs[i].isAssessment) && (top.course[top.standard].childObjs[i].assessmentDate != null))
		{
			top.percentage = parseInt((top.course[top.standard].childObjs[i].score/top.course[top.standard].childObjs[i].maxScore) * 100);
			if ((top.percentage != null) && (top.percentage >= top.course[top.standard].childObjs[i].passRate))
				printCertificate();
			break;
		}
	}
}

function printCertificate()
{
	if (!nameEntered)
	{
		userName = window.prompt("Please enter your name.","");
		if ((userName != null) && (userName.replace(/ /g,"") == ""))
			printCertificate();
		else
			nameEntered = true;
	}

	hidden.document.location = top.baseURL+"/generichtm/cert.htm";
}

function printCert()
{
	hidden.focus();
	hidden.print();
}

function getDate()
{
	var currentDate = new Date();
	var day,month,year;
	day = currentDate.getDate();
	month = currentDate.getMonth() + 1;
	year = currentDate.getFullYear();

//	if (month < 10)
//		month = "0"+month;

	return day+"/"+month+"/"+year;
}

function generateTrackingData()
{
	var taskSeperator = ";";
	var currentStartDate = getDate();
	var currentEndDate = getDate();
	var assessmentDate;
	var temp1;
	var temp2;

	top.course[standard].checkStatus();

//	top.debugAlert("<b>START Generating Tracking Data</b>","blue");

	trackingData = "";

	// Generate the scenario,task, task question status tracking string
	for (var i=0; i<top.course[standard].childObjs.length; i++)
	{
		trackingData += top.course[standard].childObjs[i].id+":"+top.course[standard].childObjs[i].state+":";
		if (top.course[standard].childObjs[i].navArray != null)
		{
			for (var j=0; j<top.course[standard].childObjs[i].navArray.length; j++)
			{
				if (j == (top.course[standard].childObjs[i].navArray.length-1))
					trackingData += top.course[standard].childObjs[i].navArray[j][1];
				else
					trackingData += top.course[standard].childObjs[i].navArray[j][1]+",";
			}
		}
		else if (top.course[standard].childObjs[i].previousNavStatus != null)
		{
			trackingData += top.course[standard].childObjs[i].previousNavStatus;
		}
		trackingData += "|";
	
		if (top.course[standard].childObjs[i].taskStatusArray != null)
		{
			taskSeperator = ";";
			for (var j=0; j<top.course[standard].childObjs[i].taskStatusArray.length; j++)
			{
				if (j == (top.course[standard].childObjs[i].taskStatusArray.length - 1))
					taskSeperator = "";

				trackingData += top.course[standard].childObjs[i].taskStatusArray[j][0]+":"+top.course[standard].childObjs[i].taskStatusArray[j][1];
				if ((top.course[standard].childObjs[i].taskQSArray != null) && (top.course[standard].childObjs[i].taskQSArray[top.course[standard].childObjs[i].taskStatusArray[j][0]]))
					trackingData += ":"+top.course[standard].childObjs[i].taskQSArray[top.course[standard].childObjs[i].taskStatusArray[j][0]][0]

				trackingData += taskSeperator;
			}

			if (top.course[standard].childObjs[i].isAssessment)
			{
				assessmentDate = top.course[standard].childObjs[i].assessmentDate;
				if (top.course[standard].childObjs[i].assessmentDate != null)
				{
					trackingData += ";"+assessmentDate+":"+top.course[standard].childObjs[i].score+":"+top.course[standard].childObjs[i].maxScore;
					top.percentage = parseInt((top.course[standard].childObjs[i].score/top.course[standard].childObjs[i].maxScore)*100);
					if (top.percentage >= top.course[standard].childObjs[i].passRate)
						passed = "True";
					else
						passed = "False";
				}
				else
				{
					trackingData += ";::";
				}
			}
		}

		if (i == (top.course[standard].childObjs.length - 1))
			trackingData += "*";
		else
			trackingData += "#";
	}

	// adding communication history
	if (top.course[standard].emailHistory != null)
	{
		trackingData += "1~";
		for (var i=0; i<top.course[standard].emailHistory.length; i++)
		{
			trackingData += top.course[standard].emailHistory[i][0].replace(/\.htm/,"")+"^"+top.course[standard].emailHistory[i][1]+"^"+top.course[standard].emailHistory[i][2]+"^"+top.course[standard].emailHistory[i][3];
			if (i == (top.course[standard].emailHistory.length - 1))
				trackingData += "#";
			else
				trackingData += "~";
		}
	}

	if (top.course[standard].faxHistory != null)
	{
		trackingData += "2~";
		for (var i=0; i<top.course[standard].faxHistory.length; i++)
		{
			trackingData += top.course[standard].faxHistory[i][0].replace(/\.htm/,"")+"^"+top.course[standard].faxHistory[i][1];
			if (i == (top.course[standard].faxHistory.length - 1))
				trackingData += "#";
			else
				trackingData += "~";
		}
	}

	if (top.course[standard].postHistory != null)
	{
		trackingData += "3~";
		for (var i=0; i<top.course[standard].postHistory.length; i++)
		{
			trackingData += top.course[standard].postHistory[i][0].replace(/\.htm/,"")+"^"+top.course[standard].postHistory[i][1];
			if (i == (top.course[standard].postHistory.length - 1))
				trackingData += "#";
			else
				trackingData += "~";
		}
	}

	if (top.course[standard].memoHistory != null)
	{
		trackingData += "4~";
		for (var i=0; i<top.course[standard].memoHistory.length; i++)
		{
			trackingData += top.course[standard].memoHistory[i][0].replace(/\.htm/,"")+"^"+top.course[standard].memoHistory[i][1];
			if (i == (top.course[standard].memoHistory.length - 1))
				trackingData += "#";
			else
				trackingData += "~";
		}
	}

	if (top.course[standard].phoneHistory != null)
	{
		trackingData += "5~";
		for (var i=0; i<top.course[standard].phoneHistory.length; i++)
		{
			trackingData += top.course[standard].phoneHistory[i][0].replace(/\.htm/,"")+"^"+top.course[standard].phoneHistory[i][1];
			if (i == (top.course[standard].phoneHistory.length - 1))
				trackingData += "#";
			else
				trackingData += "~";
		}
	}

	if (top.course[standard].voicemailHistory != null)
	{
		trackingData += "6~";
		for (var i=0; i<top.course[standard].voicemailHistory.length; i++)
		{
			trackingData += top.course[standard].voicemailHistory[i][0].replace(/\.htm/,"")+"^"+top.course[standard].voicemailHistory[i][1];
			if (i == (top.course[standard].voicemailHistory.length - 1))
				trackingData += "#";
			else
				trackingData += "~";
		}
	}

	if (top.course[standard].interruptionHistory != null)
	{
		trackingData += "7~";
		for (var i=0; i<top.course[standard].interruptionHistory.length; i++)
		{
			trackingData += top.course[standard].interruptionHistory[i][0].replace(/\.htm/,"")+"^"+top.course[standard].interruptionHistory[i][1];
			if (i == (top.course[standard].interruptionHistory.length - 1))
				trackingData += "#";
			else
				trackingData += "~";
		}
	}

	if (top.course[standard].postitHistory != null)
	{
		trackingData += "8~";
		for (var i=0; i<top.course[standard].postitHistory.length; i++)
		{
			trackingData += top.course[standard].postitHistory[i][0].replace(/\.htm/,"")+"^"+top.course[standard].postitHistory[i][1];
			if (i == (top.course[standard].postitHistory.length - 1))
				trackingData += "#";
			else
				trackingData += "~";
		}
	}

	if (top.course[standard].meetingHistory != null)
	{
		trackingData += "9~";
		for (var i=0; i<top.course[standard].meetingHistory.length; i++)
		{
			trackingData += top.course[standard].meetingHistory[i][0].replace(/\.htm/,"")+"^"+top.course[standard].meetingHistory[i][1];
			if (i == (top.course[standard].meetingHistory.length - 1))
				trackingData += "#";
			else
				trackingData += "~";
		}
	}

	if (top.course[standard].wordHistory != null)
	{
		trackingData += "10~";
		for (var i=0; i<top.course[standard].wordHistory.length; i++)
		{
			trackingData += top.course[standard].wordHistory[i];
			if (i == (top.course[standard].wordHistory.length - 1))
				trackingData += "#";
			else
				trackingData += "~";
		}
	}

	if (top.course[standard].excelHistory != null)
	{
		trackingData += "11~";
		for (var i=0; i<top.course[standard].excelHistory.length; i++)
		{
			trackingData += top.course[standard].excelHistory[i];
			if (i == (top.course[standard].excelHistory.length - 1))
				trackingData += "#";
			else
				trackingData += "~";
		}
	}

	if (top.course[standard].powerpointHistory != null)
	{
		trackingData += "12~";
		for (var i=0; i<top.course[standard].powerpointHistory.length; i++)
		{
			trackingData += top.course[standard].powerpointHistory[i];
			if (i == (top.course[standard].powerpointHistory.length - 1))
				trackingData += "#";
			else
				trackingData += "~";
		}
	}

	if (top.course[standard].accessHistory != null)
	{
		trackingData += "13~";
		for (var i=0; i<top.course[standard].accessHistory.length; i++)
		{
			trackingData += top.course[standard].accessHistory[i];
			if (i == (top.course[standard].accessHistory.length - 1))
				trackingData += "#";
			else
				trackingData += "~";
		}
	}

	trackingData += "*";

	// adding user bookmarks
	if (top.course[standard].bookmarks != null)
	{
		for (var i in top.course[standard].bookmarks)
		{
			if (top.course[standard].bookmarks[i] != null)
				trackingData += i+"^"+top.course[standard].bookmarks[i]+"#";
		}
	}

	trackingData += "*";

	// adding on exit bookmark
	if ((top.currentState.unit != null) && (!top.currentState.unit.isAssessment))
	{
		trackingData += top.currentState.unit.id+":"+top.currentState.unit.currentPage;
	}

	trackingData += "*";

	if ((top.course[standard].state == top.COMPLETED) || (passed == "True"))
	{
		if ((startDate == null) && (endDate == null))
		{
			startDate = currentStartDate;
			endDate = currentEndDate;
		}
		else if ((startDate != null) && (endDate == null))
		{
			endDate = currentEndDate;
		}
		else
		{
			temp1 = startDate.split("/");
			temp2 = endDate.split("/");
			if (new Date(temp1[2],(temp1[1]-1),temp1[0]) < new Date(temp2[2],(temp2[1]-1),temp2[0]))
				startDate = currentStartDate;

			if (assessmentDate)
				temp1 = assessmentDate.split("/");
			if (new Date(temp2[2],(temp2[1]-1),temp2[0]) < new Date(temp1[2],(temp1[1]-1),temp1[0]))
				endDate = currentEndDate;
		}
	}
	else
	{
		if (startDate == null)
			startDate = currentStartDate;
	}

	if (startDate != null)
		formatTrackingStartDate();
	if (endDate != null)
		formatTrackingEndDate();

	trackingData += startDate+"^"+endDate+"^"+userName;

//	top.debugAlert("<b>Tracking String = </b>"+trackingData);
//	top.debugAlert("<b>END Generating Tracking Data</b>","blue");
}

function formatTrackingStartDate()
{
	var timeSplit = startDate.split("/");
	var temp = new Date(timeSplit[2],(timeSplit[1]-1),timeSplit[0]);
	var day = temp.getDate();
	var month = monthArray[temp.getMonth()];
	var year = temp.getFullYear();

	trackingStartDate = day+"-"+month+"-"+year;
}

function formatTrackingEndDate()
{
	var timeSplit = endDate.split("/");
	var temp = new Date(timeSplit[2],(timeSplit[1]-1),timeSplit[0]);
	var day = temp.getDate();
	var month = monthArray[temp.getMonth()];
	var year = temp.getFullYear();

	trackingEndDate = day+"-"+month+"-"+year;
}

function saveTrackingData()
{
	var expireDate = new Date().getTime()+315360000000;
	expireDate = new Date(expireDate);
	generateTrackingData();
	if (!LMSPresent)
		setCookie(standard,trackingData,expireDate);
}

function saveLMSData()
{
	var totalTimeSpent;
	var sessionTime;
	var sHour = 0;
	var sMins = 0;
	var sSecs = 0;

	courseEndTime = new Date().getTime();
	totalTimeSpent = courseEndTime - courseStartTime;

	generateTrackingData();

//	totalTimeSpent = 3600000;
	while (totalTimeSpent >= 3600000)
	{
		totalTimeSpent = totalTimeSpent - 3600000;
		sHour++;
	}

	while (totalTimeSpent >= 60000)
	{
		totalTimeSpent = totalTimeSpent - 60000;
		sMins++;
	}

	while (totalTimeSpent >= 1000)
	{
		totalTimeSpent = totalTimeSpent - 1000;
		sSecs++;
	}

	if (sHour < 10)
		sHour = new String("000"+sHour);
	else if (sHour < 100)
		sHour = new String("00"+sHour);
	else if (sHour < 1000)
		sHour = new String("0"+sHour);

	if (sMins < 10)
		sMins = new String("0"+sMins);

	if (sSecs < 10)
		sSecs = new String("0"+sSecs)

	sessionTime = sHour+":"+sMins+"::"+sSecs;
	top.window.opener.setValue("cmi.core.session_time",sessionTime);
	top.window.opener.setValue("cmi.suspend_data",trackingData);

	for (var i=0; i<top.course[standard].childObjs.length; i++)
	{
		if (top.course[standard].childObjs[i].isAssessment)
		{
			if (top.course[standard].childObjs[i].percentage != null)
				top.window.opener.setValue("cmi.core.score.raw",top.course[standard].childObjs[i].percentage);
		}
	}

	if (top.course[standard].state == top.COMPLETED)
		top.window.opener.setValue("cmi.core.lesson_status","completed");
	else
		top.window.opener.setValue("cmi.core.lesson_status","incomplete");
	top.window.opener.finishLMS();
}

function retrieveTrackingData()
{
	var statusData;
	var commsData;
	var bookmarkData;
	var revisitata;
	var currentUnitObj;
	if (!LMSPresent)
		trackingData = unescape(getCookie(standard));

	if ((trackingData != "null") && (trackingData != null))
	{
		trackingData = trackingData.split("*");
		statusData = trackingData[0];
		statusData = statusData.split("#");
		for (var i=0; i<statusData.length; i++)
		{
			currentUnitObj = top.course[standard].childObjs[i];
			temp = statusData[i].split("|");
			if (temp[1].length > 0)
			{
				temp2 = temp[0].split(":");
				currentUnitObj.state = temp2[1]*1;
				currentUnitObj.previousNavStatus = temp2[2];
				temp = temp[1].split(";");

				currentUnitObj.taskStatusArray = new Array();
				if (!currentUnitObj.isAssessment)
				{
					for (var j=0; j<temp.length; j++)
					{
						temp2 = temp[j].split(":");
						currentUnitObj.taskStatusArray[j] = new Array();
						currentUnitObj.taskStatusArray[j][0] = temp2[0];
						currentUnitObj.taskStatusArray[j][1] = temp2[1]*1;
						if ((currentUnitObj.taskQSArray != null) && (currentUnitObj.taskQSArray[temp2[0]]))
							currentUnitObj.taskQSArray[temp2[0]][0] = temp2[2]*1;
					}
				}
				else
				{
					for (var j=0; j<(temp.length-1); j++)
					{
						temp2 = temp[j].split(":");
						currentUnitObj.taskStatusArray[j] = new Array();
						currentUnitObj.taskStatusArray[j][0] = temp2[0];
						currentUnitObj.taskStatusArray[j][1] = temp2[1]*1;
					}

					temp2 = temp[(temp.length-1)].split(":");
					if (temp2[0].length > 0)
					{
						currentUnitObj.assessmentDate = temp2[0];
						currentUnitObj.score = temp2[1]*1;
						currentUnitObj.maxScore = temp2[2]*1;
					}
				}
			}
		}

		commsData = trackingData[1];
		if (commsData.length > 0)
			retrieveComms(commsData);

		bookmarkData = trackingData[2];
		if (bookmarkData.length > 0)
			retrieveBookmarks(bookmarkData);

		revisitData = trackingData[3];
		if (revisitData.length > 0)
			revisitString = revisitData.split(":");

		if (trackingData.length == 5)
		{
			temp = trackingData[4].split("^");
			if (temp[0] != "null")
				startDate = temp[0];
			if (temp[1] != "null")
				endDate = temp[1];

			if (temp.length == 3)
			{
				if ((temp[2] != null) && (temp[2] != "null"))
				{
					userName = temp[2];
					nameEntered = true;
				}
			}
		}

		trackingData = "";
	}
}

function retrieveComms(commString)
{
	commString = commString.split("#");
	for (var i=0; i<(commString.length-1); i++)
	{
		temp = commString[i].split("~");
		for (var j=1; j<temp.length; j++)
		{
			if (temp[j].indexOf("^",0) != -1)
			{
				temp2 = temp[j].split("^");
				currentCommPage = temp2[0]+".htm";
			}
			else
			{
				temp2 = temp[j];
			}

			switch (temp[0])
			{
			case "1": // Email
				insertEmailHistory(temp2[1],temp2[2],temp2[3]);
				break;
			case "2": // Fax
				insertFaxHistory(temp2[1]);
				break;
			case "3": // Post
				insertPostHistory(temp2[1]);
				break;
			case "4": // Memo
				insertMemoHistory(temp2[1]);
				break;
			case "5": // Phone
				insertPhoneHistory(temp2[1]);
				break;
			case "6": // Voicemail
				insertVoicemailHistory(temp2[1]);
				break;
			case "7": // Interruption
				insertInterruptionHistory(temp2[1]);
				break;
			case "8": // Postit
				insertPostitHistory(temp2[1]);
				break;
			case "9": // Meeting
				insertMeetingHistory(temp2[1]);
				break;
			case "10": // word
				insertDocuments(temp2+'.doc');
				break;
			case "11": // excel
				insertDocuments(temp2+'.xls');
				break;
			case "12": // powerpoint
				insertDocuments(temp2+'.ppt');
				break;
			case "13": // access
				insertDocuments(temp2+'.mdb');
				break;
			default:
				break;
			}
		}
	}

	currentCommPage = null;
}

function retrieveBookmarks(bookmarkString)
{
	bookmarkString = bookmarkString.split("#");
	top.course[standard].bookmarks = new Array();
	for (var i=0; i<(bookmarkString.length-1); i++)
	{
		temp = bookmarkString[i].split("^");
		top.course[standard].bookmarks[temp[0]] = temp[1];
		top.course[standard].bookmarksCount++;
	}
}
