var strImagePath = "../../images/popups/comms/voice_mail/"; // The path of the image directory relative to the page 
var light_h = new Image();
var light_n = new Image();
var prev_c = new Image();
var prev_n = new Image();
var next_c = new Image();
var next_n = new Image();
var stop_c = new Image();
var stop_n = new Image();
var play_c = new Image();
var play_n = new Image();

function initialise()
{
	preloadImages()
	parent.window["nav"].location = "nav.htm";
	parent.booMachineLoaded = true;
}

function preloadImages()
{
    light_h.src = strImagePath + "vm_messagelight_h.jpg";
    light_n.src = strImagePath + "vm_messagelight_n.jpg";
    prev_c.src = strImagePath + "vm_rwnd_btn_c.jpg";
    prev_n.src = strImagePath + "vm_rwnd_btn_n.jpg";
    next_c.src = strImagePath + "vm_fwrd_btn_c.jpg";
    next_n.src = strImagePath + "vm_fwrd_btn_n.jpg";
    stop_c.src = strImagePath + "vm_stop_btn_c.jpg";
    stop_n.src = strImagePath + "vm_stop_btn_n.jpg";
    play_c.src = strImagePath + "vm_play_btn_c.jpg";
    play_n.src = strImagePath + "vm_play_btn_n.jpg";
}

function changeImage(_strImgState)
{
    var _strImgSplit = _strImgState.split("_");
    
    if (parent.booMachineLoaded)
    {
    	document.images[_strImgSplit[0] + "Img"].src = eval(_strImgState).src;
    }
 
    return;
}

function stop()
{
	if ((parent.booMachineLoaded) && (parent.booContentLoaded) && (parent.booFlashInstalled))
	{
		var _objFlash = parent.window["contentF"].swfobject.getObjectById("flashObject");
		_objFlash.StopPlay();
	}
}

function play()
{
	if ((parent.booMachineLoaded) && (parent.booContentLoaded))
	{
		if (document.images['lightImg'].src.indexOf("_h.jpg",0) != -1)
			changeImage("light_n");

		if  (parent.booFlashInstalled)
		{
			var _objFlash = parent.window["contentF"].swfobject.getObjectById("flashObject");
			_objFlash.Rewind();
			_objFlash.Play();
		}
	}
}

function prev()
{
	if (parent.intCurrentMessage != 0)
	{
		parent.loadPrevMessage();
	}
}

function next()
{
	if (parent.intCurrentMessage != parent.intLastMessage)
	{
		parent.loadNextMessage();
	}
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

function exit()
{
	top.window.close();
}

