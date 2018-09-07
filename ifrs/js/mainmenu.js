var imagePath = "../images/"; // The path of the image directory relative to the page 
var selectedModule;
var pageLoaded = false;

document.onselectstart = killSelection

function killSelection()
{
	window.event.returnValue = false;
	window.event.cancelBubble = true;
}

function initialise() 
{
	preloadImages();
	generateMenu();
	top.currentModule = null;
	pageLoaded = true;
}

function preloadImages()
{
}

function changeImage(imgState)
{
    var imgObj;
    var img = imgState.split("_");

	if (pageLoaded)
	{
	    imgObj = eval("document.images['"+img[0]+"Img']");
	
	    newImage = eval(imgState);
	    imgObj.src = newImage.src;
	}
}

function generateMenu()
{
	var menuString = "";

	for (i in top.course)
	{
		top.course[i].checkStatus();
		menuString += "<font color=\"red\">"+top.course[i].state+"</font> <a href=\"JavaScript:moduleClicked('"+i+"')\" onfocus=\"this.blur()\">"+top.course[i].title+"</a><br><br>";
	}

	document.all['level1Menu'].innerHTML = menuString;
}

function moduleClicked(moduleID)
{
	if (pageLoaded)
	{
		top.selectedModule = moduleID;
		top.goModule(moduleID);
	}
}
