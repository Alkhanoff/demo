///////////////////////////////////////////////////////////////////////
// EPIC Group PLC
//
// Project Name : 10014
//
// File Description : 	JavaScript file used to ply audio (WAV) files 
//			in all templates
//		
// Creation Date : Joe Conlan 30/07/2002
//		
// Modification History : 
//
///////////////////////////////////////////////////////////////////////
var audioPath = "audio/";
var testAudioInterval="";
var audioIsPlaying = false;
var audioToPlayCounter = 0;

function playAudio(audiofile)
{
	if(clearAudio())
	{
		audioIsPlaying = true;
		if(typeof(document.mediaplayer1)!="undefined")
		{
			document.mediaplayer1.filename = audioPath+audiofile;
			if(top.pageType == top.STORYBOARDFOUR)
			{
				testAudioInterval = window.setInterval("audioFilePositionTest()",500);
			}
		}
	}
	return;
}
var endPos = 0;
 
function audioFilePositionTest()
{
	if(typeof(document.mediaplayer1)!="undefined")
	{
		var atPos = -1;
		atPos = document.mediaplayer1.CurrentPosition;
		if(atPos==endPos||atPos==0)
		{
			if(clearAudio())
			{
				if(typeof(audioArray)!="undefined")
				{
					if(++audioToPlayCounter<audioArray.length)
					{
						playNextAudio(audioToPlayCounter);
					}
				}
			}
		}
	}
	return;
}

function clearAudio()
{
	window.clearInterval(testAudioInterval);
	audioIsPlaying = false;
	return true;
}