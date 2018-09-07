var courseWin;
var courseObj;
var currentUnit;
var currentPage;
var inHistory = false;
var contentLoaded = false;
var navLoaded = false;
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
	standard = courseWin.standard;
	courseObj = courseWin.course;
	currentUnit = courseWin.currentState.unit;
	currentPage = courseWin.currentCommPage;
	flashInstalled = courseWin.flashInstalled;
	titleF.location = "title.htm";
}

function loadPhonecall()
{
	var pageSplit = currentPage.split("_");
	contentF.location = courseWin.baseURL+"/units/"+pageSplit[0]+"/"+pageSplit[1]+"/content/phonecall_"+currentPage;
}

function checkHistory()
{
	var found = false;
	if (courseObj[standard].phoneHistory != null)
	{
		for (var i=0; i<courseObj[standard].phoneHistory.length; i++)
		{
			if (currentPage == courseObj[standard].phoneHistory[i][0])
			{
				inHistory = true;
				break;
			}
		}
	}

	if (!inHistory)
		courseWin.insertPhoneHistory(contentF.subject);
}

function checkNav()
{
	if (noOfPages > 1)
	{
		nav.document.all['navBackL'].style.visibility = "visible";
		nav.checkNav();
	}
}

function printPage() {
	top.printWhichFrame = top.contentF;
	top.printType = "phonecall";
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
			strHelp = popupTitle('help', 'left') + popupDiv(window.opener.helpText("comm_phonecall"), 340, 222, true);
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
	return "<div style='position:absolute; left:16px; top:55px; overflow: " + overflowType + "; padding:5px; width:" + divW + "; height:" + divH + "'>" + divContent + "</div>";
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