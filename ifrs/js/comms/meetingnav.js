
function initialise()
{
	common_init();
	parent.loadMeeting();
	parent.booNavLoaded = true;
}

function buttonState(_strButton, _strState)
{
	document.getElementById(_strButton).style.visibility = _strState;
}
