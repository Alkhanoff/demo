var transcript_h = new Image();
var transcript_n = new Image();

function initialise()
{
	common_init();
	preloadExtraImages();
	parent.loadPhonecall();
	parent.booNavLoaded = true;
}

function preloadExtraImages()
{
    transcript_h.src = strImagePath + "popups/comms/nav_buttons/au_trans_h.gif";
    transcript_n.src = strImagePath + "popups/comms/nav_buttons/au_trans_n.gif";
}

function showTranscript()
{
	if (parent.booContentLoaded)
	{
		parent.hidePopupLayer();
		parent.window["contentF"].document.getElementById("initialText").style.visibility = "hidden";
		parent.window["contentF"].document.getElementById("transcriptText").style.visibility = "visible";
	}
}
