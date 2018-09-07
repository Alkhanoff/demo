var courseWin;
var courseObj;
var currentUnit;
var currentPage;
var inHistory = false;
var navLoaded = false;
var standard;
var popupClose_h = new Image();
var popupClose_n = new Image();
var popupBg = new Image();
var imagePath = "../../images/";

function initialise()
{
	preloadImages();
	courseWin = window.opener;
	standard = courseWin.standard;
	courseObj = courseWin.course;
	currentUnit = courseWin.currentState.unit;
	currentPage = courseWin.currentCommPage;
	titleF.location = "title.htm";
}

function loadMessage()
{
	var pageSplit = currentPage.split("_");
	contentF.location = courseWin.baseURL+"/units/"+pageSplit[0]+"/"+pageSplit[1]+"/content/email_"+currentPage;
}

function checkHistory()
{
	var found = false;
	if (courseObj[standard].emailHistory != null)
	{
		for (var i=0; i<courseObj[standard].emailHistory.length; i++)
		{
			if (currentPage == courseObj[standard].emailHistory[i][0])
			{
				inHistory = true;
				break;
			}
		}
	}
}

function messageClicked(page)
{
	currentPage = page;
	loadMessage();
}

function initialiseInbox()
{
	checkHistory();
	if (!inHistory)
		courseWin.insertEmailHistory(contentF.from,contentF.subject,contentF.attachment);

	inHistory = false;
	generateInbox();
}

function generateInbox()
{
	var inboxString = "<table width=\"542\" cellpadding=\"0\" cellspacing=\"0\" style=\"font-family:Arial; font-size:9pt\">";
	if (courseObj[standard].emailHistory != null)
	{
		for (var i=0; i<courseObj[standard].emailHistory.length; i++)
		{
			if (currentPage == courseObj[standard].emailHistory[i][0])
			{
				inboxString += "<tr>";
				inboxString += "<td width=\"17\" height=\"20\" valign=\"center\" align=\"center\" style=\"cursor:default\">&nbsp;</td>";

				if (courseObj[standard].emailHistory[i][3] == "n")
					inboxString += "<td width=\"21\" height=\"20\" valign=\"center\" align=\"center\" style=\"border-left:1px solid #FFFFFF; cursor:default\"><img src=\"../../images/trans.gif\" border=\"0\"></td>";
				else
					inboxString += "<td width=\"21\" height=\"20\" valign=\"center\" align=\"center\" style=\"border-left:1px solid #FFFFFF; cursor:default\"><img src=\"../../images/popups/attach_icon_small.gif\" border=\"0\"></td>";

				inboxString += "<td width=\"210\" height=\"20\" valign=\"center\" align=\"left\" style=\"border-left:1px solid #FFFFFF; cursor:default\">&nbsp;"+courseObj[standard].emailHistory[i][1]+"</td>";
				inboxString += "<td width=\"294\" height=\"20\" valign=\"center\" align=\"left\" style=\"border-left:1px solid #FFFFFF; cursor:default\">&nbsp;"+courseObj[standard].emailHistory[i][2]+"</td>";
				inboxString += "</tr>";
			}
			else
			{
				inboxString += "<tr>";
				inboxString += "<td width=\"17\" height=\"20\" valign=\"center\" align=\"center\" style=\"cursor:default\">&nbsp;</td>";

				if (courseObj[standard].emailHistory[i][3] == "n")
					inboxString += "<td width=\"21\" height=\"20\" valign=\"center\" align=\"center\" style=\"border-left:1px solid #FFFFFF; cursor:default\"><img src=\"../../images/trans.gif\" border=\"0\"></td>";
				else
					inboxString += "<td width=\"21\" height=\"20\" valign=\"center\" align=\"center\" style=\"border-left:1px solid #FFFFFF; cursor:default\"><img src=\"../../images/popups/attach_icon_small.gif\" border=\"0\"></td>";

				inboxString += "<td width=\"210\" height=\"20\"  valign=\"center\" align=\"left\" style=\"border-left:1px solid #FFFFFF; cursor:default\">&nbsp;<a href=\"#\" onclick=\"parent.messageClicked('"+courseObj[standard].emailHistory[i][0]+"')\" onfocus=\"this.blur()\">"+courseObj[standard].emailHistory[i][1]+"</a></td>";
				inboxString += "<td width=\"294\" height=\"20\" valign=\"center\" align=\"left\" style=\"border-left:1px solid #FFFFFF; cursor:default\">&nbsp;<a href=\"#\" onclick=\"parent.messageClicked('"+courseObj[standard].emailHistory[i][0]+"')\" onfocus=\"this.blur()\">"+courseObj[standard].emailHistory[i][2]+"</a></td>";
				inboxString += "</tr>";
			}
		}
	}
	inboxString += "</table>";

	inboxF.document.getElementById("inboxL").innerHTML = inboxString;
}

function printPage() {
	top.printWhichFrame = top.contentF;
	top.printType = "email";
	printF.location = "../../generichtm/commsprint.htm";
}


function showHelp() {
	//display the help text for this screen
	c = contentF;
	if (c.popupShowing == "help") {
		hidePopupLayer();	
		c.popupShowing = "";
	} else {
		if (c.document.getElementById("popupContent")) {
			c.document.getElementById("popupContent").innerHTML = "";
			showPopupLayer();
			strHelp = popupTitle('help', 'left') + popupDiv(window.opener.helpText("comm_email"), 482, 118, true);
			c.document.getElementById("popupContent").innerHTML =  strHelp;
			c.popupShowing = "help";
		}
	}
}


function popupTitle(imgName, align) {
	return "<div align='" + align + "'><img src='../../../../images/content/popup_titles/" + imgName + ".gif' alt='" + imgName + "' /></div>"
}

function popupDiv(divContent, divW, divH, scrollBars) {
	if (scrollBars) {
		overflowType = "auto";
	} else {
		overflowType = "hidden";
	}
	return "<div style='position:absolute; left:7px; top:43px; overflow: " + overflowType + "; padding:5px; width:" + divW + "; height:" + divH + "'>" + divContent + "</div>";
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
    popupClose_h.src = imagePath + "popups/comms/close_btn_h.gif";
    popupClose_n.src = imagePath + "popups/comms/close_btn_n.gif";
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