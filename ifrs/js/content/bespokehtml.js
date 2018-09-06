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
	if (parent.nav) {
		top.pageType = "";
		parent.nav.initPageType();
		if (top.mainWindow)
			top.currentState.unit.navArray[top.currentState.unit.currentPage][1] = top.VISITED;
	}
	document.body.scroll = "no";	
	parent.contentLoaded = true; // This is to tell the program that this page have been loaded.
}

// This function is called when the onunload event for the document is triggered.
function pageUnload()
{
	parent.contentLoaded = false; // This is to tell the program that this page is being unloaded from the browser.
}

