var strImagePath = parent.strImagePath;
var exit_h = new Image();
var exit_n = new Image();
var help_h = new Image();
var help_n = new Image();

function initialise()
{
	preloadImages();
	parent.loadRef();
	parent.booNavLoaded = true;
}

function preloadImages()
{
    exit_h.src = strImagePath + "popups/reference/close_h.gif";
    exit_n.src = strImagePath + "popups/reference/close_n.gif";
    help_h.src = strImagePath + "popups/reference/help_h.gif";
    help_n.src = strImagePath + "popups/reference/help_n.gif";
}

function changeImage(_strState)
{
    var arrImg = _strState.split("_");
  
    if (parent.booNavLoaded)
    {
    	document.getElementById(arrImg[0] + "Img").src = eval(_strState).src;
    }

    return;
}

function exit()
{
	top.window.close();
}
