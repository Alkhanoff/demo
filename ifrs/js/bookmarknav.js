var strImagePath = "../images/popups/bookmark/"; // The path of the image directory relative to the page 
var exit_h = new Image();
var exit_n = new Image();
var help_h = new Image();
var help_n = new Image();

function initialise()
{
	preloadImages();
	parent.booNavLoaded = true;
	parent.window["content"].location = "bookmark.htm";
}

function preloadImages()
{
    exit_h.src = strImagePath + "close_h.gif";
    exit_n.src = strImagePath + "close_n.gif";
    help_h.src = strImagePath + "help_h.gif";
    help_n.src = strImagePath + "help_n.gif";
}

function changeImage(_strState)
{
    var _arrImg = _strState.split("_");
    
    if (parent.booNavLoaded)
    {
    	document.getElementById(_arrImg[0] + "Img").src = eval(_strState).src;
    }
    return;
}

function exit()
{
	top.window.close();
}

function showHelp() {
	parent.showHelp();
}
