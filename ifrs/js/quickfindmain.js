var strImagePath = parent.strImagePath;
var exit_h = new Image();
var exit_n = new Image();
var help_h = new Image();
var help_n = new Image();

function initialise()
{
	preloadImages();
	parent.initQuickFind();
	parent.booContentLoaded = true;
}

function preloadImages()
{
    exit_h.src = strImagePath + "popups/quickfind/quickfind_close_h.gif";
    exit_n.src = strImagePath + "popups/quickfind/quickfind_close_n.gif";
    help_h.src = strImagePath + "popups/quickfind/quickfind_help_h.gif";
    help_n.src = strImagePath + "popups/quickfind/quickfind_help_n.gif";
}

function changeImage(_strState)
{
    var arrImg = _strState.split("_");
    
    if (parent.booContentLoaded)
    {
    	document.getElementById(arrImg[0] + "Img").src = eval(_strState).src;
    }

    return;
}

function exit()
{
	top.window.close();
}

function buttonState(_strButton, _strState)
{
	document.getElementById(_strButton).style.visibility = _strState;
}
