
document.onkeypress = keyPressed;
document.onkeydown = keyDown;
document.onkeyup = keyUp;

function keyPressed(e)
{
	var ieKey;
	ieKey = event.keyCode;
	if (ieKey == 8)
		window.event.keyCode = 32;
}

function keyDown(e)
{
	var ieKey;
	ieKey = event.keyCode;
	if (ieKey == 8)
		window.event.keyCode = 32;
}

function keyUp(e)
{
	var ieKey;
	ieKey = event.keyCode;
	if (ieKey == 8)
		window.event.keyCode = 32;
}

function initialise()
{
	var temp;
	assignNavArray(); // function in navdata.js for the current unit.
	if (top.currentState.unit.previousNavStatus != null)
	{
		temp = top.currentState.unit.previousNavStatus.split(",");
		for (var i=0; i<top.currentState.unit.navArray.length; i++)
		{
			top.currentState.unit.navArray[i][1] = temp[i]*1;
		}
		top.currentState.unit.previousNavStatus = null;
	}

	if (top.currentState.unit.taskStatusArray == null)
		top.currentState.unit.setTaskStatusArray();
	startUnit();
}

function startUnit()
{
	frameType.location = top.baseURL+"/generichtm/presentation.htm";
}
