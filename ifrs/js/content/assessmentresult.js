function initialise()
{
	if (parent.nav) {
		top.pageType = top.ASSESSMENTRESULT;
		parent.nav.initPageType();
		top.currentState.unit.navArray[top.currentState.unit.currentPage][1] = top.VISITED;
		top.currentState.unit.endAssessment();
		showFeedback();
	}
	
	document.body.scroll = "no";	parent.contentLoaded = true; // This is to tell the program that this page have been loaded.
}

// This function is called when the onunload event for the document is triggered.
function pageUnload()
{
	parent.contentLoaded = false; // This is to tell the program that this page is being unloaded from the browser.
}

function showFeedback()
{
	var fText = "Total score: "+top.currentState.unit.getScore()+" out of "+top.currentState.unit.getMaxScore();
	var specificFeedback = "";

	document.all['feedback'].innerHTML = fText+specificFeedback;

}
