
function initialise()
{
	var _objPreviousNavStatus;
	var _objUnit = parent.objCurrentState.objUnit;

	assignNavArray(); // function in navdata.js for the current unit.

	if (_objUnit.objPreviousNavStatus != null)
	{
		_objPreviousNavStatus = _objUnit.objPreviousNavStatus.split(",");
		for (var i=0; i<_objUnit.objNavArray.length; i++)
		{
			_objUnit.objNavArray[i][1] = _objPreviousNavStatus[i]*1;
		}
		_objUnit.objPreviousNavStatus = null;
	}

	if (_objUnit.objTaskStatusArray == null)
		_objUnit.setTaskStatusArray();

	appTop.startUnit();
}
