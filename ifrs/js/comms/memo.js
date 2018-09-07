function initialise()
{
	checkPages();
	parent.checkHistory();
	parent.checkNav();
	parent.booContentLoaded = true;
}

function checkPages()
{
	var _booPageFound = true;
	var _intPageCount = 1;

	while (_booPageFound)
	{
		if (document.getElementById("memoPage" + _intPageCount + "Text"))
			_intPageCount++;
		else
			_booPageFound = false;
	}
	
	parent.intNoOfPages = _intPageCount - 1;
}
