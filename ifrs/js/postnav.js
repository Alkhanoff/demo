var imagePath = "../../images/"; // The path of the image directory relative to the page 
var exit_h = new Image();
var exit_n = new Image();
var back_h = new Image();
var back_n = new Image();
var next_h = new Image();
var next_n = new Image();
var print_h = new Image();
var print_n = new Image();
var help_h = new Image();
var help_n = new Image();
var refReturn_h = new Image();
var refReturn_n = new Image();

function initialise()
{
	preloadImages();
	theOpener = parent.window.opener;
	if (theOpener.backToRef == true) { // if a back to refs button is needed
		document.getElementById("refReturnL").style.visibility = "visible";
		theOpener.backToRef = false;
	}
	parent.loadPost();
	parent.navLoaded = true;
}

function preloadImages()
{
    exit_h.src = imagePath + "popups/comms/nav_buttons/close_h.gif";
    exit_n.src = imagePath + "popups/comms/nav_buttons/close_n.gif";
    back_h.src = imagePath + "popups/comms/nav_buttons/back_h.gif";
    back_n.src = imagePath + "popups/comms/nav_buttons/back_n.gif";
    next_h.src = imagePath + "popups/comms/nav_buttons/next_h.gif";
    next_n.src = imagePath + "popups/comms/nav_buttons/next_n.gif";
    refReturn_h.src = imagePath + "popups/comms/nav_buttons/return_h.gif";
    refReturn_n.src = imagePath + "popups/comms/nav_buttons/return_n.gif";
    print_h.src = imagePath + "popups/comms/nav_buttons/print_h.gif";
    print_n.src = imagePath + "popups/comms/nav_buttons/print_n.gif";
    help_h.src = imagePath + "popups/comms/nav_buttons/help_h.gif";
    help_n.src = imagePath + "popups/comms/nav_buttons/help_n.gif";
}

function changeImage(imgState)
{
    var imgObj;
    var img = imgState.split("_");
  
    imgObj = eval("document.images['"+img[0]+"Img']");
    
    if (parent.navLoaded)
    {
        newImage = eval(imgState);
        imgObj.src = newImage.src;
    }
    return;
}

function goBack()
{
	if (parent.contentLoaded)
	{
		parent.contentLoaded = false;
		changePost("hidden")
		parent.currentPageNo--;
		changePost("visible")
		checkNav();
	}
}

function goNext()
{
	if (parent.contentLoaded)
	{
		parent.contentLoaded = false;
		changePost("hidden")
		parent.currentPageNo++;
		changePost("visible")
		checkNav();
	}
}

function changePost(vis)
{
	parent.contentF.document.getElementById("postPage"+parent.currentPageNo+"Text").style.visibility = vis;
}

function checkNav()
{
	if (parent.noOfPages == 1)
	{
		buttonState("nextL","hidden");
		buttonState("backL","hidden");
	}
	else if (parent.currentPageNo == 1)
	{
		buttonState("nextL","visible");
		buttonState("backL","hidden");
	}
	else if (parent.currentPageNo == parent.noOfPages)
	{
		buttonState("nextL","hidden");
		buttonState("backL","visible");
	}
	else
	{
		buttonState("nextL","visible");
		buttonState("backL","visible");
	}

	showPageNum();
	parent.contentLoaded = true;
}

function showPageNum()
{
	document.getElementById("pageNum").innerHTML = parent.currentPageNo+" of "+parent.noOfPages;
}

function exit()
{
	parent.window.close();
}

function buttonState(but,state)
{
	document.getElementById(but).style.visibility = state;
}

function refReturn() {
	theOpener.launchRef();
	parent.window.close();
}


function showHelp() {
	parent.showHelp();
}

function doPrint() {
	parent.printPage();
}
