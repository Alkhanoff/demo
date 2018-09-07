// constant to define whether the object is a BLOCK or a UNIT
var BLOCK = 0;
var UNIT = 1;

// constant to define the BLOCK and UNIT status
var NOTSTARTED = 0;
var STARTED = 1;
var COMPLETED = 2;

var objCoachMe = null; // reference to the course object (blockObj)
var objCurrentState = null; // reference to the currentStateObj
var objUnitRef = null; // used in the findUnit function to reference the unit that's searching for

//
// Start of object definition
//

function blockObj(_strID, _objParent, _strTitle)
{
	this.strID = _strID;
	this.objParent = _objParent;
	this.strTitle = _strTitle;
	this.intType = BLOCK;
	this.intState = NOTSTARTED;
	this.objOpenInputData = null;

	this.objChilds = null;

	this.checkStatus = _checkBlockStatus;
}

function unitObj(_strID, _objParent, _strTitle)
{
	this.strID = _strID;
	this.objParent = _objParent;
	this.strTitle = _strTitle;
	this.intType = UNIT;
	this.intState = NOTSTARTED;
	this.intCurrentPage = 0;
	this.URL;

	this.objNavArray = null;

	// unit functions
	this.startUnit = _startUnit;
	this.checkStatus = _checkUnitStatus;

	this.checkNav = _checkNav;
	this.back = _goBack;
	this.next = _goNext;

	this.retrieveOIData = _retrieveOIData;
	this.saveOIData = _saveOIData;
	this.showPageNum = _showPageNum;
}

function currentStateObj()
{
	this.objBlocks = null;
	this.objUnit = null;
}

//
// Start of object functions
//

function _checkBlockStatus()
{
	var _intBlocksStarted = 0;
	var _intBlocksCompleted = 0;

	if (this.objChilds != null)
	{
		for (var i=0; i<this.objChilds.length; i++)
		{
			this.objChilds[i].checkStatus();

			if (this.objChilds[i].intState == STARTED)
				_intBlocksStarted++;
	
			if (this.objChilds[i].intState == COMPLETED)
				_intBlocksCompleted++;
		}
	
		if ((_intBlocksStarted == 0) && (_intBlocksCompleted == 0))
			this.intState = NOTSTARTED;
		else if (blocksCompleted == this.objChilds.length)
			this.intState = COMPLETED;
		else
			this.intState = STARTED;
	}
}

function _checkUnitStatus()
{
	var _intCount = 0;

	if ((this.objNavArray != null) && (this.intState != COMPLETED))
	{
		for (var i=0; i<this.objNavArray.length; i++)
		{
			if (this.objNavArray[i][1] == VISITED)
				_intCount++;
		}

		if (_intCount == this.objNavArray.length)
			this.intState = COMPLETED;
		else if (_intCount > 0)
			this.intState = STARTED;
	}
}

function _goBack(_objFrame)
{
	this.intCurrentPage--;
	_objFrame.location = this.URL + this.objNavArray[this.intCurrentPage][0];
}

function _goNext(_objFrame)
{
	this.intCurrentPage++;
	_objFrame.location = this.URL + this.objNavArray[this.intCurrentPage][0];
}

function _startUnit(_strUnitPath)
{
	this.URL = _strUnitPath;
}

function _showPageNum(_objLayer)
{
	_objLayer.innerHTML = (this.intCurrentPage + 1) + "/" + this.objNavArray.length;
}

function _checkNav(_objButtons)
{
	_objButtons["exit"].visibility = "visible";
	if (this.intCurrentPage == 0)
	{
		_objButtons["next"].visibility = "visible";
		_objButtons["back"].visibility = "hidden";
	}
	else if (this.intCurrentPage == (this.objNavArray.length - 1))
	{
		_objButtons["next"].visibility = "hidden";
		_objButtons["back"].visibility = "visible";
	}
	else
	{
		_objButtons["next"].visibility = "visible";
		_objButtons["back"].visibility = "visible";
	}
}

function _retrieveOIData(_intPageType, _strScreenID)
{
	var _strData = "";
	var _strPageID = this.objNavArray[this.intCurrentPage][0].split(".")[0];

	if (_intPageType == OPENINPUTSTART)
	{
		if ((this.objParent.objOpenInputData != null) && (this.objParent.objOpenInputData[_strPageID]))
			_strData = this.objParent.objOpenInputData[_strPageID];
	}
	else
	{
		if ((this.objParent.objOpenInputData != null) && (this.objParent.objOpenInputData[_strScreenID]))
			_strData = this.objParent.objOpenInputData[_strScreenID].replace(/\n/g,"<br>");
	}

	return _strData;
}

function _saveOIData(_strData, _intPageType)
{
	var _strPageID = this.objNavArray[this.intCurrentPage][0].split(".")[0];
	
	if (_intPageType == OPENINPUTSTART)
	{
		if (this.objParent.objOpenInputData == null)
			this.objParent.objOpenInputData = new Array();

		this.objParent.objOpenInputData[_strPageID] = _strData;
	}
}

//
// Start of generic function definition
//

function findUnit(_objBase, _strUnitID)
{
	_strUnitID = _strUnitID.split("_")[1];
	objUnitRef = null;

	for (var j=0; j<_objBase.objChilds.length; j++)
	{
		if (_objBase.objChilds[j].strID == _strUnitID)
		{
			objUnitRef = _objBase.objChilds[j];
			break;
		}
	}
}
