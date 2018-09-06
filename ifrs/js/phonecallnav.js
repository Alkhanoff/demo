var imagePath = "../../images/"; // The path of the image directory relative to the page 
var exit_h = new Image();
var exit_n = new Image();
var transcript_h = new Image();
var transcript_n = new Image();
var refReturn_h = new Image();
var refReturn_n = new Image();
var print_h = new Image();
var print_n = new Image();
var help_h = new Image();
var help_n = new Image();

function initialise()
{
	preloadImages();
	theOpener = parent.window.opener;
	if (theOpener.backToRef == true) { // if a back to refs button is needed
		document.getElementById("refReturnL").style.visibility = "visible";
		theOpener.backToRef = false;
	}
	parent.loadPhonecall();
	parent.navLoaded = true;
}

function preloadImages()
{
    exit_h.src = imagePath + "popups/comms/nav_buttons/close_h.gif";
    exit_n.src = imagePath + "popups/comms/nav_buttons/close_n.gif";
    transcript_h.src = imagePath + "popups/comms/nav_buttons/au_trans_h.gif";
    transcript_n.src = imagePath + "popups/comms/nav_buttons/au_trans_n.gif";
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

function showTranscript()
{
	if (parent.contentLoaded)
	{
		parent.contentF.document.getElementById("initialText").style.visibility = "hidden";
		parent.contentF.document.getElementById("transcriptText").style.visibility = "visible";
	}
}

function exit()
{
	parent.window.close();
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
