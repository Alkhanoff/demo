var strImagePath = parent.strImagePath;
var exit_h = new Image();
var exit_n = new Image();
var help_h = new Image();
var help_n = new Image();

function initialise()
{
	preloadImages();
	parent.showResults();
	parent.booContentLoaded = true;
}

function preloadImages()
{
	exit_h.src = strImagePath + "popups/keyword/close_h.gif";
	exit_n.src = strImagePath + "popups/keyword/close_n.gif";
	help_h.src = strImagePath + "popups/keyword/help_h.gif";
	help_n.src = strImagePath + "popups/keyword/help_n.gif";
}

function changeImage(_strState)
{
  var _arrImg = _strState.split("_");

  if (parent.booContentLoaded)
  {
  	document.getElementById(_arrImg[0] + "Img").src = eval(_strState).src;
  }
  return;
}

function exit()
{
	parent.objOpenerTop.strKeyword = null;
	top.window.close();
}

function buttonState(_strButton, _strState)
{
	document.getElementById(_strButton).style.visibility = _strState;
}

function showHelp()
{
	parent.showHelp();
}