var imagePath = "../images/"; // The path of the image directory relative to the page 
var add_h = new Image();
var add_n = new Image();
var view_h = new Image();
var view_n = new Image();
var go_h = new Image();
var go_n = new Image();
var timerID = null;
parent.titleLoaded = false;

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
	preloadImages();
	showPath();
	parent.titleLoaded = true;
	if (top.standard != "mf" && top.standard != "help")
	{
		document.getElementById("keyword").style.visibility = "visible";
		document.getElementById("keywords").style.visibility = "visible";
		showKeywords();
	}
	parent.tools.location = "toolsandcomms.htm";
}

function showKeywords()
{
	var temp = "<form name=\"kwForm\" onsubmit=\"return false\">\n";
	temp += "<select name=\"kwOptions\" style=\"width:162\" onchange=\"keywordSelected()\">\n";
	temp += "<option value=\"\"></option>\n";
	for (var i in top.keywordData)
	{
		temp += "<option value=\""+i+"\">"+i+"</option>\n";
	}
	temp += "</select>\n";
	temp += "</form>\n";
	document.all['keywords'].innerHTML = temp;
}

function keywordSelected()
{
	var formObj = document.forms['kwForm'].elements['kwOptions'];
	if (formObj.options[formObj.selectedIndex].value != "")
	{
		top.keyword = formObj.options[formObj.selectedIndex].value;
		top.keywordResult();
	}
	else
	{
		top.keyword = null;
	}
}
function preloadImages()
{
    add_h.src = imagePath + "add_btn_h.gif";
    add_n.src = imagePath + "add_btn_n.gif";
    view_h.src = imagePath + "view_btn_h.gif";
    view_n.src = imagePath + "view_btn_n.gif";
    go_h.src = imagePath + "go_btn_h.gif";
    go_n.src = imagePath + "go_btn_n.gif";
}

function changeImage(imgState)
{
    var imgObj;
    var img = imgState.split("_");
  
    imgObj = eval("document.images['"+img[0]+"']");
    
    if (parent.titleLoaded)
    {
        newImage = eval(imgState);
        imgObj.src = newImage.src;
    }
    return;
}

function showPath()
{
	var pathString = "";
	var title = top.currentState.unit.title.split(":");

	pathString += "<a href=\"javascript:returnToMenu()\" onfocus=\"this.blur()\" id='homeLink'>"+top.course[top.standard].title+"</a> &gt; "+title[0];
	document.getElementById("pathL").innerHTML = pathString;
}

function returnToMenu()
{
	if (timerID != null)
	{
		clearTimeout(timerID);
		timerID = null;
	}
	top.linearRoute = false;
	top.fromQuickFind = false;
    top.currentState.unit.menu(top.frames['mainArea'],top.baseURL+"/"+top.standard+"/menu/menu.htm");

    return;
}

function viewBookmark()
{
	top.viewBookmarks();
}

function launchQuickfind()
{
	if (timerID != null)
	{
		clearTimeout(timerID);
		timerID = null;
	}
	document.images['go'].src = go_n.src;
	top.linearRoute = false;
	top.launchQuickfind();
}

function addBookmark()
{
	// need to check bookmarksCount in top.course
	if (!top.currentState.unit.isAssessment)
	{
		top.currentState.unit.bookmarkPage();
		alert("Page added to bookmark.");
	}
	else
	{
		alert("Bookmark disabled for assessment.");
	}
}

flashState = 0;
function flashHomeLink() {
	//alert(top.fromQuickFind);
	var currentImage;

/*
	if (timerID != null)
	{
		clearTimeout(timerID);
		timerID = null;
	}

	if (flashState == 0) {
		thisBG = "#ffffff";
		thisCol = "#000000";
		currentImage = go_n.src;
		flashState = 1;
	} else {
		thisBG = "#eeee00";
		thisCol = "#000000";
		currentImage = go_h.src;
		flashState = 0;
	}
*/

	if(top.linearRoute)
	{
		document.images['go'].src = currentImage;
	}
/*
	else
	{
		document.all.homeLink.style.backgroundColor = thisBG;
		document.all.homeLink.style.color = thisCol;		
	}
*/
//	timerID = setTimeout("flashHomeLink()", 1000);
}
