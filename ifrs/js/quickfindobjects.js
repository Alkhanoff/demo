var objQuickFindData;

function quickFindObj()
{
	this.objScenarios = null; // link to scenarioObj
	this.strDescription = "";
}

function scenarioObj(_strTitle, _strTiming)
{
	this.strTitle = _strTitle;
	this.strTiming = _strTiming;
	this.strBackground = null; // comma separated list of ids
	this.objTasks = null; // link to taskObj;
}

function taskObj(_strTitle)
{
	this.strTitle = _strTitle;
	this.strCoachMes = null // comma separated list of ids
	this.strCaseStudies = null // comma separated list of ids
}

objQuickFindData = new quickFindObj();
