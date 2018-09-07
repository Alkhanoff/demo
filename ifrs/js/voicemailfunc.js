var imagePath = "../../images/popups/"; // The path of the image directory relative to the page 
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
	parent.nav.location = "nav.htm";
	parent.machineLoaded = true;
}

function preloadImages()
{
    light_h.src = imagePath + "vm_messagelight_h.jpg";
    light_n.src = imagePath + "vm_messagelight_n.jpg";
    prev_c.src = imagePath + "vm_rwnd_btn_c.jpg";
    prev_n.src = imagePath + "vm_rwnd_btn_n.jpg";
    next_c.src = imagePath + "vm_fwrd_btn_c.jpg";
    next_n.src = imagePath + "vm_fwrd_btn_n.jpg";
    stop_c.src = imagePath + "vm_stop_btn_c.jpg";
    stop_n.src = imagePath + "vm_stop_btn_n.jpg";
    play_c.src = imagePath + "vm_play_btn_c.jpg";
    play_n.src = imagePath + "vm_play_btn_n.jpg";
}

function changeImage(imgState)
{
    var imgObj;
    var img = imgState.split("_");
  
    imgObj = eval("document.images['"+img[0]+"Img']");
    
    if (parent.machineLoaded)
    {
        newImage = eval(imgState);
        imgObj.src = newImage.src;
    }
    return;
}

function stop()
{
	if ((parent.machineLoaded) && (parent.contentLoaded) && (parent.flashInstalled))
		parent.contentF.audioPlayer.Stop();
}

function play()
{
	if ((parent.machineLoaded) && (parent.contentLoaded))
	{
		if (document.images['lightImg'].src.indexOf("_h.jpg",0) != -1)
			changeImage("light_n");

		if  (parent.flashInstalled)
		{
			parent.contentF.audioPlayer.Rewind();
			parent.contentF.audioPlayer.Play();
		}
	}
}

function prev()
{
	if (parent.currentMessage != 0)
	{
//		parent.audioF.stopAudio();
		parent.loadPrevMessage();
	}
}

function next()
{
	if (parent.currentMessage != parent.lastMessage)
	{
//		parent.audioF.stopAudio();
		parent.loadNextMessage();
	}
}

function showTranscript()
{
	if (parent.contentLoaded)
	{
		parent.contentF.document.all['initialText'].style.visibility = "hidden";
		parent.contentF.document.all['transcriptText'].style.visibility = "visible";
	}
}

function exit()
{
	top.window.close();
}

