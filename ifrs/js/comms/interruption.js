

function initialise()
{
	var _strExpressInstall = parent.objOpenerTop.strBaseURL + "js/comms/swfobject/expressInstall.swf";
	var _arrFilenameSplit = filename.split("_");
	//var _strFilename = parent.objUnit.URL + "audio/" + filename;
	var _strFilename = parent.objOpenerTop.strBaseURL + "units/" + _arrFilenameSplit[1] + "/" + _arrFilenameSplit[2] + "/content/audio/" + filename;
	
	swfobject.embedSWF(_strFilename, "flashL", "1", "1", "9.0.0", _strExpressInstall);

	parent.checkHistory();
	parent.booContentLoaded = true;
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
