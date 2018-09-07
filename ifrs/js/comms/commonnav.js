var strImagePath = "../../images/"; // The path of the image directory relative to the page 
var exit_h = new Image();
var exit_n = new Image();
var refReturn_h = new Image();
var refReturn_n = new Image();
var print_h = new Image();
var print_n = new Image();
var help_h = new Image();
var help_n = new Image();


function common_init()
{
	preloadImages();
	if (parent.objOpenerTop.booBackToRef) { // if a back to refs button is needed
		document.getElementById("refReturnL").style.visibility = "visible";
		parent.objOpenerTop.booBackToRef = false;
	}
}

function preloadImages()
{
    exit_h.src = strImagePath + "popups/comms/nav_buttons/close_h.gif";
    exit_n.src = strImagePath + "popups/comms/nav_buttons/close_n.gif";
    print_h.src = strImagePath + "popups/comms/nav_buttons/print_h.gif";
    print_n.src = strImagePath + "popups/comms/nav_buttons/print_n.gif";
    help_h.src = strImagePath + "popups/comms/nav_buttons/help_h.gif";
    help_n.src = strImagePath + "popups/comms/nav_buttons/help_n.gif";
    refReturn_h.src = strImagePath + "popups/comms/nav_buttons/return_h.gif";
    refReturn_n.src = strImagePath + "popups/comms/nav_buttons/return_n.gif";
}

function changeImage(_strImgState)
{
    var _strImgSplit = _strImgState.split("_");

    if (parent.booNavLoaded)
    {
    	document.images[_strImgSplit[0] + "Img"].src = eval(_strImgState).src;
    }

    return;
}

function exit()
{
	top.window.close();
}

function refReturn() {
	parent.objOpenerTop.launchRef();
	top.window.close();
}
