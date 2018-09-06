///////////////////////////////////////////////////////////////////////
// EPIC Group PLC
//
// Project Name : 10014
//
// File Description : JavaScript file included with the Graphic and Text template and Text and Graphic template.
//			(graphicAndText.html,textAndGraphic.html) 
//		
// Creation Date : Wai Lam Yau - 23/02/2001
//		
// Modification History :
//
///////////////////////////////////////////////////////////////////////

// This function is called when the onload event for the document is triggered.
function initialise()
{
	if (parent.nav) {
		//top.pageType = top.GRAPHICSANDTEXT;
		top.pageType = top.TEXTANDGRAPHIC;
		parent.nav.initPageType();
		if (top.mainWindow)
			top.currentState.unit.navArray[top.currentState.unit.currentPage][1] = top.VISITED;
	}
	document.body.scroll = "no";
	document.body.scroll = "no";	parent.contentLoaded = true; // This is to tell the program that this page have been loaded.
}

// This function is called when the onunload event for the document is triggered.
function pageUnload()
{
	parent.contentLoaded = false; // This is to tell the program that this page is being unloaded from the browser.
}

