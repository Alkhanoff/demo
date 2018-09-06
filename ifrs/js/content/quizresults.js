
function initialise()
{
	if (parent.objNavFrame) {
		appTop.intPageType = appTop.QUIZRESULTS;
		parent.objNavFrame.initPageType();
		if (appTop.booMainWindow)
		{
			appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][1] = appTop.VISITED;
			appTop.objCurrentState.objUnit.endAssessment();
		}
		writeResults();
	}

	document.body.scroll = "no";

//	if (top.dbTracking)
//		top.saveInterimTracking();

	parent.booContentLoaded = true; 
}

function pageUnload()
{
	parent.booContentLoaded = false; 
}

function writeResults()
{
	var _strHTML = "";
	var _intScore = Math.round(appTop.objCurrentState.objUnit.getPercentage());
	var _objCoachMesFailed = appTop.objCurrentState.objUnit.getFeedback().split("\n");
	var _strCoachMesFailed = "";
	var _strScenario = "";

	for(i=0; i<_objCoachMesFailed.length; i++)
	{
		if (_objCoachMesFailed[i] != "")
		{
			_strCoachMesFailed += _objCoachMesFailed[i] + "<br><br>";
		}
	}

	if (appTop.objCurrentState.objUnit.booPassed)
	{
		_strHTML += "<p>" + appTop.objGenericText["welldone"] + _intScore + "%.<br><br>";
		if (_strCoachMesFailed != "")
		{
			_strHTML += appTop.objGenericText["recommendedsectiontext"];
			_strHTML += "<div id=\"couchMeString\" class=\"feedbackText\">";
			_strHTML += _strCoachMesFailed;
			_strHTML += "</div>";
			_strHTML += "<br><br>";
		}

		_strHTML += postText + "<span class=\"instructionText\"> " + parent.objNavFrame.getInstruction(true) + "<br>" + appTop.objGenericText["printcertificate"] + "</span>";
	}
	else
	{
		_strScenario = _strCoachMesFailed.split("***")[0];
		_strCoachMesFailed = _strCoachMesFailed.split("***")[1];
		_strHTML += appTop.objGenericText["youscored"] + _intScore + "%. " + appTop.objGenericText["notachievedpassmark"];
		if(_objCoachMesFailed[0])
		{
			_strHTML += appTop.objGenericText["reviewsectiontext"];
		}
		else
		{
			_strHTML += ".";
		}

		if (_strScenario != "")
		{
			_strHTML += "<br><br>" + appTop.objGenericText["scenarioheading"] + "<br>" + _strScenario.replace(/<br><br>/g,"<br>");
		}
		if (_strCoachMesFailed != "")
		{
			_strHTML += "<br><br>" + appTop.objGenericText["coachmeheading"] + "<br>" + _strCoachMesFailed.replace(/<br><br>/g,"<br>");
		}

		_strHTML += "<br><br>" + postText + "<span class=\"instructionText\"> " + parent.objNavFrame.getInstruction(true) + "</span>";
	}

	document.getElementById("mainText").innerHTML = _strHTML + "<br><br>" + appTop.objGenericText["surveytext"];	
}

function launchCoachMe(_strID)
{
	appTop.launchIntoCoachMe(_strID);
}
