var courseWin;
var courseObj;
var currentUnit;
var currentPage;
var inHistory = false;
var contentLoaded = false;
var machineLoaded = false;
var navLoaded = false;
var currentMessage = 0;
var lastMessage = 0;
var standard;
var popupClose_h = new Image();
var popupClose_n = new Image();
var popupBg = new Image();
var imagePath = "../../images/";
var flashInstalled = false;

function initialise()
{
	preloadImages();
	courseWin = window.opener;
	courseObj = courseWin.course;
	currentUnit = courseWin.currentState.unit;
	currentPage = courseWin.currentCommPage;
	standard = courseWin.standard;
	flashInstalled = courseWin.flashInstalled;
	titleF.location = "title.htm";
}

function loadMessage()
{
	var pageSplit = currentPage.split("_");
	contentF.location = courseWin.baseURL+"/units/"+pageSplit[0]+"/"+pageSplit[1]+"/content/voicemail_"+currentPage;
}

function checkHistory()
{
	var found = false;
	if (courseObj[standard].voicemailHistory != null)
	{
		for (var i=0; i<courseObj[standard].voicemailHistory.length; i++)
		{
			if (currentPage == courseObj[standard].voicemailHistory[i][0])
			{
				inHistory = true;
				break;
			}
		}
	}
}

/*
function messageClicked(page)
{
	currentPage = page;
	loadMessage();
}
*/

function loadPrevMessage()
{
	currentMessage--;
	currentPage = courseObj[standard].voicemailHistory[currentMessage][0];
	loadMessage();
}

function loadNextMessage()
{
	currentMessage++;
	currentPage = courseObj[standard].voicemailHistory[currentMessage][0];
	loadMessage();
}

function initialiseVoicemail()
{
	checkHistory();
	if (!inHistory)
	{
		courseWin.insertVoicemailHistory(contentF.subject);
		voicemailF.changeImage("light_h");
	}

	inHistory = false;
	generateMessageBox();
//	if (voicemailF.document.images['lightImg'].src.indexOf("_h.jpg",0) == -1)
//		contentF.loadAudio();
}

function generateMessageBox()
{
	var bullet = "&nbsp;&bull;&nbsp;";
	var messageArray = new Array();
	var messageString = "";
	var startCount;
	var endCount;
	var subject;

	if (courseObj[standard].voicemailHistory != null)
	{
		lastMessage = courseObj[standard].voicemailHistory.length-1;
		for (var i=0; i<courseObj[standard].voicemailHistory.length; i++)
		{
			if (currentPage == courseObj[standard].voicemailHistory[i][0])
				currentMessage = i;

			subject = courseObj[standard].voicemailHistory[i][1];
			if (subject.length >24)
				subject = subject.slice(0,21)+"...";
			messageArray[messageArray.length] = "&nbsp;"+(i+1)+".&nbsp;"+subject+"<br>";
		}
	}

	if (currentMessage < 4)
	{
		startCount = 0;
		if (messageArray.length < 4)
			endCount = messageArray.length;
		else
			endCount = 4;
	}
	else
	{
		startCount = currentMessage-3;
		endCount = currentMessage+1;
	}

	for (var i=startCount; i<endCount; i++)
	{
		if (currentMessage == i)
			messageString += "<span color=\"#FFFFFF\">"+messageArray[i]+"</span>";
		else
			messageString += messageArray[i];
	}

	voicemailF.document.getElementById("messageL").innerHTML = messageString;
}


function printPage() {
	top.printWhichFrame = top.contentF;
	top.printType = "voicemail";
	printF.location = "../../generichtm/commsprint.htm";
}

function showHelp() {
	//display the help text for this screen
	c = contentF;
	if (c.popupShowing == "help") {
		top.hidePopupLayer();	
		c.popupShowing = "";
	} else {
		if (c.document.getElementById("popupContent")) {
			c.document.getElementById("popupContent").innerHTML = "";
			showPopupLayer();
			strHelp = popupTitle('help', 'left') + "<br />" + popupDiv(window.opener.helpText("comm_voicemail"), 250, 254, true);
			c.document.getElementById("popupContent").innerHTML =  strHelp;
			c.popupShowing = "help";
		}
	}
}

function popupTitle(imgName, align) {
	return "<div style='position:absolute; left:-5px; top:4px;'><img src='../../../../images/content/popup_titles/" + imgName + ".gif' alt='" + imgName + "' /></div>"
}

function popupDiv(divContent, divW, divH, scrollBars) {
	if (scrollBars) {
		overflowType = "auto";
	} else {
		overflowType = "hidden";
	}
	return "<div style='overflow: " + overflowType + "; padding:5px; background-color:#ffffff; position:absolute; top:48px; width:" + divW + "; height:" + divH + "'>" + divContent + "</div>";
}

function showPopupLayer() {
	c = contentF;
	if (!c.popupVisible) {
		//show the popup layer
		if (c.document.getElementById("popupLayer")) {
			c.document.getElementById("popupLayer").style.visibility = "visible";
		}
		//show the mask over the page content
		if (c.document.getElementById("popupMask")) {
			c.document.getElementById("popupMask").style.visibility = "visible";
		}
		c.popupVisible = true;
	}
}

function hidePopupLayer() {
	c = contentF;
	if (c.popupVisible) {
		//hide the popup layer
		if (c.document.getElementById("popupLayer")) {
			c.document.getElementById("popupLayer").style.visibility = "hidden";
		}
		//hide the mask over the page content
		if (c.document.getElementById("popupMask")) {
			c.document.getElementById("popupMask").style.visibility = "hidden";
		}
		c.popupVisible = false;
		c.popupShowing = "";
	}
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
	imgObj = eval("top.contentF.document.images['"+img[0]+"Img']");
	
	newImage = eval(imgState);
	imgObj.src = newImage.src;
	
	return;
}