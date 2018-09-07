///////////////////////////////////////////////////////////////////////
// EPIC Group PLC
//
// Project Name : 10014
//
// File Description : JavaScript file included with the Bespoke HTML template.
//		
// Creation Date : Joe 15/05/03
//		
// Modification History :
//
///////////////////////////////////////////////////////////////////////

// This function is called when the onload event for the document is triggered.
function initialise()
{
	
	if (parent.objNavFrame) {
	appTop.intPageType = "";
	parent.objNavFrame.initPageType();
	if (appTop.booMainWindow)
	{
	
		appTop.objCurrentState.objUnit.objNavArray[appTop.objCurrentState.objUnit.intCurrentPage][1] = appTop.VISITED;
	}
	}
	document.body.scroll = "no";	
	parent.booContentLoaded = true; // This is to tell the program that this page have been loaded.
}

// This function is called when the onunload event for the document is triggered.
function pageUnload()
{
	parent.booContentLoaded = false; // This is to tell the program that this page is being unloaded from the browser.
}

