function initialise()
{
	parent.booContentLoaded = true;
		parent.initialiseVoicemail();	
}

function loadAudio()
{

}

/*
function loadAudio()
{
	var slash;
	var audioPath = new String(document.location);

	audioPath = audioPath.substring(0,(audioPath.lastIndexOf("/",audioPath.length)+1));
	parent.audioF.loadAudio(audioPath+"audio/"+audioFilename);
}
*/
