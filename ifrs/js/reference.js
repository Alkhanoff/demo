var strImagePath = "../images/";
var popupClose_h = new Image();
var popupClose_n = new Image();

function initialise()
{
	preloadImages()
	parent.initialiseComms();
	parent.initialiseResource();
	parent.booContentLoaded = true;
}

function preloadImages()
{
    popupClose_h.src = strImagePath + "content/close_btn_h.gif";
    popupClose_n.src = strImagePath + "content/close_btn_n.gif";
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